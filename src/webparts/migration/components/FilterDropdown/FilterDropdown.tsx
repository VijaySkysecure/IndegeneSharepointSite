import * as React from "react";
import { createPortal } from "react-dom";
import styles from "./FilterDropdown.module.scss";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { DocumentDetailPage } from "../../pages/DocumentDetailPage/DocumentDetailPage";
import { AzureOpenAIService, ISearchFilters } from "../../services/AzureOpenAIService";
import {
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_API_KEY,
  AZURE_OPENAI_DEPLOYMENT,
} from "../../services/SearchConfig";
import { DocumentParser } from "../../services/DocumentParser";

export interface IFilterDropdownProps {
  searchText: string;
  spHttpClient: SPHttpClient;
  siteUrl: string; // e.g. https://m365x65470037.sharepoint.com/sites/MigrationTest2
  context: any;    // same WebPartContext you pass to QuestionSection
}

type FilterChild = { title: string; count?: number };
type FilterGroup = { title: string; count?: number; children?: FilterChild[] };

type ResultItem = {
  id: number;              // list item Id
  title: string;            // Document Title (from SharePoint Title field)
  fileName: string;         // Actual filename (FileLeafRef)
  contributor: string;
  updated: string;
  description: string;     // Abstract
  fileUrl?: string;
  fileType?: string;
  serverRelativeUrl?: string; // FileRef for download API
  businessUnit?: string;   // Business Unit from SharePoint
  documentType?: string;   // Document Type from SharePoint
  client?: string;         // Client from SharePoint
  region?: string;         // Region from SharePoint
  therapyArea?: string;    // Therapy Area from SharePoint
  diseaseArea?: string;    // Disease Area from SharePoint
};

const filterData: FilterGroup[] = [
  { title: "Business Unit", count: 3500, children: [{ title: "SL 1" }, { title: "SL 2" }, { title: "SL 3" }] },
  { title: "Document Type", count: 1509, children: [{ title: "Type 1" }, { title: "Type 2" }, { title: "Type 3" }] },
  { title: "Client", count: 1200, children: [{ title: "Client A" }, { title: "Client B" }, { title: "Client C" }] },
  { title: "Region", count: 800, children: [{ title: "Region 1" }, { title: "Region 2" }, { title: "Region 3" }] },
  { title: "Therapy Area" },
  { title: "Disease Area" },
  {
    title: "File Format",
    children: [
      { title: "PDF" },
      { title: "DOCX" },
      { title: "PPTX" },
      { title: "XLSX" },
      { title: "MHTML" },
      { title: "MHT" },
      { title: "SVG" },
      { title: "MPP" },
    ],
  },
];

const FilterDropdown: React.FC<IFilterDropdownProps> = ({
  searchText,
  spHttpClient,
  siteUrl,
  context,
}) => {
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] =
    React.useState<"documents" | "experts">("documents");

  const [documents, setDocuments] = React.useState<ResultItem[]>([]);
  const [semanticSearchResults, setSemanticSearchResults] = React.useState<ResultItem[]>([]);
  // Cache for document content to avoid re-extracting on every search
  const documentContentCache = React.useRef<Map<number, string>>(new Map());
  
  const [experts] = React.useState<ResultItem[]>(() =>
    Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      title: `Expert ${i + 1}`,
      fileName: `expert-${i + 1}.pdf`,
      contributor: `Role ${i + 1}`,
      updated: "Nov 20, 2025",
      description: "Expert profile placeholder.",
    }))
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  /* ---------------------------------------------
     Semantic Search Service Instance
  --------------------------------------------- */
  const openAIServiceRef = React.useRef<AzureOpenAIService | null>(null);
  
  React.useEffect(() => {
    if (!openAIServiceRef.current) {
      openAIServiceRef.current = new AzureOpenAIService({
        apiKey: AZURE_OPENAI_API_KEY,
        endpoint: AZURE_OPENAI_ENDPOINT,
        deploymentName: AZURE_OPENAI_DEPLOYMENT,
      });
    }
  }, []);

  /* ---------------------------------------------
     Document Preview State (same as QuestionSection)
  --------------------------------------------- */
  const [selectedDocumentId, setSelectedDocumentId] =
    React.useState<number | null>(null);

  /* ---------------------------------------------
     Front-end filter states
  --------------------------------------------- */
  const [selectedFormat, setSelectedFormat] = React.useState<string | null>(null);
  const [selectedBusinessUnit, setSelectedBusinessUnit] = React.useState<string | null>(null);
  const [selectedDocumentType, setSelectedDocumentType] = React.useState<string | null>(null);
  const [selectedClient, setSelectedClient] = React.useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = React.useState<string | null>(null);
  const [selectedTherapyArea, setSelectedTherapyArea] = React.useState<string | null>(null);
  const [selectedDiseaseArea, setSelectedDiseaseArea] = React.useState<string | null>(null);

  const toggleGroup = (title: string) =>
    setOpenGroup(openGroup === title ? null : title);

  const handleFormatClick = (formatTitle: string) => {
    const fmt = formatTitle.toLowerCase();
    setSelectedFormat((prev) => (prev === fmt ? null : fmt)); // toggle
  };

  const handleFilterClick = (filterType: string, value: string) => {
    switch (filterType) {
      case "Business Unit":
        setSelectedBusinessUnit((prev) => (prev === value ? null : value));
        break;
      case "Document Type":
        setSelectedDocumentType((prev) => (prev === value ? null : value));
        break;
      case "Client":
        setSelectedClient((prev) => (prev === value ? null : value));
        break;
      case "Region":
        setSelectedRegion((prev) => (prev === value ? null : value));
        break;
      case "Therapy Area":
        setSelectedTherapyArea((prev) => (prev === value ? null : value));
        break;
      case "Disease Area":
        setSelectedDiseaseArea((prev) => (prev === value ? null : value));
        break;
    }
  };

  /* ---------- Helpers for file type & icon (for tiles) ---------- */

  const getFileTypeFromName = (fileName: string | undefined): string => {
    if (!fileName) return "FILE";
    const parts = fileName.split(".");
    if (parts.length < 2) return "FILE";
    return parts.pop()!.toUpperCase();
  };

  const getFileTypeIcon = (type: string | undefined) => {
    if (!type) return "📎";
    const t = type.toLowerCase();
    if (t.includes("pdf")) return "📄";
    if (t.includes("ppt")) return "📊";
    if (t.includes("xls")) return "📈";
    if (t.includes("doc")) return "📝";
    return "📎";
  };

  /* ======================================================
     Load documents from KMArtifacts LIST (like QuestionSection)
  ====================================================== */
  React.useEffect(() => {
    if (activeTab !== "documents") return;

    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const libraryName = "KMArtifacts";

        const apiUrl =
          `${siteUrl}/_api/web/lists/getbytitle('${libraryName}')/items` +
          `?$select=Id,Title,Abstract,FileLeafRef,FileRef,Author/Title,Created,BusinessUnit,DocumentType,Client,Region,TherapyArea,DiseaseArea` +
          `&$expand=Author`;

        const response: SPHttpClientResponse = await spHttpClient.get(
          apiUrl,
          SPHttpClient.configurations.v1
        );

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();

        const docs: ResultItem[] = (data.value || []).map((item: any) => {
          // Extract just the filename from FileLeafRef (which might include path)
          const fileLeafRef = item.FileLeafRef || "";
          const fileName = fileLeafRef.split('/').pop() || fileLeafRef || "Untitled";
          const fileType = getFileTypeFromName(fileName);
          // Always use Title field as document title, fallback to filename if Title is empty
          const documentTitle = item.Title && item.Title.trim() ? item.Title.trim() : fileName;

          return {
            id: item.Id,
            title: documentTitle, // Document Title (from SharePoint Title field) - always shown
            fileName: fileName,   // Actual filename (extracted from FileLeafRef) - always shown
            contributor: item.Author?.Title || "Unknown",
            updated: item.Created
              ? new Date(item.Created).toLocaleString()
              : "",
            description: item.Abstract || "No abstract available",
            fileUrl: item.FileRef
              ? `${window.location.origin}${item.FileRef}`
              : undefined,
            fileType,
            serverRelativeUrl: item.FileRef || "",
            businessUnit: item.BusinessUnit || undefined,
            documentType: item.DocumentType || undefined,
            client: item.Client || undefined,
            region: item.Region || undefined,
            therapyArea: item.TherapyArea || undefined,
            diseaseArea: item.DiseaseArea || undefined,
          };
        });

        setDocuments(docs);
      } catch (err: any) {
        console.error("Error fetching documents", err);
        setError(err.message || "Failed to load documents");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [activeTab, siteUrl, spHttpClient]);

  /* ======================================================
     Search + All Filters
  ====================================================== */
  const hasSearch = searchText.trim().length > 0;
  const hasFormat = !!selectedFormat;
  const hasBusinessUnit = !!selectedBusinessUnit;
  const hasDocumentType = !!selectedDocumentType;
  const hasClient = !!selectedClient;
  const hasRegion = !!selectedRegion;
  const hasTherapyArea = !!selectedTherapyArea;
  const hasDiseaseArea = !!selectedDiseaseArea;
  
  const hasAnyFilter = hasSearch || hasFormat || hasBusinessUnit || hasDocumentType || 
                       hasClient || hasRegion || hasTherapyArea || hasDiseaseArea;

  /* ======================================================
     Semantic Search Integration on KMArtifacts Documents
     Uses Azure OpenAI embeddings to search through:
     - File name
     - Abstract (description)
     - Author (contributor)
     - Title
  ====================================================== */
  React.useEffect(() => {
    // Only perform semantic search for documents tab when there's a search query
    if (activeTab !== "documents" || !hasSearch || !openAIServiceRef.current || documents.length === 0) {
      // For non-search filters or experts tab, use client-side filtering
      setSemanticSearchResults([]);
      return;
    }

    const performSemanticSearch = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // First, apply server-side filters to reduce the document set
        let filteredDocs = documents;

        // Apply Business Unit filter
        if (selectedBusinessUnit) {
          filteredDocs = filteredDocs.filter(
            (doc) => doc.businessUnit && doc.businessUnit.trim() === selectedBusinessUnit.trim()
          );
        }

        // Apply Document Type filter
        if (selectedDocumentType) {
          filteredDocs = filteredDocs.filter(
            (doc) => doc.documentType && doc.documentType.trim() === selectedDocumentType.trim()
          );
        }

        // Apply Client filter
        if (selectedClient) {
          filteredDocs = filteredDocs.filter(
            (doc) => doc.client && doc.client.trim() === selectedClient.trim()
          );
        }

        // Apply Region filter
        if (selectedRegion) {
          filteredDocs = filteredDocs.filter(
            (doc) => doc.region && doc.region.trim() === selectedRegion.trim()
          );
        }

        // Apply File Format filter
        if (selectedFormat) {
          filteredDocs = filteredDocs.filter(
            (doc) => doc.fileType && doc.fileType.toLowerCase() === selectedFormat.toLowerCase()
          );
        }

        // Apply Therapy Area filter
        if (selectedTherapyArea) {
          filteredDocs = filteredDocs.filter(
            (doc) => doc.therapyArea && doc.therapyArea.trim() === selectedTherapyArea.trim()
          );
        }

        // Apply Disease Area filter
        if (selectedDiseaseArea) {
          filteredDocs = filteredDocs.filter(
            (doc) => doc.diseaseArea && doc.diseaseArea.trim() === selectedDiseaseArea.trim()
          );
        }

        // If no documents after filtering, return empty
        if (filteredDocs.length === 0) {
          setSemanticSearchResults([]);
          setIsLoading(false);
          return;
        }

        // Extract content for ALL documents to ensure complete search coverage
        // This ensures words in document content (but not in abstract) are found
        // Process in batches to avoid overwhelming the browser
        const batchSize = 10; // Process 10 documents at a time
        const allDocsWithContent: Array<{
          id: number;
          title: string;
          fileName: string;
          description: string;
          contributor: string;
          documentContent: string;
          [key: string]: any;
        }> = [];

        // Process documents in batches
        for (let i = 0; i < filteredDocs.length; i += batchSize) {
          const batch = filteredDocs.slice(i, i + batchSize);
          
          const batchResults = await Promise.all(
            batch.map(async (doc) => {
              let documentContent = documentContentCache.current.get(doc.id);
              
              // If content not cached, try to extract it (only for supported file types)
              if (!documentContent && doc.serverRelativeUrl && doc.fileType) {
                const supportedTypes = ['PDF', 'DOCX', 'PPTX', 'MHTML', 'MHT', 'SVG'];
                if (supportedTypes.includes(doc.fileType.toUpperCase())) {
                  try {
                    // Download file from SharePoint
                    const fileUrl = `${siteUrl}/_api/web/GetFileByServerRelativeUrl('${doc.serverRelativeUrl}')/$value`;
                    const fileResponse = await spHttpClient.get(
                      fileUrl,
                      SPHttpClient.configurations.v1
                    );
                    
                    if (fileResponse.ok) {
                      const blob = await fileResponse.blob();
                      const file = new File([blob], doc.fileName, { type: blob.type });
                      
                      // Extract text content
                      const parseResult = await DocumentParser.parseFile(file);
                      if (parseResult.success && parseResult.text) {
                        // Use first 15000 characters for comprehensive search
                        documentContent = parseResult.text.substring(0, 15000);
                        documentContentCache.current.set(doc.id, documentContent);
                      }
                    }
                  } catch (err) {
                    console.warn(`Could not extract content for document ${doc.id}:`, err);
                    // Continue without content - will use metadata only
                  }
                }
              }
              
              return {
                id: doc.id,
                title: doc.title,
                fileName: doc.fileName,
                description: doc.description, // abstract
                contributor: doc.contributor, // author
                documentContent: documentContent || '', // actual document content (may be empty if extraction failed)
                // Include all other fields for the result
                ...doc,
              };
            })
          );
          
          allDocsWithContent.push(...batchResults);
        }

        // Perform semantic search on filtered KMArtifacts documents
        // This searches through: title, fileName, description (abstract), contributor (author), AND document content
        // Increase topK to ensure we get all matches, including those only in document content
        const semanticResults = await openAIServiceRef.current.semanticSearchLocalDocuments(
          searchText,
          allDocsWithContent,
          100 // Get top 100 results to ensure we don't miss documents with matches only in content
        );

        // Map semantic search results back to ResultItem format
        const mappedResults: ResultItem[] = semanticResults.map((result) => result.document);

        setSemanticSearchResults(mappedResults);
      } catch (err: any) {
        console.error("Semantic search error:", err);
        // On error, fall back to text-based search on KMArtifacts files
        setSemanticSearchResults([]);
        // Will fall back to SharePoint documents (KMArtifacts) in filteredItems useMemo
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(performSemanticSearch, 800);
    return () => clearTimeout(timeoutId);
  }, [
    searchText,
    hasSearch,
    activeTab,
    documents, // Include documents in dependencies
    selectedBusinessUnit,
    selectedDocumentType,
    selectedClient,
    selectedRegion,
    selectedFormat,
    selectedTherapyArea,
    selectedDiseaseArea,
  ]);

  /* ======================================================
     Client-side filtering - Always searches KMArtifacts files
  ====================================================== */
  const filteredItems = React.useMemo(() => {
    if (!hasAnyFilter) return []; // empty grid initially

    // If we have semantic search results from Azure (search query exists), use those
    // Note: semanticSearchResults will be empty array if Azure search fails or returns no results,
    // in which case we fall back to KMArtifacts files below
    if (hasSearch && activeTab === "documents" && semanticSearchResults.length > 0) {
      return semanticSearchResults;
    }

    // Otherwise, search KMArtifacts files from SharePoint (always available)
    // This includes: no search query, or semantic search returned no results
    // The 'documents' state contains all files from KMArtifacts list
    const baseItems = activeTab === "documents" ? documents : experts;
    const keyword = searchText.toLowerCase();
    const fmt = selectedFormat;

    return baseItems.filter((item) => {
      const textMatch =
        item.title.toLowerCase().includes(keyword) ||
        item.contributor.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword);

      const matchesSearch = !hasSearch || textMatch;

      // Only enforce format filter for documents (experts don't have fileType)
      // Use exact match to prevent "mht" from matching "mhtml" and vice versa
      const matchesFormat =
        !fmt ||
        (activeTab === "documents" &&
          item.fileType &&
          item.fileType.toLowerCase() === fmt);

      // Business Unit filter - exact match
      const matchesBusinessUnit =
        !selectedBusinessUnit ||
        (activeTab === "documents" &&
          item.businessUnit &&
          item.businessUnit.trim() === selectedBusinessUnit.trim());

      // Document Type filter - exact match
      const matchesDocumentType =
        !selectedDocumentType ||
        (activeTab === "documents" &&
          item.documentType &&
          item.documentType.trim() === selectedDocumentType.trim());

      // Client filter - exact match
      const matchesClient =
        !selectedClient ||
        (activeTab === "documents" &&
          item.client &&
          item.client.trim() === selectedClient.trim());

      // Region filter - exact match
      const matchesRegion =
        !selectedRegion ||
        (activeTab === "documents" &&
          item.region &&
          item.region.trim() === selectedRegion.trim());

      // Therapy Area filter - exact match
      const matchesTherapyArea =
        !selectedTherapyArea ||
        (activeTab === "documents" &&
          item.therapyArea &&
          item.therapyArea.trim() === selectedTherapyArea.trim());

      // Disease Area filter - exact match
      const matchesDiseaseArea =
        !selectedDiseaseArea ||
        (activeTab === "documents" &&
          item.diseaseArea &&
          item.diseaseArea.trim() === selectedDiseaseArea.trim());

      return matchesSearch && matchesFormat && matchesBusinessUnit && 
             matchesDocumentType && matchesClient && matchesRegion && 
             matchesTherapyArea && matchesDiseaseArea;
    });
  }, [
    hasAnyFilter,
    hasSearch,
    searchText,
    documents,
    experts,
    activeTab,
    selectedFormat,
    selectedBusinessUnit,
    selectedDocumentType,
    selectedClient,
    selectedRegion,
    selectedTherapyArea,
    selectedDiseaseArea,
    semanticSearchResults,
  ]);

  /* ======================================================
     Document Action Handlers (same as QuestionSection)
  ====================================================== */
  const handleView = (item: ResultItem) => {
    setSelectedDocumentId(item.id);
  };

  const handleCloseDetail = () => setSelectedDocumentId(null);

  /* ======================================================
     Only show FilterDropdown content when user types
     OR chooses any filter
  ====================================================== */
  if (!hasAnyFilter) {
    return (
      <>
        {/* Show nothing until user types or picks a format */}
        {selectedDocumentId &&
          context &&
          typeof document !== "undefined" &&
          createPortal(
            <div className={styles.detailModal}>
              <DocumentDetailPage
                context={context}
                documentId={selectedDocumentId}
                onClose={handleCloseDetail}
              />
            </div>,
            document.body
          )}
      </>
    );
  }

  const handleDownload = async (item: ResultItem) => {
    try {
      if (!item.serverRelativeUrl) return;

      const downloadUrl = `${siteUrl}/_api/web/GetFileByServerRelativeUrl('${item.serverRelativeUrl}')/$value`;

      const resp = await spHttpClient.get(
        downloadUrl,
        SPHttpClient.configurations.v1
      );

      if (resp.ok) {
        const blob = await resp.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = item.title || "download";
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error("Download failed:", e);
    }
  };

  /* ======================================================
     Render
  ====================================================== */

  return (
    <>
      <div className={styles.workspace}>
        {/* Left Filter Sidebar */}
        <aside className={styles.wrapper}>
          <div className={styles.railHeader}>Refine using filters by:</div>

          <nav className={styles.container}>
            {filterData.map((group) => {
              const hasChildren = !!group.children;
              const isOpen = openGroup === group.title;

              return (
                <div key={group.title}>
                  <button
                    className={`${styles.parentBtn} ${
                      isOpen ? styles.rootBtnOpen : ""
                    }`}
                    onClick={() => toggleGroup(group.title)}
                  >
                    <span>{group.title}</span>
                    {hasChildren && (
                      <span className={styles.chevron}>
                        {isOpen ? "▲" : "▼"}
                      </span>
                    )}
                  </button>

                  {isOpen && hasChildren && (
                    <div className={styles.childList}>
                      {group.children!.map((child) => {
                        // Determine if this filter option is active
                        const isActive = 
                          (group.title === "File Format" && selectedFormat === child.title.toLowerCase()) ||
                          (group.title === "Business Unit" && selectedBusinessUnit === child.title) ||
                          (group.title === "Document Type" && selectedDocumentType === child.title) ||
                          (group.title === "Client" && selectedClient === child.title) ||
                          (group.title === "Region" && selectedRegion === child.title) ||
                          (group.title === "Therapy Area" && selectedTherapyArea === child.title) ||
                          (group.title === "Disease Area" && selectedDiseaseArea === child.title);

                        return (
                          <button
                            key={child.title}
                            className={`${styles.childBtn} ${isActive ? styles.childBtnActive : ""}`}
                            onClick={() => {
                              if (group.title === "File Format") {
                                handleFormatClick(child.title);
                              } else {
                                handleFilterClick(group.title, child.title);
                              }
                            }}
                          >
                            {child.title}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "documents" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("documents")}
            >
              Documents
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "experts" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("experts")}
            >
              Experts
            </button>
          </div>

          {/* Results */}
          <section className={styles.results}>
            {isLoading && <p>Loading documents…</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {!isLoading && !error && (
              // 👇 Scrollable container
              <div className={styles.scrollContainer}>
                <div className={styles.list}>
                  {filteredItems.length === 0 ? (
                    <p>No results found.</p>
                  ) : (
                    filteredItems.map((item) =>
                      activeTab === "documents" ? (
                        /* ================= Document tile ================ */
                        <div key={item.id} className={styles.tile}>
                          <div className={styles.tileHeader}>
                            <span className={styles.fileTypeIcon}>
                              {getFileTypeIcon(item.fileType)}
                            </span>
                            <span className={styles.fileType}>
                              {item.fileType || "FILE"}
                            </span>
                          </div>

                          <div className={styles.tileContent}>
                            <h3 className={styles.tileTitle}>{item.title || "Untitled Document"}</h3>
                            <div className={styles.fileName}>{item.fileName || "No filename"}</div>
                            <p className={styles.tileAbstract}>
                              {item.description || "No abstract available"}
                            </p>

                            <div className={styles.tileMeta}>
                              <span className={styles.metaLabel}>
                                Contributor:
                              </span>
                              <span className={styles.metaValue}>
                                {item.contributor}
                              </span>
                            </div>

                            <div className={styles.tileMeta}>
                              <span className={styles.metaLabel}>Updated:</span>
                              <span className={styles.metaValue}>
                                {item.updated}
                              </span>
                            </div>
                          </div>

                          <div className={styles.tileActions}>
                            <button
                              className={styles.viewButton}
                              onClick={() => handleView(item)}
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              View
                            </button>
                            <button
                              className={styles.downloadButton}
                              onClick={() => handleDownload(item)}
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Download
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* ================= Experts card ================ */
                        <article key={item.id} className={styles.card}>
                          <h4 className={styles.cardTitle}>{item.title}</h4>

                          <div className={styles.cardRow}>
                            <span className={styles.cardLabel}>Role</span>
                            <span className={styles.cardValue}>
                              {item.contributor}
                            </span>
                          </div>

                          <div className={styles.cardRow}>
                            <span className={styles.cardLabel}>Updated</span>
                            <span className={styles.cardValue}>
                              {item.updated}
                            </span>
                          </div>

                          <div className={styles.cardRow}>
                            <span className={styles.cardLabel}>
                              Description
                            </span>
                            <span className={styles.cardValue}>
                              {item.description}
                            </span>
                          </div>
                        </article>
                      )
                    )
                  )}
                </div>
              </div>
            )}
          </section>
        </main>

        {/* Right Quick Links */}
        <aside className={styles.rightRail}>
          <h3 className={styles.quickLinksTitle}>Quick Links</h3>
          <ul className={styles.quickLinksList}>
            <li>
              <a 
                href="https://www.indegene.com/who-we-are/about-us" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.quickLink}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="https://ir.indegene.com/media/a4fl0eab/policy-on-preservation-of-records-archival-policy-on-website.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.quickLink}
              >
                Retention Policy
              </a>
            </li>
            <li>
              <a 
                href="https://www.indegene.com/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.quickLink}
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a 
                href="https://www.indegene.com/contact-us" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.quickLink}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </aside>
      </div>

      {/* ======================= Document Detail Page (Portal to body) ======================== */}
      {selectedDocumentId &&
        context &&
        typeof document !== "undefined" &&
        createPortal(
          <div className={styles.detailModal}>
            <DocumentDetailPage
              context={context}
              documentId={selectedDocumentId}
              onClose={handleCloseDetail}
            />
          </div>,
          document.body
        )}
    </>
  );
};

export default FilterDropdown;

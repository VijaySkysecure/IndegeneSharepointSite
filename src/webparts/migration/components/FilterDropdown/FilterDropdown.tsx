import * as React from "react";
import { createPortal } from "react-dom";
import styles from "./FilterDropdown.module.scss";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { DocumentDetailPage } from "../../pages/DocumentDetailPage/DocumentDetailPage";

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

  const filteredItems = React.useMemo(() => {
    if (!hasAnyFilter) return []; // empty grid initially

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

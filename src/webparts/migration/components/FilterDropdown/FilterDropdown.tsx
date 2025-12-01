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
     Front-end file format filter state
  --------------------------------------------- */
  const [selectedFormat, setSelectedFormat] = React.useState<string | null>(null);

  const toggleGroup = (title: string) =>
    setOpenGroup(openGroup === title ? null : title);

  const handleFormatClick = (formatTitle: string) => {
    const fmt = formatTitle.toLowerCase();
    setSelectedFormat((prev) => (prev === fmt ? null : fmt)); // toggle
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
          `?$select=Id,Title,Abstract,FileLeafRef,FileRef,Author/Title,Created` +
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
     Search + File Format filter
  ====================================================== */
  const hasSearch = searchText.trim().length > 0;
  const hasFormat = !!selectedFormat;
  const hasSearchOrFormat = hasSearch || hasFormat;

  const filteredItems = React.useMemo(() => {
    if (!hasSearchOrFormat) return []; // empty grid initially

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
      const matchesFormat =
        !fmt ||
        (activeTab === "documents" &&
          item.fileType &&
          item.fileType.toLowerCase().includes(fmt));

      return matchesSearch && matchesFormat;
    });
  }, [
    hasSearchOrFormat,
    hasSearch,
    searchText,
    documents,
    experts,
    activeTab,
    selectedFormat,
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
     OR chooses a file format
  ====================================================== */
  if (!hasSearchOrFormat) {
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
                      {group.children!.map((child) => (
                        <button
                          key={child.title}
                          className={styles.childBtn}
                          onClick={() =>
                            group.title === "File Format"
                              ? handleFormatClick(child.title)
                              : undefined
                          }
                        >
                          {child.title}
                        </button>
                      ))}
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
                <div className={styles.grid}>
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

                          <div className={styles.tileActions}>
                            <button
                              className={styles.viewButton}
                              onClick={() => handleView(item)}
                            >
                              👁 View
                            </button>
                            <button
                              className={styles.downloadButton}
                              onClick={() => handleDownload(item)}
                            >
                              ⬇ Download
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
            <li>#Upload Guidelines</li>
            <li>#Metadata Standards</li>
            <li>#Retention Policy</li>
            <li>#Help &amp; Support</li>
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

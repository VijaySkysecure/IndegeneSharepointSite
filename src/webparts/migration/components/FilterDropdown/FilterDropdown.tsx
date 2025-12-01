import * as React from "react";
import styles from "./FilterDropdown.module.scss";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export interface IFilterDropdownProps {
  searchText: string;

  // 👇 new props (you’ll pass these from context)
  spHttpClient: SPHttpClient;
  siteUrl: string; // e.g. https://m365x65470037.sharepoint.com/sites/MigrationTest2
  
}

type FilterChild = { title: string; count?: number };
type FilterGroup = { title: string; count?: number; children?: FilterChild[] };

type ResultItem = {
  id: string;
  title: string;
  contributor: string;
  updated: string;
  description: string;
  fileUrl?: string;
};

const filterData: FilterGroup[] = [
  { title: "Business Unit", count: 3500, children: [{ title: "SL 1" }, { title: "SL 2" }, { title: "SL 3" }] },
  { title: "Document Type", count: 1509, children: [{ title: "Type 1" }, { title: "Type 2" }, { title: "Type 3" }] },
  { title: "Client", count: 1200, children: [{ title: "Client A" }, { title: "Client B" }, { title: "Client C" }] },
  { title: "Region", count: 800, children: [{ title: "Region 1" }, { title: "Region 2" }, { title: "Region 3" }] },
  { title: "Therapy Area" },
  { title: "Disease Area" },
  { title: "File Format" },
];

const FilterDropdown: React.FC<IFilterDropdownProps> = ({
  searchText,
  spHttpClient,
  siteUrl,
}) => {
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<"documents" | "experts">("documents");

  const [documents, setDocuments] = React.useState<ResultItem[]>([]);
  const [experts] = React.useState<ResultItem[]>(() =>
    // simple placeholder data for Experts tab
    Array.from({ length: 6 }).map((_, i) => ({
      id: `expert-${i}`,
      title: `Expert ${i + 1}`,
      contributor: `Role ${i + 1}`,
      updated: "Nov 20, 2025",
      description: "Expert profile placeholder."
    }))
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const toggleGroup = (title: string) =>
    setOpenGroup(openGroup === title ? null : title);

  // 🔹 Load documents from KMArtifacts when “Documents” tab is active
  React.useEffect(() => {
    if (activeTab !== "documents") return;

    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // siteUrl = https://m365x65470037.sharepoint.com/sites/MigrationTest2
        // Library = KMArtifacts at /sites/MigrationTest2/KMArtifacts
        const apiUrl =
          `${siteUrl}/_api/web/GetFolderByServerRelativeUrl('KMArtifacts')/Files` +
          `?$select=UniqueId,Name,ServerRelativeUrl,TimeLastModified,Author/Title,ListItemAllFields/Description` +
          `&$expand=Author,ListItemAllFields`;

        const response: SPHttpClientResponse = await spHttpClient.get(
          apiUrl,
          SPHttpClient.configurations.v1
        );

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();

        const docs: ResultItem[] = (data.value || []).map((file: any) => ({
          id: file.UniqueId,
          title: file.Name,
          contributor: file.Author?.Title || "Unknown",
          updated: file.TimeLastModified
            ? new Date(file.TimeLastModified).toLocaleDateString()
            : "",
          description: file.ListItemAllFields?.Description || "No description",
          fileUrl: `${window.location.origin}${file.ServerRelativeUrl}` 
        }));

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

  // ✅ Dynamic filtering logic, now based on the active tab
  const filteredItems = React.useMemo(() => {
    const baseItems = activeTab === "documents" ? documents : experts;

    if (!searchText.trim()) return baseItems;

    const keyword = searchText.toLowerCase();

    return baseItems.filter((item) =>
      item.title.toLowerCase().includes(keyword) ||
      item.contributor.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword)
    );
  }, [searchText, documents, experts, activeTab]);

  return (
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
                  className={`${styles.parentBtn} ${isOpen ? styles.rootBtnOpen : ""}`}
                  onClick={() => hasChildren && toggleGroup(group.title)}
                >
                  <span>{group.title}</span>
                  {hasChildren && (
                    <span className={styles.chevron}>{isOpen ? "▲" : "▼"}</span>
                  )}
                </button>

                {isOpen && hasChildren && (
                  <div className={styles.childList}>
                    {group.children!.map((child) => (
                      <button key={child.title} className={styles.childBtn}>
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
            className={`${styles.tab} ${activeTab === "documents" ? styles.active : ""}`}
            onClick={() => setActiveTab("documents")}
          >
            Documents
          </button>
          <button
            className={`${styles.tab} ${activeTab === "experts" ? styles.active : ""}`}
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
            <div className={styles.grid}>
              {filteredItems.length === 0 ? (
                <p>No results found.</p>
              ) : (
                filteredItems.map((item) => (
                  <article key={item.id} className={styles.card}>
                    <h4 className={styles.cardTitle}>{item.title}</h4>

                    <div className={styles.cardRow}>
                      <span className={styles.cardLabel}>Contributor</span>
                      <span className={styles.cardValue}>{item.contributor}</span>
                    </div>

                    <div className={styles.cardRow}>
                      <span className={styles.cardLabel}>Updated</span>
                      <span className={styles.cardValue}>{item.updated}</span>
                    </div>

                    <div className={styles.cardRow}>
                      <span className={styles.cardLabel}>Description</span>
                      <span className={styles.cardValue}>{item.description}</span>
                    </div>

                    {item.fileUrl && (
                      <div className={styles.cardRow}>
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cardLink}
                        >
                          Open document
                        </a>
                      </div>
                    )}
                  </article>
                ))
              )}
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
  );
};

export default FilterDropdown;

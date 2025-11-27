import * as React from "react";
import styles from "./FilterDropdown.module.scss";

export interface IFilterDropdownProps {
  searchText: string;
}

type FilterChild = { title: string; count?: number };
type FilterGroup = { title: string; count?: number; children?: FilterChild[] };

const filterData: FilterGroup[] = [
  { title: "Business Unit", count: 3500, children: [{ title: "SL 1" }, { title: "SL 2" }, { title: "SL 3" }] },
  { title: "Document Type", count: 1509, children: [{ title: "Type 1" }, { title: "Type 2" }, { title: "Type 3" }] },
  { title: "Client", count: 1200, children: [{ title: "Client A" }, { title: "Client B" }, { title: "Client C" }] },
  { title: "Region", count: 800, children: [{ title: "Region 1" }, { title: "Region 2" }, { title: "Region 3" }] },
  { title: "Therapy Area" },
  { title: "Disease Area" },
  { title: "File Format" },
];

const FilterDropdown: React.FC<IFilterDropdownProps> = ({ searchText }) => {
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<"documents" | "experts">("documents");

  const toggleGroup = (title: string) => setOpenGroup(openGroup === title ? null : title);

  // ORIGINAL DEMO ITEMS
  const items = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: activeTab === "documents" ? `Document ${i + 1}` : `Expert ${i + 1}`,
    contributor: activeTab === "documents" ? `Contributor ${i + 1}` : `Role ${i + 1}`,
    updated: "Nov 20, 2025",
    description: "Short description goes here."
  }));

  // ✅ NEW: Dynamic Filtering Logic
  const filteredItems = React.useMemo(() => {
    if (!searchText.trim()) return items;

    const keyword = searchText.toLowerCase();

    return items.filter((item) =>
      item.title.toLowerCase().includes(keyword) ||
      item.contributor.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword)
    );
  }, [searchText, items]);

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
                  {hasChildren && <span className={styles.chevron}>{isOpen ? "▲" : "▼"}</span>}
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
                </article>
              ))
            )}
          </div>
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

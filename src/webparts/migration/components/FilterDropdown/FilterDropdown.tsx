import * as React from "react";
import styles from "./FilterDropdown.module.scss";

export interface IFilterDropdownProps {
  searchText: string;
}

// --------------------------------------------
// Filter Data
// --------------------------------------------
const filterData = [
  {
    title: "Business Unit",
    count: 3500,
    children: [
      { title: "SL 1", count: 479 },
      { title: "SL 2", count: 657 },
      { title: "SL 3", count: 373 },
    ],
  },
  {
    title: "Document Type",
    count: 1509,
    children: [
      { title: "Type 1", count: 479 },
      { title: "Type 2", count: 657 },
      { title: "Type 3", count: 373 },
    ],
  },
  {
    title: "Client",
    count: 1200,
    children: [
      { title: "Client A", count: 400 },
      { title: "Client B", count: 500 },
      { title: "Client C", count: 300 },
    ],
  },
  {
    title: "Region",
    count: 800,
    children: [
      { title: "Region 1", count: 200 },
      { title: "Region 2", count: 300 },
      { title: "Region 3", count: 300 },
    ],
  },
  { title: "Therapy Area" },
  { title: "Disease Area" },
  { title: "File Format" },
];

const FilterDropdown: React.FC<IFilterDropdownProps> = ({ searchText }) => {
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);

  const toggleGroup = (title: string) => {
    setOpenGroup((prev) => (prev === title ? null : title));
  };

  const query = searchText.trim().toLowerCase();

  const filteredData = filterData
    .map((group) => {
      const parentMatch = group.title.toLowerCase().includes(query);

      if (!group.children) return parentMatch ? group : null;

      const matchingChildren = group.children.filter((child) =>
        child.title.toLowerCase().includes(query)
      );

      if (parentMatch || matchingChildren.length > 0) {
        return {
          ...group,
          count: parentMatch
            ? group.count
            : matchingChildren.reduce(
                (acc, { count }) => acc + (count || 0),
                0
              ),
          children:
            matchingChildren.length > 0 ? matchingChildren : group.children,
          autoOpen: query.length > 0,
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <aside className={styles.wrapper}>
      <h3 className={styles.filterHeader}>Refine using filters by:</h3>

      <nav className={styles.container}>
        {filteredData.length === 0 ? (
          <p className={styles.noResults}>No matching filters found.</p>
        ) : (
          filteredData.map((group: any) => {
            const isOpen = group.autoOpen || openGroup === group.title;

            return (
              <div key={group.title}>
                {group.children ? (
                  <button
                    className={styles.parentBtn}
                    onClick={() => toggleGroup(group.title)}
                  >
                    <span>
                      {group.title} ({group.count})
                    </span>
                    <span className={styles.chevron}>
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </button>
                ) : (
                  <div className={styles.staticBtn}>{group.title}</div>
                )}

                {isOpen && group.children && (
                  <div className={styles.childList}>
                    {group.children.map((child: any) => (
                      <button key={child.title} className={styles.childBtn}>
                        {child.title}{" "}
                        {child.count ? `(${child.count})` : ""}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </nav>
    </aside>
  );
};

export default FilterDropdown;

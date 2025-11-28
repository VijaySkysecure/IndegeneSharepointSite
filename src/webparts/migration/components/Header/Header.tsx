import * as React from 'react';
import { IHeaderProps } from './IHeaderProps';
import styles from './Header.module.scss';
import { useState } from 'react';
import { FileUpload } from '../FileUpload/FileUpload';
import FilterDropdown from '../FilterDropdown/FilterDropdown';

export const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const [showUploader, setShowUploader] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.header} ref={containerRef}>

      <div className={styles.headerContent}>

        <div className={styles.leftSection}>
          <h1 className={styles.companyName}>Indegene</h1>
          <p className={styles.description}>
            Indegene provides research and commercialization services to biopharmaceutical and healthcare enterprises.
          </p>
          <button
            className={styles.addFileButton}
            onClick={() => setShowUploader(true)}
          >
            Add a file
          </button>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.leadership}>Leadership</div>

          {/* SEARCH BAR */}
          <div
            className={styles.searchContainer}
            onClick={() => setIsOpen(true)} 
          >
            <svg
              className={styles.searchIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                fill="#666"
              />
            </svg>

            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setIsOpen(true);
              }}
            />
          </div>

          {/* DROPDOWN PANEL */}
          {isOpen && (
            <div className={styles.dropdownPanel}>
              <FilterDropdown searchText={searchText} />
            </div>
          )}
        </div>
      </div>

      {showUploader && (
        <FileUpload onClose={() => setShowUploader(false)} context={props.context} />
      )}
    </div>
  );
};

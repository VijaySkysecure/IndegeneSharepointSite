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
  const searchContainerRef = React.useRef<HTMLDivElement>(null);
  const dropdownPanelRef = React.useRef<HTMLDivElement>(null);

  // Position dropdown below search bar
  const updateDropdownPosition = React.useCallback(() => {
    if (isOpen && searchContainerRef.current && dropdownPanelRef.current) {
      const searchRect = searchContainerRef.current.getBoundingClientRect();
      const dropdown = dropdownPanelRef.current;
      dropdown.style.top = `${searchRect.bottom + 8}px`; // 8px gap below search bar
      // Position dropdown slightly to the left
      dropdown.style.left = '50%';
      dropdown.style.transform = 'translateX(-55%)'; // -55% moves it left from center
    }
  }, [isOpen]);

  React.useEffect(() => {
    updateDropdownPosition();
    
    // Update position on window resize
    window.addEventListener('resize', updateDropdownPosition);
    window.addEventListener('scroll', updateDropdownPosition);
    
    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
      window.removeEventListener('scroll', updateDropdownPosition);
    };
  }, [isOpen, searchText, updateDropdownPosition]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if click is outside both the search container and the dropdown panel
      const isOutsideSearch = searchContainerRef.current && !searchContainerRef.current.contains(target);
      const isOutsideDropdown = dropdownPanelRef.current && !dropdownPanelRef.current.contains(target);
      
      // Close if click is outside both elements (but keep search text)
      if (isOutsideSearch && isOutsideDropdown) {
        setIsOpen(false);
      }
    };
    
    // Only add listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className={styles.header} ref={containerRef}>

      <div className={styles.headerContent}>

        <div className={styles.leftSection}>
          <h1 className={styles.companyName}>Indegene</h1>
          <p className={styles.description}>
            Trusted partner of healthcare organizations.
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
            ref={searchContainerRef}
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

          {/* DROPDOWN PANEL - Only show when user types */}
          {isOpen && searchText.trim().length > 0 && (
            <div ref={dropdownPanelRef} className={styles.dropdownPanel}>
              <FilterDropdown
                searchText={searchText}
                spHttpClient={props.context.spHttpClient}
                siteUrl={props.context.pageContext.web.absoluteUrl}
                context={props.context}
              />
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

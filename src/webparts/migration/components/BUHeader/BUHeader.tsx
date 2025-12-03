import * as React from 'react';
import { IBUHeaderProps } from './IBUHeaderProps';
import styles from './BUHeader.module.scss';

export const BUHeader: React.FunctionComponent<IBUHeaderProps> = (props) => {
  const handleBack = () => {
    if (props.onBack) {
      props.onBack();
    }
  };

  return (
    <div className={styles.buHeader}>
      <div className={styles.headerContent}>
        <div className={styles.leftSection}>
          <button className={styles.backButton} onClick={handleBack}>
            <svg 
              className={styles.backArrow} 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" 
                fill="white"
              />
            </svg>
          </button>
          <h1 className={styles.buName}>{props.buName}</h1>
          <p className={styles.description}>
            About the business unit, the services they provide...etc
          </p>
          <button className={styles.addFileButton}>Upload File</button>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.buHead}>BU Head</div>
          <div className={styles.searchContainer}>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};
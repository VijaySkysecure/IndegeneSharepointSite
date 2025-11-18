import * as React from 'react';
import { IFooterProps } from './IFooterProps';
import styles from './Footer.module.scss';

export const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.logoSquare}></div>
          <span className={styles.logoText}>indegene</span>
        </div>
      </div>
    </footer>
  );
};




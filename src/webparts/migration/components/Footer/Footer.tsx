import * as React from 'react';
import { useState } from 'react';
import { IFooterProps } from './IFooterProps';
import { Panel } from '@fluentui/react';
import styles from './Footer.module.scss';

export const Footer: React.FunctionComponent<IFooterProps> = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const openPanel = () => {
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.logoSquare}></div>
          <span className={styles.logoText}>indegene</span>
        </div>
      </div>



      {/* SharePoint Copilot Panel */}
      <Panel
        isOpen={isOpen}
        onDismiss={closePanel}
        closeButtonAriaLabel="Close"
        headerText="Indegene Copilot"
        isLightDismiss
      >
        <div style={{ width: "100%", height: "600px" }}>
          {/* The Copilot Studio Web Part will render here */}
          <div id="copilotContainer"></div>
        </div>
      </Panel>

    </footer>
  );
};

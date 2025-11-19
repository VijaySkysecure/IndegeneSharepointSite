import * as React from 'react';
import { IQuickLinksPageProps } from './IQuickLinksPageProps';
import styles from './QuickLinksPage.module.scss';

export const QuickLinksPage: React.FunctionComponent<IQuickLinksPageProps> = (props) => {
  const quickLinks = [
    'Case Studies',
    'Capabilities',
    'Proposals',
    'RFIs',
    'Battlecards',
    'Sessions',
    'Blogs',
    'Reports',
    'Newsletters',
    'Other Knowledge Artifacts'
  ];

  const handleLinkClick = (link: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Redirection will be configured later
    console.log(`Clicked: ${link}`);
  };

  return (
    <div className={styles.quickLinksPage}>
      <div className={styles.pageContainer}>
        <div className={styles.quickLinksSidebar}>
          <h2 className={styles.sidebarTitle}>Quick Links</h2>
          <ul className={styles.linksList}>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick(link, e)}
                  className={styles.linkItem}
                >
                  <span className={styles.linkArrow}>&gt;</span>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


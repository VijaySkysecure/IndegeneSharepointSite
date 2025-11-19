import * as React from 'react';
import { IBUNavigationProps } from './IBUNavigationProps';
import styles from './BUNavigation.module.scss';

export const BUNavigation: React.FunctionComponent<IBUNavigationProps> = (props) => {
  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Service Lines', id: 'servicelines' },
    { label: 'Client Testimonials', id: 'testimonials' },
    { label: "Who's Who", id: 'whoswho' },
    { label: 'Community', id: 'community' },
    { label: 'Quick Links', id: 'quicklinks' }
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, pageId: string) => {
    e.preventDefault();
    props.onNavClick(pageId);
  };

  return (
    <nav className={styles.buNavigation}>
      <div className={styles.navContainer}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => handleClick(e, item.id)}
            className={`${styles.navItem} ${props.activePage === item.id ? styles.active : ''}`}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className={styles.dottedLine}></div>
    </nav>
  );
};


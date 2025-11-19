import * as React from 'react';
import { INavigationProps } from './INavigationProps';
import styles from './Navigation.module.scss';

export const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'BUs', id: 'bus' },
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
    <nav className={styles.navigation}>
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
    </nav>
  );
};




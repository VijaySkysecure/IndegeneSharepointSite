import * as React from 'react';
import { INavigationProps } from './INavigationProps';
import styles from './Navigation.module.scss';

export const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
  const navItems = [
    { label: 'About', active: true },
    { label: 'BUs', active: false },
    { label: 'Client Testimonials', active: false },
    { label: "Who's Who", active: false },
    { label: 'Community', active: false },
    { label: 'Quick Links', active: false }
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        {navItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`${styles.navItem} ${item.active ? styles.active : ''}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};




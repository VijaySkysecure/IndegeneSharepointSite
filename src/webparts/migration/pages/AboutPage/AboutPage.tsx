import * as React from 'react';
import { IAboutPageProps } from './IAboutPageProps';
import styles from './AboutPage.module.scss';

export const AboutPage: React.FunctionComponent<IAboutPageProps> = (props) => {
  return (
    <div className={styles.aboutPage}>
      <h1>About Page</h1>
      <p>This page will be implemented in the future.</p>
    </div>
  );
};




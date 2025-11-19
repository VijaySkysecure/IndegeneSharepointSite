import * as React from 'react';
import { IAboutPageProps } from './IAboutPageProps';
import styles from './AboutPage.module.scss';

export const AboutPage: React.FunctionComponent<IAboutPageProps> = (props) => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.contentContainer}>
        <p className={styles.contentText}>
          A detailed writeup on BU, their service offerings, the clients etc.
        </p>
        <div className={styles.carouselIndicators}>
          <span className={`${styles.dot} ${styles.active}`}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    </div>
  );
};




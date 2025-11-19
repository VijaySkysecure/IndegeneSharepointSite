import * as React from 'react';
import { IBUsPageProps } from './IBUsPageProps';
import styles from './BUsPage.module.scss';

export const BUsPage: React.FunctionComponent<IBUsPageProps> = (props) => {
  const buButtons = ['ECS', 'EM', 'Clinical', 'OA', 'Global Ops'];

  return (
    <div className={styles.busPage}>
      <div className={styles.contentContainer}>
        <div className={styles.buttonsGrid}>
          {buButtons.map((bu, index) => (
            <button key={index} className={styles.buButton}>
              {bu}
            </button>
          ))}
        </div>
        <div className={styles.carouselIndicators}>
          <span className={`${styles.dot} ${styles.active}`}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    </div>
  );
};


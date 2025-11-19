import * as React from 'react';
import { IWhosWhoPageProps } from './IWhosWhoPageProps';
import styles from './WhosWhoPage.module.scss';

export const WhosWhoPage: React.FunctionComponent<IWhosWhoPageProps> = (props) => {
  const [activeBU, setActiveBU] = React.useState<string>('BU 1');
  const buButtons = ['ECS', 'EM', 'Clinical', 'OA', 'Global Ops'];

  return (
    <div className={styles.whosWhoPage}>
      <div className={styles.contentContainer}>
        <div className={styles.buFilters}>
          {buButtons.map((bu) => (
            <button
              key={bu}
              onClick={() => setActiveBU(bu)}
              className={`${styles.buFilterButton} ${activeBU === bu ? styles.active : ''}`}
            >
              {bu}
            </button>
          ))}
        </div>
        <div className={styles.mainContentBlock}>
          <p className={styles.contentText}>BU Head | SL 1 | SL 2 | SL 3 | SL 4 | SL 5</p>
        </div>
        <div className={styles.carouselIndicators}>
          <span className={styles.dot}></span>
          <span className={`${styles.dot} ${styles.active}`}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    </div>
  );
};


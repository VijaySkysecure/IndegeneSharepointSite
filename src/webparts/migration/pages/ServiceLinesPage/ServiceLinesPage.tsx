import * as React from 'react';
import { IServiceLinesPageProps } from './IServiceLinesPageProps';
import styles from './ServiceLinesPage.module.scss';

export const ServiceLinesPage: React.FunctionComponent<IServiceLinesPageProps> = (props) => {
  const serviceLines = ['SL 1', 'SL 2', 'SL 3', 'SL 4', 'SL 5', 'SL 6', 'SL 7'];

  return (
    <div className={styles.serviceLinesPage}>
      <div className={styles.contentContainer}>
        <div className={styles.buttonsGrid}>
          {serviceLines.map((sl, index) => (
            <button key={index} className={styles.slButton}>
              {sl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


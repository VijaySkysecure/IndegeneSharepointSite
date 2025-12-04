import * as React from 'react';
import { IBUsPageProps } from './IBUsPageProps';
import styles from './BUsPage.module.scss';

export const BUsPage: React.FunctionComponent<IBUsPageProps> = (props) => {
  const buButtons = ['ECS', 'EM', 'Clinical', 'OA', 'Global Ops'];

  const handleBUClick = (buName: string) => {
    if (props.onBUClick) {
      props.onBUClick(buName);
    }
  };

  return (
    <div className={styles.busPage}>
      <div className={styles.contentContainer}>
        <div className={styles.buttonsGrid}>
          {buButtons.map((bu, index) => (
            <button 
              key={index} 
              className={styles.buButton}
              onClick={() => handleBUClick(bu)}
            >
              {bu}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


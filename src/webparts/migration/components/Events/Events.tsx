import * as React from 'react';
import { IEventsProps } from './IEventsProps';
import styles from './Events.module.scss';

export const Events: React.FunctionComponent<IEventsProps> = (props) => {
  return (
    <div className={styles.events}>
      <div className={styles.eventsContainer}>
        <p className={styles.eventsText}>
          Events ongoing, upcoming, past recordings etc
        </p>
        <div className={styles.carouselIndicators}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    </div>
  );
};




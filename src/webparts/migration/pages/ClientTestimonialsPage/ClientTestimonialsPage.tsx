import * as React from 'react';
import { IClientTestimonialsPageProps } from './IClientTestimonialsPageProps';
import styles from './ClientTestimonialsPage.module.scss';

export const ClientTestimonialsPage: React.FunctionComponent<IClientTestimonialsPageProps> = (props) => {
  const testimonials = [1, 2, 3];

  return (
    <div className={styles.testimonialsPage}>
      <div className={styles.contentContainer}>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((index) => (
            <div key={index} className={styles.testimonialCard}>
              <p className={styles.testimonialText}>Client Feedback or testimonials.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


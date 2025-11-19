import * as React from 'react';
import { IContentAreaProps } from './IContentAreaProps';
import { AboutPage } from '../../pages/AboutPage/AboutPage';
import { BUsPage } from '../../pages/BUsPage/BUsPage';
import { ClientTestimonialsPage } from '../../pages/ClientTestimonialsPage/ClientTestimonialsPage';
import styles from './ContentArea.module.scss';

export const ContentArea: React.FunctionComponent<IContentAreaProps> = (props) => {
  const renderContent = () => {
    switch (props.activePage) {
      case 'about':
        return <AboutPage context={props.context} />;
      case 'bus':
        return <BUsPage context={props.context} />;
      case 'testimonials':
        return <ClientTestimonialsPage context={props.context} />;
      default:
        return (
          <div className={styles.contentArea}>
            <div className={styles.contentContainer}>
              <p className={styles.contentText}>
                Content for {props.activePage} will be displayed here.
              </p>
            </div>
          </div>
        );
    }
  };

  return <>{renderContent()}</>;
};


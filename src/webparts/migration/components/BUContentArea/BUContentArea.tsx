import * as React from 'react';
import { IBUContentAreaProps } from './IBUContentAreaProps';
import { AboutPage } from '../../pages/AboutPage/AboutPage';
import { ServiceLinesPage } from '../../pages/ServiceLinesPage/ServiceLinesPage';
import { ClientTestimonialsPage } from '../../pages/ClientTestimonialsPage/ClientTestimonialsPage';
import { WhosWhoPage } from '../../pages/WhosWhoPage/WhosWhoPage';
import { CommunityPage } from '../../pages/CommunityPage/CommunityPage';
import { QuickLinksPage } from '../../pages/QuickLinksPage/QuickLinksPage';
import styles from './BUContentArea.module.scss';

export const BUContentArea: React.FunctionComponent<IBUContentAreaProps> = (props) => {
  const renderContent = () => {
    switch (props.activePage) {
      case 'about':
        return <AboutPage context={props.context} />;
      case 'servicelines':
        return <ServiceLinesPage context={props.context} />;
      case 'testimonials':
        return <ClientTestimonialsPage context={props.context} />;
      case 'whoswho':
        return <WhosWhoPage context={props.context} />;
      case 'community':
        return <CommunityPage context={props.context} />;
      case 'quicklinks':
        return <QuickLinksPage context={props.context} />;
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


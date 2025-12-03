import * as React from 'react';
import { IBUDetailPageProps } from './IBUDetailPageProps';
import { BUHeader } from '../BUHeader/BUHeader';
import { BUNavigation } from '../BUNavigation/BUNavigation';
import { BUContentArea } from '../BUContentArea/BUContentArea';
import { BUQuestionSection } from '../BUQuestionSection/BUQuestionSection';
import styles from './BUDetailPage.module.scss';

export const BUDetailPage: React.FunctionComponent<IBUDetailPageProps> = (props) => {
  const [activePage, setActivePage] = React.useState<string>('about');

  const handleNavClick = (page: string): void => {
    setActivePage(page);
  };

  return (
    <div className={styles.buDetailPage}>
      <BUHeader buName={props.buName} onBack={props.onBack} />
      <BUNavigation activePage={activePage} onNavClick={handleNavClick} />
      <BUContentArea activePage={activePage} context={props.context} />
      <BUQuestionSection />
    </div>
  );
};

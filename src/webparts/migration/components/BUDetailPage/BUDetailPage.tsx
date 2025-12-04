import * as React from 'react';
import { IBUDetailPageProps } from './IBUDetailPageProps';
import { BUHeader } from '../BUHeader/BUHeader';
import { BUNavigation } from '../BUNavigation/BUNavigation';
import { BUContentArea } from '../BUContentArea/BUContentArea';
// FIX: Changed import name from BUQuestionSection to QuestionSection
import { QuestionSection } from '../BUQuestionSection/BUQuestionSection';
import { Footer } from '../Footer/Footer';
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
      {/* FIX: Changed component usage from BUQuestionSection to QuestionSection */}
      <QuestionSection /> 
      <Footer />
    </div>
  );
};
import * as React from 'react';
import { IMigrationProps } from './IMigrationProps';
import { Header } from './Header/Header';
import { Navigation } from './Navigation/Navigation';
import { Events } from './Events/Events';
import { QuestionSection } from './QuestionSection/QuestionSection';
import { Footer } from './Footer/Footer';
import styles from './Migration.module.scss';

export default class Migration extends React.Component<IMigrationProps, {}> {
  public render(): React.ReactElement<IMigrationProps> {
    return (
      <div className={styles.migration}>
        <Header />
        <Navigation />
        <Events />
        <QuestionSection />
        <Footer />
      </div>
    );
  }
}


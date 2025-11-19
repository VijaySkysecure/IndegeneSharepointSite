import * as React from 'react';
import { IMigrationProps } from './IMigrationProps';
import { Header } from './Header/Header';
import { Navigation } from './Navigation/Navigation';
import { QuestionSection } from './QuestionSection/QuestionSection';
import { Footer } from './Footer/Footer';
import { ContentArea } from './ContentArea/ContentArea';
import styles from './Migration.module.scss';

interface IMigrationState {
  activePage: string;
}

export default class Migration extends React.Component<IMigrationProps, IMigrationState> {
  constructor(props: IMigrationProps) {
    super(props);
    this.state = {
      activePage: 'about'
    };
  }

  public componentDidMount(): void {
    // Add Inter font if not already added
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }

  private handleNavClick = (page: string): void => {
    this.setState({ activePage: page });
  }

  public render(): React.ReactElement<IMigrationProps> {
    return (
      <div className={styles.migration}>
        <Header />
        <Navigation activePage={this.state.activePage} onNavClick={this.handleNavClick} />
        <ContentArea activePage={this.state.activePage} context={this.props.context} />
        <QuestionSection />
        <Footer />
      </div>
    );
  }
}


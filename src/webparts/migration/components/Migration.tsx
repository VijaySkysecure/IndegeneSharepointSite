import * as React from 'react';
import { IMigrationProps } from './IMigrationProps';
import { Header } from './Header/Header';
import { Navigation } from './Navigation/Navigation';
import { QuestionSection } from './QuestionSection/QuestionSection';
import { ContentArea } from './ContentArea/ContentArea';
import { BUDetailPage } from './BUDetailPage/BUDetailPage';
import styles from './Migration.module.scss';

// 🆕 Import AzureOpenAIService + config
import { AzureOpenAIService } from '../services/AzureOpenAIService';
import {
  AZURE_OPENAI_API_KEY,
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_DEPLOYMENT
} from '../services/SearchConfig';

interface IMigrationState {
  activePage: string;
  selectedBU: string | null;
}

export default class Migration extends React.Component<IMigrationProps, IMigrationState> {
  // 🆕 Single instance of the service for this component
  private azureService: AzureOpenAIService;

  constructor(props: IMigrationProps) {
    super(props);
    this.state = {
      activePage: 'about',
      selectedBU: null
    };

    // 🆕 Initialize AzureOpenAIService
    this.azureService = new AzureOpenAIService({
      apiKey: AZURE_OPENAI_API_KEY,
      endpoint: AZURE_OPENAI_ENDPOINT,
      deploymentName: AZURE_OPENAI_DEPLOYMENT
    });
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

  private handleBUClick = (buName: string): void => {
    this.setState({ selectedBU: buName, activePage: 'about' });
  }

  private handleBackToMain = (): void => {
    this.setState({ selectedBU: null, activePage: 'about' });
  }



  public render(): React.ReactElement<IMigrationProps> {
    // If a BU is selected, show BU detail page
    if (this.state.selectedBU) {
      return (
        <div className={styles.migration}>
          <BUDetailPage 
            buName={this.state.selectedBU} 
            context={this.props.context}
            onBack={this.handleBackToMain}
          />
        </div>
      );
    }

    // Otherwise show main page
    return (
      <div className={styles.migration}>
        <Header context={this.props.context} />
        <Navigation activePage={this.state.activePage} onNavClick={this.handleNavClick} />
        <ContentArea 
          activePage={this.state.activePage} 
          context={this.props.context}
          onBUClick={this.handleBUClick}
        />
        <QuestionSection context={this.props.context} />
      </div>
    );
  }
}

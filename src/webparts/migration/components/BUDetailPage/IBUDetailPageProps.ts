import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IBUDetailPageProps {
  buName: string;
  context?: WebPartContext;
  onBack?: () => void;
}


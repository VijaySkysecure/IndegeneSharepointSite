import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IBUsPageProps {
  context?: WebPartContext;
  onBUClick?: (buName: string) => void;
}


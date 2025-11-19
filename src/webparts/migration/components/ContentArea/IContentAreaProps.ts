import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IContentAreaProps {
  activePage: string;
  context?: WebPartContext;
  onBUClick?: (buName: string) => void;
}


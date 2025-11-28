import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IDocumentDetailPageProps {
  context: WebPartContext;
  documentId: number;
  onClose?: () => void;
}


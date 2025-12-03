import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IViewAllDocumentsPageProps {
  context: WebPartContext;
  onClose: () => void;
  onViewDocument: (documentId: number, tags?: string[]) => void;
}


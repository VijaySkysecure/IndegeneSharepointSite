import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IDocumentDetailPageProps {
  context: WebPartContext;
  documentId: number;
  onClose?: () => void;
  tags?: string[]; // Optional tags passed from ViewAllDocumentsPage
  backTo?: 'home' | 'library'; // Where to go back to: 'home' for tiles, 'library' for view all page
  onBackToLibrary?: () => void; // Callback to go back to library (ViewAllDocumentsPage)
}


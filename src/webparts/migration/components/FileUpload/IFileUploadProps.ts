import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IFileUploadProps {
  onClose?: () => void;
  onUploaded?: (file: File) => void;
  /** SPFx WebPart context used to call SharePoint REST APIs */
  context: WebPartContext;
}

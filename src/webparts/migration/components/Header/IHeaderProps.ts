import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IHeaderProps {
  /** Pass SPFx context so Header can open FileUpload and that can call SharePoint APIs */
  context: WebPartContext;
}




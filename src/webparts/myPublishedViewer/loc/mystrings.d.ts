declare interface IMyPublishedViewerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListTitleLabel: string;
  ColumnsLabel: string;
  ModeLabel: string;
  LoadingMessage: string;
  NoDocumentsMessage: string;
}

declare module 'MyPublishedViewerWebPartStrings' {
  const strings: IMyPublishedViewerWebPartStrings;
  export = strings;
}

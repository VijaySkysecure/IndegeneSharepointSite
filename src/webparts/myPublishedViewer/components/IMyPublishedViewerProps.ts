export interface IMyPublishedViewerProps {
  context: any; // SPFx WebPart context
  mode: 'myDocuments' | 'published';
  listTitle: string;
  columns: string; // comma-separated list of column internal names (CSV)
}

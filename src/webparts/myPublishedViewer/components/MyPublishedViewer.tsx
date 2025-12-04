// MyPublishedViewer.tsx
// MyPublishedViewer.tsx
// Clean, corrected version with column label mapping and per-column expand/collapse

import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import { IMyPublishedViewerProps } from './IMyPublishedViewerProps';

export interface IMyPublishedViewerState {
  items: any[];
  loading: boolean;
  expandedCols: string[];
  hoverCol?: string;
}

// Map internal column/internal field names -> friendly display labels
const COLUMN_LABELS: { [internalName: string]: string } = {
  DocIcon: 'Type',
  FileLeafRef: 'Name',
  Status: 'Status',
  TitleName: 'Title Name',
  Abstract: 'Abstract',
  BusinessUnit: 'Business Unit',
  Department: 'Department',
  Region: 'Region',
  Client: 'Client',
  DocumentType: 'Document Type',
  DiseaseArea: 'Disease Area',
  TherapyArea: 'Therapy Area',
  Emails: 'Emails',
  Phones: 'Phones',
  IDs: 'IDs',
  SensitiveTerms: 'Sensitive Terms',
  PerformedBy: 'Performed By',
  TimeStamp: 'Time Stamp',
  KMCorrections: 'KM Corrections',
  KMComments: 'KM Comments',
  Modified: 'Modified',
  Editor: 'Modified By'
};

export default class MyPublishedViewer extends React.Component<IMyPublishedViewerProps, IMyPublishedViewerState> {

  constructor(props: IMyPublishedViewerProps) {
    super(props);
    // All columns will be expanded by default with standard formatting
    this.state = { items: [], loading: true, expandedCols: [], hoverCol: undefined };
  }

  // Get standard column width based on column type
  private getColumnWidth(col: string): { width: string; minWidth: string; maxWidth: string } {
    if (col === "Abstract") {
      return { width: "600px", minWidth: "400px", maxWidth: "600px" };
    } else if (col === "FileLeafRef" || col === "TitleName") {
      return { width: "400px", minWidth: "250px", maxWidth: "400px" };
    } else if (col === "KMCorrections" || col === "KMComments") {
      return { width: "500px", minWidth: "300px", maxWidth: "500px" };
    } else {
      return { width: "200px", minWidth: "150px", maxWidth: "300px" };
    }
  }

  public async componentDidMount() {
    await this.loadItems();
  }

  private async getCurrentUserId(): Promise<number> {
    const resp = await this.props.context.spHttpClient.get(
      `${this.props.context.pageContext.web.absoluteUrl}/_api/web/currentuser`,
      SPHttpClient.configurations.v1
    );
    if (!resp.ok) {
      throw new Error(`Failed to get current user: ${resp.status} ${resp.statusText}`);
    }
    const user = await resp.json();
    return user.Id; // numeric ID
  }

  private async loadItems() {
    try {
      const siteUrl = this.props.context.pageContext.web.absoluteUrl;

      let filter = '';

      if (this.props.mode === 'myDocuments') {
        // My Documents: Show only documents created by the current user
        const currentUserId = await this.getCurrentUserId();
        filter = `PerformedBy/Id eq ${currentUserId}`;
        console.log(`[MyPublishedViewer] My Documents mode - Filtering by user ID: ${currentUserId}`);
      } else if (this.props.mode === 'published') {
        // Published: Show ALL published documents from ALL users (no user filter)
        // Note: SharePoint will automatically apply security trimming - users will only see documents they have read permissions for
        filter = `Status eq 'Published'`;
        console.log(`[MyPublishedViewer] Published mode - Showing all published documents (security trimmed by SharePoint)`);
      } else {
        // Default: Show all published documents
        filter = `Status eq 'Published'`;
        console.log(`[MyPublishedViewer] Default mode - Showing all published documents`);
      }

      // Convert comma separated list to array
      const colArray = (this.props.columns || '').split(',').map(c => c.trim()).filter(c => c);
      // Ensure we always select Id (used as React key) and avoid duplicates
      const additionalCols: string[] = [
        'Id',
        'PerformedBy/Id',
        'PerformedBy/Title',
        'Editor/Id',
        'Editor/Title'
      ];

      // If the user requested FileLeafRef (filename), also request FileRef (server-relative URL)
      if (colArray.indexOf('FileLeafRef') !== -1) {
        additionalCols.push('FileRef');
      }

      const selectColsForQuery = Array.from(new Set([
        ...colArray,
        ...additionalCols
      ])).join(',');

      const url =
        `${siteUrl}/_api/web/lists/getbytitle('${this.props.listTitle}')/items` +
        `?$select=${selectColsForQuery}` +
        `&$expand=PerformedBy,Editor` +
        `&$filter=${encodeURIComponent(filter)}` +
        `&$orderby=Modified desc`;

      console.log(`[MyPublishedViewer] Fetching from: ${url}`);
      console.log(`[MyPublishedViewer] Mode: ${this.props.mode}, Filter: ${filter}`);

      const resp = await this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1);
      
      if (!resp.ok) {
        const errorText = await resp.text();
        console.error(`[MyPublishedViewer] API Error - Status: ${resp.status}, Response:`, errorText);
        throw new Error(`Failed to load items: ${resp.status} ${resp.statusText}. ${errorText}`);
      }
      
      const data = await resp.json();
      const items = data.value || [];
      
      console.log(`[MyPublishedViewer] Successfully loaded ${items.length} items`);
      if (items.length === 0) {
        console.warn(`[MyPublishedViewer] No items returned. This could be due to:`);
        console.warn(`  - No documents match the filter criteria`);
        console.warn(`  - User doesn't have read permissions on the documents`);
        console.warn(`  - Library permissions may need to be adjusted for regular users`);
      }

      this.setState({
        items: items,
        loading: false
      });

    } catch (e) {
      console.error('[MyPublishedViewer] Error loading items:', e);
      console.error('[MyPublishedViewer] Error details:', {
        mode: this.props.mode,
        listTitle: this.props.listTitle,
        error: e instanceof Error ? e.message : String(e)
      });
      this.setState({ items: [], loading: false });
    }
  }

  private toggleExpandColumn(col: string) {
    this.setState(prev => {
      const expanded = new Set(prev.expandedCols || []);
      if (expanded.has(col)) {
        expanded.delete(col);
      } else {
        expanded.add(col);
      }
      return { expandedCols: Array.from(expanded) } as any;
    });
  }

  public render(): React.ReactElement<IMyPublishedViewerProps> {

    const { items, loading, expandedCols, hoverCol } = this.state;
    const colArray = (this.props.columns || '').split(',').map(c => c.trim()).filter(c => c);

    return (
      <div style={{ overflowX: "auto", width: "100%" }}>
        {loading && <div>Loading...</div>}

        {!loading && items.length === 0 && (
          <div>No documents found.</div>
        )}

        {!loading && items.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {colArray.map(col => {
                  const isHovered = hoverCol === col;
                  const isExpanded = expandedCols && expandedCols.indexOf(col) !== -1;
                  return (
                    <th
                      key={col}
                      onMouseEnter={() => this.setState({ hoverCol: col })}
                      onMouseLeave={() => this.setState({ hoverCol: undefined })}
                      style={{
                        textAlign: "center",
                        borderBottom: "1px solid #ccc",
                        padding: "8px",
                        whiteSpace: "nowrap",
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>{COLUMN_LABELS[col] || col}</span>
                        <button
                          title={isExpanded ? 'Collapse column' : 'Expand column'}
                          onClick={(e) => { e.stopPropagation(); this.toggleExpandColumn(col); }}
                          style={{
                            marginLeft: 6,
                            display: isHovered ? 'inline-block' : 'none',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            padding: 2,
                            lineHeight: 1
                          }}
                        >
                          {isExpanded ? '▾' : '▸'}
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {items.map(item => (
                <tr key={item.Id}>
                  {colArray.map(col => {
                    // Get standard column dimensions
                    const colDimensions = this.getColumnWidth(col);
                    
                    // Apply standard formatting to all columns
                    const style: React.CSSProperties = {
                      padding: "12px",
                      borderBottom: "1px solid #eee",
                      textAlign: "center",
                      verticalAlign: "top",
                      whiteSpace: "pre-wrap",
                      width: colDimensions.width,
                      minWidth: colDimensions.minWidth,
                      maxWidth: colDimensions.maxWidth,
                      minHeight: col === "Abstract" ? "100px" : col === "FileLeafRef" || col === "TitleName" ? "80px" : "60px",
                      maxHeight: "none",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      lineHeight: "1.6"
                    };

                    // Standard formatting wrapper for all cell content
                    const cellContentStyle: React.CSSProperties = {
                      lineHeight: '1.6',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      maxWidth: '100%',
                      whiteSpace: 'pre-wrap',
                      textAlign: 'center'
                    };

                    return (
                      <td key={col} style={style}>
                        
                        {/* 1️⃣ Special handling for PerformedBy */}
                        {col === 'PerformedBy' ? (
                          <div style={cellContentStyle}>
                            {item?.PerformedBy?.Title || ""}
                          </div>
                        ) : col === 'Editor' ? (
                          <div style={cellContentStyle}>
                            {item?.Editor?.Title || ""}
                          </div>

                        /* File Name with link */
                        ) : col === 'FileLeafRef' ? (
                          
                          // 2️⃣ Special handling for FileLeafRef with link
                          item.FileRef ? (
                            <div style={cellContentStyle}>
                              <a
                                href={item.FileRef}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  color: 'inherit',
                                  textDecoration: 'underline',
                                  cursor: 'pointer',
                                  wordWrap: 'break-word',
                                  overflowWrap: 'break-word'
                                }}
                              >
                                {item[col] ? item[col].toString() : ''}
                              </a>
                            </div>
                          ) : (
                            <div style={cellContentStyle}>
                              {item[col] ? item[col].toString() : ''}
                            </div>
                          )

                        ) : (
                          
                          // 3️⃣ Default for all other columns
                          <div style={cellContentStyle}>
                            {item[col] ? item[col].toString() : ''}
                          </div>

                        )}

                      </td>
                    );


                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

}

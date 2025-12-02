import * as React from 'react';
import { IQuestionSectionProps } from './IQuestionSectionProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { DocumentDetailPage } from '../../pages/DocumentDetailPage/DocumentDetailPage';
import styles from './QuestionSection.module.scss';

interface DocumentItem {
  id: number;
  name: string;
  abstract: string;
  fileType: string;
  serverRelativeUrl: string;
  fileRef: string;
}

export const QuestionSection: React.FunctionComponent<IQuestionSectionProps> = (props) => {
  const [documents, setDocuments] = React.useState<DocumentItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedDocumentId, setSelectedDocumentId] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (props.context) {
      fetchLatestDocuments();
    }
  }, [props.context]);

  const fetchLatestDocuments = async () => {
    if (!props.context) {
      setLoading(false);
      return;
    }

    try {
      // SPFx automatically provides the current SharePoint site URL through context
      // If web part is on: https://m365x65470037.sharepoint.com/sites/MigrationTest2
      // Then webUrl will be: https://m365x65470037.sharepoint.com/sites/MigrationTest2
      // No manual configuration needed - it uses the site where the web part is deployed
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const libraryName = 'KMArtifacts';
      
      console.log('=== FETCHING DOCUMENTS FROM DOCUMENT LIBRARY ===');
      console.log('Current Site URL (auto-detected):', webUrl);
      console.log('Target Library:', libraryName);
      console.log('Expected Library URL:', `${webUrl}/KMArtifacts`);
      
      // SharePoint REST API endpoint structure:
      // {siteUrl}/_api/web/lists/getbytitle('LibraryName')/items
      // This works for both lists and document libraries
      // The API automatically uses the site context from webUrl
      // Note: ServerRelativeUrl is not available directly on items - use FileRef instead
      const apiUrl = `${webUrl}/_api/web/lists/getbytitle('${libraryName}')/items?$select=Id,Title,TitleName,Abstract,FileLeafRef,FileRef&$orderby=Created desc&$top=5`;
      
      console.log('Full API Endpoint:', apiUrl);
      console.log('Note: This will work if KMArtifacts library exists on the current site');
      
      const response: SPHttpClientResponse = await props.context.spHttpClient.get(
        apiUrl,
        SPHttpClient.configurations.v1
      );

      console.log('Response status:', response.status);
      console.log('Response OK:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch documents: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      console.log('Items count:', data.value?.length || 0);
      
      const items = data.value || [];
      
      if (items.length > 0) {
        console.log('First item sample:', JSON.stringify(items[0], null, 2));
      }

      const formattedItems: DocumentItem[] = items.map((item: any, index: number) => {
        console.log(`Processing item ${index + 1}:`, item);
        console.log(`All item keys:`, Object.keys(item));
        
        // Get file name from Name column - FileLeafRef is the actual filename in document libraries
        // This is what appears in the "Name" column in SharePoint
        const fileName = item.FileLeafRef || item.File?.Name || '';
        
        // Extract file extension from the Name column for the file format display
        const fileExtension = fileName.split('.').pop()?.toUpperCase() || '';
        
        // Use Name column (FileLeafRef) as the tile title
        // This matches what the user sees in the "Name" column
        let displayName = fileName;
        if (!displayName || displayName === '') {
          displayName = item.Title || `Document ${item.Id}`;
        }
        
        // Get abstract from Abstract column
        let abstract = item.Abstract || '';
        if (abstract === '-' || abstract === '') {
          abstract = '';
        }
        
        // Construct proper server relative URL
        // FileRef contains the full server-relative path like: /sites/MigrationTest2/KMArtifacts/filename.pdf
        // This is the correct field to use for document libraries
        let serverRelativeUrl = item.FileRef || '';
        
        // Ensure it starts with /
        if (serverRelativeUrl && !serverRelativeUrl.startsWith('/')) {
          serverRelativeUrl = `/${serverRelativeUrl}`;
        }
        
        // If we still don't have a URL, construct it from the library name and filename
        if (!serverRelativeUrl && fileName) {
          const siteRelativePath = props.context?.pageContext.web.serverRelativeUrl || '';
          serverRelativeUrl = `${siteRelativePath}/KMArtifacts/${fileName}`;
        }
        
        const formatted = {
          id: item.Id,
          name: displayName,
          abstract: abstract,
          fileType: fileExtension,
          serverRelativeUrl: serverRelativeUrl,
          fileRef: item.FileRef || serverRelativeUrl
        };
        
        console.log(`Formatted item ${index + 1}:`, formatted);
        return formatted;
      });

      console.log('Formatted items:', formattedItems);
      setDocuments(formattedItems);
    } catch (error) {
      console.error('=== ERROR FETCHING DOCUMENTS ===');
      console.error('Error type:', typeof error);
      console.error('Error details:', error);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');
      
      // Set empty array on error so we still show empty tiles
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const getFileTypeIcon = (fileType: string): string => {
    const type = fileType.toLowerCase();
    if (type === 'pdf') {
      return '📄';
    } else if (type === 'pptx' || type === 'ppt') {
      return '📊';
    } else if (type === 'docx' || type === 'doc') {
      return '📝';
    } else if (type === 'xlsx' || type === 'xls') {
      return '📈';
    }
    return '📎';
  };

  const handleView = (item: DocumentItem) => {
    if (props.context && item.id) {
      // Open document detail page in a modal overlay (full-screen)
      setSelectedDocumentId(item.id);
    }
  };

  const handleCloseDetail = () => {
    setSelectedDocumentId(null);
  };

  const handleDownload = async (item: DocumentItem) => {
    if (props.context && item.serverRelativeUrl) {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      let serverRelativeUrl = item.serverRelativeUrl;
      
      // Ensure proper server relative URL format
      if (!serverRelativeUrl.startsWith('/')) {
        serverRelativeUrl = `/${serverRelativeUrl}`;
      }
      
      // Use SharePoint REST API for authenticated download
      try {
        const downloadUrl = `${webUrl}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(serverRelativeUrl)}')/$value`;
        
        const response = await props.context.spHttpClient.get(
          downloadUrl,
          SPHttpClient.configurations.v1
        );
        
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = item.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          // Fallback to direct link
          const fileUrl = `${webUrl}${serverRelativeUrl}`;
          window.open(fileUrl, '_blank');
        }
      } catch (error) {
        console.error('Download error:', error);
        // Fallback to direct link
        const fileUrl = `${webUrl}${serverRelativeUrl}`;
        window.open(fileUrl, '_blank');
      }
    }
  };

  // Always show 5 tiles + 1 "View All" button, fill with empty placeholders if needed
  const displayTiles = React.useMemo(() => {
    const tiles: (DocumentItem | null)[] = [];
    for (let i = 0; i < 5; i++) {
      tiles.push(documents[i] || null);
    }
    return tiles;
  }, [documents]);

  const handleViewAll = () => {
    // TODO: Implement view all functionality
    console.log('View All clicked');
  };

  return (
    <>
      <div className={styles.questionSection}>
        <h2 className={styles.sectionTitle}>Recently Published</h2>
        <div className={styles.tilesContainer}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <>
              {displayTiles.map((doc, index) => (
                <div key={doc ? doc.id : `empty-${index}`} className={styles.tile}>
                  {doc ? (
                    <>
                      <div className={styles.tileHeader}>
                        <div className={styles.fileTypeIcon}>{getFileTypeIcon(doc.fileType)}</div>
                        <span className={styles.fileType}>{doc.fileType || 'FILE'}</span>
                      </div>
                      <h3 className={styles.tileTitle}>{doc.name}</h3>
                      <p className={styles.tileAbstract}>{doc.abstract || 'No abstract available'}</p>
                      <div className={styles.tileActions}>
                        <button 
                          className={styles.viewButton}
                          onClick={() => handleView(doc)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          View
                        </button>
                        <button 
                          className={styles.downloadButton}
                          onClick={() => handleDownload(doc)}
                          aria-label="Download"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.tileHeader}>
                        <div className={styles.fileTypeIcon}>📎</div>
                        <span className={styles.fileType}>---</span>
                      </div>
                      <h3 className={styles.tileTitle}>No document</h3>
                      <p className={styles.tileAbstract}>No document available</p>
                      <div className={styles.tileActions}>
                        <button className={styles.viewButton} disabled>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          View
                        </button>
                        <button className={styles.downloadButton} disabled aria-label="Download">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <button className={styles.viewAllTile} onClick={handleViewAll}>
                <span className={styles.viewAllText}>View All</span>
              </button>
            </>
          )}
        </div>
      </div>
      
      {selectedDocumentId && props.context && (
        <div className={styles.detailModal}>
          <DocumentDetailPage 
            context={props.context} 
            documentId={selectedDocumentId}
            onClose={handleCloseDetail}
          />
        </div>
      )}
    </>
  );
};




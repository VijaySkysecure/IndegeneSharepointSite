import * as React from 'react';
import { IViewAllDocumentsPageProps } from './IViewAllDocumentsPageProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { AzureOpenAIService } from '../../services/AzureOpenAIService';
import styles from './ViewAllDocumentsPage.module.scss';

// Azure OpenAI Configuration
const AZURE_OPENAI_CONFIG = {
  apiKey: '2Hcf7EkLSg88ySVEjrapikrQjIFA4F4BGgshU8Gwci15RkklqgGDJQQJ99BIACYeBjFXJ3w3AAABACOGHLjU',
  endpoint: 'https://engineeringteamopenai.openai.azure.com',
  deploymentName: 'gpt-4o'
};

interface DocumentItem {
  id: number;
  name: string;
  abstract: string;
  fileType: string;
  author: string;
  date: string;
  fileSize: string;
  serverRelativeUrl: string;
  fileRef: string;
  tags: string[];
}

export const ViewAllDocumentsPage: React.FunctionComponent<IViewAllDocumentsPageProps> = (props) => {
  const [documents, setDocuments] = React.useState<DocumentItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [tagsLoading, setTagsLoading] = React.useState<boolean>(false);
  const openAIService = React.useRef<AzureOpenAIService>(new AzureOpenAIService(AZURE_OPENAI_CONFIG));

  React.useEffect(() => {
    if (props.context) {
      fetchAllDocuments();
    }
  }, [props.context]);

  // Load tags asynchronously after documents are displayed
  React.useEffect(() => {
    if (documents.length > 0 && documents.some(doc => doc.tags.length === 0 && doc.abstract)) {
      loadTagsAsync();
    }
  }, [documents.length]);

  const fetchAllDocuments = async () => {
    if (!props.context) {
      setLoading(false);
      return;
    }

    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const libraryName = 'KMArtifacts';
      
      // Fetch all documents with all needed fields including Tags
      // Filter to only show documents with Status = "Published"
      const apiUrl = `${webUrl}/_api/web/lists/getbytitle('${libraryName}')/items?$select=Id,Title,TitleName,Abstract,FileLeafRef,FileRef,Status,PerformedBy/Title,PerformedBy/Name,TimeStamp,File/Length,File/ServerRelativeUrl,Tags&$filter=Status eq 'Published'&$expand=PerformedBy,File&$orderby=Created desc`;
      
      const response: SPHttpClientResponse = await props.context.spHttpClient.get(
        apiUrl,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch documents: ${response.status}`);
      }

      const data = await response.json();
      const items = data.value || [];

      // Process items WITHOUT waiting for AI tags - show page immediately
      const processedDocuments: DocumentItem[] = items.map((item: any) => {
        const fileName = item.FileLeafRef || item.TitleName || item.Title || '';
        const fileExtension = fileName.split('.').pop()?.toUpperCase() || '';
        const displayName = fileName || item.Title || `Document ${item.Id}`;
        const abstract = item.Abstract || '';
        
        // Get author from PerformedBy (person field)
        const author = item.PerformedBy?.Title || item.PerformedBy?.Name || item.PerformedBy || 'Unknown';
        
        // Format date from TimeStamp
        let formattedDate = '';
        if (item.TimeStamp) {
          const date = new Date(item.TimeStamp);
          formattedDate = date.toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
          });
        }
        
        // Get file size
        let fileSize = '';
        if (item.File && item.File.Length) {
          const bytes = item.File.Length;
          if (bytes < 1024) {
            fileSize = `${bytes} B`;
          } else if (bytes < 1024 * 1024) {
            fileSize = `${(bytes / 1024).toFixed(1)} KB`;
          } else {
            fileSize = `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
          }
        }
        
        const serverRelativeUrl = item.FileRef || item.File?.ServerRelativeUrl || '';
        
        // Parse tags from SharePoint if they exist
        let tags: string[] = [];
        if (item.Tags) {
          try {
            // Tags might be stored as JSON string or comma-separated
            if (typeof item.Tags === 'string') {
              if (item.Tags.startsWith('[')) {
                tags = JSON.parse(item.Tags);
              } else {
                tags = item.Tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
              }
            } else if (Array.isArray(item.Tags)) {
              tags = item.Tags;
            }
          } catch (error) {
            console.error('Error parsing tags for document', item.Id, error);
            tags = [];
          }
        }
        
        return {
          id: item.Id,
          name: displayName,
          abstract: abstract,
          fileType: fileExtension,
          author: author,
          date: formattedDate,
          fileSize: fileSize,
          serverRelativeUrl: serverRelativeUrl,
          fileRef: item.FileRef || serverRelativeUrl,
          tags: tags // Use stored tags if available
        };
      });

      // Show documents immediately
      setDocuments(processedDocuments);
      setLoading(false);
      
      // Start loading tags asynchronously
      loadTagsAsync(processedDocuments);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setDocuments([]);
      setLoading(false);
    }
  };

  const loadTagsAsync = async (docs?: DocumentItem[]) => {
    const documentsToProcess = docs || documents;
    const documentsNeedingTags = documentsToProcess.filter(doc => 
      doc.tags.length === 0 && doc.abstract && doc.abstract.trim().length > 0
    );

    if (documentsNeedingTags.length === 0) return;

    setTagsLoading(true);

    // Process tags in batches to avoid overwhelming the API
    const batchSize = 5;
    for (let i = 0; i < documentsNeedingTags.length; i += batchSize) {
      const batch = documentsNeedingTags.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (doc) => {
          try {
            const tags = await openAIService.current.generateTags(doc.abstract);
            
            // Save tags to SharePoint
            await saveTagsToSharePoint(doc.id, tags);
            
            // Update the specific document with tags
            setDocuments(prev => prev.map(d => 
              d.id === doc.id ? { ...d, tags } : d
            ));
          } catch (error) {
            console.error(`Error generating tags for document ${doc.id}:`, error);
          }
        })
      );

      // Small delay between batches to avoid rate limiting
      if (i + batchSize < documentsNeedingTags.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    setTagsLoading(false);
  };

  const saveTagsToSharePoint = async (itemId: number, tags: string[]) => {
    if (!props.context || !tags || tags.length === 0) return;

    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const libraryName = 'KMArtifacts';
      
      // Get entity type
      const listInfoResp = await props.context.spHttpClient.get(
        `${webUrl}/_api/web/lists/getbytitle('${libraryName}')?$select=ListItemEntityTypeFullName`,
        SPHttpClient.configurations.v1
      );
      
      if (!listInfoResp.ok) {
        console.error('Failed to get list info for saving tags');
        return;
      }
      
      const listInfo = await listInfoResp.json();
      const entityType = listInfo.ListItemEntityTypeFullName;
      
      // Store tags as JSON string
      const tagsJson = JSON.stringify(tags);
      
      const updateBody = {
        __metadata: { type: entityType },
        Tags: tagsJson
      };
      
      const updateResp = await props.context.spHttpClient.post(
        `${webUrl}/_api/web/lists/getbytitle('${libraryName}')/items(${itemId})`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
            "odata-version": ""
          },
          body: JSON.stringify(updateBody)
        }
      );
      
      if (!updateResp.ok) {
        console.error(`Failed to save tags for document ${itemId}:`, updateResp.status);
      } else {
        console.log(`Tags saved for document ${itemId}:`, tags);
      }
    } catch (error) {
      console.error(`Error saving tags for document ${itemId}:`, error);
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

  const handleView = (documentId: number, tags: string[]) => {
    props.onViewDocument(documentId, tags);
  };

  const handleDownload = async (item: DocumentItem) => {
    if (props.context && item.serverRelativeUrl) {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      let serverRelativeUrl = item.serverRelativeUrl;
      
      if (!serverRelativeUrl.startsWith('/')) {
        serverRelativeUrl = `/${serverRelativeUrl}`;
      }
      
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
          const fileUrl = `${webUrl}${serverRelativeUrl}`;
          window.open(fileUrl, '_blank');
        }
      } catch (error) {
        console.error('Download error:', error);
        const fileUrl = `${webUrl}${serverRelativeUrl}`;
        window.open(fileUrl, '_blank');
      }
    }
  };

  return (
    <div className={styles.viewAllPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={props.onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Home
        </button>
      </div>
      
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>Loading documents...</div>
        ) : documents.length === 0 ? (
          <div className={styles.noDocuments}>No documents found</div>
        ) : (
          <div className={styles.documentsList}>
            {documents.map((doc) => (
              <div key={doc.id} className={styles.documentRow}>
                <div className={styles.leftSection}>
                  <div className={styles.fileTypeIcon}>{getFileTypeIcon(doc.fileType)}</div>
                  <span className={styles.fileTypeLabel}>{doc.fileType || 'FILE'}</span>
                </div>
                
                <div className={styles.middleSection}>
                  <h3 className={styles.documentTitle}>{doc.name}</h3>
                  <div className={styles.contentRow}>
                    <div className={styles.textContent}>
                      <p className={styles.documentAbstract}>{doc.abstract || 'No abstract available'}</p>
                      {doc.tags.length > 0 && (
                        <div className={styles.tagsContainer}>
                          {doc.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className={styles.metadata}>
                      <div className={styles.metadataItem}>{doc.author}</div>
                      <div className={styles.metadataItem}>{doc.date}</div>
                      <div className={styles.metadataItem}>{doc.fileSize}</div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.rightSection}>
                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.viewButton}
                      onClick={() => handleView(doc.id, doc.tags)}
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


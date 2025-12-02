import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { AzureOpenAIService } from '../../services/AzureOpenAIService';
import { IDocumentDetailPageProps } from './IDocumentDetailPageProps';
import styles from './DocumentDetailPage.module.scss';

// Azure OpenAI Configuration
const AZURE_OPENAI_CONFIG = {
  apiKey: '2Hcf7EkLSg88ySVEjrapikrQjIFA4F4BGgshU8Gwci15RkklqgGDJQQJ99BIACYeBjFXJ3w3AAABACOGHLjU',
  endpoint: 'https://engineeringteamopenai.openai.azure.com',
  deploymentName: 'gpt-4o'
};

interface DocumentDetail {
  id: number;
  name: string;
  abstract: string;
  fileType: string;
  author: string;
  date: string;
  fileSize: string;
  serverRelativeUrl: string;
  fileRef: string;
}

export const DocumentDetailPage: React.FunctionComponent<IDocumentDetailPageProps> = (props) => {
  const [document, setDocument] = React.useState<DocumentDetail | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const [previewError, setPreviewError] = React.useState<string>('');
  const [tags, setTags] = React.useState<string[]>([]);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const openAIService = React.useRef<AzureOpenAIService>(new AzureOpenAIService(AZURE_OPENAI_CONFIG));
  
  // Cleanup blob URLs on unmount
  React.useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        window.URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  React.useEffect(() => {
    fetchDocumentDetails();
  }, [props.documentId]);

  const fetchDocumentDetails = async () => {
    if (!props.context) {
      setLoading(false);
      return;
    }

    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const libraryName = 'KMArtifacts';
      
      // Fetch document with all needed fields including Performed By and Time Stamp
      // PerformedBy is a person field, need to expand it
      const apiUrl = `${webUrl}/_api/web/lists/getbytitle('${libraryName}')/items(${props.documentId})?$select=Id,Title,TitleName,Abstract,FileLeafRef,FileRef,PerformedBy/Title,PerformedBy/Name,TimeStamp,File/Length,File/ServerRelativeUrl&$expand=PerformedBy,File`;
      
      const response: SPHttpClientResponse = await props.context.spHttpClient.get(
        apiUrl,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch document: ${response.status}`);
      }

      const item: any = await response.json();
      
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
      
      const documentDetail: DocumentDetail = {
        id: item.Id,
        name: displayName,
        abstract: abstract,
        fileType: fileExtension,
        author: author,
        date: formattedDate,
        fileSize: fileSize,
        serverRelativeUrl: serverRelativeUrl,
        fileRef: item.FileRef || serverRelativeUrl
      };
      
      setDocument(documentDetail);
      
      // Use passed tags if available, otherwise generate tags from abstract using AI
      if (props.tags && props.tags.length > 0) {
        setTags(props.tags);
      } else if (abstract && abstract.trim().length > 0) {
        try {
          const generatedTags = await openAIService.current.generateTags(abstract);
          setTags(generatedTags);
        } catch (error) {
          console.error('Error generating tags:', error);
          setTags([]);
        }
      } else {
        setTags([]);
      }
      
      // Generate preview URL using SharePoint's preview mechanism
      if (serverRelativeUrl) {
        const webUrl = props.context.pageContext.web.absoluteUrl;
        let fileUrl = serverRelativeUrl;
        
        // Ensure proper server relative URL format
        if (!fileUrl.startsWith('/')) {
          fileUrl = `/${fileUrl}`;
        }
        
        // Construct full file URL
        const fullFileUrl = `${webUrl}${fileUrl}`;
        
        // For Office documents, use SharePoint's native preview or Office Online viewer
        if (['docx', 'doc', 'pptx', 'ppt', 'xlsx', 'xls'].indexOf(fileExtension.toLowerCase()) !== -1) {
          // Try SharePoint's native preview first (better authentication handling)
          // Format: /_layouts/15/WopiFrame.aspx?sourcedoc={serverRelativeUrl}&action=default
          const encodedServerUrl = encodeURIComponent(fileUrl);
          setPreviewUrl(`${webUrl}/_layouts/15/WopiFrame.aspx?sourcedoc=${encodedServerUrl}&action=default`);
        } else if (fileExtension.toLowerCase() === 'pdf') {
          // For PDFs, fetch as blob and create object URL with proper content-type
          // This prevents download and ensures proper preview
          try {
            const downloadUrl = `${webUrl}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(fileUrl)}')/$value`;
            const fileResponse = await props.context.spHttpClient.get(
              downloadUrl,
              SPHttpClient.configurations.v1
            );
            
            if (fileResponse.ok) {
              const blob = await fileResponse.blob();
              // Ensure blob has correct content-type for PDF
              const pdfBlob = new Blob([blob], { type: 'application/pdf' });
              const blobUrl = window.URL.createObjectURL(pdfBlob);
              setPreviewUrl(blobUrl);
            } else {
              // Fallback to direct URL
              setPreviewUrl(fullFileUrl);
            }
          } catch (error) {
            console.error('Error fetching PDF for preview:', error);
            // Fallback to direct URL
            setPreviewUrl(fullFileUrl);
          }
        } else if (fileExtension.toLowerCase() === 'svg') {
          // For SVG files, fetch as blob to handle authentication properly
          try {
            const downloadUrl = `${webUrl}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(fileUrl)}')/$value`;
            const fileResponse = await props.context.spHttpClient.get(
              downloadUrl,
              SPHttpClient.configurations.v1
            );
            
            if (fileResponse.ok) {
              const blob = await fileResponse.blob();
              // Ensure blob has correct content-type for SVG
              const svgBlob = new Blob([blob], { type: 'image/svg+xml' });
              const blobUrl = window.URL.createObjectURL(svgBlob);
              setPreviewUrl(blobUrl);
            } else {
              // Fallback to direct URL
              setPreviewUrl(fullFileUrl);
            }
          } catch (error) {
            console.error('Error fetching SVG for preview:', error);
            // Fallback to direct URL
            setPreviewUrl(fullFileUrl);
          }
        } else {
          // For other files, try direct URL
          setPreviewUrl(fullFileUrl);
        }
      }
      
    } catch (error) {
      console.error('Error fetching document details:', error);
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

  const handleDownload = async () => {
    if (!document || !props.context) return;
    
    const webUrl = props.context.pageContext.web.absoluteUrl;
    let serverRelativeUrl = document.serverRelativeUrl;
    
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
        const link = window.document.createElement('a');
        link.href = url;
        link.download = document.name;
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const handleShare = () => {
    if (!document || !props.context) return;
    
    const webUrl = props.context.pageContext.web.absoluteUrl;
    let fileUrl = document.serverRelativeUrl;
    
    if (!fileUrl.startsWith('http')) {
      if (!fileUrl.startsWith('/')) {
        fileUrl = `/${fileUrl}`;
      }
      fileUrl = `${webUrl}${fileUrl}`;
    }
    
    // Copy to clipboard or use Web Share API
    if (navigator.share) {
      navigator.share({
        title: document.name,
        url: fileUrl
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(fileUrl).then(() => {
        alert('Link copied to clipboard!');
      }).catch(err => console.log('Error copying:', err));
    }
  };

  const handleBack = () => {
    if (props.backTo === 'library' && props.onBackToLibrary) {
      props.onBackToLibrary();
    } else if (props.onClose) {
      props.onClose();
    }
  };

  const backButtonText = props.backTo === 'library' ? 'Back to Library' : 'Back to Home';

  if (loading) {
    return (
      <div className={styles.documentDetailPage}>
        <div className={styles.loading}>Loading document...</div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className={styles.documentDetailPage}>
        <div className={styles.error}>Document not found</div>
      </div>
    );
  }

  return (
    <div className={styles.documentDetailPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {backButtonText}
        </button>
        <div className={styles.headerActions}>
          <button className={styles.downloadButton} onClick={handleDownload}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download
          </button>
          <button className={styles.shareButton} onClick={handleShare}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.headerRow}>
            <div className={styles.fileTypeIndicator}>
              <span className={styles.fileTypeIcon}>{getFileTypeIcon(document.fileType)}</span>
              <span className={styles.fileTypeText}>{document.fileType}</span>
            </div>
            {tags.length > 0 && (
              <div className={styles.tagsContainer}>
                {tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h1 className={styles.documentTitle}>{document.name}</h1>
          
          <p className={styles.documentAbstract}>{document.abstract || 'No description available'}</p>

          <div className={styles.metadata}>
            <div className={styles.metadataItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{document.author}</span>
            </div>
            <div className={styles.metadataItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{document.date}</span>
            </div>
            <div className={styles.metadataItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{document.fileSize}</span>
            </div>
          </div>

          <div className={styles.previewSection}>
            <h2 className={styles.previewTitle}>Document Preview</h2>
            <div className={styles.previewContainer}>
              {previewUrl ? (
                document.fileType.toLowerCase() === 'pdf' ? (
                  <embed 
                    src={previewUrl} 
                    type="application/pdf"
                    className={styles.previewFrame}
                    title="Document Preview"
                  />
                ) : document.fileType.toLowerCase() === 'svg' ? (
                  <object 
                    data={previewUrl} 
                    type="image/svg+xml"
                    className={styles.previewFrame}
                    title="Document Preview"
                    onError={(e) => {
                      console.error('SVG load error:', e);
                      setPreviewError('Failed to load SVG preview');
                    }}
                    onLoad={() => {
                      setPreviewError('');
                    }}
                  >
                    <img 
                      src={previewUrl} 
                      alt="Document Preview"
                      className={styles.previewFrame}
                      style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%' }}
                    />
                  </object>
                ) : (
                  <iframe 
                    ref={iframeRef}
                    src={previewUrl} 
                    className={styles.previewFrame}
                    title="Document Preview"
                    onError={() => setPreviewError('Failed to load preview')}
                    onLoad={() => setPreviewError('')}
                  />
                )
              ) : (
                <div className={styles.previewPlaceholder}>Preview not available</div>
              )}
              {previewError && (
                <div className={styles.previewError}>
                  <div className={styles.errorIcon}>⚠️</div>
                  <div className={styles.errorText}>{previewError}</div>
                  <button 
                    className={styles.retryButton}
                    onClick={() => {
                      setPreviewError('');
                      // Retry by re-fetching the document details
                      fetchDocumentDetails();
                    }}
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


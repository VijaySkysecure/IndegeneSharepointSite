import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { AzureOpenAIService } from '../../services/AzureOpenAIService';
import { IDocumentDetailPageProps } from './IDocumentDetailPageProps';
import styles from './DocumentDetailPage.module.scss'; 

// Azure OpenAI Configuration
const AZURE_OPENAI_CONFIG = {
  apiKey: 'YOUR_API_KEY',
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

interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

const DeleteIconSvg = (
    // SVG path simplified for stability across environments
    <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 7h16"></path>
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
        <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
    </svg>
);
// ➡️ CSS-IN-JS OBJECTS (For stable rendering of new features) ⬅️
const interactionBarStyles: React.CSSProperties = {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    marginBottom: '20px',
};

const baseButtonStyle: React.CSSProperties = {
    backgroundColor: '#f8f8f8',
    color: '#333',
    border: '1px solid #ccc',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.2s',
};

const likedButtonStyle: React.CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: '#ff385c', // Red color for liked state
    color: 'white',
    borderColor: '#ff385c',
};

const commentsContainerStyle: React.CSSProperties = {
    marginTop: '20px',
    padding: '20px 0',
    borderTop: '1px dashed #ddd',
};

const newCommentFormStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    paddingTop: '10px',
};

const commentInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
    fontFamily: 'inherit',
    fontSize: '14px',
};

const submitButtonStyle: React.CSSProperties = {
    alignSelf: 'flex-start',
    backgroundColor: '#0078d4',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
};

const commentListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
};

const commentItemStyle: React.CSSProperties = {
    borderLeft: '3px solid #0078d4',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '0 4px 4px 0',
    display: 'flex',
    justifyContent: 'space-between',
};

const commentHeaderStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.85em',
    color: '#555',
    marginBottom: '5px',
};

const deleteButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#d32f2f',
    cursor: 'pointer',
    fontSize: '0.8em',
    padding: '0',
    marginLeft: '15px',
};
// -------------------------------------------------------------


export const DocumentDetailPage: React.FunctionComponent<IDocumentDetailPageProps> = (props) => {
  // state
  const [document, setDocument] = React.useState<DocumentDetail | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const [previewError, setPreviewError] = React.useState<string>('');
  const [tags, setTags] = React.useState<string[]>([]);
  // interactions
  const [likesCount, setLikesCount] = React.useState<number>(0);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [showComments, setShowComments] = React.useState<boolean>(false);
  const [comments, setComments] = React.useState<Comment[]>([]); 
  const [newCommentText, setNewCommentText] = React.useState<string>(''); 

  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const openAIService = React.useRef<AzureOpenAIService>(new AzureOpenAIService(AZURE_OPENAI_CONFIG));
  
  // cleanup blob URLs
  React.useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.indexOf('blob:') === 0) {
        window.URL.revokeObjectURL(previewUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrl]);

  React.useEffect(() => {
    if (props.context) fetchDocumentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.documentId, props.context]);

  const fetchDocumentDetails = async () => {
    if (!props.context) {
      setLoading(false);
      return;
    }
    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const libraryName = 'KMArtifacts';
      const apiUrl = `${webUrl}/_api/web/lists/getbytitle('${libraryName}')/items(${props.documentId})?$select=Id,Title,TitleName,Abstract,FileLeafRef,FileRef,PerformedBy/Title,PerformedBy/Name,TimeStamp,File/Length,File/ServerRelativeUrl&$expand=PerformedBy,File`;

      const response: SPHttpClientResponse = await props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (!response.ok) throw new Error(`Failed to fetch document: ${response.status}`);
      const item: any = await response.json();

      const fileName = item.FileLeafRef || item.TitleName || item.Title || '';
      const fileExtension = fileName.split('.').pop()?.toUpperCase() || '';
      const displayName = fileName || item.Title || `Document ${item.Id}`;
      const abstract = item.Abstract || '';
      const author = item.PerformedBy?.Title || item.PerformedBy?.Name || item.PerformedBy || 'Unknown';

      const formattedDate = item.TimeStamp ? new Date(item.TimeStamp).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

      const fileSize = item.File?.Length
        ? item.File.Length < 1024
          ? `${item.File.Length} B`
          : item.File.Length < 1024 * 1024
            ? `${(item.File.Length / 1024).toFixed(1)} KB`
            : `${(item.File.Length / (1024 * 1024)).toFixed(1)} MB`
        : '';

      const serverRelativeUrl = item.FileRef || item.File?.ServerRelativeUrl || '';

      setDocument({
        id: item.Id,
        name: displayName,
        abstract,
        fileType: fileExtension,
        author,
        date: formattedDate,
        fileSize,
        serverRelativeUrl,
        fileRef: item.FileRef || serverRelativeUrl,
      });

      // tags via props or AI
      if (props.tags && props.tags.length > 0) setTags(props.tags);
      else if (abstract) {
        const generatedTags = await openAIService.current.generateTags(abstract);
        setTags(generatedTags);
      } else setTags([]);

      // preview logic
      if (serverRelativeUrl) {
        let fileUrl = serverRelativeUrl.indexOf('/') !== 0 ? `/${serverRelativeUrl}` : serverRelativeUrl;
        const webUrl = props.context.pageContext.web.absoluteUrl;
        const fullFileUrl = `${webUrl}${fileUrl}`;

        if (['docx','doc','pptx','ppt','xlsx','xls'].includes(fileExtension.toLowerCase())) {
          const encodedServerUrl = encodeURIComponent(fileUrl);
          setPreviewUrl(`${webUrl}/_layouts/15/WopiFrame.aspx?sourcedoc=${encodedServerUrl}&action=default`);
        } else if (fileExtension.toLowerCase() === 'pdf') {
          try {
            const downloadUrl = `${webUrl}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(fileUrl)}')/$value`;
            const fileResponse = await props.context.spHttpClient.get(downloadUrl, SPHttpClient.configurations.v1);
            if (fileResponse.ok) {
              const blob = await fileResponse.blob();
              const pdfBlob = new Blob([blob], { type: 'application/pdf' });
              const blobUrl = window.URL.createObjectURL(pdfBlob);
              setPreviewUrl(blobUrl);
            } else {
              setPreviewUrl(fullFileUrl);
            }
          } catch (error) {
            console.error('Error fetching PDF for preview:', error);
            setPreviewUrl(fullFileUrl);
          }
        } else if (fileExtension.toLowerCase() === 'svg') {
          try {
            const downloadUrl = `${webUrl}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(fileUrl)}')/$value`;
            const fileResponse = await props.context.spHttpClient.get(downloadUrl, SPHttpClient.configurations.v1);
            if (fileResponse.ok) {
              const blob = await fileResponse.blob();
              const svgBlob = new Blob([blob], { type: 'image/svg+xml' });
              const blobUrl = window.URL.createObjectURL(svgBlob);
              setPreviewUrl(blobUrl);
            } else {
              setPreviewUrl(fullFileUrl);
            }
          } catch (error) {
            console.error('Error fetching SVG for preview:', error);
            setPreviewUrl(fullFileUrl);
          }
        } else {
          setPreviewUrl(fullFileUrl);
        }
      }
    } catch (error) {
      setDocument(null);
      console.error('Error fetching document details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFileTypeIcon = (fileType: string): string => {
    const type = fileType.toLowerCase();
    if (type === 'pdf') return '📄';
    if (type === 'pptx' || type === 'ppt') return '📊';
    if (type === 'docx' || type === 'doc') return '📝';
    if (type === 'xlsx' || type === 'xls') return '📈';
    return '📎';
  };

  const handleDownload = async () => {
    if (!document || !props.context) return;

    const webUrl = props.context.pageContext.web.absoluteUrl;
    let serverRelativeUrl = document.serverRelativeUrl;

    if (serverRelativeUrl.indexOf('/') !== 0) {
      serverRelativeUrl = `/${serverRelativeUrl}`;
    }

    try {
      const downloadUrl = `${webUrl}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(serverRelativeUrl)}')/$value`;
      const response = await props.context.spHttpClient.get(downloadUrl, SPHttpClient.configurations.v1);
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

    if (fileUrl.indexOf('http') !== 0) {
      if (fileUrl.indexOf('/') !== 0) {
        fileUrl = `/${fileUrl}`;
      }
      fileUrl = `${webUrl}${fileUrl}`;
    }

    if (navigator.share) {
      navigator.share({
        title: document.name,
        url: fileUrl
      }).catch(err => console.log('Error sharing:', err));
    } else {
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

  // comment handlers
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(event.target.value);
  };

  const handleSubmitComment = () => {
    if (newCommentText.trim() === '' || !document) return;
    console.log(`[API MOCK] Submitting comment for document ${document.id}: ${newCommentText}`);
    const newComment: Comment = {
      id: Date.now(),
      text: newCommentText.trim(),
      author: props.context.pageContext.user.displayName || 'Current User',
      timestamp: new Date().toLocaleDateString('en-GB'),
    };
    setComments(prevComments => [newComment, ...prevComments]);
    setNewCommentText('');
  };

  const handleLike = () => {
    if (!document) return;
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    setLikesCount(prevCount => prevCount + (newLikedStatus ? 1 : -1));
    console.log(`[API MOCK] Sending update for document ${document.id}: ${document.name}`);
  };

  const handleToggleComments = () => {
    setShowComments(prev => !prev);
  };
    
  // NEW HANDLER: Delete Comment Logic
  const handleDeleteComment = (commentId: number) => {
    // 1. API CALL PLACEHOLDER (Delete from SharePoint)
    console.log(`[API MOCK] Deleting comment ID: ${commentId}`);

    // 2. OPTIMISTIC UPDATE: Filter out the comment from the local state
    setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
  };

  const backButtonText = props.backTo === 'library' ? 'Back to Library' : 'Back to Home';
  const currentLikeButtonStyle = isLiked ? likedButtonStyle : baseButtonStyle;

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
      </div>

      <div className={styles.content}>
        <div className={styles.titleSection}>
          <div className={styles.titleContent}>
            <div className={styles.headerRow}>
              <div className={styles.fileTypeIndicator}>
                <span className={styles.fileTypeIcon}>{getFileTypeIcon(document.fileType)}</span>
                <span className={styles.fileTypeText}>{document.fileType}</span>
              </div>
              <div className={styles.actionButtons}>
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
              </div>
              <div className={styles.metadataItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
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
                        fetchDocumentDetails();
                      }}
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* ➡️ START: INTERACTION BAR AT THE BOTTOM ⬅️ */}
            <div style={interactionBarStyles}>
                <button 
                    style={currentLikeButtonStyle} 
                    onClick={handleLike}
                >
                    {isLiked ? '❤️ Unlike' : '🤍 Like'} ({likesCount})
                </button>
                <button 
                    style={baseButtonStyle} 
                    onClick={handleToggleComments}
                >
                    💬 {showComments ? 'Hide Comments' : `Comments (${comments.length})`}
                </button>
            </div>

            {/* ➡️ CONDITIONAL COMMENT SECTION ⬅️ */}
            {showComments && document && ( 
                <div style={commentsContainerStyle}>
                    <h3>Comments for {document.name}</h3>

                    {/* Input Form */}
                    <div style={newCommentFormStyle}> 
                        <textarea
                            style={commentInputStyle}
                            value={newCommentText}
                            onChange={handleCommentChange}
                            placeholder="Write a comment..."
                            rows={3}
                        />
                        <button 
                            style={submitButtonStyle} 
                            onClick={handleSubmitComment}
                            disabled={newCommentText.trim() === ''}
                        >
                            Submit Comment
                        </button>
                    </div>

                    {/* Comment List */}
                    <div style={commentListStyle}>
                        {comments.length === 0 ? (
                            <p>Be the first to comment!</p>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} style={commentItemStyle}>
                                    <div style={commentHeaderStyle}>
                                        <strong>{comment.author}</strong>
                                        <span>{comment.timestamp}</span>
                                    </div>
                                    <p style={{marginTop: '5px', marginBottom: '0'}}>{comment.text}</p>
                                    <button 
                                        style={deleteButtonStyle} 
                                        onClick={() => handleDeleteComment(comment.id)}
                                    >
                                        {DeleteIconSvg}
                                                  </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
            
          </div> 

          <div className={styles.sidebar}>
            {tags.length > 0 && (
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Tags
                </h3>
                <div className={styles.tagsContainer}>
                  {tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Document Information</h3>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Category</span>
                  <span className={styles.infoValue}>{tags.length >= 2 ? tags[1] : 'N/A'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>File Type</span>
                  <span className={styles.infoValue}>{document.fileType}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>File Size</span>
                  <span className={styles.infoValue}>{document.fileSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
</div>
)
};
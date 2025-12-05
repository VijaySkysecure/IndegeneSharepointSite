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

interface Comment {
  id: number;
  userName: string;
  comment: string;
  created: Date;
  userId: number;
}

export const DocumentDetailPage: React.FunctionComponent<IDocumentDetailPageProps> = (props) => {
  const [document, setDocument] = React.useState<DocumentDetail | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const [previewError, setPreviewError] = React.useState<string>('');
  const [tags, setTags] = React.useState<string[]>([]);
  const [likeCount, setLikeCount] = React.useState<number>(0);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [commentCount, setCommentCount] = React.useState<number>(0);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [showComments, setShowComments] = React.useState<boolean>(false);
  const [newComment, setNewComment] = React.useState<string>('');
  const [currentUserId, setCurrentUserId] = React.useState<number>(0);
  const [currentUserName, setCurrentUserName] = React.useState<string>('');
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
    fetchCurrentUser();
  }, [props.documentId]);

  React.useEffect(() => {
    if (document && currentUserId && props.context) {
      // Ensure lists exist before fetching
      const initializeLists = async () => {
        await ensureListExists('DocumentLikes', [
          { name: 'DocumentId', type: 'Number', required: true },
          { name: 'UserId', type: 'Number', required: true }
        ]);
        await ensureListExists('DocumentComments', [
          { name: 'DocumentId', type: 'Number', required: true },
          { name: 'UserName', type: 'Text', required: true },
          { name: 'Comment', type: 'Note', required: true },
          { name: 'UserId', type: 'Number', required: true }
        ]);
        fetchLikes();
        fetchComments();
      };
      initializeLists();
    }
  }, [document, currentUserId]);

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
      const apiUrl = `${webUrl}/_api/web/lists/getbytitle('${libraryName}')/items(${props.documentId})?$select=Id,Title,TitleName,Abstract,FileLeafRef,FileRef,PerformedBy/Title,PerformedBy/Name,TimeStamp,File/Length,File/ServerRelativeUrl,Tags&$expand=PerformedBy,File`;
      
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
      
      // Show page immediately - don't wait for tags or preview
      setLoading(false);
      
      // Parse tags from SharePoint if they exist (async, non-blocking)
      let storedTags: string[] = [];
      if (item.Tags) {
        try {
          if (typeof item.Tags === 'string') {
            if (item.Tags.startsWith('[')) {
              storedTags = JSON.parse(item.Tags);
            } else {
              storedTags = item.Tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
            }
          } else if (Array.isArray(item.Tags)) {
            storedTags = item.Tags;
          }
        } catch (error) {
          console.error('Error parsing tags:', error);
          storedTags = [];
        }
      }
      
      // Load tags asynchronously (non-blocking)
      if (props.tags && props.tags.length > 0) {
        setTags(props.tags);
      } else if (storedTags.length > 0) {
        setTags(storedTags);
      } else if (abstract && abstract.trim().length > 0) {
        // Generate tags asynchronously without blocking page render
        openAIService.current.generateTags(abstract).then(generatedTags => {
          setTags(generatedTags);
          // Save generated tags to SharePoint for future use
          saveTagsToSharePoint(props.documentId, generatedTags).catch(err => {
            console.error('Error saving tags:', err);
          });
        }).catch(error => {
          console.error('Error generating tags:', error);
          setTags([]);
        });
      } else {
        setTags([]);
      }
      
      // Generate preview URL asynchronously (non-blocking)
      if (serverRelativeUrl) {
        generatePreviewUrlAsync(serverRelativeUrl, fileExtension);
      }
      
    } catch (error) {
      console.error('Error fetching document details:', error);
      setLoading(false);
    }
  };

  const generatePreviewUrlAsync = async (serverRelativeUrl: string, fileExtension: string) => {
    if (!props.context) return;
    
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

  const fetchCurrentUser = async () => {
    if (!props.context) return;
    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const response = await props.context.spHttpClient.get(
        `${webUrl}/_api/web/currentuser`,
        SPHttpClient.configurations.v1
      );
      if (response.ok) {
        const user = await response.json();
        setCurrentUserId(user.Id);
        setCurrentUserName(user.Title || user.LoginName || 'User');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const ensureListExists = async (listName: string, fields: Array<{name: string, type: string, required?: boolean}>) => {
    if (!props.context) return false;
    
    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      
      // Check if list exists
      const checkResp = await props.context.spHttpClient.get(
        `${webUrl}/_api/web/lists/getbytitle('${listName}')?$select=Id`,
        SPHttpClient.configurations.v1
      );
      
      if (checkResp.ok) {
        console.log(`List "${listName}" already exists`);
        return true;
      }
      
      // List doesn't exist, create it
      console.log(`Creating list "${listName}"...`);
      
      const createListBody = {
        __metadata: { type: 'SP.List' },
        Title: listName,
        BaseTemplate: 100, // Custom list
        Description: `List for storing ${listName.toLowerCase()}`
      };
      
      const createResp = await props.context.spHttpClient.post(
        `${webUrl}/_api/web/lists`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "odata-version": ""
          },
          body: JSON.stringify(createListBody)
        }
      );
      
      if (!createResp.ok) {
        const errorText = await createResp.text();
        console.error(`Failed to create list "${listName}":`, createResp.status, errorText);
        return false;
      }
      
      const listData = await createResp.json();
      const listId = listData.d.Id;
      
      console.log(`List "${listName}" created with ID: ${listId}`);
      
      // Wait a bit for the list to be ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add fields to the list
      for (const field of fields) {
        try {
          let fieldBody: any = {
            __metadata: { type: 'SP.Field' },
            Title: field.name,
            Required: field.required || false
          };
          
          if (field.type === 'Number') {
            fieldBody.FieldTypeKind = 9; // Number
            fieldBody = {
              ...fieldBody,
              __metadata: { type: 'SP.FieldNumber' }
            };
          } else if (field.type === 'Text') {
            fieldBody.FieldTypeKind = 2; // Text
            fieldBody.MaxLength = 255;
            fieldBody = {
              ...fieldBody,
              __metadata: { type: 'SP.FieldText' }
            };
          } else if (field.type === 'Note') {
            fieldBody.FieldTypeKind = 3; // Note (Multiple lines of text)
            fieldBody = {
              ...fieldBody,
              __metadata: { type: 'SP.FieldMultiLineText' }
            };
          }
          
          const fieldResp = await props.context.spHttpClient.post(
            `${webUrl}/_api/web/lists(guid'${listId}')/fields`,
            SPHttpClient.configurations.v1,
            {
              headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "odata-version": ""
              },
              body: JSON.stringify(fieldBody)
            }
          );
          
          if (!fieldResp.ok) {
            const errorText = await fieldResp.text();
            // Field might already exist, that's okay
            if (!errorText.includes('already exists') && !errorText.includes('duplicate')) {
              console.warn(`Failed to add field "${field.name}" to "${listName}":`, errorText);
            }
          } else {
            console.log(`Field "${field.name}" added to "${listName}"`);
          }
          
          // Wait a bit between field additions
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (fieldError) {
          console.warn(`Error adding field "${field.name}":`, fieldError);
        }
      }
      
      return true;
    } catch (error) {
      console.error(`Error ensuring list "${listName}" exists:`, error);
      return false;
    }
  };

  const fetchLikes = async () => {
    if (!props.context || !document || !currentUserId) return;
    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const listName = 'DocumentLikes';
      
      // Fetch all likes for this document
      const response = await props.context.spHttpClient.get(
        `${webUrl}/_api/web/lists/getbytitle('${listName}')/items?$filter=DocumentId eq ${document.id}&$select=Id,UserId`,
        SPHttpClient.configurations.v1
      );
      
      if (response.ok) {
        const data = await response.json();
        const likes = data.value || [];
        setLikeCount(likes.length);
        setIsLiked(likes.some((like: any) => like.UserId === currentUserId));
      } else {
        // List might not exist yet, that's okay - set defaults
        setLikeCount(0);
        setIsLiked(false);
      }
    } catch (error) {
      // List doesn't exist or other error - set defaults
      setLikeCount(0);
      setIsLiked(false);
    }
  };

  const fetchComments = async () => {
    if (!props.context || !document) return;
    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const listName = 'DocumentComments';
      
      // Fetch all comments for this document (ordered by newest first)
      const response = await props.context.spHttpClient.get(
        `${webUrl}/_api/web/lists/getbytitle('${listName}')/items?$filter=DocumentId eq ${document.id}&$orderby=Created desc&$select=Id,UserName,Comment,Created,UserId`,
        SPHttpClient.configurations.v1
      );
      
      if (response.ok) {
        const data = await response.json();
        const commentsData = (data.value || []).map((item: any) => ({
          id: item.Id,
          userName: item.UserName || 'User',
          comment: item.Comment || '',
          created: new Date(item.Created),
          userId: item.UserId || 0
        }));
        setComments(commentsData);
      } else {
        setComments([]);
      }
      
      // Also get total comment count
      const countResponse = await props.context.spHttpClient.get(
        `${webUrl}/_api/web/lists/getbytitle('${listName}')/items?$filter=DocumentId eq ${document.id}&$select=Id`,
        SPHttpClient.configurations.v1
      );
      if (countResponse.ok) {
        const countData = await countResponse.json();
        setCommentCount((countData.value || []).length);
      } else {
        setCommentCount(0);
      }
    } catch (error) {
      // List doesn't exist or other error - set defaults
      console.error('Error fetching comments:', error);
      setComments([]);
      setCommentCount(0);
    }
  };

  const toggleLike = async () => {
    if (!props.context || !document || !currentUserId) return;
    
    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const listName = 'DocumentLikes';
      
      if (isLiked) {
        // Unlike - find and delete the like
        const findResponse = await props.context.spHttpClient.get(
          `${webUrl}/_api/web/lists/getbytitle('${listName}')/items?$filter=DocumentId eq ${document.id} and UserId eq ${currentUserId}&$select=Id`,
          SPHttpClient.configurations.v1
        );
        
        if (findResponse.ok) {
          const findData = await findResponse.json();
          if (findData.value && findData.value.length > 0) {
            const likeId = findData.value[0].Id;
            await props.context.spHttpClient.post(
              `${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${likeId})`,
              SPHttpClient.configurations.v1,
              {
                headers: {
                  "IF-MATCH": "*",
                  "X-HTTP-Method": "DELETE"
                }
              }
            );
          }
        }
        setIsLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        // Like - create new like
        const listInfoResp = await props.context.spHttpClient.get(
          `${webUrl}/_api/web/lists/getbytitle('${listName}')?$select=ListItemEntityTypeFullName`,
          SPHttpClient.configurations.v1
        );
        
        if (listInfoResp.ok) {
          const listInfo = await listInfoResp.json();
          const entityType = listInfo.ListItemEntityTypeFullName;
          
          const body = {
            __metadata: { type: entityType },
            DocumentId: document.id,
            UserId: currentUserId
          };
          
          await props.context.spHttpClient.post(
            `${webUrl}/_api/web/lists/getbytitle('${listName}')/items`,
            SPHttpClient.configurations.v1,
            {
              headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "odata-version": ""
              },
              body: JSON.stringify(body)
            }
          );
        }
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const addComment = async () => {
    if (!props.context || !document || !currentUserId || !newComment.trim()) {
      console.log('Cannot add comment - missing requirements:', {
        hasContext: !!props.context,
        hasDocument: !!document,
        hasUserId: !!currentUserId,
        hasComment: !!newComment.trim()
      });
      return;
    }
    
    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const listName = 'DocumentComments';
      
      console.log('Adding comment:', {
        documentId: document.id,
        userName: currentUserName,
        userId: currentUserId,
        comment: newComment.trim()
      });
      
      // Ensure list exists before trying to use it
      const listExists = await ensureListExists('DocumentComments', [
        { name: 'DocumentId', type: 'Number', required: true },
        { name: 'UserName', type: 'Text', required: true },
        { name: 'Comment', type: 'Note', required: true },
        { name: 'UserId', type: 'Number', required: true }
      ]);
      
      if (!listExists) {
        alert('Failed to create or access the DocumentComments list. Please try again.');
        return;
      }
      
      const listInfoResp = await props.context.spHttpClient.get(
        `${webUrl}/_api/web/lists/getbytitle('${listName}')?$select=ListItemEntityTypeFullName`,
        SPHttpClient.configurations.v1
      );
      
      if (!listInfoResp.ok) {
        const errorText = await listInfoResp.text();
        console.error('Failed to get list info:', listInfoResp.status, errorText);
        alert('Failed to add comment. Please try again.');
        return;
      }
      
      const listInfo = await listInfoResp.json();
      const entityType = listInfo.ListItemEntityTypeFullName;
      
      const body = {
        __metadata: { type: entityType },
        DocumentId: document.id,
        UserName: currentUserName,
        Comment: newComment.trim(),
        UserId: currentUserId
      };
      
      console.log('Posting comment with body:', body);
      
      const postResp = await props.context.spHttpClient.post(
        `${webUrl}/_api/web/lists/getbytitle('${listName}')/items`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "odata-version": ""
          },
          body: JSON.stringify(body)
        }
      );
      
      if (!postResp.ok) {
        const errorText = await postResp.text();
        console.error('Failed to add comment:', postResp.status, errorText);
        alert('Failed to add comment. Please try again.');
        return;
      }
      
      console.log('Comment added successfully');
      setNewComment('');
      // Refresh comments and count
      await fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('An error occurred while adding the comment. Please try again.');
    }
  };

  const deleteComment = async (commentId: number) => {
    if (!props.context || !commentId) return;
    
    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }
    
    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const listName = 'DocumentComments';
      
      const deleteResp = await props.context.spHttpClient.post(
        `${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${commentId})`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
          }
        }
      );
      
      if (!deleteResp.ok) {
        const errorText = await deleteResp.text();
        console.error('Failed to delete comment:', deleteResp.status, errorText);
        alert('Failed to delete comment. Please try again.');
        return;
      }
      
      console.log('Comment deleted successfully');
      // Refresh comments and count
      await fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('An error occurred while deleting the comment. Please try again.');
    }
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

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffYears = Math.floor(diffDays / 365);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    if (diffWeeks < 52) return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
    return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
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
                <span>{document.date}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.mainContentWrapper}>
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

            <div className={styles.sidebar}>
              {tags.length > 0 && (
                <div className={styles.sidebarSection}>
                  <h3 className={styles.sidebarTitle}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Meta Tags
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

          <div className={styles.socialSection}>
            <div className={styles.socialActions}>
              <button 
                className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
                onClick={toggleLike}
                aria-label="Like"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "url(#likeGradient)" : "none"} xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="likeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff6b9d" />
                      <stop offset="30%" stopColor="#c44569" />
                      <stop offset="70%" stopColor="#6c5ce7" />
                      <stop offset="100%" stopColor="#4834d4" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                    fill={isLiked ? "url(#likeGradient)" : "none"}
                    stroke={isLiked ? "url(#likeGradient)" : "currentColor"} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.count}>{likeCount}</span>
              </button>
              <button 
                className={styles.commentButton}
                onClick={() => setShowComments(!showComments)}
                aria-label="Comment"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.count}>{commentCount}</span>
              </button>
              <button className={styles.shareButton} onClick={handleShare} aria-label="Share">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {showComments && (
              <div className={styles.commentsBox}>
                  <div className={styles.commentsList}>
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment.id} className={styles.commentItem}>
                          <div className={styles.commentHeader}>
                            <div className={styles.commentHeaderLeft}>
                              <span className={styles.commentUserName}>{comment.userName}</span>
                              <span className={styles.commentTime}>{formatTimeAgo(comment.created)}</span>
                            </div>
                            {comment.userId === currentUserId && (
                              <button
                                className={styles.deleteCommentButton}
                                onClick={() => deleteComment(comment.id)}
                                aria-label="Delete comment"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            )}
                          </div>
                          <p className={styles.commentText}>{comment.comment}</p>
                        </div>
                      ))
                    ) : (
                      <div className={styles.noComments}>No comments yet</div>
                    )}
                  </div>
                <div className={styles.addCommentSection}>
                  <div className={styles.commentInputWrapper}>
                    <input
                      type="text"
                      className={styles.commentInput}
                      placeholder="Add a comment..."
                      value={newComment}
                      maxLength={500}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newComment.trim() && newComment.length <= 500) {
                          addComment();
                        }
                      }}
                    />
                    <span className={`${styles.charCount} ${newComment.length >= 450 ? styles.charCountWarning : ''} ${newComment.length >= 500 ? styles.charCountError : ''}`}>
                      {newComment.length}/500
                    </span>
                  </div>
                  <button 
                    className={styles.sendButton}
                    onClick={addComment}
                    disabled={!newComment.trim() || newComment.length > 500}
                    aria-label="Send comment"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


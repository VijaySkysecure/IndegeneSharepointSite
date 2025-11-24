import * as React from 'react';
import { IFileUploadProps } from './IFileUploadProps';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import styles from './FileUpload.module.scss';
import { MetadataForm } from '../MetadataForm/MetadataForm';
import { DocumentParser } from '../../services/DocumentParser';
import { AzureOpenAIService } from '../../services/AzureOpenAIService';

// Azure OpenAI Configuration
// NOTE: In production, API keys should be stored securely (e.g., Azure Key Vault, environment variables, or backend proxy)
// Exposing API keys in client-side code is a security risk. Consider using a backend API proxy.
const AZURE_OPENAI_CONFIG = {
  apiKey: '2Hcf7EkLSg88ySVEjrapikrQjIFA4F4BGgshU8Gwci15RkklqgGDJQQJ99BIACYeBjFXJ3w3AAABACOGHLjU',
  endpoint: 'https://engineeringteamopenai.openai.azure.com',
  deploymentName: 'gpt-4o'
};

export const FileUpload: React.FC<IFileUploadProps> = (props) => {
  const [dragOver, setDragOver] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [extractedMetadata, setExtractedMetadata] = React.useState<Record<string, any> | null>(null);
  const [processingError, setProcessingError] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const openAIService = React.useRef(new AzureOpenAIService(AZURE_OPENAI_CONFIG));

  const onBrowse = () => {
    fileInputRef.current?.click();
  };

  const onFileSelected = async (f?: FileList | null) => {
    const file = f && f.length ? f[0] : undefined;
    if (file) {
      setUploadedFile(file);
      setProcessingError(null);
      setExtractedMetadata(null);
      props.onUploaded && props.onUploaded(file);
      
      // Process the file with AI
      await processFileWithAI(file);
    }
  };

  const processFileWithAI = async (file: File) => {
    console.log('=== STARTING FILE PROCESSING ===');
    console.log('File:', file.name);
    console.log('File type:', file.type);
    console.log('File size:', file.size, 'bytes');
    
    setIsProcessing(true);
    setProcessingError(null);

    try {
      // Step 1: Parse the document to extract text
      console.log('Step 1: Parsing document...');
      const parseResult = await DocumentParser.parseFile(file);
      
      console.log('Parse result:', {
        success: parseResult.success,
        textLength: parseResult.text?.length || 0,
        error: parseResult.error
      });
      
      if (!parseResult.success) {
        const errorMsg = parseResult.error || 'Failed to parse document';
        console.error('Document parsing failed:', errorMsg);
        setProcessingError(errorMsg);
        setIsProcessing(false);
        return;
      }

      if (!parseResult.text || parseResult.text.trim().length === 0) {
        const errorMsg = 'No text content found in the document. The document might be image-based or empty.';
        console.error('No text extracted:', errorMsg);
        setProcessingError(errorMsg);
        setIsProcessing(false);
        return;
      }

      // Log parsed text for debugging
      console.log('=== FILE PARSED SUCCESSFULLY ===');
      console.log('File name:', file.name);
      console.log('File size:', file.size, 'bytes');
      console.log('Extracted text length:', parseResult.text.length, 'characters');
      console.log('Sample text (first 500 chars):', parseResult.text.substring(0, 500));

      // Create audit log entry for this uploaded file (Action = Draft)
      try {
        await createAuditLogItem(file);
      } catch (auditErr) {
        console.error('Failed to create audit log item:', auditErr);
      }

      try {
        await updateKMArtifactsMetadata(file);
      } catch (e) {
        console.error("Error creating KMArtifacts entry:", e);
      }


      // Step 2: Extract metadata using Azure OpenAI
      console.log('Step 2: Extracting metadata with AI...');
      const metadata = await openAIService.current.extractMetadata(parseResult.text);
      
      // Step 3: Set the extracted metadata
      console.log('Step 3: Setting extracted metadata...');
      setExtractedMetadata(metadata);
      console.log('=== FILE PROCESSING COMPLETE ===');
    } catch (error) {
      console.error('=== ERROR PROCESSING FILE ===');
      console.error('Error type:', typeof error);
      console.error('Error details:', error);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');
      
      const errorMsg = error instanceof Error 
        ? error.message 
        : 'An error occurred while processing the document. Please fill the form manually.';
      
      setProcessingError(errorMsg);
    } finally {
      console.log('Setting isProcessing to false');
      setIsProcessing(false);
    }
  };

  /**
   * Create an Audit Log item in SharePoint list.
   * Uses the provided list GUID and the internal field names seen in the URLs.
   */
  const createAuditLogItem = async (file: File): Promise<number> => {
    // GUID of the Audit Log list (from the URLs provided by the user)
    const LIST_GUID = '3635DC85-275A-425E-B71C-75293EE800D8';

    if (!props.context) {
      throw new Error('SPFx context not provided to FileUpload component.');
    }

    const webUrl = props.context.pageContext.web.absoluteUrl;

    // Get list entity type name (required for create payload)
    const listInfoResp = await props.context.spHttpClient.get(
      `${webUrl}/_api/web/lists(guid'${LIST_GUID}')?$select=ListItemEntityTypeFullName`,
      SPHttpClient.configurations.v1
    );

    if (!listInfoResp.ok) {
      const txt = await listInfoResp.text();
      throw new Error(`Failed to read list info: ${listInfoResp.status} ${txt}`);
    }

    const listInfo = await listInfoResp.json();
    const entityType = listInfo.ListItemEntityTypeFullName;

    // Get current user id
    const currentUserResp = await props.context.spHttpClient.get(
      `${webUrl}/_api/web/currentuser`,
      SPHttpClient.configurations.v1
    );
    if (!currentUserResp.ok) {
      const txt = await currentUserResp.text();
      throw new Error(`Failed to get current user: ${currentUserResp.status} ${txt}`);
    }
    const currentUser = await currentUserResp.json();
    const userId = currentUser.Id;

    // Build payload. Use the internal field names shown in the URLs.
    // Many lists have a required `Title` field; include it to avoid create failures.
    // When using 'odata=nometadata' we must NOT include __metadata in the payload.
    const body: any = {
      Title: file.name,
      FileName: file.name,
      Action: 'Draft',
      // For a person field, set the internal field with 'Id' suffix
      UserId: userId,
      Performed_x0020_ById: userId,
      TimeStamp: new Date().toISOString()
    };

    console.log('Creating audit log item with payload:', body, 'entityType:', entityType);

    const postResp = await props.context.spHttpClient.post(
      `${webUrl}/_api/web/lists(guid'${LIST_GUID}')/items`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-Type': 'application/json;odata=nometadata'
        },
        body: JSON.stringify(body)
      }
    );

    const respText = await postResp.text();
    if (!postResp.ok) {
      console.error('Create audit item failed. Status:', postResp.status, 'Response:', respText);
      throw new Error(`Failed to create audit item: ${postResp.status} ${respText}`);
    }

    // If we get here, the server created the item. Try parsing JSON if returned.
    let created: any = null;
    try {
      created = respText ? JSON.parse(respText) : null;
    } catch (e) {
      // If the response isn't JSON (depending on OData settings), log raw text
      console.warn('Could not parse create response as JSON; raw response:', respText);
    }

    const createdId = created && created.Id ? created.Id : null;
    console.log('Audit log item created. ID (if returned):', createdId, 'rawResponse:', respText);
    return createdId;
  };

  /**
   * Create item in KMArtifacts folder inside Document Library
   */
  const updateKMArtifactsMetadata = async (file: File) => {
    const LIBRARY_NAME = "KMArtifacts";
    const webUrl = props.context.pageContext.web.absoluteUrl;

    // 1️⃣ Upload file
    const uploadResp = await props.context.spHttpClient.post(
      `${webUrl}/_api/web/GetFolderByServerRelativeUrl('${LIBRARY_NAME}')/Files/add(url='${file.name}',overwrite=true)`,
      SPHttpClient.configurations.v1,
      { body: file }
    );
    const uploadJson = await uploadResp.json();
    const serverRelativeUrl = uploadJson.ServerRelativeUrl;

    // 2️⃣ Wait briefly to ensure ListItem exists
    await new Promise(r => setTimeout(r, 500));

    // 3️⃣ Get ListItem ID
    const listItemResp = await props.context.spHttpClient.get(
      `${webUrl}/_api/web/GetFileByServerRelativeUrl('${serverRelativeUrl}')/ListItemAllFields?$select=Id`,
      SPHttpClient.configurations.v1
    );
    const listItemJson = await listItemResp.json();
    const itemId = listItemJson.Id;

    // 4️⃣ Get entity type
    const listInfoResp = await props.context.spHttpClient.get(
      `${webUrl}/_api/web/lists/getbytitle('${LIBRARY_NAME}')?$select=ListItemEntityTypeFullName`,
      SPHttpClient.configurations.v1
    );
    const listInfo = await listInfoResp.json();
    const entityType = listInfo.ListItemEntityTypeFullName;

    // 5️⃣ Get current user ID
    const currentUserResp = await props.context.spHttpClient.get(
      `${webUrl}/_api/web/currentuser`,
      SPHttpClient.configurations.v1
    );
    const currentUser = await currentUserResp.json();
    const userId = currentUser.Id;

    // 6️⃣ Metadata payload
    const metadataBody = {
      Status: "Draft",
      TitleName: "-",
      Abstract: "-",
      BusinessUnit: "-",
      Department: "-",
      Region: "-",
      Client: "-",
      DocumentType: "-",
      DiseaseArea: "-",
      TherapyArea: "-",
      ComplianceFlag: false,
      Sanitized: false,
      PerformedById: userId,
      TimeStamp: new Date().toISOString()
    };


    // 7️⃣ Update metadata using fetch + MERGE + odata=nometadata
    const updateResp = await props.context.spHttpClient.fetch(
      `${webUrl}/_api/web/lists/getbytitle('${LIBRARY_NAME}')/items(${itemId})`,
      SPHttpClient.configurations.v1,
      {
        method: "POST",
        headers: {
          "Accept": "application/json;odata=nometadata",
          "Content-Type": "application/json;odata=nometadata",
          "IF-MATCH": "*",
          "X-HTTP-Method": "MERGE"
        },
        body: JSON.stringify(metadataBody) // ✅ NO __metadata
      }
    );

    if (!updateResp.ok) {
      const txt = await updateResp.text();
      throw new Error("Metadata update failed: " + txt);
    }

    console.log("KMArtifacts metadata updated successfully for itemId:", itemId);
    return itemId;
  };


  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      onFileSelected(e.dataTransfer.files);
    }
  };

  const onFormSubmit = (data: any) => {
    // data contains form values from MetadataForm
    // Here you would typically send `data` + `uploadedFile` to backend
    console.log('Submitting metadata', data, uploadedFile);
    // close overlay after submit
    props.onClose && props.onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        {!uploadedFile ? (
          <div className={styles.uploadCard}>
            <h3 className={styles.title}>Upload Document</h3>
            <div
              className={`${styles.dropZone} ${dragOver ? styles.dropZoneHover : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={onBrowse}
              role="button"
              aria-label="Upload file"
            >
              <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M19 15v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 9l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className={styles.hintText}>Drag & drop files here</div>
              <div className={styles.instructions}>Supported formats: PDF, DOCX, PPTX, XLSX, MPP. Click browse or drop a file to start.</div>
              <button className={styles.browseBtn} onClick={(e) => { e.stopPropagation(); onBrowse(); }}>
                Browse files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.mpp"
                onChange={(e) => onFileSelected(e.target.files)}
              />
            </div>
            <div className={styles.footer}>
              <button className={styles.closeBtn} onClick={() => props.onClose && props.onClose()}>Close</button>
            </div>
          </div>
        ) : (
          <>
            {isProcessing ? (
              <div className={styles.processingContainer}>
                <div className={styles.processingSpinner}></div>
                <h3 className={styles.processingTitle}>Analyzing Document...</h3>
                <p className={styles.processingMessage}>
                  Reading your document and extracting information. This may take a moment.
                </p>
                {processingError && (
                  <div className={styles.errorMessage}>
                    {processingError}
                  </div>
                )}
              </div>
            ) : (
              <MetadataForm 
                onSubmit={onFormSubmit} 
                onClose={() => props.onClose && props.onClose()}
                initialValues={extractedMetadata || undefined}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

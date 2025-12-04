import * as React from 'react';
import { IFileUploadProps } from './IFileUploadProps';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import styles from './FileUpload.module.scss';
import { MetadataForm } from '../MetadataForm/MetadataForm';
import { MultiMetadataForm } from '../MultiMetadataForm/MultiMetadataForm';
import { DocumentParser } from '../../services/DocumentParser';
import { AzureOpenAIService } from '../../services/AzureOpenAIService';
import { FileData } from '../MultiMetadataForm/IMultiMetadataFormProps';

// Azure OpenAI Configuration
// NOTE: In production, API keys should be stored securely (e.g., Azure Key Vault, environment variables, or backend proxy)
// Exposing API keys in client-side code is a security risk. Consider using a backend API proxy.
const AZURE_OPENAI_CONFIG = {
  apiKey: '2Hcf7EkLSg88ySVEjrapikrQjIFA4F4BGgshU8Gwci15RkklqgGDJQQJ99BIACYeBjFXJ3w3AAABACOGHLjU',
  endpoint: 'https://engineeringteamopenai.openai.azure.com',
  deploymentName: 'gpt-4o'
};

const MAX_FILES = 5;

export const FileUpload: React.FC<IFileUploadProps> = (props) => {
  const [dragOver, setDragOver] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingProgress, setProcessingProgress] = React.useState<string>('');
  const [filesData, setFilesData] = React.useState<FileData[]>([]);
  const [processingError, setProcessingError] = React.useState<string | null>(null);
  const [showForm, setShowForm] = React.useState(false);
  // const [kmFileUrl, setKmFileUrl] = React.useState<string | null>(null); // Removed: not used
  // const [successMessage, setSuccessMessage] = React.useState<string | null>(null); // Removed: handled by modal close

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const openAIService = React.useRef(new AzureOpenAIService(AZURE_OPENAI_CONFIG));
  const isSubmittingRef = React.useRef(false);

  const onBrowse = () => {
    fileInputRef.current?.click();
  };

  const onFileSelected = async (f?: FileList | null) => {
    if (!f || f.length === 0) return;

    // Limit to MAX_FILES
    const filesArray = Array.from(f).slice(0, MAX_FILES);

    if (f.length > MAX_FILES) {
      alert(`Maximum ${MAX_FILES} files allowed. Only the first ${MAX_FILES} files will be processed.`);
    }

    setUploadedFiles(filesArray);
    setShowForm(false);
    setIsProcessing(true);
    setProcessingError(null);
    setFilesData([]);
    setProcessingProgress('');

    try {
      // Process all files with AI in parallel (no SharePoint upload yet)
      setProcessingProgress(`Processing ${filesArray.length} file(s)...`);

      // Process all files in parallel
      const processingPromises = filesArray.map(async (file, index) => {
        console.log(`Starting parallel processing for file ${index + 1}: ${file.name}`);
        const metadata = await processFileWithAI(file);
        return {
          file: file,
          itemId: -1, // Placeholder - will be set when uploaded to SharePoint on submit
          metadata: metadata || {}
        };
      });

      // Wait for all files to be processed
      const processedFilesData = await Promise.all(processingPromises);

      setFilesData(processedFilesData);
      setIsProcessing(false);
      setProcessingProgress('');

      if (processedFilesData.length > 0) {
        setShowForm(true);
      } else {
        setProcessingError('No files were successfully processed.');
      }
    } catch (error) {
      console.error('Error processing files:', error);
      setProcessingError(error instanceof Error ? error.message : 'An error occurred while processing files.');
      setIsProcessing(false);
    }
  };


  const processFileWithAI = async (file: File): Promise<Record<string, any> | null> => {
    console.log('=== STARTING FILE PROCESSING ===');
    console.log('File:', file.name);
    console.log('File type:', file.type);
    console.log('File size:', file.size, 'bytes');

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
        return null;
      }

      if (!parseResult.text || parseResult.text.trim().length === 0) {
        console.warn('No text content found in the document. The document might be image-based or empty.');
        return null;
      }

      // Log parsed text for debugging
      console.log('=== FILE PARSED SUCCESSFULLY ===');
      console.log('File name:', file.name);
      console.log('File size:', file.size, 'bytes');
      console.log('Extracted text length:', parseResult.text.length, 'characters');
      console.log('Sample text (first 500 chars):', parseResult.text.substring(0, 500));

      // Step 2: Extract metadata using Azure OpenAI
      console.log('Step 2: Extracting metadata with AI...');
      const metadata = await openAIService.current.extractMetadata(parseResult.text);

      console.log('=== FILE PROCESSING COMPLETE ===');
      return metadata;
    } catch (error) {
      console.error('=== ERROR PROCESSING FILE ===');
      console.error('Error type:', typeof error);
      console.error('Error details:', error);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');

      return null;
    }
  };

  /**
   * Create an Audit Log item in SharePoint list.
   * Uses the provided list GUID and the internal field names seen in the URLs.
   */
  const createAuditLogItem = async (file: File, action: "Draft" | "Unpublished" | "Submitted" = "Draft"): Promise<number> => {

    if (!props.context) {
      throw new Error('SPFx context not provided to FileUpload component.');
    }

    const webUrl = props.context.pageContext.web.absoluteUrl;

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
    // When using 'odata=nometadata' we must NOT include __metadata in the payload.
    const body: any = {
      "__metadata": { "type": "SP.Data.Audit_x0020_LogListItem" },
      Title: file.name,
      FileName: file.name,
      Action: action,
      // For a person field, set the internal field with 'Id' suffix
      UserId: userId,
      PerformedById: userId,
      TimeStamp: new Date().toISOString()
    };

    console.log('Creating audit log item with payload:', body);

    const postResp = await props.context.spHttpClient.post(
      `${webUrl}/_api/web/lists/GetByTitle('Audit Log')/items`,
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
    if (!props.context) {
      throw new Error('SPFx context not provided to FileUpload component.');
    }

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
    // setKmFileUrl(serverRelativeUrl); // No need to set state here

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

    // 6️⃣ Metadata payload (initial values, will be updated with form data)
    const metadataBody = {
      __metadata: { type: entityType },
      Status: "Submitted", // Will be updated with form data, but set to Submitted as default
      TitleName: "-",
      Abstract: "-",
      BusinessUnit: "-",
      Department: "-",
      Region: "-",
      Client: "-",
      DocumentType: "-",
      DiseaseArea: "-",
      TherapyArea: "-",
      Emails: "-",
      Phones: "-",
      IDs: "-",
      SensitiveTerms: "-",
      PerformedById: userId,
      TimeStamp: new Date().toISOString()
    };


    // 7️⃣ Update metadata using fetch + MERGE + odata=nometadata
    const updateResp = await props.context.spHttpClient.post(
      `${webUrl}/_api/web/lists/getbytitle('KMArtifacts')/items(${itemId})`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          "Accept": "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "IF-MATCH": "*",
          "X-HTTP-Method": "MERGE",
          "odata-version": ""
        },
        body: JSON.stringify(metadataBody)
      }
    );


    if (!updateResp.ok) {
      const txt = await updateResp.text();
      console.error("KMArtifacts metadata update FAILED:", updateResp.status, txt);
      throw new Error(`KMArtifacts update failed: ${updateResp.status} ${txt}`);
    }

    console.log("KMArtifacts metadata updated successfully for itemId:", itemId);
    return itemId;

  };

  const updateKMArtifactsWithFormData = async (itemId: number, data: any) => {
    if (!props.context) {
      throw new Error('SPFx context not provided to FileUpload component.');
    }
    const LIBRARY_NAME = "KMArtifacts";
    const webUrl = props.context.pageContext.web.absoluteUrl;

    // 1️⃣ Get current user
    const currentUserResp = await props.context.spHttpClient.get(
      `${webUrl}/_api/web/currentuser`,
      SPHttpClient.configurations.v1
    );
    const currentUser = await currentUserResp.json();
    const userId = currentUser.Id;

    // 2️⃣ Get ListItemEntityTypeFullName (VERY IMPORTANT FOR MERGE UPDATE)
    const listInfoResp = await props.context.spHttpClient.get(
      `${webUrl}/_api/web/lists/getbytitle('${LIBRARY_NAME}')?$select=ListItemEntityTypeFullName`,
      SPHttpClient.configurations.v1
    );
    const listInfo = await listInfoResp.json();
    const entityType = listInfo.ListItemEntityTypeFullName; // example: SP.Data.KMArtifactsListItem

    // 3️⃣ Metadata body (without __metadata.type initially)
    const payload = {
      Status: data.Status || "Unpublished",
      TitleName: data.title || "-",
      Abstract: data.abstract || "-",
      BusinessUnit: data.bu || "-",
      Department: data.department || "-",
      Region: data.region || "-",
      Client: data.client || "-",
      DocumentType: data.documentType || "-",
      DiseaseArea: data.diseaseArea || "-",
      TherapyArea: data.therapyArea || "-",
      Emails: data.emails || "-",
      Phones: data.phones || "-",
      IDs: data.ids || "-",
      SensitiveTerms: data.pricing || "-",
      PerformedById: userId,
      TimeStamp: new Date().toISOString()
    };

    // Add __metadata to payload
    const payloadWithMetadata = {
      __metadata: { type: entityType }, // ⭐ REQUIRED FOR MERGE UPDATE
      ...payload
    };

    // 4️⃣ Update item (MERGE)
    const resp = await props.context.spHttpClient.post(
      `${webUrl}/_api/web/lists/getbytitle('${LIBRARY_NAME}')/items(${itemId})`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          "Accept": "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "IF-MATCH": "*",
          "X-HTTP-Method": "MERGE",
          "odata-version": ""
        },
        body: JSON.stringify(payloadWithMetadata)
      }
    );

    if (!resp.ok) {
      const errorText = await resp.text();
      throw new Error(`Failed to update metadata: ${resp.status} ${errorText}`);
    }

    console.log("KMArtifacts updated with form data:", itemId);
  };


  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      onFileSelected(e.dataTransfer.files);
    }
  };

  const onFormSubmit = async (allFilesData: FileData[]) => {
    console.log("Submitting metadata for all files", allFilesData);

    isSubmittingRef.current = true;
    setIsProcessing(true);
    setProcessingError(null);
    setProcessingProgress('Uploading files to SharePoint...');

    try {
      // Process all files in parallel - upload to SharePoint and create items
      setProcessingProgress(`Uploading ${allFilesData.length} file(s) to SharePoint...`);

      // Process all files in parallel
      const uploadPromises = allFilesData.map(async (fileData) => {
        try {
          // 1. Upload file and create KMArtifacts item
          const itemId = await updateKMArtifactsMetadata(fileData.file);
          console.log(`File ${fileData.file.name} uploaded successfully, itemId: ${itemId}`);

          // 2. Create audit log item (Action = Submitted)
          try {
            await createAuditLogItem(fileData.file, "Submitted");
          } catch (err) {
            console.warn(`Audit log creation failed for ${fileData.file.name}:`, err);
            // Continue even if audit log fails
          }

          // 3. Update KMArtifacts row with actual form values
          await updateKMArtifactsWithFormData(itemId, fileData.metadata);
          console.log(`Metadata updated successfully for ${fileData.file.name}`);

          return { success: true, fileName: fileData.file.name };
        } catch (err) {
          console.error(`Error processing ${fileData.file.name}:`, err);
          return {
            success: false,
            fileName: fileData.file.name,
            error: err instanceof Error ? err.message : String(err)
          };
        }
      });

      // Wait for all uploads to complete
      const results = await Promise.all(uploadPromises);

      // Check for any failures
      const failures = results.filter(r => !r.success);
      if (failures.length > 0) {
        const errorMessages = failures.map(f => `${f.fileName}: ${f.error}`).join('; ');
        setProcessingError(`Some files failed to upload: ${errorMessages}`);
        isSubmittingRef.current = false;
        setIsProcessing(false);
        return;
      }

      console.log(`Successfully submitted ${allFilesData.length} file(s)`);

      // Reset all state immediately to prevent form from showing
      // Reset in order: filesData first (used in render condition), then others
      setFilesData([]);
      setUploadedFiles([]);
      setShowForm(false);
      setProcessingError(null);
      setProcessingProgress('');
      isSubmittingRef.current = false;
      setIsProcessing(false);

      // Close the modal immediately
      // Use requestAnimationFrame to ensure state updates are processed
      requestAnimationFrame(() => {
        props.onClose && props.onClose();
      });
    } catch (err) {
      console.error("Error during form submission:", err);
      setProcessingError(err instanceof Error ? err.message : 'Error submitting files');
      isSubmittingRef.current = false;
      setIsProcessing(false);
    }
  };


  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        {uploadedFiles.length === 0 ? (
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
              <div className={styles.instructions}>Word, Ppt, Excel, PDF, MHTML, SVG. You can upload up to {MAX_FILES} files at once.</div>
              <button className={styles.browseBtn} onClick={(e) => { e.stopPropagation(); onBrowse(); }}>
                Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.mhtml,.mht,.svg,.mpp,message/rfc822,multipart/related,application/x-mimearchive,image/svg+xml"
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
                <h3 className={styles.processingTitle}>
                  {processingProgress && processingProgress.includes('Uploading') ? 'Uploading Files...' : 'Analyzing Documents...'}
                </h3>
                <p className={styles.processingMessage}>
                  {processingProgress || 'Reading your documents and extracting information. This may take a moment.'}
                </p>
                {processingError && (
                  <div className={styles.errorMessage}>
                    {processingError}
                  </div>
                )}
              </div>
            ) : !isSubmittingRef.current && showForm && filesData.length > 0 && filesData.length > 1 ? (
              <MultiMetadataForm
                onSubmit={onFormSubmit}
                onClose={() => {
                  setUploadedFiles([]);
                  setFilesData([]);
                  setShowForm(false);
                  isSubmittingRef.current = false;
                  props.onClose && props.onClose();
                }}
                filesData={filesData}
              />
            ) : !isSubmittingRef.current && showForm && filesData.length > 0 && filesData.length === 1 ? (
              <MetadataForm
                onSubmit={(data) => onFormSubmit([{ file: filesData[0].file, itemId: filesData[0].itemId, metadata: data }])}
                onClose={() => {
                  setUploadedFiles([]);
                  setFilesData([]);
                  setShowForm(false);
                  isSubmittingRef.current = false;
                  props.onClose && props.onClose();
                }}
                initialValues={filesData[0].metadata || undefined}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
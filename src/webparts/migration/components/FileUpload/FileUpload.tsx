import * as React from 'react';
import { IFileUploadProps } from './IFileUploadProps';
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
    setIsProcessing(true);
    setProcessingError(null);

    try {
      // Step 1: Parse the document to extract text
      const parseResult = await DocumentParser.parseFile(file);
      
      if (!parseResult.success) {
        setProcessingError(parseResult.error || 'Failed to parse document');
        setIsProcessing(false);
        return;
      }

      if (!parseResult.text || parseResult.text.trim().length === 0) {
        setProcessingError('No text content found in the document');
        setIsProcessing(false);
        return;
      }

      // Step 2: Extract metadata using Azure OpenAI
      const metadata = await openAIService.current.extractMetadata(parseResult.text);
      
      // Step 3: Set the extracted metadata
      setExtractedMetadata(metadata);
    } catch (error) {
      console.error('Error processing file with AI:', error);
      setProcessingError(
        error instanceof Error 
          ? error.message 
          : 'An error occurred while processing the document. Please fill the form manually.'
      );
    } finally {
      setIsProcessing(false);
    }
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

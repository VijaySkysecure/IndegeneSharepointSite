import * as React from 'react';
import { IFileUploadProps } from './IFileUploadProps';
import styles from './FileUpload.module.scss';
import { MetadataForm } from '../MetadataForm/MetadataForm';

export const FileUpload: React.FC<IFileUploadProps> = (props) => {
  const [dragOver, setDragOver] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const onBrowse = () => {
    fileInputRef.current?.click();
  };

  const onFileSelected = (f?: FileList | null) => {
    const file = f && f.length ? f[0] : undefined;
    if (file) {
      setUploadedFile(file);
      props.onUploaded && props.onUploaded(file);
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
            <MetadataForm onSubmit={onFormSubmit} onClose={() => props.onClose && props.onClose()} />
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

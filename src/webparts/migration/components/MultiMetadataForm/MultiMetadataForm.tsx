import * as React from 'react';
import styles from './MultiMetadataForm.module.scss';
import { IMultiMetadataFormProps } from './IMultiMetadataFormProps';

export const MultiMetadataForm: React.FC<IMultiMetadataFormProps> = ({ onSubmit, onClose, filesData }) => {
  const [formsData, setFormsData] = React.useState<Record<number, Record<string, any>>>({});
  
  // Track which fields were auto-filled for each file
  const autoFilledFields = React.useRef<Record<number, Set<string>>>({});

  // Initialize forms data from filesData
  React.useEffect(() => {
    const initialData: Record<number, Record<string, any>> = {};
    filesData.forEach((fileData, index) => {
      initialData[index] = {
        title: '',
        abstract: '',
        bu: '',
        department: '',
        region: '',
        client: '',
        documentType: '',
        diseaseArea: '',
        therapyArea: '',
        emails: '',
        phones: '',
        ids: '',
        pricing: '',
        sensitive: '',
        ...fileData.metadata
      };
      
      // Track which sensitive fields were auto-filled for this file
      autoFilledFields.current[index] = new Set();
      if (fileData.metadata?.emails && fileData.metadata.emails.trim()) {
        autoFilledFields.current[index].add('emails');
      }
      if (fileData.metadata?.phones && fileData.metadata.phones.trim()) {
        autoFilledFields.current[index].add('phones');
      }
      if (fileData.metadata?.client && fileData.metadata.client.trim()) {
        autoFilledFields.current[index].add('client');
      }
    });
    setFormsData(initialData);
  }, [filesData]);

  const handleFieldChange = (fileIndex: number, fieldName: string, value: string) => {
    setFormsData(prev => ({
      ...prev,
      [fileIndex]: {
        ...prev[fileIndex],
        [fieldName]: value
      }
    }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e && e.preventDefault();
    // Convert formsData to array format expected by parent
    const allFormsData = filesData.map((_, index) => ({
      file: filesData[index].file,
      itemId: filesData[index].itemId,
      metadata: formsData[index] || {}
    }));
    onSubmit && onSubmit(allFormsData);
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.headerBar}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>Document Metadata</h2>
          <div className={styles.subtitle}>
            {filesData.length} file{filesData.length > 1 ? 's' : ''} uploaded. Review and submit metadata for all files.
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Close"
        className={styles.closeBtn}
        onClick={() => onClose && onClose()}
        title="Close"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={styles.cardMeta}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formInner}>
            {filesData.map((fileData, index) => {
              const formData = formsData[index] || {};
              return (
                <div key={index} className={styles.singleFormContainer}>
                  <h3 className={styles.fileFormTitle}>File {index + 1} - {fileData.file.name}</h3>
                  {(() => {
                    const fileAutoFilledFields = autoFilledFields.current[index] || new Set();
                    const hasSensitiveInfo = fileAutoFilledFields.size > 0;
                    return hasSensitiveInfo ? (
                      <div className={styles.sensitiveWarning}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>This file contains sensitive information</span>
                      </div>
                    ) : null;
                  })()}
                  
                  <div className={styles.grid}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`title-${index}`}>Title</label>
                      <input 
                        id={`title-${index}`} 
                        name="title" 
                        placeholder="Enter document title" 
                        value={formData.title || ''} 
                        onChange={(e) => handleFieldChange(index, 'title', e.target.value)} 
                        className={styles.input} 
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`bu-${index}`}>Business Unit</label>
                      <input 
                        id={`bu-${index}`} 
                        name="bu" 
                        placeholder="Select or type BU" 
                        value={formData.bu || ''} 
                        onChange={(e) => handleFieldChange(index, 'bu', e.target.value)} 
                        className={styles.input} 
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`department-${index}`}>Department</label>
                      <input 
                        id={`department-${index}`} 
                        name="department" 
                        placeholder="Department" 
                        value={formData.department || ''} 
                        onChange={(e) => handleFieldChange(index, 'department', e.target.value)} 
                        className={styles.input} 
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`region-${index}`}>Region</label>
                      <input 
                        id={`region-${index}`} 
                        name="region" 
                        placeholder="Region" 
                        value={formData.region || ''} 
                        onChange={(e) => handleFieldChange(index, 'region', e.target.value)} 
                        className={styles.input} 
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`client-${index}`}>Client</label>
                      <input 
                        id={`client-${index}`} 
                        name="client" 
                        placeholder="Client name" 
                        value={formData.client || ''} 
                        onChange={(e) => handleFieldChange(index, 'client', e.target.value)} 
                        className={`${styles.input} ${(autoFilledFields.current[index] || new Set()).has('client') && formData.client ? styles.inputSensitive : ''}`} 
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`documentType-${index}`}>Document Type</label>
                      <input 
                        id={`documentType-${index}`} 
                        name="documentType" 
                        placeholder="e.g., PPTX, Report" 
                        value={formData.documentType || ''} 
                        onChange={(e) => handleFieldChange(index, 'documentType', e.target.value)} 
                        className={styles.input} 
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`diseaseArea-${index}`}>Disease Area</label>
                      <input 
                        id={`diseaseArea-${index}`} 
                        name="diseaseArea" 
                        placeholder="Disease Area" 
                        value={formData.diseaseArea || ''} 
                        onChange={(e) => handleFieldChange(index, 'diseaseArea', e.target.value)} 
                        className={styles.input} 
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`therapyArea-${index}`}>Therapy Area</label>
                      <input 
                        id={`therapyArea-${index}`} 
                        name="therapyArea" 
                        placeholder="Therapy Area" 
                        value={formData.therapyArea || ''} 
                        onChange={(e) => handleFieldChange(index, 'therapyArea', e.target.value)} 
                        className={styles.input} 
                      />
                    </div>

                    <div className={styles.fieldFull}>
                      <label className={styles.label} htmlFor={`abstract-${index}`}>Abstract</label>
                      <textarea 
                        id={`abstract-${index}`} 
                        name="abstract" 
                        placeholder="Short summary (1-2 lines)" 
                        value={formData.abstract || ''} 
                        onChange={(e) => handleFieldChange(index, 'abstract', e.target.value)} 
                        className={styles.textarea} 
                      />
                    </div>

                    <div className={styles.fieldFull}>
                      <label className={styles.label} htmlFor={`emails-${index}`}>Emails Found</label>
                      <textarea 
                        id={`emails-${index}`} 
                        name="emails" 
                        value={formData.emails || ''} 
                        onChange={(e) => handleFieldChange(index, 'emails', e.target.value)} 
                        className={`${styles.textareaScrollable} ${(autoFilledFields.current[index] || new Set()).has('emails') && formData.emails ? styles.inputSensitive : ''}`}
                      />
                    </div>

                    <div className={styles.fieldFull}>
                      <label className={styles.label} htmlFor={`phones-${index}`}>Phones Found</label>
                      <textarea 
                        id={`phones-${index}`} 
                        name="phones" 
                        value={formData.phones || ''} 
                        onChange={(e) => handleFieldChange(index, 'phones', e.target.value)} 
                        className={`${styles.textareaScrollable} ${(autoFilledFields.current[index] || new Set()).has('phones') && formData.phones ? styles.inputSensitive : ''}`}
                      />
                    </div>

                    <div className={styles.fieldFull}>
                      <label className={styles.label} htmlFor={`ids-${index}`}>IDs Found</label>
                      <textarea 
                        id={`ids-${index}`} 
                        name="ids" 
                        value={formData.ids || ''} 
                        onChange={(e) => handleFieldChange(index, 'ids', e.target.value)} 
                        className={styles.textarea} 
                      />
                    </div>

                    <div className={styles.fieldFull}>
                      <label className={styles.label} htmlFor={`pricing-${index}`}>Pricing / Sensitive Terms</label>
                      <textarea 
                        id={`pricing-${index}`} 
                        name="pricing" 
                        value={formData.pricing || ''} 
                        onChange={(e) => handleFieldChange(index, 'pricing', e.target.value)} 
                        className={styles.textarea} 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.submitContainer}>
            <button type="submit" className={styles.submitBtn}>
              Submit All ({filesData.length} file{filesData.length > 1 ? 's' : ''})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiMetadataForm;



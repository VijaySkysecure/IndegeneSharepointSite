import * as React from 'react';
import styles from './MetadataForm.module.scss';
import { IMetadataFormProps } from './IMetadataFormProps';

export const MetadataForm: React.FC<IMetadataFormProps> = ({ onSubmit, onClose, initialValues }) => {
  const [values, setValues] = React.useState<Record<string, any>>({
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
    ...initialValues
  });

  // Track which fields were auto-filled (from initialValues)
  const autoFilledFields = React.useRef<Set<string>>(new Set());
  
  React.useEffect(() => {
    if (initialValues) {
      // Track which sensitive fields were auto-filled
      if (initialValues.emails && initialValues.emails.trim()) {
        autoFilledFields.current.add('emails');
      }
      if (initialValues.phones && initialValues.phones.trim()) {
        autoFilledFields.current.add('phones');
      }
      if (initialValues.client && initialValues.client.trim()) {
        autoFilledFields.current.add('client');
      }
      setValues(prev => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  // Check if any sensitive field was auto-filled
  const hasSensitiveInfo = autoFilledFields.current.size > 0;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e && e.preventDefault();
    onSubmit && onSubmit(values);
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.headerBar}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>Document Metadata</h2>
          <div className={styles.subtitle}>Add context and tags for better discoverability</div>
          {hasSensitiveInfo && (
            <div className={styles.sensitiveWarning}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>This file contains sensitive information</span>
            </div>
          )}
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
            <div className={styles.grid}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="title">Title</label>
                    <input id="title" name="title" placeholder="Enter document title" value={values.title} onChange={onChange} className={styles.input} />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="bu">Business Unit</label>
                    <input id="bu" name="bu" placeholder="Select or type BU" value={values.bu} onChange={onChange} className={styles.input} />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="department">Department</label>
                    <input id="department" name="department" placeholder="Department" value={values.department} onChange={onChange} className={styles.input} />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="region">Region</label>
                    <input id="region" name="region" placeholder="Region" value={values.region} onChange={onChange} className={styles.input} />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="client">Client</label>
                    <input 
                      id="client" 
                      name="client" 
                      placeholder="Client name" 
                      value={values.client} 
                      onChange={onChange} 
                      className={`${styles.input} ${autoFilledFields.current.has('client') && values.client ? styles.inputSensitive : ''}`} 
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="documentType">Document Type</label>
                    <input id="documentType" name="documentType" placeholder="e.g., PPTX, Report" value={values.documentType} onChange={onChange} className={styles.input} />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="diseaseArea">Disease Area</label>
                    <input id="diseaseArea" name="diseaseArea" placeholder="Disease Area" value={values.diseaseArea} onChange={onChange} className={styles.input} />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="therapyArea">Therapy Area</label>
                    <input id="therapyArea" name="therapyArea" placeholder="Therapy Area" value={values.therapyArea} onChange={onChange} className={styles.input} />
                  </div>

                  <div className={styles.fieldFull}>
                    <label className={styles.label} htmlFor="abstract">Abstract</label>
                    <textarea id="abstract" name="abstract" placeholder="Short summary (1-2 lines)" value={values.abstract} onChange={onChange} className={styles.textarea} />
                  </div>

                  <div className={styles.fieldFull}>
                    <label className={styles.label} htmlFor="emails">Emails Found</label>
                    <textarea 
                      id="emails" 
                      name="emails" 
                      value={values.emails} 
                      onChange={onChange} 
                      className={`${styles.textareaScrollable} ${autoFilledFields.current.has('emails') && values.emails ? styles.inputSensitive : ''}`}
                    />
                  </div>

                  <div className={styles.fieldFull}>
                    <label className={styles.label} htmlFor="phones">Phones Found</label>
                    <textarea 
                      id="phones" 
                      name="phones" 
                      value={values.phones} 
                      onChange={onChange} 
                      className={`${styles.textareaScrollable} ${autoFilledFields.current.has('phones') && values.phones ? styles.inputSensitive : ''}`}
                    />
                  </div>

                  <div className={styles.fieldFull}>
                    <label className={styles.label} htmlFor="ids">IDs Found</label>
                    <textarea id="ids" name="ids" value={values.ids} onChange={onChange} className={styles.textarea} />
                  </div>

                  <div className={styles.fieldFull}>
                    <label className={styles.label} htmlFor="pricing">Pricing / Sensitive Terms</label>
                    <textarea id="pricing" name="pricing" value={values.pricing} onChange={onChange} className={styles.textarea} />
                  </div>

                </div>

            <div style={{marginTop:12,display:'flex',justifyContent:'flex-end'}}>
              <button type="submit" className={styles.submitBtn}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

};

export default MetadataForm;

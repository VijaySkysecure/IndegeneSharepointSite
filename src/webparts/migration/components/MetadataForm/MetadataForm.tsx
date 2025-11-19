import * as React from 'react';
import styles from './MetadataForm.module.scss';
import { IMetadataFormProps } from './IMetadataFormProps';

export const MetadataForm: React.FC<IMetadataFormProps> = ({ onSubmit }) => {
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
    sensitive: ''
  });

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
      <h2 className={styles.title}>Document Metadata</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formInner}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="title">Title</label>
              <input id="title" name="title" value={values.title} onChange={onChange} className={styles.input} />
            </div>

            <div className={styles.fieldFull}>
              <label className={styles.label} htmlFor="abstract">Abstract</label>
              <textarea id="abstract" name="abstract" value={values.abstract} onChange={onChange} className={styles.textarea} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="bu">BU</label>
              <input id="bu" name="bu" value={values.bu} onChange={onChange} className={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="department">Department</label>
              <input id="department" name="department" value={values.department} onChange={onChange} className={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="region">Region</label>
              <input id="region" name="region" value={values.region} onChange={onChange} className={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="client">Client</label>
              <input id="client" name="client" value={values.client} onChange={onChange} className={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="documentType">Document Type</label>
              <input id="documentType" name="documentType" value={values.documentType} onChange={onChange} className={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="diseaseArea">Disease Area</label>
              <input id="diseaseArea" name="diseaseArea" value={values.diseaseArea} onChange={onChange} className={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="therapyArea">Therapy Area</label>
              <input id="therapyArea" name="therapyArea" value={values.therapyArea} onChange={onChange} className={styles.input} />
            </div>

            <div className={styles.fieldFull}>
              <label className={styles.label} htmlFor="emails">Emails Found</label>
              <textarea id="emails" name="emails" value={values.emails} onChange={onChange} className={styles.textarea} />
            </div>

            <div className={styles.fieldFull}>
              <label className={styles.label} htmlFor="phones">Phones Found</label>
              <textarea id="phones" name="phones" value={values.phones} onChange={onChange} className={styles.textarea} />
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

          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MetadataForm;

export interface IMetadataFormProps {
  onSubmit?: (data: Record<string, any>) => void;
  onClose?: () => void;
  initialValues?: Record<string, any>;
}

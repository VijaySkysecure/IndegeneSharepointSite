export interface IFileUploadProps {
  onClose?: () => void;
  onUploaded?: (file: File) => void;
}

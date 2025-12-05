export interface FileData {
  file: File;
  itemId: number;
  metadata: Record<string, any>;
}

export interface IMultiMetadataFormProps {
  onSubmit?: (filesData: FileData[]) => void;
  onClose?: () => void;
  onDelete?: (index: number) => void;
  filesData: FileData[];
}



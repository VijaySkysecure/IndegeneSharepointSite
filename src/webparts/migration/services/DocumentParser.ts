/**
 * Service to extract text from various document formats
 */

export interface DocumentParseResult {
  text: string;
  success: boolean;
  error?: string;
}

export class DocumentParser {
  /**
   * Extract text from a file based on its type
   */
  static async parseFile(file: File): Promise<DocumentParseResult> {
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    
    try {
      switch (fileExtension) {
        case 'pdf':
          return await this.parsePDF(file);
        case 'docx':
          return await this.parseWord(file);
        case 'doc':
          return { text: '', success: false, error: 'Legacy .doc format not supported. Please convert to .docx' };
        case 'pptx':
        case 'ppt':
          return { text: '', success: false, error: 'PowerPoint parsing not yet implemented. Please convert to PDF or Word format.' };
        case 'xlsx':
        case 'xls':
          return { text: '', success: false, error: 'Excel parsing not yet implemented. Please convert to PDF or Word format.' };
        case 'mpp':
          return { text: '', success: false, error: 'MS Project parsing not yet implemented. Please convert to PDF or Word format.' };
        default:
          return { text: '', success: false, error: `Unsupported file type: ${fileExtension}` };
      }
    } catch (error) {
      return {
        text: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred while parsing document'
      };
    }
  }

  /**
   * Extract text from PDF file
   */
  private static async parsePDF(file: File): Promise<DocumentParseResult> {
    try {
      const pdfToTextModule = await import('react-pdftotext');
      const pdfToText = (pdfToTextModule as any).default || pdfToTextModule;
      const text = await pdfToText(file);
      
      if (!text || text.trim().length === 0) {
        return {
          text: '',
          success: false,
          error: 'No text content found in PDF. The PDF might be image-based (scanned) or encrypted. Please use a text-based PDF or convert the document to Word format.'
        };
      }
      
      return {
        text: text.trim(),
        success: true
      };
    } catch (error) {
      let errorMessage = 'Failed to parse PDF';
      if (error instanceof Error) {
        errorMessage = error.message;
        const msg = error.message.toLowerCase();
        if (msg.indexOf('invalid pdf') !== -1 || msg.indexOf('corrupted') !== -1) {
          errorMessage = 'The PDF file appears to be corrupted or invalid. Please try a different PDF file.';
        } else if (msg.indexOf('password') !== -1 || msg.indexOf('encrypted') !== -1) {
          errorMessage = 'The PDF is password-protected or encrypted. Please remove the password and try again.';
        }
      }
      
      return {
        text: '',
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Extract text from Word (.docx) file
   */
  private static async parseWord(file: File): Promise<DocumentParseResult> {
    try {
      const mammoth = await import('mammoth');
      const arrayBuffer = await file.arrayBuffer();
      
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      return {
        text: result.value.trim(),
        success: true
      };
    } catch (error) {
      return {
        text: '',
        success: false,
        error: error instanceof Error ? error.message : 'Failed to parse Word document'
      };
    }
  }
}

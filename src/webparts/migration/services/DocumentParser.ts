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
      const pdfjsLib = await import('pdfjs-dist');
      
      // Set worker source - using CDN for compatibility
      // Alternative: bundle the worker file and reference it locally
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      }
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      const numPages = pdf.numPages;
      
      // Extract text from each page
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => {
            // Handle both TextItem and TextMarkedContent types
            if ('str' in item && item.str) {
              return item.str;
            }
            return '';
          })
          .join(' ');
        fullText += pageText + '\n';
      }
      
      return {
        text: fullText.trim(),
        success: true
      };
    } catch (error) {
      return {
        text: '',
        success: false,
        error: error instanceof Error ? error.message : 'Failed to parse PDF'
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


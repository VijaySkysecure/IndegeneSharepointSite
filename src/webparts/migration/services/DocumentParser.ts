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
      console.log('=== STARTING PDF PARSING ===');
      console.log('File name:', file.name);
      console.log('File size:', file.size, 'bytes');
      
      // Import PDF.js
      const pdfjsLib = await import('pdfjs-dist');
      console.log('PDF.js library loaded, version:', pdfjsLib.version);
      
      // For SharePoint Framework with strict CSP, we need to work around restrictions
      // Webpack bundles the worker as a chunk file that we can reference
      // The CSP is in "report-only" mode, so violations are logged but execution continues
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        try {
          // Find the base path where the webpart bundle is loaded from
          const scripts = document.getElementsByTagName('script');
          let basePath = '';
          for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].src;
            if (src && src.indexOf('migration-web-part') !== -1) {
              basePath = src.substring(0, src.lastIndexOf('/'));
              break;
            }
          }
          
          if (basePath) {
            // Webpack bundles the worker as: chunk.vendors-node_modules_pdfjs-dist_build_pdf_worker_min_mjs.js
            const workerPath = basePath + '/chunk.vendors-node_modules_pdfjs-dist_build_pdf_worker_min_mjs.js';
            pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;
            console.log('PDF.js worker path set to bundled chunk:', workerPath);
          } else {
            // Fallback: Try relative path
            pdfjsLib.GlobalWorkerOptions.workerSrc = './chunk.vendors-node_modules_pdfjs-dist_build_pdf_worker_min_mjs.js';
            console.log('PDF.js worker path set to relative path (fallback)');
          }
        } catch (pathError) {
          console.warn('Could not set worker path, using data URL fallback:', pathError);
          // Fallback: Use data URL - CSP is report-only so execution will continue despite warning
          const minimalWorker = 'self.onmessage=function(e){self.postMessage(e.data)}';
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'data:application/javascript;base64,' + btoa(minimalWorker);
          console.log('PDF.js worker set to data URL (CSP warning expected, report-only mode allows execution)');
        }
      }
      
      console.log('Reading file as ArrayBuffer...');
      const arrayBuffer = await file.arrayBuffer();
      console.log('ArrayBuffer size:', arrayBuffer.byteLength, 'bytes');
      
      console.log('Loading PDF document...');
      // Disable worker explicitly to avoid CSP issues in SharePoint
      const pdf = await pdfjsLib.getDocument({ 
        // pdfjs expects a typed array (e.g. Uint8Array) rather than a raw ArrayBuffer
        data: new Uint8Array(arrayBuffer),
        verbosity: 0, // Reduce console noise
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true
      }).promise;
      
      console.log('PDF loaded successfully. Number of pages:', pdf.numPages);
      
      let fullText = '';
      const numPages = pdf.numPages;
      
      // Extract text from each page
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        console.log(`Extracting text from page ${pageNum}/${numPages}...`);
        try {
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
          console.log(`Page ${pageNum} extracted: ${pageText.length} characters`);
        } catch (pageError) {
          console.error(`Error extracting page ${pageNum}:`, pageError);
          // Continue with other pages even if one fails
        }
      }
      
      const extractedText = fullText.trim();
      console.log('=== PDF PARSING COMPLETE ===');
      console.log('Total text extracted:', extractedText.length, 'characters');
      
      if (extractedText.length === 0) {
        console.warn('⚠️ WARNING: No text extracted from PDF. The PDF might be image-based or encrypted.');
        return {
          text: '',
          success: false,
          error: 'No text content found in PDF. The PDF might be image-based (scanned) or encrypted. Please use a text-based PDF or convert the document to Word format.'
        };
      }
      
      return {
        text: extractedText,
        success: true
      };
    } catch (error) {
      console.error('=== PDF PARSING ERROR ===');
      console.error('Error details:', error);
      console.error('Error type:', typeof error);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      
      let errorMessage = 'Failed to parse PDF';
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Provide more helpful error messages (using indexOf for ES5 compatibility)
        const msg = error.message.toLowerCase();
        if (msg.indexOf('worker') !== -1) {
          errorMessage = 'PDF.js worker failed to load. Please check your internet connection and try again.';
        } else if (msg.indexOf('invalid pdf') !== -1 || msg.indexOf('corrupted') !== -1) {
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

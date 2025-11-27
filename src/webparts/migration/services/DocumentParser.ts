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
          return await this.parsePowerPoint(file);
        case 'ppt':
          return { text: '', success: false, error: 'Legacy .ppt format not supported. Please convert to .pptx format.' };
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

  /**
   * Extract text from PowerPoint (.pptx) file
   * PPTX files are ZIP archives containing XML files
   */
  private static async parsePowerPoint(file: File): Promise<DocumentParseResult> {
    try {
      const JSZipModule = await import('jszip');
      // Handle both default export and namespace export
      const JSZip = (JSZipModule as any).default || JSZipModule;
      const arrayBuffer = await file.arrayBuffer();
      
      // Load the PPTX file (which is a ZIP archive)
      const zip = await JSZip.loadAsync(arrayBuffer);
      
      // Get all slide files (ppt/slides/slide*.xml)
      const slideFiles: string[] = [];
      zip.forEach((relativePath) => {
        if (relativePath.startsWith('ppt/slides/slide') && relativePath.endsWith('.xml')) {
          slideFiles.push(relativePath);
        }
      });
      
      // Sort slides by number
      slideFiles.sort((a, b) => {
        const aNum = parseInt(a.match(/slide(\d+)\.xml/)?.[1] || '0');
        const bNum = parseInt(b.match(/slide(\d+)\.xml/)?.[1] || '0');
        return aNum - bNum;
      });
      
      if (slideFiles.length === 0) {
        return {
          text: '',
          success: false,
          error: 'No slides found in the PowerPoint file.'
        };
      }
      
      // Extract text from each slide
      const allText: string[] = [];
      
      console.log(`Found ${slideFiles.length} slides to process`);
      
      for (const slidePath of slideFiles) {
        try {
          const slideXml = await zip.file(slidePath)?.async('string');
          if (slideXml) {
            console.log(`Processing slide: ${slidePath}`);
            const slideText = this.extractTextFromSlideXml(slideXml);
            console.log(`Extracted ${slideText.length} characters from ${slidePath}`);
            if (slideText.trim()) {
              allText.push(slideText);
            } else {
              console.warn(`No text extracted from ${slidePath}`);
            }
          } else {
            console.warn(`Slide file ${slidePath} is null or undefined`);
          }
        } catch (slideError) {
          console.warn(`Error parsing slide ${slidePath}:`, slideError);
          // Continue with other slides
        }
      }
      
      console.log(`Total slides with text: ${allText.length}`);
      
      const combinedText = allText.join('\n\n').trim();
      
      if (!combinedText || combinedText.length === 0) {
        return {
          text: '',
          success: false,
          error: 'No text content found in PowerPoint slides. The slides might be image-based or empty.'
        };
      }
      
      return {
        text: combinedText,
        success: true
      };
    } catch (error) {
      let errorMessage = 'Failed to parse PowerPoint document';
      if (error instanceof Error) {
        errorMessage = error.message;
        const msg = error.message.toLowerCase();
        if (msg.indexOf('invalid') !== -1 || msg.indexOf('corrupted') !== -1) {
          errorMessage = 'The PowerPoint file appears to be corrupted or invalid. Please try a different file.';
        } else if (msg.indexOf('not a zip') !== -1 || msg.indexOf('bad zip') !== -1) {
          errorMessage = 'The file does not appear to be a valid PPTX file. PPTX files must be in the Office Open XML format.';
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
   * Extract text content from a slide XML string
   * Looks for text in <a:t> tags (text runs in PowerPoint XML)
   * Handles various PowerPoint XML structures and namespaces
   */
  private static extractTextFromSlideXml(xml: string): string {
    const textParts: string[] = [];
    
    // PowerPoint uses <a:t> tags for text runs (drawingML namespace)
    // The namespace prefix 'a' refers to drawingML (http://schemas.openxmlformats.org/drawingml/2006/main)
    // Also handle cases where namespace might be different or missing
    const textRunPatterns = [
      /<a:t(?:\s[^>]*)?>([^<]*)<\/a:t>/g,  // DrawingML text runs with 'a:' prefix
      /<t(?:\s[^>]*)?>([^<]*)<\/t>/g,      // Text tag without prefix (might be in different namespace context)
      /<p:t(?:\s[^>]*)?>([^<]*)<\/p:t>/g,  // PresentationML text
      // Also try with full namespace URLs in case of different XML structure
      /<[^:>]*:t(?:\s[^>]*)?>([^<]*)<\/[^:>]*:t>/g  // Any namespace prefix with 't' tag
    ];
    
    // Extract text using all patterns
    for (let i = 0; i < textRunPatterns.length; i++) {
      const pattern = textRunPatterns[i];
      // Reset regex lastIndex to ensure we check from the beginning
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(xml)) !== null) {
        if (match[1] && match[1].trim()) {
          const decoded = this.decodeXmlEntities(match[1]);
          if (decoded.trim()) {
            textParts.push(decoded);
          }
        }
      }
    }
    
    // Also extract from text body sections (<p:txBody>, <txBody>, <a:txBody>)
    const txBodyPatterns = [
      /<p:txBody[^>]*>([\s\S]*?)<\/p:txBody>/g,
      /<a:txBody[^>]*>([\s\S]*?)<\/a:txBody>/g,
      /<txBody[^>]*>([\s\S]*?)<\/txBody>/g
    ];
    
    for (const pattern of txBodyPatterns) {
      pattern.lastIndex = 0; // Reset regex
      let txBodyMatch;
      while ((txBodyMatch = pattern.exec(xml)) !== null) {
        const bodyContent = txBodyMatch[1];
        // Extract text from within the text body
        const bodyTextPatterns = [
          /<a:t(?:\s[^>]*)?>([^<]*)<\/a:t>/g,
          /<t(?:\s[^>]*)?>([^<]*)<\/t>/g
        ];
        
        for (const bodyPattern of bodyTextPatterns) {
          bodyPattern.lastIndex = 0; // Reset regex
          let bodyTextMatch;
          while ((bodyTextMatch = bodyPattern.exec(bodyContent)) !== null) {
            if (bodyTextMatch[1] && bodyTextMatch[1].trim()) {
              const decoded = this.decodeXmlEntities(bodyTextMatch[1]);
              if (decoded.trim()) {
                textParts.push(decoded);
              }
            }
          }
        }
      }
    }
    
    // If still no text found, try a more aggressive approach - look for any text between tags
    if (textParts.length === 0) {
      console.warn('No text found with standard patterns, trying fallback method');
      // Fallback: extract any text content that's not inside angle brackets
      const fallbackPattern = />([^<]+)</g;
      let fallbackMatch;
      while ((fallbackMatch = fallbackPattern.exec(xml)) !== null) {
        const text = fallbackMatch[1].trim();
        // Filter out very short strings and XML artifacts
        if (text.length > 2 && !text.match(/^[\s\n\r]*$/)) {
          const decoded = this.decodeXmlEntities(text);
          if (decoded.trim() && decoded.length > 2) {
            textParts.push(decoded);
          }
        }
      }
    }
    
    // Join all text parts with spaces
    // Note: We preserve duplicates as they may appear in different contexts
    const result = textParts.join(' ');
    console.log(`Extracted ${textParts.length} text fragments, total length: ${result.length}`);
    return result;
  }

  /**
   * Decode XML entities to plain text
   */
  private static decodeXmlEntities(text: string): string {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  }
}

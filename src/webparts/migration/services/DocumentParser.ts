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
    const fileType = file.type?.toLowerCase() || '';
    
    console.log('=== FILE PARSING DEBUG ===');
    console.log('File name:', file.name);
    console.log('File extension:', fileExtension);
    console.log('File type (MIME):', fileType);
    
    try {
      // Check by file extension first
      let fileTypeToParse = fileExtension;
      
      // Also check MIME type for MHTML files (Microsoft Edge may not set extension correctly)
      if (fileType.indexOf('message/rfc822') !== -1 || 
          fileType.indexOf('multipart/related') !== -1 ||
          fileType.indexOf('application/x-mimearchive') !== -1 ||
          fileType.indexOf('mhtml') !== -1 ||
          fileType.indexOf('mht') !== -1) {
        fileTypeToParse = 'mhtml';
        console.log('Detected MHTML file by MIME type');
      }
      
      // Check MIME type for SVG files
      if (fileType.indexOf('image/svg+xml') !== -1 || fileType.indexOf('image/svg') !== -1) {
        fileTypeToParse = 'svg';
        console.log('Detected SVG file by MIME type');
      }
      
      switch (fileTypeToParse) {
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
        case 'mhtml':
        case 'mht':
          return await this.parseMHTML(file);
        case 'svg':
          return await this.parseSVG(file);
        case 'mpp':
          return { text: '', success: false, error: 'MS Project parsing not yet implemented. Please convert to PDF or Word format.' };
        default:
          return { text: '', success: false, error: `Unsupported file type: ${fileExtension}. File type: ${fileType || 'unknown'}` };
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
   * Extract text from SVG (.svg) file
   * SVG files are XML-based and can contain text elements
   */
  private static async parseSVG(file: File): Promise<DocumentParseResult> {
    try {
      console.log('=== STARTING SVG PARSING ===');
      console.log('File name:', file.name);
      console.log('File size:', file.size, 'bytes');
      console.log('File type:', file.type);
      
      const fileText = await file.text();
      
      if (!fileText || fileText.trim().length === 0) {
        console.error('SVG file is empty');
        return {
          text: '',
          success: false,
          error: 'The SVG file appears to be empty.'
        };
      }
      
      console.log('SVG file loaded, total size:', fileText.length, 'characters');
      
      // Extract text from SVG
      // SVG can have text in <text>, <tspan>, <title>, <desc> elements
      // Also extract from attributes like aria-label, title attribute, etc.
      const textParts: string[] = [];
      
      // Pattern 1: Extract from <text> and <tspan> elements
      const textElementRegex = /<text[^>]*>([^<]*)<\/text>/gi;
      const tspanRegex = /<tspan[^>]*>([^<]*)<\/tspan>/gi;
      
      let match;
      while ((match = textElementRegex.exec(fileText)) !== null) {
        if (match[1] && match[1].trim()) {
          textParts.push(match[1].trim());
        }
      }
      
      while ((match = tspanRegex.exec(fileText)) !== null) {
        if (match[1] && match[1].trim()) {
          textParts.push(match[1].trim());
        }
      }
      
      // Pattern 2: Extract from <title> and <desc> elements
      const titleRegex = /<title[^>]*>([^<]*)<\/title>/gi;
      const descRegex = /<desc[^>]*>([^<]*)<\/desc>/gi;
      
      while ((match = titleRegex.exec(fileText)) !== null) {
        if (match[1] && match[1].trim()) {
          textParts.push(match[1].trim());
        }
      }
      
      while ((match = descRegex.exec(fileText)) !== null) {
        if (match[1] && match[1].trim()) {
          textParts.push(match[1].trim());
        }
      }
      
      // Pattern 3: Extract from attributes (aria-label, title, etc.)
      const ariaLabelRegex = /aria-label=["']([^"']+)["']/gi;
      const titleAttrRegex = /title=["']([^"']+)["']/gi;
      
      while ((match = ariaLabelRegex.exec(fileText)) !== null) {
        if (match[1] && match[1].trim()) {
          textParts.push(match[1].trim());
        }
      }
      
      while ((match = titleAttrRegex.exec(fileText)) !== null) {
        if (match[1] && match[1].trim()) {
          textParts.push(match[1].trim());
        }
      }
      
      // Pattern 4: If no text found, try using DOMParser to extract all text content
      if (textParts.length === 0) {
        console.warn('No text elements found, trying DOMParser fallback');
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(fileText, 'image/svg+xml');
          
          // Check for parsing errors
          const parserError = doc.querySelector('parsererror');
          if (parserError) {
            console.warn('SVG parsing error:', parserError.textContent);
          } else {
            // Extract all text content from the SVG
            const allText = doc.documentElement.textContent || (doc.documentElement as any).innerText || '';
            if (allText.trim()) {
              textParts.push(allText.trim());
            }
          }
        } catch (parseError) {
          console.warn('DOMParser failed for SVG:', parseError);
        }
      }
      
      // Decode XML entities
      const decodedParts = textParts.map(part => this.decodeXmlEntities(part));
      
      // Remove duplicates and join
      const uniqueParts = Array.from(new Set(decodedParts));
      const combinedText = uniqueParts.join(' ').trim();
      
      console.log(`Extracted ${textParts.length} text element(s) from SVG`);
      console.log('Combined text length:', combinedText.length);
      console.log('Sample text (first 500 chars):', combinedText.substring(0, 500));
      
      if (!combinedText || combinedText.length === 0) {
        return {
          text: '',
          success: false,
          error: 'No text content found in SVG file. The SVG might contain only graphics without text elements.'
        };
      }
      
      console.log('=== SVG PARSING SUCCESSFUL ===');
      return {
        text: combinedText,
        success: true
      };
    } catch (error) {
      let errorMessage = 'Failed to parse SVG document';
      if (error instanceof Error) {
        errorMessage = error.message;
        const msg = error.message.toLowerCase();
        if (msg.indexOf('invalid') !== -1 || msg.indexOf('corrupted') !== -1) {
          errorMessage = 'The SVG file appears to be corrupted or invalid. Please try a different file.';
        }
      }
      
      console.error('SVG parsing error:', error);
      return {
        text: '',
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Extract text from Microsoft Edge HTML (.mhtml/.mht) file
   * MHTML files contain HTML content with embedded resources separated by MIME boundaries
   */
  private static async parseMHTML(file: File): Promise<DocumentParseResult> {
    try {
      console.log('=== STARTING MHTML PARSING ===');
      console.log('File name:', file.name);
      console.log('File size:', file.size, 'bytes');
      console.log('File type:', file.type);
      
      const fileText = await file.text();
      
      if (!fileText || fileText.trim().length === 0) {
        console.error('MHTML file is empty');
        return {
          text: '',
          success: false,
          error: 'The MHTML file appears to be empty.'
        };
      }
      
      console.log('MHTML file loaded, total size:', fileText.length, 'characters');
      console.log('First 500 characters:', fileText.substring(0, 500));
      
      // MHTML files use MIME boundaries to separate parts
      // Common boundary patterns: --boundary, =_NextPart, etc.
      // Extract HTML content parts
      const htmlParts: string[] = [];
      
      // Pattern 1: Look for Content-Type: text/html sections
      const htmlContentRegex = /Content-Type:\s*text\/html[^\r\n]*(?:\r?\n[^\r\n]*)*\r?\n\r?\n([\s\S]*?)(?=\r?\n--|$)/gi;
      let match;
      
      while ((match = htmlContentRegex.exec(fileText)) !== null) {
        if (match[1] && match[1].trim()) {
          htmlParts.push(match[1]);
        }
      }
      
      // Pattern 2: If no HTML parts found with Content-Type, look for HTML tags directly
      // This handles cases where the MIME structure might be different
      if (htmlParts.length === 0) {
        const htmlTagRegex = /<html[\s\S]*?<\/html>/gi;
        let htmlMatch;
        while ((htmlMatch = htmlTagRegex.exec(fileText)) !== null) {
          if (htmlMatch[0] && htmlMatch[0].trim()) {
            htmlParts.push(htmlMatch[0]);
          }
        }
      }
      
      // Pattern 3: Extract any text between MIME boundaries that looks like HTML
      if (htmlParts.length === 0) {
        // Split by common MIME boundary markers
        const parts = fileText.split(/--[^\r\n]+/);
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          // Check if this part contains HTML-like content
          if (part && (part.indexOf('<html') !== -1 || part.indexOf('<!DOCTYPE') !== -1 || part.indexOf('<body') !== -1)) {
            // Extract the HTML portion (skip headers)
            const htmlStart = Math.max(
              part.indexOf('<html'),
              part.indexOf('<!DOCTYPE'),
              part.indexOf('<body')
            );
            if (htmlStart !== -1) {
              const htmlContent = part.substring(htmlStart);
              if (htmlContent.trim()) {
                htmlParts.push(htmlContent);
              }
            }
          }
        }
      }
      
      console.log(`Found ${htmlParts.length} HTML part(s) in MHTML file`);
      
      if (htmlParts.length === 0) {
        // Fallback: try to extract any readable text from the file
        console.warn('No HTML parts found, attempting to extract text directly');
        const extractedText = this.extractTextFromHTML(fileText);
        if (extractedText && extractedText.trim().length > 0) {
          return {
            text: extractedText.trim(),
            success: true
          };
        }
        
        return {
          text: '',
          success: false,
          error: 'No HTML content found in the MHTML file. The file might be corrupted or in an unsupported format.'
        };
      }
      
      // Extract text from all HTML parts
      const allText: string[] = [];
      
      for (let i = 0; i < htmlParts.length; i++) {
        try {
          const htmlContent = htmlParts[i];
          const text = this.extractTextFromHTML(htmlContent);
          if (text && text.trim()) {
            allText.push(text);
            console.log(`Extracted ${text.length} characters from HTML part ${i + 1}`);
          }
        } catch (partError) {
          console.warn(`Error parsing HTML part ${i + 1}:`, partError);
          // Continue with other parts
        }
      }
      
      const combinedText = allText.join('\n\n').trim();
      
      console.log('Combined text length:', combinedText.length);
      console.log('Sample of extracted text (first 500 chars):', combinedText.substring(0, 500));
      
      if (!combinedText || combinedText.length === 0) {
        console.error('No text content extracted from HTML parts');
        return {
          text: '',
          success: false,
          error: 'No text content found in MHTML file. The HTML might be empty or contain only images.'
        };
      }
      
      console.log(`=== MHTML PARSING SUCCESSFUL ===`);
      console.log(`Total extracted text length: ${combinedText.length} characters`);
      return {
        text: combinedText,
        success: true
      };
    } catch (error) {
      let errorMessage = 'Failed to parse MHTML document';
      if (error instanceof Error) {
        errorMessage = error.message;
        const msg = error.message.toLowerCase();
        if (msg.indexOf('invalid') !== -1 || msg.indexOf('corrupted') !== -1) {
          errorMessage = 'The MHTML file appears to be corrupted or invalid. Please try a different file.';
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
   * Extract plain text from HTML content
   * Removes HTML tags, scripts, styles, and extracts readable text
   */
  private static extractTextFromHTML(html: string): string {
    // Create a temporary DOM element to parse HTML
    // Since we're in a browser environment, we can use DOMParser
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Remove script and style elements
      const scripts = doc.querySelectorAll('script, style, noscript');
      for (let i = 0; i < scripts.length; i++) {
        const element = scripts[i];
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
      
      // Get text content from body, or entire document if no body
      const body = doc.body || doc.documentElement;
      if (body) {
        let text = body.textContent || (body as any).innerText || '';
        // Clean up whitespace
        text = text.replace(/\s+/g, ' ').trim();
        return text;
      }
    } catch (parseError) {
      console.warn('DOMParser failed, using regex fallback:', parseError);
    }
    
    // Fallback: Use regex to strip HTML tags
    let text = html
      // Remove script and style blocks
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
      // Remove HTML comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Remove HTML tags
      .replace(/<[^>]+>/g, ' ')
      // Decode HTML entities
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      // Clean up whitespace
      .replace(/\s+/g, ' ')
      .trim();
    
    return text;
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

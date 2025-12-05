/**
 * Service to interact with Azure OpenAI API
 */

import { ALLOWED_BUSINESS_UNITS, ALLOWED_DEPARTMENTS, ALLOWED_DISEASE_AREAS, ALLOWED_THERAPY_AREAS, ALLOWED_REGIONS, ALLOWED_DOCUMENT_TYPES, findBestMatch } from './ValidationConstants';
import { maskAllEmails, maskAllPhones } from './DataMasking';

export interface MetadataExtraction {
  title?: string;
  documentType?: string;
  bu?: string;
  department?: string;
  region?: string;
  client?: string;
  abstract?: string;
  diseaseArea?: string;
  therapyArea?: string;
  emails?: string;
  phones?: string;
  ids?: string;
  pricing?: string;
}

interface AzureOpenAIConfig {
  apiKey: string;
  endpoint: string;
  deploymentName: string;
  apiVersion?: string;
}

export class AzureOpenAIService {
  private config: AzureOpenAIConfig;

  constructor(config: AzureOpenAIConfig) {
    this.config = {
      ...config,
      apiVersion: config.apiVersion || '2024-02-15-preview'
    };
  }

  /**
   * Extract metadata from document text using GPT-4o
   * Uses chunked processing for large documents
   */
  async extractMetadata(documentText: string): Promise<MetadataExtraction> {
    try {
      // Log the extracted text for debugging
      console.log('=== DOCUMENT TEXT EXTRACTED ===');
      console.log('Total length:', documentText.length, 'characters');
      console.log('First 1000 chars:', documentText.substring(0, 1000));
      console.log('Last 1000 chars:', documentText.substring(Math.max(0, documentText.length - 1000)));
      
      // Count emails in the raw text for debugging
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const foundEmails = documentText.match(emailRegex);
      console.log('=== EMAILS FOUND IN RAW TEXT ===');
      console.log('Count:', foundEmails ? foundEmails.length : 0);
      if (foundEmails) {
        console.log('Emails:', foundEmails);
      }

      // Chunk size for processing (15k characters per chunk)
      const chunkSize = 15000;
      
      // If document is small enough, process normally
      if (documentText.length <= chunkSize) {
        console.log('=== PROCESSING AS SINGLE CHUNK ===');
        const result = await this.processSingleChunk(documentText);
        // Validate and retry if needed
        const validatedResult = await this.validateAndRetryIfNeeded(result, [documentText]);
        return validatedResult;
      }

      // Otherwise, use chunked processing
      console.log('=== PROCESSING WITH CHUNKED METHOD ===');
      console.log('Document length:', documentText.length, 'characters');
      console.log('Chunk size:', chunkSize, 'characters');
      
      const chunks = this.splitIntoChunks(documentText, chunkSize);
      console.log('Number of chunks:', chunks.length);
      
      return await this.processChunks(chunks);
    } catch (error) {
      console.error('Error extracting metadata:', error);
      throw error;
    }
  }

  /**
   * Build the prompt for metadata extraction
   */
  private buildExtractionPrompt(documentText: string, chunkContext?: { chunkIndex?: number; totalChunks?: number; previousFindings?: Partial<MetadataExtraction> }): string {
    const buList = ALLOWED_BUSINESS_UNITS.join('\n- ');
    const deptList = ALLOWED_DEPARTMENTS.join('\n- ');
    const diseaseAreaList = ALLOWED_DISEASE_AREAS.join('\n- ');
    const therapyAreaList = ALLOWED_THERAPY_AREAS.join('\n- ');
    const regionList = ALLOWED_REGIONS.join('\n- ');
    const documentTypeList = ALLOWED_DOCUMENT_TYPES.join('\n- ');

    let contextNote = '';
    if (chunkContext && chunkContext.totalChunks && chunkContext.totalChunks > 1) {
      contextNote = `\n\n**IMPORTANT: This is chunk ${chunkContext.chunkIndex || 1} of ${chunkContext.totalChunks}.** `;
      if (chunkContext.previousFindings) {
        const prev = chunkContext.previousFindings;
        contextNote += `Previous chunks found: ${prev.title ? `title="${prev.title}"` : ''} ${prev.documentType ? `documentType="${prev.documentType}"` : ''} ${prev.bu ? `bu="${prev.bu}"` : ''} ${prev.department ? `department="${prev.department}"` : ''}. `;
      }
      contextNote += `Extract information from THIS chunk. If mandatory fields are missing from previous chunks, extract them from this chunk.`;
    }

    return `You are an expert document analyzer. Analyze the following document text and extract structured information. You MUST be thorough, accurate, and NEVER leave mandatory fields empty.

**CRITICAL RULES - READ CAREFULLY:**

1. **NEVER HALLUCINATE**: Only extract information that is ACTUALLY PRESENT in the document text below. Do NOT make up, infer, or guess information that is not explicitly or clearly implied in the document. If information is not found, use empty string "" for optional fields, but ALWAYS fill mandatory fields.

2. **MANDATORY FIELDS ARE ABSOLUTELY REQUIRED**: The following fields MUST ALWAYS have a value - they can NEVER be empty strings:
   - title: MUST extract a title from the document. If no explicit title exists, use the first heading, first line, document name, or create a descriptive title based on the main topic visible in the text.
   - documentType: MUST identify the document type from content structure or explicitly stated type.
   - bu (Business Unit): MUST match to one of the allowed values below, even if you need to infer from context.
   - department: MUST match to one of the allowed values below, even if you need to infer from context.
   - abstract: MUST create a brief summary (1-2 sentences) describing what the document is about.

3. **SCAN EVERY CHARACTER**: Read the ENTIRE document text carefully. Do not skip any part. Look in headers, footers, titles, body text, signatures, and all sections.

${contextNote}

**MANDATORY FIELDS (MUST ALWAYS BE FILLED - NEVER LEAVE BLANK):**
- title: MUST extract a title. If no explicit title exists, use the first heading, document name, or create a descriptive title based on the main topic
- documentType: MUST identify the document type. Look at file format, content structure, or explicitly stated type. Common types: "PPTX", "PDF", "Word Document", "Report", "Proposal", "Presentation", "White Paper", "Case Study", "Training Material", etc.
- bu (Business Unit): MUST find and match to one of the allowed values below. If not explicitly mentioned, infer from context (department names, project descriptions, team mentions, etc.)
- department: MUST find and match to one of the allowed values below. If not explicitly mentioned, infer from context (team names, functional areas, work descriptions, etc.)
- abstract: MUST create a brief summary (1-2 sentences) describing what the document is about, its purpose, or main content

**CONDITIONAL FIELDS (ONLY FILL IF FOUND IN DOCUMENT - DO NOT HALLUCINATE):**
- region: ONLY if a geographic region is explicitly mentioned (e.g., "North America", "Europe", "Asia", "APAC", "EMEA", etc.). If not found, use "".
- client: ONLY if a COMPANY NAME or ORGANIZATION NAME is mentioned. This should be a business entity, not a person's name, department, or internal team. Look for company names, client organizations, customer names, partner companies. If you find a person's name but not a company, leave this empty.

**COLLECTION FIELDS (EXTRACT ALL INSTANCES FROM DOCUMENT):**
- emails: Extract EVERY email address found (even if 100+). Look carefully throughout the entire document.
- phones: Extract EVERY phone number found (even if 100+). Include all formats.
- ids: Extract all ID numbers, reference numbers, document IDs, case numbers, etc.
- pricing: Extract all pricing, cost, financial, or monetary information

Fields to extract:

1. title - **MANDATORY - NEVER EMPTY**: The document title, main heading, or document name. Read the document carefully from the beginning. Look for:
   - Explicit title lines
   - First major heading
   - Document name or filename references
   - First line of significant text
   If no explicit title exists, create a descriptive title based on the main topic visible in the text. NEVER return empty string for this field.

2. documentType - **MANDATORY - NEVER EMPTY**: Document Type. MUST be one of these exact values (match the closest one based on the document's content, structure, and context):
- ${documentTypeList}
Carefully read and understand the entire document. Analyze the content structure, format, purpose, and context. Look for explicit document type mentions, or infer from the document's structure (e.g., slides = "Deck", training content = "Training", FAQ format = "Frequently Asked Questions (FAQs)", etc.). Match to the closest value from the list above. This field MUST always be filled - if no exact match can be found, choose the most appropriate category from the list. NEVER return empty string.

3. bu - **MANDATORY - NEVER EMPTY**: Business Unit. MUST be one of these exact values (match the closest one, or infer from context):
- ${buList}
Read the entire document carefully. Look for department names, project descriptions, team mentions, company divisions, or organizational references. If not explicitly mentioned, analyze the document content to infer the most likely Business Unit. NEVER leave empty - always match to the closest value from the list above.

4. department - **MANDATORY - NEVER EMPTY**: Department. MUST be one of these exact values (match the closest one, or infer from context):
- ${deptList}
Read the entire document carefully. Look for team names, functional areas, work descriptions, project context, or department references. If not explicitly mentioned, analyze the document content to infer the most likely Department. NEVER leave empty - always match to the closest value from the list above.

5. region - Geographic region. ONLY fill if a geographic region is explicitly mentioned in the document. MUST be one of these exact values (match the closest one):
- ${regionList}
Look for mentions of regions, countries, or geographic areas. Match to the closest value from the list above. If no region is mentioned or cannot be inferred, use empty string "".

6. client - **COMPANY NAME ONLY - DO NOT HALLUCINATE**: Client name or organization. This field should ONLY contain company names, business entities, or organization names that are ACTUALLY MENTIONED in the document. Do NOT include:
- Person names (unless it's clearly a company name like "John's Consulting LLC")
- Internal departments or teams
- Generic terms like "the client" or "our customer"
- Project names that aren't company names
Look for: company names, client organizations, customer companies, partner organizations, vendor names. If you find a person's name but no associated company, leave this empty. If you find "the client" or similar without a specific company name, leave empty. If no company name is found, use "".

7. abstract - **MANDATORY - NEVER EMPTY**: A brief summary (1-2 sentences) describing what the document is about, its main purpose, key topics, or primary content. Read through the document and summarize its main content. MUST provide a summary even if brief. NEVER leave empty.

8. diseaseArea - Disease Area. MUST be one of these exact values (match the closest one based on the document content):
- ${diseaseAreaList}
Carefully read and understand the entire document. Look for mentions of diseases, medical conditions, health conditions, or therapeutic areas. Match to the closest value from the list above. If no disease area is mentioned or cannot be inferred, use empty string "".

9. therapyArea - Therapy Area. MUST be one of these exact values (match the closest one based on the document content):
- ${therapyAreaList}
Carefully read and understand the entire document. Look for mentions of medical specialties, therapeutic approaches, treatment areas, or clinical domains. Match to the closest value from the list above. If no therapy area is mentioned or cannot be inferred, use empty string "".

10. emails - **CRITICAL: Extract ALL email addresses found in the document.** Look for patterns like "text@domain.com" or "name@company.org". Extract EVERY single email address you can find, even if there are 20, 50, or 100+. Do NOT skip any emails. Scan the ENTIRE document carefully, including headers, footers, signatures, and body text. Separate multiple emails with commas. Format: "email1@example.com, email2@example.com, email3@example.com, ..." If you find even one email, include it. If you find none, use empty string "".

11. phones - **CRITICAL: Extract ALL phone numbers found in the document.** Look for patterns like "+1-555-123-4567", "(555) 123-4567", "555-123-4567", "555.123.4567", "+44 20 1234 5678", etc. Extract EVERY single phone number you can find, even if there are many. Include all formats (with/without country codes, with/without dashes, with/without parentheses, international formats). Separate multiple phones with commas. Format: "+1-555-123-4567, 555-987-6543, ..." If you find even one phone, include it. If you find none, use empty string "".

12. ids - Any ID numbers, reference numbers, document IDs, case numbers, ticket numbers, or identifiers found (comma-separated if multiple). If none found, use "".

13. pricing - Any pricing information, costs, financial terms, monetary values, budgets, or financial data mentioned. If none found, use "".

**Document text to analyze:**
${documentText}

**IMPORTANT REMINDERS:**
- Read EVERY character of the document text above
- For MANDATORY fields (title, documentType, bu, department, abstract): NEVER return empty string ""
- For OPTIONAL fields: Only fill if information is actually present in the document
- DO NOT make up or invent information that is not in the document
- Extract ALL instances of emails, phones, IDs, and pricing

Return only valid JSON in this format:
{
  "title": "...",
  "documentType": "...",
  "bu": "...",
  "department": "...",
  "region": "...",
  "client": "...",
  "abstract": "...",
  "diseaseArea": "...",
  "therapyArea": "...",
  "emails": "...",
  "phones": "...",
  "ids": "...",
  "pricing": "..."
}`;
  }

  /**
   * Sanitize and validate extracted metadata
   */
  private sanitizeMetadata(metadata: MetadataExtraction): MetadataExtraction {
    const sanitized: MetadataExtraction = {};
    
    // Ensure all fields are strings and trim whitespace
    const fields: (keyof MetadataExtraction)[] = [
      'title', 'documentType', 'bu', 'department', 'region', 'client',
      'abstract', 'diseaseArea', 'therapyArea', 'emails', 'phones',
      'ids', 'pricing'
    ];

    for (const field of fields) {
      const value = metadata[field];
      sanitized[field] = typeof value === 'string' ? value.trim() : '';
    }

    // MANDATORY FIELDS - Ensure they are never empty
    // Title: If empty, use a default or file name
    if (!sanitized.title || sanitized.title === '') {
      sanitized.title = 'Untitled Document';
      console.warn('⚠️ Title was empty, using default');
    }

    // DocumentType: Must always have a value and match allowed list
    if (!sanitized.documentType || sanitized.documentType === '') {
      // Use "Others" as fallback since it's in the allowed list
      sanitized.documentType = 'Others';
      console.warn('⚠️ DocumentType was empty, using fallback: Others');
    } else {
      // Validate and match to allowed values
      const matchedDocType = findBestMatch(sanitized.documentType, ALLOWED_DOCUMENT_TYPES);
      if (matchedDocType) {
        sanitized.documentType = matchedDocType;
      } else {
        // If no match found, use "Others" as fallback
        sanitized.documentType = 'Others';
        console.warn('⚠️ DocumentType did not match any allowed value:', sanitized.documentType, '- using fallback: Others');
      }
    }

    // Business Unit: Must always have a value - try to match or use first allowed value as fallback
    if (!sanitized.bu || sanitized.bu === '') {
      // Try to infer from other fields or use a default
      sanitized.bu = ALLOWED_BUSINESS_UNITS[0]; // Use first as fallback
      console.warn('⚠️ Business Unit was empty, using fallback:', sanitized.bu);
    } else {
      const matchedBU = findBestMatch(sanitized.bu, ALLOWED_BUSINESS_UNITS);
      if (matchedBU) {
        sanitized.bu = matchedBU;
      } else {
        // If no match found, use first allowed value
        sanitized.bu = ALLOWED_BUSINESS_UNITS[0];
        console.warn('⚠️ Business Unit did not match any allowed value, using fallback');
      }
    }

    // Department: Must always have a value - try to match or use first allowed value as fallback
    if (!sanitized.department || sanitized.department === '') {
      sanitized.department = ALLOWED_DEPARTMENTS[0]; // Use first as fallback
      console.warn('⚠️ Department was empty, using fallback:', sanitized.department);
    } else {
      const matchedDept = findBestMatch(sanitized.department, ALLOWED_DEPARTMENTS);
      if (matchedDept) {
        sanitized.department = matchedDept;
      } else {
        // If no match found, use first allowed value
        sanitized.department = ALLOWED_DEPARTMENTS[0];
        console.warn('⚠️ Department did not match any allowed value, using fallback');
      }
    }

    // Abstract: Must always have a value
    if (!sanitized.abstract || sanitized.abstract === '') {
      sanitized.abstract = 'Document content summary not available.';
      console.warn('⚠️ Abstract was empty, using default');
    }

    // Ensure region is empty if not found (not just whitespace)
    if (sanitized.region && (sanitized.region.toLowerCase() === 'not found' || 
        sanitized.region.toLowerCase() === 'n/a' ||
        sanitized.region.toLowerCase() === 'none' ||
        sanitized.region.toLowerCase() === 'unknown')) {
      sanitized.region = '';
    }

    // Disease Area: Validate and match to allowed values
    if (sanitized.diseaseArea) {
      const matchedDiseaseArea = findBestMatch(sanitized.diseaseArea, ALLOWED_DISEASE_AREAS);
      sanitized.diseaseArea = matchedDiseaseArea;
      if (!matchedDiseaseArea) {
        console.warn('⚠️ Disease Area did not match any allowed value:', sanitized.diseaseArea);
      }
    }

    // Therapy Area: Validate and match to allowed values
    if (sanitized.therapyArea) {
      const matchedTherapyArea = findBestMatch(sanitized.therapyArea, ALLOWED_THERAPY_AREAS);
      sanitized.therapyArea = matchedTherapyArea;
      if (!matchedTherapyArea) {
        console.warn('⚠️ Therapy Area did not match any allowed value:', sanitized.therapyArea);
      }
    }

    // Region: Validate and match to allowed values (only if region exists)
    if (sanitized.region) {
      const matchedRegion = findBestMatch(sanitized.region, ALLOWED_REGIONS);
      sanitized.region = matchedRegion;
      if (!matchedRegion) {
        console.warn('⚠️ Region did not match any allowed value:', sanitized.region);
        sanitized.region = ''; // Clear if no match found
      }
    }

    // Client field validation - should only contain company names
    // Remove if it contains person names, generic terms, or invalid content
    if (sanitized.client) {
      const clientLower = sanitized.client.toLowerCase();
      
      // Remove invalid values
      if (clientLower === 'not found' ||
          clientLower === 'n/a' ||
          clientLower === 'none' ||
          clientLower === 'unknown' ||
          clientLower === 'the client' ||
          clientLower === 'our client' ||
          clientLower === 'client' ||
          clientLower.indexOf('internal') !== -1 ||
          clientLower.indexOf('team') !== -1) {
        sanitized.client = '';
        console.log('⚠️ Client field contained invalid value, cleared');
      } else {
        // Check if it looks like a person's name (first name + last name pattern without company indicators)
        // Company indicators: Inc, LLC, Corp, Ltd, Company, Co, etc.
        const companyIndicators = ['inc', 'llc', 'corp', 'ltd', 'company', 'co', 'group', 'enterprises', 'solutions', 'systems', 'technologies', 'consulting', 'services'];
        const hasCompanyIndicator = companyIndicators.some(indicator => clientLower.indexOf(indicator) !== -1);
        
        // If it's just a name without company indicators and doesn't look like a company, clear it
        if (!hasCompanyIndicator && sanitized.client.split(' ').length <= 3) {
          // Might be a person's name - check if it's clearly a company by other means
          // If it's just 1-2 words without company indicators, it's likely a person's name
          const words = sanitized.client.trim().split(/\s+/);
          if (words.length <= 2 && !hasCompanyIndicator) {
            sanitized.client = '';
            console.log('⚠️ Client field appears to be a person name, not a company, cleared');
          }
        }
      }
    }

    // Mask emails and phones
    console.log('=== BEFORE MASKING ===');
    console.log('Raw emails:', sanitized.emails);
    console.log('Raw phones:', sanitized.phones);
    
    if (sanitized.emails) {
      sanitized.emails = maskAllEmails(sanitized.emails);
    } else {
      console.log('⚠️ No emails field in extracted metadata!');
    }

    if (sanitized.phones) {
      sanitized.phones = maskAllPhones(sanitized.phones);
    } else {
      console.log('⚠️ No phones field in extracted metadata!');
    }

    return sanitized;
  }

  /**
   * Split document text into chunks of specified size
   */
  private splitIntoChunks(text: string, chunkSize: number): string[] {
    const chunks: string[] = [];
    let start = 0;

    while (start < text.length) {
      let end = start + chunkSize;
      
      // If not the last chunk, try to break at a word boundary
      if (end < text.length) {
        // Look for a good break point (newline, period, space)
        const breakPoint = Math.max(
          text.lastIndexOf('\n\n', end),
          text.lastIndexOf('\n', end),
          text.lastIndexOf('. ', end),
          text.lastIndexOf(' ', end)
        );
        
        if (breakPoint > start + chunkSize * 0.8) {
          // Only use break point if it's not too early (at least 80% of chunk size)
          end = breakPoint + 1;
        }
      }
      
      chunks.push(text.substring(start, end));
      start = end;
    }

    return chunks;
  }

  /**
   * Process a single chunk of text
   */
  private async processSingleChunk(chunkText: string, chunkContext?: { chunkIndex?: number; totalChunks?: number; previousFindings?: Partial<MetadataExtraction> }): Promise<MetadataExtraction> {
    console.log('=== PROCESSING SINGLE CHUNK ===');
    console.log('Chunk length:', chunkText.length, 'characters');
    if (chunkContext) {
      console.log(`Chunk ${chunkContext.chunkIndex || 1} of ${chunkContext.totalChunks || 1}`);
    }

    const prompt = this.buildExtractionPrompt(chunkText, chunkContext);

    const response = await fetch(
      `${this.config.endpoint}/openai/deployments/${this.config.deploymentName}/chat/completions?api-version=${this.config.apiVersion}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.config.apiKey
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are an expert document analyzer. Extract structured information from documents and return it as valid JSON only, without any markdown formatting or code blocks. NEVER leave mandatory fields empty. Only extract information that is actually present in the document - do not make up or hallucinate information.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 2000
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Azure OpenAI API error: ${response.status}`;
      
      // Handle CORS errors
      if (response.status === 0 || response.statusText === '') {
        errorMessage = 'CORS error: Unable to connect to Azure OpenAI. The API may need CORS configuration or a backend proxy.';
      } else {
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error?.message || errorText || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content returned from Azure OpenAI');
    }

    console.log('=== AI RESPONSE (RAW) ===');
    console.log(content);

    // Parse JSON response (remove markdown code blocks if present)
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, content];
    const jsonText = jsonMatch[1] || content;
    
    console.log('=== PARSED JSON ===');
    console.log(jsonText);
    
    const extracted = JSON.parse(jsonText.trim()) as MetadataExtraction;
    
    console.log('=== EXTRACTED METADATA (BEFORE SANITIZATION) ===');
    console.log(JSON.stringify(extracted, null, 2));
    console.log('Emails extracted:', extracted.emails);
    console.log('Phones extracted:', extracted.phones);
    
    const sanitized = this.sanitizeMetadata(extracted);
    
    console.log('=== FINAL METADATA (AFTER SANITIZATION) ===');
    console.log(JSON.stringify(sanitized, null, 2));
    console.log('Emails (masked):', sanitized.emails);
    console.log('Phones (masked):', sanitized.phones);
    
    return sanitized;
  }

  /**
   * Process multiple chunks and merge results
   */
  private async processChunks(chunks: string[]): Promise<MetadataExtraction> {
    console.log('=== PROCESSING', chunks.length, 'CHUNKS ===');
    
    const chunkResults: MetadataExtraction[] = [];
    const previousFindings: Partial<MetadataExtraction> = {};
    
    // Process chunks sequentially to avoid rate limits
    for (let i = 0; i < chunks.length; i++) {
      console.log(`\n=== PROCESSING CHUNK ${i + 1}/${chunks.length} ===`);
      try {
        const chunkContext = {
          chunkIndex: i + 1,
          totalChunks: chunks.length,
          previousFindings: i > 0 ? previousFindings : undefined
        };
        const result = await this.processSingleChunk(chunks[i], chunkContext);
        chunkResults.push(result);
        
        // Update previous findings for next chunk
        if (result.title && !previousFindings.title) previousFindings.title = result.title;
        if (result.documentType && !previousFindings.documentType) previousFindings.documentType = result.documentType;
        if (result.bu && !previousFindings.bu) previousFindings.bu = result.bu;
        if (result.department && !previousFindings.department) previousFindings.department = result.department;
        
        console.log(`✓ Chunk ${i + 1} processed successfully`);
      } catch (error) {
        console.error(`✗ Error processing chunk ${i + 1}:`, error);
        // Continue with other chunks even if one fails
        chunkResults.push({} as MetadataExtraction);
      }
    }

    console.log('\n=== MERGING CHUNK RESULTS ===');
    const merged = this.mergeChunkResults(chunkResults);
    
    console.log('=== MERGED RESULT (BEFORE FINAL SANITIZATION) ===');
    console.log(JSON.stringify(merged, null, 2));
    
    // Final sanitization (validation, masking, etc.)
    const finalResult = this.sanitizeMetadata(merged);
    
    // Validate mandatory fields and retry if needed
    const validatedResult = await this.validateAndRetryIfNeeded(finalResult, chunks);
    
    console.log('=== FINAL MERGED RESULT ===');
    console.log(JSON.stringify(validatedResult, null, 2));
    
    return validatedResult;
  }

  /**
   * Merge results from multiple chunks intelligently
   * Searches ALL chunks for mandatory fields to ensure nothing is missed
   */
  private mergeChunkResults(results: MetadataExtraction[]): MetadataExtraction {
    const merged: MetadataExtraction = {
      title: '',
      documentType: '',
      bu: '',
      department: '',
      region: '',
      client: '',
      abstract: '',
      emails: '',
      phones: '',
      ids: '',
      pricing: ''
    };

    // Collect all emails and phones (combine from all chunks)
    const allEmails: string[] = [];
    const allPhones: string[] = [];
    const allIds: string[] = [];
    const allPricing: string[] = [];

    // For mandatory fields, search ALL chunks (not just first)
    // This ensures we don't miss title/documentType if they're in later chunks
    const allTitles: string[] = [];
    const allDocumentTypes: string[] = [];
    const allBUs: string[] = [];
    const allDepartments: string[] = [];
    const allAbstracts: string[] = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      
      // Title: Collect from ALL chunks, prioritize first chunk but check all
      if (result.title && result.title.trim()) {
        allTitles.push(result.title.trim());
      }

      // DocumentType: Collect from ALL chunks
      if (result.documentType && result.documentType.trim()) {
        allDocumentTypes.push(result.documentType.trim());
      }

      // BU: Collect from ALL chunks
      if (result.bu && result.bu.trim()) {
        allBUs.push(result.bu.trim());
      }

      // Department: Collect from ALL chunks
      if (result.department && result.department.trim()) {
        allDepartments.push(result.department.trim());
      }

      // Abstract: Collect from ALL chunks (will take longest)
      if (result.abstract && result.abstract.trim()) {
        allAbstracts.push(result.abstract.trim());
      }

      // Region: Take first non-empty match
      if (!merged.region && result.region && result.region.trim()) {
        merged.region = result.region.trim();
      }

      // Client: Take first non-empty match
      if (!merged.client && result.client && result.client.trim()) {
        merged.client = result.client.trim();
      }

      // Emails: Collect all unique emails
      if (result.emails) {
        const emails = result.emails.split(/[,;\n]/).map(e => e.trim()).filter(e => e.length > 0);
        for (let j = 0; j < emails.length; j++) {
          const email = emails[j];
          // Add if not already in the list (case-insensitive)
          if (email && allEmails.indexOf(email.toLowerCase()) === -1) {
            allEmails.push(email.toLowerCase());
            // Keep original case from first occurrence
            const originalEmail = emails[j];
            if (allEmails.indexOf(originalEmail.toLowerCase()) === -1) {
              allEmails[allEmails.length - 1] = originalEmail;
            }
          }
        }
      }

      // Phones: Collect all unique phones
      if (result.phones) {
        const phones = result.phones.split(/[,;\n]/).map(p => p.trim()).filter(p => p.length > 0);
        for (let j = 0; j < phones.length; j++) {
          const phone = phones[j];
          // Add if not already in the list
          if (phone && allPhones.indexOf(phone) === -1) {
            allPhones.push(phone);
          }
        }
      }

      // IDs: Collect all
      if (result.ids) {
        const ids = result.ids.split(/[,;\n]/).map(id => id.trim()).filter(id => id.length > 0);
        for (let j = 0; j < ids.length; j++) {
          const id = ids[j];
          if (id && allIds.indexOf(id) === -1) {
            allIds.push(id);
          }
        }
      }

      // Pricing: Collect all (combine with newlines)
      if (result.pricing) {
        allPricing.push(result.pricing);
      }
    }

    // Set mandatory fields - prioritize first chunk but use any valid value
    merged.title = allTitles.length > 0 ? allTitles[0] : '';
    merged.documentType = allDocumentTypes.length > 0 ? allDocumentTypes[0] : '';
    merged.bu = allBUs.length > 0 ? allBUs[0] : '';
    merged.department = allDepartments.length > 0 ? allDepartments[0] : '';
    
    // Abstract: Take the longest one (most comprehensive)
    if (allAbstracts.length > 0) {
      merged.abstract = allAbstracts.reduce((longest, current) => 
        current.length > longest.length ? current : longest
      );
    }

    // Join collected values
    merged.emails = allEmails.join(', ');
    merged.phones = allPhones.join(', ');
    merged.ids = allIds.join(', ');
    merged.pricing = allPricing.join('\n\n');

    console.log('Merged emails count:', allEmails.length);
    console.log('Merged phones count:', allPhones.length);
    console.log('Merged IDs count:', allIds.length);
    console.log('Title found in chunks:', allTitles.length > 0 ? 'YES' : 'NO');
    console.log('DocumentType found in chunks:', allDocumentTypes.length > 0 ? 'YES' : 'NO');
    console.log('BU found in chunks:', allBUs.length > 0 ? 'YES' : 'NO');
    console.log('Department found in chunks:', allDepartments.length > 0 ? 'YES' : 'NO');

    return merged;
  }

  /**
   * Validate mandatory fields and retry extraction if needed
   */
  private async validateAndRetryIfNeeded(result: MetadataExtraction, chunks: string[]): Promise<MetadataExtraction> {
    const mandatoryFields: (keyof MetadataExtraction)[] = ['title', 'documentType', 'bu', 'department', 'abstract'];
    const missingFields: (keyof MetadataExtraction)[] = [];

    // Check for missing mandatory fields
    for (const field of mandatoryFields) {
      if (!result[field] || (typeof result[field] === 'string' && result[field].trim() === '')) {
        missingFields.push(field);
      }
    }

    if (missingFields.length === 0) {
      console.log('✓ All mandatory fields are present');
      return result;
    }

    console.warn(`⚠️ Missing mandatory fields: ${missingFields.join(', ')}`);
    console.log('Attempting to extract missing fields from document...');

    // Try to extract missing fields by re-analyzing the first chunk or all chunks
    // Focus on the beginning of the document where title/documentType are most likely
    const firstChunk = chunks[0] || '';
    const firstChunkPreview = firstChunk.substring(0, Math.min(5000, firstChunk.length));
    
    if (firstChunkPreview.length > 0) {
      try {
        // Create a focused prompt for missing fields only
        const focusedPrompt = this.buildFocusedExtractionPrompt(firstChunkPreview, missingFields);
        
        const response = await fetch(
          `${this.config.endpoint}/openai/deployments/${this.config.deploymentName}/chat/completions?api-version=${this.config.apiVersion}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': this.config.apiKey
            },
            body: JSON.stringify({
              messages: [
                {
                  role: 'system',
                  content: 'You are an expert document analyzer. Extract ONLY the requested fields from the document. Return valid JSON only, without any markdown formatting or code blocks. NEVER leave requested fields empty.'
                },
                {
                  role: 'user',
                  content: focusedPrompt
                }
              ],
              temperature: 0.2,
              max_tokens: 1000
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          
          if (content) {
            const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, content];
            const jsonText = jsonMatch[1] || content;
            
            try {
              const retryResult = JSON.parse(jsonText.trim()) as Partial<MetadataExtraction>;
              
              // Fill in missing fields
              for (const field of missingFields) {
                if (retryResult[field] && typeof retryResult[field] === 'string' && retryResult[field].trim() !== '') {
                  result[field] = retryResult[field];
                  console.log(`✓ Retry extracted ${field}: ${retryResult[field]}`);
                }
              }
            } catch (parseError) {
              console.warn('Failed to parse retry result:', parseError);
            }
          }
        }
      } catch (error) {
        console.warn('Retry extraction failed:', error);
      }
    }

    // Final check - if still missing, use fallback values (already handled in sanitizeMetadata)
    return result;
  }

  /**
   * Build a focused prompt for extracting specific missing fields
   */
  private buildFocusedExtractionPrompt(documentText: string, missingFields: (keyof MetadataExtraction)[]): string {
    const buList = ALLOWED_BUSINESS_UNITS.join('\n- ');
    const deptList = ALLOWED_DEPARTMENTS.join('\n- ');
    const documentTypeList = ALLOWED_DOCUMENT_TYPES.join('\n- ');

    let fieldInstructions = '';

    if (missingFields.includes('title')) {
      fieldInstructions += `\n1. title - **CRITICAL**: Extract the document title. Look for:
   - Explicit title lines at the beginning
   - First major heading
   - Document name or filename references
   - First line of significant text
   If no explicit title exists, create a descriptive title based on the main topic. NEVER return empty string.`;
    }

    if (missingFields.includes('documentType')) {
      fieldInstructions += `\n2. documentType - **CRITICAL**: MUST be one of these exact values:
- ${documentTypeList}
Analyze the document structure and content. Match to the closest value. NEVER return empty string.`;
    }

    if (missingFields.includes('bu')) {
      fieldInstructions += `\n3. bu - **CRITICAL**: Business Unit. MUST be one of these exact values:
- ${buList}
Infer from document content if not explicitly mentioned. NEVER return empty string.`;
    }

    if (missingFields.includes('department')) {
      fieldInstructions += `\n4. department - **CRITICAL**: Department. MUST be one of these exact values:
- ${deptList}
Infer from document content if not explicitly mentioned. NEVER return empty string.`;
    }

    if (missingFields.includes('abstract')) {
      fieldInstructions += `\n5. abstract - **CRITICAL**: A brief summary (1-2 sentences) describing what the document is about. NEVER return empty string.`;
    }

    return `You are an expert document analyzer. The following fields are MISSING and MUST be extracted from the document text below. Read the document carefully and extract ONLY these fields.

**CRITICAL**: These fields are MANDATORY and CANNOT be empty. Extract them from the document text provided.${fieldInstructions}

**Document text (beginning of document):**
${documentText}

Return ONLY a JSON object with the requested fields. Example:
{
${missingFields.map(f => `  "${f}": "..."`).join(',\n')}
}`;
  }

  /**
   * Generate tags from document abstract using AI
   */
  async generateTags(abstract: string): Promise<string[]> {
    if (!abstract || abstract.trim().length === 0) {
      return [];
    }

    try {
      const prompt = `Analyze the following document abstract and generate exactly 3 relevant tags that categorize this document. Tags should be short (1-2 words), professional, and relevant to the content. Examples: HR, Policies, Security, IT, Guide, Compliance, Training, etc.

Abstract: ${abstract}

Return only a JSON array of exactly 3 tag strings, nothing else. Example: ["HR", "Policies", "Security"]`;

      const response = await fetch(
        `${this.config.endpoint}/openai/deployments/${this.config.deploymentName}/chat/completions?api-version=${this.config.apiVersion}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': this.config.apiKey
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: 'You are a document categorization expert. Return only valid JSON arrays, no markdown formatting.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 100
          })
        }
      );

      if (!response.ok) {
        console.error('Error generating tags:', response.status);
        return [];
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        return [];
      }

      // Parse JSON array from response
      const jsonMatch = content.match(/\[.*?\]/);
      if (jsonMatch) {
        const tags = JSON.parse(jsonMatch[0]);
        return Array.isArray(tags) ? tags.slice(0, 3) : [];
      }

      return [];
    } catch (error) {
      console.error('Error generating tags:', error);
      return [];
    }
  }
}


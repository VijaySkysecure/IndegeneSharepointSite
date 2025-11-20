/**
 * Service to interact with Azure OpenAI API
 */

import { ALLOWED_BUSINESS_UNITS, ALLOWED_DEPARTMENTS, findBestMatch } from './ValidationConstants';
import { maskAllEmails, maskAllPhones } from './DataMasking';

export interface MetadataExtraction {
  title?: string;
  documentType?: string;
  bu?: string;
  department?: string;
  region?: string;
  client?: string;
  abstract?: string;
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

      // Truncate text if too long (GPT-4o has token limits)
      // Increased to 15000 characters to capture more content
      const maxLength = 15000;
      const truncatedText = documentText.length > maxLength 
        ? documentText.substring(0, maxLength) + '\n\n[... document truncated ...]'
        : documentText;

      console.log('=== TEXT SENT TO AI ===');
      console.log('Length:', truncatedText.length, 'characters');
      if (documentText.length > maxLength) {
        console.warn('⚠️ WARNING: Document was truncated! Some content may be missing.');
      }

      const prompt = this.buildExtractionPrompt(truncatedText);

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
                content: 'You are an expert document analyzer. Extract structured information from documents and return it as valid JSON only, without any markdown formatting or code blocks.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.8,
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
    } catch (error) {
      console.error('Error extracting metadata:', error);
      throw error;
    }
  }

  /**
   * Build the prompt for metadata extraction
   */
  private buildExtractionPrompt(documentText: string): string {
    const buList = ALLOWED_BUSINESS_UNITS.join('\n- ');
    const deptList = ALLOWED_DEPARTMENTS.join('\n- ');

    return `Analyze the following document and extract the following information. Return the result as a JSON object with these exact field names.

CRITICAL RULES:
- If a field cannot be found in the document, use an empty string "" (do NOT make up values)
- For "region" and "client": ONLY fill if explicitly mentioned in the document, otherwise use ""
- Extract ALL email addresses and phone numbers found (even if there are 100+), separate them with commas
- Be thorough and extract every single email and phone number you can find

Fields to extract:
1. title - The document title or main heading (extract exactly as written)

2. documentType - Type of document (e.g., "PPTX", "Report", "Proposal", "Presentation", "PDF")

3. bu - Business Unit. MUST be one of these exact values (match the closest one):
- ${buList}
If no Business Unit is mentioned, use ""

4. department - Department. MUST be one of these exact values (match the closest one):
- ${deptList}
If no Department is mentioned, use ""

5. region - Geographic region mentioned (e.g., "North America", "Europe", "Asia"). ONLY fill if explicitly mentioned, otherwise ""

6. client - Client name or organization. ONLY fill if explicitly mentioned, otherwise ""

7. abstract - A brief summary (1-2 sentences) of the document content

10. emails - **CRITICAL: Extract ALL email addresses found in the document.** Look for patterns like "text@domain.com" or "name@company.org". Extract EVERY single email address you can find, even if there are 20, 50, or 100+. Do NOT skip any emails. Scan the ENTIRE document carefully. Separate multiple emails with commas. Format: "email1@example.com, email2@example.com, email3@example.com, ..." If you find even one email, include it. If you find none, use empty string "".

11. phones - **CRITICAL: Extract ALL phone numbers found in the document.** Look for patterns like "+1-555-123-4567", "(555) 123-4567", "555-123-4567", "555.123.4567", etc. Extract EVERY single phone number you can find, even if there are many. Include all formats (with/without country codes, with/without dashes, with/without parentheses). Separate multiple phones with commas. Format: "+1-555-123-4567, 555-987-6543, ..." If you find even one phone, include it. If you find none, use empty string "".

12. ids - Any ID numbers, reference numbers, or identifiers found (comma-separated if multiple)

13. pricing - Any pricing information, costs, or financial terms mentioned

Document text:
${documentText}

Return only valid JSON in this format (use empty string "" for fields not found):
{
  "title": "...",
  "documentType": "...",
  "bu": "...",
  "department": "...",
  "region": "...",
  "client": "...",
  "abstract": "...",
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
      'abstract', 'emails', 'phones',
      'ids', 'pricing'
    ];

    for (const field of fields) {
      const value = metadata[field];
      sanitized[field] = typeof value === 'string' ? value.trim() : '';
    }

    // Validate and match Business Unit to allowed values
    if (sanitized.bu) {
      const matchedBU = findBestMatch(sanitized.bu, ALLOWED_BUSINESS_UNITS);
      sanitized.bu = matchedBU;
    }

    // Validate and match Department to allowed values
    if (sanitized.department) {
      const matchedDept = findBestMatch(sanitized.department, ALLOWED_DEPARTMENTS);
      sanitized.department = matchedDept;
    }

    // Ensure region and client are empty if not found (not just whitespace)
    if (sanitized.region && sanitized.region.toLowerCase() === 'not found' || 
        sanitized.region && sanitized.region.toLowerCase() === 'n/a' ||
        sanitized.region && sanitized.region.toLowerCase() === 'none') {
      sanitized.region = '';
    }

    if (sanitized.client && sanitized.client.toLowerCase() === 'not found' ||
        sanitized.client && sanitized.client.toLowerCase() === 'n/a' ||
        sanitized.client && sanitized.client.toLowerCase() === 'none') {
      sanitized.client = '';
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
}


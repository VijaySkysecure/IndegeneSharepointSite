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
      // Truncate text if too long (GPT-4o has token limits)
      // For ~20 pages, we'll limit to approximately 8000 characters to stay within limits
      const maxLength = 8000;
      const truncatedText = documentText.length > maxLength 
        ? documentText.substring(0, maxLength) + '\n\n[... document truncated ...]'
        : documentText;

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

      // Parse JSON response (remove markdown code blocks if present)
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, content];
      const jsonText = jsonMatch[1] || content;
      
      const extracted = JSON.parse(jsonText.trim()) as MetadataExtraction;
      
      return this.sanitizeMetadata(extracted);
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

10. emails - ALL email addresses found in the document. Extract EVERY email address you can find, even if there are many. Separate with commas. Format: "email1@example.com, email2@example.com, ..."

11. phones - ALL phone numbers found in the document. Extract EVERY phone number you can find, even if there are many. Include all formats (with/without country codes, with/without dashes). Separate with commas. Format: "+1-555-123-4567, 555-987-6543, ..."

12. ids - Any ID numbers, reference numbers, or identifiers found (comma-separated if multiple)

13. pricing - Any pricing information, costs, or financial terms mentioned

Document text:
${documentText}

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
  "pricing": "...",
  "sensitive": "..."
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
    if (sanitized.emails) {
      sanitized.emails = maskAllEmails(sanitized.emails);
    }

    if (sanitized.phones) {
      sanitized.phones = maskAllPhones(sanitized.phones);
    }

    return sanitized;
  }
}


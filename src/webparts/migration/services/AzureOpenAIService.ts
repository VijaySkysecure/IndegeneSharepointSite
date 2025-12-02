/**
 * Service to interact with Azure OpenAI API
 */

import { ALLOWED_BUSINESS_UNITS, ALLOWED_DEPARTMENTS, ALLOWED_DISEASE_AREAS, ALLOWED_THERAPY_AREAS, ALLOWED_REGIONS, ALLOWED_DOCUMENT_TYPES, findBestMatch } from './ValidationConstants';
import { maskAllEmails, maskAllPhones } from './DataMasking';

// 🆕 Azure config imports
import {
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_API_KEY,
  AZURE_OPENAI_DEPLOYMENT,
  AZURE_OPENAI_API_VERSION,
  AZURE_OPENAI_EMBEDDING_MODEL,
  AZURE_SEARCH_ENDPOINT,
  AZURE_SEARCH_INDEX,
  AZURE_SEARCH_API_VERSION,
  AZURE_SEARCH_KEY,
  AZURE_SEARCH_SEMANTIC_CONFIG,
  AZURE_SEARCH_SUGGESTER_NAME
} from './SearchConfig';

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

/**
 * 🔍 NEW: Interfaces for semantic search + suggestions
 */
export interface IDocumentMetadata {
  id: string;
  title: string;
  url?: string;
  author?: string;
  publishedDate?: string;
  preview?: string;
  businessUnit?: string;
  documentType?: string;
  client?: string;
  region?: string;
  therapyArea?: string;
  diseaseArea?: string;
  fileFormat?: string;
}

export interface IFacetItem {
  value: string;
  count: number;
}

export interface IFacetResult {
  businessUnit?: IFacetItem[];
  documentType?: IFacetItem[];
  client?: IFacetItem[];
  region?: IFacetItem[];
}

export interface ISemanticSearchResult {
  query: string;
  summary: string;
  documents: IDocumentMetadata[];
  facets: IFacetResult;
}

export interface ISearchFilters {
  businessUnit?: string[];
  documentType?: string[];
  client?: string[];
  region?: string[];
}

export interface ISuggestion {
  text: string;
  docId?: string;
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

  // ========================================================================
  // 🔹 PART 1: SEMANTIC SEARCH + SUGGESTIONS
  // ========================================================================

  /**
   * Get search suggestions from Azure Cognitive Search
   * Used by the SearchBox while the user types.
   */
  async getSuggestionsFromSearch(query: string): Promise<ISuggestion[]> {
    if (!query.trim()) return [];

    try {
      const url =
        `${AZURE_SEARCH_ENDPOINT}` +
        `/indexes/${AZURE_SEARCH_INDEX}/docs/suggest` +
        `?api-version=${AZURE_SEARCH_API_VERSION}` +
        `&search=${encodeURIComponent(query)}` +
        `&suggesterName=${AZURE_SEARCH_SUGGESTER_NAME}` +
        `&top=5`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_SEARCH_KEY
        }
      });

      if (!res.ok) {
        console.error('Suggest API failed:', res.status, await res.text());
        return [];
      }

      const data = await res.json();
      const suggestions: ISuggestion[] = (data.value || []).map((item: any) => ({
        text: item['@search.text'] || item.title || '',
        docId: item.id
      }));

      return suggestions;
    } catch (error) {
      console.error('Error in getSuggestionsFromSearch:', error);
      return [];
    }
  }

  /**
   * Semantic search using Azure Cognitive Search + AI summary via GPT-4o
   * Triggered when user clicks a suggestion or submits a search.
   */
  async semanticSearch(query: string, filters: ISearchFilters): Promise<ISemanticSearchResult> {
    const filterQuery = this.buildFilterQuery(filters);

    const body: any = {
      search: query,
      queryType: 'semantic',
      semanticConfiguration: AZURE_SEARCH_SEMANTIC_CONFIG,
      top: 5,
      select:
        'id,title,author,content,url,publishedDate,businessUnit,documentType,client,region,therapyArea,diseaseArea,fileFormat',
      facets: [
        'businessUnit,count:10',
        'documentType,count:10',
        'client,count:10',
        'region,count:10'
      ]
    };

    if (filterQuery) {
      body.filter = filterQuery;
    }

    try {
      const url = `${AZURE_SEARCH_ENDPOINT}/indexes/${AZURE_SEARCH_INDEX}/docs/search?api-version=${AZURE_SEARCH_API_VERSION}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_SEARCH_KEY
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Search API failed:', res.status, errorText);
        return {
          query,
          summary: 'Search failed.',
          documents: [],
          facets: {}
        };
      }

      const json = await res.json();

      const documents: IDocumentMetadata[] = (json.value || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        author: item.author,
        publishedDate: item.publishedDate,
        preview: item.content ? String(item.content).slice(0, 500) : '',
        businessUnit: item.businessUnit,
        documentType: item.documentType,
        client: item.client,
        region: item.region,
        therapyArea: item.therapyArea,
        diseaseArea: item.diseaseArea,
        fileFormat: item.fileFormat
      }));

      const facets = this.mapFacets(json['@search.facets']);
      const topPreview = documents[0]?.preview || '';

      const summary = await this.generateAISummary(query, topPreview);

      return {
        query,
        summary,
        documents,
        facets
      };
    } catch (error) {
      console.error('Error in semanticSearch:', error);
      return {
        query,
        summary: 'Semantic search failed.',
        documents: [],
        facets: {}
      };
    }
  }

  /**
   * Build OData `$filter` expression from chosen filters
   * Make sure the field names (businessUnit, documentType, client, region)
   * match your Azure Search index schema.
   */
  private buildFilterQuery(filters: ISearchFilters): string | undefined {
    const clauses: string[] = [];

    if (filters.businessUnit?.length) {
      const buClause = filters.businessUnit
        .map((bu) => `businessUnit eq '${bu.replace(/'/g, "''")}'`)
        .join(' or ');
      clauses.push(`(${buClause})`);
    }

    if (filters.documentType?.length) {
      const dtClause = filters.documentType
        .map((dt) => `documentType eq '${dt.replace(/'/g, "''")}'`)
        .join(' or ');
      clauses.push(`(${dtClause})`);
    }

    if (filters.client?.length) {
      const clClause = filters.client
        .map((cl) => `client eq '${cl.replace(/'/g, "''")}'`)
        .join(' or ');
      clauses.push(`(${clClause})`);
    }

    if (filters.region?.length) {
      const regClause = filters.region
        .map((r) => `region eq '${r.replace(/'/g, "''")}'`)
        .join(' or ');
      clauses.push(`(${regClause})`);
    }

    if (!clauses.length) return undefined;
    return clauses.join(' and ');
  }

  /**
   * Map Azure Search facets JSON into typed structure
   */
  private mapFacets(facetJson: any): IFacetResult {
    if (!facetJson) return {};

    const mapFacetArray = (arr: any[]): IFacetItem[] =>
      (arr || []).map((f: any) => ({
        value: f.value,
        count: f.count
      }));

    return {
      businessUnit: facetJson.businessUnit ? mapFacetArray(facetJson.businessUnit) : undefined,
      documentType: facetJson.documentType ? mapFacetArray(facetJson.documentType) : undefined,
      client: facetJson.client ? mapFacetArray(facetJson.client) : undefined,
      region: facetJson.region ? mapFacetArray(facetJson.region) : undefined
    };
  }

  /**
   * Generate embedding vector for text using Azure OpenAI
   */
  async generateEmbedding(text: string): Promise<number[]> {
    if (!text || !text.trim()) {
      throw new Error('Text cannot be empty for embedding generation');
    }

    try {
      // Ensure endpoint doesn't have trailing slash, then add path
      const baseEndpoint = AZURE_OPENAI_ENDPOINT.endsWith('/') 
        ? AZURE_OPENAI_ENDPOINT.slice(0, -1) 
        : AZURE_OPENAI_ENDPOINT;
      
      const url = `${baseEndpoint}/openai/deployments/${AZURE_OPENAI_EMBEDDING_MODEL}/embeddings?api-version=${AZURE_OPENAI_API_VERSION}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_OPENAI_API_KEY
        },
        body: JSON.stringify({
          input: text.trim()
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Embedding API failed:', res.status, errorText);
        throw new Error(`Embedding generation failed: ${res.status}`);
      }

      const json = await res.json();
      return json.data?.[0]?.embedding || [];
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) {
      return 0;
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB);
    return denominator === 0 ? 0 : dotProduct / denominator;
  }

  /**
   * Perform semantic search on local documents using embeddings
   * Searches through title, filename, abstract, author, AND document content
   * Also includes exact keyword matching for documents that contain the search term
   */
  async semanticSearchLocalDocuments(
    query: string,
    documents: Array<{
      id: number;
      title: string;
      fileName: string;
      description: string; // abstract
      contributor: string; // author
      documentContent?: string; // actual document content (extracted from file)
      [key: string]: any;
    }>,
    topK: number = 10
  ): Promise<Array<{ document: any; similarity: number }>> {
    if (!query || !query.trim() || documents.length === 0) {
      return [];
    }

    try {
      const queryLower = query.toLowerCase().trim();
      
      // First, do exact keyword matching to find ALL documents containing the word
      // This ensures we don't miss documents with exact matches
      const exactMatches: Array<{ document: any; similarity: number }> = [];
      const nonExactMatches: any[] = [];
      
      documents.forEach((doc) => {
        // Check each field separately to ensure we catch matches in documentContent even if other fields don't match
        const titleLower = (doc.title || '').toLowerCase();
        const fileNameLower = (doc.fileName || '').toLowerCase();
        const descriptionLower = (doc.description || '').toLowerCase();
        const contributorLower = (doc.contributor || '').toLowerCase();
        const documentContentLower = (doc.documentContent || '').toLowerCase();
        
        // Check if word appears in ANY field (especially documentContent)
        const inTitle = titleLower.includes(queryLower);
        const inFileName = fileNameLower.includes(queryLower);
        const inDescription = descriptionLower.includes(queryLower);
        const inContributor = contributorLower.includes(queryLower);
        const inDocumentContent = documentContentLower.includes(queryLower);
        
        // Document matches if word appears in ANY field, especially documentContent
        if (inTitle || inFileName || inDescription || inContributor || inDocumentContent) {
          // Combine all fields for counting total occurrences
          const searchableText = [
            doc.title || '',
            doc.fileName || '',
            doc.description || '',
            doc.contributor || '',
            doc.documentContent || ''
          ].filter(Boolean).join(' ').toLowerCase();
          
          // Count total occurrences
          const matches = (searchableText.match(new RegExp(queryLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
          
          // Calculate relevance score
          let score = matches;
          
          // Boost scores based on where word appears
          if (inTitle) score += 10;
          if (inFileName) score += 5;
          if (inDescription) score += 3;
          if (inContributor) score += 2;
          if (inDocumentContent) score += 4; // Important: boost for document content matches
          
          // Additional boost if found as whole word
          const wordBoundaryRegex = new RegExp(`\\b${queryLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
          if (wordBoundaryRegex.test(searchableText)) score += 2;
          
          // Ensure documents with matches ONLY in documentContent still get a minimum score
          if (inDocumentContent && !inTitle && !inFileName && !inDescription && !inContributor) {
            score = Math.max(score, 5); // Minimum score for content-only matches
          }
          
          exactMatches.push({ document: doc, similarity: score });
        } else {
          nonExactMatches.push(doc);
        }
      });
      
      // Sort exact matches by relevance (higher score = more relevant)
      exactMatches.sort((a, b) => b.similarity - a.similarity);
      
      // IMPORTANT: Return ALL exact matches, not just topK
      // This ensures documents with matches only in content are included
      // We'll limit later if needed, but prioritize getting all exact matches first
      if (exactMatches.length > 0) {
        // Return all exact matches (they're already sorted by relevance)
        // If we have more than topK, we'll still return all, but user will see most relevant first
        return exactMatches;
      }
      
      // Otherwise, supplement with semantic search on non-matching documents
      // Generate embedding for the search query
      const queryEmbedding = await this.generateEmbedding(query);

      // Generate embeddings for documents that didn't have exact matches
      const documentEmbeddings = await Promise.all(
        nonExactMatches.map(async (doc) => {
          // Combine all searchable fields including document content
          const searchableText = [
            doc.title || '',
            doc.fileName || '',
            doc.description || '', // abstract
            doc.contributor || '', // author
            doc.documentContent || '' // actual document content (first 5000 chars)
          ].filter(Boolean).join(' ');

          // Limit total text to ~8000 chars to keep embedding API calls reasonable
          const truncatedText = searchableText.length > 8000 
            ? searchableText.substring(0, 8000) 
            : searchableText;

          try {
            const embedding = await this.generateEmbedding(truncatedText);
            return { doc, embedding };
          } catch (error) {
            console.error(`Error generating embedding for doc ${doc.id}:`, error);
            return { doc, embedding: null };
          }
        })
      );

      // Calculate similarities for semantic matches
      const semanticResults = documentEmbeddings
        .filter((item) => item.embedding !== null)
        .map((item) => ({
          document: item.doc,
          similarity: this.cosineSimilarity(queryEmbedding, item.embedding!)
        }))
        .filter((item) => item.similarity > 0.3) // Only include reasonably similar results
        .sort((a, b) => b.similarity - a.similarity);

      // Combine exact matches (first) with semantic matches (second)
      // Exact matches are prioritized and ALL are included
      const allResults = [
        ...exactMatches, // ALL exact matches included (already sorted by relevance)
        ...semanticResults.map((item) => ({
          document: item.document,
          similarity: item.similarity * 0.5 // Reduce semantic match scores so exact matches rank higher
        }))
      ];
      
      // Sort all results by similarity (exact matches will be first due to higher scores)
      allResults.sort((a, b) => b.similarity - a.similarity);
      
      // Return top results, but ensure ALL exact matches are included
      // If we have many exact matches, return them all (up to reasonable limit)
      const exactMatchCount = exactMatches.length;
      const maxResults = Math.max(topK, exactMatchCount); // Return at least all exact matches
      
      return allResults.slice(0, Math.min(maxResults, 200)); // Cap at 200 to avoid performance issues
    } catch (error) {
      console.error('Error in semanticSearchLocalDocuments:', error);
      return [];
    }
  }

  /**
   * Use GPT-4o to generate an AI summary of the top document preview
   */
  private async generateAISummary(query: string, content: string): Promise<string> {
    if (!content) {
      return 'No preview available for summary.';
    }

    try {
      const url = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_OPENAI_API_KEY
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content:
                'You summarize documents for business users. Respond in 3-4 concise bullet points, easy to skim.'
            },
            {
              role: 'user',
              content: `User query: ${query}\n\nHere is a document snippet. Summarize the key points for a business stakeholder:\n\n${content}`
            }
          ],
          temperature: 0.2,
          max_tokens: 400
        })
      });

      if (!res.ok) {
        console.error('OpenAI summary API failed:', res.status, await res.text());
        return 'AI summary is not available.';
      }

      const json = await res.json();
      return json.choices?.[0]?.message?.content || 'AI summary is not available.';
    } catch (error) {
      console.error('Error generating AI summary:', error);
      return 'AI summary failed.';
    }
  }

  // ========================================================================
  // 🔹 PART 2: YOUR EXISTING METADATA EXTRACTION LOGIC (CORRECTED/COMPLETED)
  // ========================================================================

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
        return await this.processSingleChunk(documentText);
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
  private buildExtractionPrompt(documentText: string): string {
    const buList = ALLOWED_BUSINESS_UNITS.join('\n- ');
    const deptList = ALLOWED_DEPARTMENTS.join('\n- ');
    const diseaseAreaList = ALLOWED_DISEASE_AREAS.join('\n- ');
    const therapyAreaList = ALLOWED_THERAPY_AREAS.join('\n- ');
    const regionList = ALLOWED_REGIONS.join('\n- ');
    const documentTypeList = ALLOWED_DOCUMENT_TYPES.join('\n- ');

    return `You are an expert document analyzer. Analyze the following document and extract structured information. You MUST be thorough and accurate.

CRITICAL EXTRACTION RULES:

**MANDATORY FIELDS (MUST ALWAYS BE FILLED - NEVER LEAVE BLANK):**
- title: MUST extract a title. If no explicit title exists, use the first heading, document name, or create a descriptive title based on the main topic
- documentType: MUST identify the document type. Look at file format, content structure, or explicitly stated type. Common types: "PPTX", "PDF", "Word Document", "Report", "Proposal", "Presentation", "White Paper", "Case Study", "Training Material", etc.
- bu (Business Unit): MUST find and match to one of the allowed values below. If not explicitly mentioned, infer from context (department names, project descriptions, team mentions, etc.)
- department: MUST find and match to one of the allowed values below. If not explicitly mentioned, infer from context (team names, functional areas, work descriptions, etc.)
- abstract: MUST create a brief summary (1-2 sentences) describing what the document is about, its purpose, or main content

**CONDITIONAL FIELDS (ONLY FILL IF FOUND):**
- region: ONLY if a geographic region is explicitly mentioned (e.g., "North America", "Europe", "Asia", "APAC", "EMEA", etc.)
- client: ONLY if a COMPANY NAME or ORGANIZATION NAME is mentioned. This should be a business entity, not a person's name, department, or internal team. Look for company names, client organizations, customer names, partner companies. If you find a person's name but not a company, leave this empty.

**COLLECTION FIELDS (EXTRACT ALL INSTANCES):**
- emails: Extract EVERY email address found (even if 100+). Look carefully throughout the entire document.
- phones: Extract EVERY phone number found (even if 100+). Include all formats.
- ids: Extract all ID numbers, reference numbers, document IDs, case numbers, etc.
- pricing: Extract all pricing, cost, financial, or monetary information

Fields to extract:

1. title - **MANDATORY**: The document title, main heading, or document name. If no explicit title exists, create a descriptive title based on the main topic or first major heading. NEVER leave this empty.

2. documentType - **MANDATORY**: Document Type. MUST be one of these exact values (match the closest one based on the document's content, structure, and context):
- ${documentTypeList}
Carefully read and understand the entire document. Analyze the content structure, format, purpose, and context. Look for explicit document type mentions, or infer from the document's structure (e.g., slides = "Deck", training content = "Training", FAQ format = "Frequently Asked Questions (FAQs)", etc.). Match to the closest value from the list above. This field MUST always be filled - if no exact match can be found, choose the most appropriate category from the list.

3. bu - **MANDATORY**: Business Unit. MUST be one of these exact values (match the closest one, or infer from context):
- ${buList}
If not explicitly mentioned, analyze the document content, department references, project descriptions, or team mentions to infer the most likely Business Unit. NEVER leave empty - always match to the closest value.

4. department - **MANDATORY**: Department. MUST be one of these exact values (match the closest one, or infer from context):
- ${deptList}
If not explicitly mentioned, analyze the document content, team names, functional areas, work descriptions, or project context to infer the most likely Department. NEVER leave empty - always match to the closest value.

5. region - Geographic region. ONLY fill if a geographic region is explicitly mentioned in the document. MUST be one of these exact values (match the closest one):
- ${regionList}
Look for mentions of regions, countries, or geographic areas. Match to the closest value from the list above. If no region is mentioned or cannot be inferred, use empty string "".

6. client - **COMPANY NAME ONLY**: Client name or organization. This field should ONLY contain company names, business entities, or organization names. Do NOT include:
- Person names (unless it's clearly a company name like "John's Consulting LLC")
- Internal departments or teams
- Generic terms like "the client" or "our customer"
- Project names that aren't company names
Look for: company names, client organizations, customer companies, partner organizations, vendor names. If you find a person's name but not a company, leave this empty. If you find "the client" or similar without a specific company name, leave empty.

7. abstract - **MANDATORY**: A brief summary (1-2 sentences) describing what the document is about, its main purpose, key topics, or primary content. MUST provide a summary even if brief. NEVER leave empty.

8. diseaseArea - Disease Area. MUST be one of these exact values (match the closest one based on the document content):
- ${diseaseAreaList}
Carefully read and understand the entire document. Look for mentions of diseases, medical conditions, health conditions, or therapeutic areas. Match to the closest value from the list above. If no disease area is mentioned or cannot be inferred, use empty string "".

9. therapyArea - Therapy Area. MUST be one of these exact values (match the closest one based on the document content):
- ${therapyAreaList}
Carefully read and understand the entire document. Look for mentions of medical specialties, therapeutic approaches, treatment areas, or clinical domains. Match to the closest value from the list above. If no therapy area is mentioned or cannot be inferred, use empty string "".

10. emails - **CRITICAL: Extract ALL email addresses found in the document.** Look for patterns like "text@domain.com" or "name@company.org". Extract EVERY single email address you can find, even if there are 20, 50, or 100+. Do NOT skip any emails. Scan the ENTIRE document carefully, including headers, footers, signatures, and body text. Separate multiple emails with commas. Format: "email1@example.com, email2@example.com, email3@example.com, ..." If you find even one email, include it. If you find none, use empty string "".

11. phones - **CRITICAL: Extract ALL phone numbers found in the document.** Look for patterns like "+1-555-123-4567", "(555) 123-4567", "555-123-4567", "555.123.4567", "+44 20 1234 5678", etc. Extract EVERY single phone number you can find, even if there are many. Include all formats (with/without country codes, with/without dashes, with/without parentheses, international formats). Separate multiple phones with commas. Format: "+1-555-123-4567, 555-987-6543, ..." If you find even one phone, include it. If you find none, use empty string "".

12. ids - Any ID numbers, reference numbers, document IDs, case numbers, ticket numbers, or identifiers found (comma-separated if multiple)

13. pricing - Any pricing information, costs, financial terms, monetary values, budgets, or financial data mentioned

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
  private async processSingleChunk(chunkText: string): Promise<MetadataExtraction> {
    console.log('=== PROCESSING SINGLE CHUNK ===');
    console.log('Chunk length:', chunkText.length, 'characters');

    const prompt = this.buildExtractionPrompt(chunkText);

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
  }

  /**
   * Process multiple chunks and merge results
   */
  private async processChunks(chunks: string[]): Promise<MetadataExtraction> {
    console.log('=== PROCESSING', chunks.length, 'CHUNKS ===');

    const chunkResults: MetadataExtraction[] = [];

    // Process chunks sequentially to avoid rate limits
    for (let i = 0; i < chunks.length; i++) {
      console.log(`\n=== PROCESSING CHUNK ${i + 1}/${chunks.length} ===`);
      try {
        const result = await this.processSingleChunk(chunks[i]);
        chunkResults.push(result);
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

    console.log('=== FINAL MERGED RESULT ===');
    console.log(JSON.stringify(finalResult, null, 2));

    return finalResult;
  }

  /**
   * Merge results from multiple chunks into a single MetadataExtraction object.
   */
  private mergeChunkResults(chunkResults: MetadataExtraction[]): MetadataExtraction {
    if (chunkResults.length === 0) {
      return {} as MetadataExtraction;
    }

    const merged: MetadataExtraction = {};

    // 1. Helper to concatenate and get unique, non-empty, comma-separated values for Collection Fields
    const mergeCollectionField = (
      field: keyof MetadataExtraction,
      results: MetadataExtraction[]
    ): string => {
      // Collect all values, flatten, and ensure uniqueness
      const allValues = results
        .map((r) => (r[field] as string) || '')
        // Split by comma or semicolon, trim, and filter out empty strings
        .reduce((acc, s) => {
          // Check if the value is non-empty before attempting to split
          if (!s.trim()) return acc;
          const values = s.split(/[,;]/)
            .map((v) => v.trim())
            .filter(v => v !== '');
          return acc.concat(values);
        }, [] as string[])
        .filter((v, i, a) => a.indexOf(v) === i); // Get unique values

      // Join the unique values back into a comma-separated string
      return allValues.join(', ');
    };

    // 2. Helper to find the first non-empty value for Single Fields
    const findFirstNonEmpty = (
      field: keyof MetadataExtraction,
      results: MetadataExtraction[]
    ): string | undefined => {
      for (const result of results) {
        const value = result[field];
        if (typeof value === 'string' && value.trim() !== '') {
          return value.trim();
        }
      }
      return undefined; // Return undefined if no non-empty value is found
    };

    // --- Apply Merge Logic ---

    // 1. Collection Fields (Concatenate unique values)
    merged.emails = mergeCollectionField('emails', chunkResults);
    merged.phones = mergeCollectionField('phones', chunkResults);
    merged.ids = mergeCollectionField('ids', chunkResults);
    merged.pricing = mergeCollectionField('pricing', chunkResults);

    // 2. Single/Mandatory/Conditional Fields (Take the first non-empty result)
    // The first chunk is most likely to have the best Title, BU, Department, etc.
    merged.title = findFirstNonEmpty('title', chunkResults);
    merged.documentType = findFirstNonEmpty('documentType', chunkResults);
    merged.bu = findFirstNonEmpty('bu', chunkResults);
    merged.department = findFirstNonEmpty('department', chunkResults);
    merged.abstract = findFirstNonEmpty('abstract', chunkResults);
    merged.region = findFirstNonEmpty('region', chunkResults);
    merged.client = findFirstNonEmpty('client', chunkResults);
    merged.diseaseArea = findFirstNonEmpty('diseaseArea', chunkResults);
    merged.therapyArea = findFirstNonEmpty('therapyArea', chunkResults);

    // Filter out fields that remain undefined or empty string, just in case,
    // although sanitization handles final fallbacks.
    const finalMerged: MetadataExtraction = {};
    for (const key in merged) {
      const value = merged[key as keyof MetadataExtraction];
      if (value !== undefined && value !== null) {
        finalMerged[key as keyof MetadataExtraction] = value;
      }
    }

    return finalMerged;
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

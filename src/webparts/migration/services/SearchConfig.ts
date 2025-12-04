// src/webparts/migration/services/SearchConfig.ts

// ❗ Do NOT commit this file to public repos.
// If you keep the keys in .env just for reference, that's fine,
// but SPFx won't read them automatically without extra webpack setup.

export const AZURE_OPENAI_ENDPOINT = "https://engineeringteamopenai.openai.azure.com/";
export const AZURE_OPENAI_API_KEY = "2Hcf7EkLSg88ySVEjrapikrQjIFA4F4BGgshU8Gwci15RkklqgGDJQQJ99BIACYeBjFXJ3w3AAABACOGHLjU";
export const AZURE_OPENAI_DEPLOYMENT = "gpt-4o";
export const AZURE_OPENAI_API_VERSION = "2024-02-15-preview";

export const AZURE_OPENAI_EMBEDDING_MODEL = "text-embedding-3-large";

export const AZURE_SEARCH_ENDPOINT = "https://rca-capa.search.windows.net";
export const AZURE_SEARCH_INDEX = "migration123";
export const AZURE_SEARCH_API_VERSION = "2023-11-01";
export const AZURE_SEARCH_KEY = "pLhCvUdhxq7xPpu6LV6f1oq4JudU6MD7tozjSjxVgTAzSeDaLSy1";

// Change these two if you used different names in the Search index
export const AZURE_SEARCH_SEMANTIC_CONFIG = "semanticConfig1"; // semantic configuration name
export const AZURE_SEARCH_SUGGESTER_NAME = "sg-migration";     // suggester name

// ============================================================================
// DYNAMIC CONTENT FOR CHATBOT
// ============================================================================
// The chatbot uses Azure Cognitive Search (configured above) to dynamically
// fetch relevant content from your indexed knowledge base. This provides
// real-time, semantic search capabilities for accurate answers.
//
// Azure Search Configuration (already set above):
// - AZURE_SEARCH_ENDPOINT: Your Azure Search service endpoint
// - AZURE_SEARCH_INDEX: The index name containing your documents
// - AZURE_SEARCH_KEY: API key for authentication
// - AZURE_SEARCH_SEMANTIC_CONFIG: Semantic configuration for better results
//
// The chatbot will automatically search this index based on user queries
// and use the results to provide comprehensive, up-to-date answers.
//
// KNOWLEDGE_BASE_URL is kept for reference but Azure Search is now primary.
// ============================================================================
export const KNOWLEDGE_BASE_URL = "https://www.indegene.com/";
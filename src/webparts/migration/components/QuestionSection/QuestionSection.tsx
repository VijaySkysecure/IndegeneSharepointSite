<<<<<<< HEAD
import * as React from "react";
import { IQuestionSectionProps } from "./IQuestionSectionProps";
import styles from "./QuestionSection.module.scss";

const chatbotIcon: string = require("../../assets/chatbot-icon.png");

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

/* ============================================================
   CONTEXT KNOWLEDGE MAP
============================================================ */
/* ============================================================
   CONTEXT KNOWLEDGE MAP (CLEANED & COMPRESSED)
============================================================ */
const CONTEXT_MAP: Record<string, string[]> = {
  indegene: [
    "Indegene is a digital-first life sciences commercialization company helping pharma, biotech, and medical device organizations launch, market, and optimize therapies.",
    "Provides end-to-end solutions spanning medical affairs, regulatory compliance, omnichannel commercialization, data-driven insights, and technology platforms.",
    "Serves biopharmaceutical companies, emerging biotech firms, and medical device organizations globally.",
    "Strategic Focus: 'Future Ready Healthcare' platform for AI-powered engagement and market access.",
    "Key Differentiators: 25+ years domain expertise, proven ROI, operational resilience, and proprietary AI tools like NEXT Access Document Management."
  ],

  skysecure: [
    "Skysecure: 5+ years committed to enhancing digital security & resilience globally.",
    "Focuses on building a strong digital ecosystem and specialized security solutions.",
    "Founded by former Microsoft technologists and supported by certified professionals.",
    "Adapts solutions for multiple industries with unique digital threat considerations."
  ],

  "regulatory intelligence": [
    "Regulatory Intelligence (RI) is critical for successful product registrations and market authorization across the product lifecycle.",
    "RI Process: Source identification, Research, Data curation, Analysis, Impact assessment, Report generation.",
    "Lifecycle Coverage: Research, Development, Submissions, and Post-approval activities.",
    "Sources: Internal (precedence, regional affiliates) and external (HA sites, CI, RAPS, publications).",
    "Challenges: Fast-changing regulations, emerging markets, siloed info, unstructured data.",
    "AI/Tech: NLP, automated aggregation, translation, and predictive analytics optimize filing strategy.",
    "Reference: 'regulatory-intelligence-a-key-to-successful-submissions' (White Paper)."
  ],

  ri: [
    "RI ensures monitoring regulatory landscapes and compliance from early development to post-market.",
    "Process: Research, Curation, Analysis, Impact Assessment, often aided by AI/NLP tools."
  ],

  "breast cancer": [
    "Breast cancer: Malignant proliferation of epithelial cells, classified by TNM staging and ER/PR/HER2 status.",
    "Signs: Lump, nipple inversion, peau d’orange, discharge, pain, axillary nodes.",
    "Risk Factors: Age, family history, hormones, radiation, lifestyle.",
    "Treatment: Surgery, radiation, chemotherapy, hormone therapy, targeted agents.",
    "Reference: 'Oncology_Breast_cancer__E_Module_V1'."
  ],

  docetaxel: [
    "Docetaxel is an anti-tubulin chemotherapy drug for breast cancer.",
    "Used in TAC, TC, TCH regimens.",
    "Preferred single agent for recurrent/metastatic breast cancer."
  ],

  tnm: [
    "TNM: Tumor (T), Node (N), Metastasis (M).",
    "T1 <2cm; T4 extends to chest wall.",
    "N0 = none; N3 = extensive involvement.",
    "M1 = distant metastasis."
  ],

  "leukocytoclastic vasculitis": [
    "LCV: Small-vessel vasculitis reported after COVID-19 vaccination.",
    "Mechanism: Immune complex deposition, possibly enhanced by prior COVID antibodies.",
    "Treatment: Prednisolone or antihistamines.",
    "Observed with various vaccine types."
  ],

  lcv: [
    "LCV: Post-vaccine small-vessel vasculitis with purpuric lesions.",
    "Prior COVID infection may worsen response.",
    "Usually treated with corticosteroids."
  ],

  "covid-19 vaccine": [
    "COVID-19 vaccines have rare links to LCV.",
    "Immune complexes deposit in vessels post-activation.",
    "Prior infection may intensify reactions."
  ],

  "machine learning recommendation engine": [
    "Indegene provides an ML-powered HCP engagement recommendation engine with Explainable AI (SHAP).",
    "Objective: Contextual recommendations to improve rep engagement and uncover opportunities.",
    "Integration: Platforms like Veeva CRM.",
    "Impact: 10–15% increase in leads, 70% rep adoption, 15–20% reduction in manual validation."
  ],

  xai: [
    "XAI (Explainable AI) provides transparent reasoning behind ML predictions, using SHAP values."
  ],

  "hcp engagement": [
    "HCP engagement: Personalization across channel, content, timing.",
    "Strategy: AI enhances rep interactions and drives prescription lift.",
    "Reference: 'The_Analytical_Eye_Edition_5'."
  ],

  "adult congenital heart disease": [
    "ACHD: Congenital defects in adults, guided by ESC Classes I–III and Evidence Levels A–C.",
    "ASD/VSD/AVSD management depends on overload symptoms and pulmonary pressures.",
    "TOF: PV replacement in severe PR; ICD for SCD risk.",
    "Reference: 'CVD_GS_ESC_Guidelines_for_the_management_of_Adult_Congenital_Heart_Disease'."
  ],

  achd: [
    "ACHD guidelines define interventions based on symptoms, overload, and pulmonary pressures."
  ],

  "classes of recommendation": [
    "Class I = recommended; IIa = should consider; IIb = may consider; III = not recommended."
  ],

  "edetail aids production process": [
    "CPC Playbook: Workflow for eDetails creation. Document: 'CPC_eDetail_Agency_Playbook'.",
    "Phases: Plan → Produce → Publish & Optimize.",
    "Roles: Brand, Agency, CPC, Regulatory.",
    "Compliance: Only MLR-approved content, regional exceptions apply.",
    "Submissions: Layered PSD/INDD (2x), PDFs, copy deck, changelog, metadata."
  ],

  cpc: [
    "CPC: Supports agencies via planning, audits, QC, deployment, and CSAT management.",
    "Document: 'CPC_eDetail_Agency_Playbook'."
  ],

  "edetail submission": [
    "eDetail files require 2x resolution layered files (PSD/INDD).",
    "Slide Numbering: Parent = XX.00; Child = XX.XX.",
    "Veeva Limitation: Video not supported in remote detailing."
  ],

  "hemato-oncology case study": [
    "Case study: End-to-end Medical Communications and Med Info support across US, Europe, APAC in Oncology.",
    "Assets: Literature search, manuscripts, abstracts, MSL decks, Med Info letters, NCCN/Compendia submissions.",
    "Outcomes: >30% faster TAT, Avg CSAT 4.0+, >80% first submission acceptance rate, 10+ years engagement.",
    "Compliance: ICMJE/GPP4 guidelines, VEEVA PROMOMATS. Document ID: 'Oncology Med Info Support_case study 1_V1'."
  ],

  "med comm support": [
    "Medical Communications support in Oncology: Publications, MSL decks, Med Info letters.",
    "Performance: >30% faster TAT, >80% first submission acceptance.",
    "Case Study: 'Oncology Med Info Support_case study 1_V1'."
  ],

  "oncology sales case study": [
    "Indegene drove incremental sales for breast cancer oncology drug via omnichannel HCP targeting.",
    "Solution: Advanced segmentation (13,300 HCPs), repurposed content, multi-channel engagement.",
    "Outcome: $14.2M incremental sales, 936 prescribers activated. Document: 'Oncology_Driving incremental sales for oncology drug _Case study 3_V1'."
  ],

  "shovan bhattacharrya": [
    "Shovan Bhattacharrya: Pharmaceutical physician, 12+ years experience.",
    "Specialties: Ophthalmology, Rare diseases, Cardiovascular, Metabolics.",
    "Achievements: Launched Verkazia, built Alcon India Med Affairs team, launched PanOptix and Forxiga/Brilinta.",
    "Responsibilities: Medical Launch Strategy, KOL Engagement, Field Medical Strategy. Document: 'Ophthalmology_TA Profile_Shovan Bhattacharrya_Canada'."
  ],

  "project cost planning enhancements": [
    "mySheets enhancements for Project Cost Planning: Contract Value Validation, new Role Details, efficiency calculations.",
    "Validation: Contract Value must match 'Revenue as per Latest Plan in USD'.",
    "Efficiency Hours: ((Estimated Efforts - Baseline) / Baseline) × 100.",
    "Efficiency Cost: ((Planned Cost - Baseline) / Baseline) × 100.",
    "Reference: 'POC_Cost_Planning_Update_UMmySheets'."
  ],

  "mysheets validation": [
    "mySheets enforces Contract Value Validation post first FL Sign Off."
  ],

  "prma & heor services": [
    "PRMA & HEOR advisory across product lifecycle.",
    "PRMA: Pricing, Reimbursement, Contracting, HTA, Multi-country strategies.",
    "HEOR: Real World Evidence, Cost-effectiveness, Budget impact, Comparative effectiveness.",
    "Team: 40% PhDs/Medicine grads, 40+ markets experience, AI/ML/NLP tools.",
    "Reference: 'PRMA___HEOR_Service_Offerings_25_Jul_22'."
  ],

  heor: [
    "HEOR: RWE generation, economic modeling, comparative effectiveness, using proprietary AI tools.",
    "Document: 'PRMA___HEOR_Service_Offerings_25_Jul_22'."
  ],

  prma: [
    "PRMA: Strategy, pricing, reimbursement, HTA assessments, contracting, powered by AI tools.",
    "Document: 'PRMA___HEOR_Service_Offerings_25_Jul_22'."
  ],

  "document list overview": [
    "Documents across Global Operations, Enterprise Medical, and Enterprise Commercial.",
    "Types: Case Studies, TA Profiles, Templates, Playbooks, White Papers, Checklists, SOPs.",
    "Therapies: Oncology, Endocrinology, Cardiovascular, Neurology, Ophthalmology, Dermatology."
  ],

  "data security": [
    "CSR_Statistics for Data Security (CSR_T_020) authored by Sitara Jagadeesha, approved by Pankaj Kakkar."
  ],

  "medical communication documents": [
    "TA Profiles: Cardiovascular (Avidon Appel), Endocrinology (Chaitra Gopinath), Ophthalmology (Shovan Bhattacharrya), Neurology/Oncology (Bhavadharini Balaji, Manolo Beelke).",
    "Case Studies: Oncology Med Info Support, SE-ME CTCL Dashboard."
  ],

  pharmacovigilance: [
    "Pharmacovigilance & Safety operations: Case Study- NovoNordisk AE Monitoring, Best practices PV Line Listing, Whitepaper: 'Indegene Pharmacovigilance - Comprehensive Safety Operations and Compliance'."
  ],

  "global operations documents": [
    "Global Operations: Templates ('Indegene MOM Template', 'Work Method Statement Template'), Compliance ('CMMI_Certificate_2024', 'Indegene_Quality_Metrics_Document_v10.1'), Vendor management ('TPRM Vendor Offboarding Checklist'), Finance ('Margin_Calculations_on_mySheets')."
  ],

  "enterprise commercial documents": [
    "Enterprise Commercial: Analytics ('The_Analytical_Eye_Edition_5'), Marketing Automation ('ON24_Webinar_Campaign_Integration_with_SFMC'), Solutions ('Indegene Marketing Automation Platform Capabilities'), Brochure overview."
  ],

  "oncology documents": [
    "Oncology documents: Sales Growth, Med Info Support, Insights Automation, Training ('Oncology_Breast_cancer__E_Module_V1')."
  ],

  "endocrinology documents": [
    "Endocrinology resources: TA Profile Chaitra Gopinath (US), PV Line Listing Best Practices, Manolo Beelke TA profile."
  ]
};


/* ============================================================
   INTERNAL QUERY HANDLER (Time, Date, Day)
============================================================ */
const handleInternalQueries = (query: string): string | null => {
  const text = query.toLowerCase().trim();
  const now = new Date();

  if (text.includes("what is the time") || text.includes("current time")) {
    return `The current time is ${now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}.`;
  }

  if (text.includes("what is the date") || text.includes("today's date")) {
    return `Today's date is ${now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}.`;
  }

  if (text.includes("what is the day") || text.includes("today's day")) {
    return `Today is ${now.toLocaleDateString("en-US", { weekday: "long" })}.`;
  }

  return null;
};

/* ============================================================
   CONTEXT SEARCH LOGIC
============================================================ */
const getAnswerFromContext = (query: string): string => {
  const lower = query.toLowerCase();

  for (const key in CONTEXT_MAP) {
    if (lower.includes(key)) {
      const extra = lower.split(key)[1]?.trim() ?? "";
      const matched = CONTEXT_MAP[key].filter((s) =>
        s.toLowerCase().includes(extra)
      );

      return matched.length
        ? matched.join(" ")
        : CONTEXT_MAP[key].join(" ");
    }
  }

  return "I could not find a relevant match in my stored knowledge.";
};

/* ============================================================
   MAIN COMPONENT
============================================================ */
export const QuestionSection: React.FC<IQuestionSectionProps> = () => {
  const [isChatVisible, setChatVisible] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleChat = () => setChatVisible((prev) => !prev);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      try {
        const internal = handleInternalQueries(userMsg.text);
        const reply = internal || getAnswerFromContext(userMsg.text);

        setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className={styles.questionSection}>
      <div className={styles.questionContainer}>
        <div className={styles.leftPrompt}>
          <p className={styles.promptText}>Ask your question here</p>
        </div>

        <div className={styles.rightInput}>
          <input
            className={styles.questionInput}
            placeholder="Type your question..."
            readOnly
          />
          <img
            src={chatbotIcon}
            alt="Chatbot"
            className={styles.chatbotIcon}
            onClick={toggleChat}
          />
        </div>
      </div>

      {isChatVisible && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <span>Chat Assistant</span>
            <button className={styles.closeButton} onClick={toggleChat}>
              &times;
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.messageContainer} ${
                  msg.sender === "user"
                    ? styles.messageContainerUser
                    : styles.messageContainerBot
                }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src={chatbotIcon}
                    alt="Bot"
                    className={styles.messageAvatar}
                  />
                )}
                <div
                  className={
                    msg.sender === "user" ? styles.userMsg : styles.botMsg
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div
                className={`${styles.messageContainer} ${styles.messageContainerBot}`}
              >
                <img
                  src={chatbotIcon}
                  alt="Bot"
                  className={styles.messageAvatar}
                />
                <div className={`${styles.botMsg} ${styles.thinking}`}>
                  ...Thinking...
                </div>
              </div>
            )}
          </div>

          <div className={styles.inputRow}>
            <input
              className={styles.chatInput}
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />

            <button
              className={styles.sendButton}
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
=======
import * as React from 'react';
import { IQuestionSectionProps } from './IQuestionSectionProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { DocumentDetailPage } from '../../pages/DocumentDetailPage/DocumentDetailPage';
import styles from './QuestionSection.module.scss';

interface DocumentItem {
  id: number;
  name: string;
  abstract: string;
  fileType: string;
  serverRelativeUrl: string;
  fileRef: string;
}

export const QuestionSection: React.FunctionComponent<IQuestionSectionProps> = (props) => {
  const [documents, setDocuments] = React.useState<DocumentItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedDocumentId, setSelectedDocumentId] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (props.context) {
      fetchLatestDocuments();
    }
  }, [props.context]);

  const fetchLatestDocuments = async () => {
    if (!props.context) {
      setLoading(false);
      return;
    }

    try {
      // SPFx automatically provides the current SharePoint site URL through context
      // If web part is on: https://m365x65470037.sharepoint.com/sites/MigrationTest2
      // Then webUrl will be: https://m365x65470037.sharepoint.com/sites/MigrationTest2
      // No manual configuration needed - it uses the site where the web part is deployed
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const libraryName = 'KMArtifacts';
      
      console.log('=== FETCHING DOCUMENTS FROM DOCUMENT LIBRARY ===');
      console.log('Current Site URL (auto-detected):', webUrl);
      console.log('Target Library:', libraryName);
      console.log('Expected Library URL:', `${webUrl}/KMArtifacts`);
      
      // SharePoint REST API endpoint structure:
      // {siteUrl}/_api/web/lists/getbytitle('LibraryName')/items
      // This works for both lists and document libraries
      // The API automatically uses the site context from webUrl
      // Note: ServerRelativeUrl is not available directly on items - use FileRef instead
      const apiUrl = `${webUrl}/_api/web/lists/getbytitle('${libraryName}')/items?$select=Id,Title,TitleName,Abstract,FileLeafRef,FileRef&$orderby=Created desc&$top=3`;
      
      console.log('Full API Endpoint:', apiUrl);
      console.log('Note: This will work if KMArtifacts library exists on the current site');
      
      const response: SPHttpClientResponse = await props.context.spHttpClient.get(
        apiUrl,
        SPHttpClient.configurations.v1
      );

      console.log('Response status:', response.status);
      console.log('Response OK:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch documents: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      console.log('Items count:', data.value?.length || 0);
      
      const items = data.value || [];
      
      if (items.length > 0) {
        console.log('First item sample:', JSON.stringify(items[0], null, 2));
      }

      const formattedItems: DocumentItem[] = items.map((item: any, index: number) => {
        console.log(`Processing item ${index + 1}:`, item);
        console.log(`All item keys:`, Object.keys(item));
        
        // Get file name from Name column - FileLeafRef is the actual filename in document libraries
        // This is what appears in the "Name" column in SharePoint
        const fileName = item.FileLeafRef || item.File?.Name || '';
        
        // Extract file extension from the Name column for the file format display
        const fileExtension = fileName.split('.').pop()?.toUpperCase() || '';
        
        // Use Name column (FileLeafRef) as the tile title
        // This matches what the user sees in the "Name" column
        let displayName = fileName;
        if (!displayName || displayName === '') {
          displayName = item.Title || `Document ${item.Id}`;
        }
        
        // Get abstract from Abstract column
        let abstract = item.Abstract || '';
        if (abstract === '-' || abstract === '') {
          abstract = '';
        }
        
        // Construct proper server relative URL
        // FileRef contains the full server-relative path like: /sites/MigrationTest2/KMArtifacts/filename.pdf
        // This is the correct field to use for document libraries
        let serverRelativeUrl = item.FileRef || '';
        
        // Ensure it starts with /
        if (serverRelativeUrl && !serverRelativeUrl.startsWith('/')) {
          serverRelativeUrl = `/${serverRelativeUrl}`;
        }
        
        // If we still don't have a URL, construct it from the library name and filename
        if (!serverRelativeUrl && fileName) {
          const siteRelativePath = props.context?.pageContext.web.serverRelativeUrl || '';
          serverRelativeUrl = `${siteRelativePath}/KMArtifacts/${fileName}`;
        }
        
        const formatted = {
          id: item.Id,
          name: displayName,
          abstract: abstract,
          fileType: fileExtension,
          serverRelativeUrl: serverRelativeUrl,
          fileRef: item.FileRef || serverRelativeUrl
        };
        
        console.log(`Formatted item ${index + 1}:`, formatted);
        return formatted;
      });

      console.log('Formatted items:', formattedItems);
      setDocuments(formattedItems);
    } catch (error) {
      console.error('=== ERROR FETCHING DOCUMENTS ===');
      console.error('Error type:', typeof error);
      console.error('Error details:', error);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');
      
      // Set empty array on error so we still show empty tiles
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const getFileTypeIcon = (fileType: string): string => {
    const type = fileType.toLowerCase();
    if (type === 'pdf') {
      return '📄';
    } else if (type === 'pptx' || type === 'ppt') {
      return '📊';
    } else if (type === 'docx' || type === 'doc') {
      return '📝';
    } else if (type === 'xlsx' || type === 'xls') {
      return '📈';
    }
    return '📎';
  };

  const handleView = (item: DocumentItem) => {
    if (props.context && item.id) {
      // Open document detail page in a modal overlay (full-screen)
      setSelectedDocumentId(item.id);
    }
  };

  const handleCloseDetail = () => {
    setSelectedDocumentId(null);
  };

  const handleDownload = async (item: DocumentItem) => {
    if (props.context && item.serverRelativeUrl) {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      let serverRelativeUrl = item.serverRelativeUrl;
      
      // Ensure proper server relative URL format
      if (!serverRelativeUrl.startsWith('/')) {
        serverRelativeUrl = `/${serverRelativeUrl}`;
      }
      
      // Use SharePoint REST API for authenticated download
      try {
        const downloadUrl = `${webUrl}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(serverRelativeUrl)}')/$value`;
        
        const response = await props.context.spHttpClient.get(
          downloadUrl,
          SPHttpClient.configurations.v1
        );
        
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = item.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          // Fallback to direct link
          const fileUrl = `${webUrl}${serverRelativeUrl}`;
          window.open(fileUrl, '_blank');
        }
      } catch (error) {
        console.error('Download error:', error);
        // Fallback to direct link
        const fileUrl = `${webUrl}${serverRelativeUrl}`;
        window.open(fileUrl, '_blank');
      }
    }
  };

  // Always show 3 tiles, fill with empty placeholders if needed
  const displayTiles = React.useMemo(() => {
    const tiles: (DocumentItem | null)[] = [];
    for (let i = 0; i < 3; i++) {
      tiles.push(documents[i] || null);
    }
    return tiles;
  }, [documents]);

  return (
    <>
      <div className={styles.questionSection}>
        <div className={styles.tilesContainer}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            displayTiles.map((doc, index) => (
              <div key={doc ? doc.id : `empty-${index}`} className={styles.tile}>
                {doc ? (
                  <>
                    <div className={styles.tileHeader}>
                      <div className={styles.fileTypeIcon}>{getFileTypeIcon(doc.fileType)}</div>
                      <span className={styles.fileType}>{doc.fileType || 'FILE'}</span>
                    </div>
                    <h3 className={styles.tileTitle}>{doc.name}</h3>
                    <p className={styles.tileAbstract}>{doc.abstract || 'No abstract available'}</p>
                    <div className={styles.tileActions}>
                      <button 
                        className={styles.viewButton}
                        onClick={() => handleView(doc)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        View
                      </button>
                      <button 
                        className={styles.downloadButton}
                        onClick={() => handleDownload(doc)}
                        aria-label="Download"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.tileHeader}>
                      <div className={styles.fileTypeIcon}>📎</div>
                      <span className={styles.fileType}>---</span>
                    </div>
                    <h3 className={styles.tileTitle}>No document</h3>
                    <p className={styles.tileAbstract}>No document available</p>
                    <div className={styles.tileActions}>
                      <button className={styles.viewButton} disabled>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        View
                      </button>
                      <button className={styles.downloadButton} disabled aria-label="Download">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      
      {selectedDocumentId && props.context && (
        <div className={styles.detailModal}>
          <DocumentDetailPage 
            context={props.context} 
            documentId={selectedDocumentId}
            onClose={handleCloseDetail}
          />
        </div>
      )}
    </>
>>>>>>> origin/vamshik
  );
};

import * as React from "react";
import { IQuestionSectionProps } from "./IQuestionSectionProps";
import { SPHttpClient } from "@microsoft/sp-http";
import { DocumentDetailPage } from "../../pages/DocumentDetailPage/DocumentDetailPage";
import styles from "./QuestionSection.module.scss";

/* ======================================================
   Chatbot Section
====================================================== */
const chatbotIcon: string = require("../../assets/chatbot-icon.png");

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

/* ============================================================
   CONTEXT KNOWLEDGE MAP  (FULL MAP FROM YOUR FIRST SNIPPET)
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
   INTERNAL QUERY HANDLER (Time, Date, Day + basic general)
============================================================ */
const handleInternalQueries = (query: string): string | null => {
  const text = query.toLowerCase().trim();
  const now = new Date();

  // Time
  if (
    text.includes("what is the time") ||
    text.includes("current time") ||
    text.includes("time now") ||
    (text.includes("time") && !text.includes("life time"))
  ) {
    return `The current time is ${now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}.`;
  }

  // Date
  if (
    text.includes("what is the date") ||
    text.includes("today's date") ||
    text.includes("todays date") ||
    (text.includes("date") && !text.includes("update"))
  ) {
    return `Today's date is ${now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}.`;
  }

  // Day
  if (
    text.includes("what is the day") ||
    text.includes("today's day") ||
    text.includes("todays day") ||
    text.includes("which day is today") ||
    text.includes("which day is it today")
  ) {
    return `Today is ${now.toLocaleDateString("en-US", { weekday: "long" })}.`;
  }

  return null;
};

/* ============================================================
   GENERAL SMALL-TALK / META QUERIES (who are you, hi, help)
============================================================ */
const handleGeneralQueries = (query: string): string | null => {
  const text = query.toLowerCase().trim();

  // Greetings
  if (
    text === "hi" ||
    text === "hello" ||
    text === "hey" ||
    text.startsWith("hi ") ||
    text.startsWith("hello ") ||
    text.startsWith("hey ")
  ) {
    return "Hi! I’m your KM Assistant chatbot. Ask me about Indegene, Skysecure, breast cancer modules, PRMA/HEOR, CPC playbooks, and more — or ask for the time, date, or day.";
  }

  // Who are you?
  if (text.includes("who are you") || text.includes("what are you")) {
    return "I’m a lightweight, on-page chatbot built for this KM site. I answer questions from a curated internal knowledge map and can also tell you the current time, date, and day.";
  }

  // What can you do?
  if (
    text.includes("what can you do") ||
    text.includes("how can you help") ||
    text.includes("what do you do")
  ) {
    return "I can:\n• Answer questions about Indegene, Skysecure, PRMA/HEOR, PV, oncology docs, CPC playbooks, etc.\n• Share quick overviews from internal knowledge snippets.\n• Tell you the current time, date, and day.\n\nTry asking: \"Tell me about breast cancer\" or \"Explain regulatory intelligence\".";
  }

  // Help
  if (text === "help" || text.startsWith("help ")) {
    return "You can ask me things like:\n• \"What is Indegene?\"\n• \"Tell me about regulatory intelligence\"\n• \"What is breast cancer?\"\n• \"What is the time?\" or \"What's today's date?\"";
  }

  // How are you
  if (text.includes("how are you")) {
    return "I’m just code, but I’m running fine and ready to help you with KM-related questions!";
  }

  return null;
};

/* ============================================================
   CONTEXT SEARCH LOGIC – more robust / semantic-ish
============================================================ */
const normalize = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const getAnswerFromContext = (query: string): string => {
  const normQuery = normalize(query);

  let bestKey: string | null = null;
  let bestScore = 0;

  Object.keys(CONTEXT_MAP).forEach((key) => {
    const normKey = normalize(key);
    if (!normKey) return;

    let score = 0;

    // Strong match if one contains the other
    if (normQuery.includes(normKey) || normKey.includes(normQuery)) {
      score = normKey.length; // longer key → higher score
    } else {
      // Softer match: token overlap
      const keyTokens = new Set(normKey.split(" "));
      const queryTokens = new Set(normQuery.split(" "));
      let overlap = 0;
      keyTokens.forEach((t) => {
        if (queryTokens.has(t)) overlap++;
      });
      score = overlap;
    }

    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  });

  if (bestKey && bestScore > 0) {
    const normKey = normalize(bestKey);
    const extraPart = normQuery.replace(normKey, "").trim();
    const entries = CONTEXT_MAP[bestKey];

    // If user asked something *after* the keyword, try to filter lines
    if (extraPart) {
      const matched = entries.filter((s) =>
        normalize(s).includes(extraPart)
      );
      if (matched.length) return matched.join(" ");
    }

    return entries.join(" ");
  }

  return "I could not find a relevant match in my stored knowledge.";
};

/* ======================================================
   Document Tile Section
====================================================== */

interface DocumentItem {
  id: number;
  name: string;
  abstract: string;
  fileType: string;
  serverRelativeUrl: string;
  fileRef: string;
}

export const QuestionSection: React.FC<IQuestionSectionProps> = (props) => {
  /* ---------------------------------------------
     Chatbot State
  --------------------------------------------- */
  const [isChatVisible, setChatVisible] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  /* ---------------------------------------------
     Document Tiles State
  --------------------------------------------- */
  const [documents, setDocuments] = React.useState<DocumentItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedDocumentId, setSelectedDocumentId] =
    React.useState<number | null>(null);

  React.useEffect(() => {
    if (props.context) fetchLatestDocuments();
  }, [props.context]);

  /* ======================================================
     Fetch Last 3 Documents
  ====================================================== */
  const fetchLatestDocuments = async () => {
    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const libraryName = "KMArtifacts";

      const apiUrl = `${webUrl}/_api/web/lists/getbytitle('${libraryName}')/items?$select=Id,Title,Abstract,FileLeafRef,FileRef&$orderby=Created desc&$top=3`;

      const response = await props.context.spHttpClient.get(
        apiUrl,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) throw new Error("Failed to load files.");

      const result = await response.json();
      const items = result.value || [];

      const mapped: DocumentItem[] = items.map((item: any) => {
        const fileName = item.FileLeafRef || "Untitled";
        const fileExt = fileName.split(".").pop()?.toUpperCase() || "FILE";

        return {
          id: item.Id,
          name: fileName,
          abstract: item.Abstract || "",
          fileType: fileExt,
          serverRelativeUrl: item.FileRef || "",
          fileRef: item.FileRef || "",
        };
      });

      setDocuments(mapped);
    } catch (err) {
      console.error("Document load error:", err);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
     Chatbot Handlers
  ====================================================== */
  const toggleChat = () => setChatVisible((prev) => !prev);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      try {
        // 1) Internal time/date/day
        const internal = handleInternalQueries(userMsg.text);

        // 2) General questions (hi, who are you, help)
        const general = internal ? null : handleGeneralQueries(userMsg.text);

        // 3) Context lookup
        const reply =
          internal || general || getAnswerFromContext(userMsg.text);

        setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  /* ======================================================
     Document Action Handlers
  ====================================================== */
  const handleView = (item: DocumentItem) => {
    setSelectedDocumentId(item.id);
  };

  const handleCloseDetail = () => setSelectedDocumentId(null);

  const handleDownload = async (item: DocumentItem) => {
    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const downloadUrl = `${webUrl}/_api/web/GetFileByServerRelativeUrl('${item.serverRelativeUrl}')/$value`;

      const resp = await props.context.spHttpClient.get(
        downloadUrl,
        SPHttpClient.configurations.v1
      );

      if (resp.ok) {
        const blob = await resp.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = item.name;
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error("Download failed:", e);
    }
  };

  /* ======================================================
     File Type Emoji
  ====================================================== */
  const getFileTypeIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("pdf")) return "📄";
    if (t.includes("ppt")) return "📊";
    if (t.includes("xls")) return "📈";
    if (t.includes("doc")) return "📝";
    return "📎";
  };

  /* ======================================================
     Render
  ====================================================== */
  return (
    <>
      {/* ======================= Document Tiles ======================== */}
      <div className={styles.questionSection}>
        <div className={styles.tilesContainer}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            documents.map((doc) => (
              <div key={doc.id} className={styles.tile}>
                <div className={styles.tileHeader}>
                  <span className={styles.fileTypeIcon}>
                    {getFileTypeIcon(doc.fileType)}
                  </span>
                  <span className={styles.fileType}>{doc.fileType}</span>
                </div>

                <h3 className={styles.tileTitle}>{doc.name}</h3>
                <p className={styles.tileAbstract}>
                  {doc.abstract || "No abstract available"}
                </p>

                <div className={styles.tileActions}>
                  <button
                    className={styles.viewButton}
                    onClick={() => handleView(doc)}
                  >
                    👁 View
                  </button>
                  <button
                    className={styles.downloadButton}
                    onClick={() => handleDownload(doc)}
                  >
                    ⬇ Download
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ======================= Chatbot Floating Launcher ======================== */}
      <div className={styles.chatLauncher}>
        <img
          src={chatbotIcon}
          alt="Chatbot"
          className={styles.chatbotIcon}
          onClick={toggleChat}
        />
      </div>

      {/* ======================= Chatbot Window (with avatar + bubbles) ======================== */}
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

      {/* ======================= Document Detail Page ======================== */}
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
  );
};

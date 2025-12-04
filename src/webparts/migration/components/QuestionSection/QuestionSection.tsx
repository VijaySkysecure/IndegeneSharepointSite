import * as React from "react";
import { IQuestionSectionProps } from "./IQuestionSectionProps";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { DocumentDetailPage } from "../../pages/DocumentDetailPage/DocumentDetailPage";
import { ViewAllDocumentsPage } from "../../pages/ViewAllDocumentsPage/ViewAllDocumentsPage";
import styles from "./QuestionSection.module.scss";
import { 
  AZURE_OPENAI_ENDPOINT, 
  AZURE_OPENAI_API_KEY, 
  AZURE_OPENAI_DEPLOYMENT, 
  AZURE_OPENAI_API_VERSION,
  KNOWLEDGE_BASE_URL,
  AZURE_SEARCH_ENDPOINT,
  AZURE_SEARCH_INDEX,
  AZURE_SEARCH_KEY,
  AZURE_SEARCH_API_VERSION,
  AZURE_SEARCH_SEMANTIC_CONFIG
} from "../../services/SearchConfig";

/* ======================================================
   Chatbot Section
====================================================== */
const chatbotIcon: string = require("../../assets/chatbot-icon.png");

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  // optional link metadata: when present, UI will render an anchor
  title?: string;
  url?: string;
}

/* =========================================================
   QUICK LINKS MAP (used to return clickable links for queries)
========================================================= */
const QUICK_LINKS_MAP: Record<string, { title: string; url: string }> = {
  home: { title: "Indegene Home", url: "https://www.indegene.com/" },
  careers: { title: "Careers", url: "https://careers.indegene.com/" },
  "case studies": {
    title: "Case Studies & Insights",
    url: "https://www.indegene.com/what-we-think/case-studies"
  },
  casestudies: {
    title: "Case Studies & Insights",
    url: "https://www.indegene.com/what-we-think/case-studies"
  },
  contact: { title: "Contact Us", url: "https://www.indegene.com/contact-us" },
  investor: { title: "Investor Relations", url: "https://ir.indegene.com/" },
  investors: { title: "Investor Relations", url: "https://ir.indegene.com/" },
  csr: {
    title: "CSR Policy (PDF)",
    url: "https://resources.indegene.com/indegene/pdf/policies/corporate-social-responsibility-policy.pdf"
  },
  "csr policy": {
    title: "CSR Policy (PDF)",
    url: "https://resources.indegene.com/indegene/pdf/policies/corporate-social-responsibility-policy.pdf"
  },
  leadership: {
    title: "Leadership / Who We Are",
    url: "https://www.indegene.com/who-we-are/leadership"
  },
  "about us": {
    title: "About Us",
    url: "https://www.indegene.com/about-us"
  },
  about: {
    title: "About Us",
    url: "https://www.indegene.com/about-us"
  },
  "who we are": {
    title: "Who We Are",
    url: "https://www.indegene.com/who-we-are"
  },
  "next platforms": {
    title: "NEXT Platforms",
    url: "https://www.indegene.com/what-we-do/next-platforms"
  },
  privacy: { title: "Privacy Policy", url: "https://www.indegene.com/privacy-policy" },
  "retention policy": {
    title: "Policy on Preservation of Records/Archival Policy",
    url: "https://ir.indegene.com/media/a4fl0eab/policy-on-preservation-of-records-archival-policy-on-website.pdf"
  },
  "retention policies": {
    title: "Policy on Preservation of Records/Archival Policy",
    url: "https://ir.indegene.com/media/a4fl0eab/policy-on-preservation-of-records-archival-policy-on-website.pdf"
  },
  "archival policy": {
    title: "Policy on Preservation of Records/Archival Policy",
    url: "https://ir.indegene.com/media/a4fl0eab/policy-on-preservation-of-records-archival-policy-on-website.pdf"
  },
  "preservation of records": {
    title: "Policy on Preservation of Records/Archival Policy",
    url: "https://ir.indegene.com/media/a4fl0eab/policy-on-preservation-of-records-archival-policy-on-website.pdf"
  }
};

/* helper: return a matching quick link for the user query (or null) */
const getLinkForQuery = (query: string) => {
  const q = query.toLowerCase().trim();
  
  // check for multi-word synonyms first (order matters - more specific first)
  const phraseChecks = [
    { keys: ["case study", "case studies"], mapKey: "case studies" },
    { keys: ["csr policy", "corporate social responsibility"], mapKey: "csr" },
    { keys: ["retention policy", "retention policies", "document retention"], mapKey: "retention policy" },
    { keys: ["archival policy", "preservation of records", "document archival"], mapKey: "archival policy" },
    { keys: ["next platforms", "next platform"], mapKey: "next platforms" },
    { keys: ["privacy policy", "privacy"], mapKey: "privacy" },
    { keys: ["investor relations", "investor"], mapKey: "investor" },
    { keys: ["contact us", "contact"], mapKey: "contact" },
    { keys: ["about us", "about indegene"], mapKey: "about us" },
    { keys: ["who we are"], mapKey: "who we are" }
  ];
  for (const p of phraseChecks) {
    for (const k of p.keys) {
      if (q.includes(k)) return QUICK_LINKS_MAP[p.mapKey];
    }
  }

  // Check for standalone CSR (must be separate word, not part of another word)
  if (q === "csr" || q.includes(" csr ") || q.startsWith("csr ") || q.endsWith(" csr")) {
    return QUICK_LINKS_MAP["csr"];
  }

  // token-level matching (for single word queries)
  const tokens = q.split(/\s+/);
  for (const t of tokens) {
    if (QUICK_LINKS_MAP[t]) return QUICK_LINKS_MAP[t];
  }

  // no link found
  return null;
};

/* =========================================================
   CONTEXT KNOWLEDGE MAP
   (this is the full map used by the chatbot to answer queries)
========================================================= */
const CONTEXT_MAP: Record<string, string[]> = {
  /* =====================================================
     INDEGENE – COMPANY BASICS
  ====================================================== */

  indegene: [
    "Indegene is a tech-native, digital-first life sciences commercialization company headquartered in Bengaluru, India.",
    "It helps biopharma, biotech, and medical device companies bring therapies to market and optimize them using data, technology, and healthcare expertise."
  ],

  "what is indegene": [
    "Indegene is a specialist partner for life sciences companies.",
    "It combines medical, regulatory, commercial, and technology capabilities to help pharma, biotech, and medical device organizations launch, promote, and support therapies globally."
  ],

  "who is indegene": [
    "Indegene is a global services and solutions company focused on life sciences.",
    "It works with pharmaceutical, biotech, and medical device companies to support commercialization, medical affairs, clinical, and analytics functions."
  ],

  "what does indegene do": [
    "Indegene helps life sciences organizations with:",
    "• Commercial and marketing operations (omnichannel campaigns, content, field force support).",
    "• Medical and regulatory operations (medical information, publications, MLR review, safety support).",
    "• Clinical and evidence services (RWE, analytics, clinical operations support).",
    "• Data, analytics, and technology solutions to make these processes more efficient and measurable."
  ],

  "what is indegene company": [
    "Indegene Limited is a publicly listed, tech-native life sciences commercialization company.",
    "It provides services across commercial, medical, clinical, and analytics for pharma, biotech, and medical device clients."
  ],

  "indegene india": [
    "Indegene is headquartered in Bengaluru, Karnataka, India.",
    "It has major delivery centers in India and supports global life sciences clients from these locations."
  ],

  "indegene headquarters": [
    "Indegene's global headquarters is in Bengaluru, Karnataka, India.",
    "From there, it coordinates global delivery across multiple regions for life sciences clients."
  ],

  /* =====================================================
     FOCUS AREA & CLIENTS
  ====================================================== */

  "indegene domain": [
    "Indegene operates in the life sciences and healthcare domain.",
    "Its core focus is on pharmaceuticals, biotech, and medical devices, supporting commercialization, medical affairs, and clinical operations."
  ],

  "indegene industry": [
    "Indegene works in the life sciences and healthcare services industry.",
    "It sits at the intersection of healthcare, technology, and analytics."
  ],

  "indegene clients": [
    "Indegene serves global biopharmaceutical companies, emerging biotechs, and medical device manufacturers.",
    "Many of its clients are large, multinational pharma organizations that need scalable, compliant, and data-driven operations."
  ],

  "who are indegene clients": [
    "Indegene typically works with:",
    "• Large global pharma companies.",
    "• Mid-size and emerging biotech organizations.",
    "• Medical device and diagnostics companies.",
    "Client names are usually confidential and covered by NDAs."
  ],

  /* =====================================================
     SERVICES & SOLUTIONS
  ====================================================== */

  "indegene services": [
    "Indegene's key service areas include:",
    "• Enterprise Commercial Solutions  omnichannel marketing, content operations, marketing analytics, field force support.",
    "• Enterprise Medical Solutions  medical information, publications, scientific writing, medical review, safety support.",
    "• Enterprise Clinical / Evidence  RWE, analytics, clinical operations support.",
    "• Data, AI, and Technology solutions powering these services."
  ],

  "indegene business units": [
    "Indegene operates through several key business units and service lines:",
    "• **Enterprise Commercial Solutions (ECS)**: Omnichannel marketing, content operations, marketing analytics, field force support, and commercial strategy.",
    "• **Enterprise Medical Solutions (EM)**: Medical information, publications, scientific writing, medical review (MLR), safety support, and medical affairs.",
    "• **Enterprise Clinical / Evidence Services**: Real-world evidence (RWE), analytics, clinical operations support, and evidence generation.",
    "• **Global Operations**: Project management, quality assurance, compliance, vendor management, and operational excellence.",
    "• **Technology Solutions**: NEXT platform suite, AI/ML capabilities, GenAI solutions, digital engineering, and cloud services.",
    "• **Consulting Practice**: Strategic consulting, operating model design, and transformation execution.",
    "Each business unit focuses on specific aspects of life sciences commercialization while working together to deliver integrated solutions."
  ],

  "business units in indegene": [
    "Indegene's main business units include:",
    "• Enterprise Commercial Solutions (ECS) - Commercial and marketing operations",
    "• Enterprise Medical Solutions (EM) - Medical affairs and regulatory support",
    "• Enterprise Clinical / Evidence - Clinical operations and RWE",
    "• Global Operations - Project management and operational excellence",
    "• Technology Solutions - NEXT platforms and AI/ML capabilities",
    "• Consulting Practice - Strategic consulting and transformation"
  ],

  "indegene commercial solutions": [
    "Indegene's commercial solutions help brands with:",
    "• Omnichannel HCP engagement.",
    "• Segmentation and targeting.",
    "• Content creation and adaptation.",
    "• Campaign operations and analytics.",
    "Objective: Improve promotional effectiveness and ROI for life sciences brands."
  ],

  "indegene medical solutions": [
    "Indegene's medical solutions support:",
    "• Medical information and inquiry handling.",
    "• Publication planning and scientific writing.",
    "• MLR / medical review support.",
    "• Safety and pharmacovigilance operations in collaboration with clients."
  ],

  "indegene clinical solutions": [
    "Indegene provides clinical and evidence services such as:",
    "• Real-world evidence (RWE) analytics.",
    "• Clinical operations support.",
    "• Data management, dashboards, and insights.",
    "The goal is to make evidence generation and clinical operations more efficient and data-driven."
  ],

  "indegene omnichannel": [
    "Indegene supports omnichannel HCP engagement by:",
    "• Designing customer journeys.",
    "• Operating campaigns across email, web, in-person, and remote detailing.",
    "• Using analytics and AI for next-best-action and channel optimization."
  ],

  "indegene technology": [
    "Indegene describes itself as tech-native.",
    "It uses platforms, automation, and AI on top of CRMs, marketing tools, and analytics stacks to run life sciences workflows at scale.",
    "The focus is on integrating with client ecosystems like Veeva and marketing automation platforms."
  ],

  "indegene ai": [
    "Indegene uses AI/ML for:",
    "• Next-best-action recommendations for HCP engagement.",
    "• Segmentation and targeting.",
    "• Content and channel optimization.",
    "• Analytics on sales, marketing, and medical activities.",
    "Some solutions use explainable AI so field teams and stakeholders understand why a recommendation is made."
  ],

  /* =====================================================
     COMPANY TYPE, AGE & SCALE
  ====================================================== */

  "is indegene mnc": [
    "Yes. Indegene operates as a multinational company (MNC) with global pharma and biotech clients.",
    "It has offices and delivery centers in India and other regions serving clients across North America, Europe, and Asia."
  ],

  "is indegene public": [
    "Indegene Limited is a publicly listed company in India.",
    "It has a formal board and institutional investors and operates under public company governance."
  ],

  "when was indegene founded": [
    "Indegene was founded in 1998 in Bengaluru, India.",
    "Over time, it has evolved from a healthcare services company into a tech-native life sciences commercialization specialist."
  ],

  /* =====================================================
     INDEGENE – LEADERSHIP, FOUNDING, OWNERSHIP
  ====================================================== */

  "founder of indegene": [
    "Indegene was founded by Manish Gupta, Rajesh Nair, Sanjay Parikh, Anand Kiran, and Gaurav Kapoor.",
    "The company was established in 1998 in Bengaluru, India, with the goal of combining healthcare expertise and technology to support life sciences organizations."
  ],

  "who founded indegene": [
    "Indegene was founded in 1998 by a team of healthcare and technology experts: Manish Gupta, Rajesh Nair, Sanjay Parikh, Anand Kiran, and Gaurav Kapoor.",
    "They created the company to support pharmaceutical and medical device organizations using tech-enabled services."
  ],

  "ceo of indegene": [
    "The CEO (Chief Executive Officer) of Indegene is Manish Gupta.",
    "He is also one of the co-founders of the company and leads strategic growth and global operations."
  ],

  "who is the ceo of indegene": [
    "Manish Gupta is the current CEO of Indegene. He is also one of the original founders of the company."
  ],

  "who is manish": [
    "Manish Gupta is the current CEO of Indegene. He is also one of the original founders of the company, which was established in 1998 in Bengaluru, India. He leads strategic growth and global operations at Indegene."
  ],

  "manish": [
    "Manish Gupta is the current CEO of Indegene. He is also one of the original founders of the company, which was established in 1998 in Bengaluru, India. He leads strategic growth and global operations at Indegene."
  ],

  "is manish gupta founder of indegene": [
    "Yes, Manish Gupta is one of the founding members of Indegene and currently serves as its CEO.",
    "He played a key role in shaping the companys vision of combining healthcare expertise with digital solutions."
  ],

  "is indegene public company": [
    "Yes, Indegene Limited is a publicly listed company in India.",
    "It operates with public company governance, a board of directors, and institutional investors."
  ],

  "is indegene publicly listed": [
    "Yes, Indegene is a publicly listed company in India.",
    "It was previously known as Indegene Private Limited before becoming Indegene Limited.",
    "It operates under formal compliance and regulatory standards."
  ],

  "indegene company type": [
    "Indegene Limited is a public, tech-native life sciences commercialization company headquartered in Bengaluru, India.",
    "It operates globally with subsidiaries and delivery centers across multiple regions."
  ],

  "indegene ownership": [
    "Indegene Limited is publicly owned by shareholders and institutional investors.",
    "It follows corporate governance guidelines and regulations applicable to publicly listed companies."
  ],

  "indegene chairman": [
    "The Chairman of Indegene is Manish Gupta, who also serves as the CEO and co-founder."
  ],

  "indegene leaders": [
    "Key leaders at Indegene include:",
    "• Manish Gupta  Chairman and CEO (Co-founder)",
    "• Rajesh Nair  Co-founder and senior executive",
    "• Sanjay Parikh  Co-founder and business/operations leader",
    "Other leadership roles include CTO, CFO, and vertical heads based on business units."
  ],

  /* =====================================================
     CULTURE, VALUES & WORKPLACE
  ====================================================== */

  "indegene values": [
    "Indegene's culture emphasizes:",
    "• Empathy and trust.",
    "• Collaboration and ownership.",
    "• Innovation and being future-ready.",
    "Employees often work at the intersection of healthcare, technology, and analytics."
  ],

  "indegene culture": [
    "Indegene positions itself as a fast-paced, learning-focused organization.",
    "People work with global pharma clients, exposure to real-world medical and commercial problems, and technology-driven projects.",
    "Actual experience can vary by team, project, and manager, like most project-based service companies."
  ],

  "indegene work culture": [
    "Public employee reviews generally highlight:",
    "• Strong learning and exposure to global pharma processes.",
    "• Opportunities to work in cross-functional teams (medical, tech, analytics).",
    "• Workload and work-life balance varying by account and project.",
    "Overall sentiment is usually mid-to-positive, with both positives (learning, exposure) and some typical service-industry challenges."
  ],

  "is indegene a good company to work for": [
    "Many employees describe Indegene as a good place for learning, especially early in their career or when shifting into life sciences and healthcare-tech.",
    "Pros commonly mentioned: exposure to global pharma clients, variety of projects, domain learning.",
    "Challenges mentioned: workload and timelines can be demanding depending on the project.",
    "As always, experience depends a lot on specific team, role, and manager."
  ],

  "indegene work from home": [
    "Indegene has used hybrid and remote models depending on role, project, and time period.",
    "Policies can change, so exact work-from-home flexibility depends on the business unit, client requirements, and current company policy.",
    "For the most accurate picture, candidates should check with HR or the hiring manager during the interview process."
  ],

  "indegene work life balance": [
    "Work-life balance at Indegene is typically described as manageable to challenging, depending heavily on:",
    "• Client deadlines.",
    "• Type of project (operations vs. project-based).",
    "• Specific team and manager.",
    "Some roles have more predictable hours, others can be fast-paced with peaks during launches or key milestones."
  ],

  /* =====================================================
     CAREERS, ROLES & INTERVIEWS
  ====================================================== */

  "indegene careers": [
    "Indegene hires across multiple profiles, including:",
    "• Medical writers, scientific writers, and medical information specialists.",
    "• Pharmacovigilance and safety operations specialists.",
    "• Data analysts, data scientists, and BI/analytics professionals.",
    "• Software engineers, full-stack developers, and platform engineers.",
    "• Marketing operations, campaign managers, project/program managers.",
    "Requirements vary by role, but interest in life sciences and technology is a common theme."
  ],

  "indegene jobs for freshers": [
    "For freshers, Indegene may offer entry-level roles in areas like:",
    "• Medical writing or scientific content (for pharmacy/life sciences grads).",
    "• Operations/coordination roles in commercial or medical projects.",
    "• Junior data/analytics or technology roles (for CS/IT/Data backgrounds).",
    "Actual openings change over time; candidates should check the careers page or job portals for current positions."
  ],

  "indegene interview process": [
    "Indegene's interview process depends on the role but usually involves:",
    "• Resume screening.",
    "• 1–2 rounds of technical/functional discussion (e.g., medical/clinical, analytics, or development).",
    "• Managerial or HR discussions on fit, expectations, and compensation.",
    "Some roles may include written tests or case studies, especially for writing or analytics."
  ],

  "skills required for indegene": [
    "Typical skills that help for roles at Indegene include:",
    "• For medical/writing roles: strong scientific background, good written English, understanding of pharma/clinical concepts.",
    "• For analytics roles: SQL/Excel, data visualization, statistics, and domain awareness.",
    "• For tech roles: solid coding fundamentals, web technologies, APIs, cloud concepts, and interest in healthcare use cases.",
    "Soft skills: communication, client interaction, teamwork, and ability to work in a process-driven environment."
  ],

  /* =====================================================
     POSITIONING & PURPOSE
  ====================================================== */

  "indegene future ready healthcare": [
    "Future ready healthcare is a core theme at Indegene.",
    "It means using digital, data, AI, and new operating models to help life sciences companies prepare for how healthcare will work in the future, not just today."
  ],

  "why do companies work with indegene": [
    "Life sciences companies work with Indegene because it:",
    "• Has deep domain knowledge in pharma and healthcare.",
    "• Combines that with technology, data, and analytics.",
    "• Offers scalable delivery teams and proven processes.",
    "• Helps improve speed to market, compliance, and commercial effectiveness."
  ],

  /* =====================================================
     INDEGENE – WHO WE ARE / ABOUT US (EXTRA)
  ====================================================== */

  "indegene who we are": [
    "Indegene Limited is a tech-native life sciences specialist that orchestrates the path from commercialization strategy through execution.",
    "It is trusted by many top global biopharmaceutical companies for digital, data, and operations-led transformation."
  ],

  "indegene about us": [
    "Indegene positions itself as a digital-first life sciences commercialization company with deep domain expertise and technology capabilities.",
    "It combines consulting, operations, and platforms to help life sciences organizations become more efficient and future ready."
  ],

  "indegene our story": [
    "Indegene began in 1998 when its founders came together in Bengaluru to build a technology-led healthcare solutions company.",
    "Over more than two decades, it has grown through new capabilities and acquisitions into a global life sciences partner."
  ],

  "indegene history overview": [
    "Indegene was founded in 1998 and has expanded via acquisitions in medical education, multichannel marketing, real-world evidence, and consulting.",
    "It now operates as a global company serving life sciences clients across North America, Europe, and Asia-Pacific."
  ],

  "indegene global presence": [
    "Indegene has offices and delivery centers in India, the United States, Europe, and the Asia-Pacific region.",
    "Its global footprint supports around-the-clock delivery for multinational life sciences companies."
  ],

  "indegene locations worldwide": [
    "Key Indegene locations include India (headquarters in Bengaluru) along with offices in the US, EU, and APAC.",
    "These centers host delivery teams for medical, commercial, technology, and analytics work."
  ],

  "indegene employees 2024": [
    "As of around FY24, Indegene employs more than 5,000 people globally across medical, scientific, technology, analytics, and operations roles.",
    "The workforce spans doctors, pharmacists, scientists, engineers, analysts, and commercial specialists."
  ],

  /* =====================================================
     INDEGENE – WHAT WE DO / WHO WE SERVE (EXTRA)
  ====================================================== */

  "indegene what we do": [
    "Indegene orchestrates life sciences commercialization from strategy through execution.",
    "It supports clients with omnichannel commercial operations, medical and regulatory services, clinical and evidence support, and technology solutions."
  ],

  "indegene who we serve": [
    "Indegene serves biopharmaceutical companies, emerging biotech firms, and medical device and diagnostics manufacturers.",
    "It helps these clients scale commercial operations, medical affairs, and evidence functions using digital and data-driven approaches."
  ],

  "indegene biopharmaceutical focus": [
    "For biopharmaceutical clients, Indegene focuses on modular content operations, omnichannel campaign management, field force support, medical affairs, and evidence generation.",
    "The aim is to speed up launches and improve brand performance across markets."
  ],

  "indegene consulting practice": [
    "Indegene runs an integrated consulting practice that combines strategy, operating model design, and hands-on transformation execution.",
    "Consulting engagements often focus on omnichannel, data platforms, GenAI adoption, and operating model redesign in life sciences."
  ],

  "indegene consulting practice 2025": [
    "By 2025, Indegene strengthened its consulting practice to accelerate life sciences transformation in areas like commercial, medical, and technology modernization.",
    "Consultants work closely with operations and technology teams so recommendations can be executed at scale."
  ],

  /* =====================================================
     INDEGENE – TECHNOLOGY, PLATFORMS & AI (EXTRA)
  ====================================================== */

  "indegene technology solutions": [
    "Indegene offers life sciences technology solutions including AI-first platforms, digital engineering, cloud and data services, and integration with existing client systems.",
    "It helps clients modernize tech stacks, build data lakes, and implement scalable, compliant solutions."
  ],

  "indegene life sciences technology solutions": [
    "Indegene’s technology portfolio spans platform services, data and analytics, product engineering, and managed services tailored for life sciences.",
    "Solutions are designed to meet regulatory requirements while improving speed, scalability, and automation."
  ],

  "indegene next platforms": [
    "NEXT is a suite of Indegene technology platforms that apply AI, NLP, and machine vision to life sciences workflows.",
    "They support content modularization, customer data unification, journey analytics, next-best-action recommendations, and pharmacovigilance automation."
  ],

  "indegene next technology platforms": [
    "NEXT technology platforms help automate repetitive processes like content tagging, channel orchestration, and safety case processing.",
    "They are built to plug into CRM, marketing automation, and safety systems used by life sciences organizations."
  ],

  "indegene ai use cases": [
    "Indegene applies AI and ML to use cases such as HCP engagement recommendations, content modularization, PV signal detection support, demand forecasting, and field force optimization.",
    "It also uses AI for insight generation from unstructured medical and commercial data."
  ],

  "indegene genai at work": [
    "Indegene runs an internal initiative often described as GenAI at work to embed generative AI into day-to-day tasks for employees.",
    "This includes using GenAI for email drafting, document summarization, scientific content assistance, coding support, and internal knowledge retrieval."
  ],

  "indegene microsoft copilot": [
    "Indegene uses Microsoft 365 Copilot to improve productivity in Word, Excel, PowerPoint, Outlook, and Teams.",
    "Copilot helps teams with summarizing documents, generating content drafts, analyzing data, and speeding up proposal and RFP creation while respecting data privacy controls."
  ],

  "indegene genai client solutions": [
    "For clients, Indegene uses GenAI to streamline medical and regulatory submissions, accelerate medico-legal review cycles, and create more personalized omnichannel engagement.",
    "Its GenAI solutions are designed to be compliant, explainable, and aligned with life sciences quality standards."
  ],

  "indegene technology stack view": [
    "Indegene typically works on top of established life sciences platforms such as CRMs, marketing automation tools, and safety systems, adding AI, analytics, and custom workflows.",
    "Its approach is to integrate with client ecosystems rather than replace core systems entirely."
  ],

  /* =====================================================
     INDEGENE – FUTURE READY HEALTHCARE & THOUGHT LEADERSHIP (EXTRA)
  ====================================================== */

  "indegene future ready healthcare details": [
    "Future ready healthcare is Indegene’s core purpose and brand positioning.",
    "It means enabling healthcare organizations to respond better to disruption by using digital, data, AI, and agile operating models across commercial, medical, and clinical functions."
  ],

  "indegene digital summit": [
    "Indegene hosts Digital Summit events that bring together leaders from pharma, biotech, and technology to discuss future ready healthcare.",
    "Topics typically include omnichannel engagement, data and AI in life sciences, GenAI, and evolving commercialization models."
  ],

  "indegene metaverse": [
    "Indegene has explored how metaverse-style immersive experiences can be used for medical education, HCP engagement, and patient support.",
    "Its thought leadership highlights both the opportunities and the practical limitations for metaverse adoption in healthcare."
  ],

  "indegene thought leadership topics": [
    "Indegene regularly publishes reports and blogs on topics such as GenAI in life sciences, Customer 360, omnichannel best practices, medical affairs transformation, and future ready healthcare.",
    "These insights are meant to help pharma and biotech leaders benchmark their capabilities and plan transformation roadmaps."
  ],

  "indegene customer 360": [
    "Indegene advocates for a Customer 360 or single HCP view to enable smarter omnichannel marketing.",
    "By unifying data from CRM, marketing, events, and other touchpoints, companies can deliver more personalized and compliant engagement."
  ],

  "indegene agentforce starter kit": [
    "Indegene’s Agentforce-style starter kits describe how life sciences companies can safely deploy AI agents for tasks like content query handling, insights generation, and internal support.",
    "They focus on governance, data quality, security, and clear business use cases for AI agents."
  ],

  /* =====================================================
     INDEGENE – AWARDS, RECOGNITION & ANALYST REPORTS (EXTRA)
  ====================================================== */

  "indegene awards and recognition": [
    "Indegene has been recognized by industry analysts and media for its role in life sciences digital services and operations.",
    "Past recognitions include mentions as a good place to work and as a leader in digital commercialization services."
  ],

  "indegene isg leader 2025": [
    "In 2025, Indegene was identified as a Leader in ISG Provider Lens evaluations for life sciences digital services in commercial operations.",
    "This reflects strong capabilities and client feedback in digital commercial transformation."
  ],

  /* =====================================================
     INDEGENE – CAREERS, RECRUITMENT & SECURITY (EXTRA)
  ====================================================== */

  "indegene careers site": [
    "The official Indegene careers portal lists current openings across functions like medical, safety, analytics, technology, and operations.",
    "The site emphasizes that Indegene is a place to work on challenging problems at the intersection of healthcare and technology."
  ],

  "indegene recruitment fraud warning": [
    "Indegene warns candidates about recruitment fraud and clearly states that it does not charge any fees for job offers.",
    "Suspicious emails are to be reported to the official incident response mailbox, and candidates are advised not to pay money or share sensitive data with unofficial contacts."
  ],

  "indegene security and privacy": [
    "Indegene highlights data security, patient privacy, and regulatory compliance as core to its solutions.",
    "This is especially important when working with GenAI, customer data, safety information, and regulated medical content."
  ],

  /* =====================================================
     INDEGENE – CONTACT & GENERAL INFO (EXTRA)
  ====================================================== */

  "indegene contact": [
    "Indegene’s official website provides contact forms and regional office details for business inquiries, partnerships, and media queries.",
    "Clients and prospects can reach out via the contact page for commercial, medical, or technology-related discussions."
  ],

  "indegene tagline summary": [
    "A simple way to describe Indegene is: a digital-first, tech-native life sciences commercialization partner.",
    "It helps make pharma, biotech, and medical device companies more data-driven, efficient, and future ready."
  ],

  /* =====================================================
     QUICK LINKS
  ====================================================== */

  "quick links": [
    "Indegene Home — https://www.indegene.com/",
    "Careers — https://careers.indegene.com/",
    "Case Studies & Insights — https://www.indegene.com/what-we-think/case-studies",
    "Contact Us — https://www.indegene.com/contact-us",
    "Investor Relations (IR) — https://ir.indegene.com/",
    "Corporate Social Responsibility (CSR) Policy — https://resources.indegene.com/indegene/pdf/policies/corporate-social-responsibility-policy.pdf",
    "Leadership / Who We Are — https://www.indegene.com/who-we-are/leadership",
    "NEXT Platforms (technology) — https://www.indegene.com/what-we-do/next-platforms",
    "Privacy & Security — https://www.indegene.com/privacy-policy"
  ],

  /* =====================================================
     EXISTING SKYSECURE + MEDICAL CONTENT
  ====================================================== */

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
    "Signs: Lump, nipple inversion, peau dorange, discharge, pain, axillary nodes.",
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
    "Indegene drove incremental sales for a breast cancer oncology drug via omnichannel HCP targeting.",
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
  ],

  /* =====================================================
     INDEGENE – STRATEGIC PARTNERSHIPS & COLLABORATIONS
  ====================================================== */

  "indegene microsoft partnership": [
    "In July 2024, Indegene announced a strategic collaboration with Microsoft to help life sciences companies scale up the adoption of Generative AI.",
    "This partnership aims to drive faster innovation at scale and accelerate business impact for pharmaceutical and biotech organizations.",
    "The collaboration focuses on leveraging Microsoft's AI capabilities combined with Indegene's life sciences domain expertise."
  ],

  "indegene microsoft collaboration": [
    "Indegene and Microsoft have partnered to enable life sciences companies to adopt Generative AI solutions more effectively.",
    "The partnership combines Microsoft's cloud and AI infrastructure with Indegene's commercialization expertise.",
    "This helps pharma companies accelerate digital transformation and improve operational efficiency."
  ],

  "indegene strategic partnerships": [
    "Indegene has formed strategic alliances to enhance its service offerings and technology capabilities.",
    "Key partnerships include collaborations with Microsoft for GenAI adoption, technology platform providers, and industry leaders.",
    "These partnerships help Indegene deliver integrated solutions that combine domain expertise with cutting-edge technology."
  ],

  /* =====================================================
     INDEGENE – ACQUISITIONS & GROWTH
  ====================================================== */

  "indegene acquisitions": [
    "Indegene has expanded its capabilities through strategic acquisitions over the years.",
    "In October 2025, Indegene acquired BioPharm Communications, a specialized marketing services agency, to strengthen its commercialization portfolio with AdTech solutions.",
    "Other acquisitions have included companies in medical education, multichannel marketing, real-world evidence, and consulting to build comprehensive life sciences capabilities."
  ],

  "indegene biopharm communications": [
    "Indegene acquired BioPharm Communications in October 2025 to enhance its commercialization services.",
    "This acquisition added AdTech (Advertising Technology) solutions to Indegene's portfolio.",
    "BioPharm Communications specialized in marketing services for life sciences companies, complementing Indegene's existing commercial operations."
  ],

  "indegene growth strategy": [
    "Indegene's growth strategy focuses on organic expansion and strategic acquisitions.",
    "The company has expanded through acquisitions in medical education, multichannel marketing, RWE, consulting, and AdTech.",
    "This approach allows Indegene to rapidly build comprehensive capabilities across the life sciences value chain."
  ],

  /* =====================================================
     INDEGENE – GLOBAL PRESENCE & OFFICES
  ====================================================== */

  "indegene offices": [
    "Indegene has offices and delivery centers across key healthcare markets globally.",
    "Locations include: United States, United Kingdom, China, India (headquarters in Bengaluru), Australia, and other regions in North America, Latin America, Europe, and Asia-Pacific.",
    "These offices support around-the-clock delivery for multinational life sciences companies."
  ],

  "indegene locations": [
    "Indegene operates globally with presence in:",
    "• North America: United States (multiple locations)",
    "• Europe: United Kingdom and other European countries",
    "• Asia-Pacific: India (Bengaluru headquarters), China, Australia",
    "• Latin America: Regional presence",
    "This global footprint enables 24/7 delivery and support for international clients."
  ],

  "indegene bangalore": [
    "Indegene's global headquarters is located in Bengaluru (Bangalore), Karnataka, India.",
    "Bengaluru serves as the primary hub for technology, operations, and strategic leadership.",
    "The city's tech ecosystem and talent pool support Indegene's digital-first approach to life sciences."
  ],

  "indegene us offices": [
    "Indegene has multiple offices in the United States to serve North American clients.",
    "US locations support commercial operations, medical affairs, clinical services, and client engagement.",
    "These offices work closely with the India delivery centers to provide seamless global service delivery."
  ],

  /* =====================================================
     INDEGENE – COMPREHENSIVE SERVICE PORTFOLIO
  ====================================================== */

  "indegene service portfolio": [
    "Indegene's comprehensive service portfolio includes:",
    "• Medical and Regulatory Solutions: Medical information, publications, regulatory affairs, pharmacovigilance",
    "• Commercial Solutions: Omnichannel marketing, content operations, field force support, marketing analytics",
    "• Clinical and Evidence Services: Real-world evidence, clinical operations, data analytics",
    "• Technology Solutions: AI platforms, digital engineering, cloud services, data management",
    "• Training Services: Medical education, HCP training, compliance training",
    "• Competitive and Business Intelligence: Market research, competitive analysis, business insights"
  ],

  "indegene medical regulatory solutions": [
    "Indegene's medical and regulatory solutions encompass:",
    "• Medical Information: Inquiry handling, response management, medical content development",
    "• Publications: Scientific writing, publication planning, manuscript development",
    "• Regulatory Affairs: Regulatory intelligence, submission support, compliance",
    "• Pharmacovigilance: Safety operations, adverse event monitoring, signal detection",
    "• Medical Review: MLR support, medical-legal review, content approval workflows"
  ],

  "indegene training services": [
    "Indegene provides comprehensive training services including:",
    "• Medical Education: HCP training programs, scientific education, therapeutic area training",
    "• Compliance Training: Regulatory compliance, good practices training, quality standards",
    "• Commercial Training: Product training, sales force training, marketing education",
    "• Digital Training: E-learning modules, virtual training platforms, interactive content"
  ],

  "indegene competitive intelligence": [
    "Indegene offers competitive and business intelligence services:",
    "• Market Research: Industry analysis, market sizing, trend identification",
    "• Competitive Analysis: Competitor profiling, market positioning, strategy assessment",
    "• Business Intelligence: Data analytics, insights generation, strategic recommendations",
    "• Market Monitoring: Real-time tracking, alert systems, competitive landscape updates"
  ],

  /* =====================================================
     INDEGENE – TECHNOLOGY & DIGITAL TRANSFORMATION
  ====================================================== */

  "indegene digital transformation": [
    "Indegene helps life sciences companies with digital transformation by:",
    "• Modernizing technology stacks and integrating legacy systems",
    "• Implementing AI and automation to improve efficiency",
    "• Building data platforms and analytics capabilities",
    "• Creating digital-first operating models",
    "• Enabling cloud-based solutions for scalability and compliance"
  ],

  "indegene cloud services": [
    "Indegene provides cloud and data services including:",
    "• Cloud infrastructure setup and migration",
    "• Data lake and data warehouse implementation",
    "• Cloud-based analytics platforms",
    "• Secure, compliant cloud solutions for life sciences",
    "• Integration with existing client systems and platforms"
  ],

  "indegene data analytics": [
    "Indegene's data analytics capabilities include:",
    "• Real-world evidence (RWE) generation and analysis",
    "• Commercial analytics: Sales, marketing, and HCP engagement analytics",
    "• Clinical analytics: Trial data analysis, outcomes research",
    "• Predictive analytics: Forecasting, demand planning, risk assessment",
    "• Business intelligence dashboards and reporting"
  ],

  "indegene automation": [
    "Indegene leverages automation across multiple areas:",
    "• Content automation: Modular content creation, tagging, and management",
    "• Process automation: Workflow automation, approval processes, routine tasks",
    "• AI-powered automation: Intelligent document processing, data extraction, insights generation",
    "• Marketing automation: Campaign orchestration, channel optimization, personalization",
    "• Safety automation: Case processing, signal detection, reporting"
  ],

  /* =====================================================
     INDEGENE – NEXT PLATFORMS DETAILED
  ====================================================== */

  "indegene next platform suite": [
    "NEXT is Indegene's comprehensive suite of AI-powered technology platforms:",
    "• NEXT Content: Content modularization and management",
    "• NEXT Customer: Customer data unification and 360-degree view",
    "• NEXT Journey: Customer journey analytics and optimization",
    "• NEXT Action: Next-best-action recommendations for HCP engagement",
    "• NEXT Safety: Pharmacovigilance automation and signal detection",
    "These platforms integrate with existing CRM, marketing, and safety systems."
  ],

  "indegene next content": [
    "NEXT Content platform enables:",
    "• Content modularization: Break down content into reusable components",
    "• Automated tagging: AI-powered content categorization and metadata",
    "• Multi-channel adaptation: Adapt content for different channels and formats",
    "• Version control: Track content versions and approvals",
    "• Compliance management: Ensure content meets regulatory requirements"
  ],

  "indegene next customer": [
    "NEXT Customer platform provides:",
    "• Customer 360: Unified view of HCPs across all touchpoints",
    "• Data unification: Integrate data from CRM, marketing, events, and other sources",
    "• Segmentation: Advanced HCP segmentation and targeting",
    "• Profile management: Comprehensive HCP profiles and preferences",
    "• Data quality: Clean, deduplicated, and enriched customer data"
  ],

  "indegene next journey": [
    "NEXT Journey platform offers:",
    "• Journey mapping: Visualize and analyze customer journeys",
    "• Journey analytics: Track engagement across touchpoints",
    "• Channel optimization: Identify most effective channels and timing",
    "• Journey orchestration: Coordinate multi-channel interactions",
    "• Performance measurement: Measure journey effectiveness and ROI"
  ],

  "indegene next action": [
    "NEXT Action platform provides:",
    "• Next-best-action recommendations: AI-powered suggestions for HCP engagement",
    "• Explainable AI: Transparent reasoning using SHAP values",
    "• Contextual recommendations: Personalized based on HCP profile and history",
    "• Integration: Works with Veeva CRM and other platforms",
    "• Impact: 10-15% increase in leads, 70% rep adoption, 15-20% reduction in manual validation"
  ],

  "indegene next safety": [
    "NEXT Safety platform enables:",
    "• Automated case processing: Streamline adverse event case handling",
    "• Signal detection: AI-powered identification of safety signals",
    "• Compliance automation: Automated regulatory reporting",
    "• Quality checks: Built-in validation and quality assurance",
    "• Integration: Connects with safety databases and systems"
  ],

  /* =====================================================
     INDEGENE – GENAI & AI CAPABILITIES
  ====================================================== */

  "indegene generative ai": [
    "Indegene's Generative AI capabilities include:",
    "• Content generation: Draft medical content, summaries, and communications",
    "• Document processing: Extract insights from unstructured documents",
    "• Query handling: Intelligent responses to medical information queries",
    "• Personalization: Generate personalized content for HCPs",
    "• Compliance: GenAI solutions designed to meet life sciences quality standards"
  ],

  "indegene genai adoption": [
    "Indegene helps life sciences companies adopt GenAI by:",
    "• Providing GenAI starter kits and frameworks",
    "• Ensuring compliance and explainability",
    "• Integrating GenAI into existing workflows",
    "• Training teams on GenAI tools and best practices",
    "• Measuring impact and ROI of GenAI implementations"
  ],

  "indegene ai platforms": [
    "Indegene offers AI-first platforms that include:",
    "• Machine learning models for HCP engagement",
    "• Natural language processing for document analysis",
    "• Computer vision for image and document processing",
    "• Predictive analytics for forecasting and planning",
    "• Explainable AI for transparent decision-making"
  ],

  "indegene machine learning": [
    "Indegene applies machine learning across multiple use cases:",
    "• HCP engagement recommendations with explainable AI",
    "• Content optimization and personalization",
    "• Demand forecasting and planning",
    "• Safety signal detection",
    "• Customer segmentation and targeting",
    "• Predictive analytics for commercial and clinical outcomes"
  ],

  /* =====================================================
     INDEGENE – SUSTAINABILITY & CSR
  ====================================================== */

  "indegene sustainability": [
    "Indegene is committed to sustainability and corporate social responsibility.",
    "The company publishes annual sustainability reports covering environmental, social, and governance (ESG) initiatives.",
    "Key focus areas include: environmental impact reduction, employee well-being, community engagement, and ethical business practices.",
    "Indegene integrates sustainability into its operations and client solutions."
  ],

  "indegene csr initiatives": [
    "Indegene's Corporate Social Responsibility initiatives include:",
    "• Community health programs and medical education",
    "• Environmental sustainability efforts",
    "• Employee development and well-being programs",
    "• Ethical business practices and governance",
    "• Support for healthcare access and education",
    "Details are available in the CSR Policy document."
  ],

  "csr policy": [
    "Indegene's Corporate Social Responsibility (CSR) Policy outlines the company's commitment to sustainable business practices and social impact.",
    "The CSR Policy covers:",
    "• Community health programs and medical education initiatives",
    "• Environmental sustainability and carbon footprint reduction",
    "• Employee development, well-being, and diversity programs",
    "• Ethical business practices and corporate governance",
    "• Support for healthcare access and education",
    "The full CSR Policy document is available as a PDF for detailed information on Indegene's social responsibility framework and initiatives."
  ],

  "csr policies": [
    "Indegene's Corporate Social Responsibility (CSR) policies demonstrate the company's commitment to sustainable business practices and social impact.",
    "The CSR policies cover:",
    "• Community health programs and medical education initiatives",
    "• Environmental sustainability and carbon footprint reduction",
    "• Employee development, well-being, and diversity programs",
    "• Ethical business practices and corporate governance",
    "• Support for healthcare access and education",
    "The full CSR Policy document is available as a PDF for detailed information on Indegene's social responsibility framework and initiatives."
  ],

  "indegene csr policy": [
    "Indegene's Corporate Social Responsibility (CSR) Policy demonstrates the company's commitment to making a positive social and environmental impact.",
    "Key areas covered in the CSR Policy include community health programs, environmental sustainability, employee well-being, ethical business practices, and support for healthcare access and education.",
    "The policy document provides comprehensive details on Indegene's CSR framework, initiatives, and annual reporting practices."
  ],

  "indegene csr policies": [
    "Indegene's Corporate Social Responsibility (CSR) policies demonstrate the company's commitment to making a positive social and environmental impact.",
    "Key areas covered in the CSR policies include community health programs, environmental sustainability, employee well-being, ethical business practices, and support for healthcare access and education.",
    "The policy documents provide comprehensive details on Indegene's CSR framework, initiatives, and annual reporting practices."
  ],

  "indegene esg": [
    "Indegene focuses on Environmental, Social, and Governance (ESG) factors:",
    "• Environmental: Reducing carbon footprint, sustainable operations",
    "• Social: Employee welfare, community engagement, diversity and inclusion",
    "• Governance: Ethical practices, transparency, compliance",
    "The company publishes annual sustainability reports detailing ESG performance and initiatives."
  ],

  /* =====================================================
     INDEGENE – INDUSTRY RECOGNITION & AWARDS
  ====================================================== */

  "indegene industry recognition": [
    "Indegene has received recognition from industry analysts and organizations:",
    "• ISG Provider Lens Leader (2025) for life sciences digital services in commercial operations",
    "• Recognized as a leader in digital commercialization services",
    "• Acknowledged for innovation in life sciences technology and operations",
    "• Recognized workplace culture and employee engagement"
  ],

  "indegene isg recognition": [
    "In 2025, Indegene was identified as a Leader in ISG Provider Lens evaluations.",
    "The recognition was specifically for life sciences digital services in commercial operations.",
    "This reflects strong capabilities, client feedback, and proven results in digital commercial transformation.",
    "ISG Provider Lens is a respected industry evaluation framework for technology and service providers."
  ],

  "indegene awards": [
    "Indegene has received various awards and recognitions including:",
    "• Industry analyst recognition for digital services leadership",
    "• Workplace culture and employee engagement awards",
    "• Innovation awards for technology solutions",
    "• Client satisfaction and partnership awards",
    "These recognitions validate Indegene's position as a trusted partner in life sciences."
  ],

  /* =====================================================
     INDEGENE – THERAPEUTIC AREAS & EXPERTISE
  ====================================================== */

  "indegene therapeutic areas": [
    "Indegene has expertise across multiple therapeutic areas:",
    "• Oncology: Cancer treatments, supportive care, clinical trials",
    "• Cardiovascular: Heart disease, hypertension, cardiac care",
    "• Endocrinology: Diabetes, metabolic disorders, hormone therapies",
    "• Neurology: Neurological disorders, CNS conditions",
    "• Ophthalmology: Eye diseases, vision care",
    "• Dermatology: Skin conditions, dermatological treatments",
    "• Rare Diseases: Orphan drugs, specialized treatments"
  ],

  "indegene oncology expertise": [
    "Indegene has deep expertise in oncology including:",
    "• Medical communications: Publications, abstracts, MSL decks",
    "• Commercial support: Sales enablement, HCP engagement",
    "• Clinical support: Trial operations, data management",
    "• Case studies demonstrate success in driving incremental sales and improving medical information support",
    "• Experience across various cancer types: breast cancer, hematological malignancies, solid tumors"
  ],

  "indegene cardiovascular expertise": [
    "Indegene provides services in cardiovascular therapeutic areas:",
    "• Medical affairs support for cardiovascular drugs",
    "• Clinical evidence generation and RWE studies",
    "• Commercial operations for cardiovascular brands",
    "• Expertise in adult congenital heart disease, hypertension, heart failure, and other CV conditions"
  ],

  /* =====================================================
     INDEGENE – CLIENT SUCCESS & CASE STUDIES
  ====================================================== */

  "indegene client success": [
    "Indegene has delivered measurable results for clients:",
    "• >30% faster turnaround times in medical communications",
    "• >80% first submission acceptance rates",
    "• $14.2M incremental sales for oncology brands",
    "• 10-15% increase in leads through AI-powered recommendations",
    "• 70% rep adoption of AI recommendations",
    "• 15-20% reduction in manual validation efforts",
    "• Average CSAT scores of 4.0+ across multiple engagements"
  ],

  "indegene case studies": [
    "Indegene has published numerous case studies demonstrating success:",
    "• Oncology: Medical communications support, incremental sales growth",
    "• Hemato-oncology: End-to-end medical communications across US, Europe, APAC",
    "• Commercial: Omnichannel HCP engagement and sales growth",
    "• Technology: AI-powered recommendation engines and automation",
    "Case studies are available on the Indegene website and in the knowledge management system."
  ],

  "indegene roi": [
    "Indegene delivers measurable ROI for clients through:",
    "• Faster time-to-market for products and campaigns",
    "• Increased sales and market share",
    "• Reduced operational costs through automation",
    "• Improved compliance and quality",
    "• Enhanced HCP engagement and satisfaction",
    "• Better resource utilization and efficiency"
  ],

  /* =====================================================
     INDEGENE – COMPLIANCE & QUALITY
  ====================================================== */

  "indegene compliance": [
    "Indegene maintains strict compliance standards:",
    "• Regulatory compliance: FDA, EMA, and other health authority requirements",
    "• Quality certifications: CMMI, ISO standards, industry best practices",
    "• Data security: HIPAA, GDPR, and other data protection regulations",
    "• Medical-legal review: MLR processes and approval workflows",
    "• Audit readiness: Continuous monitoring and quality assurance"
  ],

  "indegene quality standards": [
    "Indegene adheres to high quality standards:",
    "• CMMI certification for process maturity",
    "• ISO standards for quality management",
    "• Industry best practices: GPP4, ICMJE guidelines for publications",
    "• Quality metrics tracking and reporting",
    "• Continuous improvement processes",
    "• Quality assurance at every stage of service delivery"
  ],

  "indegene data security": [
    "Indegene prioritizes data security and privacy:",
    "• HIPAA compliance for healthcare data",
    "• GDPR compliance for European data",
    "• SOC 2 and other security certifications",
    "• Secure cloud infrastructure",
    "• Data encryption and access controls",
    "• Regular security audits and assessments",
    "• Patient privacy protection in all operations"
  ],

  "privacy policy": [
    "Indegene's Privacy Policy outlines how the company collects, uses, protects, and manages personal information and data.",
    "The Privacy Policy covers:",
    "• Data collection and usage practices",
    "• Data security measures and encryption",
    "• Compliance with privacy regulations (HIPAA, GDPR, etc.)",
    "• Patient privacy protection",
    "• User rights and data access controls",
    "• Cookie and tracking technology usage",
    "The full Privacy Policy document is available on Indegene's website and provides comprehensive details on data privacy and security practices."
  ],

  "privacy policies": [
    "Indegene's privacy policies demonstrate the company's commitment to protecting personal information and data privacy.",
    "The privacy policies cover:",
    "• Data collection and usage practices",
    "• Data security measures and encryption",
    "• Compliance with privacy regulations (HIPAA, GDPR, etc.)",
    "• Patient privacy protection",
    "• User rights and data access controls",
    "• Cookie and tracking technology usage",
    "The full Privacy Policy document is available on Indegene's website and provides comprehensive details on data privacy and security practices."
  ],

  "indegene privacy policy": [
    "Indegene's Privacy Policy demonstrates the company's commitment to protecting personal information and data privacy.",
    "The policy covers data collection, usage, security measures, compliance with privacy regulations (HIPAA, GDPR), patient privacy protection, and user rights.",
    "Indegene follows industry best practices for data security and privacy, ensuring compliance with healthcare data protection standards and international privacy regulations."
  ],

  "indegene privacy policies": [
    "Indegene's privacy policies demonstrate the company's commitment to protecting personal information and data privacy.",
    "The policies cover data collection, usage, security measures, compliance with privacy regulations (HIPAA, GDPR), patient privacy protection, and user rights.",
    "Indegene follows industry best practices for data security and privacy, ensuring compliance with healthcare data protection standards and international privacy regulations."
  ],

  /* =====================================================
     INDEGENE – RETENTION POLICY / ARCHIVAL POLICY
  ====================================================== */

  "retention policy": [
    "Indegene's Policy on Preservation of Records/Archival Policy outlines the company's document retention and archival procedures.",
    "The policy is formulated in accordance with SEBI (Listing Obligations and Disclosure Requirements) Regulation, 2015 and the Companies Act, 2013.",
    "Key aspects of the retention policy include:",
    "• Documents are classified into mandatory (under governing laws) and non-mandatory categories",
    "• Documents may be preserved permanently or for a minimum period of eight years after completion of transactions",
    "• Documents can be stored in electronic mode",
    "• Website disclosures must be maintained for a minimum period of five years under Listing Regulations",
    "• The policy covers preservation of Board/Committee meeting records, general meeting records, contracts, legal documents, financial records, and more",
    "The full Policy on Preservation of Records/Archival Policy document (Document ID: LG_P_011, Version 4.0, Effective Date: 28th April 2025) is available at: https://ir.indegene.com/media/a4fl0eab/policy-on-preservation-of-records-archival-policy-on-website.pdf"
  ],

  "indegene retention policy": [
    "Indegene's Policy on Preservation of Records/Archival Policy (Document ID: LG_P_011, Version 4.0) establishes guidelines for document retention and archival.",
    "The policy ensures compliance with SEBI Listing Regulations and the Companies Act, 2013.",
    "Documents are preserved considering their importance, usefulness, and information value, with some documents requiring permanent preservation and others maintained for a minimum of eight years.",
    "The policy also specifies that disclosures made to stock exchanges must be hosted on the company website for a minimum period of five years."
  ],

  "archival policy": [
    "Indegene's Archival Policy (Policy on Preservation of Records) defines the process for preservation and archival of documents, including those maintained in electronic form and disclosed on the company website.",
    "The policy classifies documents into categories based on statutory requirements and business needs, with preservation periods ranging from permanent to eight years minimum.",
    "All employees are required to comply with the policy, and departmental heads are responsible for ensuring proper document preservation and archival procedures."
  ],

  "preservation of records": [
    "Indegene's Policy on Preservation of Records ensures systematic identification, categorization, maintenance, review, retention, and destruction of documents received or created in the course of business.",
    "The policy applies to all departments and covers both physical and electronic records, ensuring they are maintained with the same degree of confidentiality and care.",
    "Documents are preserved using methods such as department/function-wise, subject/topic-wise, or chronologically, with appropriate backup provisions for electronic records."
  ],

  "retention policies": [
    "Indegene's Policy on Preservation of Records/Archival Policy outlines the company's document retention and archival procedures.",
    "The policy is formulated in accordance with SEBI (Listing Obligations and Disclosure Requirements) Regulation, 2015 and the Companies Act, 2013.",
    "Key aspects of the retention policies include:",
    "• Documents are classified into mandatory (under governing laws) and non-mandatory categories",
    "• Documents may be preserved permanently or for a minimum period of eight years after completion of transactions",
    "• Documents can be stored in electronic mode",
    "• Website disclosures must be maintained for a minimum period of five years under Listing Regulations",
    "• The policy covers preservation of Board/Committee meeting records, general meeting records, contracts, legal documents, financial records, and more",
    "The full Policy on Preservation of Records/Archival Policy document (Document ID: LG_P_011, Version 4.0, Effective Date: 28th April 2025) is available at: https://ir.indegene.com/media/a4fl0eab/policy-on-preservation-of-records-archival-policy-on-website.pdf"
  ],

  "indegene retention policies": [
    "Indegene's Policy on Preservation of Records/Archival Policy (Document ID: LG_P_011, Version 4.0) establishes guidelines for document retention and archival.",
    "The policy ensures compliance with SEBI Listing Regulations and the Companies Act, 2013.",
    "Documents are preserved considering their importance, usefulness, and information value, with some documents requiring permanent preservation and others maintained for a minimum of eight years.",
    "The policy also specifies that disclosures made to stock exchanges must be hosted on the company website for a minimum period of five years."
  ],

  /* =====================================================
     INDEGENE – CAREER DEVELOPMENT & BENEFITS
  ====================================================== */

  "indegene career development": [
    "Indegene offers career development opportunities:",
    "• Learning and development programs",
    "• Cross-functional project exposure",
    "• Global client engagement",
    "• Technology and domain skill building",
    "• Mentorship and coaching",
    "• Internal mobility and growth paths",
    "• Certification and training support"
  ],

  "indegene employee benefits": [
    "Indegene provides comprehensive employee benefits:",
    "• Competitive compensation packages",
    "• Health and wellness programs",
    "• Flexible work arrangements (varies by role and project)",
    "• Learning and development opportunities",
    "• Global exposure and diverse projects",
    "• Collaborative work environment",
    "• Recognition and rewards programs"
  ],

  "indegene hiring process": [
    "Indegene's hiring process typically includes:",
    "• Resume screening and initial review",
    "• Technical/functional assessment (role-dependent)",
    "• Interviews with hiring managers and team members",
    "• HR discussion on fit, expectations, and compensation",
    "• Some roles may include case studies or written tests",
    "• Background verification and offer process",
    "The process is designed to assess both technical skills and cultural fit."
  ],

  /* =====================================================
     INDEGENE – CONTACT & BUSINESS INQUIRIES
  ====================================================== */

  "how to contact indegene": [
    "You can contact Indegene through:",
    "• Official website contact forms: https://www.indegene.com/contact-us",
    "• Regional office contacts (available on website)",
    "• Business inquiries: Commercial, medical, or technology-related discussions",
    "• Partnership inquiries: Strategic partnerships and collaborations",
    "• Media queries: Press and media relations",
    "• Career inquiries: Visit https://careers.indegene.com/"
  ],

  "indegene business inquiry": [
    "For business inquiries, Indegene can be reached:",
    "• Through the contact form on the official website",
    "• Via regional office contacts",
    "• For commercial services: Commercial operations and marketing",
    "• For medical services: Medical affairs and regulatory",
    "• For technology services: Digital transformation and platforms",
    "• For consulting: Strategic consulting and transformation"
  ],

  "indegene partnership": [
    "Indegene welcomes partnership opportunities:",
    "• Technology partnerships: Platform integrations, co-development",
    "• Service partnerships: Complementary service providers",
    "• Strategic alliances: Long-term collaborative relationships",
    "• Channel partnerships: Distribution and go-to-market partnerships",
    "Partnership inquiries can be made through the contact page on the Indegene website."
  ],

  /* =====================================================
     INDEGENE – INVESTOR RELATIONS
  ====================================================== */

  "indegene investor relations": [
    "Indegene Limited is a publicly listed company with active investor relations:",
    "• Investor relations website: https://ir.indegene.com/",
    "• Financial reports and earnings releases",
    "• Annual reports and corporate governance documents",
    "• Stock information and trading details",
    "• Investor presentations and webcasts",
    "• Contact information for investor inquiries"
  ],

  "indegene stock": [
    "Indegene Limited is publicly traded:",
    "• Listed on Indian stock exchanges",
    "• Stock information available on the investor relations website",
    "• Financial performance and quarterly results published regularly",
    "• Corporate governance and compliance information available",
    "For detailed stock information, visit https://ir.indegene.com/"
  ],

  "indegene financial performance": [
    "Indegene publishes financial performance regularly:",
    "• Quarterly earnings reports",
    "• Annual financial statements",
    "• Revenue growth and profitability metrics",
    "• Business segment performance",
    "• Strategic initiatives and investments",
    "All financial information is available on the investor relations website."
  ]
};

/* =========================================================
   INTERNAL QUERY HANDLER (Time, Date, Day + basic general)
======================================================== */
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
      minute: "2-digit"
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
      day: "numeric"
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

/* =========================================================
   OUT-OF-DOMAIN QUERY DETECTION
   Detects queries clearly outside Indegene/knowledge domain
======================================================== */
const isOutOfDomainQuery = (query: string): boolean => {
  const text = query.toLowerCase().trim();
  
  // Weather-related queries (comprehensive)
  const weatherKeywords = [
    "weather", "temperature", "forecast", "rain", "snow", "sunny", 
    "cloudy", "humidity", "wind", "climate", "storm", "hurricane",
    "weather today", "weather forecast", "what's the weather", 
    "how's the weather", "weather report"
  ];
  if (weatherKeywords.some(keyword => text.includes(keyword)) && 
      !text.includes("indegene") && !text.includes("treatment") && !text.includes("medical")) {
    return true;
  }

  // Sports-related queries (comprehensive)
  const sportsKeywords = [
    "sports", "football", "soccer", "basketball", "cricket", "baseball",
    "tennis", "golf", "match", "game", "score", "player", "team", "league",
    "who won", "who won the game", "who won the match", "what's the score",
    "score of the", "football match", "cricket match", "basketball game"
  ];
  if (sportsKeywords.some(keyword => text.includes(keyword)) && 
      !text.includes("indegene") && !text.includes("case study")) {
    return true;
  }

  // Entertainment queries (comprehensive)
  const entertainmentKeywords = [
    "movie", "film", "actor", "actress", "celebrity", "music", "song",
    "album", "tv show", "television", "netflix", "youtube video",
    "tell me about movies", "tell me about films", "tell me about music",
    "best movie", "best film", "movie recommendation", "film recommendation"
  ];
  if (entertainmentKeywords.some(keyword => text.includes(keyword)) &&
      !text.includes("indegene")) {
    return true;
  }

  // Recreational/personal activity requests (e.g., "i need to play", "i want to play")
  if ((text.includes("i need to") || text.includes("i want to") || text.includes("need to") || text.includes("want to")) &&
      (text.includes("play") || text.includes("game") || text.includes("sport") || text.includes("fun") || 
       text.includes("entertainment") || text.includes("hobby") || text.includes("recreation")) &&
      !text.includes("indegene") && !text.includes("work") && !text.includes("job") && !text.includes("career")) {
    return true;
  }

  // Personal financial requests unrelated to healthcare (e.g., "i need money for bike")
  if ((text.includes("i need money") || text.includes("need money") || text.includes("i want money")) &&
      (text.includes("for") || text.includes("to buy") || text.includes("to get")) &&
      !text.includes("cancer") && !text.includes("treatment") && !text.includes("disease") && 
      !text.includes("medical") && !text.includes("health") && !text.includes("hospital") &&
      !text.includes("indegene") && !text.includes("salary") && !text.includes("compensation")) {
    return true;
  }

  // Cooking/recipes (comprehensive)
  if ((text.includes("recipe") || text.includes("cook") || text.includes("how to make") ||
       text.includes("how to cook") || text.match(/recipe for/i) || 
       text.match(/how to cook \w+/i) || text.match(/recipe of/i)) &&
      !text.includes("indegene") && !text.includes("medical") && !text.includes("treatment")) {
    return true;
  }

  // General knowledge that's clearly not about Indegene
  // Only flag if it's clearly unrelated (no Indegene keywords)
  const unrelatedPatterns = [
    /^what is the (capital|population|currency|language|meaning) of/i,
    /^what's the (capital|population|currency|language) of/i,
    /capital of (france|india|usa|germany|china|japan|uk|england|spain|italy|brazil|australia|canada)/i,
    /^who won (the|a)/i,
    /^when did (world war|the war)/i,
    /^tell me about (cats|dogs|animals|plants|birds|trees|flowers|mountains|oceans|rivers|lakes)/i,
    /^what is (water|life|love|happiness|philosophy|earth|mars|jupiter|planet|f1|formula)/i,
    /meaning of (life|existence|universe)/i,
    /^who is the (president|prime minister|king|queen|leader) of/i,
    /^who is (president|prime minister|king|queen) of/i,
    /president of (india|usa|france|germany|china|japan|uk|england|spain|italy|brazil|australia|canada)/i,
    /prime minister of (india|usa|france|germany|china|japan|uk|england|spain|italy|brazil|australia|canada)/i,
    /^tell me about (cat|dog|bird|tree|flower|mountain|ocean|river|lake|animal|plant)/i
  ];
  if (unrelatedPatterns.some(pattern => pattern.test(text)) &&
      !text.includes("indegene") && !text.includes("skysecure") && 
      !text.includes("medical") && !text.includes("treatment") && !text.includes("health")) {
    return true;
  }

  // Political/general knowledge queries (including typos like "indai" for "india")
  // Check for country names or common misspellings
  const countryKeywords = ["india", "indai", "usa", "france", "germany", "china", "japan", "uk", "england", "spain", "italy"];
  if ((text.includes("president of") || text.includes("prime minister of") || 
       text.includes("king of") || text.includes("queen of")) &&
      (countryKeywords.some(country => text.includes(country)) || 
       text.match(/president of \w+/i) || text.match(/prime minister of \w+/i)) &&
      !text.includes("indegene") && !text.includes("ceo")) {
    return true;
  }

  // Sports personalities (F1, MotoGP, etc.)
  const sportsPersonalities = [
    "marquez", "marq marquez", "lewis hamilton", "max verstappen", 
    "messi", "ronaldo", "federer", "nadal", "djokovic"
  ];
  if (sportsPersonalities.some(name => text.includes(name)) &&
      !text.includes("indegene")) {
    return true;
  }

  // F1 / Formula 1 / Racing
  if ((text.includes("f1") || text.includes("formula 1") || text.includes("formula one") || 
       text.includes("racing") || text.includes("motogp")) &&
      !text.includes("indegene") && !text.includes("treatment")) {
    return true;
  }

  // Philosophical or abstract questions
  if ((text.includes("meaning of") || text.includes("what is the meaning")) &&
      !text.includes("indegene") && !text.includes("life sciences")) {
    return true;
  }

  // Basic science/astronomy questions unrelated to Indegene
  if ((text.includes("what is water") || text.includes("what is air") || 
       text.includes("what is fire") || text.includes("what is earth") ||
       text.includes("what is the sun") || text.includes("what is the moon")) &&
      !text.includes("indegene") && !text.includes("treatment") && !text.includes("medical")) {
    return true;
  }

  // Technology products unrelated to Indegene (unless specifically about Indegene's use)
  const techProducts = [
    "sharepoint", "excel", "word", "powerpoint", "outlook", "teams",
    "windows", "linux", "android", "ios", "javascript", "python", "java",
    "github", "git", "stackoverflow", "docker", "kubernetes"
  ];
  if (techProducts.some(product => text.includes(product)) &&
      !text.includes("indegene") && !text.includes("uses") && !text.includes("using")) {
    // Flag if it's a general "what is", "how is", or "how to use" question about the product
    if (text.includes("what is") || text.includes("tell me about") || 
        text.includes("how is") || text.match(/^how is \w+/i) ||
        text.includes("how to use") || text.match(/how\s+to\s+use\s+\w+/i)) {
      return true;
    }
  }

  // Phone/device queries (e.g., "is s 23 a good phone", "is iphone good")
  if ((text.match(/is\s+(s\s*\d+|iphone|samsung|android|phone|mobile)\s+(good|bad|better|worse)/i) ||
       text.match(/is\s+\w+\s+(phone|mobile|device)\s+(good|bad)/i) ||
       text.includes("good phone") || text.includes("best phone")) &&
      !text.includes("indegene") && !text.includes("medical") && !text.includes("health")) {
    return true;
  }

  // Unclear queries about "km" (Knowledge Management) - should be handled as general query
  // But if it's too unclear, decline it
  if ((text.match(/^(what|how|who|where|when)\s+(is|are|was|were)\s+(the\s+)?km$/i) ||
       text.match(/^(wht|wat|wht)\s+(is|are)\s+(the\s+)?km$/i)) &&
      !text.includes("indegene") && !text.includes("knowledge management")) {
    // This is unclear - could be asking about KM assistant or something else
    // Let it pass through to general queries handler
    return false; // Don't flag as out-of-domain, let general queries handle it
  }

  // Unclear/personal queries (e.g., "are we good", "dash people", "how to find a life")
  if ((text === "are we good" || text === "are we" || text.match(/^are\s+we\s+\w+$/i)) &&
      !text.includes("indegene") && !text.includes("company") && !text.includes("team")) {
    return true;
  }

  // Gibberish/unclear queries with typos (e.g., "what isa helpmet", "dash people")
  if (text.match(/^(what|how|who|where|when)\s+isa\s+\w+/i) ||
      (text.length < 20 && text.match(/^(dash|what|how)\s+\w+$/i) && 
       !text.includes("indegene") && !text.includes("medical") && !text.includes("health"))) {
    // Very unclear queries - let them pass to gibberish handler
    return false;
  }

  // Personal/romantic queries (e.g., "i like you do you like me")
  if ((text.includes("i like you") || text.includes("do you like me") || 
       text.includes("i love you") || text.includes("do you love me") ||
       text.match(/i\s+(like|love)\s+you/i) || text.match(/do\s+you\s+(like|love)\s+me/i)) &&
      !text.includes("indegene") && !text.includes("service") && !text.includes("company")) {
    return true;
  }

  // Relationship advice queries (e.g., "how to make people hate me", "how to make people love me")
  if ((text.includes("how to make people") || text.includes("how to make someone") ||
       text.match(/how\s+to\s+make\s+(people|someone)\s+(hate|love|like|dislike)/i)) &&
      !text.includes("indegene") && !text.includes("medical") && !text.includes("health")) {
    return true;
  }

  // "How to play" - unclear recreational query
  if (text.match(/^how\s+to\s+play$/i) || text.match(/^how\s+to\s+play\s*$/i) &&
      !text.includes("indegene") && !text.includes("game") && !text.includes("sport")) {
    return true;
  }

  // "How to find a life" - unclear personal query
  if (text.match(/how\s+to\s+find\s+(a\s+)?life/i) &&
      !text.includes("indegene") && !text.includes("career") && !text.includes("job")) {
    return true;
  }

  // Mental health crisis queries (e.g., "how to commit suicide") - provide resources, don't answer
  if ((text.includes("suicide") || text.includes("kill myself") || text.includes("end my life") ||
       text.includes("how to die") || text.match(/how\s+to\s+(commit\s+)?suicide/i) ||
       text.match(/how\s+to\s+kill\s+(myself|yourself)/i)) &&
      !text.includes("indegene") && !text.includes("prevention") && !text.includes("help")) {
    return true; // Flag as out-of-domain, but we should provide resources in the response
  }

  // "How do i view a document" - might be about system feature, but if unclear, decline
  if (text.match(/how\s+(do|can)\s+i\s+view\s+(a\s+)?document/i) &&
      !text.includes("indegene") && !text.includes("knowledge") && !text.includes("case study")) {
    // This could be about the document viewing feature - let it pass through
    return false;
  }

  // API/endpoint/system architecture questions (technical queries about the chatbot itself)
  if ((text.includes("api") || text.includes("endpoint") || text.includes("service")) && 
      (text.includes("using") || text.includes("use") || text.includes("what") || text.includes("which") || 
       text.includes("show") || text.includes("give") || text.includes("tell") || 
       text.match(/what.*api/i) || text.match(/which.*api/i) || text.match(/give.*api/i))) {
    // Only flag if it's asking about APIs/endpoints/services in general (not about Indegene's APIs)
    if (!text.includes("indegene") && !text.includes("next") && !text.includes("platform")) {
      return true;
    }
  }

  // Generic "what is X" queries that are clearly not Indegene-related
  // Common words that are definitely not about Indegene/life sciences
  const unrelatedCommonWords = [
    "food", "views", "view", "table", "chair", "book", "pen", "paper", "car", "house",
    "dog", "cat", "bird", "tree", "flower", "mountain", "ocean", "river", "lake",
    "computer", "phone", "television", "radio", "music", "art", "painting", "drawing",
    "sport", "game", "movie", "film", "actor", "singer", "dancer", "writer", "author",
    "country", "city", "town", "village", "street", "road", "building", "school",
    "university", "college", "student", "teacher", "doctor", // Note: "doctor" might be medical, but "what is doctor" is too generic
    "profanity" // Profanity is not related to Indegene/healthcare
  ];
  
  // Check for generic "what is X" or "what are X" queries with unrelated words
  // Also handle typos: "waht is", "wjhtis", "wt is", "what isa"
  if ((text.match(/^what is (the )?(use of )?(\w+)/i) || 
       text.match(/^waht is (the )?(use of )?(\w+)/i) || // Typo: "waht" for "what"
       text.match(/^wjhtis (the )?(use of )?(\w+)/i) || // Typo: "wjhtis" for "what is"
       text.match(/^wt is (the )?(use of )?(\w+)/i) || // Typo: "wt" for "what"
       text.match(/^what are (the )?(\w+)/i) ||
       text.match(/^tell me (about |what is )?(\w+)/i)) &&
      !text.includes("indegene") && 
      !text.includes("skysecure") &&
      !text.includes("prma") &&
      !text.includes("heor") &&
      !text.includes("regulatory") &&
      !text.includes("medical") &&
      !text.includes("clinical") &&
      !text.includes("pharma") &&
      !text.includes("biotech") &&
      !text.includes("life sciences") &&
      !text.includes("healthcare") &&
      !text.includes("oncology") &&
      !text.includes("therapy") &&
      !text.includes("treatment") &&
      !text.includes("drug") &&
      !text.includes("medicine") &&
      !text.includes("covid") &&
      !text.includes("coronavirus") &&
      !text.includes("pandemic") &&
      !text.includes("disease") &&
      !text.includes("health") &&
      !text.includes("medical") &&
      !text.includes("cancer") &&
      !text.includes("treatment") &&
      !text.includes("therapy") &&
      !text.includes("symptom") &&
      !text.includes("diagnosis") &&
      !text.includes("patient")) {
    
    // Extract the main word from the query (handle typos)
    const match = text.match(/^what is (the )?(use of )?(\w+)/i) || 
                  text.match(/^waht is (the )?(use of )?(\w+)/i) ||
                  text.match(/^wjhtis (the )?(use of )?(\w+)/i) ||
                  text.match(/^wt is (the )?(use of )?(\w+)/i) ||
                  text.match(/^what are (the )?(\w+)/i) ||
                  text.match(/^tell me (about |what is )?(\w+)/i);
    
    if (match) {
      const mainWord = (match[3] || match[2] || match[1] || "").toLowerCase().trim();
      
      // If it's a very generic word that's clearly not Indegene-related, flag it
      // BUT: Exclude healthcare/medical terms (covid, coronavirus, disease, cancer, etc.)
      const isHealthcareTerm = mainWord.match(/^(covid|coronavirus|pandemic|disease|health|medical|treatment|therapy|symptom|diagnosis|patient|medicine|drug|vaccine|infection|virus|cancer|diabetes|hypertension|asthma|arthritis|alzheimer|parkinson|epilepsy|stroke|heart|lung|kidney|liver|brain|mental|depression|anxiety|autism|adhd|ptsd|bipolar|schizophrenia|autism|dementia|migraine|fibromyalgia|osteoporosis|anemia|leukemia|lymphoma|melanoma|tumor|tumour)/i);
      if ((unrelatedCommonWords.includes(mainWord) || 
          mainWord.length < 4 || // Very short words are likely generic
          (mainWord.length <= 6 && !mainWord.match(/^(indegene|skysecure|prma|heor|medical|clinical|pharma|biotech|regulatory|oncology|therapy|treatment|drug|medicine|covid|coronavirus|pandemic|disease|health|symptom|diagnosis|patient|vaccine|infection|virus|cancer|diabetes|hypertension|asthma|arthritis|alzheimer|parkinson|epilepsy|stroke|heart|lung|kidney|liver|brain|mental|depression|anxiety|autism|adhd|ptsd|bipolar|schizophrenia|autism|dementia|migraine|fibromyalgia|osteoporosis|anemia|leukemia|lymphoma|melanoma|tumor|tumour)/i))) &&
          !isHealthcareTerm) {
        // Additional check: if it's a single word query like "what is views", flag it
        const words = text.split(/\s+/).filter(w => w.length > 2);
        if (words.length <= 4) { // Very short queries are likely generic
          return true;
        }
      }
    }
  }

  // Food-related queries (comprehensive - from test questions)
  if ((text.includes("food") || text.includes("eat") || text.includes("meal") || 
       text.includes("recipe") || text.includes("cooking") || text.includes("cuisine") ||
       text.includes("pasta") || text.includes("chicken") || text.includes("pizza") ||
       text.includes("breakfast") || text.includes("lunch") || text.includes("dinner") ||
       text.match(/recipe for \w+/i) || text.match(/how to cook \w+/i) ||
       text.match(/recipe of \w+/i)) &&
      !text.includes("indegene") && !text.includes("medical") && !text.includes("treatment") &&
      !text.includes("diet") && !text.includes("nutrition") && !text.includes("health")) {
    return true;
  }

  // Legal/philosophical queries (e.g., "retribution of acts")
  const legalPhilosophicalTerms = [
    "retribution", "acts", "legal", "law", "justice", "punishment", "crime",
    "philosophy", "ethics", "morality", "virtue", "sin", "karma", "dharma",
    "constitution", "legislation", "statute", "regulation" // Note: "regulation" might be Indegene-related, so check context
  ];
  // Check for "X of Y" pattern with legal/philosophical terms
  if ((legalPhilosophicalTerms.some(term => text.includes(term)) ||
       text.match(/\b(retribution|justice|punishment|philosophy|ethics|morality)\s+of\s+\w+/i)) &&
      !text.includes("indegene") && !text.includes("medical") && !text.includes("health") &&
      !text.includes("regulatory intelligence") && !text.includes("regulatory compliance") &&
      !text.includes("regulatory affairs") && !text.includes("regulatory services")) {
    return true;
  }

  // AI/chatbot comparison queries (e.g., "chat gpt is better", "chatgpt vs")
  const aiChatbotTerms = [
    "chatgpt", "chat gpt", "openai", "gpt", "bard", "claude", "ai chatbot",
    "is better", "vs ", "versus", "compared to", "better than", "worse than"
  ];
  if (aiChatbotTerms.some(term => text.includes(term)) &&
      !text.includes("indegene") && !text.includes("next") && !text.includes("platform")) {
    return true;
  }

  // Insulting/offensive queries directed at the bot (e.g., "why are you dumb", "why are you stupid")
  const insultingTerms = [
    "dumb", "stupid", "bad", "useless", "terrible", "awful", "horrible",
    "suck", "sucks", "worst", "idiot", "fool", "foolish", "dumbass",
    "retarded", "pathetic", "worthless", "garbage", "trash", "crap",
    "slow", "wrong", "incorrect", "inaccurate", "broken", "not working"
  ];
  
  // Pattern: "why are you [adjective]" or "why is you [adjective]" with insulting terms
  const whyAreYouInsultPattern = /^why (are|is) you\s+(\w+)/i;
  if (whyAreYouInsultPattern.test(text)) {
    const match = text.match(whyAreYouInsultPattern);
    if (match && match[2]) {
      const adjective = match[2].toLowerCase();
      if (insultingTerms.some(term => adjective.includes(term) || term.includes(adjective)) &&
          !text.includes("indegene") && !text.includes("medical") && !text.includes("health")) {
        return true;
      }
    }
  }
  
  // Also check for insulting terms in any "you are/you're" pattern
  if ((text.match(/you are \w+/i) || text.match(/you're \w+/i) ||
       text.match(/why are you \w+/i) || text.match(/why is you \w+/i)) &&
      insultingTerms.some(term => text.includes(term)) &&
      !text.includes("indegene") && !text.includes("medical") && !text.includes("health")) {
    return true;
  }

  // "Why is [name]" queries - incomplete or personal name queries
  // Pattern: "why is [name]" where name is not Indegene-related
  const whyIsPattern = /^why is\s+([a-z\s]{2,30})$/i;
  if (whyIsPattern.test(text)) {
    const match = text.match(whyIsPattern);
    if (match) {
      const name = match[1].toLowerCase().trim();
      
      // Known Indegene-related terms
      const indegeneTerms = [
        "indegene", "manish", "rajesh", "sanjay", "anand", "gaurav",
        "ceo", "founder", "company", "service", "platform", "next"
      ];
      
      // If it's not about Indegene and looks like a personal name or unclear query
      if (!indegeneTerms.some(term => name.includes(term)) && 
          name.length > 2 && name.length < 30 &&
          !text.includes("indegene") && !text.includes("medical") && 
          !text.includes("health") && !text.includes("treatment")) {
        return true;
      }
    }
  }

  // "What is [name] doing" / "wt is [name] doing" - personal queries
  const whatIsDoingPattern = /^(what|wt)\s+is\s+([a-z\s]{2,30})\s+doing$/i;
  if (whatIsDoingPattern.test(text)) {
    const match = text.match(whatIsDoingPattern);
    if (match) {
      const name = match[2].toLowerCase().trim();
      
      // Known Indegene-related names
      const indegeneNames = [
        "manish gupta", "rajesh nair", "sanjay parikh", "anand kiran", "gaurav kapoor",
        "manish", "rajesh", "sanjay", "anand", "gaurav"
      ];
      
      // Check if it's a known Indegene person
      const isIndegenePerson = indegeneNames.some(indegeneName => {
        const fullName = indegeneName.toLowerCase();
        return name === fullName || 
               fullName.includes(name) || 
               name.includes(fullName) ||
               (name.length >= 3 && fullName.startsWith(name)) ||
               (fullName.length >= 3 && name.startsWith(fullName));
      });
      
      // If it's not a known Indegene person, flag as out-of-domain
      if (!isIndegenePerson && name.length > 2 && name.length < 30 &&
          !text.includes("indegene") && !text.includes("medical") && !text.includes("health")) {
        return true;
      }
    }
  }
  
  // "What ra [name]" - unclear personal queries
  const whatRaPattern = /^what\s+ra\s+([a-z\s]{2,30})$/i;
  if (whatRaPattern.test(text)) {
    const match = text.match(whatRaPattern);
    if (match) {
      const name = match[1].toLowerCase().trim();
      
      // Known Indegene-related names
      const indegeneNames = [
        "manish gupta", "rajesh nair", "sanjay parikh", "anand kiran", "gaurav kapoor",
        "manish", "rajesh", "sanjay", "anand", "gaurav"
      ];
      
      // Check if it's a known Indegene person
      const isIndegenePerson = indegeneNames.some(indegeneName => {
        const fullName = indegeneName.toLowerCase();
        return name === fullName || 
               fullName.includes(name) || 
               name.includes(fullName);
      });
      
      // If it's not a known Indegene person, flag as out-of-domain
      if (!isIndegenePerson && name.length > 2 && name.length < 30 &&
          !text.includes("indegene") && !text.includes("medical") && !text.includes("health")) {
        return true;
      }
    }
  }


  // Gibberish/unclear queries - detect random character strings
  // Check if query contains mostly non-letter characters or random letter combinations
  // Only check for obvious gibberish (very short, no vowels, random characters)
  if (text.length > 0 && text.length < 30) {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const hasValidWords = words.some(word => {
      // Check if word looks like a real word (has vowels, reasonable length, etc.)
      const hasVowels = /[aeiou]/i.test(word);
      const reasonableLength = word.length >= 2 && word.length <= 20;
      return hasVowels && reasonableLength;
    });
    
    // If no valid words found and query looks like random characters
    if (!hasValidWords && words.length > 0) {
      const allWordsGibberish = words.every(w => {
        const hasVowels = /[aeiou]/i.test(w);
        const consonantRatio = (w.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length / w.length;
        return !hasVowels || consonantRatio > 0.8 || w.length < 2;
      });
      
      if (allWordsGibberish) {
        // This looks like gibberish - but don't flag it as out-of-domain, let AI handle it
        // The AI will recognize it as unclear
        return false; // Allow it to pass through, AI will handle unclear queries
      }
    }
  }

  // "What is WHO" - World Health Organization is healthcare-related, should be allowed
  if (text.match(/^what is\s+who$/i) || text.match(/^what\s+is\s+who\s*$/i)) {
    return false; // Allow this - it's about World Health Organization (healthcare)
  }

  // "Who is [name]" / "Who is my [role]" queries - check if name is related to Indegene
  // Known Indegene-related names (CEO, founders, etc.) - these should NOT be flagged
  const indegeneNames = [
    "manish gupta", "rajesh nair", "sanjay parikh", "anand kiran", "gaurav kapoor",
    "manish", "rajesh", "sanjay", "anand", "gaurav"
  ];
  
  // Pattern: "who is my [role]" - personal queries about user's own manager/PM/etc.
  const whoIsMyPattern = /^who\s+(is|os)\s+my\s+([a-z\s]{2,30})$/i; // Handle typo "os" for "is"
  if (whoIsMyPattern.test(text)) {
    const match = text.match(whoIsMyPattern);
    if (match) {
      const role = match[2].toLowerCase().trim();
      // Personal queries about user's own manager/PM should be declined
      if (role.includes("project manager") || role.includes("pm") || 
          role.includes("manager") || role.includes("supervisor") ||
          role.includes("lead") || role.includes("boss")) {
        return true; // Flag as out-of-domain
      }
    }
  }
  
  // Pattern: "who is [name]" - simple pattern to catch person name queries
  // Match "who is" followed by a name (1-3 words, not too long)
  const whoIsPattern = /^who is\s+([a-z\s]{2,30})$/i;
  
  if (whoIsPattern.test(text)) {
    const match = text.match(whoIsPattern);
    if (match) {
      const name = match[1].toLowerCase().trim();
      
      // Skip if query mentions Indegene, CEO, founder, chairman explicitly
      if (text.includes("indegene") || 
          text.includes("ceo") || 
          text.includes("founder") ||
          text.includes("chairman") ||
          text.includes("of indegene")) {
        return false; // Allow these queries
      }
      
      // Check if it's a known Indegene person (including partial matches like "manish" for "manish gupta")
      const isIndegenePerson = indegeneNames.some(indegeneName => {
        const fullName = indegeneName.toLowerCase();
        const queryName = name.toLowerCase();
        // Check if query name matches or is part of known name, or vice versa
        return queryName === fullName || 
               fullName.includes(queryName) || 
               queryName.includes(fullName) ||
               (queryName.length >= 3 && fullName.startsWith(queryName)) ||
               (fullName.length >= 3 && queryName.startsWith(fullName));
      });
      
      // If it's not a known Indegene person and doesn't mention Indegene context, flag as out-of-domain
      if (!isIndegenePerson && name.length > 2 && name.length < 30) {
        // It's a "who is [name]" query about someone not in our knowledge base
        return true;
      }
    }
  }

  return false;
};

/* =========================================================
   GENERAL SMALL-TALK / META QUERIES (who are you, hi, help)
======================================================== */
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
    return "Hi! I'm your KM Assistant chatbot. Ask me about Indegene, Skysecure, breast cancer modules, PRMA/HEOR, CPC playbooks, and more — or ask for the time, date, or day.";
  }

  // Who are you? / What are you? (handle typos like "ytou" for "you", "waht" for "what", ignore casual words like "buddy")
  // Remove casual words first, then check
  const cleanedText = text.replace(/\b(buddy|da|dude|bro|mate|friend)\b/gi, "").trim();
  if (cleanedText.match(/who are (you|ytou|yuo|yoi|u)/i) || 
      cleanedText.match(/what are (you|ytou|yuo|yoi|u)/i) ||
      cleanedText.match(/waht are (you|ytou|yuo|yoi|u)/i) || // "waht" typo for "what"
      cleanedText.match(/who\s+r\s+(you|ytou|yuo)/i) ||
      cleanedText.match(/what\s+r\s+(you|ytou|yuo)/i) ||
      cleanedText.match(/waht\s+r\s+(you|ytou|yuo)/i) ||
      (cleanedText.match(/^(who|what|waht) are/i) && cleanedText.length < 25) ||
      (text.match(/^(who|what|waht) are (you|ytou|yuo|yoi|u)/i))) {
    return "I'm your KM Assistant chatbot powered by AI. I can answer questions about Indegene using real-time information from the company website, combined with our internal knowledge base. I can also tell you the current time, date, and day.";
  }

  // Handle personal health/financial assistance queries with empathy
  // ONLY trigger for health-related financial requests (cancer, disease, treatment, etc.)
  // NOT for general financial requests like "i need money for bike"
  const hasHealthContext = text.includes("cancer") || 
                          text.includes("disease") || 
                          text.includes("sick") || 
                          text.includes("treatment") || 
                          text.includes("cure") ||
                          text.includes("health problem") || 
                          text.includes("medical") ||
                          text.includes("healthcare") ||
                          text.includes("hospital") ||
                          text.includes("doctor") ||
                          text.includes("patient");
  
  const hasFinancialRequest = text.includes("need money") || 
                              text.includes("financial assistance") ||
                              text.includes("money for") ||
                              (text.includes("i need") && text.includes("money"));
  
  // Only trigger if BOTH health context AND financial request are present
  if (hasHealthContext && hasFinancialRequest) {
    return "I understand this is a difficult situation, and I truly empathize with your concerns. While I can provide information about healthcare topics, medical conditions, and treatment options, I cannot provide direct financial assistance or personal medical advice.\n\nFor cancer treatment and financial support, I recommend:\n• Consulting with qualified healthcare professionals and oncologists for medical guidance\n• Exploring government health programs and insurance options in your region\n• Contacting cancer support organizations and non-profit foundations that provide financial assistance\n• Checking with hospitals and treatment centers about patient assistance programs\n\nIf you have questions about cancer, treatment options, or healthcare information, I'm happy to help with that. For specific medical advice or financial assistance, please consult with healthcare professionals or relevant support organizations.";
  }

  // Handle feedback/complaints (e.g., "too much you are showing", "too long", "too much information")
  if ((text.includes("too much") || text.includes("too long") || text.includes("too many") ||
       text.includes("too much information") || text.includes("too detailed") ||
       text.match(/too\s+(much|long|many|detailed)/i)) &&
      (text.includes("showing") || text.includes("displaying") || text.includes("information") ||
       text.includes("answer") || text.includes("response"))) {
    return "I understand you'd like a more concise answer. I'll try to keep my responses shorter and more focused. Is there a specific aspect you'd like me to focus on?";
  }

  // Handle unclear/gibberish queries
  if (text.length > 0 && text.length < 30) {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const hasValidWords = words.some(word => {
      const hasVowels = /[aeiou]/i.test(word);
      return hasVowels && word.length >= 2;
    });
    
    if (!hasValidWords && words.length > 0) {
      const allWordsGibberish = words.every(w => {
        const hasVowels = /[aeiou]/i.test(w);
        return !hasVowels || w.length < 2;
      });
      
      if (allWordsGibberish) {
        return "I'm sorry, but I couldn't understand your question. It seems there might be a typo or the question is unclear. Could you please rephrase your question? I can help you with:\n\n• Questions about Indegene\n• Healthcare and medical topics\n• Internal knowledge base topics\n• General queries (time, date, day)";
      }
    }
  }

  // What can you do? / Your capabilities / KM queries
  if (
    text.includes("what can you do") ||
    text.includes("how can you help") ||
    text.includes("what do you do") ||
    text.includes("capabilities of you") ||
    text.includes("your capabilities") ||
    text.includes("what are your capabilities") ||
    text.includes("what are you capable of") ||
    text.includes("what can you help with") ||
    text.includes("what do you help with") ||
    text.match(/capabilities?\s+(of|about)\s+(you|yourself)/i) ||
    text.match(/what\s+(are|is)\s+(your|you)\s+capabilities?/i) ||
    // KM queries (Knowledge Management assistant)
    text.match(/^(what|how|who|where|when)\s+(is|are|was|were)\s+(the\s+)?km$/i) ||
    text.match(/^(wht|wat)\s+(is|are)\s+(the\s+)?km$/i) ||
    (text.includes("km") && (text.includes("what") || text.includes("how")) && text.length < 20)
  ) {
    return (
      "I can help you with:\n" +
      "• Questions about Indegene - services, solutions, technology, partnerships, careers, and more (using real-time website information)\n" +
      "• Internal knowledge - Skysecure, PRMA/HEOR, PV, oncology docs, CPC playbooks, medical content\n" +
      "• General queries - current time, date, day, and quick links\n\n" +
      "Try asking: \"What services does Indegene offer?\" or \"Tell me about Indegene's NEXT platforms\" or \"Explain regulatory intelligence\"."
    );
  }

  // Help
  if (text === "help" || text.startsWith("help ")) {
    return (
      "I can answer questions about:\n\n" +
      "📊 Indegene Company:\n" +
      "• \"What services does Indegene offer?\"\n" +
      "• \"Tell me about Indegene's NEXT platforms\"\n" +
      "• \"What is Indegene's partnership with Microsoft?\"\n" +
      "• \"Where are Indegene offices located?\"\n\n" +
      "📚 Internal Knowledge:\n" +
      "• \"Tell me about regulatory intelligence\"\n" +
      "• \"What is breast cancer?\"\n" +
      "• \"Explain PRMA & HEOR services\"\n\n" +
      "⏰ General:\n" +
      "• \"What is the time?\" or \"What's today's date?\"\n" +
      "• \"Show me quick links\""
    );
  }

  // How are you (handle typos like "ypou", "yuo", etc.)
  // Match "how are" followed by "you" or common typos, or just "how are" alone
  if (text.match(/how\s+are\s+(you|ypou|yuo|yoi|u|y|yo)/i) || 
      text.match(/how\s+r\s+(you|ypou|yuo)/i) || 
      (text.match(/^how\s+are/i) && text.length < 15)) { // Short queries starting with "how are"
    return "I'm just code, but I'm running fine and ready to help you with KM-related questions!";
  }

  // Quick links / All links
  if (
    text.includes("all links") ||
    text.includes("links related") ||
    text.includes("show me links") ||
    text.includes("quick links") ||
    text.includes("list of links") ||
    (text.includes("links") && (text.includes("indegene") || text.includes("related") || text.includes("all")))
  ) {
    const allLinks = Object.values(QUICK_LINKS_MAP);
    // Remove duplicates (some entries might have same URL)
    const uniqueLinks = Array.from(
      new Map(allLinks.map(link => [link.url, link])).values()
    );
    
    let linksText = "Here are all the quick links related to Indegene:\n\n";
    uniqueLinks.forEach((link, index) => {
      linksText += `${index + 1}. **${link.title}**\n   🔗 ${link.url}\n\n`;
    });
    linksText += "💡 **Tip:** You can also ask me about any of these topics directly (e.g., \"careers\", \"case studies\", \"contact\"), and I'll provide the relevant link along with detailed information!";
    return linksText;
  }

  // Policies query - but only for generic "policies" queries
  // Specific policy queries (csr, privacy, retention, archival) should go to quick link detection
  if (
    (text.includes("policies") || text.includes("policy")) &&
    !text.includes("csr") &&
    !text.includes("privacy") &&
    !text.includes("retention") &&
    !text.includes("archival") &&
    !text.includes("preservation") &&
    (text.includes("indegene") || text.length < 30) // Short queries like "policies" or "indegene policies"
  ) {
    return (
      "Indegene has several important policies available:\n\n" +
      "• **CSR Policy (Corporate Social Responsibility)** - Details about Indegene's corporate social responsibility initiatives\n" +
      "• **Privacy Policy** - Information about data privacy and security practices\n" +
      "• **Retention Policy (Preservation of Records/Archival Policy)** - Document retention and archival procedures\n\n" +
      "You can ask me specifically about:\n" +
      "• \"CSR policy\" or \"CSR\" - for Corporate Social Responsibility policy\n" +
      "• \"Privacy policy\" or \"Privacy\" - for Privacy & Security policy\n" +
      "• \"Retention policy\" or \"Archival policy\" - for Document Retention/Archival Policy\n\n" +
      "I'll provide you with the relevant link and information!"
    );
  }

  return null;
};

/* =========================================================
   CONTEXT SEARCH LOGIC – boosted, with Skysecure fix
======================================================== */
const normalize = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const getAnswerFromContext = (query: string): string => {
  const normQuery = normalize(query);

  // 0) Direct exact-key hit (after normalization)
  if (CONTEXT_MAP[normQuery]) {
    return CONTEXT_MAP[normQuery].join(" ");
  }

  // 0.25) Try plural/singular variations for policy-related queries
  if (normQuery.includes("polic")) {
    // Try singular if plural
    if (normQuery.endsWith("policies")) {
      const singular = normQuery.replace(/policies$/, "policy");
      if (CONTEXT_MAP[singular]) {
        return CONTEXT_MAP[singular].join(" ");
      }
    }
    // Try plural if singular
    if (normQuery.endsWith("policy")) {
      const plural = normQuery.replace(/policy$/, "policies");
      if (CONTEXT_MAP[plural]) {
        return CONTEXT_MAP[plural].join(" ");
      }
    }
  }

  const queryTokens = new Set(normQuery.split(" "));

  // 0.5) Hard override for skysecure keyword to avoid tie with "what is indegene"
  if (queryTokens.has("skysecure") && CONTEXT_MAP["skysecure"]) {
    return CONTEXT_MAP["skysecure"].join(" ");
  }

  // 0.6) Hard override for CSR policy queries
  if ((queryTokens.has("csr") || normQuery.includes("csr")) && 
      (queryTokens.has("polic") || normQuery.includes("polic"))) {
    // Try exact matches first
    if (CONTEXT_MAP["csr policies"]) return CONTEXT_MAP["csr policies"].join(" ");
    if (CONTEXT_MAP["csr policy"]) return CONTEXT_MAP["csr policy"].join(" ");
    if (CONTEXT_MAP["indegene csr policies"]) return CONTEXT_MAP["indegene csr policies"].join(" ");
    if (CONTEXT_MAP["indegene csr policy"]) return CONTEXT_MAP["indegene csr policy"].join(" ");
  }

  // 0.7) Hard override for Privacy policy queries
  if ((queryTokens.has("privacy") || normQuery.includes("privacy")) && 
      (queryTokens.has("polic") || normQuery.includes("polic"))) {
    // Try exact matches first
    if (CONTEXT_MAP["privacy policies"]) return CONTEXT_MAP["privacy policies"].join(" ");
    if (CONTEXT_MAP["privacy policy"]) return CONTEXT_MAP["privacy policy"].join(" ");
    if (CONTEXT_MAP["indegene privacy policies"]) return CONTEXT_MAP["indegene privacy policies"].join(" ");
    if (CONTEXT_MAP["indegene privacy policy"]) return CONTEXT_MAP["indegene privacy policy"].join(" ");
  }

  // 0.8) Hard override for Retention/Archival policy queries
  if ((queryTokens.has("retention") || normQuery.includes("retention")) && 
      (queryTokens.has("polic") || normQuery.includes("polic"))) {
    // Check for plural first, then singular
    if (CONTEXT_MAP["retention policies"]) return CONTEXT_MAP["retention policies"].join(" ");
    if (CONTEXT_MAP["indegene retention policies"]) return CONTEXT_MAP["indegene retention policies"].join(" ");
    if (CONTEXT_MAP["retention policy"]) return CONTEXT_MAP["retention policy"].join(" ");
    if (CONTEXT_MAP["indegene retention policy"]) return CONTEXT_MAP["indegene retention policy"].join(" ");
  }
  if ((queryTokens.has("archival") || normQuery.includes("archival")) && 
      (queryTokens.has("polic") || normQuery.includes("polic"))) {
    if (CONTEXT_MAP["archival policy"]) return CONTEXT_MAP["archival policy"].join(" ");
  }
  if ((queryTokens.has("preservation") || normQuery.includes("preservation")) && 
      (queryTokens.has("record") || normQuery.includes("record"))) {
    if (CONTEXT_MAP["preservation of records"]) return CONTEXT_MAP["preservation of records"].join(" ");
  }

  // Intent detection
  const employeeIntent =
    normQuery.includes("employees") ||
    normQuery.includes("employee") ||
    normQuery.includes("headcount") ||
    normQuery.includes("people") ||
    normQuery.includes("staff");

  const founderIntent =
    normQuery.includes("founder") ||
    normQuery.includes("founders") ||
    normQuery.includes("who founded") ||
    normQuery.includes("founded indegene");

  const ceoIntent =
    normQuery.includes("ceo") || normQuery.includes("chief executive");

  const hqIntent =
    normQuery.includes("headquarters") ||
    normQuery.includes("head office") ||
    normQuery.includes("hq") ||
    normQuery.includes("where is indegene") ||
    normQuery.includes("location");

  let bestKey: string | null = null;
  let bestScore = 0;

  Object.keys(CONTEXT_MAP).forEach((key) => {
    const normKey = normalize(key);
    if (!normKey) return;

    const keyTokens = new Set(normKey.split(" "));

    // Base: token overlap
    let overlap = 0;
    keyTokens.forEach((t) => {
      if (queryTokens.has(t)) overlap++;
    });

    let score = overlap;

    // Boost if phrases contain each other (more specific keys win)
    if (normQuery.includes(normKey) || normKey.includes(normQuery)) {
      score += keyTokens.size;
    }

    // NEW: boost when all key tokens appear in query (subset match)
    let allTokensPresent = true;
    keyTokens.forEach((t) => {
      if (!queryTokens.has(t)) allTokensPresent = false;
    });
    if (allTokensPresent) {
      score += keyTokens.size + 1;
    }

    // Domain-specific boosts

    // Employees / headcount
    if (
      employeeIntent &&
      (normKey.includes("employees") ||
        normKey.includes("employee") ||
        normKey.includes("headcount") ||
        normKey.includes("people"))
    ) {
      score += 5;
    }

    // Founders
    if (
      founderIntent &&
      (normKey.includes("founder") || normKey.includes("founded"))
    ) {
      score += 5;
    }

    // CEO
    if (ceoIntent && normKey.includes("ceo")) {
      score += 5;
    }

    // Headquarters / location
    if (
      hqIntent &&
      (normKey.includes("headquarters") ||
        normKey.includes("india") ||
        normKey.includes("locations"))
    ) {
      score += 3;
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

    // If user asked something extra after the keyword, try to filter lines
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

/* =========================================================
   AZURE COGNITIVE SEARCH CONTENT FETCHING
======================================================== */

/**
 * Fetches latest news/press releases from Azure Cognitive Search
 * Specifically searches for recent news, announcements, and press releases
 */
const fetchLatestNewsFromAzureSearch = async (topResults: number = 5): Promise<string> => {
  try {
    const searchUrl = `${AZURE_SEARCH_ENDPOINT}/indexes/${AZURE_SEARCH_INDEX}/docs/search?api-version=${AZURE_SEARCH_API_VERSION}`;
    
    // Search for news, press releases, announcements
    // Use a broader search to catch news-related content from Indegene
    // Search for news-related terms that should appear in Indegene's website content
    const searchBody: any = {
      search: 'news OR "press release" OR announcement OR update OR latest OR recent OR partnership OR collaboration OR acquisition OR launch OR expansion OR "new partnership" OR "announced"',
      queryType: 'semantic',
      semanticConfiguration: AZURE_SEARCH_SEMANTIC_CONFIG,
      top: topResults,
      select: 'id,title,content,url,publishedDate,businessUnit,documentType,therapyArea',
      highlight: 'content',
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>'
    };

    const response = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_SEARCH_KEY
      },
      body: JSON.stringify(searchBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Azure Search API failed for news:', response.status, errorText);
      return '';
    }

    const data = await response.json();
    const results = data.value || [];

    if (results.length === 0) {
      console.log('No news found in Azure Search');
      return '';
    }

    // Format news content
    let newsContent = 'LATEST NEWS AND ANNOUNCEMENTS FROM INDEGENE:\n\n';
    results.forEach((item: any, index: number) => {
      const title = item.title || 'Untitled';
      const content = item.content || '';
      const url = item.url || '';
      const publishedDate = item.publishedDate || '';
      
      // Extract highlighted content if available
      const highlights = item['@search.highlights']?.content || [];
      const highlightedText = highlights.length > 0 
        ? highlights.join(' ... ') 
        : content.substring(0, 800);
      
      newsContent += `[News ${index + 1}: ${title}]\n`;
      if (publishedDate) newsContent += `Published: ${publishedDate}\n`;
      if (url) newsContent += `Source: ${url}\n`;
      newsContent += `Content: ${highlightedText}\n\n`;
    });

    // Limit total content
    if (newsContent.length > 10000) {
      newsContent = newsContent.substring(0, 10000) + '...';
    }

    console.log(`Fetched ${results.length} news items from Azure Search`);
    return newsContent.trim();
  } catch (error) {
    console.warn('Error fetching latest news from Azure Search:', error);
    return '';
  }
};

/**
 * Fetches relevant content from Azure Cognitive Search based on user query
 * This is more reliable than web scraping and provides semantic search capabilities
 */
const fetchContentFromAzureSearch = async (query: string, topResults: number = 5): Promise<string> => {
  try {
    const searchUrl = `${AZURE_SEARCH_ENDPOINT}/indexes/${AZURE_SEARCH_INDEX}/docs/search?api-version=${AZURE_SEARCH_API_VERSION}`;
    
    const searchBody = {
      search: query,
      queryType: 'semantic',
      semanticConfiguration: AZURE_SEARCH_SEMANTIC_CONFIG,
      top: topResults,
      select: 'id,title,content,url,publishedDate,businessUnit,documentType,therapyArea',
      highlight: 'content',
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>'
    };

    const response = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_SEARCH_KEY
      },
      body: JSON.stringify(searchBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Azure Search API failed:', response.status, errorText);
      return '';
    }

    const data = await response.json();
    const results = data.value || [];

    if (results.length === 0) {
      console.log('No results found in Azure Search for query:', query);
      return '';
    }

    // Combine content from top results
    let combinedContent = '';
    results.forEach((item: any, index: number) => {
      const title = item.title || 'Untitled';
      const content = item.content || '';
      const url = item.url || '';
      const publishedDate = item.publishedDate || '';
      
      // Extract highlighted content if available
      const highlights = item['@search.highlights']?.content || [];
      const highlightedText = highlights.length > 0 
        ? highlights.join(' ... ') 
        : content.substring(0, 1000);
      
      combinedContent += `\n\n[Document ${index + 1}: ${title}]\n`;
      if (url) combinedContent += `Source: ${url}\n`;
      if (publishedDate) combinedContent += `Date: ${publishedDate}\n`;
      combinedContent += `Content: ${highlightedText}\n`;
    });

    // Limit total content to avoid token limits (keep it under 8000 chars)
    if (combinedContent.length > 8000) {
      combinedContent = combinedContent.substring(0, 8000) + '...';
    }

    console.log(`Fetched ${results.length} results from Azure Search, content length: ${combinedContent.length}`);
    return combinedContent.trim();
  } catch (error) {
    console.warn('Error fetching content from Azure Search:', error);
    return '';
  }
};

/* =========================================================
   DYNAMIC AI-BASED ANSWER GENERATION FROM WEBSITE
======================================================== */

/**
 * Enhanced dynamic AI answer generation with better prompts and context
 * This function uses Azure OpenAI to generate comprehensive answers
 * Now includes dynamic content fetching from Azure Cognitive Search for real-time, relevant information
 */
const getDynamicAnswerFromWebsite = async (
  query: string, 
  contextMapAnswer?: string
): Promise<string | null> => {
  try {
    const endpoint = AZURE_OPENAI_ENDPOINT.endsWith('/') 
      ? AZURE_OPENAI_ENDPOINT.slice(0, -1) 
      : AZURE_OPENAI_ENDPOINT;
    
    const url = `${endpoint}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;

    // Check if this is a "latest news" query - be more flexible with detection
    // Handle typos: "latest" -> ";atest", "latest" -> "latest", etc.
    const queryLowerForNews = query.toLowerCase();
    // Normalize common typos in "latest"
    const normalizedQuery = queryLowerForNews.replace(/[;:]/g, 'l').replace(/atest/g, 'latest');
    const isNewsQuery = queryLowerForNews.includes("latest news") || 
                        normalizedQuery.includes("latest news") ||
                        queryLowerForNews.includes("recent news") || 
                        queryLowerForNews.includes("news from indegene") ||
                        queryLowerForNews.includes("indegene news") ||
                        queryLowerForNews.includes("press release") ||
                        queryLowerForNews.includes("announcements") ||
                        (queryLowerForNews.includes("news") && queryLowerForNews.includes("indegene")) ||
                        (queryLowerForNews.includes("news") && (queryLowerForNews.includes("latest") || normalizedQuery.includes("latest"))) ||
                        (queryLowerForNews.includes("news") && queryLowerForNews.includes("recent")) ||
                        queryLowerForNews.includes("what's new") ||
                        queryLowerForNews.includes("what is new");

    // Fetch dynamic content from Azure Cognitive Search (non-blocking)
    let fetchedContent = '';
    try {
      if (isNewsQuery) {
        // For news queries, fetch latest news specifically
        console.log('Fetching latest news from Azure Cognitive Search');
        fetchedContent = await fetchLatestNewsFromAzureSearch(5);
        if (fetchedContent) {
          console.log('Successfully fetched latest news from Azure Search, length:', fetchedContent.length);
        } else {
          console.log('No news found in Azure Search, trying general search');
          // Fallback to general search
          fetchedContent = await fetchContentFromAzureSearch(query, 5);
        }
      } else {
        // For other queries, use regular search
        console.log('Fetching content from Azure Cognitive Search for query:', query);
        fetchedContent = await fetchContentFromAzureSearch(query, 5);
        if (fetchedContent) {
          console.log('Successfully fetched content from Azure Search, length:', fetchedContent.length);
        } else {
          console.log('No content found in Azure Search for this query');
        }
      }
    } catch (fetchError) {
      console.warn('Failed to fetch content from Azure Search (will continue without it):', fetchError);
      // Continue without fetched content - not critical
    }

    // Enhanced system prompt with more context and strict domain boundaries
    const systemPrompt = `You are an expert assistant specializing in Indegene, a leading tech-native, digital-first life sciences commercialization company.

COMPANY OVERVIEW:
- Founded: 1998 in Bengaluru, India
- Headquarters: Bengaluru, Karnataka, India
- Type: Publicly listed company (Indegene Limited)
- Focus: Life sciences commercialization, medical affairs, clinical operations, and technology solutions
- Key Services: Commercial solutions, medical solutions, clinical/evidence services, technology platforms
- Technology: NEXT platform suite, AI/ML solutions, GenAI capabilities
- Partnerships: Microsoft (GenAI collaboration), strategic alliances
- Global Presence: Offices in US, UK, China, India, Australia, and other regions

YOUR ROLE:
- Provide accurate, detailed, and helpful answers about:
  • Indegene company, services, solutions, technology, partnerships, and operations
  • Life sciences, healthcare, medical content, and related business topics
  • Internal knowledge base topics (e.g., Skysecure, PRMA, HEOR, regulatory intelligence, medical content, case studies, playbooks)
- Use information from Azure Cognitive Search (knowledge base), internal knowledge base, and public sources
- PRIORITY: When internal knowledge base information is provided, it is the PRIMARY source - use it as the foundation of your answer
- If Azure Search results are also provided, use them to supplement and enhance the internal knowledge
- Be conversational, professional, and informative
- Structure answers clearly with bullet points when listing multiple items
- Include specific details like platform names, service areas, and capabilities
- If uncertain, acknowledge it rather than speculating
- Keep answers comprehensive but concise (3-6 sentences or structured bullet points)

CRITICAL: 
- If internal knowledge base information is provided, you MUST use it - do not decline these queries
         - ALL healthcare, medical, and health-related queries should be answered, even if not specifically about Indegene. This includes questions about diseases, treatments, medical conditions, health topics, COVID-19, global health, healthcare policies, medical research, patient care, symptoms, diagnosis, World Health Organization (WHO), health organizations, etc.
- Healthcare and medical queries are ALWAYS valid and should be answered comprehensively
- Only decline questions that are clearly NOT about Indegene, life sciences, healthcare, medical topics, internal knowledge base topics, or related business matters (e.g., weather, sports, entertainment, politics unrelated to healthcare, general knowledge completely unrelated like "what is earth", "president of India", etc.)
- When declining, be brief and direct. Simply state that you can only help with Indegene-related questions. Do NOT provide general knowledge answers or try to answer the question anyway.
- Internal knowledge base topics (Skysecure, PRMA, HEOR, regulatory intelligence, medical content, etc.) are VALID topics even if not directly about Indegene company`;

    // Check if query is clearly about Indegene or related topics
    const queryLower = query.toLowerCase();
    const hasContextMapAnswer = contextMapAnswer && contextMapAnswer !== "I could not find a relevant match in my stored knowledge.";
    
    // Check if context answer is actually relevant to the query
    let isContextRelevantForAI = false;
    if (hasContextMapAnswer) {
      const contextLower = contextMapAnswer.toLowerCase();
      const queryKeywords = queryLower.split(/\s+/).filter(w => 
        w.length > 3 && 
        !['what', 'who', 'where', 'when', 'why', 'how', 'tell', 'me', 'about', 'the', 'is', 'are', 'can', 'you'].includes(w)
      );
      isContextRelevantForAI = queryKeywords.some(keyword => 
        contextLower.includes(keyword) || 
        keyword.includes("indegene") || 
        keyword.includes("csr") || 
        keyword.includes("privacy") ||
        keyword.includes("policy") ||
        keyword.includes("skysecure") ||
        keyword.includes("prma") ||
        keyword.includes("heor") ||
        keyword.includes("regulatory") ||
        keyword.includes("oncology") ||
        keyword.includes("medical")
      ) || queryLower.includes("indegene") || queryLower.includes("skysecure");
    }
    
    // If we have a RELEVANT context map answer, it's definitely related (it's in our knowledge base)
    const isIndegeneRelated = 
      (hasContextMapAnswer && isContextRelevantForAI) || // Priority: if we have relevant internal knowledge, it's valid
      queryLower.includes("indegene") ||
      queryLower.includes("life sciences") ||
      queryLower.includes("pharma") ||
      queryLower.includes("biotech") ||
      queryLower.includes("medical") ||
      queryLower.includes("healthcare") ||
      queryLower.includes("health care") ||
      queryLower.includes("health") ||
      queryLower.includes("disease") ||
      queryLower.includes("treatment") ||
      queryLower.includes("therapy") ||
      queryLower.includes("patient") ||
      queryLower.includes("diagnosis") ||
      queryLower.includes("symptom") ||
      queryLower.includes("medicine") ||
      queryLower.includes("drug") ||
      queryLower.includes("covid") ||
      queryLower.includes("coronavirus") ||
      queryLower.includes("pandemic") ||
      queryLower === "who" || // "what is who" - World Health Organization
      (queryLower.includes("who") && queryLower.includes("health")) || // WHO health organization
      queryLower.includes("regulatory") ||
      queryLower.includes("clinical") ||
      queryLower.includes("commercial") ||
      queryLower.includes("skysecure") ||
      queryLower.includes("prma") ||
      queryLower.includes("heor") ||
      queryLower.includes("pharmacovigilance") ||
      queryLower.includes("oncology") ||
      queryLower.includes("cpc");

    // Enhanced user prompt with context from concept map and Azure Search content
    let userPrompt = `Based on information from the Indegene knowledge base and public sources, please provide a comprehensive answer to this question:

Question: ${query}`;

    // SPECIAL HANDLING: For news queries, prioritize news content over context map
    if (isNewsQuery && fetchedContent && fetchedContent.length > 0) {
      // News query with news content found - prioritize news
      userPrompt += `\n\nPRIMARY SOURCE - LATEST NEWS FROM AZURE COGNITIVE SEARCH:\n${fetchedContent}\n\nCRITICAL: This is the LATEST NEWS and ANNOUNCEMENTS from Indegene's website. Use this as the PRIMARY and ONLY source for answering this news query. Provide a comprehensive summary of the latest news, announcements, press releases, and updates. Include dates, key details, and source URLs. Structure your answer clearly with the most recent news first. DO NOT provide generic company information - focus ONLY on the specific news items provided above.`;
      
      // Add context map as background only if available
      if (hasContextMapAnswer) {
        userPrompt += `\n\nBACKGROUND CONTEXT (for reference only, do not use as primary source):\n${contextMapAnswer}\n\nNOTE: The user is asking for LATEST NEWS. The news content above is the PRIMARY source. Only use this background context if it helps explain something in the news, but do NOT use it as the main answer.`;
      }
    } else if (hasContextMapAnswer) {
      // Regular query with context map answer - use context map as primary
      userPrompt += `\n\nPRIMARY SOURCE - INTERNAL KNOWLEDGE BASE:\n${contextMapAnswer}\n\nCRITICAL: This information comes directly from the internal knowledge base and is ACCURATE and RELEVANT to the question. You MUST use this information as the foundation of your answer. Do NOT say you don't have this information - it is provided above. Provide a comprehensive, detailed answer based EXACTLY on this information.`;
      
      // Add Azure Search content as supplementary if available
      if (fetchedContent && fetchedContent.length > 0) {
        userPrompt += `\n\nSUPPLEMENTARY CONTENT FROM AZURE COGNITIVE SEARCH:\n${fetchedContent}\n\nYou may use this additional content to enhance your answer, but the internal knowledge base information above is the PRIMARY source and must be used.`;
      } else {
        userPrompt += `\n\nProvide a detailed, well-structured answer based EXACTLY on the internal knowledge base information provided above. Do NOT say the information is not available - it is provided above.`;
      }
    } else {
      // No context map answer - use Azure Search if available
      if (fetchedContent && fetchedContent.length > 0) {
        if (isNewsQuery) {
          userPrompt += `\n\nLATEST NEWS FROM AZURE COGNITIVE SEARCH (Knowledge Base):\n${fetchedContent}\n\nCRITICAL: This is the LATEST NEWS and ANNOUNCEMENTS from Indegene's website. Use this as the PRIMARY source. Provide a comprehensive summary of the latest news, announcements, press releases, and updates. Include dates, key details, and source URLs. Structure your answer clearly with the most recent news first. DO NOT provide generic company information - focus ONLY on the specific news items provided above.`;
        } else {
          userPrompt += `\n\nRELEVANT CONTENT FROM AZURE COGNITIVE SEARCH (Knowledge Base):\n${fetchedContent}\n\nUse this dynamically fetched content from the knowledge base to provide the most accurate and up-to-date information. Prioritize information from these search results when answering the question.`;
        }
      } else {
        if (isNewsQuery) {
          // For news queries with no results, be explicit
          userPrompt += `\n\nIMPORTANT: The user is asking for the latest news from Indegene, but no recent news articles were found in the knowledge base. You should inform the user that you could not find specific recent news articles in the indexed content, and suggest they visit the Indegene website (www.indegene.com) or check the news/press releases section for the most current information. DO NOT provide generic company information as if it were news.`;
        }
      }

      // If query is not clearly related to Indegene, add instruction to decline
      if (!isIndegeneRelated) {
        userPrompt += `\n\nCRITICAL: This question is clearly NOT about Indegene, life sciences, healthcare, or related topics. You MUST politely decline with a brief, direct message. Do NOT attempt to answer the question with general knowledge. Do NOT provide any information about the subject. Do NOT mention any names, facts, or details about the unrelated topic. Simply state that you can only help with Indegene-related questions. Keep your response short (1-2 sentences maximum). Example: "I'm sorry, but I can only help with questions related to Indegene, life sciences, healthcare, and related topics."`;
      } else {
        userPrompt += `\n\nProvide a detailed, accurate answer${fetchedContent ? ' using the Azure Search results' : ' based on available information'}. Include specific details about services, solutions, technology, partnerships, or operations when relevant.`;
      }
    }

    // Create a timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 10000); // 10 second timeout
    });

    // Race between fetch and timeout
    const fetchPromise = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_OPENAI_API_KEY
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800, // Increased for more comprehensive answers
        top_p: 0.9,
        frequency_penalty: 0.3,
        presence_penalty: 0.3
      })
    });

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure OpenAI API error:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    if (answer && answer.trim().length > 0) {
      // Clean and format the answer
      let formattedAnswer = answer.trim();
      
      // Remove markdown code blocks if present
      formattedAnswer = formattedAnswer.replace(/```[\s\S]*?```/g, '');
      
      // Ensure proper spacing
      formattedAnswer = formattedAnswer.replace(/\n{3,}/g, '\n\n');
      
      return formattedAnswer;
    }

    return null;
  } catch (error) {
    if (error instanceof Error && error.message === 'Request timeout') {
      console.warn('AI request timed out, using fallback');
    } else {
      console.error('Error getting dynamic answer from website:', error);
    }
    return null;
  }
};

/**
 * Enhance AI answer with concept map context for more comprehensive responses
 */
const enhanceAnswerWithContext = (aiAnswer: string, contextAnswer: string, query?: string): string => {
  // If context answer is just "not found", return AI answer as-is
  if (contextAnswer === "I could not find a relevant match in my stored knowledge.") {
    return aiAnswer;
  }

  // Check if AI declined the query (out of domain)
  const aiLower = aiAnswer.toLowerCase();
  const aiDeclined = aiLower.includes("i can only help") || 
      aiLower.includes("i'm sorry") || 
      aiLower.includes("i cannot help") ||
      aiLower.includes("only assist with questions related to indegene") ||
      aiLower.includes("does not appear to be about indegene") ||
      aiLower.includes("unrelated to indegene") ||
      aiLower.includes("extends beyond the scope") ||
      aiLower.includes("does not align with") ||
      aiLower.includes("philosophical") && aiLower.includes("beyond");

  // If AI declined, NEVER add context - the query is out of domain
  if (aiDeclined) {
    // Return AI answer as-is without any additional context
    return aiAnswer;
  }

  // If both answers are similar, return the more comprehensive one
  const contextLower = contextAnswer.toLowerCase();
  
  // Check if they're very similar (one contains most of the other)
  if (aiLower.includes(contextLower.substring(0, 50)) || 
      contextLower.includes(aiLower.substring(0, 50))) {
    // Return the longer, more comprehensive answer
    return aiAnswer.length > contextAnswer.length ? aiAnswer : contextAnswer;
  }

  // If AI answer already contains the context information, don't duplicate
  const contextKeyPhrases = contextAnswer.split(/[.,;]/).slice(0, 3).map(p => p.trim().toLowerCase());
  const aiContainsContext = contextKeyPhrases.some(phrase => 
    phrase.length > 10 && aiLower.includes(phrase.substring(0, 20))
  );
  
  if (aiContainsContext) {
    // AI already has the context, return AI answer
    return aiAnswer;
  }

  // If they're different, prefer AI answer as it's more dynamic and comprehensive
  // Don't append context as "Additional Information" - the AI answer should be sufficient
  return aiAnswer;
};

/* ======================================================
   Message Content Component - Converts URLs to clickable links
====================================================== */

/**
 * Component that renders message text and converts URLs to clickable links
 * Also preserves newlines and formatting
 * Handles both plain URLs and markdown-style links
 */
const MessageContent: React.FC<{ text: string }> = ({ text }) => {
  // Regular expression to match URLs (with capturing group for split)
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  // Regular expression to match markdown links [text](url)
  const markdownLinkRegex = /(\[([^\]]+)\]\((https?:\/\/[^)]+)\))/g;
  
  // First, handle markdown links
  let processedText = text;
  const markdownLinks: Array<{ fullMatch: string; text: string; url: string }> = [];
  let match;
  const urlRegexForMarkdown = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  
  while ((match = urlRegexForMarkdown.exec(text)) !== null) {
    markdownLinks.push({
      fullMatch: match[0],
      text: match[1],
      url: match[2]
    });
  }
  
  // Replace markdown links with placeholders
  markdownLinks.forEach((link, index) => {
    processedText = processedText.replace(link.fullMatch, `__MARKDOWN_LINK_${index}__`);
  });
  
  // Split text by URLs - capturing group ensures URLs are included in the array
  const parts = processedText.split(urlRegex);
  
  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      {parts.map((part, index) => {
        // Check if this part is a markdown link placeholder
        const markdownMatch = part.match(/__MARKDOWN_LINK_(\d+)__/);
        if (markdownMatch) {
          const linkIndex = parseInt(markdownMatch[1]);
          const link = markdownLinks[linkIndex];
          if (link) {
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0078d4',
                  textDecoration: 'underline',
                  wordBreak: 'break-all'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {link.text}
              </a>
            );
          }
        }
        
        // Check if this part is a URL (starts with http:// or https://)
        if (part.startsWith('http://') || part.startsWith('https://')) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#0078d4',
                textDecoration: 'underline',
                wordBreak: 'break-all'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          );
        }
        // Regular text - will preserve newlines due to whiteSpace: 'pre-wrap' on parent
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
};

/* ======================================================
   Document Tile Section types
====================================================== */

interface DocumentItem {
  id: number;
  name: string;
  abstract: string;
  fileType: string;
  serverRelativeUrl: string;
  fileRef: string;
}

/* ======================================================
   Main Component
====================================================== */
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
  const [selectedDocumentId, setSelectedDocumentId] = React.useState<number | null>(null);
  const [showViewAll, setShowViewAll] = React.useState<boolean>(false);
  
  // Ref for messages container to enable auto-scroll
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (props.context) fetchLatestDocuments();
  }, [props.context]);

  // Auto-scroll to bottom when messages change or loading state changes
  React.useEffect(() => {
    // Use setTimeout to ensure DOM has updated
    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    };
    
    // Small delay to ensure DOM has rendered
    const timer = setTimeout(scrollToBottom, 100);
    
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  /* ======================================================
     Welcome Message on Chat Open
  ====================================================== */
  React.useEffect(() => {
    // Show welcome message when chat is opened for the first time (no messages yet)
    if (isChatVisible && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        sender: "bot",
        text: "Hello! 👋 Welcome to Indegene's Knowledge Management Assistant.\n\nFeel free to ask me anything about Indegene or browse our knowledge resources. How can I assist you today?"
      };
      // Small delay to make it feel natural
      const timer = setTimeout(() => {
        setMessages([welcomeMessage]);
      }, 300);
      
      // Cleanup timer if component unmounts or chat closes
      return () => clearTimeout(timer);
    }
  }, [isChatVisible, messages.length]);

  /* ======================================================
     Fetch Last 5 Documents
  ====================================================== */
  const fetchLatestDocuments = async () => {
    try {
      const webUrl = props.context.pageContext.web.absoluteUrl;
      const libraryName = "KMArtifacts";

      const apiUrl = `${webUrl}/_api/web/lists/getbytitle('${libraryName}')/items?$select=Id,Title,TitleName,Abstract,FileLeafRef,FileRef&$orderby=Created desc&$top=5`;

      const response: SPHttpClientResponse = await props.context.spHttpClient.get(
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
          fileRef: item.FileRef || ""
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // 1) Internal time/date/day (fast, no API call needed)
      const internal = handleInternalQueries(userMsg.text);
      if (internal) {
        setMessages((prev) => [...prev, { sender: "bot", text: internal }]);
        setIsLoading(false);
        return;
      }

      // 2) General questions (hi, who are you, help) - fast, no API call
      const general = handleGeneralQueries(userMsg.text);
      if (general) {
        setMessages((prev) => [...prev, { sender: "bot", text: general }]);
        setIsLoading(false);
        return;
      }

      // 3) Get concept map answer first (for context enhancement)
      // IMPORTANT: Check this BEFORE out-of-domain check, because if we have internal knowledge, it's valid
      const contextAnswer = getAnswerFromContext(userMsg.text);
      const hasContextAnswer = contextAnswer && contextAnswer !== "I could not find a relevant match in my stored knowledge.";

      // Check if context answer is actually relevant to the query
      let isContextRelevant = false;
      if (hasContextAnswer) {
        const queryLower = userMsg.text.toLowerCase();
        const contextLower = contextAnswer.toLowerCase();
        // Extract meaningful keywords from query (exclude common words)
        const queryKeywords = queryLower.split(/\s+/).filter(w => 
          w.length > 3 && 
          !['what', 'who', 'where', 'when', 'why', 'how', 'tell', 'me', 'about', 'the', 'is', 'are', 'can', 'you'].includes(w)
        );
        // Check if context contains query keywords or if query is about Indegene/internal knowledge
        isContextRelevant = queryKeywords.some(keyword => 
          contextLower.includes(keyword) || 
          keyword.includes("indegene") || 
          keyword.includes("csr") || 
          keyword.includes("privacy") ||
          keyword.includes("policy") ||
          keyword.includes("skysecure") ||
          keyword.includes("prma") ||
          keyword.includes("heor") ||
          keyword.includes("regulatory") ||
          keyword.includes("oncology") ||
          keyword.includes("medical")
        ) || queryLower.includes("indegene") || queryLower.includes("skysecure");
      }

      // 2.5) Check for out-of-domain queries (weather, sports, etc.)
      // BUT: Skip this check if we have a RELEVANT context map answer (internal knowledge is always valid)
      if ((!hasContextAnswer || !isContextRelevant) && isOutOfDomainQuery(userMsg.text)) {
        // Special handling for mental health crisis queries
        const queryLower = userMsg.text.toLowerCase();
        if (queryLower.includes("suicide") || queryLower.includes("kill myself") || 
            queryLower.includes("end my life") || queryLower.includes("how to die") ||
            queryLower.match(/how\s+to\s+(commit\s+)?suicide/i) ||
            queryLower.match(/how\s+to\s+kill\s+(myself|yourself)/i)) {
          const crisisMessage = "I'm deeply concerned about what you're going through. If you're having thoughts of self-harm or suicide, please reach out for help immediately:\n\n• **Crisis Text Line**: Text HOME to 741741 (US)\n• **National Suicide Prevention Lifeline**: 988 (US) or 1-800-273-8255\n• **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/\n• **Emergency Services**: 911 (US) or your local emergency number\n\nYou are not alone, and there are people who want to help. Please reach out to a mental health professional, a trusted friend or family member, or a crisis helpline.\n\nI can help you with questions about Indegene, life sciences, healthcare, and related topics, but for mental health support, please contact a qualified professional.";
          setMessages((prev) => [...prev, { sender: "bot", text: crisisMessage }]);
          setIsLoading(false);
          return;
        }
        
        const outOfDomainMessage = "I'm sorry, but I can only help with questions related to Indegene, life sciences, healthcare, medical content, regulatory intelligence, and related business topics. I can also tell you the current time, date, or day.\n\nFor questions about Indegene, try asking:\n• \"What services does Indegene offer?\"\n• \"Tell me about Indegene's NEXT platforms\"\n• \"What is Indegene's partnership with Microsoft?\"\n";
        setMessages((prev) => [...prev, { sender: "bot", text: outOfDomainMessage }]);
        setIsLoading(false);
        return;
      }
      
      // 4) Try dynamic AI-based answer from website
      // This uses Azure OpenAI to generate answers based on the Indegene website
      let reply: string;
      try {
        const dynamicAnswer = await getDynamicAnswerFromWebsite(userMsg.text, contextAnswer);
        
        if (dynamicAnswer) {
          // Check if AI declined the query (indicates it's out of domain)
          // BUT: If we have a context map answer, ignore the decline and use context answer
          const answerLower = dynamicAnswer.toLowerCase();
          const aiDeclined = answerLower.includes("i can only help") || 
              answerLower.includes("i'm sorry") || 
              answerLower.includes("i cannot help") ||
              answerLower.includes("only assist with questions related to indegene") ||
              answerLower.includes("does not appear to be about indegene");
          
          if (aiDeclined) {
            // AI declined - only use context if it's actually relevant
            if (isContextRelevant && hasContextAnswer) {
              // Context is relevant, use it
              reply = contextAnswer;
            } else {
              // Context is not relevant or doesn't exist, use AI's decline message without context
              reply = dynamicAnswer;
            }
          } else if (isContextRelevant && hasContextAnswer) {
            // AI provided answer and we have relevant context - enhance with context
            reply = enhanceAnswerWithContext(dynamicAnswer, contextAnswer, userMsg.text);
          } else {
            // AI provided answer but no relevant context - use AI answer, but check if it needs enhancement
            reply = enhanceAnswerWithContext(dynamicAnswer, contextAnswer, userMsg.text);
          }
        } else {
          // Fallback to concept map if AI fails
          // If context map also has no answer, provide a helpful message
          if (contextAnswer === "I could not find a relevant match in my stored knowledge.") {
            reply = "I couldn't find specific information about that in my knowledge base. I can help you with:\n\n• Questions about Indegene - services, solutions, technology, partnerships, careers\n• Internal knowledge - Skysecure, PRMA/HEOR, PV, oncology docs, CPC playbooks, medical content\n• General queries - current time, date, day\n\nCould you try rephrasing your question or ask about something related to Indegene or life sciences?";
          } else {
            reply = contextAnswer;
          }
        }
      } catch (error) {
        console.error('Error in dynamic answer generation, using fallback:', error);
        // Fallback to concept map on error
        if (contextAnswer === "I could not find a relevant match in my stored knowledge.") {
          reply = "I couldn't find specific information about that in my knowledge base. I can help you with:\n\n• Questions about Indegene - services, solutions, technology, partnerships, careers\n• Internal knowledge - Skysecure, PRMA/HEOR, PV, oncology docs, CPC playbooks, medical content\n• General queries - current time, date, day\n\nCould you try rephrasing your question or ask about something related to Indegene or life sciences?";
        } else {
          reply = contextAnswer;
        }
      }

      // 5) Quick links detection
      const link = getLinkForQuery(userMsg.text);

      if (link) {
        // push a single bot message that contains text + link metadata
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: reply, title: link.title, url: link.url }
        ]);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      }
    } catch (error) {
      console.error('Error in handleSend:', error);
      // Final fallback to concept map
      const fallbackReply = getAnswerFromContext(userMsg.text);
      if (fallbackReply === "I could not find a relevant match in my stored knowledge.") {
        const helpfulMessage = "I encountered an error and couldn't find specific information about that. I can help you with:\n\n• Questions about Indegene - services, solutions, technology, partnerships, careers\n• Internal knowledge - Skysecure, PRMA/HEOR, PV, oncology docs, CPC playbooks, medical content\n• General queries - current time, date, day\n\nCould you try rephrasing your question or ask about something related to Indegene or life sciences?";
        setMessages((prev) => [...prev, { sender: "bot", text: helpfulMessage }]);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: fallbackReply }]);
      }
    } finally {
      setIsLoading(false);
    }
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
    if (props.context && item.id) {
      // Open document detail page in a modal overlay (full-screen)
      setSelectedDocumentId(item.id);
      // Mark that we're coming from home (tiles)
      sessionStorage.setItem(`documentBackTo_${item.id}`, 'home');
    }
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

  // Always show 5 tiles + 1 "View All" button, fill with empty placeholders if needed
  const displayTiles = React.useMemo(() => {
    const tiles: (DocumentItem | null)[] = [];
    for (let i = 0; i < 5; i++) {
      tiles.push(documents[i] || null);
    }
    return tiles;
  }, [documents]);

  const handleViewAll = () => {
    setShowViewAll(true);
  };

  const handleCloseViewAll = () => {
    setShowViewAll(false);
  };

  const handleViewDocumentFromList = (documentId: number, tags?: string[]) => {
    setShowViewAll(false);
    setSelectedDocumentId(documentId);
    // Store tags temporarily to pass to DocumentDetailPage
    if (tags) {
      sessionStorage.setItem(`documentTags_${documentId}`, JSON.stringify(tags));
    }
    // Mark that we're coming from library (ViewAllDocumentsPage)
    sessionStorage.setItem(`documentBackTo_${documentId}`, 'library');
  };

  const handleBackToLibrary = () => {
    setSelectedDocumentId(null);
    setShowViewAll(true);
  };

  /* ======================================================
     Render
  ====================================================== */
  return (
    <>
      {/* ======================= Document Tiles ======================== */}
      <div className={styles.questionSection}>
        <h2 className={styles.sectionTitle}>Recently Published</h2>
        <div className={styles.tilesContainer}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <>
              {displayTiles.map((doc, index) => (
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
              ))}
              <button className={styles.viewAllTile} onClick={handleViewAll}>
                <span className={styles.viewAllText}>View All</span>
              </button>
            </>
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

          <div className={styles.messages} ref={messagesContainerRef}>
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
                  className={msg.sender === "user" ? styles.userMsg : styles.botMsg}
                >
                  <MessageContent text={msg.text} />
                  {/* if the bot message has a link, render it as a clickable anchor below the text */}
                  {msg.sender === "bot" && msg.url && (
                    <div style={{ marginTop: 8 }}>
                      <a
                        href={msg.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        // use a safe cast because your CSS module may not include botLink yet
                        className={(styles as any).botLink}
                      >
                        {msg.title ? msg.title : msg.url}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Invisible element at the bottom for scroll reference */}
            <div ref={messagesEndRef} />

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

      {/* ======================= View All Documents Modal ======================== */}
      {showViewAll && props.context && (
        <div className={styles.viewAllModal}>
          <ViewAllDocumentsPage 
            context={props.context}
            onClose={handleCloseViewAll}
            onViewDocument={handleViewDocumentFromList}
          />
        </div>
      )}

      {/* ======================= Document Detail Page ======================== */}
      {selectedDocumentId && props.context && (
        <div className={styles.detailModal}>
          <DocumentDetailPage
            context={props.context}
            documentId={selectedDocumentId}
            onClose={handleCloseDetail}
            tags={(() => {
              // Retrieve tags from sessionStorage if available
              const storedTags = sessionStorage.getItem(`documentTags_${selectedDocumentId}`);
              if (storedTags) {
                try {
                  return JSON.parse(storedTags);
                } catch (e) {
                  return undefined;
                }
              }
              return undefined;
            })()}
            backTo={(() => {
              // Retrieve backTo from sessionStorage if available
              const storedBackTo = sessionStorage.getItem(`documentBackTo_${selectedDocumentId}`);
              return storedBackTo === 'library' ? 'library' : 'home';
            })()}
            onBackToLibrary={handleBackToLibrary}
          />
        </div>
      )}
    </>
  );
};
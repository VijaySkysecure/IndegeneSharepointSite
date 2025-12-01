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
   CONTEXT KNOWLEDGE MAP
============================================================ */
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
    return (
      "I can:\n" +
      "• Answer questions about Indegene, Skysecure, PRMA/HEOR, PV, oncology docs, CPC playbooks, etc.\n" +
      "• Share quick overviews from internal knowledge snippets.\n" +
      "• Tell you the current time, date, and day.\n\n" +
      'Try asking: "Tell me about breast cancer" or "Explain regulatory intelligence".'
    );
  }

  // Help
  if (text === "help" || text.startsWith("help ")) {
    return (
      "You can ask me things like:\n" +
      '• "What is Indegene?"\n' +
      '• "Tell me about regulatory intelligence"\n' +
      '• "What is breast cancer?"\n' +
      '• "What is the time?" or "What\'s today\'s date?"'
    );
  }

  // How are you
  if (text.includes("how are you")) {
    return "I’m just code, but I’m running fine and ready to help you with KM-related questions!";
  }

  return null;
};

/* ============================================================
   CONTEXT SEARCH LOGIC – boosted for employees/founder/CEO/HQ
============================================================ */
const normalize = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const getAnswerFromContext = (query: string): string => {
  const normQuery = normalize(query);

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
    normQuery.includes("ceo") ||
    normQuery.includes("chief executive");

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
    const queryTokens = new Set(normQuery.split(" "));

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
      const matched = entries.filter((s) => normalize(s).includes(extraPart));
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

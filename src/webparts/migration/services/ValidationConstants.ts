/**
 * Validation constants for Business Units and Departments
 */

export const ALLOWED_BUSINESS_UNITS = [
  'Organization Functions',
  'Chief Technology Office',
  'Co-Commercialization',
  'Enterprise Commercial',
  'Growth Markets',
  'Enterprise Clinical',
  'Indegene Japan',
  'Enterprise Medical',
  'Medical Devices',
  'Multi-Channel Marketing',
  'Strategy and Development',
  'Enterprise Product Office',
  'Transformative Software Solutions',
  'Finance and Legal',
  'Global Operations',
  'People Practices & Systems',
  'Sales Lifesciences'
];

export const ALLOWED_DEPARTMENTS = [
  'Leadership & Organization Development',
  'Chief Technology Office',
  'Enterprise Informatics',
  'Enterprise Product Office',
  'Enterprise Tech Office',
  'Research & Development',
  'Co-Commercialization',
  'Omnichannel Acceleration',
  'Enterprise Commercial',
  'Omnichannel Solutions',
  'Enterprise Commercial Activation and Change Management',
  'Content Transformation & Solutions',
  'Enterprise Commercial Delivery Services',
  'Customer Experience Success Office (CESO)',
  'Digital Enablement',
  'Data and Analytics',
  'Content and Design Solutions',
  'CXD Content and Experience Design',
  'Web and Portal Solutions',
  'Patient Experience',
  'Customer Advisory and Experience',
  'Digital Innovation and Transformation',
  'Campaign and Channel Operations',
  'ECS Platforms and Technology',
  'ECS Solutioning Presales and Marketing',
  'BU Sales',
  'Campaign Ops',
  'Growth Markets',
  'GM - Sales & Solutions',
  'Enterprise Clinical',
  'Clinical Data Management',
  'RWD & Biostats',
  'Clinical Operations',
  'Digital Patient Recruitment and Engagement',
  'Indegene Japan',
  'Sales - Japan',
  'Enterprise Medical',
  'Enterprise Medical Client Partnership and Advisory',
  'Medical Affairs',
  'Medical Communication',
  'Material Review, Operations and Compliance',
  'Promotional and Medical Review',
  'Learning & Development Solutions',
  'Health Care Practitioners (HCP)',
  'Learning and Development',
  'Safety',
  'Pharmacovigilance',
  'Regulatory Affairs',
  'Labelling Solutions',
  'Packaging Artwork and Labelling',
  'Health Economics & Outcomes Research',
  'PRMA Common',
  'Enterprise Medical Platforms and Technology',
  'Medical Devices',
  'Device Technology',
  'Quality and Regulatory',
  'Solutioning Sales and Marketing',
  'Medical Content Solutions',
  'Multi-Channel Marketing',
  'Medical Engagement Solutions',
  'Digital Solutions',
  'Strategy and Development',
  'Corporate Planning',
  'Corporate Strategy',
  'Corporate Development',
  'Enterprise Product Office',
  'Product - Medical',
  'Engineering - Commercial',
  'Product - Commercial',
  'Engineering - Medical',
  'Transformative Software Solutions',
  'Engineering Office',
  'Finance and Legal',
  'Business Finance',
  'Finance - Controllership',
  'Legal',
  'Taxation',
  'Global Operations',
  'Knowledge Management',
  'Risk Audit and Compliance',
  'Process Design and Automation',
  'Workforce Management',
  'Enterprise Program Management Office (EPMO)',
  'Operational Excellence',
  'People Practices & Systems',
  'HR Systems & Technology',
  'Talent Operations',
  'Talent Management and Engagement',
  'Talent Acquisition',
  'iAcademy',
  'Campus and Pool',
  'Organizational Development',
  'Sales Lifesciences',
  'Sales China',
  'Growth and Emerging Accounts',
  'Sales LifesSciences',
  'Key Accounts',
  'CultHealth',
  'Corporate Planning',
  'Global Delivery Center',
  'Emerging Biotech',
  'mySheets',
  'Activation Framework',
  'Amgen C 360',
  'All',
  'Indegene Products',
  'Management',
  'DT Consulting',
  'Commercial and Facilities',
  'Information Technology',
  'Editorial',
  'Marketing and Inside Sales'
];

/**
 * Find the best match from allowed values using fuzzy matching
 * Compatible with ES5 (no Array.find or String.includes)
 */
export function findBestMatch(value: string, allowedValues: string[]): string {
  if (!value || value.trim() === '') {
    return '';
  }

  const normalizedValue = value.trim().toLowerCase();
  
  // Exact match (case-insensitive)
  for (let i = 0; i < allowedValues.length; i++) {
    const allowed = allowedValues[i];
    if (allowed.toLowerCase() === normalizedValue) {
      return allowed;
    }
  }

  // Partial match (contains)
  for (let i = 0; i < allowedValues.length; i++) {
    const allowed = allowedValues[i];
    const allowedLower = allowed.toLowerCase();
    if (allowedLower.indexOf(normalizedValue) !== -1 || normalizedValue.indexOf(allowedLower) !== -1) {
      return allowed;
    }
  }

  // Fuzzy match - check if any words match
  const valueWords = normalizedValue.split(/\s+/);
  for (let i = 0; i < allowedValues.length; i++) {
    const allowed = allowedValues[i];
    const allowedWords = allowed.toLowerCase().split(/\s+/);
    
    for (let j = 0; j < valueWords.length; j++) {
      const word = valueWords[j];
      for (let k = 0; k < allowedWords.length; k++) {
        const allowedWord = allowedWords[k];
        if (allowedWord.indexOf(word) !== -1 || word.indexOf(allowedWord) !== -1) {
          return allowed;
        }
      }
    }
  }

  // No match found
  return '';
}


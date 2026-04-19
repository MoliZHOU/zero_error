export const TAX_COMPARISON = [
  { category: 'Corporate Tax', origin: 20.6, target: 21.0 },
  { category: 'State Income Tax', origin: 0, target: 8.8 },
  { category: 'Payroll Tax (Employer)', origin: 31.4, target: 7.65 },
  { category: 'VAT / Sales Tax', origin: 25.0, target: 7.25 },
  { category: 'Capital Gains', origin: 30.0, target: 20.0 },
];

export const TAX_NETWORK = {
  nodes: [
    { id: 'fed',      label: 'IRS (Federal)',     x: 150, y: 60,  color: '#4B286D' },
    { id: 'state',    label: 'State DOR',          x: 60,  y: 170, color: '#06B6D4' },
    { id: 'payroll',  label: 'Payroll Provider',   x: 150, y: 170, color: '#10B981' },
    { id: 'cpa',      label: 'CPA Firm',           x: 240, y: 170, color: '#F59E0B' },
    { id: 'treaty',   label: 'SE-US Treaty',       x: 150, y: 270, color: '#4B286D' },
  ],
  connections: [
    { from: 'fed', to: 'state' },
    { from: 'fed', to: 'cpa' },
    { from: 'fed', to: 'payroll' },
    { from: 'state', to: 'treaty' },
    { from: 'cpa', to: 'treaty' },
    { from: 'payroll', to: 'treaty' },
  ],
};

export const COMPLIANCE_RADAR = [
  { axis: 'SOC 2',       origin: 55, target: 90 },
  { axis: 'ISO 27001',   origin: 78, target: 72 },
  { axis: 'HIPAA',       origin: 15, target: 65 },
  { axis: 'PCI DSS',     origin: 40, target: 60 },
  { axis: 'GDPR',        origin: 92, target: 45 },
  { axis: 'SOX',         origin: 30, target: 80 },
];

export const COMPLIANCE_ECOSYSTEM = [
  { name: 'Vanta',       category: 'Automation',  x: 60,  y: 90,  size: 38 },
  { name: 'Drata',       category: 'Automation',  x: 150, y: 70,  size: 34 },
  { name: 'Secureframe', category: 'Automation',  x: 240, y: 110, size: 30 },
  { name: 'A-LIGN',      category: 'Auditor',     x: 80,  y: 210, size: 32 },
  { name: 'Schellman',   category: 'Auditor',     x: 170, y: 230, size: 36 },
  { name: 'Coalfire',    category: 'Auditor',     x: 255, y: 200, size: 30 },
];

export const EMPLOYMENT_COMPARISON = [
  { metric: 'Standard Work Week',       origin: '40 hrs',           target: '40 hrs',          risk: 'low' },
  { metric: 'Minimum Wage',             origin: 'Collective (~€13)', target: '$7.25 – $16.50', risk: 'medium' },
  { metric: 'Paid Annual Leave',        origin: '25 days (legal)',   target: '0 days (legal)',  risk: 'high' },
  { metric: 'Parental Leave',           origin: '480 days shared',   target: '12 wks unpaid',   risk: 'high' },
  { metric: 'Termination Notice',       origin: '1 – 6 months',      target: 'At-will',         risk: 'high' },
  { metric: 'Social Security Employer', origin: '31.4%',             target: '7.65%',           risk: 'low' },
  { metric: 'Health Insurance',         origin: 'State-provided',    target: 'Employer burden', risk: 'high' },
];

export const EMPLOYMENT_TALENT_HUBS = [
  { name: 'San Francisco', engineering: 210, compliance: 60 },
  { name: 'New York',      engineering: 175, compliance: 78 },
  { name: 'Austin',        engineering: 140, compliance: 35 },
  { name: 'Seattle',       engineering: 165, compliance: 42 },
  { name: 'Boston',        engineering: 155, compliance: 55 },
];

export const PRIVACY_STATES = [
  { name: 'California',   level: 'strict',   x: 60,  y: 180, code: 'CCPA + CPRA' },
  { name: 'Virginia',     level: 'strict',   x: 470, y: 200, code: 'VCDPA' },
  { name: 'Colorado',     level: 'strict',   x: 230, y: 180, code: 'CPA' },
  { name: 'Connecticut',  level: 'strict',   x: 560, y: 130, code: 'CTDPA' },
  { name: 'Texas',        level: 'moderate', x: 300, y: 250, code: 'TDPSA' },
  { name: 'Utah',         level: 'moderate', x: 170, y: 180, code: 'UCPA' },
  { name: 'Oregon',       level: 'moderate', x: 80,  y: 110, code: 'OCPA' },
  { name: 'Florida',      level: 'light',    x: 510, y: 270, code: 'FDBR (limited)' },
  { name: 'Illinois',     level: 'moderate', x: 360, y: 160, code: 'BIPA (biometric)' },
];

export const PRIVACY_CLOUD_PROVIDERS = [
  { name: 'AWS us-east-1',     dataResidency: 100, dpoSupport: 80 },
  { name: 'AWS eu-central-1',  dataResidency: 100, dpoSupport: 95 },
  { name: 'GCP us-central1',   dataResidency: 95,  dpoSupport: 70 },
  { name: 'Azure eastus',      dataResidency: 100, dpoSupport: 85 },
  { name: 'Azure westeurope',  dataResidency: 100, dpoSupport: 92 },
];

export const REGULATORY_MATRIX = [
  { regulation: 'Type Approval',          origin: 'met',      target: 'gap'     },
  { regulation: 'Safety Self-Certif.',    origin: 'partial',  target: 'met'     },
  { regulation: 'Data Retention',         origin: 'met',      target: 'partial' },
  { regulation: 'Disengagement Reporting',origin: 'gap',      target: 'met'     },
  { regulation: 'Cybersecurity (UNECE)',  origin: 'met',      target: 'partial' },
  { regulation: 'Over-the-Air Updates',   origin: 'partial',  target: 'partial' },
  { regulation: 'Recall Process',         origin: 'met',      target: 'met'     },
  { regulation: 'State Testing Permits',  origin: 'gap',      target: 'partial' },
];

export const OVERVIEW_SCORES: Record<string, { origin: number; target: number }> = {
  'Tax':                    { origin: 55, target: 78 },
  'Compliance':             { origin: 62, target: 85 },
  'Employment Law':         { origin: 85, target: 48 },
  'Data Privacy':           { origin: 50, target: 92 },
  'Regulatory Requirement': { origin: 45, target: 88 },
};

export interface RiskItem {
  id: string;
  topic: string;
  label: string;
  impact: number;
  probability: number;
}

export const RISK_ITEMS: RiskItem[] = [
  { id: 'tax-1',  topic: 'Tax',            label: 'IRA battery sourcing penalty',          impact: 85, probability: 55 },
  { id: 'tax-2',  topic: 'Tax',            label: 'Remote-worker sales tax nexus',          impact: 55, probability: 75 },
  { id: 'tax-3',  topic: 'Tax',            label: 'R&D credit disqualification',            impact: 45, probability: 30 },

  { id: 'cmp-1',  topic: 'Compliance',     label: 'SOC 2 blocks enterprise deals',          impact: 80, probability: 70 },
  { id: 'cmp-2',  topic: 'Compliance',     label: 'Third-party vendor risk exposure',       impact: 60, probability: 50 },
  { id: 'cmp-3',  topic: 'Compliance',     label: 'ISO 27001 certification lapse',          impact: 40, probability: 25 },

  { id: 'emp-1',  topic: 'Employment Law', label: 'AB5 worker misclassification',           impact: 82, probability: 78 },
  { id: 'emp-2',  topic: 'Employment Law', label: 'H-1B cap denial for key hire',           impact: 55, probability: 55 },
  { id: 'emp-3',  topic: 'Employment Law', label: 'At-will termination lawsuit',            impact: 75, probability: 28 },

  { id: 'dp-1',   topic: 'Data Privacy',   label: 'GDPR-US data transfer invalidation',     impact: 90, probability: 72 },
  { id: 'dp-2',   topic: 'Data Privacy',   label: 'CCPA class action on camera data',       impact: 82, probability: 60 },
  { id: 'dp-3',   topic: 'Data Privacy',   label: 'BIPA biometric consent violation',       impact: 70, probability: 45 },

  { id: 'reg-1',  topic: 'Regulatory Requirement', label: 'State DMV permit revocation',    impact: 88, probability: 68 },
  { id: 'reg-2',  topic: 'Regulatory Requirement', label: 'NHTSA recall mandate',           impact: 85, probability: 40 },
  { id: 'reg-3',  topic: 'Regulatory Requirement', label: 'FCC spectrum misuse penalty',    impact: 50, probability: 22 },
];

export const REGULATORY_NETWORK = {
  nodes: [
    { id: 'nhtsa', label: 'NHTSA',   x: 150, y: 60,  color: '#4B286D' },
    { id: 'dot',   label: 'US DOT',  x: 60,  y: 150, color: '#06B6D4' },
    { id: 'fcc',   label: 'FCC',     x: 240, y: 150, color: '#10B981' },
    { id: 'epa',   label: 'EPA',     x: 60,  y: 250, color: '#F59E0B' },
    { id: 'ftc',   label: 'FTC',     x: 240, y: 250, color: '#4B286D' },
    { id: 'dmv',   label: 'State DMV',x: 150, y: 200, color: '#06B6D4' },
  ],
  connections: [
    { from: 'nhtsa', to: 'dot' },
    { from: 'nhtsa', to: 'fcc' },
    { from: 'nhtsa', to: 'dmv' },
    { from: 'dot', to: 'dmv' },
    { from: 'dot', to: 'epa' },
    { from: 'ftc', to: 'dmv' },
    { from: 'fcc', to: 'ftc' },
  ],
};

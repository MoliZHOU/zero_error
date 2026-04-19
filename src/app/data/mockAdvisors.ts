export interface Advisor {
  name: string;
  title: string;
  firm: string;
  location: string;
  specialties: string[];
  rating: number;
  hourlyRate: string;
  initials: string;
  accent: string;
}

export const ADVISORS_BY_TOPIC: Record<string, Advisor[]> = {
  'Tax': [
    {
      name: 'Margaret Chen',
      title: 'Senior Tax Partner',
      firm: 'Baker McKenzie',
      location: 'New York, NY',
      specialties: ['Cross-border M&A', 'Transfer Pricing', 'US-EU Tax Treaty'],
      rating: 4.9,
      hourlyRate: '$850/hr',
      initials: 'MC',
      accent: '#4B286D',
    },
    {
      name: 'David Rodriguez',
      title: 'International Tax Advisor',
      firm: 'PwC',
      location: 'San Francisco, CA',
      specialties: ['Delaware C-Corp', 'Sales Tax Nexus', 'R&D Credits'],
      rating: 4.8,
      hourlyRate: '$720/hr',
      initials: 'DR',
      accent: '#06B6D4',
    },
    {
      name: 'Anna Lindqvist',
      title: 'Nordic Tax Specialist',
      firm: 'Deloitte',
      location: 'Stockholm, SE',
      specialties: ['SE-US Structuring', 'IP Holdco', 'Payroll Tax'],
      rating: 4.9,
      hourlyRate: '$680/hr',
      initials: 'AL',
      accent: '#10B981',
    },
  ],

  'Compliance': [
    {
      name: 'Jonathan Park',
      title: 'Chief Compliance Officer',
      firm: 'Protiviti',
      location: 'Chicago, IL',
      specialties: ['SOC 2 Type II', 'ISO 27001', 'Audit Readiness'],
      rating: 4.9,
      hourlyRate: '$780/hr',
      initials: 'JP',
      accent: '#4B286D',
    },
    {
      name: 'Priya Krishnamurthy',
      title: 'Compliance Director',
      firm: 'KPMG',
      location: 'Austin, TX',
      specialties: ['HIPAA', 'PCI DSS', 'Risk Assessment'],
      rating: 4.7,
      hourlyRate: '$650/hr',
      initials: 'PK',
      accent: '#06B6D4',
    },
    {
      name: 'Michael O\'Brien',
      title: 'Regulatory Compliance Lead',
      firm: 'EY',
      location: 'Boston, MA',
      specialties: ['SOX', 'Anti-Money Laundering', 'Third-Party Risk'],
      rating: 4.8,
      hourlyRate: '$710/hr',
      initials: 'MO',
      accent: '#F59E0B',
    },
  ],

  'Employment Law': [
    {
      name: 'Sarah Goldberg',
      title: 'Employment Law Partner',
      firm: 'Littler Mendelson',
      location: 'Los Angeles, CA',
      specialties: ['AB5 Worker Classification', 'Wage & Hour', 'H-1B'],
      rating: 4.9,
      hourlyRate: '$895/hr',
      initials: 'SG',
      accent: '#4B286D',
    },
    {
      name: 'Robert Kim',
      title: 'Immigration Attorney',
      firm: 'Fragomen',
      location: 'New York, NY',
      specialties: ['O-1 / EB-1', 'L-1 Transfers', 'Green Card Strategy'],
      rating: 4.8,
      hourlyRate: '$675/hr',
      initials: 'RK',
      accent: '#06B6D4',
    },
    {
      name: 'Jennifer Martinez',
      title: 'HR Compliance Counsel',
      firm: 'Ogletree Deakins',
      location: 'Atlanta, GA',
      specialties: ['Multi-state Payroll', 'Benefits', 'Termination Risk'],
      rating: 4.7,
      hourlyRate: '$590/hr',
      initials: 'JM',
      accent: '#10B981',
    },
  ],

  'Data Privacy': [
    {
      name: 'Elena Ivanova',
      title: 'Privacy Counsel',
      firm: 'Hogan Lovells',
      location: 'Washington, DC',
      specialties: ['CCPA / CPRA', 'GDPR Mapping', 'Data Transfers'],
      rating: 4.9,
      hourlyRate: '$820/hr',
      initials: 'EI',
      accent: '#4B286D',
    },
    {
      name: 'Thomas Weber',
      title: 'DPO-as-a-Service Lead',
      firm: 'OneTrust Advisory',
      location: 'Remote (EU)',
      specialties: ['Schrems II', 'DPIA', 'Cookie Governance'],
      rating: 4.8,
      hourlyRate: '$540/hr',
      initials: 'TW',
      accent: '#06B6D4',
    },
    {
      name: 'Rachel Nguyen',
      title: 'AI Governance Lawyer',
      firm: 'Wilson Sonsini',
      location: 'Palo Alto, CA',
      specialties: ['AI Act Readiness', 'Model Training Data', 'CPRA'],
      rating: 4.9,
      hourlyRate: '$950/hr',
      initials: 'RN',
      accent: '#F59E0B',
    },
  ],

  'Regulatory Requirement': [
    {
      name: 'James Thornton',
      title: 'Regulatory Affairs Director',
      firm: 'Sidley Austin',
      location: 'Washington, DC',
      specialties: ['NHTSA Filings', 'FCC Licensing', 'FMVSS Compliance'],
      rating: 4.9,
      hourlyRate: '$910/hr',
      initials: 'JT',
      accent: '#4B286D',
    },
    {
      name: 'Mei Lin Zhang',
      title: 'Senior Regulatory Consultant',
      firm: 'Navigant',
      location: 'Detroit, MI',
      specialties: ['State DMV Negotiation', 'AV Testing Permits', 'Part 571'],
      rating: 4.8,
      hourlyRate: '$720/hr',
      initials: 'MZ',
      accent: '#06B6D4',
    },
    {
      name: 'Carlos Fernandez',
      title: 'Public Policy Advisor',
      firm: 'Akin Gump',
      location: 'Sacramento, CA',
      specialties: ['Federal Rulemaking', 'State Legislative Tracking', 'NHTSA Exemptions'],
      rating: 4.7,
      hourlyRate: '$780/hr',
      initials: 'CF',
      accent: '#10B981',
    },
  ],
};

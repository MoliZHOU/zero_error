export type IndustryKey =
  | 'ad-adas'
  | 'fintech'
  | 'healthcare'
  | 'saas'
  | 'manufacturing';

export type MarketKey =
  | 'sweden' | 'germany' | 'uk' | 'france' | 'japan'
  | 'usa' | 'china' | 'eu' | 'india' | 'brazil';

export type CompanySizeKey = 'enterprise' | 'midmarket' | 'small' | 'startup';

export interface FormData {
  companyName: string;
  companySize: string;
  industry: string;
  originMarket: string;
  targetMarket: string;
}

export const INDUSTRY_LABEL: Record<IndustryKey, string> = {
  'ad-adas': 'Autonomous Driving (AD/ADAS) Software',
  'fintech': 'Financial Technology',
  'healthcare': 'Healthcare & Life Sciences',
  'saas': 'Software & SaaS',
  'manufacturing': 'Manufacturing',
};

export const MARKET_LABEL: Record<MarketKey, string> = {
  sweden: 'Sweden',
  germany: 'Germany',
  uk: 'United Kingdom',
  france: 'France',
  japan: 'Japan',
  usa: 'USA',
  china: 'China',
  eu: 'European Union',
  india: 'India',
  brazil: 'Brazil',
};

export const COMPANY_SIZE_LABEL: Record<CompanySizeKey, string> = {
  enterprise: 'Enterprise',
  midmarket: 'Mid-Market',
  small: 'Small Business',
  startup: 'Startup',
};

export const INDUSTRY_TAB_NAMES: Record<IndustryKey, [string, string, string]> = {
  'ad-adas':       ['Regulatory Gaps', 'AV Ecosystem & Testing',      'Expert Advisory'],
  'fintech':       ['Regulatory Gaps', 'Fintech Licensing & Market',  'Expert Advisory'],
  'healthcare':    ['Regulatory Gaps', 'Clinical Ecosystem & Access', 'Expert Advisory'],
  'saas':          ['Regulatory Gaps', 'SaaS GTM & Ecosystem',        'Expert Advisory'],
  'manufacturing': ['Regulatory Gaps', 'Supply Chain Ecosystem',      'Expert Advisory'],
};

export const DEFAULT_FORM_DATA = {
  companyName: 'Zenseact',
  companySize: 'enterprise' as CompanySizeKey,
  industry: 'ad-adas' as IndustryKey,
  originMarket: 'sweden' as MarketKey,
  targetMarket: 'usa' as MarketKey,
};

export const DEFAULT_TOPICS: string[] = ['Data Privacy', 'Regulatory Requirement'];

export interface ResolvedFormData {
  companyName: string;
  companySize: CompanySizeKey;
  industry: IndustryKey;
  originMarket: MarketKey;
  targetMarket: MarketKey;
}

export function resolveFormData(input: FormData): ResolvedFormData {
  return {
    companyName: input.companyName || DEFAULT_FORM_DATA.companyName,
    companySize: input.companySize in COMPANY_SIZE_LABEL
      ? (input.companySize as CompanySizeKey)
      : DEFAULT_FORM_DATA.companySize,
    industry: input.industry in INDUSTRY_LABEL
      ? (input.industry as IndustryKey)
      : DEFAULT_FORM_DATA.industry,
    originMarket: input.originMarket in MARKET_LABEL
      ? (input.originMarket as MarketKey)
      : DEFAULT_FORM_DATA.originMarket,
    targetMarket: input.targetMarket in MARKET_LABEL
      ? (input.targetMarket as MarketKey)
      : DEFAULT_FORM_DATA.targetMarket,
  };
}

export function getTabNames(industry: string): [string, string, string] {
  return INDUSTRY_TAB_NAMES[industry as IndustryKey] || INDUSTRY_TAB_NAMES['ad-adas'];
}

export const BRAND = {
  primary: '#4B286D',
  cyan: '#06B6D4',
  green: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  slateBorder: '#CBD5E1',
  slateGrid: '#E2E8F0',
  slateText: '#64748B',
  slateDark: '#475569',
} as const;

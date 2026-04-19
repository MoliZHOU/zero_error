import type { FormData } from '../config/industryConfig';
import { MARKET_LABEL, INDUSTRY_LABEL, resolveFormData } from '../config/industryConfig';

export const TOPIC_PROMPTS: Record<string, string[]> = {
  'Tax': [
    'Delaware C-corp benefits',
    'Sales tax nexus rules',
    'R&D tax credit eligibility',
  ],
  'Compliance': [
    'SOC 2 vs ISO 27001',
    'Audit cost estimate',
    'HIPAA scoping checklist',
  ],
  'Employment Law': [
    'Compare CA vs TX labor law',
    'H-1B sponsorship cost',
    'At-will employment risks',
  ],
  'Data Privacy': [
    'CCPA vs GDPR gap',
    'Data localization laws',
    'DPO requirement in US',
  ],
  'Regulatory Requirement': [
    'FCC filing timeline',
    'Key US regulators list',
    'NHTSA exemption process',
  ],
};

const TOPIC_BULLETS: Record<string, string> = {
  'Tax': 'state-by-state tax nexus and SE-US treaty allocation',
  'Compliance': 'SOC 2 / ISO 27001 readiness gaps',
  'Employment Law': 'AB5 worker classification and multi-state payroll',
  'Data Privacy': 'CCPA / CPRA cloud training data handling',
  'Regulatory Requirement': 'NHTSA filings and state DMV permits',
};

export function buildGreeting(formData: FormData, topics: string[]): string {
  const resolved = resolveFormData(formData);
  const origin = MARKET_LABEL[resolved.originMarket];
  const target = MARKET_LABEL[resolved.targetMarket];
  const industry = INDUSTRY_LABEL[resolved.industry];
  const company = resolved.companyName;

  if (topics.length === 0) {
    return `${company}'s expansion from ${origin} to ${target} in ${industry} involves several compliance dimensions. Select an area of concern to get started.`;
  }

  const bullets = topics
    .map(t => TOPIC_BULLETS[t])
    .filter(Boolean)
    .slice(0, 3);

  const bulletText =
    bullets.length === 1
      ? bullets[0]
      : bullets.length === 2
      ? `${bullets[0]} and ${bullets[1]}`
      : `${bullets.slice(0, -1).join(', ')}, and ${bullets[bullets.length - 1]}`;

  return `${company}'s expansion from ${origin} to ${target} in ${industry} requires careful navigation of ${bulletText}. Where would you like to start?`;
}

export function buildQuickPrompts(topics: string[], max = 4): string[] {
  if (topics.length === 0) {
    return ['Compare CA vs TX testing rules', 'Data localization laws'];
  }
  const pool: string[] = [];
  const topicList = topics.length > 0 ? topics : Object.keys(TOPIC_PROMPTS);
  for (const topic of topicList) {
    const prompts = TOPIC_PROMPTS[topic] || [];
    if (prompts.length > 0) pool.push(prompts[0]);
  }
  for (const topic of topicList) {
    const prompts = TOPIC_PROMPTS[topic] || [];
    if (prompts.length > 1) pool.push(prompts[1]);
  }
  return pool.slice(0, max);
}

export const MOCK_REPLY =
  "Based on your expansion profile, I'd recommend prioritizing the highlighted regulatory gaps in the left panel. This is a demo response — in production, I would pull live regulatory data and cite specific statutes for your jurisdictions.";

import type { ComponentType } from 'react';
import type { FormData } from './industryConfig';

import { TaxGapsView, TaxEcosystemView, TaxAdvisoryView } from '../components/topics/TaxViews';
import {
  ComplianceGapsView, ComplianceEcosystemView, ComplianceAdvisoryView,
} from '../components/topics/ComplianceViews';
import {
  EmploymentGapsView, EmploymentEcosystemView, EmploymentAdvisoryView,
} from '../components/topics/EmploymentLawViews';
import {
  PrivacyGapsView, PrivacyEcosystemView, PrivacyAdvisoryView,
} from '../components/topics/DataPrivacyViews';
import {
  RegGapsView, RegEcosystemView, RegAdvisoryView,
} from '../components/topics/RegulatoryRequirementViews';

export type TopicKey =
  | 'Tax'
  | 'Compliance'
  | 'Employment Law'
  | 'Data Privacy'
  | 'Regulatory Requirement';

export const ALL_TOPICS: TopicKey[] = [
  'Tax',
  'Compliance',
  'Employment Law',
  'Data Privacy',
  'Regulatory Requirement',
];

export interface TopicViewProps {
  formData: FormData;
}

type TabViews = Record<1 | 2 | 3, ComponentType<TopicViewProps>>;

export const TOPIC_VIEWS: Record<TopicKey, TabViews> = {
  'Tax': {
    1: TaxGapsView,
    2: TaxEcosystemView,
    3: TaxAdvisoryView,
  },
  'Compliance': {
    1: ComplianceGapsView,
    2: ComplianceEcosystemView,
    3: ComplianceAdvisoryView,
  },
  'Employment Law': {
    1: EmploymentGapsView,
    2: EmploymentEcosystemView,
    3: EmploymentAdvisoryView,
  },
  'Data Privacy': {
    1: PrivacyGapsView,
    2: PrivacyEcosystemView,
    3: PrivacyAdvisoryView,
  },
  'Regulatory Requirement': {
    1: RegGapsView,
    2: RegEcosystemView,
    3: RegAdvisoryView,
  },
};

export function getViewsForTopic(topic: string, tabIndex: 1 | 2 | 3) {
  const topicViews = TOPIC_VIEWS[topic as TopicKey];
  if (!topicViews) return null;
  return topicViews[tabIndex];
}

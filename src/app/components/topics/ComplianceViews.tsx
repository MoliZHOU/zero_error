import type { FormData } from '../../config/industryConfig';
import { MARKET_LABEL, resolveFormData } from '../../config/industryConfig';
import { RadarChart } from './shared/RadarChart';
import { BubbleEcosystem } from './shared/BubbleEcosystem';
import { AdvisorCardList } from './shared/AdvisorCardList';
import { COMPLIANCE_RADAR, COMPLIANCE_ECOSYSTEM } from '../../data/mockCharts';
import { ADVISORS_BY_TOPIC } from '../../data/mockAdvisors';

interface ViewProps {
  formData: FormData;
}

export function ComplianceGapsView({ formData }: ViewProps) {
  const f = resolveFormData(formData);
  return (
    <RadarChart
      title="Compliance Framework Coverage"
      subtitle={`Current posture vs ${MARKET_LABEL[f.targetMarket]} expected baseline`}
      data={COMPLIANCE_RADAR}
      originLabel={`${MARKET_LABEL[f.originMarket]} (current)`}
      targetLabel={`${MARKET_LABEL[f.targetMarket]} (required)`}
    />
  );
}

export function ComplianceEcosystemView() {
  return (
    <BubbleEcosystem
      title="Compliance Vendor Ecosystem"
      subtitle="Automation platforms and accredited auditors"
      bubbles={COMPLIANCE_ECOSYSTEM}
    />
  );
}

export function ComplianceAdvisoryView() {
  return (
    <AdvisorCardList
      title="Recommended Compliance Advisors"
      subtitle="Senior practitioners with multi-framework audit experience"
      advisors={ADVISORS_BY_TOPIC['Compliance']}
    />
  );
}

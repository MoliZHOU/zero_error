import type { FormData } from '../../config/industryConfig';
import { MARKET_LABEL, resolveFormData } from '../../config/industryConfig';
import { GapMatrix } from './shared/GapMatrix';
import { NetworkGraph } from './shared/NetworkGraph';
import { AdvisorCardList } from './shared/AdvisorCardList';
import { REGULATORY_MATRIX, REGULATORY_NETWORK } from '../../data/mockCharts';
import { ADVISORS_BY_TOPIC } from '../../data/mockAdvisors';

interface ViewProps {
  formData: FormData;
}

export function RegGapsView({ formData }: ViewProps) {
  const f = resolveFormData(formData);
  return (
    <GapMatrix
      title="Regulatory Requirement Gap Matrix"
      subtitle={`Compliance status: ${MARKET_LABEL[f.originMarket]} vs ${MARKET_LABEL[f.targetMarket]}`}
      rows={REGULATORY_MATRIX as any}
      originLabel={MARKET_LABEL[f.originMarket]}
      targetLabel={MARKET_LABEL[f.targetMarket]}
    />
  );
}

export function RegEcosystemView() {
  return (
    <NetworkGraph
      title="US Regulator Network"
      subtitle="Federal and state agencies governing AD/ADAS deployment"
      nodes={REGULATORY_NETWORK.nodes}
      connections={REGULATORY_NETWORK.connections}
    />
  );
}

export function RegAdvisoryView() {
  return (
    <AdvisorCardList
      title="Recommended Regulatory Affairs Advisors"
      subtitle="Government relations and agency-facing counsel"
      advisors={ADVISORS_BY_TOPIC['Regulatory Requirement']}
    />
  );
}

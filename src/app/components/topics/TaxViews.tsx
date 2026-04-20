import type { FormData } from '../../config/industryConfig';
import { MARKET_LABEL, resolveFormData } from '../../config/industryConfig';
import { ComparisonBarChart } from './shared/ComparisonBarChart';
import { NetworkGraph } from './shared/NetworkGraph';
import { AdvisorCardList } from './shared/AdvisorCardList';
import { TAX_COMPARISON, TAX_NETWORK } from '../../data/mockCharts';
import { ADVISORS_BY_TOPIC } from '../../data/mockAdvisors';

interface ViewProps {
  formData: FormData;
}

export function TaxGapsView({ formData }: ViewProps) {
  const f = resolveFormData(formData);
  return (
    <ComparisonBarChart
      title="Cross-Border Tax Burden Comparison"
      subtitle={`Effective rates: ${MARKET_LABEL[f.originMarket]} vs ${MARKET_LABEL[f.targetMarket]}`}
      data={TAX_COMPARISON}
      originLabel={MARKET_LABEL[f.originMarket]}
      targetLabel={MARKET_LABEL[f.targetMarket]}
      unit="%"
      axisLabel="Effective Rate (%)"
      layout="vertical"
    />
  );
}

export function TaxEcosystemView({ formData }: ViewProps) {
  const f = resolveFormData(formData);
  return (
    <NetworkGraph
      title="Tax Authority & Advisor Network"
      subtitle={`Key tax stakeholders for ${MARKET_LABEL[f.targetMarket]} entry`}
      nodes={TAX_NETWORK.nodes}
      connections={TAX_NETWORK.connections}
    />
  );
}

export function TaxAdvisoryView() {
  return (
    <AdvisorCardList
      title="Recommended Tax Advisors"
      subtitle="Vetted CPAs and tax attorneys with cross-border expertise"
      advisors={ADVISORS_BY_TOPIC['Tax']}
    />
  );
}

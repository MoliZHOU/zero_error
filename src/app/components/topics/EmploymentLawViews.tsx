import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { FormData } from '../../config/industryConfig';
import { MARKET_LABEL, resolveFormData } from '../../config/industryConfig';
import { ComparisonTable } from './shared/ComparisonTable';
import { CardShell } from './shared/CardShell';
import { AdvisorCardList } from './shared/AdvisorCardList';
import { EMPLOYMENT_COMPARISON, EMPLOYMENT_TALENT_HUBS } from '../../data/mockCharts';
import { ADVISORS_BY_TOPIC } from '../../data/mockAdvisors';

interface ViewProps {
  formData: FormData;
}

export function EmploymentGapsView({ formData }: ViewProps) {
  const f = resolveFormData(formData);
  return (
    <ComparisonTable
      title="Labor Law Side-by-Side"
      subtitle={`${MARKET_LABEL[f.originMarket]} vs ${MARKET_LABEL[f.targetMarket]} employment obligations`}
      rows={EMPLOYMENT_COMPARISON as any}
      originLabel={MARKET_LABEL[f.originMarket]}
      targetLabel={MARKET_LABEL[f.targetMarket]}
    />
  );
}

export function EmploymentEcosystemView() {
  return (
    <CardShell
      title="US Talent Hubs — Headcount & Fully-Loaded Cost"
      subtitle="Top 5 metros for AD/ADAS engineering and compliance roles"
    >
      <div style={{ height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={EMPLOYMENT_TALENT_HUBS}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" tick={{ fill: '#64748B' }} axisLine={{ stroke: '#CBD5E1' }} />
            <YAxis
              tick={{ fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
              label={{ value: 'Cost ($K/year)', angle: -90, position: 'insideLeft', fill: '#64748B' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="rect" />
            <Bar dataKey="engineering" fill="#4B286D" name="Engineering" radius={[4, 4, 0, 0]} />
            <Bar dataKey="compliance" fill="#06B6D4" name="Compliance / Legal" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardShell>
  );
}

export function EmploymentAdvisoryView() {
  return (
    <AdvisorCardList
      title="Recommended HR & Immigration Counsel"
      subtitle="Attorneys for workforce, benefits, and visa strategy"
      advisors={ADVISORS_BY_TOPIC['Employment Law']}
    />
  );
}

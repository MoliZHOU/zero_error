import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { RegionHeatMap } from './shared/RegionHeatMap';
import { CardShell } from './shared/CardShell';
import { AdvisorCardList } from './shared/AdvisorCardList';
import { PRIVACY_STATES, PRIVACY_CLOUD_PROVIDERS } from '../../data/mockCharts';
import { ADVISORS_BY_TOPIC } from '../../data/mockAdvisors';

export function PrivacyGapsView() {
  return (
    <RegionHeatMap
      title="US State Privacy Law Strictness"
      subtitle="Enforcement intensity and consumer rights coverage by state"
      regions={PRIVACY_STATES as any}
      legendLabels={{
        strict: 'Strict (CCPA-like)',
        moderate: 'Moderate',
        light: 'Light / Limited',
      }}
    />
  );
}

export function PrivacyEcosystemView() {
  return (
    <CardShell
      title="Cloud & DPO Provider Readiness"
      subtitle="Data residency guarantees and DPO-as-a-service support"
    >
      <div style={{ height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={PRIVACY_CLOUD_PROVIDERS}
            layout="vertical"
            margin={{ top: 10, right: 20, bottom: 20, left: 120 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              type="number"
              tick={{ fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
              domain={[0, 100]}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
              width={110}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
              }}
              formatter={(v: number) => `${v}%`}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="rect" />
            <Bar dataKey="dataResidency" fill="#4B286D" name="Data Residency" radius={[0, 4, 4, 0]} />
            <Bar dataKey="dpoSupport" fill="#06B6D4" name="DPO Support" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardShell>
  );
}

export function PrivacyAdvisoryView() {
  return (
    <AdvisorCardList
      title="Recommended Privacy Counsel"
      subtitle="CCPA, CPRA, and cross-border data transfer specialists"
      advisors={ADVISORS_BY_TOPIC['Data Privacy']}
    />
  );
}

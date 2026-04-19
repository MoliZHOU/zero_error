import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { CardShell } from './CardShell';

interface ComparisonBarChartProps {
  title: string;
  subtitle?: string;
  data: Array<{ category: string; origin: number; target: number }>;
  originLabel: string;
  targetLabel: string;
  unit?: string;
  axisLabel?: string;
  layout?: 'vertical' | 'horizontal';
}

export function ComparisonBarChart({
  title,
  subtitle,
  data,
  originLabel,
  targetLabel,
  unit = '%',
  axisLabel,
  layout = 'horizontal',
}: ComparisonBarChartProps) {
  const isVertical = layout === 'vertical';
  return (
    <CardShell title={title} subtitle={subtitle}>
      <div style={{ height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout={isVertical ? 'vertical' : 'horizontal'}
            margin={{ top: 10, right: 20, bottom: 20, left: isVertical ? 100 : 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            {isVertical ? (
              <>
                <XAxis
                  type="number"
                  tick={{ fill: '#64748B' }}
                  axisLine={{ stroke: '#CBD5E1' }}
                  label={axisLabel ? { value: axisLabel, position: 'insideBottom', offset: -5, fill: '#64748B' } : undefined}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  tick={{ fill: '#64748B' }}
                  axisLine={{ stroke: '#CBD5E1' }}
                  width={110}
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey="category"
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  axisLine={{ stroke: '#CBD5E1' }}
                />
                <YAxis
                  tick={{ fill: '#64748B' }}
                  axisLine={{ stroke: '#CBD5E1' }}
                  label={axisLabel ? { value: axisLabel, angle: -90, position: 'insideLeft', fill: '#64748B' } : undefined}
                />
              </>
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
              }}
              formatter={(v: number) => `${v}${unit}`}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="rect" />
            <Bar
              dataKey="origin"
              fill="#4B286D"
              name={originLabel}
              radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
            />
            <Bar
              dataKey="target"
              fill="#06B6D4"
              name={targetLabel}
              radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardShell>
  );
}

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Silicon Valley',
    engineering: 185,
    compliance: 45
  },
  {
    name: 'Austin',
    engineering: 135,
    compliance: 32
  },
  {
    name: 'Detroit',
    engineering: 98,
    compliance: 28
  }
];

export function TalentHubChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="mb-4" style={{ color: '#4B286D' }}>Talent Hubs & Cost Analysis</h3>

      <div style={{ height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
            />
            <YAxis
              tick={{ fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
              label={{ value: 'Cost ($K/year)', angle: -90, position: 'insideLeft', fill: '#64748B' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px'
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '10px' }}
              iconType="rect"
            />
            <Bar
              dataKey="engineering"
              fill="#4B286D"
              name="Engineering Salaries"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="compliance"
              fill="#06B6D4"
              name="Compliance Costs"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Silicon Valley', engineering: 185, compliance: 45 },
  { name: 'Austin', engineering: 135, compliance: 32 },
  { name: 'Detroit', engineering: 98, compliance: 28 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white p-3"
        style={{ border: '1px solid #e5e7eb', fontFamily: 'Inter, sans-serif' }}
      >
        <p className="text-slate-700 text-xs mb-2" style={{ fontWeight: 600 }}>{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: <span style={{ fontWeight: 500 }}>${entry.value}K</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function TalentHubChart() {
  return (
    <div
      className="bg-white p-6"
      style={{ border: '1px solid #e5e7eb' }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-[2px] w-5" style={{ backgroundColor: '#4B286D' }} />
        <h3 className="text-slate-800" style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
          Talent Hubs &amp; Cost Analysis
        </h3>
      </div>

      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 16, bottom: 10, left: 16 }} barCategoryGap="32%">
            <CartesianGrid strokeDasharray="3 3" stroke="#F0EDF5" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#9ca3af', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${v}K`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F7F5FA' }} />
            <Legend
              wrapperStyle={{ paddingTop: '12px', fontFamily: 'Inter, sans-serif', fontSize: '11px' }}
              iconType="square"
              iconSize={10}
            />
            <Bar
              dataKey="engineering"
              fill="#4B286D"
              name="Engineering Salaries"
              radius={[0, 0, 0, 0]}
              maxBarSize={36}
            />
            <Bar
              dataKey="compliance"
              fill="#00B0B9"
              name="Compliance Costs"
              radius={[0, 0, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

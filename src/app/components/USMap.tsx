export function USMap() {
  const states = [
    { name: 'California', status: 'heavy', x: 60, y: 180 },
    { name: 'Texas', status: 'testing', x: 320, y: 240 },
    { name: 'Arizona', status: 'driverless', x: 140, y: 220 },
    { name: 'Nevada', status: 'driverless', x: 90, y: 160 },
    { name: 'Florida', status: 'testing', x: 520, y: 280 },
  ];

  const statusColors = {
    testing: '#10B981',
    driverless: '#06B6D4',
    heavy: '#F59E0B'
  };

  const statusLabels = {
    testing: 'Testing Allowed',
    driverless: 'Driverless Allowed',
    heavy: 'Heavy Reporting'
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="mb-4" style={{ color: '#4B286D' }}>US AV Testing & Deployment Landscape</h3>

      {/* Map Placeholder */}
      <div className="relative bg-slate-50 rounded-lg overflow-hidden border border-slate-200" style={{ height: '320px' }}>
        <svg width="100%" height="320" viewBox="0 0 700 320" className="bg-gradient-to-br from-slate-50 to-slate-100">
          {/* Simplified US outline */}
          <path
            d="M 50 80 L 600 80 L 620 100 L 620 280 L 500 290 L 100 290 L 50 260 Z"
            fill="#E2E8F0"
            stroke="#CBD5E1"
            strokeWidth="2"
          />

          {/* State highlights */}
          {states.map((state, idx) => (
            <g key={idx}>
              <circle
                cx={state.x}
                cy={state.y}
                r="24"
                fill={statusColors[state.status as keyof typeof statusColors]}
                opacity="0.8"
              />
              <text
                x={state.x}
                y={state.y + 40}
                textAnchor="middle"
                className="text-xs"
                fill="#475569"
              >
                {state.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 mt-5">
        {Object.entries(statusLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: statusColors[key as keyof typeof statusColors] }}
            />
            <span className="text-slate-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

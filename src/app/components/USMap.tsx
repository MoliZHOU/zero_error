export function USMap() {
  const states = [
    { name: 'California', status: 'heavy', x: 80, y: 180 },
    { name: 'Texas', status: 'testing', x: 310, y: 255 },
    { name: 'Arizona', status: 'driverless', x: 160, y: 225 },
    { name: 'Nevada', status: 'driverless', x: 105, y: 165 },
    { name: 'Florida', status: 'testing', x: 500, y: 285 },
    { name: 'Michigan', status: 'testing', x: 440, y: 145 },
  ];

  const statusColors: Record<string, string> = {
    testing: '#00B0B9',
    driverless: '#4B286D',
    heavy: '#C41F8A',
  };

  const statusLabels: Record<string, string> = {
    testing: 'AV Testing Allowed',
    driverless: 'Driverless Permitted',
    heavy: 'Heavy Reporting Req.',
  };

  return (
    <div
      className="bg-white p-6"
      style={{ border: '1px solid #e5e7eb' }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-[2px] w-5" style={{ backgroundColor: '#4B286D' }} />
        <h3 className="text-slate-800" style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
          US AV Testing &amp; Deployment Landscape
        </h3>
      </div>

      {/* Map */}
      <div
        className="relative overflow-hidden"
        style={{ height: '300px', backgroundColor: '#F7F5FA', border: '1px solid #e5e7eb' }}
      >
        <svg width="100%" height="300" viewBox="0 0 660 300">
          {/* Ocean background */}
          <rect width="660" height="300" fill="#EEF1F7" />

          {/* US shape — simplified continental outline */}
          <path
            d="M 55 55 L 130 48 L 200 52 L 270 50 L 360 48 L 430 55 L 510 60 L 575 75
               L 600 100 L 610 140 L 605 185 L 590 220 L 560 260 L 510 278
               L 450 282 L 380 278 L 300 275 L 230 272 L 160 268 L 110 262
               L 75 245 L 55 220 L 48 185 L 50 145 L 52 100 Z"
            fill="#DDD8E8"
            stroke="#C4BDD8"
            strokeWidth="1.5"
          />

          {/* Great Lakes hint */}
          <ellipse cx="460" cy="120" rx="18" ry="10" fill="#B8D4E8" opacity="0.6" />
          <ellipse cx="485" cy="132" rx="14" ry="8" fill="#B8D4E8" opacity="0.6" />

          {/* State markers */}
          {states.map((state, idx) => (
            <g key={idx}>
              {/* Halo */}
              <circle
                cx={state.x}
                cy={state.y}
                r="20"
                fill={statusColors[state.status]}
                opacity="0.12"
              />
              {/* Dot */}
              <circle
                cx={state.x}
                cy={state.y}
                r="9"
                fill={statusColors[state.status]}
                opacity="0.92"
              />
              {/* Label background */}
              <rect
                x={state.x - 34}
                y={state.y + 13}
                width="68"
                height="14"
                fill="white"
                opacity="0.72"
                rx="1"
              />
              <text
                x={state.x}
                y={state.y + 23}
                textAnchor="middle"
                fill="#374151"
                style={{ fontSize: '9px', fontFamily: 'Inter, sans-serif' }}
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
              className="w-3 h-3 flex-shrink-0"
              style={{ backgroundColor: statusColors[key] }}
            />
            <span className="text-slate-500 text-xs">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

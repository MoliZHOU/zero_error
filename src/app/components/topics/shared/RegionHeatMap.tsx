import { CardShell } from './CardShell';

export type RegionLevel = 'strict' | 'moderate' | 'light' | 'none';

interface Region {
  name: string;
  level: RegionLevel;
  x: number;
  y: number;
  code?: string;
}

interface RegionHeatMapProps {
  title: string;
  subtitle?: string;
  regions: Region[];
  legendLabels?: Partial<Record<RegionLevel, string>>;
}

const LEVEL_COLORS: Record<RegionLevel, string> = {
  strict: '#4B286D',
  moderate: '#F59E0B',
  light: '#10B981',
  none: '#CBD5E1',
};

export function RegionHeatMap({
  title,
  subtitle,
  regions,
  legendLabels = {
    strict: 'Strict',
    moderate: 'Moderate',
    light: 'Light',
    none: 'No Law',
  },
}: RegionHeatMapProps) {
  const presentLevels = Array.from(new Set(regions.map((r) => r.level)));

  return (
    <CardShell title={title} subtitle={subtitle}>
      <div
        className="relative bg-slate-50 rounded-lg overflow-hidden border border-slate-200"
        style={{ height: '320px' }}
      >
        <svg
          width="100%"
          height="320"
          viewBox="0 0 700 320"
          className="bg-gradient-to-br from-slate-50 to-slate-100"
        >
          <path
            d="M 50 80 L 600 80 L 620 100 L 620 280 L 500 290 L 100 290 L 50 260 Z"
            fill="#E2E8F0"
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          {regions.map((r, idx) => (
            <g key={idx}>
              <circle
                cx={r.x}
                cy={r.y}
                r="22"
                fill={LEVEL_COLORS[r.level]}
                opacity="0.85"
              />
              <text
                x={r.x}
                y={r.y + 38}
                textAnchor="middle"
                className="text-xs"
                fill="#475569"
              >
                {r.name}
              </text>
              {r.code && (
                <text
                  x={r.x}
                  y={r.y + 52}
                  textAnchor="middle"
                  className="text-xs"
                  fill="#64748B"
                  style={{ fontSize: 10 }}
                >
                  {r.code}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      <div className="flex flex-wrap gap-6 mt-5">
        {presentLevels.map((lv) => (
          <div key={lv} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: LEVEL_COLORS[lv] }}
            />
            <span className="text-slate-600">{legendLabels[lv] || lv}</span>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

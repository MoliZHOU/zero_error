import { useMemo } from 'react';
import { CardShell } from './CardShell';
import type { GeoRegion } from '../../../data/mockIndustryLandscape';

interface GeoDensityMapProps {
  title: string;
  subtitle?: string;
  metricLabel: string;
  regions: GeoRegion[];
  accent?: string;
}

export function GeoDensityMap({
  title,
  subtitle,
  metricLabel,
  regions,
  accent = '#4B286D',
}: GeoDensityMapProps) {
  const { sized, minCount, maxCount } = useMemo(() => {
    const counts = regions.map((r) => r.count);
    const min = Math.min(...counts);
    const max = Math.max(...counts);
    const rMin = 12;
    const rMax = 34;
    const sized = regions.map((r) => {
      const ratio = max === min ? 1 : (r.count - min) / (max - min);
      return { ...r, radius: rMin + ratio * (rMax - rMin) };
    });
    return { sized, minCount: min, maxCount: max };
  }, [regions]);

  const midCount = Math.round((minCount + maxCount) / 2);

  return (
    <CardShell title={title} subtitle={subtitle}>
      <div
        className="relative bg-slate-50 rounded-lg overflow-hidden border border-slate-200"
        style={{ height: '360px' }}
      >
        <svg
          width="100%"
          height="360"
          viewBox="0 0 700 360"
          className="bg-gradient-to-br from-slate-50 to-slate-100"
        >
          <path
            d="M 50 80 L 600 80 L 620 100 L 620 280 L 500 290 L 100 290 L 50 260 Z"
            fill="#E2E8F0"
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          {sized.map((r, idx) => (
            <g key={idx}>
              <circle
                cx={r.x}
                cy={r.y}
                r={r.radius}
                fill={accent}
                opacity="0.82"
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={r.x}
                y={r.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                className="text-xs"
              >
                {r.count}
              </text>
              <text
                x={r.x}
                y={r.y + r.radius + 14}
                textAnchor="middle"
                fill="#475569"
                className="text-xs"
              >
                {r.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend (bubble size scale) */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg border border-slate-200 px-4 py-3 shadow-sm">
          <div className="text-slate-500 text-xs mb-2 uppercase tracking-wide">
            {metricLabel}
          </div>
          <div className="flex items-end gap-3">
            {[
              { size: 12, value: minCount },
              { size: 22, value: midCount },
              { size: 32, value: maxCount },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="rounded-full"
                  style={{
                    width: item.size,
                    height: item.size,
                    backgroundColor: accent,
                    opacity: 0.82,
                  }}
                />
                <span className="text-slate-600 text-xs">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardShell>
  );
}

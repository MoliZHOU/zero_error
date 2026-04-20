import { CardShell } from './CardShell';

interface RadarDatum {
  axis: string;
  origin: number;
  target: number;
}

interface RadarChartProps {
  title: string;
  subtitle?: string;
  data: RadarDatum[];
  originLabel: string;
  targetLabel: string;
}

export function RadarChart({ title, subtitle, data, originLabel, targetLabel }: RadarChartProps) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 110;
  const levels = 4;
  const n = data.length;

  const pointAt = (angle: number, r: number) => ({
    x: cx + Math.cos(angle) * r,
    y: cy + Math.sin(angle) * r,
  });

  const angles = data.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / n);

  const buildPolygon = (values: number[]) =>
    values
      .map((v, i) => {
        const r = (v / 100) * radius;
        const p = pointAt(angles[i], r);
        return `${p.x},${p.y}`;
      })
      .join(' ');

  const originPoly = buildPolygon(data.map((d) => d.origin));
  const targetPoly = buildPolygon(data.map((d) => d.target));

  return (
    <CardShell title={title} subtitle={subtitle}>
      <div
        className="relative bg-slate-50 rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center"
        style={{ height: '320px' }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {Array.from({ length: levels }).map((_, li) => {
            const r = ((li + 1) / levels) * radius;
            const poly = angles
              .map((a) => {
                const p = pointAt(a, r);
                return `${p.x},${p.y}`;
              })
              .join(' ');
            return (
              <polygon
                key={li}
                points={poly}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="1"
              />
            );
          })}

          {angles.map((a, i) => {
            const p = pointAt(a, radius);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke="#E2E8F0"
                strokeWidth="1"
              />
            );
          })}

          <polygon
            points={targetPoly}
            fill="#06B6D4"
            fillOpacity="0.25"
            stroke="#06B6D4"
            strokeWidth="2"
          />
          <polygon
            points={originPoly}
            fill="#4B286D"
            fillOpacity="0.3"
            stroke="#4B286D"
            strokeWidth="2"
          />

          {data.map((d, i) => {
            const p = pointAt(angles[i], radius + 18);
            return (
              <text
                key={i}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs"
                fill="#475569"
              >
                {d.axis}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap gap-6 mt-5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#4B286D' }} />
          <span className="text-slate-600">{originLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#06B6D4' }} />
          <span className="text-slate-600">{targetLabel}</span>
        </div>
      </div>
    </CardShell>
  );
}

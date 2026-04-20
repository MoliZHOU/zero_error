import { CardShell } from './CardShell';

interface Bubble {
  name: string;
  category: string;
  x: number;
  y: number;
  size: number;
}

interface BubbleEcosystemProps {
  title: string;
  subtitle?: string;
  bubbles: Bubble[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Automation: '#4B286D',
  Auditor: '#06B6D4',
  Consultant: '#10B981',
  Platform: '#F59E0B',
  Infra: '#4B286D',
};

export function BubbleEcosystem({ title, subtitle, bubbles }: BubbleEcosystemProps) {
  const categories = Array.from(new Set(bubbles.map((b) => b.category)));

  return (
    <CardShell title={title} subtitle={subtitle}>
      <div
        className="relative bg-slate-50 rounded-lg border border-slate-200 overflow-hidden"
        style={{ height: '320px' }}
      >
        <svg width="100%" height="320" viewBox="0 0 300 320">
          {bubbles.map((b, idx) => (
            <g key={idx}>
              <circle
                cx={b.x}
                cy={b.y}
                r={b.size}
                fill={CATEGORY_COLORS[b.category] || '#4B286D'}
                opacity="0.85"
              />
              <text
                x={b.x}
                y={b.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs"
                fill="white"
              >
                {b.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="flex flex-wrap gap-6 mt-5">
        {categories.map((c) => (
          <div key={c} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: CATEGORY_COLORS[c] || '#4B286D' }}
            />
            <span className="text-slate-600">{c}</span>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

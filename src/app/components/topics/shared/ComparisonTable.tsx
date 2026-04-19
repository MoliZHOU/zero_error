import { CardShell } from './CardShell';

type Risk = 'low' | 'medium' | 'high';

interface Row {
  metric: string;
  origin: string;
  target: string;
  risk: Risk;
}

interface ComparisonTableProps {
  title: string;
  subtitle?: string;
  rows: Row[];
  originLabel: string;
  targetLabel: string;
}

const RISK_STYLE: Record<Risk, { bg: string; text: string; label: string }> = {
  low:    { bg: '#10B98122', text: '#047857', label: 'Low Risk' },
  medium: { bg: '#F59E0B22', text: '#B45309', label: 'Watch' },
  high:   { bg: '#EF444422', text: '#B91C1C', label: 'High Risk' },
};

export function ComparisonTable({ title, subtitle, rows, originLabel, targetLabel }: ComparisonTableProps) {
  return (
    <CardShell title={title} subtitle={subtitle}>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-3 text-slate-600 text-sm">Metric</th>
              <th className="text-left px-4 py-3 text-slate-600 text-sm">{originLabel}</th>
              <th className="text-left px-4 py-3 text-slate-600 text-sm">{targetLabel}</th>
              <th className="text-right px-4 py-3 text-slate-600 text-sm">Risk</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => {
              const s = RISK_STYLE[r.risk];
              return (
                <tr
                  key={r.metric}
                  className={idx !== rows.length - 1 ? 'border-b border-slate-100' : ''}
                >
                  <td className="px-4 py-3 text-slate-700">{r.metric}</td>
                  <td className="px-4 py-3 text-slate-600">{r.origin}</td>
                  <td className="px-4 py-3 text-slate-600">{r.target}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-xs"
                      style={{ backgroundColor: s.bg, color: s.text }}
                    >
                      {s.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CardShell>
  );
}

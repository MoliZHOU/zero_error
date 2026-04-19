import { CardShell } from './CardShell';

export type GapStatus = 'met' | 'partial' | 'gap';

interface MatrixRow {
  regulation: string;
  origin: GapStatus;
  target: GapStatus;
}

interface GapMatrixProps {
  title: string;
  subtitle?: string;
  rows: MatrixRow[];
  originLabel: string;
  targetLabel: string;
}

const STATUS_STYLE: Record<GapStatus, { bg: string; text: string; label: string }> = {
  met:     { bg: '#10B98122', text: '#047857', label: 'Met' },
  partial: { bg: '#F59E0B22', text: '#B45309', label: 'Partial' },
  gap:     { bg: '#EF444422', text: '#B91C1C', label: 'Gap' },
};

export function GapMatrix({ title, subtitle, rows, originLabel, targetLabel }: GapMatrixProps) {
  return (
    <CardShell title={title} subtitle={subtitle}>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
          <div className="px-4 py-3 text-slate-600 text-sm">Regulation</div>
          <div className="px-4 py-3 text-slate-600 text-sm text-center">{originLabel}</div>
          <div className="px-4 py-3 text-slate-600 text-sm text-center">{targetLabel}</div>
        </div>
        {rows.map((r, idx) => (
          <div
            key={r.regulation}
            className={`grid grid-cols-3 ${idx !== rows.length - 1 ? 'border-b border-slate-100' : ''}`}
          >
            <div className="px-4 py-3 text-slate-700 text-sm">{r.regulation}</div>
            <div className="px-4 py-3 text-center">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: STATUS_STYLE[r.origin].bg,
                  color: STATUS_STYLE[r.origin].text,
                }}
              >
                {STATUS_STYLE[r.origin].label}
              </span>
            </div>
            <div className="px-4 py-3 text-center">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: STATUS_STYLE[r.target].bg,
                  color: STATUS_STYLE[r.target].text,
                }}
              >
                {STATUS_STYLE[r.target].label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {(['met', 'partial', 'gap'] as GapStatus[]).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: STATUS_STYLE[s].text }}
            />
            <span className="text-slate-600 text-sm">{STATUS_STYLE[s].label}</span>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

import { useState } from 'react';
import { CardShell } from './CardShell';
import type { RiskItem } from '../../../data/mockCharts';

interface RiskMatrixProps {
  title: string;
  subtitle?: string;
  items: RiskItem[];
  topicColors: Record<string, string>;
}

export function RiskMatrix({ title, subtitle, items, topicColors }: RiskMatrixProps) {
  const width = 560;
  const height = 320;
  const padL = 60;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const [hoverId, setHoverId] = useState<string | null>(null);

  const toX = (impact: number) => padL + (impact / 100) * plotW;
  const toY = (prob: number) => padT + (1 - prob / 100) * plotH;

  const midX = padL + plotW / 2;
  const midY = padT + plotH / 2;

  const topics = Array.from(new Set(items.map((i) => i.topic)));

  const hoverItem = items.find((i) => i.id === hoverId) || null;

  return (
    <CardShell title={title} subtitle={subtitle}>
      <div
        className="relative bg-slate-50 rounded-lg border border-slate-200 overflow-hidden"
        style={{ height: '320px' }}
      >
        <svg
          width="100%"
          height="320"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Quadrant backgrounds */}
          <rect x={padL} y={padT} width={plotW / 2} height={plotH / 2} fill="#06B6D4" opacity="0.08" />
          <rect x={midX} y={padT} width={plotW / 2} height={plotH / 2} fill="#EF4444" opacity="0.1" />
          <rect x={padL} y={midY} width={plotW / 2} height={plotH / 2} fill="#10B981" opacity="0.08" />
          <rect x={midX} y={midY} width={plotW / 2} height={plotH / 2} fill="#F59E0B" opacity="0.09" />

          {/* Quadrant labels */}
          <text x={padL + 12} y={padT + 18} fill="#0E7490" className="text-xs">
            Monitor
          </text>
          <text x={midX + 12} y={padT + 18} fill="#B91C1C" className="text-xs">
            Call an expert
          </text>
          <text x={padL + 12} y={midY + 18} fill="#047857" className="text-xs">
            AI can self-serve
          </text>
          <text x={midX + 12} y={midY + 18} fill="#B45309" className="text-xs">
            Plan for it
          </text>

          {/* Axes */}
          <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Mid dividers */}
          <line x1={midX} y1={padT} x2={midX} y2={padT + plotH} stroke="#E2E8F0" strokeDasharray="4 4" />
          <line x1={padL} y1={midY} x2={padL + plotW} y2={midY} stroke="#E2E8F0" strokeDasharray="4 4" />

          {/* Axis labels */}
          <text
            x={padL + plotW / 2}
            y={height - 10}
            textAnchor="middle"
            fill="#64748B"
            className="text-xs"
          >
            Business Impact →
          </text>
          <text
            x={18}
            y={padT + plotH / 2}
            textAnchor="middle"
            fill="#64748B"
            className="text-xs"
            transform={`rotate(-90, 18, ${padT + plotH / 2})`}
          >
            Probability →
          </text>

          {/* Risk points */}
          {items.map((it) => {
            const x = toX(it.impact);
            const y = toY(it.probability);
            const color = topicColors[it.topic] || '#4B286D';
            const isHover = hoverId === it.id;
            return (
              <g
                key={it.id}
                onMouseEnter={() => setHoverId(it.id)}
                onMouseLeave={() => setHoverId(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isHover ? 11 : 8}
                  fill={color}
                  opacity="0.92"
                  stroke="white"
                  strokeWidth="2"
                />
              </g>
            );
          })}

          {/* Hover label */}
          {hoverItem && (
            <g style={{ pointerEvents: 'none' }}>
              {(() => {
                const x = toX(hoverItem.impact);
                const y = toY(hoverItem.probability);
                const label = hoverItem.label;
                const charWidth = 6.2;
                const boxW = Math.max(90, label.length * charWidth + 16);
                const boxH = 26;
                const boxX = Math.min(width - boxW - 4, Math.max(padL, x - boxW / 2));
                const boxY = y - boxH - 10 < padT ? y + 12 : y - boxH - 10;
                return (
                  <>
                    <rect
                      x={boxX}
                      y={boxY}
                      width={boxW}
                      height={boxH}
                      rx="6"
                      fill="white"
                      stroke="#E2E8F0"
                    />
                    <text
                      x={boxX + boxW / 2}
                      y={boxY + boxH / 2 + 4}
                      textAnchor="middle"
                      fill="#475569"
                      className="text-xs"
                    >
                      {label}
                    </text>
                  </>
                );
              })()}
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-5">
        {topics.map((t) => (
          <div key={t} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: topicColors[t] || '#4B286D' }}
            />
            <span className="text-slate-600 text-sm">{t}</span>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

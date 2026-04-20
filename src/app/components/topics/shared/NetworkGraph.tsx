import { CardShell } from './CardShell';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
}

interface Connection {
  from: string;
  to: string;
}

interface NetworkGraphProps {
  title: string;
  subtitle?: string;
  nodes: Node[];
  connections: Connection[];
  height?: number;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
}

export function NetworkGraph({
  title,
  subtitle,
  nodes,
  connections,
  height = 320,
  viewBoxWidth = 300,
  viewBoxHeight = 320,
}: NetworkGraphProps) {
  const getNode = (id: string) => nodes.find((n) => n.id === id);

  return (
    <CardShell title={title} subtitle={subtitle}>
      <div
        className="relative bg-slate-50 rounded-lg border border-slate-200 overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        >
          <g>
            {connections.map((c, idx) => {
              const from = getNode(c.from);
              const to = getNode(c.to);
              if (!from || !to) return null;
              return (
                <line
                  key={idx}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              );
            })}
          </g>
          {nodes.map((n) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r="34" fill={n.color} opacity="0.92" />
              <text
                x={n.x}
                y={n.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs"
                fill="white"
              >
                {n.label.split(' ').map((word, i, arr) => (
                  <tspan
                    key={i}
                    x={n.x}
                    dy={i === 0 ? -(arr.length - 1) * 6 : 13}
                  >
                    {word}
                  </tspan>
                ))}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </CardShell>
  );
}

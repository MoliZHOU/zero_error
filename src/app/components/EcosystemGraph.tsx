export function EcosystemGraph() {
  const nodes = [
    { id: 'ad', label: 'AD Software', x: 150, y: 100, color: '#4B286D' },
    { id: 'lidar', label: 'LiDAR/Sensors', x: 50, y: 180, color: '#06B6D4' },
    { id: 'compute', label: 'Compute (NVIDIA)', x: 250, y: 180, color: '#10B981' },
    { id: 'cloud', label: 'Cloud Data Centers', x: 150, y: 260, color: '#F59E0B' }
  ];

  const connections = [
    { from: 'ad', to: 'lidar' },
    { from: 'ad', to: 'compute' },
    { from: 'ad', to: 'cloud' },
    { from: 'lidar', to: 'cloud' },
    { from: 'compute', to: 'cloud' }
  ];

  const getNodePosition = (id: string) => nodes.find(n => n.id === id);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="mb-4" style={{ color: '#4B286D' }}>Tech Ecosystem & Supply Chain</h3>

      <div className="relative bg-slate-50 rounded-lg border border-slate-200 overflow-hidden" style={{ height: '320px' }}>
        <svg width="100%" height="320" viewBox="0 0 300 320">
          {/* Connections */}
          <g>
            {connections.map((conn, idx) => {
              const from = getNodePosition(conn.from);
              const to = getNodePosition(conn.to);
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

          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="35"
                fill={node.color}
                opacity="0.9"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs"
                fill="white"
              >
                {node.label.split(' ').map((word, i) => (
                  <tspan key={i} x={node.x} dy={i === 0 ? 0 : 14}>
                    {word}
                  </tspan>
                ))}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

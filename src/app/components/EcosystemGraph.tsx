export function EcosystemGraph() {
  const nodes = [
    { id: 'ad', label: 'AD Software', x: 150, y: 90, color: '#4B286D' },
    { id: 'lidar', label: 'LiDAR / Sensors', x: 50, y: 190, color: '#00B0B9' },
    { id: 'compute', label: 'Compute (NVIDIA)', x: 250, y: 190, color: '#C41F8A' },
    { id: 'cloud', label: 'Cloud Data Ctrs', x: 150, y: 280, color: '#6366F1' },
  ];

  const connections = [
    { from: 'ad', to: 'lidar' },
    { from: 'ad', to: 'compute' },
    { from: 'ad', to: 'cloud' },
    { from: 'lidar', to: 'cloud' },
    { from: 'compute', to: 'cloud' },
  ];

  const getPos = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div
      className="bg-white p-6"
      style={{ border: '1px solid #e5e7eb' }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-[2px] w-5" style={{ backgroundColor: '#4B286D' }} />
        <h3 className="text-slate-800" style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
          Tech Ecosystem &amp; Supply Chain
        </h3>
      </div>

      <div
        className="relative overflow-hidden"
        style={{ height: '300px', backgroundColor: '#F7F5FA', border: '1px solid #e5e7eb' }}
      >
        <svg width="100%" height="300" viewBox="0 0 300 330">
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#C4BDD8" />
            </marker>
          </defs>

          {/* Connections */}
          {connections.map((conn, idx) => {
            const f = getPos(conn.from);
            const t = getPos(conn.to);
            return (
              <line
                key={idx}
                x1={f.x} y1={f.y}
                x2={t.x} y2={t.y}
                stroke="#C4BDD8"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                markerEnd="url(#arrow)"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map(node => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="34" fill={node.color} opacity="0.08" />
              <circle cx={node.x} cy={node.y} r="26" fill={node.color} opacity="0.9" />
              {node.label.split(' / ').flatMap(s => s.split(' ')).map((word, i, arr) => (
                <text
                  key={i}
                  x={node.x}
                  y={node.y - ((arr.length - 1) * 7) + i * 14}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  style={{ fontSize: '8px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {word}
                </text>
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

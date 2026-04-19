import { useState } from 'react';
import { CardShell } from './CardShell';
import { NodeDetailModal } from './NodeDetailModal';
import type {
  ValueChainLayer,
  ValueChainNode,
} from '../../../data/mockIndustryLandscape';

interface ValueChainFlowProps {
  title: string;
  subtitle?: string;
  layers: ValueChainLayer[];
}

export function ValueChainFlow({ title, subtitle, layers }: ValueChainFlowProps) {
  const [activeNode, setActiveNode] = useState<ValueChainNode | null>(null);

  return (
    <>
      <CardShell title={title} subtitle={subtitle}>
        <div className="relative bg-slate-50 rounded-lg border border-slate-200 p-6">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${layers.length}, minmax(0, 1fr))` }}
          >
            {layers.map((layer, layerIdx) => (
              <div key={layer.label} className="relative flex flex-col">
                {/* Layer header */}
                <div
                  className="rounded-lg px-3 py-2 mb-3 text-white text-center"
                  style={{ backgroundColor: layer.accent }}
                >
                  <div className="text-xs tracking-wider uppercase opacity-90">
                    Layer {layerIdx + 1}
                  </div>
                  <div className="text-sm">{layer.label}</div>
                </div>

                {/* Nodes */}
                <div className="flex flex-col gap-2 flex-1">
                  {layer.nodes.map((node) => {
                    const clickable = Boolean(node.detail);
                    const content = (
                      <>
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-slate-800 text-sm leading-tight">
                            {node.name}
                          </div>
                          {clickable && (
                            <span
                              className="flex-shrink-0 text-xs"
                              style={{ color: layer.accent }}
                            >
                              ›
                            </span>
                          )}
                        </div>
                        {node.sublabel && (
                          <div className="text-slate-500 text-xs mt-0.5">
                            {node.sublabel}
                          </div>
                        )}
                      </>
                    );

                    if (clickable) {
                      return (
                        <button
                          key={node.name}
                          onClick={() => setActiveNode(node)}
                          className="text-left bg-white rounded-lg border px-3 py-2.5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                          style={{ borderColor: `${layer.accent}60` }}
                        >
                          {content}
                        </button>
                      );
                    }
                    return (
                      <div
                        key={node.name}
                        className="bg-white rounded-lg border px-3 py-2.5 shadow-sm"
                        style={{ borderColor: `${layer.accent}40` }}
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>

                {/* Connector arrow (except last layer) */}
                {layerIdx < layers.length - 1 && (
                  <div
                    className="absolute top-1/2 -right-3 -translate-y-1/2 z-10"
                    style={{ pointerEvents: 'none' }}
                  >
                    <svg width="24" height="12" viewBox="0 0 24 12">
                      <line
                        x1="0"
                        y1="6"
                        x2="18"
                        y2="6"
                        stroke="#CBD5E1"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                      />
                      <polygon points="18,2 24,6 18,10" fill="#CBD5E1" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Hint */}
          <div className="mt-4 text-slate-500 text-xs flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400" />
            Click any highlighted node to view supplier details and compliance alignment
          </div>
        </div>
      </CardShell>

      <NodeDetailModal
        open={activeNode !== null}
        name={activeNode?.name ?? ''}
        detail={activeNode?.detail ?? null}
        onClose={() => setActiveNode(null)}
      />
    </>
  );
}

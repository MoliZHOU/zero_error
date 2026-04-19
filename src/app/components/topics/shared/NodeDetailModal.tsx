import { useEffect } from 'react';
import {
  X, Plus, CheckCircle2,
  Cpu, Radar, Map, Factory, Eye, Car, Wrench, Cloud,
  Landmark, Building2, Boxes,
  CreditCard, Scale, Truck, Users, Pill, Briefcase,
  Store, Network, Shield,
  type LucideIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import type { NodeDetail, NodeIconKey, NodeCriticality } from '../../../data/mockIndustryLandscape';

interface NodeDetailModalProps {
  open: boolean;
  name: string;
  detail: NodeDetail | null;
  onClose: () => void;
}

const ICONS: Record<NodeIconKey, LucideIcon> = {
  compute: Cpu,
  lidar: Radar,
  mapping: Map,
  tier1: Factory,
  eye: Eye,
  oem: Car,
  service: Wrench,
  cloud: Cloud,
  bank: Landmark,
  hospital: Building2,
  factory: Boxes,
  card: CreditCard,
  scale: Scale,
  truck: Truck,
  users: Users,
  pill: Pill,
  briefcase: Briefcase,
  store: Store,
  network: Network,
  shield: Shield,
};

const CRITICALITY_STYLE: Record<NodeCriticality, { bg: string; label: string }> = {
  critical:    { bg: '#4B286D', label: 'CRITICAL' },
  recommended: { bg: '#06B6D4', label: 'RECOMMENDED' },
  optional:    { bg: '#64748B', label: 'OPTIONAL' },
};

export function NodeDetailModal({ open, name, detail, onClose }: NodeDetailModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !detail) return null;

  const Icon = detail.iconKey ? ICONS[detail.iconKey] : Boxes;
  const critStyle = CRITICALITY_STYLE[detail.criticality];

  const handleAdd = () => {
    toast.success(`${name} added to your network`, {
      description: `${detail.category} · ${detail.location ?? 'US'}`,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div
          className="relative px-6 py-5 flex items-start gap-3"
          style={{
            background:
              'linear-gradient(135deg, #4B286D 0%, #6B3A9E 100%)',
          }}
        >
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <div className="text-white truncate" style={{ fontSize: '1.125rem' }}>
              {name}
            </div>
            {detail.location && (
              <div className="text-white/80 text-sm truncate">{detail.location}</div>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Category + Criticality */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-sm">
              {detail.category}
            </span>
            <span
              className="px-3 py-1 rounded-lg text-white text-xs tracking-wider"
              style={{ backgroundColor: critStyle.bg }}
            >
              {critStyle.label}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-700 leading-relaxed">{detail.description}</p>

          {/* Compliance Alignment */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4" style={{ color: '#4B286D' }} />
              <span style={{ color: '#4B286D' }}>Compliance Alignment</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {detail.complianceAlignment.map((c) => (
                <span
                  key={c}
                  className="px-2 py-0.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
          <button
            onClick={handleAdd}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#4B286D' }}
          >
            <Plus className="w-4 h-4" />
            <span>Add to My Network</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

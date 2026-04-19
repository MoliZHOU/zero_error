import { Star, MapPin } from 'lucide-react';
import type { Advisor } from '../../../data/mockAdvisors';
import { CardShell } from './CardShell';

interface AdvisorCardListProps {
  title: string;
  subtitle?: string;
  advisors: Advisor[];
}

export function AdvisorCardList({ title, subtitle, advisors }: AdvisorCardListProps) {
  return (
    <CardShell title={title} subtitle={subtitle}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {advisors.map((a) => (
          <div
            key={a.name}
            className="bg-slate-50 rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                style={{ backgroundColor: a.accent }}
              >
                <span>{a.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-slate-900 truncate">{a.name}</div>
                <div className="text-slate-500 text-sm truncate">{a.title}</div>
              </div>
            </div>

            <div className="text-slate-700 text-sm mb-1">{a.firm}</div>
            <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
              <MapPin className="w-3 h-3" />
              <span>{a.location}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {a.specialties.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" fill="#F59E0B" stroke="#F59E0B" />
                <span className="text-slate-700 text-sm">{a.rating}</span>
              </div>
              <span className="text-slate-600 text-sm">{a.hourlyRate}</span>
            </div>

            <button
              className="w-full mt-3 py-2 rounded-lg text-white text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#4B286D' }}
            >
              Request Intro
            </button>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

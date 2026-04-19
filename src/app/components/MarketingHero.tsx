import { useState } from 'react';
import {
  ChevronRight, Shield, Globe2, FileCheck, Users, AlertTriangle, X
} from 'lucide-react';

interface MarketingHeroProps {
  onTryIt: () => void;
}

export function MarketingHero({ onTryIt }: MarketingHeroProps) {
  const [activeHeroTab, setActiveHeroTab] = useState('Policy Comparison');
  const [showTeamIntro, setShowTeamIntro] = useState(true);

  const teamMembers = [
    { name: 'Mengting Wang', role: 'Interaction Design',  image: '/team/mengting.jpg' },
    { name: 'Yihuai Cai',    role: 'Data Science and AI', image: '/team/yihuai.png' },
    { name: 'Moli Zhou',     role: 'Data Science and AI', image: '/team/moli.jpg' },
  ];

  return (
    <>
      {/* Team Intro Popup */}
      {showTeamIntro && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="p-8 pb-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10 text-center">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800">Welcome to Borderless</h2>
                <p className="text-base text-slate-500 mt-2">
                  Meet the team <span className="text-lg font-bold" style={{ color: '#00B0B9' }}>Zero-Error</span> behind the project
                </p>
              </div>
              <button
                onClick={() => setShowTeamIntro(false)}
                className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Team Grid */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex flex-col gap-5 p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all bg-slate-50/30 text-center items-center">
                  {/* Big Square Photo */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 object-cover rounded-xl shadow-md border-2 border-white"
                  />

                  {/* Info */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-semibold text-lg text-slate-800">{member.name}</h3>
                    <p className="text-sm font-medium mt-1" style={{ color: '#00B0B9' }}>{member.role}</p>
                    <p className="text-sm text-slate-500 mt-2">{member.major}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 pt-4 border-t border-slate-100 flex justify-center sticky bottom-0 bg-white/95 backdrop-blur z-10">
              <button
                onClick={() => setShowTeamIntro(false)}
                className="px-8 py-3 text-white text-base font-medium rounded-xl shadow-md hover:shadow-lg transition-all hover:opacity-90"
                style={{ backgroundColor: '#4B286D' }}
              >
                Continue to App
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* ─── Navigation ─── */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div className="max-w-7xl mx-auto px-8 h-[68px] flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center px-4 py-2"
                style={{ backgroundColor: '#4B286D' }}
              >
                <span className="text-white tracking-[0.22em] text-sm">BORDERLESS</span>
              </div>
              <span className="text-slate-400 text-xs hidden sm:block" style={{ letterSpacing: '0.05em' }}>
                by Grant Thornton
              </span>
            </div>

            {/* Nav links (decorative) */}
            <div className="hidden md:flex items-center gap-8">
              {['Services', 'Markets', 'Insights', 'About'].map(link => (
                <a
                  key={link}
                  className="text-slate-600 text-sm transition-colors cursor-pointer hover:text-[#4B286D]"
                  style={{ letterSpacing: '0.01em' }}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Try it CTA (replaces Contact Us) */}
            <button
              onClick={onTryIt}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 text-white text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#4B286D', borderRadius: '0px', letterSpacing: '0.03em' }}
            >
              Try it
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </nav>

        {/* ─── Hero ─── */}
        <section className="pt-[68px]" style={{ backgroundColor: '#4B286D' }}>
          <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center py-20">

            {/* Left: Copy */}
            <div>
              <h1
                className="text-white mb-6 tracking-tight"
                style={{ fontSize: '3rem', lineHeight: '1.1', fontWeight: 600 }}
              >
                The “invisible” Wall
              </h1>
              <p className="text-purple-200 mb-10 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Today, companies go global on Day 1. They sell and hire everywhere.
              </p>

              <div className="relative pl-8 border-l-2" style={{ borderColor: '#00B0B9' }}>
                <p className="text-purple-200 mb-10 leading-relaxed">
                  But every new country has different rules: Tax, Compliance, Labor Laws and Data Privacy.
                </p>
              </div>

              <p className="text-purple-200 mb-10 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Usually, you don't see these problems. You only see them when you get a big fine or a legal letter.{' '}
                <span className="font-semibold" style={{ color: '#00B0B9' }}>
                  "Ambition is fast, but understanding might be slow."
                </span>
              </p>

              {/* Alert card below */}
              <div className="flex items-center gap-6 relative z-10">
                {/* Stats */}
                <div className="flex gap-6">
                  <div>
                    <p className="text-purple-300 text-xs tracking-wider uppercase mb-1">Fines</p>
                    <p className="text-white text-3xl" style={{ fontWeight: 600 }}>$2.4M</p>
                  </div>
                  <div>
                    <p className="text-purple-300 text-xs tracking-wider uppercase mb-1">Latency</p>
                    <p className="text-white text-3xl" style={{ fontWeight: 600 }}>180d</p>
                  </div>
                </div>

                {/* Notice Card */}
                <div
                  className="p-5 flex-1 rounded-md"
                  style={{ backgroundColor: '#1E1428', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-[#00B0B9]" strokeWidth={2} />
                    <span className="text-white text-xs tracking-[0.1em] uppercase" style={{ fontWeight: 600 }}>Notice Received</span>
                  </div>
                  <div className="h-[2px] w-full mb-3" style={{ backgroundColor: '#00B0B9' }} />
                  <p className="text-purple-100 text-xs leading-relaxed">
                    Compliance violation detected in APAC expansion zone. Legal action pending.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Compliance preview card */}
            <div className="relative">
              {/* Dot matrix decoration */}
              <div className="absolute -top-6 -right-6 opacity-20 pointer-events-none">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {[0, 1, 2, 3, 4, 5].map(r => [0, 1, 2, 3, 4, 5].map(c => (
                    <circle key={`${r}-${c}`} cx={c * 22 + 6} cy={r * 22 + 6} r="3" fill="white" />
                  )))}
                </svg>
              </div>

              <div
                className="p-8 relative z-10"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}
              >
                {/* Market pills */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { market: 'Sweden', region: 'Europe', status: 'Origin', color: '#00B0B9' },
                    { market: 'USA', region: 'N. America', status: 'Target', color: '#C41F8A' },
                    { market: 'China', region: 'Asia Pacific', status: 'Exploring', color: '#9B8CB8' },
                  ].map(m => (
                    <div key={m.market} className="text-center p-3" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                      <div className="text-xs mb-0.5" style={{ color: m.color }}>{m.status}</div>
                      <div className="text-white text-sm" style={{ fontWeight: 500 }}>{m.market}</div>
                      <div className="text-purple-300 text-xs">{m.region}</div>
                    </div>
                  ))}
                </div>

                {/* Compliance bars */}
                <div className="space-y-4">
                  <p className="text-purple-300 text-xs tracking-wider uppercase mb-3">Compliance Coverage</p>
                  {[
                    { label: 'Data Privacy (GDPR/CCPA)', pct: 85 },
                    { label: 'Employment Law', pct: 72 },
                    { label: 'Tax Compliance', pct: 91 },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-purple-200">{item.label}</span>
                        <span style={{ color: '#00B0B9' }}>{item.pct}%</span>
                      </div>
                      <div className="h-1" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                        <div
                          className="h-full transition-all"
                          style={{ width: `${item.pct}%`, backgroundColor: '#00B0B9' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fancy Segmented Tabs */}
              <div
                className="mt-8 p-1.5 flex flex-wrap lg:flex-nowrap gap-1.5 relative z-10 rounded-2xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {[
                  'Policy Comparison',
                  'Partner Network',
                  'Expert Directory',
                ].map(feat => {
                  const isActive = activeHeroTab === feat;
                  return (
                    <button
                      key={feat}
                      onClick={() => setActiveHeroTab(feat)}
                      className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl text-[13px] transition-all duration-300 ${isActive
                        ? 'bg-white shadow-lg scale-[1.02]'
                        : 'hover:bg-white/10 text-purple-200'
                        }`}
                      style={{
                        color: isActive ? '#4B286D' : undefined,
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {feat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Gradient fade to white */}
          <div className="h-12" style={{ background: 'linear-gradient(to bottom, #4B286D, #ffffff)' }} />
        </section>

        {/* ─── Services strip ─── */}
        <section className="py-14" style={{ backgroundColor: '#F7F5FA', borderTop: '1px solid #e5e7eb' }}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Tax & Transfer Pricing', Icon: FileCheck },
                { label: 'Regulatory Compliance', Icon: Shield },
                { label: 'Employment & Immigration', Icon: Users },
                { label: 'Data Privacy & IP', Icon: Globe2 },
              ].map(({ label, Icon }) => (
                <div key={label} className="flex flex-col">
                  <div className="h-[2px] w-8 mb-4" style={{ backgroundColor: '#4B286D' }} />
                  <Icon className="w-5 h-5 mb-3" style={{ color: '#4B286D' }} />
                  <p className="text-slate-700 text-sm leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="py-10" style={{ backgroundColor: '#2D1547' }}>
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div
                className="inline-flex items-center px-3 py-1.5 mb-3"
                style={{ backgroundColor: '#4B286D' }}
              >
                <span className="text-white tracking-[0.22em] text-sm">BORDERLESS</span>
              </div>
              <p className="text-purple-300 text-xs">© 2025 Grant Thornton.</p>
            </div>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(link => (
                <a key={link} className="text-purple-300 text-xs hover:text-white transition-colors cursor-pointer">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

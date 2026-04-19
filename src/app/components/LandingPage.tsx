import { useState } from 'react';
import { ChevronRight, Check, Shield, Globe2, FileCheck, Users, AlertTriangle } from 'lucide-react';

interface LandingPageProps {
  onComplete: () => void;
}

export function LandingPage({ onComplete }: LandingPageProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    companySize: '',
    industry: '',
    originMarket: '',
    targetMarket: ''
  });

  const [activeHeroTab, setActiveHeroTab] = useState('Policy Comparison');

  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Policy Comparison', 'Partner Network']);
  const topics = ['Policy Comparison', 'Partner Network', 'Expert Directory'];

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  const inputStyle = {
    borderRadius: '0px',
    fontFamily: 'Inter, sans-serif',
  };

  const focusColor = '#4B286D';

  return (
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

          {/* Nav links */}
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

          {/* Contact CTA */}
          <button
            className="hidden md:flex items-center gap-2 px-5 py-2.5 text-white text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#4B286D', borderRadius: '0px', letterSpacing: '0.03em' }}
          >
            Contact Us
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
              The ”invisible“ Wall
            </h1>
            <p className="text-purple-200 mb-10 leading-relaxed" style={{ fontSize: '1.05rem' }}>
              Today, companies go global on Day 1. They sell and hire everywhere.
            </p>

            <div class="relative pl-8 border-l-2 border-primary-container">
              <p className="text-purple-200 mb-10 leading-relaxed">
                But every new country has different rules: Tax, Compliance, Labor Laws and Data Privacy.
              </p>
            </div>

            <p className="text-purple-200 mb-10 leading-relaxed" style={{ fontSize: '1.05rem' }}>
              Usually, you don't see these problems. You only see them when you get a big fine or a legal letter. <span class="text-secondary font-semibold">"Ambition is fast, but understanding might be slow.</span>"
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
                    className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl text-[13px] transition-all duration-300 ${
                      isActive
                        ? 'bg-white shadow-lg scale-[1.02]'
                        : 'hover:bg-white/10 text-purple-200'
                    }`}
                    style={{
                      color: isActive ? '#4B286D' : undefined,
                      fontWeight: isActive ? 600 : 400
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

      {/* ─── Form Section ─── */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-8">

          {/* Section heading */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-[2px] w-6" style={{ backgroundColor: '#4B286D' }} />
              <span className="text-xs tracking-[0.18em] uppercase" style={{ color: '#4B286D' }}>
                Get Started
              </span>
              <div className="h-[2px] w-6" style={{ backgroundColor: '#4B286D' }} />
            </div>
            <h2 className="text-slate-900 tracking-tight" style={{ fontWeight: 600 }}>
              Tell us about your expansion plans
            </h2>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Complete the form and our AI will generate a tailored compliance strategy.
            </p>
          </div>

          {/* Card */}
          <div
            className="bg-white"
            style={{ border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(75,40,109,0.06)' }}
          >
            <form onSubmit={handleSubmit} className="p-10">

              {/* Grid fields */}
              <div className="grid grid-cols-2 gap-6 mb-8">

                {/* Company Name */}
                <div className="col-span-2">
                  <label htmlFor="companyName" className="block text-slate-600 text-sm mb-2">
                    Company Name{' '}
                    <span className="text-slate-400">(Optional)</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    placeholder="e.g., An Autonomous Driving Company"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-white outline-none transition-colors"
                    style={{ ...inputStyle, border: '1px solid #d1d5db' }}
                    onFocus={e => (e.target.style.borderColor = focusColor)}
                    onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                  />
                </div>

                {/* Company Size */}
                <div>
                  <label htmlFor="companySize" className="block text-slate-600 text-sm mb-2">Company Size</label>
                  <select
                    id="companySize"
                    value={formData.companySize}
                    onChange={e => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-white outline-none transition-colors appearance-none"
                    style={{ ...inputStyle, border: '1px solid #d1d5db' }}
                    onFocus={e => (e.target.style.borderColor = focusColor)}
                    onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                  >
                    <option value="">Select size</option>
                    <option value="enterprise">Enterprise 1000+</option>
                    <option value="midmarket">Mid-Market 100–999</option>
                    <option value="small">Small Business 10–99</option>
                    <option value="startup">Startup 1–9</option>
                  </select>
                </div>

                {/* Industry */}
                <div>
                  <label htmlFor="industry" className="block text-slate-600 text-sm mb-2">Industry</label>
                  <select
                    id="industry"
                    value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-white outline-none transition-colors appearance-none"
                    style={{ ...inputStyle, border: '1px solid #d1d5db' }}
                    onFocus={e => (e.target.style.borderColor = focusColor)}
                    onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                  >
                    <option value="">Select industry</option>
                    <option value="ad-adas">Autonomous Driving (AD/ADAS)</option>
                    <option value="fintech">Financial Technology</option>
                    <option value="healthcare">Healthcare & Life Sciences</option>
                    <option value="saas">Software & SaaS</option>
                    <option value="manufacturing">Manufacturing</option>
                  </select>
                </div>

                {/* Origin Market */}
                <div>
                  <label htmlFor="originMarket" className="block text-slate-600 text-sm mb-2">Origin Market</label>
                  <select
                    id="originMarket"
                    value={formData.originMarket}
                    onChange={e => setFormData({ ...formData, originMarket: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-white outline-none transition-colors appearance-none"
                    style={{ ...inputStyle, border: '1px solid #d1d5db' }}
                    onFocus={e => (e.target.style.borderColor = focusColor)}
                    onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                  >
                    <option value="">Select origin</option>
                    <option value="sweden">Sweden</option>
                    <option value="germany">Germany</option>
                    <option value="uk">United Kingdom</option>
                    <option value="france">France</option>
                    <option value="japan">Japan</option>
                  </select>
                </div>

                {/* Target Market */}
                <div>
                  <label htmlFor="targetMarket" className="block text-slate-600 text-sm mb-2">Target Market</label>
                  <select
                    id="targetMarket"
                    value={formData.targetMarket}
                    onChange={e => setFormData({ ...formData, targetMarket: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-white outline-none transition-colors appearance-none"
                    style={{ ...inputStyle, border: '1px solid #d1d5db' }}
                    onFocus={e => (e.target.style.borderColor = focusColor)}
                    onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                  >
                    <option value="">Select target</option>
                    <option value="usa">USA</option>
                    <option value="china">China</option>
                    <option value="eu">European Union</option>
                    <option value="india">India</option>
                    <option value="brazil">Brazil</option>
                  </select>
                </div>
              </div>

              {/* Topics */}
              <div className="mb-8">
                <label className="block text-slate-600 text-sm mb-4">Areas of concern</label>
                <div className="flex flex-wrap gap-2">
                  {topics.map(topic => {
                    const isSelected = selectedTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleTopic(topic)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm transition-all"
                        style={{
                          borderRadius: '0px',
                          backgroundColor: isSelected ? '#4B286D' : 'white',
                          color: isSelected ? 'white' : '#4B5563',
                          border: isSelected ? '1px solid #4B286D' : '1px solid #d1d5db',
                        }}
                      >
                        {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 mb-8" />

              {/* CTA */}
              <button
                type="submit"
                className="w-full py-4 text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: '#4B286D',
                  borderRadius: '0px',
                  letterSpacing: '0.04em',
                  fontSize: '0.875rem',
                }}
              >
                Generate AI Strategy
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-center text-slate-400 text-xs mt-5">
                Enterprise-grade security · GDPR compliant · Powered by Grant Thornton advisory expertise
              </p>
            </form>
          </div>
        </div>
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
  );
}

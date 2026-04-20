import { useState } from 'react';
import type { FormData } from '../config/industryConfig';
import type { SubmissionPayload } from '../App';

interface LandingPageProps {
  onComplete: (payload: SubmissionPayload) => void;
}

export function LandingPage({ onComplete }: LandingPageProps) {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    companySize: '',
    industry: '',
    originMarket: '',
    targetMarket: ''
  });

  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Data Privacy', 'Regulatory Requirement']);

  const topics = ['Tax', 'Compliance', 'Employment Law', 'Data Privacy', 'Regulatory Requirement'];

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ formData, selectedTopics });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle World Map Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="worldMap" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#4B286D" />
              <circle cx="150" cy="75" r="2" fill="#4B286D" />
              <circle cx="100" cy="130" r="2" fill="#4B286D" />
              <circle cx="30" cy="150" r="2" fill="#4B286D" />
              <circle cx="170" cy="160" r="2" fill="#4B286D" />
              <line x1="50" y1="50" x2="150" y2="75" stroke="#4B286D" strokeWidth="0.5" opacity="0.5" />
              <line x1="150" y1="75" x2="100" y2="130" stroke="#4B286D" strokeWidth="0.5" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#worldMap)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16">
        {/* Logo/Brand */}
        <div className="mb-8 flex items-center gap-3">
          <div className="px-6 py-3 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#4B286D' }}>
            <span className="text-white tracking-wider" style={{ fontSize: '1.25rem' }}>BORDERLESS</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 max-w-3xl">
          <h1 className="text-slate-900 mb-4 tracking-tight" style={{ fontSize: '3rem', lineHeight: '1.2' }}>
            Borderless Business Copilot
          </h1>
          <p className="text-slate-600 text-xl leading-relaxed">
            You're building for the world, but the world has rules. Navigate seamlessly across borders.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-10">
          <form onSubmit={handleSubmit}>
            {/* Card Header */}
            <div className="mb-8 pb-6 border-b border-slate-200">
              <h2 className="text-slate-900 tracking-tight">Tell us about your expansion plans</h2>
            </div>

            {/* Form Fields - 2 Column Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Company Size */}
              <div>
                <label htmlFor="companySize" className="block text-slate-700 mb-2">
                  Company Size
                </label>
                <select
                  id="companySize"
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                  onFocus={(e) => e.target.style.borderColor = '#4B286D'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                >
                  <option value="">Select size</option>
                  <option value="enterprise">Enterprise 1000+</option>
                  <option value="midmarket">Mid-Market 100-999</option>
                  <option value="small">Small Business 10-99</option>
                  <option value="startup">Startup 1-9</option>
                </select>
              </div>

              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-slate-700 mb-2">
                  Industry
                </label>
                <select
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                  onFocus={(e) => e.target.style.borderColor = '#4B286D'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
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
                <label htmlFor="originMarket" className="block text-slate-700 mb-2">
                  Origin Market
                </label>
                <select
                  id="originMarket"
                  value={formData.originMarket}
                  onChange={(e) => setFormData({ ...formData, originMarket: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                  onFocus={(e) => e.target.style.borderColor = '#4B286D'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
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
                <label htmlFor="targetMarket" className="block text-slate-700 mb-2">
                  Target Market
                </label>
                <select
                  id="targetMarket"
                  value={formData.targetMarket}
                  onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                  onFocus={(e) => e.target.style.borderColor = '#4B286D'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
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

            {/* Consultation Topics */}
            <div className="mb-10">
              <label className="block text-slate-700 mb-4">
                Select areas of concern:
              </label>
              <div className="flex flex-wrap gap-3">
                {topics.map((topic) => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`px-5 py-2.5 rounded-full transition-all ${
                        isSelected
                          ? 'text-white shadow-md'
                          : 'bg-white text-slate-600 border border-slate-300 hover:border-slate-400'
                      }`}
                      style={isSelected ? { backgroundColor: '#4B286D' } : {}}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
              style={{ backgroundColor: '#4B286D' }}
            >
              Generate AI Strategy
            </button>
          </form>
        </div>

        {/* Footer Trust Badge */}
        <div className="mt-12 text-center text-slate-500">
          <p className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Enterprise-grade security & compliance
          </p>
        </div>
      </div>
    </div>
  );
}

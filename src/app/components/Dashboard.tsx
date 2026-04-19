import { useState } from 'react';
import { ArrowRight, ChevronDown, Bell, User } from 'lucide-react';
import { ChatSidebar } from './ChatSidebar';
import { USMap } from './USMap';
import { EcosystemGraph } from './EcosystemGraph';
import { TalentHubChart } from './TalentHubChart';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState(2);

  const tabs = [
    { id: 1, label: 'Regulatory Gaps' },
    { id: 2, label: 'AV Ecosystem & Testing' },
    { id: 3, label: 'Expert Advisory' },
  ];

  return (
    <div
      className="size-full flex flex-col"
      style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F7F5FA' }}
    >
      {/* ─── Top Navigation Bar ─── */}
      <header
        className="flex-shrink-0 bg-white flex items-center justify-between px-8 h-[68px] z-40"
        style={{ borderBottom: '1px solid #e5e7eb' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center px-4 py-2"
            style={{ backgroundColor: '#4B286D' }}
          >
            <span className="text-white tracking-[0.22em] text-sm">BORDERLESS</span>
          </div>
          <span className="text-slate-400 text-xs hidden lg:block" style={{ letterSpacing: '0.05em' }}>
            by Grant Thornton
          </span>
        </div>

        {/* Breadcrumb / context */}
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
          <span className="text-slate-400">Dashboard</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-300 -rotate-90" />
          <span style={{ color: '#4B286D' }}>AI Compliance Report</span>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <Bell className="w-4.5 h-4.5 text-slate-400 cursor-pointer hover:text-[#4B286D] transition-colors" />
          <div
            className="w-8 h-8 flex items-center justify-center text-white text-xs cursor-pointer"
            style={{ backgroundColor: '#4B286D' }}
          >
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* ─── Body ─── */}
      <div className="flex flex-1 min-h-0">

        {/* ─── Main Panel (70%) ─── */}
        <div className="flex flex-col flex-1 min-w-0">

          {/* ─── Secondary header: context + tabs ─── */}
          <div className="bg-white flex-shrink-0" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <div className="px-8 pt-6 pb-0">

              {/* Page title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[2px] w-5" style={{ backgroundColor: '#00B0B9' }} />
                <span className="text-xs tracking-[0.15em] uppercase" style={{ color: '#00B0B9' }}>
                  AI Strategy Report
                </span>
              </div>
              <h1
                className="text-slate-900 mb-5 tracking-tight"
                style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.2 }}
              >
                Zenseact · US Market Entry
              </h1>

              {/* Context bar */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-sm"
                style={{
                  backgroundColor: '#F7F5FA',
                  border: '1px solid #e5e7eb',
                }}
              >
                <span className="text-slate-500">Sweden</span>
                <ArrowRight className="w-3.5 h-3.5" style={{ color: '#4B286D' }} />
                <span className="text-slate-500">USA</span>
                <span className="mx-2 text-slate-300">|</span>
                <span className="text-slate-500">Autonomous Driving (AD/ADAS)</span>
                <span className="mx-2 text-slate-300">|</span>
                <span
                  className="px-2 py-0.5 text-white text-xs"
                  style={{ backgroundColor: '#4B286D' }}
                >
                  Enterprise
                </span>
              </div>

              {/* Underline Tabs — GT style */}
              <nav className="flex gap-0">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative px-5 py-3 text-sm transition-colors"
                    style={{
                      color: activeTab === tab.id ? '#4B286D' : '#6b7280',
                      fontWeight: activeTab === tab.id ? 500 : 400,
                      borderBottom: activeTab === tab.id ? '2px solid #4B286D' : '2px solid transparent',
                      marginBottom: '-1px',
                      background: 'none',
                    }}
                  >
                    <span className="mr-1.5 text-xs" style={{ color: activeTab === tab.id ? '#00B0B9' : '#9ca3af' }}>
                      {String(tab.id).padStart(2, '0')}
                    </span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* ─── Content ─── */}
          <main className="flex-1 overflow-y-auto p-8">
            {activeTab === 2 && (
              <div className="space-y-6">
                {/* Section label */}
                <div className="flex items-center gap-3">
                  <div className="h-[2px] w-5" style={{ backgroundColor: '#4B286D' }} />
                  <span className="text-xs tracking-[0.12em] uppercase text-slate-500">
                    Market Intelligence
                  </span>
                </div>

                {/* US Map */}
                <USMap />

                {/* Bottom row */}
                <div className="grid grid-cols-2 gap-6">
                  <EcosystemGraph />
                  <TalentHubChart />
                </div>
              </div>
            )}

            {activeTab !== 2 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div
                    className="w-14 h-14 flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: '#F7F5FA', border: '1px solid #e5e7eb' }}
                  >
                    <span
                      className="text-xl"
                      style={{ color: '#4B286D', fontWeight: 600 }}
                    >
                      {String(activeTab).padStart(2, '0')}
                    </span>
                  </div>
                  <h2 className="text-slate-700 mb-2" style={{ fontWeight: 500 }}>
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h2>
                  <p className="text-slate-400 text-sm">Content coming soon</p>
                  <div className="h-[2px] w-8 mx-auto mt-4" style={{ backgroundColor: '#00B0B9' }} />
                </div>
              </div>
            )}
          </main>
        </div>

        {/* ─── Chat Sidebar (30%) ─── */}
        <aside
          className="flex-shrink-0 w-[30%] min-w-[280px]"
          style={{ borderLeft: '1px solid #e5e7eb' }}
        >
          <ChatSidebar />
        </aside>
      </div>
    </div>
  );
}

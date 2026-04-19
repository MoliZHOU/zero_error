import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { ChatSidebar } from './ChatSidebar';
import {
  getTabNames,
  resolveFormData,
  INDUSTRY_LABEL,
  MARKET_LABEL,
  COMPANY_SIZE_LABEL,
  type FormData,
} from '../config/industryConfig';
import { TOPIC_VIEWS, ALL_TOPICS, type TopicKey } from '../config/topicRegistry';
import { OverviewRadar } from './topics/shared/OverviewRadar';
import { ValueChainFlow } from './topics/shared/ValueChainFlow';
import { GeoDensityMap } from './topics/shared/GeoDensityMap';
import { OVERVIEW_SCORES } from '../data/mockCharts';
import { getIndustryLandscape } from '../data/mockIndustryLandscape';

interface DashboardProps {
  formData: FormData;
  selectedTopics: string[];
  onBack?: () => void;
}

export function Dashboard({ formData, selectedTopics, onBack }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef<HTMLElement | null>(null);

  const resolved = resolveFormData(formData);
  const tabNames = getTabNames(resolved.industry);
  const tabs: Array<{ id: 1 | 2 | 3; label: string }> = [
    { id: 1, label: `1. ${tabNames[0]}` },
    { id: 2, label: `2. ${tabNames[1]}` },
    { id: 3, label: `3. ${tabNames[2]}` },
  ];

  const effectiveTopics = (selectedTopics.length > 0 ? selectedTopics : ALL_TOPICS).filter(
    (t): t is TopicKey => t in TOPIC_VIEWS,
  );

  // Reset scroll to top when the tab changes so users land on the header, not mid-content
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const waitForPaint = (ms = 450) =>
    new Promise<void>((resolve) =>
      requestAnimationFrame(() => setTimeout(resolve, ms)),
    );

  const captureActiveTab = async (): Promise<HTMLCanvasElement | null> => {
    const el = contentRef.current;
    if (!el) return null;
    const parent = el.parentElement;

    // Reset scroll so capture starts at the top
    el.scrollTop = 0;

    // Preserve original inline styles so we can restore exactly
    const elStyle = el.getAttribute('style');
    const parentStyle = parent?.getAttribute('style') ?? null;

    // Temporarily expand main + its clipping parent so the full content is in-flow
    el.style.overflow = 'visible';
    el.style.height = 'auto';
    el.style.maxHeight = 'none';
    el.style.flex = 'none';
    if (parent) {
      parent.style.overflow = 'visible';
      parent.style.height = 'auto';
      parent.style.maxHeight = 'none';
    }

    // Wait for reflow (+ any chart resize) before snapshotting
    await waitForPaint(350);

    try {
      const fullHeight = el.scrollHeight;
      const fullWidth = el.scrollWidth;
      return await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f8fafc',
        width: fullWidth,
        height: fullHeight,
        windowWidth: fullWidth,
        windowHeight: fullHeight,
        scrollX: 0,
        scrollY: 0,
      });
    } finally {
      if (elStyle === null) el.removeAttribute('style');
      else el.setAttribute('style', elStyle);
      if (parent) {
        if (parentStyle === null) parent.removeAttribute('style');
        else parent.setAttribute('style', parentStyle);
      }
    }
  };

  const handleExport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    const prevTab = activeTab;
    try {
      const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 24;
      const usableW = pageW - margin * 2;

      // Cover page
      pdf.setFillColor(75, 40, 109);
      pdf.rect(0, 0, pageW, 120, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.text('BORDERLESS', margin, 56);
      pdf.setFontSize(14);
      pdf.text('AI Compliance Copilot — Expansion Report', margin, 84);
      pdf.setTextColor(71, 85, 105);
      pdf.setFontSize(11);
      pdf.text(
        `${MARKET_LABEL[resolved.originMarket]} → ${MARKET_LABEL[resolved.targetMarket]}`,
        margin,
        160,
      );
      pdf.text(`Industry: ${INDUSTRY_LABEL[resolved.industry]}`, margin, 180);
      pdf.text(`Company: ${resolved.companyName}`, margin, 200);
      pdf.text(`Size: ${COMPANY_SIZE_LABEL[resolved.companySize]}`, margin, 220);
      if (effectiveTopics.length > 0) {
        pdf.text(`Areas of concern: ${effectiveTopics.join(', ')}`, margin, 240);
      }
      pdf.setFontSize(9);
      pdf.setTextColor(148, 163, 184);
      pdf.text(
        `Generated ${new Date().toLocaleString()}`,
        margin,
        pageH - margin,
      );

      // Capture each tab
      for (let tabId = 1 as 1 | 2 | 3; tabId <= 3; tabId = ((tabId + 1) as 1 | 2 | 3)) {
        setActiveTab(tabId);
        await waitForPaint(500);
        const canvas = await captureActiveTab();
        if (!canvas) continue;

        const imgData = canvas.toDataURL('image/png');
        const imgW = usableW;
        const imgH = (canvas.height * imgW) / canvas.width;

        pdf.addPage();
        pdf.setTextColor(75, 40, 109);
        pdf.setFontSize(14);
        pdf.text(tabs[tabId - 1].label, margin, margin + 4);

        const contentTop = margin + 18;
        const maxContentH = pageH - contentTop - margin;

        if (imgH <= maxContentH) {
          pdf.addImage(imgData, 'PNG', margin, contentTop, imgW, imgH);
        } else {
          // Slice image across multiple pages when taller than one page
          const sliceRatio = maxContentH / imgW;
          const sliceSrcH = canvas.width * sliceRatio;
          let rendered = 0;
          let firstSlice = true;
          while (rendered < canvas.height) {
            const sliceH = Math.min(sliceSrcH, canvas.height - rendered);
            const sliceCanvas = document.createElement('canvas');
            sliceCanvas.width = canvas.width;
            sliceCanvas.height = sliceH;
            const ctx = sliceCanvas.getContext('2d');
            if (!ctx) break;
            ctx.drawImage(
              canvas,
              0, rendered, canvas.width, sliceH,
              0, 0, canvas.width, sliceH,
            );
            const sliceImg = sliceCanvas.toDataURL('image/png');
            const sliceDrawH = (sliceH * imgW) / canvas.width;
            if (!firstSlice) {
              pdf.addPage();
              pdf.setTextColor(75, 40, 109);
              pdf.setFontSize(12);
              pdf.text(`${tabs[tabId - 1].label} (cont.)`, margin, margin + 4);
            }
            pdf.addImage(sliceImg, 'PNG', margin, contentTop, imgW, sliceDrawH);
            rendered += sliceH;
            firstSlice = false;
          }
        }
      }

      const safeName = (resolved.companyName || 'borderless').replace(/\s+/g, '_').toLowerCase();
      pdf.save(`${safeName}_compliance_report.pdf`);
    } catch (err) {
      console.error('PDF export failed', err);
    } finally {
      setActiveTab(prevTab);
      setIsExporting(false);
    }
  };

  return (
    <div className="size-full flex bg-slate-50">
      {/* Main Content - 70% */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ width: '70%' }}>
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="px-4 py-2 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#4B286D' }}
              >
                <span className="text-white tracking-wider">BORDERLESS</span>
              </div>
              <h1 className="tracking-tight" style={{ color: '#4B286D' }}>
                AI Compliance Copilot
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 disabled:opacity-70 disabled:cursor-wait transition-opacity"
                style={{ backgroundColor: '#4B286D' }}
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Generating…</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download PDF</span>
                  </>
                )}
              </button>
              {onBack && (
                <button
                  onClick={onBack}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-60 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Edit profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Context Bar */}
          <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
            <span>{MARKET_LABEL[resolved.originMarket]}</span>
            <ArrowRight className="w-4 h-4" style={{ color: '#4B286D' }} />
            <span>{MARKET_LABEL[resolved.targetMarket]}</span>
            <span className="mx-2 text-slate-300">|</span>
            <span>{INDUSTRY_LABEL[resolved.industry]}</span>
            <span className="mx-2 text-slate-300">|</span>
            <span>{COMPANY_SIZE_LABEL[resolved.companySize]}</span>
            {resolved.companyName && (
              <>
                <span className="mx-2 text-slate-300">|</span>
                <span>{resolved.companyName}</span>
              </>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
                style={activeTab === tab.id ? { backgroundColor: '#4B286D' } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* Content Area */}
        <main ref={contentRef} className="flex-1 overflow-y-auto p-8">
          {effectiveTopics.length === 0 && activeTab !== 2 ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              {activeTab === 1 && effectiveTopics.length > 0 && (
                <Tab1Overview
                  topics={effectiveTopics}
                  originLabel={MARKET_LABEL[resolved.originMarket]}
                  targetLabel={MARKET_LABEL[resolved.targetMarket]}
                />
              )}

              {activeTab === 2 && (
                <Tab2IndustryLandscape industry={resolved.industry} />
              )}

              {effectiveTopics.map((topic) => {
                const View = TOPIC_VIEWS[topic][activeTab];
                return (
                  <section key={topic}>
                    <TopicHeading topic={topic} />
                    <View formData={formData} />
                  </section>
                );
              })}

              {activeTab === 2 && effectiveTopics.length === 0 && (
                <div className="text-center py-8 text-slate-500 bg-white rounded-xl border border-slate-200">
                  Select at least one area of concern on the landing page to see topic-specific views below.
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* AI Chat Sidebar - 30% */}
      <aside className="flex-shrink-0" style={{ width: '30%' }}>
        <ChatSidebar formData={formData} selectedTopics={effectiveTopics} />
      </aside>
    </div>
  );
}

interface Tab1OverviewProps {
  topics: TopicKey[];
  originLabel: string;
  targetLabel: string;
}

function Tab1Overview({ topics, originLabel, targetLabel }: Tab1OverviewProps) {
  if (topics.length < 3) return null;
  const originValues = topics.map((t) => OVERVIEW_SCORES[t]?.origin ?? 0);
  const targetValues = topics.map((t) => OVERVIEW_SCORES[t]?.target ?? 0);

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: '#4B286D' }} />
        <span className="text-slate-700 tracking-wide uppercase text-sm">Executive Summary</span>
      </div>

      <OverviewRadar
        title="Cross-Topic Complexity Profile"
        subtitle={`Regulatory density: ${originLabel} vs ${targetLabel}`}
        axes={topics}
        originValues={originValues}
        targetValues={targetValues}
        originLabel={originLabel}
        targetLabel={targetLabel}
      />
    </section>
  );
}

function Tab2IndustryLandscape({ industry }: { industry: string }) {
  const landscape = getIndustryLandscape(industry);
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: '#4B286D' }} />
        <span className="text-slate-700 tracking-wide uppercase text-sm">
          Industry Landscape
        </span>
      </div>

      <div className="space-y-6">
        <ValueChainFlow
          title={landscape.valueChain.title}
          subtitle={landscape.valueChain.subtitle}
          layers={landscape.valueChain.layers}
        />
        <GeoDensityMap
          title={landscape.geoDensity.title}
          subtitle={landscape.geoDensity.subtitle}
          metricLabel={landscape.geoDensity.metricLabel}
          regions={landscape.geoDensity.regions}
        />
      </div>
    </section>
  );
}

function TopicHeading({ topic }: { topic: TopicKey }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: '#4B286D' }} />
      <span className="text-slate-700 tracking-wide uppercase text-sm">{topic}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div
          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ backgroundColor: '#4B286D20' }}
        >
          <span className="text-2xl" style={{ color: '#4B286D' }}>?</span>
        </div>
        <h2 className="text-slate-700 mb-2">No areas of concern selected</h2>
        <p className="text-slate-500">Go back and choose at least one topic to generate insights.</p>
      </div>
    </div>
  );
}

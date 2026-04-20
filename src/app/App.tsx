import { useState, useEffect, useCallback } from 'react';
import { Toaster } from 'sonner';
import { MarketingHero } from './components/MarketingHero';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import type { FormData } from './config/industryConfig';

export interface SubmissionPayload {
  formData: FormData;
  selectedTopics: string[];
}

type Stage = 'marketing' | 'profile' | 'dashboard';

const STAGES: readonly Stage[] = ['marketing', 'profile', 'dashboard'];
const isStage = (v: unknown): v is Stage =>
  typeof v === 'string' && (STAGES as readonly string[]).includes(v);

const readStageFromURL = (): Stage => {
  const hash = window.location.hash.replace(/^#/, '');
  return isStage(hash) ? hash : 'marketing';
};

export default function App() {
  const [stage, setStageInternal] = useState<Stage>(readStageFromURL);
  const [submission, setSubmission] = useState<SubmissionPayload | null>(null);

  // Seed history with current stage on first mount (replace so we don't duplicate)
  useEffect(() => {
    if (window.history.state?.stage !== stage) {
      window.history.replaceState({ stage }, '', `#${stage}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync internal stage when user hits browser back / forward
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const s = isStage(e.state?.stage) ? e.state.stage : readStageFromURL();
      setStageInternal(s);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Guard: can't land on dashboard without a submission (e.g. refresh at #dashboard)
  useEffect(() => {
    if (stage === 'dashboard' && !submission) {
      window.history.replaceState({ stage: 'profile' }, '', '#profile');
      setStageInternal('profile');
    }
  }, [stage, submission]);

  const navigate = useCallback(
    (next: Stage) => {
      if (next === stage) return;
      window.history.pushState({ stage: next }, '', `#${next}`);
      setStageInternal(next);
    },
    [stage],
  );

  const renderStage = () => {
    if (stage === 'marketing') {
      return <MarketingHero onTryIt={() => navigate('profile')} />;
    }
    if (stage === 'profile' || !submission) {
      return (
        <LandingPage
          onComplete={(payload) => {
            setSubmission(payload);
            navigate('dashboard');
          }}
        />
      );
    }
    return (
      <Dashboard
        formData={submission.formData}
        selectedTopics={submission.selectedTopics}
        onBack={() => navigate('profile')}
      />
    );
  };

  return (
    <>
      {renderStage()}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          style: {
            borderRadius: '12px',
          },
        }}
      />
    </>
  );
}

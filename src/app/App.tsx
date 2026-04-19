import { useState } from 'react';
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

export default function App() {
  const [stage, setStage] = useState<Stage>('marketing');
  const [submission, setSubmission] = useState<SubmissionPayload | null>(null);

  const renderStage = () => {
    if (stage === 'marketing') {
      return <MarketingHero onTryIt={() => setStage('profile')} />;
    }
    if (stage === 'profile' || !submission) {
      return (
        <LandingPage
          onComplete={(payload) => {
            setSubmission(payload);
            setStage('dashboard');
          }}
        />
      );
    }
    return (
      <Dashboard
        formData={submission.formData}
        selectedTopics={submission.selectedTopics}
        onBack={() => setStage('profile')}
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

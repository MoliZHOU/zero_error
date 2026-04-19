import { useState } from 'react';
import { Toaster } from 'sonner';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import type { FormData } from './config/industryConfig';

export interface SubmissionPayload {
  formData: FormData;
  selectedTopics: string[];
}

export default function App() {
  const [submission, setSubmission] = useState<SubmissionPayload | null>(null);

  return (
    <>
      {!submission ? (
        <LandingPage onComplete={setSubmission} />
      ) : (
        <Dashboard
          formData={submission.formData}
          selectedTopics={submission.selectedTopics}
          onBack={() => setSubmission(null)}
        />
      )}
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

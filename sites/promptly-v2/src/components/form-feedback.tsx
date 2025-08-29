import { useState } from 'react';

export function EmailSubscriptionFeedback({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div className={`p-4 rounded-md ${type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
      {message}
    </div>
  );
}

export function useFormFeedback() {
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  return {
    feedback,
    setFeedback,
    clearFeedback: () => setFeedback(null),
    showSuccess: (message: string) => setFeedback({ message, type: 'success' }),
    showError: (message: string) => setFeedback({ message, type: 'error' })
  };
}
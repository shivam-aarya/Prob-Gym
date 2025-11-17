'use client';

import { useStudy } from '@/contexts/StudyContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getStudyItem, setStudyItem } from '@/utils/studyStorage';

/**
 * Consent page
 * Shows consent form before allowing participation
 */
export default function ConsentPage() {
  const { config, studySlug } = useStudy();
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const consent = config.consent;

  // Check if already consented OR if no consent required
  useEffect(() => {
    const hasConsented = getStudyItem(studySlug, 'consented');
    if (hasConsented === 'true' || !consent) {
      router.push(`/studies/${studySlug}/tutorial`);
    }
  }, [studySlug, router, consent]);

  const handleConsent = () => {
    if (agreed) {
      // Store consent in localStorage
      setStudyItem(studySlug, 'consented', 'true');
      setStudyItem(studySlug, 'consent_timestamp', new Date().toISOString());

      // Navigate to tutorial
      router.push(`/studies/${studySlug}/tutorial`);
    }
  };

  // Show nothing while redirecting
  if (!consent) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {consent.title}
        </h1>

        {/* Content */}
        <div className="space-y-4 mb-8 text-gray-700 dark:text-gray-300">
          {consent.content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Consent Checkbox */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">
              I have read and understood the information above, and I agree to participate in this
              study.
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => router.push(`/studies/${studySlug}`)}
            className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back
          </button>

          <button
            onClick={handleConsent}
            disabled={!agreed}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              agreed
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {consent.buttonText || 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}

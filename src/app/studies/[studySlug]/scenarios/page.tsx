'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStudy } from '@/contexts/StudyContext';
import { StudyConfig, ExperimentItem } from '@/types/study';
import ExperimentItemRenderer from '@/components/ExperimentItemRenderer';
import ScenarioNavigation from '@/components/ScenarioNavigation';
import { getStudyItem, setStudyItem } from '@/utils/studyStorage';
import { getParticipantId, setParticipantId } from '@/utils/studyStorage';
import { assignCondition } from '@/utils/conditionAssignment';
import { getCurrentItem, advanceToNextItem } from '@/utils/itemSequence';

/**
 * Scenarios page using experimentFlow
 * Renders items sequentially from the assigned experimental condition
 */
export default function Scenarios() {
  const { config, metadata, studySlug } = useStudy();
  const router = useRouter();
  const [currentItem, setCurrentItem] = useState<ExperimentItem | null>(null);
  const [scenarios, setScenarios] = useState<StudyConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected.current) return;

    // Check for consent (if required)
    if (config.consent) {
      const hasConsent = getStudyItem(studySlug, 'consented');
      if (!hasConsent) {
        hasRedirected.current = true;
        router.push(`/studies/${studySlug}/consent`);
        return;
      }
    }

    // Load scenarios from API
    const loadScenarios = async () => {
      try {
        const res = await fetch(`/api/studies/${studySlug}/data`);
        const data = await res.json();

        if (!data.success || !data.scenarios) {
          throw new Error(`Failed to load scenarios: ${data.error || 'Unknown error'}`);
        }

        setScenarios(data.scenarios);

        // Initialize experimentFlow if needed
        if (metadata.experimentFlow && metadata.experimentFlow.conditions.length > 0) {
          // Get or create participant ID
          let participantId = getParticipantId(studySlug);
          if (!participantId) {
            participantId = `participant_${Date.now()}`;
            setParticipantId(studySlug, participantId);
            console.log(`[Scenarios] Created new participant ID: ${participantId}`);
          }

          // Assign condition and generate item sequence
          const assignment = assignCondition(
            studySlug,
            participantId,
            metadata.experimentFlow.conditions,
            metadata.experimentFlow.assignmentStrategy
          );

          console.log(`[Scenarios] Assigned to condition: ${assignment.condition}`);

          // Load current item
          const item = getCurrentItem(studySlug, metadata.inlineItems || []);
          setCurrentItem(item);

          if (!item) {
            // Sequence is complete, mark as complete and redirect to demographic
            console.log('[Scenarios] Sequence complete, setting flag and redirecting to demographic');
            setStudyItem(studySlug, 'scenariosComplete', 'true');
            // Verify it was set
            const verify = getStudyItem(studySlug, 'scenariosComplete');
            console.log('[Scenarios] Flag verification:', { studySlug, scenariosComplete: verify });
            hasRedirected.current = true;
            router.push(`/studies/${studySlug}/demographic`);
            return;
          }
        } else {
          console.error('[Scenarios] No experimentFlow found in metadata');
          // Could redirect to error page or show error message
        }

        setIsLoading(false);
      } catch (error) {
        console.error('[Scenarios] Error loading:', error);
        setIsLoading(false);
      }
    };

    loadScenarios();
  }, [studySlug, config.consent, metadata]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Handle item completion
   * Called when user completes a trial, instruction, quiz, etc.
   */
  const handleItemComplete = async (response?: any) => {
    console.log('[Scenarios] Item completed:', currentItem?.id, response);

    // If this was a trial, save the response
    if (currentItem?.type === 'trial' && response) {
      try {
        const participantId = getParticipantId(studySlug);

        // Submit to API if backend is enabled
        if (config.study.backend?.enabled) {
          const result = await fetch(`/api/studies/${studySlug}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ participantId, response }),
          });

          const data = await result.json();
          if (!data.success) {
            console.error('[Scenarios] Failed to submit response:', data.error);
          }
        }

        // Also store in localStorage as backup
        const responses = getStudyItem(studySlug, 'responses');
        const responsesData = responses ? JSON.parse(responses) : {};
        responsesData[currentItem.id] = response;
        setStudyItem(studySlug, 'responses', JSON.stringify(responsesData));
      } catch (error) {
        console.error('[Scenarios] Error saving response:', error);
      }
    }

    // Advance to next item
    const hasMore = advanceToNextItem(studySlug);

    if (hasMore) {
      // Load next item
      const nextItem = getCurrentItem(studySlug, metadata.inlineItems || []);
      setCurrentItem(nextItem);

      if (!nextItem) {
        console.error('[Scenarios] Failed to load next item');
      }
    } else {
      // Sequence complete, redirect to demographic
      console.log('[Scenarios] All items complete, redirecting to demographic');
      setStudyItem(studySlug, 'scenariosComplete', 'true');
      router.push(`/studies/${studySlug}/demographic`);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading study...</div>
      </div>
    );
  }

  // No current item (shouldn't happen, but handle gracefully)
  if (!currentItem) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg mb-4">Study complete or no items available</p>
          <button
            onClick={() => router.push(`/studies/${studySlug}/demographic`)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Render current item
  return (
    <div className="relative min-h-screen">
      <ExperimentItemRenderer
        item={currentItem}
        scenarios={scenarios}
        onComplete={handleItemComplete}
      />

      {/* Progress indicator */}
      <ScenarioNavigation studySlug={studySlug} />
    </div>
  );
}

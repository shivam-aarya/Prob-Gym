'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExperimentItem, StudyConfig } from '@/types/study';
import Layout from './Layout';
import QuestionFrame from './QuestionFrame';
import MultiQuestionFrame from './MultiQuestionFrame';
import { useStudy } from '@/contexts/StudyContext';

interface ExperimentItemRendererProps {
  item: ExperimentItem;
  scenarios: StudyConfig[];
  onComplete: (response?: any) => void;
}

/**
 * Renderer for different experiment item types
 * Handles trials, instructions, test trials, and comprehension quizzes
 */
export default function ExperimentItemRenderer({
  item,
  scenarios,
  onComplete
}: ExperimentItemRendererProps) {
  const { metadata } = useStudy();

  // Helper to get asset URL
  const getAssetUrl = (path: string) => {
    return `${metadata.assetPath}/${path}`;
  };

  switch (item.type) {
    case 'trial': {
      // Render regular trial
      const scenario = scenarios.find(s => s.scenario_id === item.scenarioId);

      if (!scenario) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-red-600">
              Error: Scenario {item.scenarioId} not found for trial {item.id}
              <br />
              <small>Available scenarios: {scenarios.map(s => s.scenario_id).join(', ')}</small>
            </div>
          </div>
        );
      }

      // Determine if this is a multi-question or single-question scenario
      const isMultiQuestion = scenario.questions && scenario.questions.length > 0;
      const hasSingleQuestion = !isMultiQuestion && scenario.input_method;

      if (!isMultiQuestion && !hasSingleQuestion) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-red-600">
              Error: Scenario {item.scenarioId} has neither questions array nor input_method
              <br />
              <small>Scenario data: {JSON.stringify(scenario).substring(0, 200)}...</small>
            </div>
          </div>
        );
      }

      return (
        <main className="min-h-screen">
          <Layout config={scenario}>
            {isMultiQuestion ? (
              <MultiQuestionFrame
                config={scenario}
                onSubmit={onComplete}
                previousResponses={{}}
              />
            ) : (
              <QuestionFrame
                config={scenario}
                onSubmit={onComplete}
                previousResponses={{}}
              />
            )}
          </Layout>
        </main>
      );
    }

    case 'test_trial': {
      // Render test trial with feedback
      return <TestTrialRenderer item={item} scenarios={scenarios} onComplete={onComplete} />;
    }

    case 'instruction': {
      // Render instruction page (full page layout)
      return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              {/* Instruction text (HTML content) */}
              <div
                className="prose dark:prose-invert max-w-none mb-6"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />

              {/* Media (images/videos) */}
              {item.media && item.media.length > 0 && (
                <div className="space-y-4 mb-6">
                  {item.media.map((media, idx) => (
                    <div key={idx} className="flex justify-center">
                      {media.type === 'image' ? (
                        <Image
                          src={getAssetUrl(media.url)}
                          alt="Instruction image"
                          width={800}
                          height={600}
                          className="rounded-lg max-w-full h-auto"
                        />
                      ) : (
                        <video
                          src={getAssetUrl(media.url)}
                          controls
                          className="rounded-lg max-w-full"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Continue button */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => onComplete()}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </main>
      );
    }

    case 'comprehension_quiz': {
      // Render comprehension quiz (full page layout)
      return (
        <ComprehensionQuizRenderer item={item} onComplete={onComplete} />
      );
    }

    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-600">Unknown item type: {(item as any).type}</div>
        </div>
      );
  }
}

/**
 * Test trial renderer with feedback
 */
function TestTrialRenderer({
  item,
  scenarios,
  onComplete
}: {
  item: ExperimentItem & { type: 'test_trial' };
  scenarios: StudyConfig[];
  onComplete: (response?: any) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const scenario = scenarios.find(s => s.scenario_id === item.scenarioId);

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">
          Error: Scenario {item.scenarioId} not found
        </div>
      </div>
    );
  }

  const handleSubmit = (resp: any) => {
    setResponse(resp);
    setSubmitted(true);
  };

  const handleContinue = () => {
    onComplete(response);
  };

  return (
    <main className="min-h-screen">
      <Layout config={scenario}>
        {scenario.questions && scenario.questions.length > 0 ? (
          <MultiQuestionFrame
            config={scenario}
            onSubmit={handleSubmit}
            previousResponses={{}}
          />
        ) : (
          <QuestionFrame
            config={scenario}
            onSubmit={handleSubmit}
            previousResponses={{}}
          />
        )}
      </Layout>

      {/* Feedback panel (shown after submission) */}
      {submitted && item.feedback && (
        <div className="fixed inset-x-0 bottom-0 bg-blue-50 dark:bg-blue-900 border-t-4 border-blue-500 p-6 shadow-lg z-50">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Feedback
            </h3>
            <div
              className="prose dark:prose-invert mb-4"
              dangerouslySetInnerHTML={{ __html: item.feedback }}
            />
            <button
              onClick={handleContinue}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* If no feedback, continue immediately after submission */}
      {submitted && !item.feedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <p className="text-lg mb-4">Response recorded!</p>
            <button
              onClick={handleContinue}
              className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/**
 * Comprehension quiz renderer
 */
function ComprehensionQuizRenderer({
  item,
  onComplete
}: {
  item: ExperimentItem & { type: 'comprehension_quiz' };
  onComplete: (response?: any) => void;
}) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Check if all answers are correct
  const allCorrect = item.questions.every(
    (q, idx) => answers[idx] === q.correctAnswer
  );

  const allAnswered = answers.length === item.questions.length;

  const handleSubmit = () => {
    if (!allAnswered) return;

    setSubmitted(true);

    // If all correct, allow continue
    // If not all correct, show feedback but don't advance automatically
  };

  const handleContinue = () => {
    if (allCorrect) {
      onComplete({ answers });
    } else {
      // Reset for retry
      setSubmitted(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Comprehension Check</h2>

          {/* Optional intro text */}
          {item.text && (
            <div
              className="prose dark:prose-invert mb-6"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          )}

          {/* Questions */}
          {item.questions.map((question, qIdx) => (
            <div key={qIdx} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">
                {qIdx + 1}. {question.question}
              </h3>

              <div className="space-y-3">
                {question.options.map((option, oIdx) => {
                  const isSelected = answers[qIdx] === oIdx;
                  const isCorrect = oIdx === question.correctAnswer;
                  const showFeedback = submitted;

                  let className = 'w-full text-left p-4 rounded-lg border-2 transition-colors ';

                  if (!showFeedback) {
                    // Before submission
                    className += isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400';
                  } else {
                    // After submission - show correct/incorrect
                    if (isCorrect) {
                      className += 'border-green-500 bg-green-50 dark:bg-green-900/30';
                    } else if (isSelected && !isCorrect) {
                      className += 'border-red-500 bg-red-50 dark:bg-red-900/30';
                    } else {
                      className += 'border-gray-300 dark:border-gray-600';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        if (!submitted) {
                          const newAnswers = [...answers];
                          newAnswers[qIdx] = oIdx;
                          setAnswers(newAnswers);
                        }
                      }}
                      disabled={submitted}
                      className={className}
                    >
                      <div className="flex items-center">
                        <span className="flex-1">{option}</span>
                        {showFeedback && isCorrect && (
                          <span className="text-green-600 font-semibold">✓</span>
                        )}
                        {showFeedback && isSelected && !isCorrect && (
                          <span className="text-red-600 font-semibold">✗</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Feedback messages */}
          {submitted && !allCorrect && (
            <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-500 rounded-lg mb-6">
              <p className="text-red-800 dark:text-red-200 font-medium">
                Some answers are incorrect. Please review and try again.
              </p>
            </div>
          )}

          {submitted && allCorrect && (
            <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-lg mb-6">
              <p className="text-green-800 dark:text-green-200 font-medium">
                All correct! You may continue.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end mt-8">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
              >
                Check Answers
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {allCorrect ? 'Continue' : 'Try Again'}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

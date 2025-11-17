import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import QuestionFrame from './QuestionFrame';
import { StudyConfig, UserResponse } from '@/types/study';
import Image from 'next/image';
import ReplayableGif from './ReplayableGif';
import { useStudy } from '@/contexts/StudyContext';
import { getStudyItem, setStudyItem, removeStudyItem } from '@/utils/studyStorage';

interface TutorialContent {
  type: 'text' | 'image' | 'video' | 'gif' | 'blockquote' | 'scenario' | 'quiz';
  value?: string;
  src?: string;
  alt?: string;
  caption?: string;
  config?: StudyConfig;
  feedback?: {
    title?: string;
    content: string;
  };
  id?: string;
  question?: string;
  options?: string[];
  answer?: number;
}

interface TutorialPage {
  title: string;
  content: TutorialContent[];
}

interface TutorialPageProps {
  config: {
    title: string;
    pages: TutorialPage[];
    buttonText: string;
  };
  onComplete: () => void;
}

const ContentRenderer: React.FC<{
  content: TutorialContent;
  onTestSubmit?: (response: UserResponse) => void;
  showConfirmation?: boolean;
  quizAnswers?: Record<string, number>;
  setQuizAnswers?: (answers: Record<string, number>) => void;
}> = ({ content, onTestSubmit, showConfirmation, quizAnswers, setQuizAnswers }) => {
  const { getAssetUrl } = useStudy();

  switch (content.type) {
    case 'text':
      return <div className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: content.value || '' }} />;
    case 'blockquote':
      return (
        <div className="my-6">
          <blockquote className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500 italic text-lg">
            <div className="mb-0" dangerouslySetInnerHTML={{ __html: content.value || '' }} />
          </blockquote>
        </div>
      );
    case 'scenario':
      if (!content.config) return null;
      return (
        <div className="mt-6 scenario-container w-full">
          <div className="min-h-[650px] overflow-visible">
            <Layout config={content.config}>
              <div className="w-full overflow-visible">
                <QuestionFrame
                  config={content.config}
                  onSubmit={onTestSubmit || (() => {})}
                  previousResponses={{}}
                />
              </div>
            </Layout>
          </div>
          {showConfirmation && content.feedback && (
            <div className="mt-6 p-6 bg-red-600 dark:bg-red-800 text-white rounded-md shadow-lg border-2 border-red-400 dark:border-red-600 animate-fadeIn">
              <h3 className="text-xl font-bold mb-2">{content.feedback.title || "Important Feedback"}</h3>
              <div className="text-lg" dangerouslySetInnerHTML={{ __html: content.feedback.content }} />
            </div>
          )}
        </div>
      );
    case 'image':
      return (
        <div className="mb-4">
          <Image
            src={getAssetUrl(content.src || '')}
            alt={content.alt || ''}
            width={600}
            height={450}
            className="w-full max-w-[600px] mx-auto rounded-lg shadow-md"
            style={{ objectFit: 'contain', maxHeight: 'auto', width: '100%' }}
          />
          {content.caption && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
              {content.caption}
            </p>
          )}
        </div>
      );
    case 'video':
      return (
        <div className="mb-4">
          <video
            src={getAssetUrl(content.src || '')}
            controls
            className="w-full rounded-lg shadow-md"
          />
          {content.caption && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
              {content.caption}
            </p>
          )}
        </div>
      );
    case 'gif':
      return (
        <div className="mb-4">
          <div className="relative w-full h-[400px] rounded-lg shadow-md">
            <ReplayableGif
              src={getAssetUrl(content.src || '')}
              alt={content.alt || ''}
              className="group"
            />
          </div>
          {content.caption && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
              {content.caption}
            </p>
          )}
        </div>
      );
    case 'quiz':
      if (!content.question || !content.options || !content.id) return null;
      const selectedAnswer = quizAnswers?.[content.id];
      const isCorrect = selectedAnswer === content.answer;
      const hasAnswered = selectedAnswer !== undefined;

      return (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">{content.question}</h4>
          <div className="space-y-2">
            {content.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setQuizAnswers?.({ ...quizAnswers, [content.id!]: index })}
                className={`w-full text-left p-3 rounded-md border-2 transition-colors ${
                  selectedAnswer === index
                    ? hasAnswered && isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900'
                      : hasAnswered && !isCorrect
                      ? 'border-red-500 bg-red-50 dark:bg-red-900'
                      : 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {hasAnswered && (
            <div className={`mt-3 p-3 rounded-md ${
              isCorrect
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect. Please try again.'}
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
};

export default function TutorialPage({ config, onComplete }: TutorialPageProps) {
  const { studySlug } = useStudy();
  const [currentPage, setCurrentPage] = useState(0);
  const [testScenarioCompleted, setTestScenarioCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  // Use study-scoped localStorage to restore state on page refresh
  useEffect(() => {
    try {
      const completed = getStudyItem(studySlug, 'testScenarioCompleted') === 'true';
      if (completed) {
        setTestScenarioCompleted(true);
        setShowConfirmation(true);
      }
    } catch (err) {
      console.error("Error restoring state:", err);
    }
  }, [studySlug]);

  // Fallback if config is invalid
  if (!config || !config.pages || !Array.isArray(config.pages) || config.pages.length === 0) {
    return (
      <div className="p-6 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
        <h2 className="text-xl font-bold mb-2">Configuration Error</h2>
        <p>There was a problem loading the tutorial. Please refresh the page or contact support.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  const handleNext = () => {
    if (currentPage < config.pages.length - 1) {
      setCurrentPage(currentPage + 1);
      // Reset quiz answers for the next page
      setQuizAnswers({});
    } else {
      try {
        // Mark tutorial as complete (study-scoped)
        setStudyItem(studySlug, 'tutorialComplete', 'true');
        removeStudyItem(studySlug, 'testScenarioCompleted');

        // Navigate to scenarios using the parent handler
        onComplete();
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback direct navigation if parent handler fails
        window.location.href = `/studies/${studySlug}/scenarios`;
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      // Reset confirmation when going back from a page with test scenario
      const prevPageHasTestScenario = config.pages[currentPage - 1].content.some(c => c.type === 'scenario' && c.feedback);
      if (prevPageHasTestScenario) {
        setShowConfirmation(false);
      }
    }
  };

  const handleTestScenarioSubmit = () => {
    try {
      // Store a simplified mock response (study-scoped)
      setStudyItem(studySlug, 'testScenarioCompleted', 'true');

      // Mark scenario as completed
      setTestScenarioCompleted(true);
      setShowConfirmation(true);
    } catch (err) {
      console.error('Error in test scenario submission:', err);
      // Still mark as completed even if there was an error saving to localStorage
      setTestScenarioCompleted(true);
      setShowConfirmation(true);
    }
  };

  // Check if current page has quiz questions
  const currentPageQuizzes = config.pages[currentPage].content.filter(c => c.type === 'quiz');
  const allQuizzesAnsweredCorrectly = currentPageQuizzes.length === 0 || currentPageQuizzes.every(quiz => {
    if (!quiz.id) return false;
    return quizAnswers[quiz.id] === quiz.answer;
  });

  // Check if current page has a test scenario (scenario with feedback)
  const currentPageHasTestScenario = config.pages[currentPage].content.some(c => c.type === 'scenario' && c.feedback);
  const isCompleteButtonDisabled = (currentPageHasTestScenario && !testScenarioCompleted) || !allQuizzesAnsweredCorrectly;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{config.title}</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">{config.pages[currentPage].title}</h2>
        <div className={`space-y-4 ${currentPageHasTestScenario ? 'scenario-page' : ''}`}>
          {config.pages[currentPage].content.map((content, index) => (
            <ContentRenderer
              key={index}
              content={content}
              onTestSubmit={content.type === 'scenario' && content.feedback ? () => handleTestScenarioSubmit() : undefined}
              showConfirmation={showConfirmation}
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === 0
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={isCompleteButtonDisabled}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isCompleteButtonDisabled
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'
              : currentPage === config.pages.length - 1
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          {currentPage === config.pages.length - 1 ? config.buttonText : 'Next'}
        </button>
      </div>

      {currentPageHasTestScenario && !testScenarioCompleted && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-md">
          Please complete the test scenario above before proceeding.
        </div>
      )}

      {!allQuizzesAnsweredCorrectly && currentPageQuizzes.length > 0 && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-md">
          Please answer all quiz questions correctly before proceeding.
        </div>
      )}
    </div>
  );
} 
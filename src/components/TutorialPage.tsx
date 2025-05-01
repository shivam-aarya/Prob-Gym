import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import QuestionFrame from './QuestionFrame';
import { StudyConfig, UserResponse } from '@/types/study';
import Image from 'next/image';
import ReplayableGif from './ReplayableGif';

interface TutorialContent {
  type: 'text' | 'image' | 'video' | 'gif' | 'blockquote' | 'scenario';
  value?: string;
  src?: string;
  alt?: string;
  caption?: string;
  config?: StudyConfig;
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
}> = ({ content, onTestSubmit, showConfirmation }) => {
  switch (content.type) {
    case 'text':
      return <p className="text-lg mb-4">{content.value}</p>;
    case 'blockquote':
      return (
        <div className="my-6">
          <blockquote className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500 italic text-lg">
            <p className="mb-0">{content.value}</p>
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
          {showConfirmation && (
            <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md">
              Great! You&apos;ve completed the test scenario. Feedback: A reasonable answer would assign “Taco stand” the highest score and “Pizza truck” the lowest, because Timmy went to check behind his house. Had he liked seafood or pizza the best, he would have gone directly to them since they are all visible and near his place.
            </div>
          )}
        </div>
      );
    case 'image':
      return (
        <div className="mb-4">
          <Image 
            src={content.src || ''} 
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
            src={content.src} 
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
              src={content.src || ''} 
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
    default:
      return null;
  }
};

export default function TutorialPage({ config, onComplete }: TutorialPageProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [testScenarioCompleted, setTestScenarioCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Use localStorage to restore state on page refresh
  useEffect(() => {
    try {
      const completed = localStorage.getItem('testScenarioCompleted') === 'true';
      if (completed) {
        setTestScenarioCompleted(true);
        setShowConfirmation(true);
      }
    } catch (err) {
      console.error("Error restoring state:", err);
    }
  }, []);

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
    } else {
      try {
        // Mark tutorial as complete
        localStorage.setItem('tutorialComplete', 'true');
        localStorage.removeItem('testScenarioCompleted');
        
        // Navigate to scenarios using the parent handler
        onComplete();
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback direct navigation if parent handler fails
        window.location.href = '/scenarios';
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      // Reset confirmation when going back
      if (currentPage === config.pages.length - 1) {
        setShowConfirmation(false);
      }
    }
  };

  const handleTestScenarioSubmit = () => {
    try {
      // Store a simplified mock response
      localStorage.setItem('testScenarioCompleted', 'true');
      
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

  // Determine if the current page is the test scenario page and if it's the last page
  const isTestScenarioPage = currentPage === config.pages.length - 1;
  const isCompleteButtonDisabled = isTestScenarioPage && !testScenarioCompleted;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{config.title}</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">{config.pages[currentPage].title}</h2>
        <div className={`space-y-4 ${currentPage === config.pages.length - 1 ? 'scenario-page' : ''}`}>
          {config.pages[currentPage].content.map((content, index) => (
            <ContentRenderer 
              key={index} 
              content={content}
              onTestSubmit={currentPage === config.pages.length - 1 ? () => handleTestScenarioSubmit() : undefined}
              showConfirmation={currentPage === config.pages.length - 1 && showConfirmation}
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

      {isTestScenarioPage && !testScenarioCompleted && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-md">
          Please complete the test scenario above before proceeding to the main study.
        </div>
      )}
    </div>
  );
} 
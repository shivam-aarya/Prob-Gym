import React from 'react';

interface ConsentPageProps {
  config: {
    title: string;
    content: string[];
    buttonText: string;
  };
  onConsent: () => void;
}

export default function ConsentPage({ config, onConsent }: ConsentPageProps) {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">{config.title}</h1>
      <div className="space-y-6 mb-10 text-gray-700 dark:text-gray-300">
        {config.content.map((paragraph, index) => (
          <div key={index}>
            {paragraph.startsWith('•') ? (
              <div className="flex items-start ml-4">
                <span className="text-gray-600 dark:text-gray-400 mr-2">•</span>
                <p className="text-lg">{paragraph.substring(1).trim()}</p>
              </div>
            ) : (
              <p className="text-lg leading-relaxed">
                {paragraph}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={onConsent}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-md"
        >
          {config.buttonText}
        </button>
      </div>
    </div>
  );
} 
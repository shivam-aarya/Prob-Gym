import React from 'react';

interface TutorialPageProps {
  config: {
    title: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
    buttonText: string;
  };
  onComplete: () => void;
}

export default function TutorialPage({ config, onComplete }: TutorialPageProps) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{config.title}</h1>
      <div className="space-y-8 mb-8">
        {config.sections.map((section, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
            <p className="text-lg">{section.content}</p>
          </div>
        ))}
      </div>
      <button
        onClick={onComplete}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        {config.buttonText}
      </button>
    </div>
  );
} 
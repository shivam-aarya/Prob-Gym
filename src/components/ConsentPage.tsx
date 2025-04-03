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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{config.title}</h1>
      <div className="space-y-4 mb-8">
        {config.content.map((paragraph, index) => (
          <p key={index} className="text-lg">
            {paragraph}
          </p>
        ))}
      </div>
      <button
        onClick={onConsent}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        {config.buttonText}
      </button>
    </div>
  );
} 
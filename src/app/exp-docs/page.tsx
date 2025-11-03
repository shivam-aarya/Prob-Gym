/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';

export default function ExperimentDocsPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: '1. Overview' },
    { id: 'config', title: '2. Config Schema' },
    { id: 'trial', title: '3. Trial Schema' },
    { id: 'instruction', title: '4. Instruction Schema' },
    { id: 'human-data', title: '5. Human Data Schema' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-200">
      {/* Mobile Navigation */}
      <div className="lg:hidden w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 sticky top-16 z-40 shadow-sm">
        <select
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          className="w-full px-4 py-2 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        >
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.title}
            </option>
          ))}
        </select>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="py-6">
                  <h3 className="px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Documentation
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-6 py-3 text-sm font-medium transition-all duration-200 border-l-3 ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 border-l-blue-600 dark:border-l-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white border-l-transparent'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 max-w-4xl">

            {/* Overview Section */}
            {activeSection === 'overview' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-12 transition-all duration-200">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Data Standardization Manual for CogGym
                </h1>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  This document outlines the standardized file structure and JSON schemas required for submitting a dataset to the CogGym benchmark. The goal is to create a consistent, machine-readable format for diverse cognitive science experiments.
                </p>

                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This guide is structured to follow the logical components of an experiment:
                </p>
                <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong className="text-blue-600 dark:text-blue-400">Config Schema (config.json)</strong>: How to define the experiment's metadata and the flow of trials.</li>
                  <li><strong className="text-blue-600 dark:text-blue-400">Trial Schema (stimuli.jsonl)</strong>: How to define what a participant sees (stimuli) and is asked (queries).</li>
                  <li><strong className="text-blue-600 dark:text-blue-400">Instruction Schema (instruction.jsonl)</strong>: How to define the instructions and quizzes shown before the experiment.</li>
                  <li><strong className="text-blue-600 dark:text-blue-400">Human Data Schema</strong>: How to format the anonymized participant responses.</li>
                </ul>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  Directory Structure
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Each dataset must be contained within a single directory, named according to the convention below. A study may have multiple experiments, each in its own subdirectory (exp1, exp2, etc.). If there is only one experiment, it should still be placed in an <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">exp1</code> subdirectory.
                </p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto mb-6 border border-gray-200 dark:border-gray-700">
                  <code className="text-sm text-gray-800 dark:text-gray-200">{`[DatasetName]/
├── exp1/  (or exp1, exp2, exp3, etc. if multiple experiments)
│   ├── stimuli.jsonl
│   ├── config.json
│   ├── instruction.jsonl
│   ├── human_data_ind.json
│   ├── human_data_mean.json
│   └── assets/
│       ├── stimulus_image_01.png
│       ├── stimulus_video_01.mp4
│       └── ...
├── exp2/  (optional, if study has multiple experiments)
│   ├── stimuli.jsonl
│   ├── config.json
│   └── ...`}</code>
                </pre>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  Naming Convention
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The name of the root folder (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">[DatasetName]</code>) should follow the following convention: <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">[AuthorLastName][Year][FirstNonArticleWordOfTitle]</code>
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>[AuthorLastName]</strong>: The last name of the first author.</li>
                  <li><strong>[Year]</strong>: The four-digit publication year.</li>
                  <li><strong>[FirstNonArticleWordOfTitle]</strong>: The first word of the paper's title that is not an article (e.g., "A", "An", "The").</li>
                </ul>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-900/30 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Example 1</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Paper:</strong> "Understanding Epistemic Language with a Language-augmented Bayesian Theory of Mind" (Ying et al., 2025)
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Folder Structure:</strong>
                  </p>
                  <pre className="bg-white dark:bg-gray-800 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                    <code className="text-xs text-gray-800 dark:text-gray-200">{`Ying2025Understanding/
├── exp1/
│   ├── stimuli.jsonl
│   ├── config.json
│   ├── instruction.jsonl
│   └── ...
└── exp2/
    ├── stimuli.jsonl
    ├── config.json
    └── ...`}</code>
                  </pre>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl p-6 border border-purple-100 dark:border-purple-900/30 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Example 2</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Paper:</strong> "A Minimal Theory of Mind for Social Agents" (Rabinowitz et al., 2018)
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Folder Structure:</strong> <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm">Rabinowitz2018Minimal/</code> with at minimum an <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm">exp1/</code> subdirectory
                  </p>
                </div>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  File Summary
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Each experiment subdirectory (exp1, exp2, etc.) must contain the following files:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-10">
                  <li><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli.jsonl</code>: Definitions for all stimuli and experimental trials.</li>
                  <li><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">config.json</code>: Core configuration, metadata, and experiment flow for the experiment.</li>
                  <li><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">instruction.jsonl</code>: Defines the pre-experiment instruction and quiz steps.</li>
                  <li><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">human_data_ind.json</code> / <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">human_data_mean.json</code>: Anonymized human subject data.</li>
                  <li><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">assets/</code> (Optional Folder): Required if the experiment uses non-textual stimuli (e.g., images, audio, video).</li>
                </ul>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  File Format Specifications
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  The following sections detail the required structure for each file. Please refer to them to ensure your files are compliant.
                </p>

                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Config Schema (config.json)</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Provides high-level metadata about the experiment (name, description, DOI) and controls the experiment flow (e.g., block order, randomization). See <button onClick={() => setActiveSection('config')} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Section 2</button> for the full specification.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                    <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">Trial Schema (stimuli.jsonl)</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Defines individual experimental trials, including stimuli (images, videos) and the questions asked (sliders, multiple-choice, etc.). See <button onClick={() => setActiveSection('trial')} className="text-purple-600 dark:text-purple-400 hover:underline font-medium">Section 3</button> for the full specification.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                    <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">Instruction Schema (instruction.jsonl)</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Defines the sequence of instruction pages, practice trials, and comprehension quizzes presented to the participant before the main task. See <button onClick={() => setActiveSection('instruction')} className="text-green-600 dark:text-green-400 hover:underline font-medium">Section 4</button> for the full specification.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                    <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-2">Human Data Schema</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Specifies the format for both individual participant data (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">human_data_ind.json</code>) and aggregated mean data (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">human_data_mean.json</code>). See <button onClick={() => setActiveSection('human-data')} className="text-orange-600 dark:text-orange-400 hover:underline font-medium">Section 5</button> for the full specification.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Config Schema Section */}
            {activeSection === 'config' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-12 transition-all duration-200">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Config Schema (config.json)
                </h1>

                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  The <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">config.json</code> file provides high-level metadata about the experiment and defines the overall structure (or "flow") of the trials presented to the participant.
                </p>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  Metadata
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  These top-level keys describe the study and are used for dataset indexing and citation.
                </p>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Key</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">experimentName</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The full title of the experiment or study.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">description</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">A brief paragraph describing the task.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">paperDOI</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The DOI link to the original publication.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">taskType</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Strings</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Keywords describing the cognitive task.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">responseType</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Strings</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">All response types used in the experiment.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">contributors</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Strings</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">List of researcher names who prepared the data.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  Experiment Flow
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  To control the order and grouping of multiple trials, a nested <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">experimentFlow</code> object is used.
                </p>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Key</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">blocks</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Arrays</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Nested array where each inner array is a block of trials.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">block_randomization</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Boolean</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">If true, randomizes the order of blocks.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli_randomization</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Boolean</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">If true, randomizes trials within each block.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Example experimentFlow</h3>
                <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700 mb-4">
                  <code className="text-sm text-gray-800 dark:text-gray-200">{`"experimentFlow": {
  "blocks": [
    [ "trial_1_1", "trial_1_2", "trial_1_3" ],
    [ "trial_2_1", "trial_2_2" ]
  ],
  "block_randomization": true,
  "stimuli_randomization": false
}`}</code>
                </pre>
                <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">In this example:</p>
                <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>There are two blocks of trials.</li>
                  <li>Because <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">block_randomization</code> is <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">true</code>, the experiment will randomly present either Block 1 (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">["trial_1_1", ...]</code>) or Block 2 (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">["trial_2_1", ...]</code>) first.</li>
                  <li>Because <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli_randomization</code> is <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">false</code>, the trials within each block will always appear in their specified order.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Full config.json Example</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Here is what a complete <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">config.json</code> file looks like, combining the metadata and the experiment flow. The <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli_id</code> strings (e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">"trial_1_1"</code>) in the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">blocks</code> array refer to the trial objects defined in your Trial Schema (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli.jsonl</code>) file.
                </p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                  <code className="text-sm text-gray-800 dark:text-gray-200">{`{
  "experimentName": "Epistemic Language Understanding",
  "description": "Participants observe short animations and answer questions...",
  "paperDOI": "https://doi.org/10.1111/example.doi.12345",
  "taskType": ["Social Cognition", "Theory of Mind"],
  "responseType": ["multi-choice", "single-slider"],
  "contributors": ["Jane Doe", "John Smith"],
  "experimentFlow": {
    "blocks": [
      ["trial_1_1", "trial_1_2", "trial_1_3"],
      ["trial_2_1", "trial_2_2", "trial_2_3", "trial_2_4"]
    ],
    "block_randomization": true,
    "stimuli_randomization": false
  }
}`}</code>
                </pre>
              </div>
            )}

            {/* Trial Schema Section */}
            {activeSection === 'trial' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-12 transition-all duration-200">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Trial Schema (stimuli.jsonl)
                </h1>

                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  This document details the JSON schema for defining individual experimental trials. The <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli.jsonl</code> file contains one JSON object per line.
                </p>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  Top-Level Fields
                </h2>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Key</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli_id</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Unique identifier for this trial.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">input_type</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Type of media (e.g., "img", "video", "text").</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">media_url</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Strings</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Paths to media files in assets/ folder.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">commentary</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Optional text displayed with the stimulus.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">queries</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Objects</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of question objects.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">delay</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Number</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Optional delay in milliseconds.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Full Trial Object Example</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Here is an example of a complete trial object that shows an image and asks two questions: one multiple-choice and one slider.
                </p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700 mb-8">
                  <code className="text-sm text-gray-800 dark:text-gray-200">{`{
  "stimuli_id": "trial_agent_01",
  "input_type": "img",
  "media_url": [
    "https://placehold.co/600x400/e2e8f0/334155?text=Example+Stimulus+Image"
  ],
  "commentary": "Observe the agent's action in the image above.",
  "queries": [
    {
      "prompt": "What is the agent's primary goal?",
      "type": "multi-choice",
      "tag": "agent_goal",
      "option": [
        "Reaching the red box",
        "Reaching the blue box",
        "Looking for a key"
      ],
      "randomize_order": false,
      "required": true
    },
    {
      "prompt": "How confident are you in your answer?",
      "type": "single-slider",
      "tag": "goal_confidence",
      "slider_config": {
        "min": 0,
        "max": 100,
        "default_value": 50,
        "labels": [
          { "value": 0, "label": "Not at all confident" },
          { "value": 100, "label": "Completely confident" }
        ],
        "show_label_values": true
      },
      "randomize_order": false,
      "required": true
    }
  ]
}`}</code>
                </pre>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  Query Object Schema
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The queries array contains objects that define each question. All query objects share these common fields:
                </p>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Key</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">prompt</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The question text presented to the user.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">type</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Response widget type (multi-choice, single-slider, etc.).</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">tag</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Unique identifier for this query.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">option</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Strings</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">List of choices for multi-choice/multi-select/multi-slider.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">randomize_order</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Boolean</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">If true, shuffles option order.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">slider_config</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Object</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Required for slider types (min, max, default_value, labels).</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">required</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Boolean</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">If true, user must provide a response.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Query Types</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  This section details the different response widgets available.
                </p>

                <div className="space-y-10 mb-8">
                  {/* multi-choice */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/5 dark:to-purple-900/5">
                    <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">multi-choice</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">Presents a list of radio buttons from the option array. The user can select only one.</p>
                    <h5 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">JSON Example:</h5>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700 mb-3">
                      <code className="text-xs text-gray-800 dark:text-gray-200">{`{
  "prompt": "What is the capital of France?",
  "type": "multi-choice",
  "tag": "capital_choice",
  "option": ["London", "Berlin", "Paris", "Madrid"],
  "randomize_order": true,
  "required": true
}
// Data saved as: "capital_choice": { "idx": 2, "option_text": "Paris" }`}</code>
                    </pre>
                  </div>

                  {/* multi-select */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-purple-900/5 dark:to-pink-900/5">
                    <h4 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">multi-select</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">Presents a list of checkboxes from the option array. The user can select one or more.</p>
                    <h5 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">JSON Example:</h5>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700 mb-3">
                      <code className="text-xs text-gray-800 dark:text-gray-200">{`{
  "prompt": "Which colors do you see?",
  "type": "multi-select",
  "tag": "color_select",
  "option": ["Red", "Green", "Blue"],
  "randomize_order": false,
  "required": true
}
// Data saved as: "color_select": [
//   { "idx": 0, "option_text": "Red" },
//   { "idx": 2, "option_text": "Blue" }
// ]`}</code>
                    </pre>
                  </div>

                  {/* single-slider */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-green-50/30 to-blue-50/30 dark:from-green-900/5 dark:to-blue-900/5">
                    <h4 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">single-slider</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">Presents a single slider. Requires slider_config. The option field is not used.</p>
                    <h5 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">JSON Example:</h5>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700 mb-3">
                      <code className="text-xs text-gray-800 dark:text-gray-200">{`{
  "prompt": "How confident are you?",
  "type": "single-slider",
  "tag": "confidence_rating",
  "slider_config": {
    "min": 0,
    "max": 100,
    "default_value": 50,
    "labels": [
      { "value": 0, "label": "Not at all" },
      { "value": 100, "label": "Completely" }
    ],
    "show_label_values": true
  },
  "required": true
}
// Data saved as: "confidence_rating": 78`}</code>
                    </pre>
                  </div>

                  {/* multi-slider */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-yellow-50/30 to-orange-50/30 dark:from-yellow-900/5 dark:to-orange-900/5">
                    <h4 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-3">multi-slider</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">Presents one slider for each item in the option array. Requires slider_config. Optionally, you can use sampling_size to show only a random subset of options to reduce cognitive load.</p>
                    <h5 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">JSON Example:</h5>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700 mb-4">
                      <code className="text-xs text-gray-800 dark:text-gray-200">{`{
  "prompt": "Please rate how likely each of the following statements is to be true",
  "type": "multi-slider",
  "tag": "statement_ratings",
  "option": ["Statement 1", "Statement 2", "Statement 3"],
  "slider_config": {
    "min": 0,
    "max": 100,
    "default_value": 50,
    "labels": [
      { "value": 0, "label": "Extremely unlikely" },
      { "value": 50, "label": "Neutral" },
      { "value": 100, "label": "Extremely likely" }
    ],
    "show_label_values": true
  },
  "randomize_order": false,
  "required": true
}
// Data saved as: "statement_ratings": {
//   "Statement 1": 50,
//   "Statement 2": 50,
//   "Statement 3": 50
// }`}</code>
                    </pre>

                    <h5 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Example with sampling_size:</h5>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700 mb-3">
                      <code className="text-xs text-gray-800 dark:text-gray-200">{`{
  "prompt": "Please rate the following statements about the agent's initial beliefs:",
  "type": "multi-slider",
  "tag": "statement_rating",
  "option": [
    "The player initially believed that box 3 contained a blue key.",
    "The player initially believed that box 1 and 2 contained no blue key.",
    "The player initially believed that box 1 might have the blue key.",
    "The player initially believed the blue key was not in box 2.",
    "The player initially thought that there may have been a key in box 2."
  ],
  "slider_config": {
    "min": 1,
    "max": 7,
    "default_value": 4,
    "labels": [
      { "value": 1, "label": "Extremely unlikely" },
      { "value": 7, "label": "Extremely likely" }
    ],
    "show_label_values": true
  },
  "sampling_size": 2,
  "randomize_order": true,
  "required": true
}
// With sampling_size: 2, only 2 randomly selected statements will be shown
// Data saved as: "statement_rating": {
//   "The player initially believed that box 3 contained a blue key.": 5,
//   "The player initially thought that there may have been a key in box 2.": 3
// }`}</code>
                    </pre>
                  </div>

                  {/* textbox */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-pink-50/30 to-red-50/30 dark:from-pink-900/5 dark:to-red-900/5">
                    <h4 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-3">textbox</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">Provides a free-response text area for the user to type in an answer. The option field is not used.</p>
                    <h5 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">JSON Example:</h5>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700 mb-3">
                      <code className="text-xs text-gray-800 dark:text-gray-200">{`{
  "prompt": "Please describe the agent's behavior.",
  "type": "textbox",
  "tag": "agent_description",
  "required": true
}
// Data saved as: "agent_description": "The agent moved..."`}</code>
                    </pre>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-900 dark:text-white">Slider Config (slider_config)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This object is required for single-slider and multi-slider types.
                </p>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Key</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">min</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Number</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The minimum value of the slider.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">max</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Number</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The maximum value of the slider.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">default_value</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Number</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The value where the slider handle starts.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">labels</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Objects</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">An array of label objects to display under the slider. Each object has "value" (Number) and "label" (String) fields.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">show_label_values</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Boolean</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">If true, displays the numeric value alongside the text label.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Instruction Schema Section */}
            {activeSection === 'instruction' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-12 transition-all duration-200">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Instruction Schema (instruction.jsonl)
                </h1>

                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  The <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">instruction.jsonl</code> file defines the sequence of screens (instructions, test trials, quizzes) that a participant sees before the main experiment begins.
                </p>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  Top-Level Structure
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The file contains one "Module" object per line. Each Module object must have a <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">type</code> field, which determines the other required fields.
                </p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700 mb-8">
                  <code className="text-sm text-gray-800 dark:text-gray-200">{`{ "type": "instruction", ... }
{ "type": "test_trial", ... }
{ "type": "comprehension_quiz", ... }`}</code>
                </pre>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  Module Types
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  This section details each module type available.
                </p>

                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">instruction</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">This is the most common Module. It displays a page of text and/or images to the participant.</p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Field</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800">
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">type</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Must be "instruction"</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">text</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Main body text (supports HTML tags)</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">media_url</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Optional: Array of image/video paths</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">test_trial</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">Displays a practice trial from stimuli.jsonl with optional feedback.</p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Field</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800">
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">type</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Must be "test_trial"</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli_id</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">ID of trial from stimuli.jsonl</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">feedback</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Optional: Text shown after submission</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">comprehension_quiz</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">Presents quiz questions with immediate feedback. Questions use the same Query Object format as trials.</p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Field</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800">
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">type</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Must be "comprehension_quiz"</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">text</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Optional: Introductory text</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">queries</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Query Objects with answer field</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        <strong>Note:</strong> Quiz queries must include an <code className="bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded text-xs">answer</code> field (0-based index) to provide real-time feedback.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-900 dark:text-white">Full instruction.jsonl Example</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This example shows a sequence containing a welcome page, a second instruction page with an image, a test trial, and a final comprehension quiz.
                </p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                  <code className="text-xs text-gray-800 dark:text-gray-200">{`{
  "type": "instruction",
  "text": "<p>Thank you for participating. In this task, you will observe an agent (a blue circle) move in a simple environment.</p><strong>Your goal is to determine what the agent wants.</strong><p>Please pay close attention to its behavior.</p>"
}
{
  "type": "instruction",
  "text": "<p>You will see a scene like the one below. The blue circle is the agent. The red and blue boxes are potential goals. Your task is to judge which goal the agent wants after observing its movement.</p>",
  "media_url": [
    "https://placehold.co/600x400/e2e8f0/334155?text=Example+Scene"
  ]
}
{
  "type": "test_trial",
  "stimuli_id": "trial_agent_01",
  "feedback": "In this example, the player is going for the red box!"
}
{
  "type": "comprehension_quiz",
  "text": "<p>Please answer the following questions.</p>",
  "queries": [
    {
      "prompt": "What is your main task in this experiment?",
      "type": "multi-choice",
      "tag": "quiz_q1",
      "option": [
        "To click the boxes as fast as possible.",
        "To determine the agent's goal.",
        "To count the number of circles."
      ],
      "answer": 1
    },
    {
      "prompt": "Is this a timed experiment?",
      "type": "multi-choice",
      "tag": "quiz_q2",
      "option": [
        "Yes",
        "No"
      ],
      "answer": 1
    }
  ]
}`}</code>
                </pre>
              </div>
            )}

            {/* Human Data Schema Section */}
            {activeSection === 'human-data' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-12 transition-all duration-200">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Human Data Schema
                </h1>

                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  This document outlines the required format for storing anonymized human subject data. The data is split into two files: one for individual participant data (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">human_data_ind.json</code>) and one for mean/aggregated data (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">human_data_mean.json</code>).
                </p>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  human_data_ind.json (Individual Data)
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  This file contains the raw, anonymized responses for all participants, compiled by trial and question. The root of the JSON is an object where each key is a <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli_id</code>.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Stimulus Data Object Structure</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Each <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli_id</code> object contains keys that <strong>must match the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">tag</code>s</strong> defined in the trial's queries (see Section 3.2). The value for each tag is an array, where each item in the array is the response from a single participant.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  For example, if there were 4 participants, each response array will contain 4 elements.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Response Array Structure</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The data type inside each participant's response array depends on the query <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">type</code> defined in <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli.jsonl</code>:
                </p>
                <div className="space-y-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">single-slider</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Array of Numbers</p>
                    <code className="text-xs bg-white dark:bg-gray-800 px-3 py-1.5 rounded block">"goal_confidence": [95, 88, 70, 92]</code>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl p-5 border border-purple-100 dark:border-purple-900/30">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">multi-choice</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Array of Objects with idx and option_text</p>
                    <code className="text-xs bg-white dark:bg-gray-800 px-3 py-1.5 rounded block">{`"agent_goal": [{ "idx": 0, "option_text": "Red box" }, ...]`}</code>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-xl p-5 border border-green-100 dark:border-green-900/30">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">multi-slider</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Array with single Object mapping labels to value arrays</p>
                    <code className="text-xs bg-white dark:bg-gray-800 px-3 py-1.5 rounded block">{`"ratings": [{ "Statement 1": [80, 75], "Statement 2": [25, 30] }]`}</code>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-xl p-5 border border-yellow-100 dark:border-yellow-900/30">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">multi-select</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Array of Arrays (one-hot encoding)</p>
                    <code className="text-xs bg-white dark:bg-gray-800 px-3 py-1.5 rounded block">"cities": [[0, 1, 1, 0], [1, 0, 0, 0]]</code>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-900/10 dark:to-red-900/10 rounded-xl p-5 border border-pink-100 dark:border-pink-900/30">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">textbox</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Array of Strings</p>
                    <code className="text-xs bg-white dark:bg-gray-800 px-3 py-1.5 rounded block">"description": ["The agent seemed...", "It was trying..."]</code>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Example: human_data_ind.json</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This example corresponds to the query tags defined in the Trial Schema examples, assuming data from 2 participants. The keys <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">"trial_1_1"</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">"agent_goal"</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">"goal_confidence"</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">"statement_rating"</code>, and <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">"strategy_description"</code> are all defined in the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli.jsonl</code> file.
                </p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700 mb-10">
                  <code className="text-sm text-gray-800 dark:text-gray-200">{`{
  "trial_1_1": {
    "agent_goal": [
      { "idx": 0, "option_text": "Reaching the red box" },
      { "idx": 1, "option_text": "Reaching the blue box" }
    ],
    "goal_confidence": [
      95,
      88
    ]
  },
  "trial_1_2": {
    "statement_rating": [
      { "Statement 1": [80, 70], "Statement 2": [25, 35] }
    ],
    "strategy_description": [
      "The agent seemed to be looking for the red box.",
      "Unsure, but it moved towards the blue box first."
    ]
  }
}`}</code>
                </pre>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  human_data_mean.json (Mean Data)
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  This file provides a convenient summary of the data, aggregated across all participants. The structure mirrors <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">human_data_ind.json</code>, but replaces the arrays of individual responses with aggregated statistics.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Structure</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The structure for each <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli_id</code> will vary depending on the data type, but generally follows these principles:
                </p>
                <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">single-slider</code> Data (e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">goal_confidence</code>):</strong> A single Number representing the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">"mean"</code> of the numbers in the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">ind</code> array.</li>
                  <li><strong><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-choice</code> Data (e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">agent_goal</code>):</strong> An object where keys are constructed from the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">tag</code> and the option's 1-based index (e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">tag_1</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">tag_2</code>), and values are the counts or proportions.</li>
                  <li><strong><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-slider</code> Data (e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">statement_rating</code>):</strong> An object where keys are constructed from the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">tag</code> and the option's 1-based index (e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">tag_1</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">tag_2</code>), and each value is a single Number representing the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">"mean"</code>.</li>
                  <li><strong><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">textbox</code> or <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-select</code> Data:</strong> Aggregations are optional and task-specific (e.g., keyword counts, selection frequencies).</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Example: human_data_mean.json</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This example shows the aggregated data for the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">human_data_ind.json</code> example above. The keys are derived from the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">tag</code>s in <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli.jsonl</code> (e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">agent_goal</code> becomes <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">agent_goal_1</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">agent_goal_2</code>; <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">statement_rating</code> becomes <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">statement_rating_1</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">statement_rating_2</code>).
                </p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                  <code className="text-sm text-gray-800 dark:text-gray-200">{`{
  "trial_1_1": {
    "agent_goal": {
      "agent_goal_1": 1,
      "agent_goal_2": 1
    },
    "goal_confidence": 91.5
  },
  "trial_1_2": {
    "statement_rating": {
      "statement_rating_1": 75,
      "statement_rating_2": 30
    }
  }
}`}</code>
                </pre>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}

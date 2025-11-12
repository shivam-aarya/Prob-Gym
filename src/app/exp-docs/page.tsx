/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import ThemeImage from '@/components/ThemeImage';

export default function ExperimentDocsPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'config', title: 'Config Schema' },
    { id: 'trial', title: 'Trial Schema' },
    { id: 'instruction', title: 'Instruction Schema' },
    { id: 'human-data', title: 'Human Data Schema' },
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
                      Provides high-level metadata about the experiment (name, description, DOI) and controls the experiment flow (e.g., block order, randomization). See <button onClick={() => setActiveSection('config')} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">the Config Schema</button> for the full specification.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                    <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">Trial Schema (stimuli.jsonl)</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Defines individual experimental trials, including stimuli (images, videos) and the questions asked (sliders, multiple-choice, etc.). See <button onClick={() => setActiveSection('trial')} className="text-purple-600 dark:text-purple-400 hover:underline font-medium">the Trial Schema</button> for the full specification.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                    <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">Instruction Schema (instruction.jsonl)</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Defines the sequence of instruction pages, practice trials, and comprehension quizzes presented to the participant before the main task. See <button onClick={() => setActiveSection('instruction')} className="text-green-600 dark:text-green-400 hover:underline font-medium">the Instruction Schema</button> for the full specification.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                    <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-2">Human Data Schema</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Specifies the format for both individual participant data (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">human_data_ind.json</code>) and aggregated mean data (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">human_data_mean.json</code>). See <button onClick={() => setActiveSection('human-data')} className="text-orange-600 dark:text-orange-400 hover:underline font-medium">the Human Data Schema</button> for the full specification.
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
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The DOI link to the original publication (e.g., &quot;https://doi.org/...&quot;).</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">taskType</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Strings</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Keywords describing the cognitive task (e.g., &quot;Social Cognition&quot;, &quot;Decision Making&quot;).</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">responseType</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Strings</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">All response types used, e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">[&quot;multi-choice&quot;, &quot;slider&quot;, &quot;free-text&quot;]</code>.</td>
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
                  Experiment Flow (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">experimentFlow</code>)
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  To control the order and grouping of multiple trials, a nested <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">experimentFlow</code> object is used. This defines the overall flow of the experiment.
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
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Arrays of Strings</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">A nested array. Each inner array is a &quot;block&quot; of trials. Each string is a <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli_id</code> from <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli.jsonl</code>.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">block_randomization</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Boolean</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">If <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">true</code>, the order of the &quot;blocks&quot; (the inner arrays) is randomized for each participant.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli_randomization</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Boolean</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">If <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">true</code>, the order of the trial <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli_id</code>s <em>within</em> each block is randomized.</td>
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
                  <li>Because <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli_randomization</code> is <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">false</code>, the trials <em>within</em> each block will always appear in their specified order.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Full config.json Example</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Here is what a complete <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">config.json</code> file looks like, combining the metadata and the experiment flow. The <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli_id</code> strings (e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">"trial_1_1"</code>) in the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">blocks</code> array refer to the trial objects defined in your <button onClick={() => setActiveSection('trial')} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Trial Schema (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli.jsonl</code>)</button> file.
                </p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                  <code className="text-sm text-gray-800 dark:text-gray-200">{`{
  "experimentName": "Epistemic Language Understanding",
  "description": "Participants observe short animations and answer questions about the agent's goals and beliefs.",
  "paperDOI": "https://doi.org/10.1111/example.doi.12345",
  "taskType": [
    "Social Cognition",
    "Theory of Mind"
  ],
  "responseType": [
    "multi-choice",
    "single-slider"
  ],
  "contributors": [
    "Jane Doe",
    "John Smith"
  ],
  "experimentFlow": {
    "blocks": [
      [ "trial_1_1", "trial_1_2", "trial_1_3" ],
      [ "trial_2_1", "trial_2_2", "trial_2_3", "trial_2_4" ]
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

                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This document details the JSON schema for defining individual experimental trials. In the directory structure, this file is named <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli.jsonl</code>.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Each JSON object represents one &quot;trial&quot; which presents a stimulus (like an image or video) and then asks the user one or more questions about it. The <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli.jsonl</code> file contains one JSON object per line.
                </p>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white" id="top-level-fields">
                  Top-Level Fields (Single Trial)
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The root object of a single trial contains the following key properties:
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
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli_id</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">A unique identifier for this specific trial or stimulus (e.g., &quot;trial_005&quot;). This ID is used in the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">config.json</code> file.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">input_type</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Specifies the type of media to be presented. Common values include &quot;img&quot;, &quot;video&quot;, or &quot;text&quot;.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">media_url</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Strings</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">An array containing one or more paths to the media files (relative to the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">assets/</code> folder). Even if there is only one item, it should be in an array.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">commentary</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">An optional field for any text that should be displayed alongside or before the stimulus. Can be left empty (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">&quot;&quot;</code>).</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">queries</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Objects</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">This is the most important part. It's an array where each object represents a single question or prompt for the user. See <strong><a href="#queries" className="text-blue-600 dark:text-blue-400 hover:underline">the Queries section</a></strong> below for details.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">delay</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Number</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Optional. If specified, delays the display of the queries by N milliseconds after the stimulus is shown. Useful for controlling pacing in experiments.</td>
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

                <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-900 dark:text-white">Live Demo of Full Trial</h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-blue-500/30 dark:shadow-[0_0_20px_rgba(59,130,246,0.1)] mb-8">
                  <ThemeImage
                    lightSrc="https://placehold.co/600x400/e2e8f0/334155?text=Example+Stimulus+Image"
                    darkSrc="https://placehold.co/600x400/1e293b/e2e8f0?text=Example+Stimulus+Image"
                    alt="Example Stimulus"
                    className="w-full max-w-lg mx-auto rounded-lg shadow-md mb-4"
                  />
                  <p className="text-base text-gray-700 dark:text-gray-300 italic text-center mb-6">
                    Observe the agent's action in the image above.
                  </p>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                    <div className="mb-6">
                      <p className="font-medium mb-3 text-gray-900 dark:text-white">
                        What is the agent's primary goal?<span className="text-red-500">*</span>
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input
                            type="radio"
                            name="agent-goal-demo"
                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                          />
                          <span className="ml-3 text-gray-700 dark:text-gray-300">Reaching the red box</span>
                        </label>
                        <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input
                            type="radio"
                            name="agent-goal-demo"
                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                          />
                          <span className="ml-3 text-gray-700 dark:text-gray-300">Reaching the blue box</span>
                        </label>
                        <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input
                            type="radio"
                            name="agent-goal-demo"
                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                          />
                          <span className="ml-3 text-gray-700 dark:text-gray-300">Looking for a key</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-3 text-gray-900 dark:text-white">
                        How confident are you in your answer?<span className="text-red-500">*</span>: <span className="font-semibold" id="trial-slider-value">50</span>
                      </p>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="50"
                        onChange={(e) => {
                          const valueEl = document.getElementById('trial-slider-value');
                          if (valueEl) valueEl.textContent = e.target.value;
                        }}
                        className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>Not at all confident</span>
                        <span>Completely confident</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white" id="queries">
                  Query Object Schema
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">queries</code> array contains objects that define each question. All query objects share these common fields:
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
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The question text presented to the user (e.g., &quot;What is the agent's goal?&quot;).</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">type</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The type of response widget to display. See <strong><a href="#query-types" className="text-blue-600 dark:text-blue-400 hover:underline">the Query Types section</a></strong> for options.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">tag</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">A unique, computer-friendly key for this query (e.g., &quot;agent_goal&quot;). Used to store data.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">option</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Strings</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">A list of choices. Used for <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-choice</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-select</code>, and <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-slider</code>.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">randomize_order</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Boolean</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">If <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">true</code>, the order of items in the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">option</code> array will be shuffled for each participant.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">slider_config</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Object</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Required <em>only</em> if <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">type</code> is &quot;single-slider&quot; or &quot;multi-slider&quot;. See <strong><a href="#slider-config" className="text-blue-600 dark:text-blue-400 hover:underline">the Slider Config section</a></strong>.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">sampling_size</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Number</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Optional. Applies <em>only</em> to <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-slider</code>. If specified, only a random subset of <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">option</code> items (of size <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">sampling_size</code>) will be shown to each participant. Used for reducing cognitive load when there are many statements to rate.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">required</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Boolean</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Optional. If <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">true</code>, the user must provide a response to this query before proceeding. Default is <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">false</code> if not specified.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">answer</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Number</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Optional. The 0-based index of the correct option in the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">option</code> array. Used for providing feedback in comprehension quizzes or test trials.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white" id="query-types">Query Types (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">type</code>)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  This section details the different response widgets available.
                </p>

                <div className="space-y-10 mb-8">
                  {/* multi-choice */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/5 dark:to-purple-900/5">
                    <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">3.2.1.1. multi-choice</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">Presents a list of radio buttons from the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">option</code> array. The user can select only one.</p>
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
// Data would be saved as: "capital_choice": { "idx": 2, "option_text": "Paris" }`}</code>
                    </pre>
                    <h5 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Live Demo:</h5>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-3 border border-gray-200 dark:border-gray-700">
                      <p className="font-medium mb-3 text-gray-900 dark:text-white">What is the capital of France?<span className="text-red-500">*</span></p>
                      <div className="space-y-2">
                        <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input type="radio" name="capital-choice-demo" className="w-5 h-5 text-blue-600" />
                          <span className="ml-2 text-gray-700 dark:text-gray-300">London</span>
                        </label>
                        <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input type="radio" name="capital-choice-demo" className="w-5 h-5 text-blue-600" />
                          <span className="ml-2 text-gray-700 dark:text-gray-300">Berlin</span>
                        </label>
                        <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input type="radio" name="capital-choice-demo" className="w-5 h-5 text-blue-600" />
                          <span className="ml-2 text-gray-700 dark:text-gray-300">Paris</span>
                        </label>
                        <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input type="radio" name="capital-choice-demo" className="w-5 h-5 text-blue-600" />
                          <span className="ml-2 text-gray-700 dark:text-gray-300">Madrid</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* multi-select */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-purple-900/5 dark:to-pink-900/5">
                    <h4 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">3.2.1.2. multi-select</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">Presents a list of checkboxes from the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">option</code> array. The user can select one or more.</p>
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
                    <h4 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">3.2.1.3. single-slider</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">Presents a single slider. Requires <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">slider_config</code>. The <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">option</code> field is not used.</p>
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
// Data would be saved as: "confidence_rating": 78`}</code>
                    </pre>
                    <h5 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Live Demo:</h5>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-3 border border-gray-200 dark:border-gray-700">
                      <p className="font-medium mb-3 text-gray-900 dark:text-white">How confident are you?<span className="text-red-500">*</span>: <span id="single-slider-demo-val" className="font-semibold">50</span></p>
                      <div className="relative pb-8">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="50"
                          className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          onChange={(e) => {
                            const val = document.getElementById('single-slider-demo-val');
                            if (val) val.textContent = e.target.value;
                          }}
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                          <span>0<br />Not at all</span>
                          <span>100<br />Completely</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* multi-slider */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-yellow-50/30 to-orange-50/30 dark:from-yellow-900/5 dark:to-orange-900/5">
                    <h4 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-3">3.2.1.4. multi-slider</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">Presents one slider for each item in the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">option</code> array. Requires <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">slider_config</code>. Optionally, you can use <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">sampling_size</code> to show only a random subset of options to reduce cognitive load.</p>
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

                    <h5 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Live Demo:</h5>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-3 border border-gray-200 dark:border-gray-700">
                      <p className="font-medium mb-4 text-gray-900 dark:text-white">Please rate how likely each of the following statements is to be true<span className="text-red-500">*</span></p>
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Statement 1: <span id="multi-slider-1-val" className="font-semibold">50</span></p>
                          <div className="relative pb-8">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              defaultValue="50"
                              className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
                              onChange={(e) => {
                                const val = document.getElementById('multi-slider-1-val');
                                if (val) val.textContent = e.target.value;
                              }}
                            />
                            <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                              <span>0<br />Extremely unlikely</span>
                              <span>50<br />Neutral</span>
                              <span>100<br />Extremely likely</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Statement 2: <span id="multi-slider-2-val" className="font-semibold">50</span></p>
                          <div className="relative pb-8">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              defaultValue="50"
                              className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
                              onChange={(e) => {
                                const val = document.getElementById('multi-slider-2-val');
                                if (val) val.textContent = e.target.value;
                              }}
                            />
                            <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                              <span>0<br />Extremely unlikely</span>
                              <span>50<br />Neutral</span>
                              <span>100<br />Extremely likely</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Statement 3: <span id="multi-slider-3-val" className="font-semibold">50</span></p>
                          <div className="relative pb-8">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              defaultValue="50"
                              className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
                              onChange={(e) => {
                                const val = document.getElementById('multi-slider-3-val');
                                if (val) val.textContent = e.target.value;
                              }}
                            />
                            <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                              <span>0<br />Extremely unlikely</span>
                              <span>50<br />Neutral</span>
                              <span>100<br />Extremely likely</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* textbox */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-pink-50/30 to-red-50/30 dark:from-pink-900/5 dark:to-red-900/5">
                    <h4 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-3">3.2.1.5. textbox</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">Provides a free-response text area for the user to type in an answer. The <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">option</code> field is not used.</p>
                    <h5 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">JSON Example:</h5>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700 mb-3">
                      <code className="text-xs text-gray-800 dark:text-gray-200">{`{
  "prompt": "Please describe the agent's behavior.",
  "type": "textbox",
  "tag": "agent_description",
  "required": true
}
// Data would be saved as: "agent_description": "The agent moved..."`}</code>
                    </pre>
                    <h5 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Live Demo:</h5>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-3 border border-gray-200 dark:border-gray-700">
                      <label htmlFor="textbox-demo" className="font-medium mb-3 block text-gray-900 dark:text-white">
                        Please describe the agent's behavior.<span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="textbox-demo"
                        rows={3}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type your response here..."
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-900 dark:text-white" id="slider-config">3.2.2. Slider Config (<code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">slider_config</code>)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This object is required for <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">single-slider</code> and <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">multi-slider</code> types.
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
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The minimum value of the slider (e.g., 0).</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">max</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Number</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The maximum value of the slider (e.g., 100).</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">default_value</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Number</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The value where the slider handle starts.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">labels</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Objects</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">An array of label objects to display under the slider. See table below.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">show_label_values</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Boolean</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">If <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">true</code>, displays the numeric value (from <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">value</code>) alongside the text (from <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">label</code>).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-gray-700 dark:text-gray-300 my-4 leading-relaxed">
                  Each object in the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">labels</code> array has the following structure:
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
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">value</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Number</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The numeric position on the slider where this label should appear.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">label</code></td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The text to display at that position (e.g., &quot;Neutral&quot;, &quot;Strongly Agree&quot;).</td>
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

                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">instruction</code></h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">This is the most common Module. It displays a page of text and/or images to the participant.</p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Field</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800">
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">type</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Must be <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">&quot;instruction&quot;</code>.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">text</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The main body of text for the page. Can contain simple HTML tags like <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">&lt;p&gt;</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">&lt;strong&gt;</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">&lt;ul&gt;</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">&lt;li&gt;</code>.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">media_url</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Strings</td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">(Optional) An array of image/video paths to display, identical to the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">media_url</code> in <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli.jsonl</code>.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">test_trial</code></h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">This Module displays a fully functional trial (a stimulus and queries) from <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli.jsonl</code>. This allows participants to practice the task.</p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Field</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800">
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">type</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Must be <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">&quot;test_trial&quot;</code>.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli_id</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli_id</code> of the trial from <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">stimuli.jsonl</code> to display.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">feedback</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">(Optional) A text block to show after the user clicks &quot;Submit&quot;, e.g., &quot;The correct answer for this practice trial is X.&quot;</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">comprehension_quiz</code></h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">This Module presents one or more questions (identical to the <button onClick={() => { setActiveSection('trial'); setTimeout(() => document.getElementById('queries')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Query Object</button> format) to check the participant&apos;s understanding. It provides immediate feedback.</p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Field</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800">
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">type</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Must be <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">&quot;comprehension_quiz&quot;</code>.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">text</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">String</td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">(Optional) Introductory text to display above the questions.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">queries</code></td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Array of Objects</td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">An array of <button onClick={() => { setActiveSection('trial'); setTimeout(() => document.getElementById('queries')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Query Objects</button> (as defined in <button onClick={() => { setActiveSection('trial'); setTimeout(() => document.getElementById('queries')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">the Queries section</button>). These are the quiz questions. See note below.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed"><strong>Note on Quiz Queries:</strong> Queries within a <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">comprehension_quiz</code> (usually <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-choice</code>) <strong>must</strong> include an <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">answer</code> field to provide real-time feedback to the user. The <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">answer</code> field is defined in the <button onClick={() => { setActiveSection('trial'); setTimeout(() => document.getElementById('queries')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Trial Schema</button>.</p>
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
  "image": "assets/stimuli/demo_1.gif",
  "commentary": "Observe the agent's action in the image above.<br><br>If more than one gem seems likely, you can select all likely gems. Remember that some keys might be hidden among the boxes.",
  "queries": [
    {
      "prompt": "What is the agent's primary goal?",
      "type": "multi-choice",
      "options": ["Reaching the red box", "Reaching the blue box", "Looking for a key"],
      "required": true
    }
  ],
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

                <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-900 dark:text-white">Live Demo of Instruction Sequence</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Below is a simulation of how the sequence from the example JSON above would be rendered to the participant, one Module at a time. <strong>Click the options in Module 4 to see the feedback.</strong>
                </p>

                <div className="space-y-6">
                  {/* Module 1: Instruction */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-900/30">
                    <span className="inline-block px-3 py-1 bg-blue-600 dark:bg-blue-500 text-white text-xs font-semibold rounded-full mb-4">
                      Module 1 of 4: Instruction
                    </span>
                    <div className="text-base text-gray-700 dark:text-gray-300 space-y-3">
                      <p>Thank you for participating. In this task, you will observe an agent (a blue circle) move in a simple environment.</p>
                      <p><strong>Your goal is to determine what the agent wants.</strong></p>
                      <p>Please pay close attention to its behavior.</p>
                    </div>
                  </div>

                  {/* Module 2: Instruction with Image */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl p-6 border border-purple-100 dark:border-purple-500/30 dark:shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                    <span className="inline-block px-3 py-1 bg-purple-600 dark:bg-purple-500 text-white text-xs font-semibold rounded-full mb-4">
                      Module 2 of 4: Instruction
                    </span>
                    <div className="text-base text-gray-700 dark:text-gray-300">
                      <p className="mb-4">You will see a scene like the one below. The blue circle is the agent. The red and blue boxes are potential goals. Your task is to judge which goal the agent wants after observing its movement.</p>
                      <ThemeImage
                        lightSrc="https://placehold.co/600x400/e2e8f0/334155?text=Example+Scene"
                        darkSrc="https://placehold.co/600x400/1e293b/e2e8f0?text=Example+Scene"
                        alt="Example Scene"
                        className="w-full max-w-lg mx-auto rounded-lg shadow-md my-4"
                      />
                    </div>
                  </div>

                  {/* Module 3: Practice Trial */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-xl p-6 border border-green-100 dark:border-green-500/30 dark:shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                    <span className="inline-block px-3 py-1 bg-green-600 dark:bg-green-500 text-white text-xs font-semibold rounded-full mb-4">
                      Module 3 of 4: Practice Trial
                    </span>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-4 dark:border dark:border-gray-700/50">
                      <ThemeImage
                        lightSrc="https://placehold.co/600x400/e2e8f0/334155?text=Example+Stimulus+Image"
                        darkSrc="https://placehold.co/600x400/1e293b/e2e8f0?text=Example+Stimulus+Image"
                        alt="Example Stimulus"
                        className="w-full max-w-lg mx-auto rounded-lg shadow-md mb-4"
                      />
                      <p className="text-base text-gray-700 dark:text-gray-300 italic text-center mb-4">
                        Observe the agent's action in the image above.
                      </p>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="mb-4">
                          <p className="font-medium mb-2 text-gray-900 dark:text-white">What is the agent's primary goal?</p>
                          <div className="space-y-2">
                            <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                              <input type="radio" name="practice-goal" className="w-4 h-4" />
                              <span className="ml-2 text-gray-700 dark:text-gray-300">Reaching the red box</span>
                            </label>
                            <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                              <input type="radio" name="practice-goal" className="w-4 h-4" />
                              <span className="ml-2 text-gray-700 dark:text-gray-300">Reaching the blue box</span>
                            </label>
                            <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                              <input type="radio" name="practice-goal" className="w-4 h-4" />
                              <span className="ml-2 text-gray-700 dark:text-gray-300">Looking for a key</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium mb-2 text-gray-900 dark:text-white">How confident are you in your answer?: <span className="font-semibold">50</span></p>
                          <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-4 rounded-lg text-sm">
                      <strong className="text-green-800 dark:text-green-300">Feedback:</strong>
                      <span className="text-green-700 dark:text-green-400"> In this example, the player is going for the red box!</span>
                    </div>
                  </div>

                  {/* Module 4: Comprehension Quiz */}
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/10 dark:to-yellow-900/10 rounded-xl p-6 border border-orange-100 dark:border-orange-900/30">
                    <span className="inline-block px-3 py-1 bg-orange-600 dark:bg-orange-500 text-white text-xs font-semibold rounded-full mb-4">
                      Module 4 of 4: Comprehension Check
                    </span>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">Please answer the following questions.</p>

                    <div className="space-y-4">
                      {/* Question 1 */}
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="font-medium mb-3 text-gray-900 dark:text-white">What is your main task in this experiment?</p>
                        <div className="space-y-2">
                          <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                            <input
                              type="radio"
                              name="quiz_q1"
                              value="0"
                              onChange={(e) => {
                                const feedback = document.getElementById('quiz_q1-feedback');
                                if (feedback) {
                                  if (e.target.value === '1') {
                                    feedback.textContent = 'Correct!';
                                    feedback.className = 'mt-3 text-sm font-medium text-green-600 dark:text-green-400';
                                  } else {
                                    feedback.textContent = 'Incorrect. Please review the instructions and try again.';
                                    feedback.className = 'mt-3 text-sm font-medium text-red-600 dark:text-red-400';
                                  }
                                }
                              }}
                              className="w-4 h-4"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">To click the boxes as fast as possible.</span>
                          </label>
                          <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                            <input
                              type="radio"
                              name="quiz_q1"
                              value="1"
                              onChange={(e) => {
                                const feedback = document.getElementById('quiz_q1-feedback');
                                if (feedback) {
                                  if (e.target.value === '1') {
                                    feedback.textContent = 'Correct!';
                                    feedback.className = 'mt-3 text-sm font-medium text-green-600 dark:text-green-400';
                                  } else {
                                    feedback.textContent = 'Incorrect. Please review the instructions and try again.';
                                    feedback.className = 'mt-3 text-sm font-medium text-red-600 dark:text-red-400';
                                  }
                                }
                              }}
                              className="w-4 h-4"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">To determine the agent's goal.</span>
                          </label>
                          <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                            <input
                              type="radio"
                              name="quiz_q1"
                              value="2"
                              onChange={(e) => {
                                const feedback = document.getElementById('quiz_q1-feedback');
                                if (feedback) {
                                  if (e.target.value === '1') {
                                    feedback.textContent = 'Correct!';
                                    feedback.className = 'mt-3 text-sm font-medium text-green-600 dark:text-green-400';
                                  } else {
                                    feedback.textContent = 'Incorrect. Please review the instructions and try again.';
                                    feedback.className = 'mt-3 text-sm font-medium text-red-600 dark:text-red-400';
                                  }
                                }
                              }}
                              className="w-4 h-4"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">To count the number of circles.</span>
                          </label>
                        </div>
                        <div id="quiz_q1-feedback" className="mt-3 text-sm font-medium"></div>
                      </div>

                      {/* Question 2 */}
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="font-medium mb-3 text-gray-900 dark:text-white">Is this a timed experiment?</p>
                        <div className="space-y-2">
                          <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                            <input
                              type="radio"
                              name="quiz_q2"
                              value="0"
                              onChange={(e) => {
                                const feedback = document.getElementById('quiz_q2-feedback');
                                if (feedback) {
                                  if (e.target.value === '1') {
                                    feedback.textContent = 'Correct!';
                                    feedback.className = 'mt-3 text-sm font-medium text-green-600 dark:text-green-400';
                                  } else {
                                    feedback.textContent = 'Incorrect. Please review the instructions and try again.';
                                    feedback.className = 'mt-3 text-sm font-medium text-red-600 dark:text-red-400';
                                  }
                                }
                              }}
                              className="w-4 h-4"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">Yes</span>
                          </label>
                          <label className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                            <input
                              type="radio"
                              name="quiz_q2"
                              value="1"
                              onChange={(e) => {
                                const feedback = document.getElementById('quiz_q2-feedback');
                                if (feedback) {
                                  if (e.target.value === '1') {
                                    feedback.textContent = 'Correct!';
                                    feedback.className = 'mt-3 text-sm font-medium text-green-600 dark:text-green-400';
                                  } else {
                                    feedback.textContent = 'Incorrect. Please review the instructions and try again.';
                                    feedback.className = 'mt-3 text-sm font-medium text-red-600 dark:text-red-400';
                                  }
                                }
                              }}
                              className="w-4 h-4"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">No</span>
                          </label>
                        </div>
                        <div id="quiz_q2-feedback" className="mt-3 text-sm font-medium"></div>
                      </div>
                    </div>
                  </div>
                </div>
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
                  Each <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli_id</code> object contains keys that <strong>must match the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">tag</code>s</strong> defined in the trial's queries (see <button onClick={() => { setActiveSection('trial'); setTimeout(() => document.getElementById('queries')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">the Queries section</button>). The value for each tag is an array, where each item in the array is the response from a single participant.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  For example, if there were 4 participants, each response array will contain 4 elements.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Data Type by Query Type</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The data type inside each participant's response array depends on the query <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">type</code> defined in <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli.jsonl</code> (see <button onClick={() => { setActiveSection('trial'); setTimeout(() => document.getElementById('queries')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">the Queries section</button>):
                </p>
                <div className="space-y-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">single-slider</code></h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">→ Array of <strong>Numbers</strong></p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Each element is the numeric value selected by one participant.</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Example:</p>
                    <code className="text-xs bg-white dark:bg-gray-800 px-3 py-1.5 rounded block">"goal_confidence": [95, 88, 70, 92]</code>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl p-5 border border-purple-100 dark:border-purple-900/30">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-choice</code></h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">→ Array of <strong>Objects</strong></p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Each object has <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">idx</code> (0-based index) and <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">option_text</code> (the selected option string).</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Example (2 participants):</p>
                    <code className="text-xs bg-white dark:bg-gray-800 px-3 py-1.5 rounded block">{`"agent_goal": [
  { "idx": 0, "option_text": "Reaching the red box" },
  { "idx": 1, "option_text": "Reaching the blue box" }
]`}</code>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-xl p-5 border border-green-100 dark:border-green-900/30">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-slider</code></h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">→ Array with a <strong>single Object</strong></p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">The object maps each option label (String) to an array of Numbers (the responses from all participants for that statement).</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Example (2 participants rating 2 statements):</p>
                    <code className="text-xs bg-white dark:bg-gray-800 px-3 py-1.5 rounded block">{`"statement_rating": [{
  "Statement 1": [80, 75],
  "Statement 2": [25, 30]
}]`}</code>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-xl p-5 border border-yellow-100 dark:border-yellow-900/30">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-select</code></h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">→ Array of <strong>Arrays of Numbers</strong></p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Each inner array is a one-hot encoding (0 or 1) of which options a participant selected. The length matches the number of options.</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Example (2 participants, 4 options):</p>
                    <code className="text-xs bg-white dark:bg-gray-800 px-3 py-1.5 rounded block">{`"cities": [
  [0, 1, 1, 0],  // Participant 1 selected options 2 and 3
  [1, 0, 0, 0]   // Participant 2 selected option 1
]`}</code>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-900/10 dark:to-red-900/10 rounded-xl p-5 border border-pink-100 dark:border-pink-900/30">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2"><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">textbox</code></h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">→ Array of <strong>Strings</strong></p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Each element is the free-text response entered by one participant.</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Example (2 participants):</p>
                    <code className="text-xs bg-white dark:bg-gray-800 px-3 py-1.5 rounded block">{`"strategy_description": [
  "The agent seemed to be looking for the red box.",
  "Unsure, but it moved towards the blue box first."
]`}</code>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Example: human_data_ind.json</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This example corresponds to the query tags defined in the <button onClick={() => setActiveSection('trial')} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Trial Schema</button> examples, assuming data from 2 participants. The keys <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">"trial_1_1"</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">"agent_goal"</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">"goal_confidence"</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">"statement_rating"</code>, and <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">"strategy_description"</code> are all defined in the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli.jsonl</code> file.
                </p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700 mb-10">
                  <code className="text-sm text-gray-800 dark:text-gray-200">{`{
  "trial_1_1": {
    "agent_goal": {
      "agent_goal_1": [1, 2]
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

                <h2 className="text-3xl font-semibold mt-10 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  human_data_mean.json (Mean Data)
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  This file provides a convenient summary of the data, aggregated across all participants. The structure mirrors <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">human_data_ind.json</code>, but replaces the arrays of individual responses with aggregated statistics.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Aggregation Rules by Query Type</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The structure for each <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli_id</code> in <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">human_data_mean.json</code> varies depending on the query type:
                </p>
                <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">single-slider</code></strong> (e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">goal_confidence</code>): A single <strong>Number</strong> representing the mean of all participant values.</li>
                  <li><strong><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-choice</code></strong> (e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">agent_goal</code>): An <strong>Object</strong> where keys are <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">tag_N</code> (N = 1-based option index), and values are counts/proportions of participants who selected that option.</li>
                  <li><strong><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-slider</code></strong> (e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">statement_rating</code>): An <strong>Object</strong> where keys are <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">tag_N</code> (N = 1-based statement index), and each value is a <strong>Number</strong> (the mean rating for that statement).</li>
                  <li><strong><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">textbox</code></strong> and <strong><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">multi-select</code></strong>: Aggregations are optional and task-specific (e.g., keyword counts, selection frequencies). Not shown in the example below.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Example: human_data_mean.json</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This example shows the aggregated data for the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">human_data_ind.json</code> example above. The keys are derived from the <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">tag</code>s in <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">stimuli.jsonl</code> (e.g., <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">agent_goal</code> becomes <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">agent_goal_1</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">agent_goal_2</code>; <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">statement_rating</code> becomes <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">statement_rating_1</code>, <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">statement_rating_2</code>).
                </p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                  <code className="text-sm text-gray-800 dark:text-gray-200">{`{
  "trial_1_1": {
    "agent_goal": [
      [1, 2],
      [0, 1, 2]
    ],
    "goal_confidence": [
      95,
      88
    ]
  },
  "trial_1_2": {
    "statement_rating": [
      { "statement_rating_1": [80, 70], "statement_rating_2": [25, 35] }
    ],
    "strategy_description": [
      "The agent seemed to be looking for the red box.",
      "Unsure, but it moved towards the blue box first."
    ]
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

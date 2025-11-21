import { loadStudyScenarios } from '@/studies/loader';
import { scenarios as Olympics2025exp2Scenarios } from '@/studies/Olympics2025-exp2/scenarios';
import { scenarios as Olympics2025exp3Scenarios } from '@/studies/Olympics2025-exp3/scenarios';
import { getStudyItem, setStudyItem } from '@/utils/studyStorage';

/**
 * Selects a random subset of scenarios based on the config settings.
 * If a previous selection is found in localStorage, it returns that instead.
 * Now supports both file-based studies and in-memory test studies.
 *
 * @param studySlug The study slug (required for proper study isolation)
 * @param questionsPerParticipant Number of questions per participant
 */
export async function getSelectedScenarios(studySlug: string, questionsPerParticipant?: number) {
  if (!studySlug) {
    throw new Error('studySlug is required for getSelectedScenarios to prevent cross-study contamination');
  }

  // Check if we already have a selection in study-scoped localStorage
  const existingSelection = getStudyItem(studySlug, 'selectedScenarios');

  if (existingSelection) {
    const parsed = JSON.parse(existingSelection);
    console.log("Using existing scenarios from localStorage:", parsed);
    return parsed;
  }

  // Load scenarios - use API if client-side, loader if server-side
  let scenarios;

  if (typeof window !== 'undefined') {
    // Client-side: fetch from API (works for both regular and test studies)
    try {
      const res = await fetch(`/api/studies/${studySlug}/data`);
      const data = await res.json();

      if (!data.success || !data.scenarios) {
        throw new Error(`Failed to load scenarios: ${data.error || 'Unknown error'}`);
      }

      scenarios = data.scenarios;
    } catch {
      throw new Error(`No scenarios found for study: ${studySlug}`);
    }
  } else {
    // Server-side: use loader directly
    scenarios = await loadStudyScenarios(studySlug);
  }

  if (!scenarios || scenarios.length === 0) {
    throw new Error(`No scenarios found for study: ${studySlug}`);
  }

  // Get the number of questions per participant
  const numToSelect = questionsPerParticipant
    ? Math.min(questionsPerParticipant, scenarios.length)
    : scenarios.length;

  console.log(`Selecting ${numToSelect} scenarios from ${scenarios.length} available scenarios`);

  // Create a copy of the scenarios array
  const scenarioPool = [...scenarios];
  const selectedScenarios = [];

  // Fisher-Yates shuffle algorithm and select the first 'numToSelect' items
  for (let i = 0; i < numToSelect; i++) {
    const randomIndex = Math.floor(Math.random() * (scenarioPool.length - i));
    const scenario = {...scenarioPool[randomIndex]};

    // Important: Keep original ID as a reference
    scenario.original_scenario_id = scenario.scenario_id;

    // Assign new sequential ID based on position (1-based index)
    scenario.scenario_id = i + 1;

    // Swap the selected item to the end to avoid selecting it again
    [scenarioPool[randomIndex], scenarioPool[scenarioPool.length - 1 - i]] =
      [scenarioPool[scenarioPool.length - 1 - i], scenarioPool[randomIndex]];

    selectedScenarios.push(scenario);
  }

  console.log("Selected and remapped scenarios:", selectedScenarios);

  // Save the selection to study-scoped localStorage
  setStudyItem(studySlug, 'selectedScenarios', JSON.stringify(selectedScenarios));

  return selectedScenarios;
}

// Legacy export for backward compatibility
export { getSelectedScenarios as default }; 
import { scenarios as probGymScenarios } from '@/studies/prob-gym/scenarios';
import { scenarios as legacyScenarios } from '@/data/scenarios';

/**
 * Selects a random subset of scenarios based on the config settings.
 * If a previous selection is found in localStorage, it returns that instead.
 *
 * @param studySlug The study slug (optional for backward compatibility)
 * @param questionsPerParticipant Number of questions per participant
 */
export function getSelectedScenarios(studySlug?: string, questionsPerParticipant?: number) {
  // Use study-scoped localStorage key if studySlug is provided
  const storageKey = studySlug ? `${studySlug}_selectedScenarios` : 'selectedScenarios';

  // Check if we already have a selection in localStorage
  const existingSelection = localStorage.getItem(storageKey);

  if (existingSelection) {
    const parsed = JSON.parse(existingSelection);
    console.log("Using existing scenarios from localStorage:", parsed);
    return parsed;
  }

  // Select the correct scenario set based on studySlug
  let scenarios;
  if (studySlug === 'prob-gym') {
    scenarios = probGymScenarios;
  } else {
    // Fallback to legacy scenarios for backward compatibility
    scenarios = legacyScenarios;
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

  // Save the selection to localStorage
  localStorage.setItem(storageKey, JSON.stringify(selectedScenarios));

  return selectedScenarios;
}

// Legacy export for backward compatibility
export { getSelectedScenarios as default }; 
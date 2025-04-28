import { scenarios } from '@/data/scenarios';
import config from '@/data/config.json';

/**
 * Selects a random subset of scenarios based on the config settings.
 * If a previous selection is found in localStorage, it returns that instead.
 */
export function getSelectedScenarios() {
  // Check if we already have a selection in localStorage
  const existingSelection = localStorage.getItem('selectedScenarios');
  
  if (existingSelection) {
    const parsed = JSON.parse(existingSelection);
    console.log("Using existing scenarios from localStorage:", parsed);
    return parsed;
  }
  
  // Get the number of questions per participant from config
  const questionsPerParticipant = config.study.questionsPerParticipant || scenarios.length;
  
  // Limit to the number of available scenarios if necessary
  const numToSelect = Math.min(questionsPerParticipant, scenarios.length);
  
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
  localStorage.setItem('selectedScenarios', JSON.stringify(selectedScenarios));
  
  return selectedScenarios;
} 
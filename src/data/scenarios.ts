import { StudyConfig } from '@/types/study';

export const scenarios: StudyConfig[] = [
{
  "task_name": "preference_inference_vegetables_1",
  "scenario_id": 1,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has only one bundle of vegetables to choose from. This is the bundle: \n\n1. an onion\n\nAlex purchased bundle 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_2",
  "scenario_id": 2,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has only one bundle of vegetables to choose from. This is the bundle: \n\n1. an onion, a radish\n\nAlex purchased bundle 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_3",
  "scenario_id": 3,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 2 bundles of vegetables to choose from. These are the bundles: \n\n1. a cucumber\n2. a tomato\n\nAlex purchased bundle 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_4",
  "scenario_id": 4,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has only one bundle of vegetables to choose from. This is the bundle: \n\n1. a tomato, a cucumber, a radish\n\nAlex purchased bundle 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_5",
  "scenario_id": 5,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 2 bundles of vegetables to choose from. These are the bundles: \n\n1. an onion, a cucumber\n2. a radish, an onion\n\nAlex purchased bundle 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_6",
  "scenario_id": 6,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 2 bundles of vegetables to choose from. These are the bundles: \n\n1. a tomato, a cucumber\n2. an onion\n\nAlex purchased bundle 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_7",
  "scenario_id": 7,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 2 bundles of vegetables to choose from. These are the bundles: \n\n1. a tomato, a cucumber\n2. a tomato, an onion\n\nAlex purchased bundle 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_8",
  "scenario_id": 8,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 3 bundles of vegetables to choose from. These are the bundles: \n\n1. an onion\n2. a cucumber\n3. a tomato\n\nAlex purchased bundle 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_9",
  "scenario_id": 9,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 2 bundles of vegetables to choose from. These are the bundles: \n\n1. an onion\n2. a tomato, a radish\n\nAlex purchased bundle 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_10",
  "scenario_id": 10,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has only one bundle of vegetables to choose from. This is the bundle: \n\n1. a tomato, a radish, an onion, a cucumber\n\nAlex purchased bundle 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_11",
  "scenario_id": 11,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 2 bundles of vegetables to choose from. These are the bundles: \n\n1. a cucumber, a tomato, an onion\n2. a cucumber, a tomato, a radish\n\nAlex purchased bundle 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_12",
  "scenario_id": 12,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 3 bundles of vegetables to choose from. These are the bundles: \n\n1. a radish, an onion\n2. a radish, a tomato\n3. a radish, a cucumber\n\nAlex purchased bundle 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_13",
  "scenario_id": 13,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 3 bundles of vegetables to choose from. These are the bundles: \n\n1. a tomato\n2. an onion, a cucumber\n3. a cucumber, a radish\n\nAlex purchased bundle 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_14",
  "scenario_id": 14,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 2 bundles of vegetables to choose from. These are the bundles: \n\n1. a tomato\n2. a radish, a cucumber, an onion\n\nAlex purchased bundle 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_15",
  "scenario_id": 15,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 3 bundles of vegetables to choose from. These are the bundles: \n\n1. a cucumber\n2. a radish\n3. a tomato, an onion\n\nAlex purchased bundle 3.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_16",
  "scenario_id": 16,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 3 bundles of vegetables to choose from. These are the bundles: \n\n1. a cucumber, a tomato\n2. an onion, a radish\n3. a tomato, a radish\n\nAlex purchased bundle 3.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_17",
  "scenario_id": 17,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 2 bundles of vegetables to choose from. These are the bundles: \n\n1. an onion, a tomato\n2. a radish, a cucumber\n\nAlex purchased bundle 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_18",
  "scenario_id": 18,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 2 bundles of vegetables to choose from. These are the bundles: \n\n1. an onion, a radish, a tomato\n2. a cucumber, a tomato, a radish\n\nAlex purchased bundle 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_19",
  "scenario_id": 19,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 3 bundles of vegetables to choose from. These are the bundles: \n\n1. a radish, a cucumber\n2. a cucumber, an onion\n3. a tomato, a cucumber\n\nAlex purchased bundle 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_20",
  "scenario_id": 20,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 4 bundles of vegetables to choose from. These are the bundles: \n\n1. a radish\n2. a cucumber\n3. a tomato\n4. an onion\n\nAlex purchased bundle 3.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_21",
  "scenario_id": 21,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 3 bundles of vegetables to choose from. These are the bundles: \n\n1. an onion, a radish\n2. a tomato\n3. a cucumber\n\nAlex purchased bundle 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vegetables_22",
  "scenario_id": 22,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Alex is choosing from bundled packs of vegetables at the supermarket. All bundles are the same price. Alex currently has 2 bundles of vegetables to choose from. These are the bundles: \n\n1. a radish, a tomato, an onion\n2. a cucumber\n\nAlex purchased bundle 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vegetable items, which of the following do you think Alex likes the most? Please respond with a probability distribution.",
  "options": [
    "a cucumber",
    "a tomato",
    "an onion",
    "a radish"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_1",
  "scenario_id": 1,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers only one vacation package to choose from. This is the package: \n\n1. a hot air balloon ride\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_2",
  "scenario_id": 2,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers only one vacation package to choose from. This is the package: \n\n1. a meal at a fine dining restaurant, a hot air balloon ride\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_3",
  "scenario_id": 3,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 2 vacation packages to choose from. These are the packages: \n\n1. a guided tour of a historical site\n2. a hot air balloon ride\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_4",
  "scenario_id": 4,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers only one vacation package to choose from. This is the package: \n\n1. a guided tour of a historical site, a hot air balloon ride, a meal at a fine dining restaurant\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_5",
  "scenario_id": 5,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 2 vacation packages to choose from. These are the packages: \n\n1. a guided tour of a historical site, a hot air balloon ride\n2. a meal at a fine dining restaurant, a guided tour of a historical site\n\nBenny selected package 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_6",
  "scenario_id": 6,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 2 vacation packages to choose from. These are the packages: \n\n1. a hot air balloon ride\n2. a meal at a fine dining restaurant, a skiing lesson\n\nBenny selected package 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_7",
  "scenario_id": 7,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 2 vacation packages to choose from. These are the packages: \n\n1. a guided tour of a historical site, a skiing lesson\n2. a skiing lesson, a meal at a fine dining restaurant\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_8",
  "scenario_id": 8,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 3 vacation packages to choose from. These are the packages: \n\n1. a hot air balloon ride\n2. a meal at a fine dining restaurant\n3. a guided tour of a historical site\n\nBenny selected package 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_9",
  "scenario_id": 9,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 2 vacation packages to choose from. These are the packages: \n\n1. a meal at a fine dining restaurant, a hot air balloon ride\n2. a guided tour of a historical site\n\nBenny selected package 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_10",
  "scenario_id": 10,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers only one vacation package to choose from. This is the package: \n\n1. a hot air balloon ride, a meal at a fine dining restaurant, a guided tour of a historical site, a skiing lesson\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_11",
  "scenario_id": 11,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 2 vacation packages to choose from. These are the packages: \n\n1. a guided tour of a historical site, a meal at a fine dining restaurant, a skiing lesson\n2. a meal at a fine dining restaurant, a hot air balloon ride, a guided tour of a historical site\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_12",
  "scenario_id": 12,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 3 vacation packages to choose from. These are the packages: \n\n1. a meal at a fine dining restaurant, a guided tour of a historical site\n2. a skiing lesson, a guided tour of a historical site\n3. a hot air balloon ride, a guided tour of a historical site\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_13",
  "scenario_id": 13,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 3 vacation packages to choose from. These are the packages: \n\n1. a skiing lesson, a hot air balloon ride\n2. a hot air balloon ride, a meal at a fine dining restaurant\n3. a guided tour of a historical site\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_14",
  "scenario_id": 14,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 2 vacation packages to choose from. These are the packages: \n\n1. a skiing lesson, a meal at a fine dining restaurant, a guided tour of a historical site\n2. a hot air balloon ride\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_15",
  "scenario_id": 15,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 3 vacation packages to choose from. These are the packages: \n\n1. a hot air balloon ride\n2. a meal at a fine dining restaurant, a guided tour of a historical site\n3. a skiing lesson\n\nBenny selected package 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_16",
  "scenario_id": 16,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 3 vacation packages to choose from. These are the packages: \n\n1. a hot air balloon ride, a skiing lesson\n2. a hot air balloon ride, a meal at a fine dining restaurant\n3. a guided tour of a historical site, a meal at a fine dining restaurant\n\nBenny selected package 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_17",
  "scenario_id": 17,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 2 vacation packages to choose from. These are the packages: \n\n1. a hot air balloon ride, a skiing lesson\n2. a guided tour of a historical site, a meal at a fine dining restaurant\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_18",
  "scenario_id": 18,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 2 vacation packages to choose from. These are the packages: \n\n1. a hot air balloon ride, a skiing lesson, a meal at a fine dining restaurant\n2. a guided tour of a historical site, a hot air balloon ride, a meal at a fine dining restaurant\n\nBenny selected package 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_19",
  "scenario_id": 19,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 3 vacation packages to choose from. These are the packages: \n\n1. a skiing lesson, a guided tour of a historical site\n2. a skiing lesson, a meal at a fine dining restaurant\n3. a hot air balloon ride, a skiing lesson\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_20",
  "scenario_id": 20,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 4 vacation packages to choose from. These are the packages: \n\n1. a guided tour of a historical site\n2. a hot air balloon ride\n3. a skiing lesson\n4. a meal at a fine dining restaurant\n\nBenny selected package 2.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_21",
  "scenario_id": 21,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 3 vacation packages to choose from. These are the packages: \n\n1. a hot air balloon ride, a meal at a fine dining restaurant\n2. a skiing lesson\n3. a guided tour of a historical site\n\nBenny selected package 3.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
},
{
  "task_name": "preference_inference_vacation_22",
  "scenario_id": 22,
  "input_type": "text",
  "text_sections": [
    {
      "title": "Scenario",
      "content": "Benny got a free all-inclusive vacation package from a travel agency! He is choosing from the vacation packages offered. He does not have to pay for any of the activities in the package. The travel agency currently offers 2 vacation packages to choose from. These are the packages: \n\n1. a hot air balloon ride\n2. a guided tour of a historical site, a meal at a fine dining restaurant, a skiing lesson\n\nBenny selected package 1.",
      "isCollapsible": false
    }
  ],
  "commentary": "Variation tags: preference inference, choice observation",
  "question": "Based on this single observation, among the following vacation items, which of the following do you think Benny likes the most? Please respond with a probability distribution.",
  "options": [
    "a hot air balloon ride",
    "a guided tour of a historical site",
    "a skiing lesson",
    "a meal at a fine dining restaurant"
  ],
  "input_method": "histogram",
  "total_allocation": 10,
  "randomize_order": true,
  "discrete": false
}
]
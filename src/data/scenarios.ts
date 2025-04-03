import { StudyConfig } from '@/types/study';

export const scenarios: StudyConfig[] = [
  {
    task_name: "blocks_world",
    scenario_id: 1,
    input_type: "img",
    source_link: "/assets/blocks_world.png",
    commentary: "The ball is very heavy",
    question: "Which bucket is the ball most likely to fall into?",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    input_method: "histogram",
    total_allocation: 20
  },
  {
    task_name: "blocks_world",
    scenario_id: 2,
    input_type: "img",
    source_link: "/assets/blocks_world_2.png",
    commentary: "The blocks are unstable",
    question: "What is the probability distribution of the structure collapsing?",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    input_method: "number_line",
    total_allocation: 7
  },
  {
    task_name: "blocks_world",
    scenario_id: 3,
    input_type: "img",
    source_link: "/assets/blocks_world_3.png",
    commentary: "The structure will collapse",
    question: "How would you distribute the probability of the structure's stability?",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    input_method: "number_line",
    total_allocation: 1
  }
]; 

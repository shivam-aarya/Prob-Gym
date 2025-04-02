import { StudyConfig } from '@/types/study';

export const scenarios: StudyConfig[] = [
  {
    task_name: "blocks_world",
    scenario_id: 1,
    input_type: "img",
    source_link: "/assets/blocks_world.png",
    commentary: "The ball is very heavy",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    input_method: "histogram",
  },
  {
    task_name: "blocks_world",
    scenario_id: 2,
    input_type: "img",
    source_link: "/assets/blocks_world_2.png",
    commentary: "The blocks are unstable",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    input_method: "number_line",
    num_points: 4
  },
  {
    task_name: "blocks_world",
    scenario_id: 3,
    input_type: "img",
    source_link: "/assets/blocks_world_3.png",
    commentary: "The structure will collapse",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    input_method: "number_line",
    num_points: 4
  }
]; 

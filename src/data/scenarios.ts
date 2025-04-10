import { StudyConfig } from '@/types/study';

export const scenarios: StudyConfig[] = [
  {
    task_name: "plinko",
    scenario_id: 1,
    input_type: "img",
    source_link: "/assets/blocks_world.png",
    commentary: "The ball is very heavy",
    question: "The red Plinko ball is dropped from above. Which bin will it fall in? Please click the bin numbers 15 times to indicate the distribution of locations you think the ball will fall into if dropped 15 times.",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    input_method: "histogram",
    total_allocation: 15
  },
  {
    task_name: "tug_of_war",
    scenario_id: 2,
    input_type: "text",
    text_sections: [
      {
        title: "Background",
        content: `In this event, the athletes are competing in matches of tug-of-war. In each round, the team that wins the round depends on how hard the athletes collectively pull, based on their intrinsic strength modulated by other factors including how much effort they put in to that round.
Athletes compete either individually or as a team.
All matches take place on the same day.`,
        isCollapsible: true,
        isInitiallyExpanded: true
      },
      {
        title: "Match Results",
        content: `In the first match, Lane and Ollie beat Robin and Quinn.
In the second match, Lane and Ollie beat Drew and Casey.
In the third match, Lane and Ollie lost to Drew and Quinn.
In the fourth match, Lane and Ollie beat Robin and Drew.
In the fifth match, Lane and Ollie beat Casey and Quinn.`,
        isCollapsible: false
      }
    ],
    commentary: "Analyze the match results to determine team strengths",
    question: "What is the probability distribution of Lane and Ollie winning against Drew and Quinn in their next match?",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    input_method: "number_line",
    total_allocation: 7
  },
  {
    task_name: "blocks_fall",
    scenario_id: 3,
    input_type: "img",
    source_link: "/assets/scenario_3.png",
    commentary: "The yellow blocks are heavy and the red blocks are light",
    question: "There are some blocks on a table. If the table is bumped from the right, how many blocks will fall on the floor?",
    options: ["0", "1", "2", "3", "4"],
    input_method: "number_line",
    total_allocation: 1,
    discrete: true
  },
  {
    task_name: "test_video",
    scenario_id: 4,
    input_type: "video",
    source_link: "/assets/2025-03-04 19-38-04.mp4",
    commentary: "This is a test video scenario",
    question: "What do you observe in this video?",
    options: ["0", "1"],
    input_method: "number_line",
    total_allocation: 1,
  }
]; 

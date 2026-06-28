export type BiasCategory =
  | 'Money & Spending'
  | 'Relationships & People'
  | 'Decisions & Choices'
  | 'Work & Career'
  | 'Beliefs & Identity'
  | 'Memory & Perception';

export type Bias = {
  id: string;
  name: string;
  category: BiasCategory;
  shortDefinition: string;
  story: string;
  reflection: string;
  everydayTell: string;
};

export type Challenge = {
  id: string;
  scenario: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export const biases: Bias[] = [
  {
    id: 'sunk-cost',
    name: 'Sunk Cost Fallacy',
    category: 'Money & Spending',
    shortDefinition:
      'Continuing with something because of what you have already invested, even when the next step is not worth it.',
    story:
      'You are 90 minutes into a film you are not enjoying. Your partner asks if you want to switch to something else. You say no, because you have already invested this much time. But the 90 minutes are gone either way. The only question left is whether the next hour is better spent here or somewhere else.',
    reflection:
      'When was the last time you stuck with something mainly because you had already started?',
    everydayTell:
      'A sentence like "I have come this far" starts doing the thinking for you.',
  },
  {
    id: 'anchoring',
    name: 'Anchoring Bias',
    category: 'Money & Spending',
    shortDefinition:
      'Relying too heavily on the first number, idea, or impression you encounter.',
    story:
      'You open a laptop page and the first model is 1899. The next one is 1299. Suddenly 1299 feels reasonable, maybe even cheap. Nothing about your actual budget changed. Your brain just started measuring from the first number it saw.',
    reflection:
      'What number or first impression has been quietly setting the scale for a decision you are making?',
    everydayTell:
      'The first option becomes the ruler, even when it was never a good ruler.',
  },
  {
    id: 'confirmation',
    name: 'Confirmation Bias',
    category: 'Beliefs & Identity',
    shortDefinition:
      'Looking for, noticing, and trusting information that supports what you already believe.',
    story:
      'You are thinking about buying a Mac Mini. Without meaning to, you read three glowing reviews, watch two positive videos, and skip the complaint threads because they seem a bit dramatic. You call it research. Your brain calls it evidence collection for a verdict it already likes.',
    reflection:
      'Where are you gathering evidence, and where are you avoiding it?',
    everydayTell:
      'Search terms start sounding like arguments for the answer you want.',
  },
  {
    id: 'halo-effect',
    name: 'Halo Effect',
    category: 'Relationships & People',
    shortDefinition:
      'Letting one positive trait shape your whole impression of a person, product, or idea.',
    story:
      'Someone speaks calmly in a meeting. They sound thoughtful, polished, measured. Later, you realize you gave their idea more credit than it earned because the delivery felt credible. Your brain rounded one visible strength up into a general judgment.',
    reflection:
      'Who or what might you be overrating because one part of it looks impressive?',
    everydayTell:
      'Confidence, beauty, fluency, or status starts standing in for substance.',
  },
  {
    id: 'planning-fallacy',
    name: 'Planning Fallacy',
    category: 'Work & Career',
    shortDefinition:
      'Underestimating how long something will take, even when similar things have taken longer before.',
    story:
      'You tell yourself the deck will take an hour. It has never taken an hour. Last time it took an evening, three rewrites, and a late export. Still, this time feels different because you can picture the neat version, not the messy path to get there.',
    reflection:
      'What are you estimating from the ideal version instead of your actual history?',
    everydayTell:
      'The plan contains the work, but not the interruptions, ambiguity, or rework.',
  },
  {
    id: 'availability',
    name: 'Availability Heuristic',
    category: 'Memory & Perception',
    shortDefinition:
      'Judging how common or likely something is by how easily examples come to mind.',
    story:
      'After seeing two posts about burglaries, your street suddenly feels less safe. Nothing local has changed, but vivid examples are easier for your brain to retrieve than boring statistics. What comes to mind quickly starts to feel like what happens often.',
    reflection:
      'What recent story might be making something feel more likely than it is?',
    everydayTell:
      'A vivid example feels like a trend before you have checked the base rate.',
  },
  {
    id: 'status-quo',
    name: 'Status Quo Bias',
    category: 'Decisions & Choices',
    shortDefinition:
      'Preferring the current option because changing it feels like a decision with risk.',
    story:
      'Your subscription renews again. You barely use it, but cancelling means logging in, deciding, and maybe regretting it later. So nothing changes. The current state gets treated like neutral ground, even though keeping it is also a choice.',
    reflection:
      'What are you keeping only because changing it would require a decision?',
    everydayTell:
      'Doing nothing feels passive, even when it has a monthly cost.',
  },
  {
    id: 'spotlight',
    name: 'Spotlight Effect',
    category: 'Relationships & People',
    shortDefinition:
      'Overestimating how much other people notice your mistakes, appearance, or behavior.',
    story:
      'You stumble over one sentence in a call and think about it for the rest of the day. Everyone else moved on within seconds. You experienced the moment from inside your own head, where the lights were brighter and the mistake was louder.',
    reflection:
      'What are you assuming other people noticed more than they probably did?',
    everydayTell:
      'Your internal replay gets mistaken for everyone else paying attention.',
  },
];

export const challenges: Challenge[] = [
  {
    id: 'laptop-price',
    scenario:
      'You see a laptop for 1899 first. The next one is 1299 and instantly feels like a bargain, even though you had planned to spend 900.',
    options: ['Anchoring Bias', 'Status Quo Bias', 'Halo Effect'],
    answerIndex: 0,
    explanation:
      'The first price became the reference point. The second price felt cheap relative to the anchor, not relative to your budget.',
  },
  {
    id: 'bad-film',
    scenario:
      'You keep watching a dull film because you are already halfway through and it feels wasteful to stop now.',
    options: ['Spotlight Effect', 'Sunk Cost Fallacy', 'Availability Heuristic'],
    answerIndex: 1,
    explanation:
      'The time already spent cannot be recovered. The better question is whether the remaining time is worth spending.',
  },
  {
    id: 'one-review-path',
    scenario:
      'You want a new camera, so you search for videos explaining why that exact model is underrated and skip the comparison reviews.',
    options: ['Confirmation Bias', 'Planning Fallacy', 'Anchoring Bias'],
    answerIndex: 0,
    explanation:
      'The research is tilted toward supporting the choice you already want to make.',
  },
  {
    id: 'calm-speaker',
    scenario:
      'A colleague gives a calm, polished answer. You assume the plan is strong before checking the details.',
    options: ['Availability Heuristic', 'Halo Effect', 'Status Quo Bias'],
    answerIndex: 1,
    explanation:
      'One positive quality, confident delivery, is shaping your overall judgment of the idea.',
  },
  {
    id: 'quick-project',
    scenario:
      'You say the project will take two days because the finished version is easy to imagine. The last three similar projects took a week.',
    options: ['Planning Fallacy', 'Spotlight Effect', 'Sunk Cost Fallacy'],
    answerIndex: 0,
    explanation:
      'The estimate is based on the clean imagined path, not the evidence from previous work.',
  },
];

export const categories: BiasCategory[] = [
  'Money & Spending',
  'Relationships & People',
  'Decisions & Choices',
  'Work & Career',
  'Beliefs & Identity',
  'Memory & Perception',
];

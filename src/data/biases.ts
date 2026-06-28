export type BiasCategory =
  | 'Decision-Making & Risk Biases'
  | 'Belief, Judgment & Reasoning Biases'
  | 'Social & Attribution Biases'
  | 'Probability & Statistical Biases'
  | 'Memory Biases'
  | 'Perception & Attention Biases';

export type LifeContext =
  | 'Money & Spending'
  | 'Relationships & People'
  | 'Decisions & Choices'
  | 'Work & Career'
  | 'Beliefs & Identity'
  | 'Memory & Perception';

export type Bias = {
  id: string;
  order: number;
  name: string;
  category: BiasCategory;
  lifeContext: LifeContext;
  definition: string;
};

export type BiasFeature = {
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

export const categories: BiasCategory[] = [
  "Decision-Making & Risk Biases",
  "Belief, Judgment & Reasoning Biases",
  "Social & Attribution Biases",
  "Probability & Statistical Biases",
  "Memory Biases",
  "Perception & Attention Biases"
];

export const lifeContexts: LifeContext[] = [
  "Money & Spending",
  "Relationships & People",
  "Decisions & Choices",
  "Work & Career",
  "Beliefs & Identity",
  "Memory & Perception"
];

export const biases: Bias[] = [
  {
    id: 'loss-aversion',
    order: 1,
    name: "Loss Aversion",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition: "Tendency to prefer avoiding losses over acquiring equivalent gains.",
  },
  {
    id: 'endowment-effect',
    order: 2,
    name: "Endowment Effect",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition: "Valuing something more highly simply because you own it.",
  },
  {
    id: 'framing-effect',
    order: 3,
    name: "Framing Effect",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Drawing different conclusions based on how information is presented.",
  },
  {
    id: 'status-quo-bias',
    order: 4,
    name: "Status Quo Bias",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Preference for keeping things the same.",
  },
  {
    id: 'sunk-cost-fallacy',
    order: 5,
    name: "Sunk Cost Fallacy",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition: "Continuing something because of previously invested resources.",
  },
  {
    id: 'zero-risk-bias',
    order: 6,
    name: "Zero-Risk Bias",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition: "Preference for eliminating risk entirely rather than reducing it.",
  },
  {
    id: 'pseudocertainty-effect',
    order: 7,
    name: "Pseudocertainty Effect",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Preference for certain outcomes over probabilistic ones.",
  },
  {
    id: 'risk-compensation',
    order: 8,
    name: "Risk Compensation",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition: "Adjusting behavior in response to perceived risk levels.",
  },
  {
    id: 'ambiguity-effect',
    order: 9,
    name: "Ambiguity Effect",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Avoiding options with unknown probabilities.",
  },
  {
    id: 'prospect-theory-bias',
    order: 10,
    name: "Prospect Theory Bias",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition: "Evaluating gains and losses differently under risk.",
  },
  {
    id: 'diminishing-sensitivity',
    order: 11,
    name: "Diminishing Sensitivity",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Reduced sensitivity to changes as magnitude increases.",
  },
  {
    id: 'hyperbolic-discounting',
    order: 12,
    name: "Hyperbolic Discounting",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition: "Preference for smaller immediate rewards over larger future ones.",
  },
  {
    id: 'time-discounting',
    order: 13,
    name: "Time Discounting",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition: "Devaluing outcomes based on delay.",
  },
  {
    id: 'planning-fallacy',
    order: 14,
    name: "Planning Fallacy",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Underestimating time, cost, or effort required.",
  },
  {
    id: 'optimism-bias',
    order: 15,
    name: "Optimism Bias",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Overestimating likelihood of positive outcomes.",
  },
  {
    id: 'pessimism-bias',
    order: 16,
    name: "Pessimism Bias",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Overestimating likelihood of negative outcomes.",
  },
  {
    id: 'outcome-bias',
    order: 17,
    name: "Outcome Bias",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Judging decisions by their outcomes rather than the process.",
  },
  {
    id: 'hindsight-bias',
    order: 18,
    name: "Hindsight Bias",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Seeing events as predictable after they occur.",
  },
  {
    id: 'escalation-of-commitment',
    order: 19,
    name: "Escalation of Commitment",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Continuing a failing course of action.",
  },
  {
    id: 'decoy-effect',
    order: 20,
    name: "Decoy Effect",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition: "Changing preference when a third option is introduced.",
  },
  {
    id: 'default-effect',
    order: 21,
    name: "Default Effect",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition: "Favoring pre-selected options.",
  },
  {
    id: 'opportunity-cost-neglect',
    order: 22,
    name: "Opportunity Cost Neglect",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition: "Ignoring alternatives when making decisions.",
  },
  {
    id: 'delay-discounting',
    order: 23,
    name: "Delay Discounting",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition: "Devaluing rewards based on delay.",
  },
  {
    id: 'pro-innovation-bias',
    order: 24,
    name: "Pro-Innovation Bias",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Favoring new ideas regardless of merit.",
  },
  {
    id: 'omission-bias',
    order: 25,
    name: "Omission Bias",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Preferring harm caused by inaction over action.",
  },
  {
    id: 'action-bias',
    order: 26,
    name: "Action Bias",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Preference for action over inaction.",
  },
  {
    id: 'reactance',
    order: 27,
    name: "Reactance",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Resisting perceived constraints on freedom.",
  },
  {
    id: 'overconfidence-effect',
    order: 28,
    name: "Overconfidence Effect",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Excessive confidence in one's abilities or knowledge.",
  },
  {
    id: 'hard-easy-effect',
    order: 29,
    name: "Hard-Easy Effect",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Work & Career",
    definition: "Overestimating performance on difficult tasks, underestimating on easy ones.",
  },
  {
    id: 'survivorship-bias',
    order: 30,
    name: "Survivorship Bias",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Decisions & Choices",
    definition: "Focusing on successful cases while ignoring failures.",
  },
  {
    id: 'anchoring-bias',
    order: 121,
    name: "Anchoring Bias",
    category: "Decision-Making & Risk Biases",
    lifeContext: "Money & Spending",
    definition:
      "Relying too heavily on the first number, idea, or impression encountered.",
  },
  {
    id: 'confirmation-bias',
    order: 31,
    name: "Confirmation Bias",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Favoring information that supports existing beliefs.",
  },
  {
    id: 'belief-bias',
    order: 32,
    name: "Belief Bias",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Judging arguments based on believability rather than logic.",
  },
  {
    id: 'belief-perseverance',
    order: 33,
    name: "Belief Perseverance",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Maintaining beliefs despite contrary evidence.",
  },
  {
    id: 'backfire-effect',
    order: 34,
    name: "Backfire Effect",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Strengthening beliefs when confronted with opposing evidence.",
  },
  {
    id: 'bias-blind-spot',
    order: 35,
    name: "Bias Blind Spot",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Recognizing biases in others but not oneself.",
  },
  {
    id: 'cognitive-dissonance',
    order: 36,
    name: "Cognitive Dissonance",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Discomfort from conflicting beliefs leading to rationalization.",
  },
  {
    id: 'conservatism-bias',
    order: 37,
    name: "Conservatism Bias",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Insufficiently updating beliefs with new evidence.",
  },
  {
    id: 'information-bias',
    order: 38,
    name: "Information Bias",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Work & Career",
    definition: "Seeking unnecessary information.",
  },
  {
    id: 'illusion-of-validity',
    order: 39,
    name: "Illusion of Validity",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Overestimating accuracy of judgments.",
  },
  {
    id: 'illusion-of-control',
    order: 40,
    name: "Illusion of Control",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Overestimating control over outcomes.",
  },
  {
    id: 'illusory-truth-effect',
    order: 41,
    name: "Illusory Truth Effect",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Repeated statements are perceived as true.",
  },
  {
    id: 'false-consensus-effect',
    order: 42,
    name: "False Consensus Effect",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Relationships & People",
    definition: "Overestimating how much others agree with you.",
  },
  {
    id: 'false-uniqueness-effect',
    order: 43,
    name: "False Uniqueness Effect",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Relationships & People",
    definition: "Underestimating how common your traits are.",
  },
  {
    id: 'projection-bias',
    order: 44,
    name: "Projection Bias",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Relationships & People",
    definition: "Assuming others share your beliefs or preferences.",
  },
  {
    id: 'curse-of-knowledge',
    order: 45,
    name: "Curse of Knowledge",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Work & Career",
    definition: "Difficulty imagining what others don't know.",
  },
  {
    id: 'naive-realism',
    order: 46,
    name: "Naive Realism",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Belief that you see the world objectively.",
  },
  {
    id: 'third-person-effect',
    order: 47,
    name: "Third-Person Effect",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Belief that others are more influenced than you.",
  },
  {
    id: 'attribution-substitution',
    order: 48,
    name: "Attribution Substitution",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Relationships & People",
    definition: "Replacing complex judgments with simpler ones.",
  },
  {
    id: 'mental-accounting',
    order: 49,
    name: "Mental Accounting",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Money & Spending",
    definition: "Treating money differently based on arbitrary categories.",
  },
  {
    id: 'rationalization',
    order: 50,
    name: "Rationalization",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Justifying decisions after the fact.",
  },
  {
    id: 'moral-licensing',
    order: 51,
    name: "Moral Licensing",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Relationships & People",
    definition: "Allowing oneself to act badly after doing something good.",
  },
  {
    id: 'moral-credential-effect',
    order: 52,
    name: "Moral Credential Effect",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Relationships & People",
    definition: "Using past moral behavior to justify bias.",
  },
  {
    id: 'just-world-hypothesis',
    order: 53,
    name: "Just-World Hypothesis",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Relationships & People",
    definition: "Belief that people get what they deserve.",
  },
  {
    id: 'system-justification',
    order: 54,
    name: "System Justification",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Relationships & People",
    definition: "Defending existing social systems.",
  },
  {
    id: 'semmelweis-reflex',
    order: 55,
    name: "Semmelweis Reflex",
    category: "Belief, Judgment & Reasoning Biases",
    lifeContext: "Beliefs & Identity",
    definition: "Rejecting new evidence that contradicts norms.",
  },
  {
    id: 'fundamental-attribution-error',
    order: 56,
    name: "Fundamental Attribution Error",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Overemphasizing personal traits over situational factors.",
  },
  {
    id: 'actor-observer-bias',
    order: 57,
    name: "Actor-Observer Bias",
    category: "Social & Attribution Biases",
    lifeContext: "Decisions & Choices",
    definition: "Attributing own actions to context, others to traits.",
  },
  {
    id: 'self-serving-bias',
    order: 58,
    name: "Self-Serving Bias",
    category: "Social & Attribution Biases",
    lifeContext: "Decisions & Choices",
    definition: "Attributing success to self, failure to external factors.",
  },
  {
    id: 'defensive-attribution',
    order: 59,
    name: "Defensive Attribution",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Blaming victims to protect oneself.",
  },
  {
    id: 'ingroup-bias',
    order: 60,
    name: "Ingroup Bias",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Favoring one's own group.",
  },
  {
    id: 'outgroup-homogeneity-bias',
    order: 61,
    name: "Outgroup Homogeneity Bias",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Viewing outsiders as more similar than they are.",
  },
  {
    id: 'social-comparison-bias',
    order: 62,
    name: "Social Comparison Bias",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Comparing oneself to others to evaluate self-worth.",
  },
  {
    id: 'stereotyping',
    order: 63,
    name: "Stereotyping",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Assigning traits based on group membership.",
  },
  {
    id: 'halo-effect',
    order: 64,
    name: "Halo Effect",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Letting one positive trait influence overall judgment.",
  },
  {
    id: 'horn-effect',
    order: 65,
    name: "Horn Effect",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Letting one negative trait influence overall judgment.",
  },
  {
    id: 'authority-bias',
    order: 66,
    name: "Authority Bias",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Valuing opinions of authority figures more highly.",
  },
  {
    id: 'bandwagon-effect',
    order: 67,
    name: "Bandwagon Effect",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Adopting beliefs because others do.",
  },
  {
    id: 'social-proof',
    order: 68,
    name: "Social Proof",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Looking to others for behavioral cues.",
  },
  {
    id: 'groupthink',
    order: 69,
    name: "Groupthink",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Prioritizing harmony over critical thinking in groups.",
  },
  {
    id: 'deindividuation',
    order: 70,
    name: "Deindividuation",
    category: "Social & Attribution Biases",
    lifeContext: "Decisions & Choices",
    definition: "Losing self-awareness in group settings.",
  },
  {
    id: 'spotlight-effect',
    order: 71,
    name: "Spotlight Effect",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Overestimating how much others notice you.",
  },
  {
    id: 'illusion-of-transparency',
    order: 72,
    name: "Illusion of Transparency",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Overestimating how well others understand you.",
  },
  {
    id: 'hostile-attribution-bias',
    order: 73,
    name: "Hostile Attribution Bias",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Interpreting ambiguous actions as hostile.",
  },
  {
    id: 'egocentric-bias',
    order: 74,
    name: "Egocentric Bias",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Relying too heavily on one's own perspective.",
  },
  {
    id: 'empathy-gap',
    order: 75,
    name: "Empathy Gap",
    category: "Social & Attribution Biases",
    lifeContext: "Relationships & People",
    definition: "Underestimating influence of emotions on behavior.",
  },
  {
    id: 'availability-heuristic',
    order: 76,
    name: "Availability Heuristic",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Judging likelihood based on recall ease.",
  },
  {
    id: 'availability-cascade',
    order: 77,
    name: "Availability Cascade",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Beliefs gain traction through repetition.",
  },
  {
    id: 'representativeness-heuristic',
    order: 78,
    name: "Representativeness Heuristic",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Judging probability by similarity.",
  },
  {
    id: 'base-rate-neglect',
    order: 79,
    name: "Base Rate Neglect",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Ignoring general statistical information.",
  },
  {
    id: 'conjunction-fallacy',
    order: 80,
    name: "Conjunction Fallacy",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Assuming combined events are more likely.",
  },
  {
    id: 'gambler-s-fallacy',
    order: 81,
    name: "Gambler's Fallacy",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Belief that past events influence future randomness.",
  },
  {
    id: 'hot-hand-fallacy',
    order: 82,
    name: "Hot-Hand Fallacy",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Belief that success will continue.",
  },
  {
    id: 'clustering-illusion',
    order: 83,
    name: "Clustering Illusion",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Seeing patterns in random data.",
  },
  {
    id: 'law-of-small-numbers',
    order: 84,
    name: "Law of Small Numbers",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Overgeneralizing from small samples.",
  },
  {
    id: 'regression-to-the-mean',
    order: 85,
    name: "Regression to the Mean",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Ignoring natural fluctuations toward averages.",
  },
  {
    id: 'neglect-of-probability',
    order: 86,
    name: "Neglect of Probability",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Ignoring likelihood in decision-making.",
  },
  {
    id: 'probability-matching',
    order: 87,
    name: "Probability Matching",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Matching choices to probabilities rather than maximizing.",
  },
  {
    id: 'ratio-bias',
    order: 88,
    name: "Ratio Bias",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Preferring larger numerators over better probabilities.",
  },
  {
    id: 'sample-size-neglect',
    order: 89,
    name: "Sample Size Neglect",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Ignoring importance of sample size.",
  },
  {
    id: 'insensitivity-to-sample-size',
    order: 90,
    name: "Insensitivity to Sample Size",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Treating small samples as reliable.",
  },
  {
    id: 'texas-sharpshooter-fallacy',
    order: 91,
    name: "Texas Sharpshooter Fallacy",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Finding patterns after the fact.",
  },
  {
    id: 'misleading-vividness',
    order: 92,
    name: "Misleading Vividness",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Overweighting vivid information.",
  },
  {
    id: 'frequency-illusion',
    order: 93,
    name: "Frequency Illusion",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Noticing something more after awareness.",
  },
  {
    id: 'survivorship-bias',
    order: 94,
    name: "Survivorship Bias",
    category: "Probability & Statistical Biases",
    lifeContext: "Decisions & Choices",
    definition: "Ignoring unseen failures.",
  },
  {
    id: 'overgeneralization',
    order: 95,
    name: "Overgeneralization",
    category: "Probability & Statistical Biases",
    lifeContext: "Memory & Perception",
    definition: "Drawing broad conclusions from limited data.",
  },
  {
    id: 'misinformation-effect',
    order: 96,
    name: "Misinformation Effect",
    category: "Memory Biases",
    lifeContext: "Work & Career",
    definition: "Memory altered by misleading information.",
  },
  {
    id: 'source-amnesia',
    order: 97,
    name: "Source Amnesia",
    category: "Memory Biases",
    lifeContext: "Memory & Perception",
    definition: "Forgetting origin of information.",
  },
  {
    id: 'cryptomnesia',
    order: 98,
    name: "Cryptomnesia",
    category: "Memory Biases",
    lifeContext: "Memory & Perception",
    definition: "Mistaking memories for new ideas.",
  },
  {
    id: 'false-memory',
    order: 99,
    name: "False Memory",
    category: "Memory Biases",
    lifeContext: "Memory & Perception",
    definition: "Remembering events that didn't occur.",
  },
  {
    id: 'recency-bias',
    order: 100,
    name: "Recency Bias",
    category: "Memory Biases",
    lifeContext: "Memory & Perception",
    definition: "Favoring recent information.",
  },
  {
    id: 'primacy-bias',
    order: 101,
    name: "Primacy Bias",
    category: "Memory Biases",
    lifeContext: "Memory & Perception",
    definition: "Favoring first impressions.",
  },
  {
    id: 'peak-end-rule',
    order: 102,
    name: "Peak-End Rule",
    category: "Memory Biases",
    lifeContext: "Memory & Perception",
    definition: "Judging experiences by peak and end.",
  },
  {
    id: 'fading-affect-bias',
    order: 103,
    name: "Fading Affect Bias",
    category: "Memory Biases",
    lifeContext: "Memory & Perception",
    definition: "Negative memories fade faster than positive.",
  },
  {
    id: 'consistency-bias',
    order: 104,
    name: "Consistency Bias",
    category: "Memory Biases",
    lifeContext: "Memory & Perception",
    definition: "Reconstructing past beliefs to match current ones.",
  },
  {
    id: 'rosy-retrospection',
    order: 105,
    name: "Rosy Retrospection",
    category: "Memory Biases",
    lifeContext: "Memory & Perception",
    definition: "Remembering the past more positively.",
  },
  {
    id: 'salience-bias',
    order: 106,
    name: "Salience Bias",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Focusing on prominent information.",
  },
  {
    id: 'negativity-bias',
    order: 107,
    name: "Negativity Bias",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Prioritizing negative information.",
  },
  {
    id: 'positivity-bias',
    order: 108,
    name: "Positivity Bias",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Favoring positive information.",
  },
  {
    id: 'mere-exposure-effect',
    order: 109,
    name: "Mere Exposure Effect",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Preferring familiar things.",
  },
  {
    id: 'familiarity-heuristic',
    order: 110,
    name: "Familiarity Heuristic",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Judging based on familiarity.",
  },
  {
    id: 'contrast-effect',
    order: 111,
    name: "Contrast Effect",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Perception influenced by comparisons.",
  },
  {
    id: 'distinction-bias',
    order: 112,
    name: "Distinction Bias",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Overvaluing differences when compared.",
  },
  {
    id: 'focusing-effect',
    order: 113,
    name: "Focusing Effect",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Overemphasizing one aspect.",
  },
  {
    id: 'change-blindness',
    order: 114,
    name: "Change Blindness",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Failing to notice changes.",
  },
  {
    id: 'attentional-bias',
    order: 115,
    name: "Attentional Bias",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Selective attention to certain stimuli.",
  },
  {
    id: 'illusory-correlation',
    order: 116,
    name: "Illusory Correlation",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Seeing relationships where none exist.",
  },
  {
    id: 'pareidolia',
    order: 117,
    name: "Pareidolia",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Seeing patterns in randomness.",
  },
  {
    id: 'cheerleader-effect',
    order: 118,
    name: "Cheerleader Effect",
    category: "Perception & Attention Biases",
    lifeContext: "Relationships & People",
    definition: "People appear more attractive in groups.",
  },
  {
    id: 'ikea-effect',
    order: 119,
    name: "IKEA Effect",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Valuing self-created products more.",
  },
  {
    id: 'effort-justification',
    order: 120,
    name: "Effort Justification",
    category: "Perception & Attention Biases",
    lifeContext: "Memory & Perception",
    definition: "Valuing outcomes more if effort was high.",
  }
];

export const featuredBiases: Record<string, BiasFeature> = {
  'sunk-cost-fallacy': {
    story:
      'You are 90 minutes into a film you are not enjoying. Your partner asks if you want to switch to something else. You say no, because you have already invested this much time. But the 90 minutes are gone either way. The only question left is whether the next hour is better spent here or somewhere else.',
    reflection:
      'When was the last time you stuck with something mainly because you had already started?',
    everydayTell:
      'A sentence like "I have come this far" starts doing the thinking for you.',
  },
  'confirmation-bias': {
    story:
      'You are thinking about buying something new. Without meaning to, you read three glowing reviews, watch two positive videos, and skip the complaint threads because they seem a bit dramatic. You call it research. Your brain calls it evidence collection for a verdict it already likes.',
    reflection: 'Where are you gathering evidence, and where are you avoiding it?',
    everydayTell: 'Search terms start sounding like arguments for the answer you want.',
  },
  'halo-effect': {
    story:
      'Someone speaks calmly in a meeting. They sound thoughtful, polished, measured. Later, you realize you gave their idea more credit than it earned because the delivery felt credible. Your brain rounded one visible strength up into a general judgment.',
    reflection: 'Who or what might you be overrating because one part of it looks impressive?',
    everydayTell: 'Confidence, beauty, fluency, or status starts standing in for substance.',
  },
  'planning-fallacy': {
    story:
      'You tell yourself the deck will take an hour. It has never taken an hour. Last time it took an evening, three rewrites, and a late export. Still, this time feels different because you can picture the neat version, not the messy path to get there.',
    reflection: 'What are you estimating from the ideal version instead of your actual history?',
    everydayTell: 'The plan contains the work, but not the interruptions, ambiguity, or rework.',
  },
  'availability-heuristic': {
    story:
      'After seeing two posts about burglaries, your street suddenly feels less safe. Nothing local has changed, but vivid examples are easier for your brain to retrieve than boring statistics. What comes to mind quickly starts to feel like what happens often.',
    reflection: 'What recent story might be making something feel more likely than it is?',
    everydayTell: 'A vivid example feels like a trend before you have checked the base rate.',
  },
  'status-quo-bias': {
    story:
      'Your subscription renews again. You barely use it, but cancelling means logging in, deciding, and maybe regretting it later. So nothing changes. The current state gets treated like neutral ground, even though keeping it is also a choice.',
    reflection: 'What are you keeping only because changing it would require a decision?',
    everydayTell: 'Doing nothing feels passive, even when it has a monthly cost.',
  },
  'spotlight-effect': {
    story:
      'You stumble over one sentence in a call and think about it for the rest of the day. Everyone else moved on within seconds. You experienced the moment from inside your own head, where the lights were brighter and the mistake was louder.',
    reflection: 'What are you assuming other people noticed more than they probably did?',
    everydayTell: 'Your internal replay gets mistaken for everyone else paying attention.',
  },
  'anchoring-bias': {
    story:
      'You see one expensive option first. The next option costs less and suddenly feels reasonable, even if it is still above what you planned to spend. Nothing about your actual budget changed. Your brain just started measuring from the first number it saw.',
    reflection: 'What first number or first impression has been quietly setting the scale?',
    everydayTell: 'The first option becomes the ruler, even when it was never a good ruler.',
  },
};

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
    explanation: 'The research is tilted toward supporting the choice you already want to make.',
  },
  {
    id: 'calm-speaker',
    scenario:
      'A colleague gives a calm, polished answer. You assume the plan is strong before checking the details.',
    options: ['Availability Heuristic', 'Halo Effect', 'Status Quo Bias'],
    answerIndex: 1,
    explanation: 'One positive quality, confident delivery, is shaping your overall judgment of the idea.',
  },
  {
    id: 'quick-project',
    scenario:
      'You say the project will take two days because the finished version is easy to imagine. The last three similar projects took a week.',
    options: ['Planning Fallacy', 'Spotlight Effect', 'Sunk Cost Fallacy'],
    answerIndex: 0,
    explanation: 'The estimate is based on the clean imagined path, not the evidence from previous work.',
  },
  {
    id: 'group-silence',
    scenario:
      'Everyone in the meeting nods along. You have concerns, but the room feels settled, so you decide not to raise them.',
    options: ['Groupthink', 'Recency Bias', 'IKEA Effect'],
    answerIndex: 0,
    explanation: 'Harmony is starting to crowd out independent judgment.',
  },
  {
    id: 'recent-headline',
    scenario:
      'After one scary article about plane trouble, flying feels much riskier than it did yesterday.',
    options: ['Availability Heuristic', 'Default Effect', 'Moral Licensing'],
    answerIndex: 0,
    explanation: 'A vivid recent example is standing in for the actual probability.',
  },
  {
    id: 'free-trial-default',
    scenario:
      'A service preselects annual billing. You leave it as-is because changing it feels like an extra decision.',
    options: ['Default Effect', 'False Memory', 'Cheerleader Effect'],
    answerIndex: 0,
    explanation: 'The preselected option benefits from feeling like the path of least resistance.',
  },
];

export function getBiasById(id: string) {
  return biases.find((bias) => bias.id === id) ?? biases[0];
}

export function getBiasFeature(bias: Bias): BiasFeature {
  const featured = featuredBiases[bias.id];

  if (featured) {
    return featured;
  }

  return {
    story: getGeneratedStory(bias),
    reflection: getGeneratedReflection(bias),
    everydayTell: getGeneratedTell(),
  };
}

export function getDailyBias(date = new Date()) {
  const dayNumber = Math.floor(date.getTime() / (24 * 60 * 60 * 1000));
  return biases[dayNumber % biases.length];
}

function getGeneratedStory(bias: Bias) {
  const lowerContext = bias.lifeContext.toLowerCase();
  const definition = bias.definition.charAt(0).toLowerCase() + bias.definition.slice(1);

  return (
    'You notice ' +
    bias.name.toLowerCase() +
    ' when ' +
    lowerContext +
    ' decisions start to feel obvious before you have really inspected them. The pattern is subtle: ' +
    definition +
    ' The useful move is not to shame yourself for doing it. It is to pause long enough to name the pattern while it is happening.'
  );
}

function getGeneratedReflection(bias: Bias) {
  return (
    'Where might ' +
    bias.name.toLowerCase() +
    ' be shaping a decision, reaction, or story you are carrying today?'
  );
}

function getGeneratedTell() {
  return 'Listen for the moment a quick explanation feels complete before you have checked what else could be true.';
}

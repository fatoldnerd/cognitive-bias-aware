import { LifeContext } from './data/biases';

export type Tab = 'Today' | 'Practice' | 'Journal' | 'Collection';

export type JournalEntry = {
  id: string;
  biasId: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
};

export type ContextFilter = 'All' | LifeContext;

import AsyncStorage from '@react-native-async-storage/async-storage';

import { JournalEntry } from '../types';

const STORAGE_KEY = 'blindspot.journal.v1';

export async function loadJournalEntries() {
  const storedEntries = await AsyncStorage.getItem(STORAGE_KEY);

  if (storedEntries === null) {
    return [];
  }

  const parsedEntries = JSON.parse(storedEntries) as JournalEntry[];

  if (!Array.isArray(parsedEntries)) {
    return [];
  }

  return parsedEntries;
}

export async function saveJournalEntries(entries: JournalEntry[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

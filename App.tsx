import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Bias, biases, categories, challenges } from './src/data/biases';

type Tab = 'Today' | 'Practice' | 'Journal' | 'Collection';

type JournalEntry = {
  id: string;
  biasId: string;
  text: string;
  createdAt: string;
};

const STORAGE_KEY = 'blindspot.journal.v1';
const DAY_MS = 24 * 60 * 60 * 1000;
const tabs: Tab[] = ['Today', 'Practice', 'Journal', 'Collection'];

function getTodayBiasIndex() {
  return Math.floor(Date.now() / DAY_MS) % biases.length;
}

function formatEntryDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function getBiasById(id: string) {
  return biases.find((bias) => bias.id === id) ?? biases[0];
}

export default function App() {
  const todayBias = biases[getTodayBiasIndex()];
  const [activeTab, setActiveTab] = useState<Tab>('Today');
  const [focusBiasId, setFocusBiasId] = useState(todayBias.id);
  const [journalDraft, setJournalDraft] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [hasLoadedEntries, setHasLoadedEntries] = useState(false);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const focusBias = getBiasById(focusBiasId);
  const challenge = challenges[challengeIndex];
  const trimmedDraft = journalDraft.trim();

  const unlockedBiasIds = useMemo(() => {
    const ids = new Set<string>([todayBias.id, ...biases.slice(0, 3).map((bias) => bias.id)]);
    entries.forEach((entry) => ids.add(entry.biasId));
    return ids;
  }, [entries, todayBias.id]);

  const entryCountByBias = useMemo(() => {
    const counts = new Map<string, number>();
    entries.forEach((entry) => {
      counts.set(entry.biasId, (counts.get(entry.biasId) ?? 0) + 1);
    });
    return counts;
  }, [entries]);

  useEffect(() => {
    let isMounted = true;

    async function loadEntries() {
      try {
        const storedEntries = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedEntries === null) {
          return;
        }

        const parsedEntries = JSON.parse(storedEntries) as JournalEntry[];

        if (isMounted && Array.isArray(parsedEntries)) {
          setEntries(parsedEntries);
        }
      } catch {
        if (isMounted) {
          Alert.alert('Journal could not load', 'Your saved entries were not readable.');
        }
      } finally {
        if (isMounted) {
          setHasLoadedEntries(true);
        }
      }
    }

    loadEntries();

    return () => {
      isMounted = false;
    };
  }, []);

  async function saveEntry() {
    if (trimmedDraft.length === 0) {
      Alert.alert('Nothing to save', 'Write a quick note before saving the entry.');
      return;
    }

    const nextEntry: JournalEntry = {
      id: `${Date.now()}`,
      biasId: focusBias.id,
      text: trimmedDraft,
      createdAt: new Date().toISOString(),
    };

    const nextEntries = [nextEntry, ...entries];
    setEntries(nextEntries);
    setJournalDraft('');
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));
    setActiveTab('Journal');
  }

  function moveToNextChallenge() {
    setSelectedAnswer(null);
    setChallengeIndex((challengeIndex + 1) % challenges.length);
  }

  function renderContent() {
    if (activeTab === 'Today') {
      return (
        <TodayScreen
          bias={focusBias}
          isToday={focusBias.id === todayBias.id}
          draft={journalDraft}
          onDraftChange={setJournalDraft}
          onSave={saveEntry}
          canSave={trimmedDraft.length > 0}
        />
      );
    }

    if (activeTab === 'Practice') {
      return (
        <PracticeScreen
          challenge={challenge}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={setSelectedAnswer}
          onNextChallenge={moveToNextChallenge}
        />
      );
    }

    if (activeTab === 'Journal') {
      return (
        <JournalScreen
          entries={entries}
          hasLoadedEntries={hasLoadedEntries}
          onNewEntry={() => setActiveTab('Today')}
        />
      );
    }

    return (
      <CollectionScreen
        entryCountByBias={entryCountByBias}
        unlockedBiasIds={unlockedBiasIds}
        onFocusBias={(biasId) => {
          setFocusBiasId(biasId);
          setActiveTab('Today');
        }}
      />
    );
  }

  return (
    <View style={styles.app}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.blindspotMark}>
              <View style={styles.blindspotCore} />
            </View>
            <Text style={styles.brand}>Blindspot</Text>
          </View>
          <Text style={styles.headerText}>
            A daily mirror for the thoughts that move faster than you notice.
          </Text>
        </View>

        {renderContent()}
      </ScrollView>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <Pressable
              key={tab}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              onPress={() => setActiveTab(tab)}
              style={({ pressed }) => [
                styles.tabButton,
                isActive ? styles.tabButtonActive : styles.tabButtonInactive,
                pressed ? styles.pressed : null,
              ]}
            >
              <Text style={isActive ? styles.tabTextActive : styles.tabTextInactive}>{tab}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function TodayScreen({
  bias,
  isToday,
  draft,
  onDraftChange,
  onSave,
  canSave,
}: {
  bias: Bias;
  isToday: boolean;
  draft: string;
  onDraftChange: (value: string) => void;
  onSave: () => void;
  canSave: boolean;
}) {
  return (
    <View style={styles.screenStack}>
      <View style={styles.sectionLabelRow}>
        <Text style={styles.kicker}>{isToday ? "Today's bias" : 'Selected bias'}</Text>
        <Text style={styles.contextLabel}>{bias.category}</Text>
      </View>

      <View style={styles.biasCard}>
        <Text style={styles.biasTitle}>{bias.name}</Text>
        <Text style={styles.biasStory}>{bias.story}</Text>
        <View style={styles.definitionBox}>
          <Text style={styles.definitionLabel}>What is happening</Text>
          <Text style={styles.definitionText}>{bias.shortDefinition}</Text>
        </View>
      </View>

      <View style={styles.reflectionCard}>
        <Text style={styles.cardLabel}>Reflection</Text>
        <Text style={styles.reflectionQuestion}>{bias.reflection}</Text>
        <TextInput
          multiline
          onChangeText={onDraftChange}
          placeholder="Capture the moment while it is still fresh."
          placeholderTextColor="#8D8B82"
          style={styles.journalInput}
          textAlignVertical="top"
          value={draft}
        />
        <Pressable
          accessibilityRole="button"
          disabled={!canSave}
          onPress={onSave}
          style={({ pressed }) => [
            styles.primaryButton,
            !canSave ? styles.disabledButton : null,
            pressed && canSave ? styles.pressed : null,
          ]}
        >
          <Text style={styles.primaryButtonText}>Save journal entry</Text>
        </Pressable>
      </View>

      <View style={styles.tellCard}>
        <Text style={styles.cardLabel}>Everyday tell</Text>
        <Text style={styles.tellText}>{bias.everydayTell}</Text>
      </View>
    </View>
  );
}

function PracticeScreen({
  challenge,
  selectedAnswer,
  onSelectAnswer,
  onNextChallenge,
}: {
  challenge: (typeof challenges)[number];
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  onNextChallenge: () => void;
}) {
  const hasAnswered = selectedAnswer !== null;
  const answeredCorrectly = selectedAnswer === challenge.answerIndex;

  return (
    <View style={styles.screenStack}>
      <View style={styles.sectionLabelRow}>
        <Text style={styles.kicker}>Spot the bias</Text>
        <Text style={styles.contextLabel}>30 second practice</Text>
      </View>

      <View style={styles.practiceCard}>
        <Text style={styles.scenarioText}>{challenge.scenario}</Text>
        <View style={styles.answerStack}>
          {challenge.options.map((option, optionIndex) => {
            const isSelected = selectedAnswer === optionIndex;
            const isCorrectAnswer = challenge.answerIndex === optionIndex;
            const showCorrect = hasAnswered && isCorrectAnswer;
            const showWrong = hasAnswered && isSelected && !isCorrectAnswer;

            return (
              <Pressable
                accessibilityRole="button"
                disabled={hasAnswered}
                key={option}
                onPress={() => onSelectAnswer(optionIndex)}
                style={({ pressed }) => [
                  styles.answerButton,
                  showCorrect ? styles.answerButtonCorrect : null,
                  showWrong ? styles.answerButtonWrong : null,
                  pressed ? styles.pressed : null,
                ]}
              >
                <Text style={styles.answerText}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {hasAnswered ? (
        <View style={styles.feedbackCard}>
          <Text style={styles.cardLabel}>{answeredCorrectly ? 'You spotted it' : 'Worth noticing'}</Text>
          <Text style={styles.feedbackText}>{challenge.explanation}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={onNextChallenge}
            style={({ pressed }) => [styles.secondaryButton, pressed ? styles.pressed : null]}
          >
            <Text style={styles.secondaryButtonText}>Next scenario</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

function JournalScreen({
  entries,
  hasLoadedEntries,
  onNewEntry,
}: {
  entries: JournalEntry[];
  hasLoadedEntries: boolean;
  onNewEntry: () => void;
}) {
  return (
    <View style={styles.screenStack}>
      <View style={styles.sectionLabelRow}>
        <Text style={styles.kicker}>Your bias journal</Text>
        <Text style={styles.contextLabel}>{entries.length} entries</Text>
      </View>

      {!hasLoadedEntries ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Loading entries</Text>
          <Text style={styles.emptyText}>Your private notes are being read from this device.</Text>
        </View>
      ) : null}

      {hasLoadedEntries && entries.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No entries yet</Text>
          <Text style={styles.emptyText}>
            Start with one moment you caught yourself thinking on autopilot.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={onNewEntry}
            style={({ pressed }) => [styles.secondaryButton, pressed ? styles.pressed : null]}
          >
            <Text style={styles.secondaryButtonText}>Write first entry</Text>
          </Pressable>
        </View>
      ) : null}

      {entries.map((entry) => {
        const bias = getBiasById(entry.biasId);

        return (
          <View key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryBias}>{bias.name}</Text>
              <Text style={styles.entryDate}>{formatEntryDate(entry.createdAt)}</Text>
            </View>
            <Text style={styles.entryText}>{entry.text}</Text>
          </View>
        );
      })}
    </View>
  );
}

function CollectionScreen({
  entryCountByBias,
  unlockedBiasIds,
  onFocusBias,
}: {
  entryCountByBias: Map<string, number>;
  unlockedBiasIds: Set<string>;
  onFocusBias: (biasId: string) => void;
}) {
  return (
    <View style={styles.screenStack}>
      <View style={styles.sectionLabelRow}>
        <Text style={styles.kicker}>Collection</Text>
        <Text style={styles.contextLabel}>{unlockedBiasIds.size} unlocked</Text>
      </View>

      {categories.map((category) => {
        const categoryBiases = biases.filter((bias) => bias.category === category);

        return (
          <View key={category} style={styles.collectionGroup}>
            <Text style={styles.collectionTitle}>{category}</Text>
            {categoryBiases.map((bias) => {
              const isUnlocked = unlockedBiasIds.has(bias.id);
              const entryCount = entryCountByBias.get(bias.id) ?? 0;

              return (
                <Pressable
                  accessibilityRole="button"
                  disabled={!isUnlocked}
                  key={bias.id}
                  onPress={() => onFocusBias(bias.id)}
                  style={({ pressed }) => [
                    styles.collectionItem,
                    !isUnlocked ? styles.collectionItemLocked : null,
                    pressed && isUnlocked ? styles.pressed : null,
                  ]}
                >
                  <View style={styles.collectionCopy}>
                    <Text style={isUnlocked ? styles.collectionName : styles.collectionNameLocked}>
                      {bias.name}
                    </Text>
                    <Text style={styles.collectionMeta}>
                      {isUnlocked ? `${entryCount} journal entries` : 'Unlock through daily practice'}
                    </Text>
                  </View>
                  <Text style={isUnlocked ? styles.collectionAction : styles.collectionActionLocked}>
                    {isUnlocked ? 'Review' : 'Locked'}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#F7F4EC',
    flex: 1,
  },
  scrollContent: {
    gap: 22,
    paddingBottom: 108,
    paddingHorizontal: 20,
    paddingTop: 68,
  },
  header: {
    gap: 12,
  },
  brandRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  blindspotMark: {
    alignItems: 'center',
    backgroundColor: '#25231D',
    borderCurve: 'continuous',
    borderRadius: 999,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  blindspotCore: {
    backgroundColor: '#F7F4EC',
    borderCurve: 'continuous',
    borderRadius: 999,
    height: 12,
    opacity: 0.72,
    width: 12,
  },
  brand: {
    color: '#25231D',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0,
  },
  headerText: {
    color: '#5F5C52',
    fontSize: 17,
    lineHeight: 25,
  },
  screenStack: {
    gap: 16,
  },
  sectionLabelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  kicker: {
    color: '#246B65',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  contextLabel: {
    color: '#777368',
    flexShrink: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  biasCard: {
    backgroundColor: '#FFFDF7',
    borderColor: '#E1D9C7',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    gap: 18,
    padding: 20,
  },
  biasTitle: {
    color: '#25231D',
    fontSize: 31,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 36,
  },
  biasStory: {
    color: '#34312A',
    fontSize: 19,
    lineHeight: 29,
  },
  definitionBox: {
    backgroundColor: '#E9F0EA',
    borderColor: '#C8D8D2',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 14,
  },
  definitionLabel: {
    color: '#246B65',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  definitionText: {
    color: '#25231D',
    fontSize: 16,
    lineHeight: 24,
  },
  reflectionCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E4DED0',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    gap: 14,
    padding: 18,
  },
  cardLabel: {
    color: '#7C4A28',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  reflectionQuestion: {
    color: '#25231D',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  journalInput: {
    backgroundColor: '#F7F4EC',
    borderColor: '#D8CFBC',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    color: '#25231D',
    fontSize: 16,
    lineHeight: 23,
    minHeight: 118,
    padding: 14,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#25231D',
    borderCurve: 'continuous',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  primaryButtonText: {
    color: '#FFFDF7',
    fontSize: 16,
    fontWeight: '800',
  },
  disabledButton: {
    backgroundColor: '#AAA59A',
  },
  tellCard: {
    backgroundColor: '#EDF4F6',
    borderColor: '#C5D7DD',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 18,
  },
  tellText: {
    color: '#25231D',
    fontSize: 17,
    lineHeight: 25,
  },
  practiceCard: {
    backgroundColor: '#FFFDF7',
    borderColor: '#E1D9C7',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    gap: 18,
    padding: 20,
  },
  scenarioText: {
    color: '#25231D',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 31,
  },
  answerStack: {
    gap: 10,
  },
  answerButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D8CFBC',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  answerButtonCorrect: {
    backgroundColor: '#E1F1E3',
    borderColor: '#81B48A',
  },
  answerButtonWrong: {
    backgroundColor: '#F7E8E3',
    borderColor: '#C98972',
  },
  answerText: {
    color: '#25231D',
    fontSize: 17,
    fontWeight: '700',
  },
  feedbackCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E4DED0',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    gap: 13,
    padding: 18,
  },
  feedbackText: {
    color: '#34312A',
    fontSize: 17,
    lineHeight: 25,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#EDF4F6',
    borderColor: '#C5D7DD',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: '#195D66',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyCard: {
    backgroundColor: '#FFFDF7',
    borderColor: '#E1D9C7',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 18,
  },
  emptyTitle: {
    color: '#25231D',
    fontSize: 21,
    fontWeight: '800',
  },
  emptyText: {
    color: '#5F5C52',
    fontSize: 16,
    lineHeight: 24,
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E4DED0',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  entryHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  entryBias: {
    color: '#25231D',
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
  },
  entryDate: {
    color: '#777368',
    fontSize: 13,
    fontWeight: '700',
  },
  entryText: {
    color: '#34312A',
    fontSize: 16,
    lineHeight: 24,
  },
  collectionGroup: {
    gap: 10,
  },
  collectionTitle: {
    color: '#25231D',
    fontSize: 18,
    fontWeight: '800',
  },
  collectionItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E4DED0',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    padding: 15,
  },
  collectionItemLocked: {
    backgroundColor: '#F0EDE5',
  },
  collectionCopy: {
    flex: 1,
    gap: 4,
  },
  collectionName: {
    color: '#25231D',
    fontSize: 16,
    fontWeight: '800',
  },
  collectionNameLocked: {
    color: '#8D8B82',
    fontSize: 16,
    fontWeight: '800',
  },
  collectionMeta: {
    color: '#777368',
    fontSize: 13,
    fontWeight: '600',
  },
  collectionAction: {
    color: '#246B65',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  collectionActionLocked: {
    color: '#8D8B82',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  tabBar: {
    backgroundColor: '#FFFDF7',
    borderColor: '#DDD4C3',
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    gap: 8,
    left: 0,
    paddingBottom: 28,
    paddingHorizontal: 12,
    paddingTop: 12,
    position: 'absolute',
    right: 0,
  },
  tabButton: {
    alignItems: 'center',
    borderCurve: 'continuous',
    borderRadius: 8,
    flex: 1,
    minHeight: 46,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  tabButtonActive: {
    backgroundColor: '#25231D',
  },
  tabButtonInactive: {
    backgroundColor: '#F0EDE5',
  },
  tabTextActive: {
    color: '#FFFDF7',
    fontSize: 12,
    fontWeight: '900',
  },
  tabTextInactive: {
    color: '#5F5C52',
    fontSize: 12,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.72,
  },
});

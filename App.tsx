import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  Bias,
  biases,
  categories,
  challenges,
  getBiasById,
  getBiasFeature,
  getDailyBias,
  lifeContexts,
} from './src/data/biases';
import { loadJournalEntries, saveJournalEntries } from './src/storage/journal';
import { ContextFilter, JournalEntry, Tab } from './src/types';

type CollectionSection = {
  title: string;
  data: Bias[];
};

const tabs: Tab[] = ['Today', 'Practice', 'Journal', 'Collection'];

function formatEntryDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export default function App() {
  const todayBias = getDailyBias();
  const [activeTab, setActiveTab] = useState<Tab>('Today');
  const [focusBiasId, setFocusBiasId] = useState(todayBias.id);
  const [journalDraft, setJournalDraft] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [hasLoadedEntries, setHasLoadedEntries] = useState(false);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [collectionQuery, setCollectionQuery] = useState('');
  const [contextFilter, setContextFilter] = useState<ContextFilter>('All');

  const focusBias = getBiasById(focusBiasId);
  const challenge = challenges[challengeIndex];
  const trimmedDraft = journalDraft.trim();

  const seenBiasIds = useMemo(() => {
    const ids = new Set<string>([todayBias.id]);
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
        const savedEntries = await loadJournalEntries();

        if (isMounted) {
          setEntries(savedEntries);
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

    if (editingEntryId) {
      const nextEntries = entries.map((entry) =>
        entry.id === editingEntryId
          ? {
              ...entry,
              biasId: focusBias.id,
              text: trimmedDraft,
              updatedAt: new Date().toISOString(),
            }
          : entry,
      );

      setEntries(nextEntries);
      setEditingEntryId(null);
      setJournalDraft('');
      await saveJournalEntries(nextEntries);
      setActiveTab('Journal');
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
    await saveJournalEntries(nextEntries);
    setActiveTab('Journal');
  }

  async function deleteEntry(entryId: string) {
    const nextEntries = entries.filter((entry) => entry.id !== entryId);
    setEntries(nextEntries);

    if (editingEntryId === entryId) {
      setEditingEntryId(null);
      setJournalDraft('');
    }

    await saveJournalEntries(nextEntries);
  }

  function startEditingEntry(entry: JournalEntry) {
    setFocusBiasId(entry.biasId);
    setJournalDraft(entry.text);
    setEditingEntryId(entry.id);
    setActiveTab('Today');
  }

  function cancelEditingEntry() {
    setEditingEntryId(null);
    setJournalDraft('');
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
          entryCount={entries.length}
          isEditing={editingEntryId !== null}
          isToday={focusBias.id === todayBias.id}
          seenCount={seenBiasIds.size}
          draft={journalDraft}
          onCancelEdit={cancelEditingEntry}
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
          challengeIndex={challengeIndex}
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
          onDeleteEntry={deleteEntry}
          onEditEntry={startEditingEntry}
          onNewEntry={() => setActiveTab('Today')}
        />
      );
    }

    return (
      <CollectionScreen
        contextFilter={contextFilter}
        entryCountByBias={entryCountByBias}
        query={collectionQuery}
        seenBiasIds={seenBiasIds}
        onContextFilterChange={setContextFilter}
        onFocusBias={(biasId) => {
          setFocusBiasId(biasId);
          setActiveTab('Today');
        }}
        onQueryChange={setCollectionQuery}
      />
    );
  }

  if (activeTab === 'Collection') {
    return (
      <View style={styles.app}>
        <StatusBar style="dark" />
        {renderContent()}
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
    );
  }

  return (
    <View style={styles.app}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
      >
        <AppHeader />

        {renderContent()}
      </ScrollView>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}

function AppHeader() {
  return (
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
  );
}

function TabBar({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <Pressable
            key={tab}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            onPress={() => onTabChange(tab)}
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
  );
}

function TodayScreen({
  bias,
  entryCount,
  isEditing,
  isToday,
  seenCount,
  draft,
  onCancelEdit,
  onDraftChange,
  onSave,
  canSave,
}: {
  bias: Bias;
  entryCount: number;
  isEditing: boolean;
  isToday: boolean;
  seenCount: number;
  draft: string;
  onCancelEdit: () => void;
  onDraftChange: (value: string) => void;
  onSave: () => void;
  canSave: boolean;
}) {
  const feature = getBiasFeature(bias);

  return (
    <View style={styles.screenStack}>
      <View style={styles.sectionLabelRow}>
        <Text style={styles.kicker}>{isToday ? "Today's bias" : 'Selected bias'}</Text>
        <Text style={styles.contextLabel}>#{bias.order} / {biases.length}</Text>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{seenCount}</Text>
          <Text style={styles.metricLabel}>noticed</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{entryCount}</Text>
          <Text style={styles.metricLabel}>journaled</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{biases.length}</Text>
          <Text style={styles.metricLabel}>biases</Text>
        </View>
      </View>

      <View style={styles.biasCard}>
        <View style={styles.biasMetaRow}>
          <Text style={styles.biasMeta}>{bias.lifeContext}</Text>
          <Text style={styles.biasMeta}>{bias.category}</Text>
        </View>
        <Text style={styles.biasTitle}>{bias.name}</Text>
        <Text style={styles.biasStory}>{feature.story}</Text>
        <View style={styles.definitionBox}>
          <Text style={styles.definitionLabel}>What is happening</Text>
          <Text style={styles.definitionText}>{bias.definition}</Text>
        </View>
      </View>

      <View style={styles.reflectionCard}>
        <View style={styles.reflectionHeader}>
          <Text style={styles.cardLabel}>{isEditing ? 'Edit entry' : 'Reflection'}</Text>
          {isEditing ? (
            <Pressable
              accessibilityRole="button"
              onPress={onCancelEdit}
              style={({ pressed }) => [styles.inlineButton, pressed ? styles.pressed : null]}
            >
              <Text style={styles.inlineButtonText}>Cancel</Text>
            </Pressable>
          ) : null}
        </View>
        <Text style={styles.reflectionQuestion}>{feature.reflection}</Text>
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
          <Text style={styles.primaryButtonText}>
            {isEditing ? 'Save changes' : 'Save journal entry'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.tellCard}>
        <Text style={styles.cardLabel}>Everyday tell</Text>
        <Text style={styles.tellText}>{feature.everydayTell}</Text>
      </View>
    </View>
  );
}

function PracticeScreen({
  challenge,
  challengeIndex,
  selectedAnswer,
  onSelectAnswer,
  onNextChallenge,
}: {
  challenge: (typeof challenges)[number];
  challengeIndex: number;
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
        <Text style={styles.contextLabel}>
          {challengeIndex + 1} / {challenges.length}
        </Text>
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
  onDeleteEntry,
  onEditEntry,
  onNewEntry,
}: {
  entries: JournalEntry[];
  hasLoadedEntries: boolean;
  onDeleteEntry: (entryId: string) => void;
  onEditEntry: (entry: JournalEntry) => void;
  onNewEntry: () => void;
}) {
  function confirmDeleteEntry(entryId: string) {
    Alert.alert('Delete entry?', 'This removes the journal entry from this device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDeleteEntry(entryId) },
    ]);
  }

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
            <View style={styles.entryActions}>
              <Pressable
                accessibilityRole="button"
                onPress={() => onEditEntry(entry)}
                style={({ pressed }) => [styles.entryActionButton, pressed ? styles.pressed : null]}
              >
                <Text style={styles.entryActionText}>Edit</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => confirmDeleteEntry(entry.id)}
                style={({ pressed }) => [
                  styles.entryActionButton,
                  styles.entryDeleteButton,
                  pressed ? styles.pressed : null,
                ]}
              >
                <Text style={styles.entryDeleteText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function CollectionScreen({
  contextFilter,
  entryCountByBias,
  query,
  seenBiasIds,
  onContextFilterChange,
  onFocusBias,
  onQueryChange,
}: {
  contextFilter: ContextFilter;
  entryCountByBias: Map<string, number>;
  query: string;
  seenBiasIds: Set<string>;
  onContextFilterChange: (context: ContextFilter) => void;
  onFocusBias: (biasId: string) => void;
  onQueryChange: (value: string) => void;
}) {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredBiases = biases.filter((bias) => {
    const matchesContext = contextFilter === 'All' || bias.lifeContext === contextFilter;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      bias.name.toLowerCase().includes(normalizedQuery) ||
      bias.definition.toLowerCase().includes(normalizedQuery) ||
      bias.category.toLowerCase().includes(normalizedQuery) ||
      bias.lifeContext.toLowerCase().includes(normalizedQuery);

    return matchesContext && matchesQuery;
  });
  const sections: CollectionSection[] = categories
    .map((category) => ({
      title: category,
      data: filteredBiases.filter((bias) => bias.category === category),
    }))
    .filter((section) => section.data.length > 0);

  function renderBiasItem({ item }: ListRenderItemInfo<Bias>) {
    const entryCount = entryCountByBias.get(item.id) ?? 0;
    const hasSeen = seenBiasIds.has(item.id);

    return (
      <Pressable
        accessibilityRole="button"
        onPress={() => onFocusBias(item.id)}
        style={({ pressed }) => [styles.collectionItem, pressed ? styles.pressed : null]}
      >
        <View style={styles.collectionCopy}>
          <View style={styles.collectionNameRow}>
            <Text style={styles.collectionName}>{item.name}</Text>
            <Text style={hasSeen ? styles.collectionSeen : styles.collectionUnseen}>
              {hasSeen ? 'Seen' : 'New'}
            </Text>
          </View>
          <Text style={styles.collectionDefinition}>{item.definition}</Text>
          <Text style={styles.collectionMeta}>
            {item.lifeContext} - {entryCount} journal entries
          </Text>
        </View>
      </Pressable>
    );
  }

  function renderSectionHeader({ section }: { section: CollectionSection }) {
    return (
      <View style={styles.collectionSectionHeader}>
        <Text style={styles.collectionTitle}>{section.title}</Text>
        <Text style={styles.collectionCount}>{section.data.length}</Text>
      </View>
    );
  }

  return (
    <SectionList
      contentContainerStyle={styles.collectionContent}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No matching biases</Text>
          <Text style={styles.emptyText}>
            Try a broader search term or switch the context filter back to All.
          </Text>
        </View>
      }
      ListHeaderComponent={
        <View style={styles.collectionHeaderStack}>
          <AppHeader />
          <View style={styles.sectionLabelRow}>
            <Text style={styles.kicker}>Collection</Text>
            <Text style={styles.contextLabel}>
              {filteredBiases.length} / {biases.length}
            </Text>
          </View>
          <View style={styles.collectionSearchCard}>
            <TextInput
              onChangeText={onQueryChange}
              placeholder="Search biases, definitions, or contexts"
              placeholderTextColor="#8D8B82"
              style={styles.searchInput}
              value={query}
            />
            <FlatList
              data={['All' as ContextFilter, ...lifeContexts]}
              horizontal
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isActive = contextFilter === item;

                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                    onPress={() => onContextFilterChange(item)}
                    style={({ pressed }) => [
                      styles.filterChip,
                      isActive ? styles.filterChipActive : null,
                      pressed ? styles.pressed : null,
                    ]}
                  >
                    <Text style={isActive ? styles.filterChipTextActive : styles.filterChipText}>
                      {item}
                    </Text>
                  </Pressable>
                );
              }}
              showsHorizontalScrollIndicator={false}
              style={styles.filterList}
            />
          </View>
        </View>
      }
      renderItem={renderBiasItem}
      renderSectionHeader={renderSectionHeader}
      sections={sections}
      stickySectionHeadersEnabled={false}
    />
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
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E4DED0',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: 4,
    padding: 13,
  },
  metricValue: {
    color: '#25231D',
    fontSize: 22,
    fontWeight: '900',
  },
  metricLabel: {
    color: '#777368',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
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
  biasMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  biasMeta: {
    backgroundColor: '#F0EDE5',
    borderCurve: 'continuous',
    borderRadius: 8,
    color: '#5F5C52',
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 6,
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
  reflectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineButton: {
    backgroundColor: '#F0EDE5',
    borderCurve: 'continuous',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  inlineButtonText: {
    color: '#5F5C52',
    fontSize: 12,
    fontWeight: '900',
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
  entryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  entryActionButton: {
    backgroundColor: '#EDF4F6',
    borderColor: '#C5D7DD',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  entryDeleteButton: {
    backgroundColor: '#F7E8E3',
    borderColor: '#C98972',
  },
  entryActionText: {
    color: '#195D66',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  entryDeleteText: {
    color: '#8F3E2C',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  collectionContent: {
    gap: 14,
    paddingBottom: 108,
    paddingHorizontal: 20,
    paddingTop: 68,
  },
  collectionHeaderStack: {
    gap: 18,
  },
  collectionSearchCard: {
    backgroundColor: '#FFFDF7',
    borderColor: '#E1D9C7',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D8CFBC',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    color: '#25231D',
    fontSize: 16,
    minHeight: 46,
    paddingHorizontal: 13,
  },
  filterList: {
    marginHorizontal: -2,
  },
  filterChip: {
    backgroundColor: '#F0EDE5',
    borderColor: '#DDD4C3',
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 2,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  filterChipActive: {
    backgroundColor: '#25231D',
    borderColor: '#25231D',
  },
  filterChipText: {
    color: '#5F5C52',
    fontSize: 13,
    fontWeight: '800',
  },
  filterChipTextActive: {
    color: '#FFFDF7',
    fontSize: 13,
    fontWeight: '900',
  },
  collectionGroup: {
    gap: 10,
  },
  collectionSectionHeader: {
    alignItems: 'center',
    backgroundColor: '#F7F4EC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 2,
    paddingTop: 8,
  },
  collectionTitle: {
    color: '#25231D',
    fontSize: 18,
    fontWeight: '800',
  },
  collectionCount: {
    color: '#777368',
    fontSize: 13,
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
  collectionNameRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  collectionName: {
    color: '#25231D',
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
  },
  collectionSeen: {
    backgroundColor: '#E1F1E3',
    borderCurve: 'continuous',
    borderRadius: 8,
    color: '#246B65',
    fontSize: 11,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 4,
    textTransform: 'uppercase',
  },
  collectionUnseen: {
    backgroundColor: '#F0EDE5',
    borderCurve: 'continuous',
    borderRadius: 8,
    color: '#777368',
    fontSize: 11,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 4,
    textTransform: 'uppercase',
  },
  collectionDefinition: {
    color: '#34312A',
    fontSize: 15,
    lineHeight: 22,
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

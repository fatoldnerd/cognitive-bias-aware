import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { enableScreens } from 'react-native-screens';

import { AppHeader } from './src/components/AppHeader';
import { TabBar } from './src/components/TabBar';
import { biases, challenges, getBiasById, getDailyBias } from './src/data/biases';
import { RootStackParamList } from './src/navigation/types';
import { BiasDetailScreen } from './src/screens/BiasDetailScreen';
import { CollectionScreen } from './src/screens/CollectionScreen';
import { JournalScreen } from './src/screens/JournalScreen';
import { PracticeScreen } from './src/screens/PracticeScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { TodayScreen } from './src/screens/TodayScreen';
import { loadJournalEntries, saveJournalEntries } from './src/storage/journal';
import { styles } from './src/theme';
import { ContextFilter, JournalEntry, Tab } from './src/types';

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme: Theme = {
  dark: false,
  colors: {
    primary: '#25231D',
    background: '#F7F4EC',
    card: '#FFFDF7',
    text: '#25231D',
    border: '#DDD4C3',
    notification: '#246B65',
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'System',
      fontWeight: '800',
    },
  },
};

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

  function startJournalForBias(biasId: string) {
    setFocusBiasId(biasId);
    setJournalDraft('');
    setEditingEntryId(null);
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

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          contentStyle: styles.stackContent,
          headerLargeTitle: true,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {({ navigation }) => (
            <MainScreen
              activeTab={activeTab}
              challengeIndex={challengeIndex}
              collectionQuery={collectionQuery}
              contextFilter={contextFilter}
              editingEntryId={editingEntryId}
              entries={entries}
              entryCountByBias={entryCountByBias}
              focusBias={focusBias}
              hasLoadedEntries={hasLoadedEntries}
              journalDraft={journalDraft}
              seenBiasIds={seenBiasIds}
              selectedAnswer={selectedAnswer}
              todayBiasId={todayBias.id}
              onCancelEdit={cancelEditingEntry}
              onContextFilterChange={setContextFilter}
              onDeleteEntry={deleteEntry}
              onDraftChange={setJournalDraft}
              onEditEntry={startEditingEntry}
              onNewJournalEntry={() => setActiveTab('Today')}
              onNextChallenge={moveToNextChallenge}
              onOpenBias={(biasId) => navigation.navigate('BiasDetail', { biasId })}
              onOpenSettings={() => navigation.navigate('Settings')}
              onQueryChange={setCollectionQuery}
              onSaveEntry={saveEntry}
              onSelectAnswer={setSelectedAnswer}
              onTabChange={setActiveTab}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="BiasDetail"
          options={({ route }) => ({
            title: getBiasById(route.params.biasId).name,
          })}
        >
          {({ navigation, route }) => {
            const bias = getBiasById(route.params.biasId);

            return (
              <BiasDetailScreen
                bias={bias}
                entryCount={entryCountByBias.get(bias.id) ?? 0}
                hasSeen={seenBiasIds.has(bias.id)}
                onJournalBias={(biasId) => {
                  startJournalForBias(biasId);
                  navigation.navigate('Main');
                }}
              />
            );
          }}
        </Stack.Screen>
        <Stack.Screen name="Settings" options={{ title: 'Settings' }}>
          {() => (
            <SettingsScreen
              entryCount={entries.length}
              seenCount={seenBiasIds.size}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({
  activeTab,
  challengeIndex,
  collectionQuery,
  contextFilter,
  editingEntryId,
  entries,
  entryCountByBias,
  focusBias,
  hasLoadedEntries,
  journalDraft,
  seenBiasIds,
  selectedAnswer,
  todayBiasId,
  onCancelEdit,
  onContextFilterChange,
  onDeleteEntry,
  onDraftChange,
  onEditEntry,
  onNewJournalEntry,
  onNextChallenge,
  onOpenBias,
  onOpenSettings,
  onQueryChange,
  onSaveEntry,
  onSelectAnswer,
  onTabChange,
}: {
  activeTab: Tab;
  challengeIndex: number;
  collectionQuery: string;
  contextFilter: ContextFilter;
  editingEntryId: string | null;
  entries: JournalEntry[];
  entryCountByBias: Map<string, number>;
  focusBias: ReturnType<typeof getBiasById>;
  hasLoadedEntries: boolean;
  journalDraft: string;
  seenBiasIds: Set<string>;
  selectedAnswer: number | null;
  todayBiasId: string;
  onCancelEdit: () => void;
  onContextFilterChange: (context: ContextFilter) => void;
  onDeleteEntry: (entryId: string) => void;
  onDraftChange: (value: string) => void;
  onEditEntry: (entry: JournalEntry) => void;
  onNewJournalEntry: () => void;
  onNextChallenge: () => void;
  onOpenBias: (biasId: string) => void;
  onOpenSettings: () => void;
  onQueryChange: (value: string) => void;
  onSaveEntry: () => void;
  onSelectAnswer: (answerIndex: number) => void;
  onTabChange: (tab: Tab) => void;
}) {
  const challenge = challenges[challengeIndex];
  const canSave = journalDraft.trim().length > 0;

  if (activeTab === 'Collection') {
    return (
      <View style={styles.app}>
        <CollectionScreen
          contextFilter={contextFilter}
          entryCountByBias={entryCountByBias}
          query={collectionQuery}
          seenBiasIds={seenBiasIds}
          onContextFilterChange={onContextFilterChange}
          onOpenBias={onOpenBias}
          onQueryChange={onQueryChange}
        />
        <TabBar activeTab={activeTab} onTabChange={onTabChange} />
      </View>
    );
  }

  return (
    <View style={styles.app}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
      >
        <AppHeader onSettingsPress={onOpenSettings} />

        {activeTab === 'Today' ? (
          <TodayScreen
            bias={focusBias}
            entryCount={entries.length}
            isEditing={editingEntryId !== null}
            isToday={focusBias.id === todayBiasId}
            seenCount={seenBiasIds.size}
            draft={journalDraft}
            onCancelEdit={onCancelEdit}
            onDraftChange={onDraftChange}
            onSave={onSaveEntry}
            canSave={canSave}
          />
        ) : null}

        {activeTab === 'Practice' ? (
          <PracticeScreen
            challenge={challenge}
            challengeIndex={challengeIndex}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            onNextChallenge={onNextChallenge}
          />
        ) : null}

        {activeTab === 'Journal' ? (
          <JournalScreen
            entries={entries}
            hasLoadedEntries={hasLoadedEntries}
            onDeleteEntry={onDeleteEntry}
            onEditEntry={onEditEntry}
            onNewEntry={onNewJournalEntry}
          />
        ) : null}
      </ScrollView>

      <TabBar activeTab={activeTab} onTabChange={onTabChange} />
    </View>
  );
}

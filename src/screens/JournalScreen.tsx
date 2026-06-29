import { Alert, Pressable, Text, View } from 'react-native';

import { getBiasById } from '../data/biases';
import { styles } from '../theme';
import { JournalEntry } from '../types';
import { formatEntryDate } from '../utils/date';

export function JournalScreen({
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

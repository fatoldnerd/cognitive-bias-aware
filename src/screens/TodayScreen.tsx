import { Pressable, Text, TextInput, View } from 'react-native';

import { Bias, biases, getBiasFeature } from '../data/biases';
import { styles } from '../theme';

export function TodayScreen({
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

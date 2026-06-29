import { Pressable, ScrollView, Text, View } from 'react-native';

import { Bias, biases, getBiasFeature } from '../data/biases';
import { styles } from '../theme';

export function BiasDetailScreen({
  bias,
  entryCount,
  hasSeen,
  onJournalBias,
}: {
  bias: Bias;
  entryCount: number;
  hasSeen: boolean;
  onJournalBias: (biasId: string) => void;
}) {
  const feature = getBiasFeature(bias);

  return (
    <ScrollView contentContainerStyle={styles.detailContent} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.sectionLabelRow}>
        <Text style={styles.kicker}>{hasSeen ? 'Seen bias' : 'New bias'}</Text>
        <Text style={styles.contextLabel}>#{bias.order} / {biases.length}</Text>
      </View>

      <View style={styles.biasCard}>
        <View style={styles.biasMetaRow}>
          <Text style={styles.biasMeta}>{bias.lifeContext}</Text>
          <Text style={styles.biasMeta}>{bias.category}</Text>
        </View>
        <Text style={styles.biasTitle}>{bias.name}</Text>
        <Text style={styles.biasStory}>{feature.story}</Text>
        <View style={styles.definitionBox}>
          <Text style={styles.definitionLabel}>Definition</Text>
          <Text style={styles.definitionText}>{bias.definition}</Text>
        </View>
      </View>

      <View style={styles.reflectionCard}>
        <Text style={styles.cardLabel}>Reflection</Text>
        <Text style={styles.reflectionQuestion}>{feature.reflection}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => onJournalBias(bias.id)}
          style={({ pressed }) => [styles.primaryButton, pressed ? styles.pressed : null]}
        >
          <Text style={styles.primaryButtonText}>Journal this bias</Text>
        </Pressable>
      </View>

      <View style={styles.tellCard}>
        <Text style={styles.cardLabel}>Your history</Text>
        <Text style={styles.tellText}>
          {entryCount === 0
            ? 'No journal entries for this bias yet.'
            : `${entryCount} journal entries for this bias.`}
        </Text>
      </View>
    </ScrollView>
  );
}

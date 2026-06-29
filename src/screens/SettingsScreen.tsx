import { ScrollView, Text, View } from 'react-native';

import { biases, challenges } from '../data/biases';
import { styles } from '../theme';

export function SettingsScreen({
  entryCount,
  seenCount,
}: {
  entryCount: number;
  seenCount: number;
}) {
  return (
    <ScrollView contentContainerStyle={styles.detailContent} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.screenStack}>
        <View style={styles.sectionLabelRow}>
          <Text style={styles.kicker}>Settings</Text>
          <Text style={styles.contextLabel}>Local preview</Text>
        </View>

        <View style={styles.biasCard}>
          <Text style={styles.biasTitle}>Blindspot</Text>
          <Text style={styles.biasStory}>
            This build keeps your journal on this device. Cloud sync, notifications, and premium
            features can be added after the local habit loop feels right.
          </Text>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{seenCount}</Text>
            <Text style={styles.metricLabel}>noticed</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{entryCount}</Text>
            <Text style={styles.metricLabel}>entries</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{biases.length}</Text>
            <Text style={styles.metricLabel}>biases</Text>
          </View>
        </View>

        <View style={styles.tellCard}>
          <Text style={styles.cardLabel}>Content</Text>
          <Text style={styles.tellText}>
            {biases.length} biases and {challenges.length} practice scenarios are bundled in the
            app.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

import { Pressable, Text, View } from 'react-native';

import { styles } from '../theme';

export function AppHeader({ onSettingsPress }: { onSettingsPress?: () => void }) {
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <View style={styles.brandLockup}>
          <View style={styles.blindspotMark}>
            <View style={styles.blindspotCore} />
          </View>
          <Text style={styles.brand}>Blindspot</Text>
        </View>
        {onSettingsPress ? (
          <Pressable
            accessibilityRole="button"
            onPress={onSettingsPress}
            style={({ pressed }) => [styles.settingsButton, pressed ? styles.pressed : null]}
          >
            <Text style={styles.settingsButtonText}>Settings</Text>
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.headerText}>
        A daily mirror for the thoughts that move faster than you notice.
      </Text>
    </View>
  );
}

import { Pressable, Text, View } from 'react-native';

import { styles } from '../theme';
import { Tab } from '../types';

const tabs: Tab[] = ['Today', 'Practice', 'Journal', 'Collection'];

export function TabBar({
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

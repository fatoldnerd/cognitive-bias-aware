import { FlatList, ListRenderItemInfo, Pressable, SectionList, Text, TextInput, View } from 'react-native';

import { AppHeader } from '../components/AppHeader';
import { Bias, biases, categories, lifeContexts } from '../data/biases';
import { styles } from '../theme';
import { ContextFilter } from '../types';

type CollectionSection = {
  title: string;
  data: Bias[];
};

export function CollectionScreen({
  contextFilter,
  entryCountByBias,
  query,
  seenBiasIds,
  onContextFilterChange,
  onOpenBias,
  onQueryChange,
}: {
  contextFilter: ContextFilter;
  entryCountByBias: Map<string, number>;
  query: string;
  seenBiasIds: Set<string>;
  onContextFilterChange: (context: ContextFilter) => void;
  onOpenBias: (biasId: string) => void;
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
        onPress={() => onOpenBias(item.id)}
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

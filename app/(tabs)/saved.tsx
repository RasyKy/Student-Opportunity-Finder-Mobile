import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { mockOpportunities } from "../../data/mock-opportunities";
import { useSavedOpportunities } from "../../hooks/use-saved-opportunities";
import { DiscoverTone, Opportunity, TagTone } from "../../types/opportunity";

const tagColors: Record<TagTone, { bg: string; fg: string }> = {
  gold: { bg: "#F8EFCB", fg: "#6C5607" },
  mint: { bg: "#DCEEDD", fg: "#1D5A34" },
  blue: { bg: "#E3E8FB", fg: "#2A3D92" },
  pink: { bg: "#F4E2F7", fg: "#6E3A79" },
};

const heroColors: Record<DiscoverTone, string> = {
  sand: "#EFE6C9",
  lavender: "#DDDDF2",
  rose: "#EBCBED",
  green: "#CFECDD",
  gold: "#F4E7BE",
  pink: "#F1D9F6",
};

function SavedCard({
  item,
  onPress,
  onToggleSaved,
}: {
  item: Opportunity;
  onPress: () => void;
  onToggleSaved: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View
        style={[
          styles.cardLeft,
          { backgroundColor: heroColors[item.discoverTone] },
        ]}
      >
        <Text style={styles.cardEmoji}>{item.emojiIcon}</Text>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.tagRow}>
          {item.tags.slice(0, 2).map((tag) => (
            <View
              key={`${item.id}-${tag.label}`}
              style={[
                styles.tagPill,
                { backgroundColor: tagColors[tag.tone].bg },
              ]}
            >
              <Text style={[styles.tagText, { color: tagColors[tag.tone].fg }]}>
                {tag.label}
              </Text>
            </View>
          ))}
        </View>

        <Text numberOfLines={2} style={styles.cardTitle}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={styles.cardOrg}>
          {item.org}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={14} color="#4F46D8" />
            <Text style={styles.metaText}>{item.subLabel}</Text>
          </View>
          <TouchableOpacity
            style={styles.bookmarkButton}
            activeOpacity={0.8}
            onPress={(event) => {
              event.stopPropagation();
              onToggleSaved();
            }}
          >
            <Ionicons name="bookmark" size={20} color="#E58E26" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function SavedScreen() {
  const router = useRouter();
  const { savedIds, toggleSaved } = useSavedOpportunities();
  const savedItems = savedIds
    .map((id) => mockOpportunities.find((item) => item.id === id))
    .filter((item): item is Opportunity => Boolean(item));

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Saved</Text>
        <Text style={styles.subtitle}>
          Your bookmarked opportunities in one place.
        </Text>

        <View style={styles.counterWrap}>
          <Text style={styles.counterValue}>{savedItems.length}</Text>
          <Text style={styles.counterLabel}>bookmarked opportunities</Text>
        </View>

        {savedItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="bookmark-outline" size={36} color="#9AA1B8" />
            <Text style={styles.emptyTitle}>No saved opportunities yet</Text>
            <Text style={styles.emptySub}>
              Start bookmarking from Discover page.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {savedItems.map((item) => (
              <SavedCard
                key={item.id}
                item={item}
                onToggleSaved={() => toggleSaved(item.id)}
                onPress={() =>
                  router.push({
                    pathname: "/opportunity/[id]",
                    params: { id: item.id },
                  })
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F5F8",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 120,
  },
  title: {
    fontSize: 44,
    letterSpacing: -0.5,
    fontWeight: "800",
    color: "#111B49",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#67708A",
  },
  counterWrap: {
    marginTop: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E4E7F1",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  counterValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E2A70",
  },
  counterLabel: {
    fontSize: 14,
    color: "#5E6784",
    fontWeight: "600",
  },
  list: {
    marginTop: 14,
    gap: 14,
  },
  card: {
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    minHeight: 156,
    shadowColor: "#111B49",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardLeft: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  cardEmoji: {
    fontSize: 34,
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  tagPill: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 21,
    color: "#111B49",
    fontWeight: "800",
  },
  cardOrg: {
    marginTop: 4,
    fontSize: 13,
    color: "#646D89",
    fontWeight: "500",
  },
  cardFooter: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookmarkButton: {
    padding: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    color: "#4F46D8",
    fontSize: 12,
    fontWeight: "700",
  },
  emptyState: {
    marginTop: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E3E5EF",
    backgroundColor: "#FFFFFF",
    paddingVertical: 26,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  emptyTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "800",
    color: "#1A255F",
  },
  emptySub: {
    marginTop: 4,
    fontSize: 14,
    color: "#707995",
  },
});

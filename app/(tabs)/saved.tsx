import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    Platform,
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

const androidTabs = ["Internships", "Full-time", "Contract"] as const;

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

function toDeadlineTimestamp(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? Number.POSITIVE_INFINITY
    : date.getTime();
}

function formatDeadlineBadge(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "OPEN NOW";
  }

  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return `DEADLINE: ${month} ${date.getDate()}`;
}

function SavedCardIOS({
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

function SavedCardAndroid({
  item,
  onPress,
  onToggleSaved,
}: {
  item: Opportunity;
  onPress: () => void;
  onToggleSaved: () => void;
}) {
  return (
    <TouchableOpacity
      style={androidStyles.card}
      activeOpacity={0.92}
      onPress={onPress}
    >
      <View style={androidStyles.cardTopRow}>
        <View style={androidStyles.cardLogoWrap}>
          <View
            style={[
              androidStyles.cardLogo,
              { backgroundColor: heroColors[item.discoverTone] },
            ]}
          >
            <Text style={androidStyles.cardEmoji}>{item.emojiIcon}</Text>
          </View>

          <View style={androidStyles.cardBody}>
            <Text style={androidStyles.deadlineBadge}>
              {formatDeadlineBadge(item.deadline)}
            </Text>
            <Text numberOfLines={1} style={androidStyles.cardTitle}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={androidStyles.cardOrg}>
              {item.org} • {item.location}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={androidStyles.bookmarkButton}
          activeOpacity={0.85}
          onPress={(event) => {
            event.stopPropagation();
            onToggleSaved();
          }}
        >
          <Ionicons name="bookmark-outline" size={20} color="#8FA0B9" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={androidStyles.applyButton}
        activeOpacity={0.9}
        onPress={(event) => {
          event.stopPropagation();
          onPress();
        }}
      >
        <Text style={androidStyles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function SavedScreen() {
  const router = useRouter();
  const isAndroid = Platform.OS === "android";
  const { savedIds, toggleSaved } = useSavedOpportunities();
  const savedItems = savedIds
    .map((id) => mockOpportunities.find((item) => item.id === id))
    .filter((item): item is Opportunity => Boolean(item));

  const sortedSavedItems = [...savedItems].sort(
    (a, b) => toDeadlineTimestamp(a.deadline) - toDeadlineTimestamp(b.deadline),
  );
  const recommendationCount = Math.max(
    mockOpportunities.length - savedItems.length,
    0,
  );

  if (isAndroid) {
    return (
      <SafeAreaView
        style={androidStyles.screen}
        edges={["top", "left", "right"]}
      >
        <StatusBar style="dark" />

        <View style={androidStyles.headerRow}>
          <TouchableOpacity
            style={androidStyles.headerButton}
            activeOpacity={0.86}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#1A2342" />
          </TouchableOpacity>

          <Text
            style={androidStyles.headerTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Saved Opportunities
          </Text>

          <View style={androidStyles.headerActions}>
            <TouchableOpacity
              style={androidStyles.headerButton}
              activeOpacity={0.86}
            >
              <Ionicons name="search-outline" size={21} color="#1A2342" />
            </TouchableOpacity>
            <TouchableOpacity
              style={androidStyles.headerButton}
              activeOpacity={0.86}
            >
              <Ionicons name="funnel-outline" size={20} color="#1A2342" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={androidStyles.tabsRow}>
          <TouchableOpacity style={androidStyles.activeTab} activeOpacity={0.9}>
            <Text style={androidStyles.activeTabText}>
              All ({savedItems.length})
            </Text>
          </TouchableOpacity>

          {androidTabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={androidStyles.tab}
              activeOpacity={0.9}
            >
              <Text style={androidStyles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={androidStyles.tabsDivider} />

        <ScrollView
          contentContainerStyle={androidStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={androidStyles.sectionTitle}>CLOSING SOON</Text>

          {sortedSavedItems.length === 0 ? (
            <View style={androidStyles.emptyState}>
              <Ionicons name="bookmark-outline" size={34} color="#95A4B8" />
              <Text style={androidStyles.emptyTitle}>
                No saved opportunities yet
              </Text>
              <Text style={androidStyles.emptySub}>
                Bookmark opportunities from Search to see them here.
              </Text>
            </View>
          ) : (
            <View style={androidStyles.list}>
              {sortedSavedItems.map((item) => (
                <SavedCardAndroid
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

          {sortedSavedItems.length > 0 ? (
            <View style={androidStyles.recommendationCard}>
              <Text style={androidStyles.recommendationTitle}>
                Need more options?
              </Text>
              <Text style={androidStyles.recommendationSub}>
                Based on your saved roles, we found {recommendationCount} new
                opportunities that match your profile.
              </Text>

              <TouchableOpacity
                style={androidStyles.recommendationButton}
                activeOpacity={0.9}
                onPress={() => router.push("/explore")}
              >
                <Text style={androidStyles.recommendationButtonText}>
                  Explore Recommendations
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }

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
              <SavedCardIOS
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

const androidStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F8",
  },
  headerRow: {
    paddingTop: 6,
    paddingHorizontal: 8,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 4,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    letterSpacing: -0.2,
    color: "#151F3E",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 6,
  },
  activeTab: {
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#3F33B1",
  },
  activeTabText: {
    color: "#322AA6",
    fontSize: 14,
    fontWeight: "700",
  },
  tab: {
    paddingBottom: 8,
  },
  tabText: {
    color: "#63738C",
    fontSize: 14,
    fontWeight: "600",
  },
  tabsDivider: {
    height: 1,
    backgroundColor: "#E0E4EE",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 120,
  },
  sectionTitle: {
    color: "#617189",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginBottom: 14,
  },
  list: {
    gap: 14,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E4E6ED",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: "#0E1A44",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  cardLogoWrap: {
    flex: 1,
    flexDirection: "row",
  },
  cardLogo: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D9DDEA",
    alignItems: "center",
    justifyContent: "center",
  },
  cardEmoji: {
    fontSize: 31,
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
    paddingTop: 2,
  },
  deadlineBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F5E9EE",
    color: "#C23A39",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  cardTitle: {
    color: "#141C38",
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "800",
  },
  cardOrg: {
    marginTop: 2,
    color: "#63738C",
    fontSize: 14,
    fontWeight: "500",
  },
  bookmarkButton: {
    marginLeft: 8,
    paddingTop: 6,
    paddingRight: 2,
  },
  applyButton: {
    borderRadius: 9,
    backgroundColor: "#3D30AC",
    height: 43,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  recommendationCard: {
    marginTop: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#BFC3DA",
    backgroundColor: "#DCDCED",
    paddingHorizontal: 16,
    paddingTop: 26,
    paddingBottom: 20,
    alignItems: "center",
  },
  recommendationTitle: {
    color: "#3C33AE",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  recommendationSub: {
    color: "#4D5B74",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 16,
  },
  recommendationButton: {
    minHeight: 42,
    borderRadius: 9,
    backgroundColor: "#3D30AC",
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  recommendationButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  emptyState: {
    marginTop: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E1E5EE",
    backgroundColor: "#FFFFFF",
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  emptyTitle: {
    marginTop: 10,
    color: "#1B2444",
    fontSize: 18,
    fontWeight: "800",
  },
  emptySub: {
    marginTop: 4,
    color: "#6A7890",
    fontSize: 14,
    textAlign: "center",
  },
});

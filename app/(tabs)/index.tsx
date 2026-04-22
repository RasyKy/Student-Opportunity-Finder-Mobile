import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
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
import { useUserInterests } from "../../hooks/use-user-interests";

type HomeOpportunity = (typeof mockOpportunities)[number];

type CategoryItem = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
  bg: string;
  border: string;
};

const categories: CategoryItem[] = [
  {
    id: "scholarships",
    title: "Scholarships",
    icon: "school-outline",
    tint: "#5A54D6",
    bg: "#EFEFFE",
    border: "#D9D8FA",
  },
  {
    id: "internships",
    title: "Internships",
    icon: "briefcase-outline",
    tint: "#D07800",
    bg: "#F8F2EA",
    border: "#F1DEC8",
  },
  {
    id: "volunteer",
    title: "Volunteering",
    icon: "heart-outline",
    tint: "#5A54D6",
    bg: "#EFEFFE",
    border: "#D9D8FA",
  },
];

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function toSearchText(item: HomeOpportunity) {
  return [
    item.title,
    item.org,
    item.typeTag,
    item.searchType,
    item.location,
    item.format,
    item.tags.map((tag) => tag.label).join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

const interestMatchers: Record<string, (item: HomeOpportunity) => boolean> = {
  scholarships: (item) => {
    const text = toSearchText(item);
    return text.includes("scholarship");
  },
  events: (item) => {
    const text = toSearchText(item);
    return text.includes("event") || text.includes("summit");
  },
  internships: (item) => {
    const text = toSearchText(item);
    return text.includes("internship");
  },
  volunteering: (item) => {
    const text = toSearchText(item);
    return text.includes("volunteer") || text.includes("community");
  },
  courses: (item) => {
    const text = toSearchText(item);
    return text.includes("course") || text.includes("bootcamp");
  },
  online: (item) => item.format.toLowerCase() === "online",
  "in-person": (item) => item.format.toLowerCase() === "in-person",
  hybrid: (item) => item.format.toLowerCase() === "hybrid",
  "web-dev": (item) => {
    const text = toSearchText(item);
    return includesAny(text, [
      "web",
      "full stack",
      "fullstack",
      "software",
      "developer",
      "programming",
      "coding",
    ]);
  },
  business: (item) => {
    const text = toSearchText(item);
    return includesAny(text, [
      "business",
      "leadership",
      "management",
      "analytics",
      "entrepreneur",
    ]);
  },
  "social-work": (item) => {
    const text = toSearchText(item);
    return includesAny(text, [
      "social",
      "community",
      "public",
      "volunteer",
      "outreach",
      "youth",
    ]);
  },
  healthcare: (item) => {
    const text = toSearchText(item);
    return includesAny(text, ["health", "medical", "care", "medicine"]);
  },
  arts: (item) => {
    const text = toSearchText(item);
    return includesAny(text, ["art", "design", "creative", "music", "tedx"]);
  },
  technology: (item) => {
    const text = toSearchText(item);
    return includesAny(text, [
      "tech",
      "technology",
      "digital",
      "stem",
      "engineering",
      "data",
      "software",
      "google",
    ]);
  },
};

function scoreByInterests(
  item: HomeOpportunity,
  selectedInterestIds: Set<string>,
) {
  let score = 0;

  selectedInterestIds.forEach((id) => {
    const matcher = interestMatchers[id];
    if (matcher && matcher(item)) {
      score += 1;
    }
  });

  return score;
}

function pickByBuckets(
  opportunities: HomeOpportunity[],
  buckets: string[],
  limit: number,
) {
  const bucketSet = new Set(buckets);

  const primary = opportunities.filter((item) =>
    item.featuredIn.some((bucket) => bucketSet.has(bucket)),
  );

  if (primary.length >= limit) {
    return primary.slice(0, limit);
  }

  const takenIds = new Set(primary.map((item) => item.id));
  const fallback = opportunities
    .filter((item) => !takenIds.has(item.id))
    .slice(0, limit - primary.length);

  return [...primary, ...fallback];
}

const iosTagColors = {
  gold: { bg: "#F8EFCB", fg: "#6C5607" },
  mint: { bg: "#DCEEDD", fg: "#1D5A34" },
  blue: { bg: "#E3E8FB", fg: "#2A3D92" },
  pink: { bg: "#F4E2F7", fg: "#6E3A79" },
} as const;

function IOSSectionHeader({
  title,
  action,
}: {
  title: string;
  action: string;
}) {
  return (
    <View style={iosStyles.sectionHeader}>
      <Text style={iosStyles.sectionTitle}>{title}</Text>
      <TouchableOpacity activeOpacity={0.9}>
        <Text style={iosStyles.sectionAction}>{action}</Text>
      </TouchableOpacity>
    </View>
  );
}

function IOSFeedCard({
  item,
  bookmarked,
  onPress,
  onToggleSaved,
}: {
  item: HomeOpportunity;
  bookmarked: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
}) {
  return (
    <TouchableOpacity
      style={iosStyles.feedCard}
      activeOpacity={0.92}
      onPress={onPress}
    >
      <View style={[iosStyles.feedHero, { backgroundColor: item.heroTop }]}>
        <Text style={iosStyles.feedEmoji}>{item.emojiIcon}</Text>
      </View>

      <View style={iosStyles.feedBody}>
        <View style={iosStyles.feedTagRow}>
          {item.tags.slice(0, 2).map((tag) => {
            const tone = iosTagColors[tag.tone as keyof typeof iosTagColors];
            return (
              <View
                key={`${item.id}-${tag.label}`}
                style={[iosStyles.feedTag, { backgroundColor: tone.bg }]}
              >
                <Text style={[iosStyles.feedTagText, { color: tone.fg }]}>
                  {tag.label}
                </Text>
              </View>
            );
          })}
        </View>

        <Text numberOfLines={2} style={iosStyles.feedTitle}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={iosStyles.feedOrg}>
          {item.org}
        </Text>

        <View style={iosStyles.feedFooter}>
          {item.subLabel.includes("left") ? (
            <View style={iosStyles.deadlinePill}>
              <Ionicons name="time-outline" size={12} color="#D38700" />
              <Text style={iosStyles.deadlinePillText}>{item.subLabel}</Text>
            </View>
          ) : (
            <Text style={iosStyles.feedDate}>{item.subLabel}</Text>
          )}
          <TouchableOpacity
            style={iosStyles.bookmarkButton}
            activeOpacity={0.8}
            onPress={(event) => {
              event.stopPropagation();
              onToggleSaved();
            }}
          >
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={18}
              color={bookmarked ? "#E58E26" : "#B4A8E7"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function IOSDiscoverRow({
  item,
  bookmarked,
  onPress,
  onToggleSaved,
}: {
  item: HomeOpportunity;
  bookmarked: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
}) {
  return (
    <TouchableOpacity
      style={iosStyles.discoverCard}
      activeOpacity={0.92}
      onPress={onPress}
    >
      <View style={[iosStyles.discoverLeft, { backgroundColor: item.heroTop }]}>
        <Text style={iosStyles.discoverEmoji}>{item.emojiIcon}</Text>
      </View>

      <View style={iosStyles.discoverBody}>
        <View style={iosStyles.feedTagRow}>
          {item.tags.slice(0, 2).map((tag) => {
            const tone = iosTagColors[tag.tone as keyof typeof iosTagColors];
            return (
              <View
                key={`${item.id}-${tag.label}`}
                style={[iosStyles.feedTag, { backgroundColor: tone.bg }]}
              >
                <Text style={[iosStyles.feedTagText, { color: tone.fg }]}>
                  {tag.label}
                </Text>
              </View>
            );
          })}
        </View>

        <Text numberOfLines={2} style={iosStyles.discoverTitle}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={iosStyles.feedOrg}>
          {item.org}
        </Text>

        <View style={iosStyles.feedFooter}>
          {item.subLabel.includes("left") ? (
            <View style={iosStyles.deadlinePill}>
              <Ionicons name="time-outline" size={12} color="#D38700" />
              <Text style={iosStyles.deadlinePillText}>{item.subLabel}</Text>
            </View>
          ) : (
            <Text style={iosStyles.feedDate}>{item.subLabel}</Text>
          )}
          <TouchableOpacity
            style={iosStyles.bookmarkButton}
            activeOpacity={0.8}
            onPress={(event) => {
              event.stopPropagation();
              onToggleSaved();
            }}
          >
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={18}
              color={bookmarked ? "#E58E26" : "#B4A8E7"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function SectionHeader({ title, action }: { title: string; action: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity activeOpacity={0.9}>
        <Text style={styles.sectionAction}>{action}</Text>
      </TouchableOpacity>
    </View>
  );
}

function FeaturedCard({
  item,
  onPress,
}: {
  item: HomeOpportunity;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.featuredCard}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={[styles.featuredHero, { backgroundColor: item.heroColor }]}>
        <Text style={styles.featuredEmoji}>{item.emojiIcon}</Text>
        <View style={styles.featuredTagWrap}>
          <Text style={styles.featuredTag}>{item.typeTag.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.featuredOverlay}>
        <Text numberOfLines={2} style={styles.featuredTitle}>
          {item.title}
        </Text>
        <View style={styles.featuredMetaRow}>
          <Ionicons name="location-outline" size={14} color="#FFFFFF" />
          <Text numberOfLines={1} style={styles.featuredOrg}>
            {item.org}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function CategoryCard({ item }: { item: CategoryItem }) {
  return (
    <View
      style={[
        styles.categoryCard,
        { backgroundColor: item.bg, borderColor: item.border },
      ]}
    >
      <View style={styles.categoryIconCircle}>
        <Ionicons name={item.icon} size={26} color={item.tint} />
      </View>
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </View>
  );
}

function RecentCard({
  item,
  onPress,
}: {
  item: HomeOpportunity;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.recentCard}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={[styles.recentHero, { backgroundColor: item.heroTop }]}>
        <Text style={styles.recentEmoji}>{item.emojiIcon}</Text>
      </View>

      <View style={styles.recentBody}>
        <View style={styles.recentTagRow}>
          {item.tags.slice(0, 2).map((tag) => (
            <View key={`${item.id}-${tag.label}`} style={styles.smallTag}>
              <Text style={styles.smallTagText}>{tag.label.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <Text numberOfLines={2} style={styles.recentTitle}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={styles.recentOrg}>
          {item.org}
        </Text>

        <View style={styles.recentDateRow}>
          <Ionicons name="time-outline" size={14} color="#4F46D8" />
          <Text style={styles.recentDate}>{item.subLabel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const isIOS = Platform.OS === "ios";
  const { isSaved, toggleSaved } = useSavedOpportunities();
  const { selectedIdSet } = useUserInterests();

  const rankedOpportunities = useMemo(() => {
    const scored = mockOpportunities.map((item, index) => ({
      item,
      index,
      score: scoreByInterests(item, selectedIdSet),
    }));

    const matched = scored.filter((entry) => entry.score > 0);
    const source = matched.length > 0 ? matched : scored;

    return source
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .map((entry) => entry.item);
  }, [selectedIdSet]);

  const featuredItems = useMemo(
    () =>
      pickByBuckets(
        rankedOpportunities,
        ["recent", "recommended", "discover"],
        3,
      ),
    [rankedOpportunities],
  );

  const recentItems = useMemo(
    () => pickByBuckets(rankedOpportunities, ["recent", "discover"], 4),
    [rankedOpportunities],
  );

  const iosRecentItems = useMemo(
    () => pickByBuckets(rankedOpportunities, ["recent"], 2),
    [rankedOpportunities],
  );

  const iosRecommendedItems = useMemo(
    () => pickByBuckets(rankedOpportunities, ["recommended"], 2),
    [rankedOpportunities],
  );

  const iosDiscoverItems = useMemo(
    () => pickByBuckets(rankedOpportunities, ["discover"], 2),
    [rankedOpportunities],
  );

  if (isIOS) {
    return (
      <SafeAreaView style={iosStyles.screen} edges={["top", "left", "right"]}>
        <StatusBar style="dark" />

        <ScrollView
          contentContainerStyle={iosStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={iosStyles.topRow}>
            <View style={iosStyles.brandWrap}>
              <View style={iosStyles.logoBox}>
                <Text style={iosStyles.logoText}>O</Text>
              </View>
              <Text style={iosStyles.brandText}>
                Opport<Text style={iosStyles.brandAccent}>Cam</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={iosStyles.bellButton}
              activeOpacity={0.9}
              onPress={() => router.push("/notifications")}
            >
              <Ionicons
                name="notifications-outline"
                size={19}
                color="#39415F"
              />
              <View style={iosStyles.bellDot} />
            </TouchableOpacity>
          </View>

          <View style={iosStyles.greetingBlock}>
            <Text style={iosStyles.greeting}>Good morning,</Text>
            <Text style={iosStyles.userName}>Dara Khmer 👋</Text>
          </View>

          <IOSSectionHeader title="Recent Opportunities" action="See all" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={iosStyles.horizontalList}
          >
            {iosRecentItems.map((item) => (
              <IOSFeedCard
                key={item.id}
                item={item}
                bookmarked={isSaved(item.id)}
                onToggleSaved={() => toggleSaved(item.id)}
                onPress={() =>
                  router.push({
                    pathname: "/opportunity/[id]",
                    params: { id: item.id },
                  })
                }
              />
            ))}
          </ScrollView>

          <IOSSectionHeader title="Recommended for You" action="See all" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={iosStyles.horizontalList}
          >
            {iosRecommendedItems.map((item) => (
              <IOSFeedCard
                key={item.id}
                item={item}
                bookmarked={isSaved(item.id)}
                onToggleSaved={() => toggleSaved(item.id)}
                onPress={() =>
                  router.push({
                    pathname: "/opportunity/[id]",
                    params: { id: item.id },
                  })
                }
              />
            ))}
          </ScrollView>

          <IOSSectionHeader title="Discover All" action="Filter" />
          <View style={iosStyles.discoverList}>
            {iosDiscoverItems.map((item) => (
              <IOSDiscoverRow
                key={item.id}
                item={item}
                bookmarked={isSaved(item.id)}
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
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>Dara Khmer</Text>
          </View>

          <TouchableOpacity
            style={styles.bellButton}
            activeOpacity={0.9}
            onPress={() => router.push("/notifications")}
          >
            <Ionicons name="notifications-outline" size={22} color="#7A8092" />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        <SectionHeader title="Featured Opportunities" action="View all" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredRow}
        >
          {featuredItems.map((item) => (
            <FeaturedCard
              key={item.id}
              item={item}
              onPress={() =>
                router.push({
                  pathname: "/opportunity/[id]",
                  params: { id: item.id },
                })
              }
            />
          ))}
        </ScrollView>

        <View style={styles.dotRow}>
          {featuredItems.map((item, index) => (
            <View
              key={item.id}
              style={[styles.dot, index === 0 ? styles.dotActive : null]}
            />
          ))}
        </View>

        <Text style={styles.sectionTitleStandalone}>Explore by Category</Text>
        <View style={styles.categoryRow}>
          {categories.map((item) => (
            <CategoryCard key={item.id} item={item} />
          ))}
        </View>

        <SectionHeader title="Recent Opportunities" action="See all" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentRow}
        >
          {recentItems.map((item) => (
            <RecentCard
              key={item.id}
              item={item}
              onPress={() =>
                router.push({
                  pathname: "/opportunity/[id]",
                  params: { id: item.id },
                })
              }
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const iosStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7FA",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 112,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ECEEF5",
  },
  brandWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#E98600",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  brandText: {
    color: "#101A4A",
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "800",
  },
  brandAccent: {
    color: "#E98600",
  },
  bellButton: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F2F3F8",
    alignItems: "center",
    justifyContent: "center",
  },
  bellDot: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E98600",
  },
  greetingBlock: {
    marginTop: 14,
  },
  greeting: {
    color: "#6D7389",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "500",
  },
  userName: {
    marginTop: 2,
    color: "#121A43",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
  },
  sectionHeader: {
    marginTop: 14,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#121A43",
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "800",
  },
  sectionAction: {
    color: "#E98600",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
  },
  horizontalList: {
    paddingRight: 6,
  },
  feedCard: {
    width: 238,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#ECEEF4",
  },
  feedHero: {
    height: 116,
    alignItems: "center",
    justifyContent: "center",
  },
  feedEmoji: {
    fontSize: 42,
  },
  feedBody: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  feedTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  feedTag: {
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  feedTagText: {
    fontSize: 12,
    fontWeight: "700",
  },
  feedTitle: {
    color: "#131C45",
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "800",
  },
  feedOrg: {
    marginTop: 4,
    color: "#67708C",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "500",
  },
  feedFooter: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookmarkButton: {
    padding: 4,
  },
  feedDate: {
    color: "#666E86",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
  deadlinePill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FBF0CF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 5,
  },
  deadlinePillText: {
    color: "#C78A00",
    fontSize: 12,
    fontWeight: "700",
  },
  discoverList: {
    gap: 12,
  },
  discoverCard: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECEEF4",
    flexDirection: "row",
  },
  discoverLeft: {
    width: 96,
    alignItems: "center",
    justifyContent: "center",
  },
  discoverEmoji: {
    fontSize: 36,
  },
  discoverBody: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  discoverTitle: {
    color: "#131C45",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800",
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 112,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  greeting: {
    color: "#707889",
    fontSize: 17,
    fontWeight: "500",
  },
  userName: {
    marginTop: 2,
    color: "#121A33",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EFF1F7",
    alignItems: "center",
    justifyContent: "center",
  },
  bellDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F24F4A",
  },
  sectionHeader: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#20283D",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
  },
  sectionAction: {
    color: "#4F46D8",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
  },
  featuredRow: {
    paddingRight: 16,
  },
  featuredCard: {
    width: 320,
    height: 202,
    borderRadius: 18,
    marginRight: 12,
    overflow: "hidden",
    backgroundColor: "#DEE3F3",
  },
  featuredHero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredEmoji: {
    fontSize: 56,
  },
  featuredTagWrap: {
    position: "absolute",
    top: 16,
    right: 16,
    borderRadius: 999,
    backgroundColor: "#DD8700",
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  featuredTag: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  featuredOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(20, 22, 35, 0.58)",
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
  },
  featuredTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "800",
  },
  featuredMetaRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  featuredOrg: {
    marginLeft: 4,
    color: "#E9ECF7",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
    flex: 1,
  },
  dotRow: {
    marginTop: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CFD3E4",
  },
  dotActive: {
    backgroundColor: "#4F46D8",
  },
  sectionTitleStandalone: {
    color: "#20283D",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  categoryCard: {
    width: "31.4%",
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: "center",
  },
  categoryIconCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: {
    marginTop: 12,
    color: "#374258",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  recentRow: {
    paddingRight: 16,
  },
  recentCard: {
    width: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#ECEEF6",
  },
  recentHero: {
    height: 124,
    alignItems: "center",
    justifyContent: "center",
  },
  recentEmoji: {
    fontSize: 46,
  },
  recentBody: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  recentTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  smallTag: {
    backgroundColor: "#EDF0FA",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  smallTagText: {
    color: "#4B47B8",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "800",
  },
  recentTitle: {
    color: "#1C2442",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800",
  },
  recentOrg: {
    marginTop: 4,
    color: "#636C84",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "500",
  },
  recentDateRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  recentDate: {
    marginLeft: 6,
    color: "#4F46D8",
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "700",
  },
});

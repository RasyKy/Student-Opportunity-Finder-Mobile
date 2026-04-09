import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

type DetailOpportunity = (typeof mockOpportunities)[number];

function getRelatedItems(item: DetailOpportunity) {
  return mockOpportunities
    .filter((opportunity) => opportunity.id !== item.id)
    .map((opportunity) => {
      let score = 0;

      if (opportunity.typeTag === item.typeTag) {
        score += 3;
      }

      if (opportunity.format === item.format) {
        score += 2;
      }

      if (
        opportunity.tags.some((tag) =>
          item.tags.some((currentTag) => currentTag.label === tag.label),
        )
      ) {
        score += 2;
      }

      if (
        opportunity.featuredIn.some((bucket) =>
          item.featuredIn.includes(bucket),
        )
      ) {
        score += 1;
      }

      return { opportunity, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.opportunity)
    .slice(0, 4);
}

export default function OpportunityDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { isSaved, toggleSaved } = useSavedOpportunities();

  const item = mockOpportunities.find((opportunity) => opportunity.id === id);

  if (!item) {
    return (
      <SafeAreaView
        style={sharedStyles.missingScreen}
        edges={["top", "left", "right"]}
      >
        <StatusBar style="dark" />
        <View style={sharedStyles.missingWrap}>
          <Text style={sharedStyles.missingTitle}>Opportunity Not Found</Text>
          <Text style={sharedStyles.missingText}>
            This opportunity does not exist anymore.
          </Text>
          <TouchableOpacity
            style={sharedStyles.missingButton}
            activeOpacity={0.9}
            onPress={() => router.back()}
          >
            <Text style={sharedStyles.missingButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const bookmarked = isSaved(item.id);
  const topTags = [item.typeTag, item.fundingTag, item.statusTag];
  const isAndroid = Platform.OS === "android";

  if (!isAndroid) {
    return (
      <SafeAreaView style={iosStyles.screen} edges={["top", "left", "right"]}>
        <StatusBar style="dark" />

        <View style={[iosStyles.heroShell, { backgroundColor: item.heroTop }]}>
          <View style={iosStyles.heroTopRow}>
            <TouchableOpacity
              style={iosStyles.topButton}
              activeOpacity={0.85}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={22} color="#1D2142" />
            </TouchableOpacity>
            <TouchableOpacity
              style={iosStyles.topButton}
              activeOpacity={0.85}
              onPress={() => toggleSaved(item.id)}
            >
              <Ionicons
                name={bookmarked ? "bookmark" : "bookmark-outline"}
                size={20}
                color={bookmarked ? "#E58E00" : "#7B8198"}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[iosStyles.heroCenter, { backgroundColor: item.heroBottom }]}
          >
            <Text style={iosStyles.heroIcon}>{item.emojiIcon}</Text>
          </View>
        </View>

        <ScrollView
          style={iosStyles.contentScroll}
          contentContainerStyle={iosStyles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={iosStyles.tagRow}>
            {topTags.map((tag, index) => (
              <View
                key={tag}
                style={[
                  iosStyles.tag,
                  index === 0
                    ? iosStyles.tagWarm
                    : index === 1
                      ? iosStyles.tagCool
                      : iosStyles.tagNeutral,
                ]}
              >
                <Text style={iosStyles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <Text style={iosStyles.title}>{item.title}</Text>

          <View style={iosStyles.orgRow}>
            <Text style={iosStyles.orgText}>{item.org}</Text>
            <View style={iosStyles.verifiedBadge}>
              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
            </View>
          </View>

          <View style={iosStyles.metaRow}>
            <View style={iosStyles.metaItem}>
              <Ionicons name="location-outline" size={15} color="#6A7187" />
              <Text style={iosStyles.metaLabel}>{item.location}</Text>
            </View>
            <View style={iosStyles.deadlinePill}>
              <Ionicons name="time-outline" size={14} color="#B57700" />
              <Text style={iosStyles.deadlineText}>{item.dateLeft}</Text>
            </View>
          </View>

          <View style={iosStyles.divider} />

          <Text style={iosStyles.sectionTitle}>About this Opportunity</Text>
          <Text style={iosStyles.bodyText}>{item.about}</Text>

          <View style={iosStyles.factGrid}>
            <View style={iosStyles.factCard}>
              <Ionicons name="time-outline" size={18} color="#1C2B67" />
              <Text style={iosStyles.factTitle}>DURATION</Text>
              <Text style={iosStyles.factValue}>{item.duration}</Text>
            </View>
            <View style={iosStyles.factCard}>
              <Ionicons name="wallet-outline" size={18} color="#1C2B67" />
              <Text style={iosStyles.factTitle}>AWARD</Text>
              <Text style={iosStyles.factValue}>{item.award}</Text>
            </View>
          </View>

          <View style={iosStyles.factGrid}>
            <View style={iosStyles.factCard}>
              <Ionicons name="school-outline" size={18} color="#1C2B67" />
              <Text style={iosStyles.factTitle}>LEVEL</Text>
              <Text style={iosStyles.factValue}>{item.level}</Text>
            </View>
            <View style={iosStyles.factCard}>
              <Ionicons name="desktop-outline" size={18} color="#1C2B67" />
              <Text style={iosStyles.factTitle}>FORMAT</Text>
              <Text style={iosStyles.factValue}>{item.format}</Text>
            </View>
          </View>

          <View style={iosStyles.applyCard}>
            <Text style={iosStyles.applyTitle}>How to apply</Text>
            <Text style={iosStyles.applyText}>{item.howToApply}</Text>
          </View>
        </ScrollView>

        <SafeAreaView edges={["bottom"]} style={iosStyles.bottomArea}>
          <View style={iosStyles.bottomBar}>
            <View style={iosStyles.deadlineCard}>
              <Text style={iosStyles.deadlineCardLabel}>DEADLINE</Text>
              <Text style={iosStyles.deadlineCardValue}>{item.deadline}</Text>
            </View>
            <TouchableOpacity
              style={iosStyles.contactButton}
              activeOpacity={0.9}
            >
              <Text style={iosStyles.contactButtonText}>{item.websiteCta}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    );
  }

  const heroWord = item.title.split(" ")[0].toUpperCase();
  const relatedItems = getRelatedItems(item);

  return (
    <SafeAreaView style={androidStyles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="light" />

      <View style={androidStyles.heroShell}>
        <View style={androidStyles.heroTopRow}>
          <TouchableOpacity
            style={androidStyles.topButton}
            activeOpacity={0.85}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={22} color="#3D4861" />
          </TouchableOpacity>

          <TouchableOpacity
            style={androidStyles.topButton}
            activeOpacity={0.85}
            onPress={() => toggleSaved(item.id)}
          >
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={20}
              color={bookmarked ? "#5749DA" : "#5E687D"}
            />
          </TouchableOpacity>
        </View>

        <View style={androidStyles.heroCenter}>
          <View style={androidStyles.logoWrap}>
            <View style={androidStyles.logoStem} />
            <View style={androidStyles.logoWing} />
          </View>

          <View style={androidStyles.heroTextWrap}>
            <Text
              style={androidStyles.heroWord}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.58}
            >
              {heroWord}
            </Text>
            <View style={androidStyles.heroUnderline} />
          </View>
        </View>
      </View>

      <ScrollView
        style={androidStyles.contentScroll}
        contentContainerStyle={androidStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={androidStyles.sheetCard}>
          <View style={androidStyles.tagRow}>
            {topTags.map((tag, index) => (
              <View
                key={tag}
                style={[
                  androidStyles.tag,
                  index === 0
                    ? androidStyles.tagType
                    : index === 1
                      ? androidStyles.tagFunded
                      : androidStyles.tagOpen,
                ]}
              >
                <Text
                  style={[
                    androidStyles.tagText,
                    index === 0
                      ? androidStyles.tagTypeText
                      : index === 1
                        ? androidStyles.tagFundedText
                        : androidStyles.tagOpenText,
                  ]}
                >
                  {tag.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>

          <Text style={androidStyles.title}>{item.title}</Text>

          <View style={androidStyles.orgRow}>
            <Text style={androidStyles.orgText}>{item.org}</Text>
            <Text style={androidStyles.dotText}>•</Text>
            <Text style={androidStyles.daysLeftText}>{item.dateLeft}</Text>
          </View>

          <View style={androidStyles.locationRow}>
            <Ionicons name="location-outline" size={16} color="#9AA2B5" />
            <Text style={androidStyles.locationText}>{item.location}</Text>
          </View>

          <View style={androidStyles.factGrid}>
            <View style={androidStyles.factCard}>
              <Text style={androidStyles.factTitle}>DURATION</Text>
              <Text style={androidStyles.factValue}>{item.duration}</Text>
            </View>
            <View style={androidStyles.factCard}>
              <Text style={androidStyles.factTitle}>AWARD</Text>
              <Text style={androidStyles.factValue}>{item.award}</Text>
            </View>
          </View>

          <View style={androidStyles.factGrid}>
            <View style={androidStyles.factCard}>
              <Text style={androidStyles.factTitle}>LEVEL</Text>
              <Text style={androidStyles.factValue}>{item.level}</Text>
            </View>
            <View style={androidStyles.factCard}>
              <Text style={androidStyles.factTitle}>FORMAT</Text>
              <Text style={androidStyles.factValue}>{item.format}</Text>
            </View>
          </View>

          <Text style={androidStyles.sectionTitle}>About this Opportunity</Text>
          <Text style={androidStyles.bodyText}>{item.about}</Text>

          <View style={androidStyles.applyCard}>
            <Text style={androidStyles.applyTitle}>How to Apply</Text>
            <Text style={androidStyles.applyText}>{item.howToApply}</Text>

            <TouchableOpacity
              style={androidStyles.websiteButton}
              activeOpacity={0.9}
            >
              <Ionicons name="open-outline" size={15} color="#3C34C3" />
              <Text style={androidStyles.websiteButtonText}>
                {item.websiteCta}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={androidStyles.sectionTitle}>Related Opportunities</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={androidStyles.relatedRow}
          >
            {relatedItems.map((related) => (
              <TouchableOpacity
                key={related.id}
                style={androidStyles.relatedCard}
                activeOpacity={0.9}
                onPress={() =>
                  router.push({
                    pathname: "/opportunity/[id]",
                    params: { id: related.id },
                  })
                }
              >
                <View
                  style={[
                    androidStyles.relatedImageWrap,
                    { backgroundColor: related.heroTop },
                  ]}
                >
                  <Text style={androidStyles.relatedEmoji}>
                    {related.emojiIcon}
                  </Text>
                </View>

                <Text style={androidStyles.relatedType}>
                  {related.typeTag.toUpperCase()}
                </Text>
                <Text numberOfLines={2} style={androidStyles.relatedTitle}>
                  {related.title}
                </Text>
                <Text numberOfLines={1} style={androidStyles.relatedOrg}>
                  {related.org}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={androidStyles.bottomSpacer} />
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={androidStyles.bottomArea}>
        <View style={androidStyles.bottomBar}>
          <View style={androidStyles.deadlineCard}>
            <Text style={androidStyles.deadlineLabel}>DEADLINE</Text>
            <Text style={androidStyles.deadlineValue}>{item.deadline}</Text>
          </View>

          <TouchableOpacity
            style={androidStyles.contactButton}
            activeOpacity={0.9}
          >
            <Text style={androidStyles.contactText}>Contact Org</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const sharedStyles = StyleSheet.create({
  missingScreen: {
    flex: 1,
    backgroundColor: "#F2F3F7",
  },
  missingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  missingTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#121B48",
  },
  missingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#5E6786",
    textAlign: "center",
  },
  missingButton: {
    marginTop: 18,
    borderRadius: 12,
    backgroundColor: "#4F46D8",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  missingButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});

const iosStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F3F6",
  },
  heroShell: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    overflow: "hidden",
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCenter: {
    marginTop: 12,
    borderRadius: 16,
    minHeight: 124,
    alignItems: "center",
    justifyContent: "center",
  },
  heroIcon: {
    fontSize: 54,
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagWarm: {
    backgroundColor: "#F5E9BF",
  },
  tagCool: {
    backgroundColor: "#D6F0DC",
  },
  tagNeutral: {
    backgroundColor: "#E3E7F7",
  },
  tagText: {
    fontSize: 11,
    color: "#1D2450",
    fontWeight: "700",
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    color: "#121B48",
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  orgRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  orgText: {
    fontSize: 14,
    color: "#6A7187",
    fontWeight: "500",
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EA8F00",
    alignItems: "center",
    justifyContent: "center",
  },
  metaRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaLabel: {
    color: "#6A7187",
    fontSize: 14,
    fontWeight: "500",
  },
  deadlinePill: {
    borderRadius: 11,
    backgroundColor: "#F9EFCF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 32,
    gap: 6,
  },
  deadlineText: {
    color: "#17225A",
    fontSize: 12,
    fontWeight: "700",
  },
  divider: {
    marginTop: 18,
    marginBottom: 18,
    height: 1,
    backgroundColor: "#E2E4EC",
  },
  sectionTitle: {
    color: "#111C4B",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#2B355F",
    fontWeight: "500",
  },
  factGrid: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10,
  },
  factCard: {
    flex: 1,
    backgroundColor: "#EBECF0",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 5,
  },
  factTitle: {
    fontSize: 11,
    color: "#6E748B",
    fontWeight: "800",
    letterSpacing: 0.7,
  },
  factValue: {
    fontSize: 13,
    color: "#1D2450",
    fontWeight: "700",
  },
  applyCard: {
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7F2",
    padding: 12,
  },
  applyTitle: {
    fontSize: 14,
    color: "#121B48",
    fontWeight: "800",
  },
  applyText: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color: "#404A72",
  },
  bottomArea: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E6EB",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 10,
  },
  deadlineCard: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#F7EFD3",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "center",
  },
  deadlineCardLabel: {
    color: "#8D8157",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  deadlineCardValue: {
    marginTop: 2,
    color: "#0F1843",
    fontSize: 15,
    fontWeight: "800",
  },
  contactButton: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#EA8600",
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },
});

const androidStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F3F7",
  },
  heroShell: {
    backgroundColor: "#2F8481",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
    overflow: "hidden",
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#D8E3E5",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCenter: {
    marginTop: 12,
    minHeight: 162,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: 12,
  },
  logoWrap: {
    width: 82,
    height: 112,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoStem: {
    width: 26,
    height: 86,
    borderRadius: 13,
    backgroundColor: "#EDF3F3",
  },
  logoWing: {
    position: "absolute",
    top: 20,
    left: 2,
    width: 28,
    height: 80,
    borderTopRightRadius: 22,
    borderBottomLeftRadius: 3,
    backgroundColor: "#EDF3F3",
    transform: [{ rotate: "34deg" }],
  },
  heroWord: {
    color: "#ECF3F3",
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "800",
    flexShrink: 1,
  },
  heroTextWrap: {
    flex: 1,
    minWidth: 0,
    paddingRight: 4,
  },
  heroUnderline: {
    marginTop: 4,
    width: 78,
    height: 4,
    borderRadius: 3,
    backgroundColor: "#ECF3F3",
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 0,
  },
  sheetCard: {
    marginTop: -14,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#F4F4F7",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagType: {
    backgroundColor: "#E7E4F8",
  },
  tagFunded: {
    backgroundColor: "#D6F2E7",
  },
  tagOpen: {
    backgroundColor: "#F8EAD9",
  },
  tagText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  tagTypeText: {
    color: "#3D35C3",
  },
  tagFundedText: {
    color: "#10B981",
  },
  tagOpenText: {
    color: "#D97706",
  },
  title: {
    fontSize: 33,
    lineHeight: 38,
    color: "#151C32",
    fontWeight: "800",
    letterSpacing: -0.7,
  },
  orgRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  orgText: {
    fontSize: 14,
    color: "#636B7F",
    fontWeight: "500",
  },
  dotText: {
    marginHorizontal: 6,
    color: "#9EA5B6",
    fontSize: 16,
    lineHeight: 16,
  },
  daysLeftText: {
    color: "#D97706",
    fontSize: 14,
    fontWeight: "700",
  },
  locationRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationText: {
    color: "#6A7187",
    fontSize: 14,
    fontWeight: "500",
  },
  factGrid: {
    marginTop: 14,
    flexDirection: "row",
    gap: 12,
  },
  factCard: {
    flex: 1,
    backgroundColor: "#EEEFF3",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E8EF",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 5,
  },
  factTitle: {
    fontSize: 11,
    color: "#8D94A5",
    fontWeight: "800",
    letterSpacing: 0.7,
  },
  factValue: {
    fontSize: 16,
    color: "#222A44",
    fontWeight: "700",
  },
  sectionTitle: {
    color: "#11182E",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 30,
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 30,
    color: "#3D455D",
    fontWeight: "500",
  },
  applyCard: {
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: "#EFEFF3",
    borderWidth: 1,
    borderColor: "#E2E4EC",
    padding: 16,
  },
  applyTitle: {
    fontSize: 16,
    color: "#151D35",
    fontWeight: "800",
  },
  applyText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 26,
    color: "#434B63",
  },
  websiteButton: {
    marginTop: 14,
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3C34C3",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  websiteButtonText: {
    color: "#3C34C3",
    fontSize: 14,
    fontWeight: "700",
  },
  relatedRow: {
    gap: 10,
    paddingRight: 8,
  },
  relatedCard: {
    width: 170,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7E9F1",
    padding: 10,
  },
  relatedImageWrap: {
    height: 78,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  relatedEmoji: {
    fontSize: 28,
  },
  relatedType: {
    color: "#3D35C3",
    fontSize: 11,
    fontWeight: "800",
  },
  relatedTitle: {
    marginTop: 4,
    color: "#1D253B",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  relatedOrg: {
    marginTop: 4,
    color: "#8D94A7",
    fontSize: 11,
    fontWeight: "500",
  },
  bottomSpacer: {
    height: 100,
  },
  bottomArea: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E6EB",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    gap: 10,
  },
  deadlineCard: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#F3F4F8",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "center",
  },
  deadlineLabel: {
    color: "#9AA2B7",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  deadlineValue: {
    marginTop: 2,
    color: "#1A2138",
    fontSize: 16,
    fontWeight: "800",
  },
  contactButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#5749DA",
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 10,
  },
  contactText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});

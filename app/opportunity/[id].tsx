import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function OpportunityDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { isSaved, toggleSaved } = useSavedOpportunities();

  const item = mockOpportunities.find((opportunity) => opportunity.id === id);
  const bookmarked = item ? isSaved(item.id) : false;

  if (!item) {
    return (
      <SafeAreaView
        style={styles.missingScreen}
        edges={["top", "left", "right"]}
      >
        <StatusBar style="dark" />
        <View style={styles.missingWrap}>
          <Text style={styles.missingTitle}>Opportunity Not Found</Text>
          <Text style={styles.missingText}>
            This mock opportunity does not exist anymore.
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.missingButton}
            onPress={() => router.back()}
          >
            <Text style={styles.missingButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const topTags = [item.typeTag, item.fundingTag, item.statusTag];

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />

      <View style={[styles.heroShell, { backgroundColor: item.heroTop }]}>
        <View style={styles.heroTopRow}>
          <TouchableOpacity
            style={styles.topButton}
            activeOpacity={0.85}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={22} color="#1D2142" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.topButton}
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

        <View style={[styles.heroCenter, { backgroundColor: item.heroBottom }]}>
          <Text style={styles.heroIcon}>{item.emojiIcon}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.contentScroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tagRow}>
          {topTags.map((tag, index) => (
            <View
              key={tag}
              style={[
                styles.tag,
                index === 0
                  ? styles.tagWarm
                  : index === 1
                    ? styles.tagCool
                    : styles.tagNeutral,
              ]}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.orgRow}>
          <Text style={styles.orgText}>{item.org}</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark" size={12} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={15} color="#6A7187" />
            <Text style={styles.metaLabel}>{item.location}</Text>
          </View>
          <View style={styles.deadlinePill}>
            <Ionicons name="time-outline" size={14} color="#B57700" />
            <Text style={styles.deadlineText}>{item.dateLeft}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>About this Opportunity</Text>
        <Text style={styles.bodyText}>{item.about}</Text>

        <View style={styles.factGrid}>
          <View style={styles.factCard}>
            <Ionicons name="time-outline" size={18} color="#1C2B67" />
            <Text style={styles.factTitle}>DURATION</Text>
            <Text style={styles.factValue}>{item.duration}</Text>
          </View>
          <View style={styles.factCard}>
            <Ionicons name="wallet-outline" size={18} color="#1C2B67" />
            <Text style={styles.factTitle}>AWARD</Text>
            <Text style={styles.factValue}>{item.award}</Text>
          </View>
        </View>

        <View style={styles.factGrid}>
          <View style={styles.factCard}>
            <Ionicons name="school-outline" size={18} color="#1C2B67" />
            <Text style={styles.factTitle}>LEVEL</Text>
            <Text style={styles.factValue}>{item.level}</Text>
          </View>
          <View style={styles.factCard}>
            <Ionicons name="desktop-outline" size={18} color="#1C2B67" />
            <Text style={styles.factTitle}>FORMAT</Text>
            <Text style={styles.factValue}>{item.format}</Text>
          </View>
        </View>

        <View style={styles.applyCard}>
          <Text style={styles.applyTitle}>How to apply</Text>
          <Text style={styles.applyText}>{item.howToApply}</Text>
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.bottomArea}>
        <View style={styles.bottomBar}>
          <View style={styles.deadlineCard}>
            <Text style={styles.deadlineCardLabel}>DEADLINE</Text>
            <Text style={styles.deadlineCardValue}>{item.deadline}</Text>
          </View>
          <TouchableOpacity style={styles.contactButton} activeOpacity={0.9}>
            <Text style={styles.contactButtonText}>{item.websiteCta}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F3F6",
  },
  missingScreen: {
    flex: 1,
    backgroundColor: "#F3F3F6",
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

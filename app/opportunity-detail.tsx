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

const opportunityTags = ["Scholarship", "Fully Funded", "Open"] as const;

const quickFacts = [
  { id: "duration", icon: "time-outline", title: "DURATION", value: "1 to 2 years" },
  { id: "award", icon: "wallet-outline", title: "AWARD", value: "Fully funded" },
] as const;

export default function OpportunityDetailScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />

      <View style={styles.heroShell}>
        <View style={styles.heroTopRow}>
          <TouchableOpacity
            style={styles.topButton}
            activeOpacity={0.85}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#1D2142" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton} activeOpacity={0.85}>
            <Ionicons name="bookmark" size={20} color="#E58E00" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCenter}>
          <Text style={styles.heroIcon}>🎓</Text>
        </View>
      </View>

      <ScrollView
        style={styles.contentScroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tagRow}>
          {opportunityTags.map((tag, index) => (
            <View
              key={tag}
              style={[
                styles.tag,
                index === 0 ? styles.tagWarm : styles.tagCool,
              ]}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.title}>Fulbright Foreign Student Program 2025-2026</Text>

        <View style={styles.orgRow}>
          <Text style={styles.orgText}>US Embassy Phnom Penh</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark" size={12} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>📍</Text>
            <Text style={styles.metaLabel}>Phnom Penh & USA</Text>
          </View>
          <View style={styles.deadlinePill}>
            <Text style={styles.deadlineIcon}>⏰</Text>
            <Text style={styles.deadlineText}>12 days left</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>About this Opportunity</Text>
        <Text style={styles.bodyText}>
          The Fulbright Foreign Student Program enables graduate students and young
          professionals from Cambodia to study in the United States. Fellows are
          selected based on academic achievement, leadership potential, and
          commitment to returning home to contribute to their communities.
        </Text>

        <View style={styles.factGrid}>
          {quickFacts.map((fact) => (
            <View key={fact.id} style={styles.factCard}>
              <Ionicons name={fact.icon} size={18} color="#1C2B67" />
              <Text style={styles.factTitle}>{fact.title}</Text>
              <Text style={styles.factValue}>{fact.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.bottomArea}>
        <View style={styles.bottomBar}>
          <View style={styles.deadlineCard}>
            <Text style={styles.deadlineCardLabel}>DEADLINE</Text>
            <Text style={styles.deadlineCardValue}>Mar 22, 2025</Text>
          </View>
          <TouchableOpacity style={styles.contactButton} activeOpacity={0.9}>
            <Text style={styles.contactButtonText}>Contact Org →</Text>
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
  heroShell: {
    height: 258,
    paddingHorizontal: 24,
    paddingTop: 12,
    backgroundColor: "#E8E8EC",
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    overflow: "hidden",
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topButton: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heroIcon: {
    fontSize: 70,
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 26,
    paddingTop: 18,
    paddingBottom: 34,
  },
  tagRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
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
  tagText: {
    fontSize: 12,
    color: "#1D2450",
    fontWeight: "700",
  },
  title: {
    fontSize: 45,
    lineHeight: 49,
    color: "#121B48",
    fontWeight: "900",
    letterSpacing: -0.7,
  },
  orgRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  orgText: {
    fontSize: 17,
    color: "#6A7187",
    fontWeight: "500",
  },
  verifiedBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#EA8F00",
    alignItems: "center",
    justifyContent: "center",
  },
  metaRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaIcon: {
    fontSize: 15,
  },
  metaLabel: {
    color: "#6A7187",
    fontSize: 17,
    fontWeight: "500",
  },
  deadlinePill: {
    borderRadius: 11,
    backgroundColor: "#F9EFCF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 38,
    gap: 8,
  },
  deadlineIcon: {
    fontSize: 15,
  },
  deadlineText: {
    color: "#17225A",
    fontSize: 27,
    lineHeight: 31,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  divider: {
    marginTop: 24,
    marginBottom: 24,
    height: 1,
    backgroundColor: "#E2E4EC",
  },
  sectionTitle: {
    color: "#111C4B",
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "900",
    letterSpacing: -0.65,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 17,
    lineHeight: 32,
    color: "#2B355F",
    fontWeight: "500",
  },
  factGrid: {
    marginTop: 22,
    flexDirection: "row",
    gap: 12,
  },
  factCard: {
    flex: 1,
    backgroundColor: "#EBECF0",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 6,
  },
  factTitle: {
    fontSize: 13,
    color: "#6E748B",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  factValue: {
    fontSize: 14,
    color: "#1D2450",
    fontWeight: "700",
  },
  bottomArea: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E6EB",
  },
  bottomBar: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 12,
  },
  deadlineCard: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#F7EFD3",
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "center",
  },
  deadlineCardLabel: {
    color: "#8D8157",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  deadlineCardValue: {
    marginTop: 2,
    color: "#0F1843",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  contactButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#EA8600",
    minHeight: 66,
    alignItems: "center",
    justifyContent: "center",
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 23,
    lineHeight: 27,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
});

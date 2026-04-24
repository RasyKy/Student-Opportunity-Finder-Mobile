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
import {
    getOrganizerById,
    getOrganizerIdFromName,
} from "../../data/mock-organizers";

export default function OrganizerProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const organizer = id ? getOrganizerById(id) : undefined;

  if (!organizer) {
    return (
      <SafeAreaView
        style={styles.missingScreen}
        edges={["top", "left", "right"]}
      >
        <StatusBar style="dark" />
        <View style={styles.missingWrap}>
          <Text style={styles.missingTitle}>Organizer Not Found</Text>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.9}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const organizerOpportunities = mockOpportunities.filter(
    (item) => getOrganizerIdFromName(item.org) === organizer.id,
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIcon}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#171E35" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Organizer Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.logoWrap}>
          <View style={styles.logoOuter}>
            <View style={styles.logoInner}>
              <Ionicons name="business-outline" size={34} color="#D3B97B" />
            </View>
          </View>
        </View>

        <Text style={styles.name}>{organizer.name}</Text>
        <Text style={styles.tagline}>{organizer.tagline}</Text>

        <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          About
        </Text>
        <Text style={styles.about}>{organizer.about}</Text>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Active Opportunities</Text>
          <TouchableOpacity activeOpacity={0.85}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardList}>
          {organizerOpportunities.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.opportunityCard}
              activeOpacity={0.9}
              onPress={() =>
                router.push({
                  pathname: "/opportunity/[id]",
                  params: { id: item.id },
                })
              }
            >
              <View
                style={[styles.cardVisual, { backgroundColor: item.heroTop }]}
              >
                <Ionicons
                  name={item.detailIcon as keyof typeof Ionicons.glyphMap}
                  size={30}
                  color="#37457F"
                />
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardMetaRow}>
                  <View style={styles.typeTag}>
                    <Text style={styles.typeTagText}>
                      {item.typeTag.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.deadlineRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={14}
                      color="#8C95AC"
                    />
                    <Text style={styles.deadlineText}>
                      Ends {item.deadline}
                    </Text>
                  </View>
                </View>

                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {item.about}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          Contact & Socials
        </Text>
        <TouchableOpacity style={styles.linkRow} activeOpacity={0.9}>
          <View style={styles.linkLeft}>
            <View style={styles.linkIconWrap}>
              <Ionicons name="globe-outline" size={18} color="#4A38C8" />
            </View>
            <Text style={styles.linkText}>{organizer.website}</Text>
          </View>
          <Ionicons name="open-outline" size={18} color="#8A90A3" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F1F1F6",
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E3EB",
  },
  headerIcon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  headerTitle: {
    color: "#151D35",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
  },
  content: {
    paddingHorizontal: 22,
    paddingBottom: 30,
  },
  logoWrap: {
    alignItems: "center",
    marginTop: 22,
  },
  logoOuter: {
    width: 132,
    height: 132,
    borderRadius: 66,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  logoInner: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: "#082A3D",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    marginTop: 20,
    textAlign: "center",
    color: "#161D35",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
  },
  tagline: {
    marginTop: 2,
    textAlign: "center",
    color: "#4B3FC8",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
  },
  sectionHeaderRow: {
    marginTop: 26,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#151D35",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "800",
  },
  sectionTitleSpaced: {
    marginTop: 24,
  },
  viewAllText: {
    color: "#4539BE",
    fontSize: 16,
    fontWeight: "700",
  },
  about: {
    marginTop: 12,
    color: "#3F4864",
    fontSize: 16,
    lineHeight: 28,
    fontWeight: "500",
  },
  cardList: {
    gap: 14,
  },
  opportunityCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DFE1EA",
    backgroundColor: "#F9F9FC",
    overflow: "hidden",
  },
  cardVisual: {
    height: 126,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
  },
  cardMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeTag: {
    borderRadius: 8,
    backgroundColor: "#E9E5FB",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  typeTagText: {
    color: "#3D35C3",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  deadlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  deadlineText: {
    color: "#8D96AD",
    fontSize: 14,
    fontWeight: "500",
  },
  cardTitle: {
    marginTop: 10,
    color: "#171F36",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
  },
  cardDescription: {
    marginTop: 8,
    color: "#5A627A",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  linkRow: {
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E2EA",
    backgroundColor: "#F9F9FC",
    minHeight: 52,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  linkIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E8E5FF",
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    color: "#1B2340",
    fontSize: 16,
    fontWeight: "600",
  },
  missingScreen: {
    flex: 1,
    backgroundColor: "#F1F1F6",
  },
  missingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  missingTitle: {
    color: "#11192F",
    fontSize: 24,
    fontWeight: "800",
  },
  backButton: {
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: "#4539BE",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

import { Ionicons } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
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

const interestChips = [
  { id: "scholarships", icon: "school-outline", label: "Scholarships" },
  { id: "events", icon: "calendar-outline", label: "Events" },
  { id: "volunteering", icon: "heart-outline", label: "Volunteering" },
  { id: "webdev", icon: "laptop-outline", label: "Web Dev" },
  { id: "socialwork", icon: "leaf-outline", label: "Social Work" },
] as const;

type ProfileSettingRow = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  danger?: boolean;
};

const settingsRows: ProfileSettingRow[] = [
  {
    id: "language",
    icon: "language-outline",
    label: "Language",
    value: "English",
  },
  {
    id: "notifications",
    icon: "notifications-outline",
    label: "Notifications",
  },
  { id: "about", icon: "information-circle-outline", label: "About OpportCam" },
  { id: "privacy", icon: "lock-closed-outline", label: "Privacy Policy" },
  { id: "logout", icon: "log-out-outline", label: "Logout", danger: true },
];

const androidInterestChipIds = [
  "scholarships",
  "volunteering",
  "socialwork",
  "webdev",
] as const;

const androidSettingsRows: ProfileSettingRow[] = [
  {
    id: "language",
    icon: "language-outline",
    label: "Language",
    value: "English",
  },
  {
    id: "notifications",
    icon: "notifications-outline",
    label: "Notifications",
  },
  {
    id: "privacy",
    icon: "shield-checkmark-outline",
    label: "Privacy Policy",
  },
  {
    id: "about",
    icon: "information-circle-outline",
    label: "About Us",
  },
  { id: "logout", icon: "log-out-outline", label: "Logout", danger: true },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { savedIds } = useSavedOpportunities();
  const savedCount = savedIds.length;
  const interestsCount = interestChips.length;
  const viewedCount = mockOpportunities.length + 6;
  const androidInterestIdSet = new Set<string>(androidInterestChipIds);
  const androidInterestChips = interestChips.filter((chip) =>
    androidInterestIdSet.has(chip.id),
  );

  const handleSettingPress = (id: string) => {
    if (id === "language") {
      router.push("/language-settings" as Href);
      return;
    }

    if (id === "notifications") {
      router.push("/notifications");
    }
  };

  const handleEditInterestsPress = () => {
    router.push("/edit-interests" as Href);
  };

  if (Platform.OS === "android") {
    return (
      <SafeAreaView
        style={androidStyles.screen}
        edges={["top", "left", "right"]}
      >
        <StatusBar style="dark" />

        <ScrollView
          style={androidStyles.scroll}
          contentContainerStyle={androidStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={androidStyles.pageTitle}>PROFILE</Text>

          <View style={androidStyles.avatarCard}>
            <Ionicons name="person-outline" size={42} color="#0E152A" />
          </View>

          <Text style={androidStyles.name}>Dara Khmer</Text>
          <Text style={androidStyles.email}>dara.khmer@student.edu.kh</Text>

          <View style={androidStyles.statsRow}>
            <View style={androidStyles.statCard}>
              <Text style={androidStyles.statValue}>{savedCount}</Text>
              <Text style={androidStyles.statLabel}>SAVED</Text>
            </View>
            <View style={androidStyles.statCard}>
              <Text style={androidStyles.statValue}>{interestsCount}</Text>
              <Text style={androidStyles.statLabel}>INTERESTS</Text>
            </View>
            <View style={androidStyles.statCard}>
              <Text style={androidStyles.statValue}>{viewedCount}</Text>
              <Text style={androidStyles.statLabel}>VIEWED</Text>
            </View>
          </View>

          <View style={androidStyles.sectionHeaderRow}>
            <Text style={androidStyles.sectionTitle}>Your Interests</Text>
            <TouchableOpacity
              style={androidStyles.editButton}
              onPress={handleEditInterestsPress}
              activeOpacity={0.85}
            >
              <Ionicons name="create-outline" size={12} color="#4D3FD5" />
              <Text style={androidStyles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={androidStyles.chipsWrap}>
            {androidInterestChips.map((chip) => (
              <View key={chip.id} style={androidStyles.chip}>
                <Ionicons name="star-outline" size={11} color="#3D34BF" />
                <Text style={androidStyles.chipLabel}>{chip.label}</Text>
              </View>
            ))}
          </View>

          <Text style={androidStyles.settingsTitle}>Settings</Text>
          {androidSettingsRows.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                androidStyles.settingItem,
                item.danger ? androidStyles.settingItemDanger : null,
              ]}
              onPress={() => handleSettingPress(item.id)}
              activeOpacity={0.85}
            >
              <View style={androidStyles.settingLeft}>
                <View
                  style={[
                    androidStyles.settingIconWrap,
                    item.danger ? androidStyles.settingIconWrapDanger : null,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={17}
                    color={item.danger ? "#E14545" : "#4237BE"}
                  />
                </View>
                <Text
                  style={[
                    androidStyles.settingLabel,
                    item.danger ? androidStyles.settingLabelDanger : null,
                  ]}
                >
                  {item.label}
                </Text>
              </View>

              {!item.danger ? (
                <View style={androidStyles.settingRight}>
                  {item.value ? (
                    <Text style={androidStyles.settingValue}>{item.value}</Text>
                  ) : null}
                  <Ionicons name="chevron-forward" size={18} color="#A5B0C3" />
                </View>
              ) : null}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scroll}
        stickyHeaderIndices={[1]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHead}>
          <View style={styles.bubbleTop} />
          <View style={styles.bubbleLeft} />

          <View style={styles.profileRow}>
            <View style={styles.avatarBox}>
              <Ionicons name="person" size={28} color="#6A5CB0" />
            </View>
            <View style={styles.profileTextWrap}>
              <Text numberOfLines={1} style={styles.profileName}>
                Dara Khmer
              </Text>
              <Text numberOfLines={1} style={styles.profileEmail}>
                dara.khmer@student.edu.kh
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.heroSticky}>
          <View style={styles.statsShell}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{savedCount}</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{interestsCount}</Text>
              <Text style={styles.statLabel}>Interests</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{viewedCount}</Text>
              <Text style={styles.statLabel}>Viewed</Text>
            </View>
          </View>
        </View>

        <View style={styles.bodySection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Your Interests</Text>
            <TouchableOpacity
              style={styles.inlineEdit}
              onPress={handleEditInterestsPress}
              activeOpacity={0.85}
            >
              <Ionicons name="create-outline" size={14} color="#E58E00" />
              <Text style={styles.inlineEditText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chipsWrap}>
            {interestChips.map((chip) => (
              <View key={chip.id} style={styles.chip}>
                <Text style={styles.chipTick}>✓</Text>
                <Ionicons name={chip.icon} size={14} color="#4D58A2" />
                <Text style={styles.chipLabel}>{chip.label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.settingsTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            {settingsRows.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.settingRow,
                  index === settingsRows.length - 1
                    ? styles.settingRowNoBorder
                    : null,
                ]}
                onPress={() => handleSettingPress(item.id)}
                activeOpacity={0.85}
              >
                <View style={styles.settingLeft}>
                  <View
                    style={[
                      styles.settingIconBox,
                      item.danger ? styles.settingIconDanger : null,
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={18}
                      color={item.danger ? "#D76A6A" : "#E2A642"}
                    />
                  </View>
                  <Text
                    style={[
                      styles.settingLabel,
                      item.danger ? styles.settingLabelDanger : null,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>

                <View style={styles.settingRight}>
                  {item.value ? (
                    <Text style={styles.settingValue}>{item.value}</Text>
                  ) : null}
                  {!item.danger ? (
                    <Text style={styles.settingArrow}>›</Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const androidStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  scroll: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 108,
  },
  pageTitle: {
    alignSelf: "center",
    color: "#121A33",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 2,
  },
  avatarCard: {
    marginTop: 16,
    width: 84,
    height: 84,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#D8DDE8",
    backgroundColor: "#F8FAFF",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5A6D99",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  name: {
    marginTop: 12,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#121A33",
    letterSpacing: -0.15,
  },
  email: {
    marginTop: 3,
    alignSelf: "center",
    color: "#7483A1",
    fontSize: 11,
    fontWeight: "600",
  },
  statsRow: {
    marginTop: 18,
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    minHeight: 72,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7DEE9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2E3D5A",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  statValue: {
    color: "#121A33",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 32,
  },
  statLabel: {
    marginTop: 4,
    color: "#5F7394",
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: "700",
  },
  sectionHeaderRow: {
    marginTop: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    color: "#151E36",
    fontWeight: "800",
    letterSpacing: -0.1,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  editButtonText: {
    color: "#4D3FD5",
    fontSize: 13,
    fontWeight: "700",
  },
  chipsWrap: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    minHeight: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D5D0F1",
    backgroundColor: "#ECEAF8",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
  },
  chipLabel: {
    color: "#3D34BF",
    fontSize: 12,
    fontWeight: "700",
  },
  settingsTitle: {
    marginTop: 26,
    fontSize: 16,
    color: "#151E36",
    fontWeight: "800",
    letterSpacing: -0.1,
  },
  settingItem: {
    marginTop: 10,
    minHeight: 62,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#D8DFEA",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingItemDanger: {
    marginTop: 12,
    borderColor: "#F5D5D8",
    backgroundColor: "#FDF0F1",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  settingIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#EFECFF",
    alignItems: "center",
    justifyContent: "center",
  },
  settingIconWrapDanger: {
    backgroundColor: "#FFE5E8",
  },
  settingLabel: {
    color: "#2C3752",
    fontSize: 14,
    fontWeight: "700",
  },
  settingLabelDanger: {
    color: "#DB3232",
  },
  settingValue: {
    color: "#8A97AF",
    fontSize: 14,
    fontWeight: "500",
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#120D35",
  },
  scroll: {
    flex: 1,
    backgroundColor: "#120D35",
  },
  content: {
    paddingBottom: 12,
  },
  profileHead: {
    backgroundColor: "#120D35",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    overflow: "hidden",
  },
  heroSticky: {
    backgroundColor: "#120D35",
    paddingHorizontal: 20,
    paddingBottom: 14,
    overflow: "hidden",
  },
  bubbleTop: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "rgba(219, 117, 67, 0.18)",
    top: -72,
    right: -26,
  },
  bubbleLeft: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "rgba(175, 173, 255, 0.16)",
    left: -56,
    top: 92,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarBox: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#F1F2F8",
    borderWidth: 2,
    borderColor: "#E5B258",
    alignItems: "center",
    justifyContent: "center",
  },
  profileTextWrap: {
    flex: 1,
  },
  profileName: {
    color: "#F4F5FF",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  profileEmail: {
    marginTop: 2,
    fontSize: 14,
    color: "#A8B0D8",
    fontWeight: "500",
  },
  statsShell: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "rgba(241, 242, 255, 0.12)",
    flexDirection: "row",
    alignItems: "stretch",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  statLabel: {
    marginTop: 4,
    color: "#B7BDDF",
    fontSize: 12,
    fontWeight: "600",
  },
  bodySection: {
    backgroundColor: "#F5F6FA",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 26,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#0F1B4D",
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  inlineEdit: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  inlineEditText: {
    color: "#E58E00",
    fontSize: 14,
    fontWeight: "700",
  },
  chipsWrap: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    minHeight: 40,
    borderRadius: 22,
    backgroundColor: "#E6E8FA",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  chipTick: {
    color: "#F2A540",
    fontSize: 12,
    fontWeight: "800",
  },
  chipLabel: {
    fontSize: 15,
    color: "#101C4C",
    fontWeight: "700",
  },
  settingsTitle: {
    marginTop: 30,
    fontSize: 18,
    lineHeight: 24,
    color: "#0F1B4D",
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  settingsCard: {
    marginTop: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEFF5",
    overflow: "hidden",
  },
  settingRow: {
    minHeight: 72,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EDEFF6",
  },
  settingRowNoBorder: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingIconBox: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#F5F0E7",
    alignItems: "center",
    justifyContent: "center",
  },
  settingIconDanger: {
    backgroundColor: "#FCECED",
  },
  settingIcon: {
    fontSize: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: "#0F1B4D",
    fontWeight: "600",
  },
  settingLabelDanger: {
    color: "#E14B4B",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingValue: {
    fontSize: 14,
    color: "#677095",
    fontWeight: "500",
  },
  settingArrow: {
    fontSize: 22,
    lineHeight: 22,
    color: "#B7BCE0",
  },
});

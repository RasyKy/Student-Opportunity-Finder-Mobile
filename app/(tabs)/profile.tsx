import { Ionicons } from "@expo/vector-icons";
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

export default function ProfileScreen() {
  const { savedIds } = useSavedOpportunities();
  const savedCount = savedIds.length;
  const interestsCount = interestChips.length;
  const viewedCount = mockOpportunities.length + 6;

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
            <TouchableOpacity style={styles.inlineEdit} activeOpacity={0.85}>
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

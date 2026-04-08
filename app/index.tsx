import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
  const router = useRouter();
  const isIOS = Platform.OS === "ios";

  return (
    <SafeAreaView
      style={isIOS ? iosStyles.screen : androidStyles.screen}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="light" />

      {isIOS ? (
        <>
          <View style={iosStyles.bgBlobTopRight} />
          <View style={iosStyles.bgBlobMidLeft} />
          <View style={iosStyles.bgGlowBottomLeft} />

          <View style={iosStyles.heroArea}>
            <View style={[iosStyles.heroCard, iosStyles.scholarshipCard]}>
              <Text style={iosStyles.cardLabel}>SCHOLARSHIP</Text>
              <Text style={iosStyles.cardTitle}>Fulbright 2025</Text>
            </View>

            <View style={[iosStyles.heroCard, iosStyles.internshipCard]}>
              <Text style={iosStyles.cardLabel}>INTERNSHIP</Text>
              <Text style={iosStyles.cardTitle}>Google x CamCode</Text>
            </View>

            <View style={[iosStyles.heroCard, iosStyles.eventCard]}>
              <Text style={iosStyles.cardLabel}>EVENT</Text>
              <Text style={iosStyles.cardTitle}>TEDxPhnomPenh Youth Forum</Text>
            </View>
          </View>

          <View style={iosStyles.content}>
            <View style={iosStyles.badgeWrap}>
              <Text style={iosStyles.badge}>✦ For Cambodian Students</Text>
            </View>
            <Text style={iosStyles.headingPrimary}>Discover Your</Text>
            <Text style={iosStyles.headingAccent}>Next Opportunity</Text>
            <Text style={iosStyles.subtitle}>
              Scholarships, internships, events, and more all in one place,
              personalized for you.
            </Text>

            <TouchableOpacity
              style={iosStyles.googleButton}
              activeOpacity={0.9}
              onPress={() => router.push("/modal")}
            >
              <FontAwesome
                name="google"
                size={22}
                color="#FFFFFF"
                style={iosStyles.googleIcon}
              />
              <Text style={iosStyles.googleButtonText}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={iosStyles.secondaryAction}>
                Continue without account
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={androidStyles.heroArea}>
            <View style={androidStyles.androidHeaderChip}>
              <Text style={androidStyles.androidHeaderChipText}>
                For Cambodian Students
              </Text>
            </View>

            <View style={androidStyles.androidHeroCardMain}>
              <Text style={androidStyles.androidHeroType}>Scholarship</Text>
              <Text style={androidStyles.androidHeroTitle}>
                Fulbright Foreign Student Program
              </Text>
            </View>

            <View style={androidStyles.androidHeroRow}>
              <View style={androidStyles.androidHeroMiniCard}>
                <Text style={androidStyles.androidHeroMiniType}>Course</Text>
                <Text style={androidStyles.androidHeroMiniTitle}>
                  Google Data Analytics
                </Text>
              </View>
              <View style={androidStyles.androidHeroMiniCardAlt}>
                <Text style={androidStyles.androidHeroMiniType}>Event</Text>
                <Text style={androidStyles.androidHeroMiniTitle}>
                  TEDx Youth Summit
                </Text>
              </View>
            </View>
          </View>

          <View style={androidStyles.content}>
            <Text style={androidStyles.headingPrimary}>
              Find Your Next Opportunity
            </Text>
            <Text style={androidStyles.subtitle}>
              Scholarships, internships, and events tailored for Cambodian
              students.
            </Text>

            <TouchableOpacity
              style={androidStyles.googleButton}
              activeOpacity={0.9}
              onPress={() => router.push("/modal")}
            >
              <View style={androidStyles.googleIconBadge}>
                <FontAwesome name="google" size={20} color="#4285F4" />
              </View>
              <Text style={androidStyles.googleButtonText}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={androidStyles.skipButton}
              activeOpacity={0.9}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={androidStyles.secondaryAction}>
                Continue without account
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const iosStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#130839",
  },
  bgBlobTopRight: {
    position: "absolute",
    width: 330,
    height: 330,
    borderRadius: 165,
    backgroundColor: "rgba(215, 95, 56, 0.28)",
    top: -84,
    right: -68,
  },
  bgBlobMidLeft: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(145, 93, 75, 0.25)",
    top: 236,
    left: -20,
  },
  bgGlowBottomLeft: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(129, 146, 232, 0.24)",
    bottom: 140,
    left: -110,
  },
  heroArea: {
    height: 332,
    justifyContent: "center",
    alignItems: "center",
  },
  heroCard: {
    position: "absolute",
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  scholarshipCard: {
    width: 250,
    height: 98,
    backgroundColor: "#EFECD9",
    left: 82,
    top: 116,
    transform: [{ rotate: "-8deg" }],
  },
  internshipCard: {
    width: 260,
    height: 98,
    backgroundColor: "#DBDEF5",
    top: 150,
    right: 56,
    transform: [{ rotate: "4deg" }],
  },
  eventCard: {
    width: 258,
    height: 104,
    backgroundColor: "#FFFFFF",
    left: 58,
    top: 186,
    transform: [{ rotate: "-2deg" }],
  },
  cardLabel: {
    color: "#76788E",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  cardTitle: {
    marginTop: 6,
    color: "#101A4A",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "800",
  },
  content: {
    marginTop: "auto",
    paddingHorizontal: 28,
    paddingBottom: 26,
  },
  badgeWrap: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#6F3E2A",
    backgroundColor: "rgba(111, 62, 42, 0.28)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  badge: {
    color: "#F08B10",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.2,
  },
  headingPrimary: {
    marginTop: 18,
    color: "#FFFFFF",
    fontSize: 50,
    lineHeight: 54,
    fontWeight: "800",
    letterSpacing: -1,
  },
  headingAccent: {
    color: "#F08A00",
    fontSize: 50,
    lineHeight: 54,
    fontWeight: "800",
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: 18,
    color: "#A9B0D1",
    fontSize: 12,
    lineHeight: 19,
    fontWeight: "500",
    maxWidth: 336,
  },
  googleButton: {
    marginTop: 26,
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: "#F08A00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F08A00",
    shadowOpacity: 0.32,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  secondaryAction: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 12,
    color: "#8F95B5",
    fontWeight: "600",
  },
});

const androidStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#101527",
  },
  heroArea: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  androidHeaderChip: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(59, 130, 246, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(125, 167, 255, 0.4)",
  },
  androidHeaderChipText: {
    color: "#B9D2FF",
    fontSize: 12,
    fontWeight: "700",
  },
  androidHeroCardMain: {
    marginTop: 12,
    borderRadius: 20,
    backgroundColor: "#1F2A48",
    borderWidth: 1,
    borderColor: "#2E3A60",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  androidHeroType: {
    color: "#A8B3D6",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  androidHeroTitle: {
    marginTop: 6,
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
  },
  androidHeroRow: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10,
  },
  androidHeroMiniCard: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#2D3352",
    borderWidth: 1,
    borderColor: "#3D466A",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  androidHeroMiniCardAlt: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#34304B",
    borderWidth: 1,
    borderColor: "#4A3E67",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  androidHeroMiniType: {
    color: "#A8B3D6",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  androidHeroMiniTitle: {
    marginTop: 5,
    color: "#EFF3FF",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  content: {
    marginTop: "auto",
    backgroundColor: "#F6F8FD",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  headingPrimary: {
    color: "#121A33",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 10,
    color: "#66708F",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
  },
  googleButton: {
    marginTop: 24,
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DFE4F2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  googleIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F4F7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  googleButtonText: {
    color: "#121A33",
    fontSize: 15,
    fontWeight: "700",
  },
  skipButton: {
    marginTop: 10,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryAction: {
    color: "#60709E",
    fontSize: 14,
    fontWeight: "600",
  },
});

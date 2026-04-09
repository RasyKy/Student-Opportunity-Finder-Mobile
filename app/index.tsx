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
              onPress={() => router.push("/survey")}
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
          <View style={androidStyles.glowTop} />
          <View style={androidStyles.glowBottom} />

          <View style={androidStyles.heroArea}>
            <View
              style={[
                androidStyles.floatingCard,
                androidStyles.cardScholarship,
              ]}
            >
              <View style={androidStyles.cardLine} />
              <Text style={androidStyles.cardMiniLabel}>Scholarship</Text>
            </View>

            <View style={[androidStyles.floatingCard, androidStyles.cardEvent]}>
              <Text style={androidStyles.cardEventTitle}>TEDxPhnomPenh</Text>
              <Text style={androidStyles.cardEventSub}>Youth Forum</Text>
            </View>

            <View
              style={[androidStyles.floatingCard, androidStyles.cardInternship]}
            >
              <Text style={androidStyles.cardInternshipText}>Internship</Text>
            </View>
          </View>

          <View style={androidStyles.content}>
            <Text style={androidStyles.badge}>✦ FOR CAMBODIAN STUDENTS</Text>
            <Text style={androidStyles.headingPrimary}>
              Discover Your{"\n"}Next Opportunity
            </Text>
            <Text style={androidStyles.subtitle}>
              Scholarships, internships, events, and more all in one place,
              personalized for you.
            </Text>

            <TouchableOpacity
              style={androidStyles.googleButton}
              activeOpacity={0.9}
              onPress={() => router.push("/survey")}
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
    backgroundColor: "#29226F",
  },
  glowTop: {
    position: "absolute",
    top: -130,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(84, 71, 188, 0.45)",
  },
  glowBottom: {
    position: "absolute",
    bottom: -120,
    left: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(25, 18, 84, 0.55)",
  },
  heroArea: {
    height: 304,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  floatingCard: {
    position: "absolute",
    borderRadius: 18,
    shadowColor: "#100A39",
    shadowOpacity: 0.32,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 8,
  },
  cardScholarship: {
    width: 124,
    height: 102,
    left: 84,
    top: 56,
    backgroundColor: "rgba(84, 79, 152, 0.82)",
    borderWidth: 1,
    borderColor: "rgba(133, 126, 198, 0.68)",
    paddingHorizontal: 14,
    paddingTop: 30,
    transform: [{ rotate: "-11deg" }],
  },
  cardLine: {
    height: 10,
    width: 74,
    borderRadius: 8,
    backgroundColor: "rgba(162, 165, 214, 0.8)",
    marginBottom: 12,
  },
  cardMiniLabel: {
    color: "#F1F3FF",
    fontSize: 11,
    fontWeight: "700",
  },
  cardEvent: {
    width: 224,
    height: 86,
    left: 136,
    top: 102,
    backgroundColor: "#E39849",
    justifyContent: "center",
    paddingHorizontal: 20,
    transform: [{ rotate: "6deg" }],
  },
  cardEventTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 24,
    fontWeight: "800",
  },
  cardEventSub: {
    marginTop: 4,
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
  },
  cardInternship: {
    width: 122,
    height: 70,
    left: 110,
    top: 178,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-3deg" }],
  },
  cardInternshipText: {
    color: "#0D0C16",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingBottom: 26,
  },
  badge: {
    color: "#E6A044",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  headingPrimary: {
    marginTop: 12,
    color: "#F4F5FB",
    fontSize: 52,
    lineHeight: 56,
    fontWeight: "800",
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: 16,
    color: "#A9AED0",
    fontSize: 13,
    lineHeight: 22,
    fontWeight: "500",
  },
  googleButton: {
    marginTop: "auto",
    minHeight: 74,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: "#130E3F",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 8,
  },
  googleIconBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  googleButtonText: {
    color: "#10121D",
    fontSize: 17,
    fontWeight: "700",
  },
  skipButton: {
    marginTop: 18,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryAction: {
    color: "#767DA9",
    fontSize: 16,
    fontWeight: "500",
  },
});

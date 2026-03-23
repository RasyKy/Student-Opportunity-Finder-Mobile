import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();

  const isCompactHeight = height < 830;
  const headingSize = isCompactHeight ? 46 : 56;
  const headingLineHeight = isCompactHeight ? 48 : 58;
  const heroHeight = isCompactHeight ? "43%" : "48%";

  const onContinueWithGoogle = () => {
    router.replace("/(tabs)");
  };

  const onContinueWithoutAccount = () => {
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView
      style={styles.screen}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="light" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={[styles.heroArea, { height: heroHeight }]}>
          <View style={[styles.orb, styles.topRightOrb]} />
          <View style={[styles.orb, styles.midLeftOrb]} />

          <View style={[styles.card, styles.cardScholarship]}>
            <Text style={styles.cardLabel}>SCHOLARSHIP</Text>
            <Text style={styles.cardTitle}>Future Leaders 2025</Text>
          </View>

          <View style={[styles.card, styles.cardInternship]}>
            <Text style={styles.cardLabel}>INTERNSHIP</Text>
            <Text style={styles.cardTitle}>Seedstars Code</Text>
          </View>

          <View style={[styles.card, styles.cardEvent]}>
            <Text style={styles.cardLabel}>EVENT</Text>
            <Text style={styles.cardTitle}>TEDxPhnomPenh Youth Forum</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>* For Cambodian Students</Text>
          </View>

          <Text
            style={[
              styles.headingWhite,
              { fontSize: headingSize, lineHeight: headingLineHeight },
            ]}
          >
            Discover Your
          </Text>

          <Text
            style={[
              styles.headingOrange,
              { fontSize: headingSize, lineHeight: headingLineHeight },
            ]}
          >
            Next Opportunity
          </Text>

          <Text style={styles.subheading}>
            Scholarships, internships, events, and more - all in one place,
            personalized for you.
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.googleButton}
            onPress={onContinueWithGoogle}
          >
            <FontAwesome name="google" size={26} color="#FFFFFF" />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.skipButton}
            onPress={onContinueWithoutAccount}
          >
            <Text style={styles.skipButtonText}>Continue without account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#070221",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroArea: {
    position: "relative",
    height: "48%",
    marginTop: 8,
  },
  orb: {
    position: "absolute",
    borderRadius: 999,
  },
  topRightOrb: {
    right: -80,
    top: 24,
    width: 290,
    height: 290,
    backgroundColor: "rgba(132, 56, 36, 0.28)",
  },
  midLeftOrb: {
    left: -50,
    top: 215,
    width: 180,
    height: 180,
    backgroundColor: "rgba(104, 56, 48, 0.2)",
  },
  card: {
    position: "absolute",
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  cardScholarship: {
    top: 82,
    left: "28%",
    right: 26,
    transform: [{ rotate: "-6deg" }],
    backgroundColor: "#E8E1CA",
  },
  cardInternship: {
    top: 126,
    left: "34%",
    right: 28,
    transform: [{ rotate: "4deg" }],
    backgroundColor: "#D8D8EA",
  },
  cardEvent: {
    top: 168,
    left: "22%",
    right: 26,
    backgroundColor: "#F2F2F5",
  },
  cardLabel: {
    fontSize: 15,
    letterSpacing: 1,
    fontWeight: "700",
    color: "#7F8191",
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: "#06103F",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
    justifyContent: "flex-end",
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255, 145, 29, 0.4)",
    backgroundColor: "rgba(97, 40, 29, 0.45)",
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 22,
  },
  chipText: {
    color: "#FF8B0D",
    fontSize: 16,
    fontWeight: "700",
  },
  headingWhite: {
    color: "#FFFFFF",
    fontSize: 56,
    lineHeight: 58,
    fontWeight: "800",
  },
  headingOrange: {
    color: "#FF8A00",
    fontSize: 56,
    lineHeight: 58,
    fontWeight: "800",
    marginBottom: 18,
  },
  subheading: {
    color: "#9B9FB3",
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "500",
    marginBottom: 26,
  },
  googleButton: {
    backgroundColor: "#F28300",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingVertical: 18,
    shadowColor: "#FF8A00",
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  googleButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  skipButton: {
    marginTop: 22,
    alignItems: "center",
  },
  skipButtonText: {
    color: "#7F839A",
    fontSize: 15,
    fontWeight: "500",
  },
});

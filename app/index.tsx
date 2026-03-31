import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Fonts } from "@/constants/theme";

type FloatingCard = {
  id: string;
  label: string;
  title: string;
  bg: string;
  top: number;
  left: number;
  width: number;
  rotation: string;
};

const floatingCards: FloatingCard[] = [
  {
    id: "scholarship",
    label: "SCHOLARSHIP",
    title: "Fulbright 2025",
    bg: "#E9E3CC",
    top: 104,
    left: 96,
    width: 236,
    rotation: "-7deg",
  },
  {
    id: "internship",
    label: "INTERNSHIP",
    title: "Google x CamCode",
    bg: "#D7D8EA",
    top: 138,
    left: 126,
    width: 228,
    rotation: "4deg",
  },
  {
    id: "event",
    label: "EVENT",
    title: "TEDxPhnomPenh Youth Forum",
    bg: "#FFFFFF",
    top: 174,
    left: 52,
    width: 248,
    rotation: "-1deg",
  },
];

export default function IndexScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isSmall = width < 380;

  const headingSize = isSmall ? 44 : 50;
  const headingLineHeight = isSmall ? 48 : 54;
  const cardScale = isSmall ? 0.92 : 1;
  const stackTopOffset = insets.top + 2;

  const goToInterests = () => {
    router.push("/modal");
  };

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.bgBlobTopRight} />
      <View style={styles.bgBlobMidLeft} />
      <View style={styles.bgGlowBottomLeft} />

      {floatingCards.map((card) => (
        <View
          key={card.id}
          style={[
            styles.floatingCard,
            {
              backgroundColor: card.bg,
              top: card.top + stackTopOffset,
              left: card.left,
              width: card.width,
              transform: [{ rotate: card.rotation }, { scale: cardScale }],
            },
          ]}
        >
          <Text style={styles.cardLabel}>{card.label}</Text>
          <Text style={styles.cardTitle}>{card.title}</Text>
        </View>
      ))}

      <View
        style={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom + 12, 26),
          },
        ]}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✦ For Cambodian Students</Text>
        </View>

        <Text
          style={[
            styles.headingPrimary,
            { fontSize: headingSize, lineHeight: headingLineHeight },
          ]}
        >
          Discover Your
        </Text>
        <Text
          style={[
            styles.headingAccent,
            { fontSize: headingSize, lineHeight: headingLineHeight },
          ]}
        >
          Next Opportunity
        </Text>

        <Text style={styles.subtitle}>
          Scholarships, internships, events, and more - all in one place,
          personalized for you.
        </Text>

        <TouchableOpacity
          style={styles.googleButton}
          activeOpacity={0.92}
          onPress={goToInterests}
        >
          <FontAwesome
            name="google"
            size={21}
            color="#FFFFFF"
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.85} onPress={goToInterests}>
          <Text style={styles.secondaryAction}>Continue without account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#10062D",
  },
  bgBlobTopRight: {
    position: "absolute",
    width: 338,
    height: 338,
    borderRadius: 169,
    backgroundColor: "#4A2826",
    opacity: 0.5,
    top: -32,
    right: -72,
  },
  bgBlobMidLeft: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "#39252B",
    opacity: 0.5,
    top: 350,
    left: 40,
  },
  bgGlowBottomLeft: {
    position: "absolute",
    width: 226,
    height: 226,
    borderRadius: 113,
    backgroundColor: "#7A77BC",
    opacity: 0.3,
    bottom: 108,
    left: -94,
  },
  floatingCard: {
    position: "absolute",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  cardLabel: {
    fontSize: 9,
    lineHeight: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#727487",
  },
  cardTitle: {
    marginTop: 5,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "800",
    color: "#0A1747",
    fontFamily: Fonts.rounded,
  },
  content: {
    marginTop: "auto",
    paddingHorizontal: 18,
    paddingBottom: 26,
  },
  badge: {
    borderWidth: 1,
    borderColor: "#72432A",
    backgroundColor: "#342032",
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 13,
  },
  badgeText: {
    color: "#ED8311",
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  headingPrimary: {
    marginTop: 18,
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: -0.8,
    fontFamily: Fonts.rounded,
  },
  headingAccent: {
    color: "#ED8311",
    fontWeight: "800",
    letterSpacing: -0.8,
    fontFamily: Fonts.rounded,
  },
  subtitle: {
    marginTop: 14,
    maxWidth: 340,
    color: "#A8ABBF",
    fontSize: 11,
    lineHeight: 17,
    fontWeight: "500",
  },
  googleButton: {
    marginTop: 22,
    minHeight: 58,
    borderRadius: 20,
    backgroundColor: "#ED8311",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ED8311",
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: Fonts.sans,
  },
  secondaryAction: {
    marginTop: 14,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "500",
    textAlign: "center",
    color: "#A7A8BC",
  },
});

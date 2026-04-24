import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    ImageBackground,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const heroImage = {
  uri: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
};

export default function AboutUsScreen() {
  const router = useRouter();

  const handleEmailPress = async () => {
    const emailUrl = "mailto:contact@example.com";
    const canOpen = await Linking.canOpenURL(emailUrl);
    if (canOpen) {
      await Linking.openURL(emailUrl);
    }
  };

  return (
    <SafeAreaView
      style={styles.screen}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.85}
        >
          <Ionicons name="arrow-back" size={24} color="#4748BA" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>About OpportCam</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.sectionBase}>
          <View style={styles.heroCard}>
            <ImageBackground
              source={heroImage}
              style={styles.heroImage}
              imageStyle={styles.heroImageRounded}
            >
              <View style={styles.heroOverlay} />

              <View style={styles.heroIconBox}>
                <View style={styles.heroLogoMark}>
                  <View style={styles.heroLogoCircle}>
                    <Ionicons name="school-outline" size={43} color="#5F59DD" />
                  </View>
                  <View style={styles.heroLogoHandle} />
                </View>
              </View>

              <Text style={styles.heroTitle}>About Us</Text>
              <Text style={styles.heroSubtitle}>SOF</Text>
              <Text style={styles.heroFootnote}>
                Student Opportunity Finder
              </Text>
            </ImageBackground>
          </View>

          <Text style={styles.missionTitle}>Our Mission</Text>
          <Text style={styles.bodyLarge}>
            SOF is a free, student-built platform that helps Cambodian students
            discover volunteering opportunities, events, courses, and
            competitions - all in one place.
          </Text>
          <Text style={styles.bodyLarge}>
            We built this because finding opportunities in Cambodia is
            fragmented. Valuable announcements get buried in Telegram channels,
            shared groups, and social media posts that not everyone follows.
            Students miss deadlines. Opportunities go unnoticed. SOF solves this
            by automatically collecting posts from trusted Telegram channels,
            extracting the key details, and presenting them in a clean,
            searchable format - in both English and Khmer.
          </Text>
        </View>

        <View style={[styles.sectionBase, styles.sectionTint]}>
          <Text style={styles.sectionHeading}>What We Do</Text>
          <Text style={styles.bodyText}>
            We monitor a curated list of Cambodian Telegram channels that post
            student opportunities. Our system reads public announcements,
            extracts relevant information (title, deadline, organization, type,
            contact details), and makes them browsable on this platform.
          </Text>

          <View style={styles.calloutCard}>
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color="#3F41C9"
            />
            <Text style={styles.calloutText}>
              Every listing goes through a human review step before it appears
              on the site. We do not publish anything automatically - a team
              member verifies each entry first.
            </Text>
          </View>
        </View>

        <View style={styles.sectionBase}>
          <Text style={styles.sectionHeading}>Who We Are</Text>
          <Text style={styles.bodyText}>
            We are a small team of students in Cambodia building tools we wish
            existed when we started our own academic and career journeys. This
            is a student project, not a commercial product.
          </Text>
        </View>

        <View style={[styles.sectionBase, styles.sectionMuted]}>
          <Text style={styles.sectionHeading}>What We Are Not</Text>

          <View style={styles.bulletRow}>
            <Ionicons name="close" size={24} color="#E84545" />
            <Text style={styles.bodyTextBullet}>
              We are not affiliated with any of the organizations posting
              opportunities.
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <Ionicons name="close" size={24} color="#E84545" />
            <Text style={styles.bodyTextBullet}>
              We are not a recruitment agency or scholarship provider.
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <Ionicons name="close" size={24} color="#E84545" />
            <Text style={styles.bodyTextBullet}>
              We do not guarantee the accuracy, availability, or legitimacy of
              any listing.
            </Text>
          </View>

          <View style={[styles.bulletRow, styles.infoRow]}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#3F41C9"
            />
            <Text style={styles.infoText}>
              Always verify opportunities directly with the source organization
              before applying.
            </Text>
          </View>
        </View>

        <View style={styles.sectionBase}>
          <Text style={styles.sectionHeading}>Contact</Text>
          <Text style={styles.bodyText}>
            Have a question, found an error, or want to suggest a new feature?
          </Text>

          <TouchableOpacity
            style={styles.contactRow}
            onPress={handleEmailPress}
            activeOpacity={0.85}
          >
            <Ionicons name="mail-outline" size={31} color="#3F41C9" />
            <Text style={styles.emailLink}>contact@example.com</Text>
          </TouchableOpacity>

          <View style={styles.contactRow}>
            <Ionicons name="location-outline" size={31} color="#3F41C9" />
            <Text style={styles.locationText}>Phnom Penh, Cambodia</Text>
          </View>

          <View style={styles.footerDivider} />

          <Text style={styles.copyrightText}>
            © 2026 SOF. All rights reserved.
          </Text>
          <Text style={styles.versionText}>Version 2.5.0 (Build 9012)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F5F8",
  },
  header: {
    minHeight: 74,
    backgroundColor: "#F4F5F8",
    borderBottomWidth: 1,
    borderBottomColor: "#DCDDEA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 14,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3E1F0",
  },
  headerTitle: {
    color: "#171F38",
    fontSize: 18,
    fontWeight: "800",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionBase: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 22,
    backgroundColor: "#F4F5F8",
  },
  sectionTint: {
    backgroundColor: "#ECECF3",
  },
  sectionMuted: {
    backgroundColor: "#E2E4EC",
  },
  heroCard: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#A29DD8",
  },
  heroImage: {
    minHeight: 262,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  heroImageRounded: {
    borderRadius: 16,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(87, 84, 150, 0.46)",
  },
  heroIconBox: {
    zIndex: 1,
    width: 104,
    height: 104,
    borderRadius: 24,
    backgroundColor: "#E7E8F3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroLogoMark: {
    width: 84,
    height: 84,
    alignItems: "center",
    justifyContent: "center",
  },
  heroLogoCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 4,
    borderColor: "#5F59DD",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  heroLogoHandle: {
    position: "absolute",
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#5F59DD",
    right: -2,
    bottom: 5,
    transform: [{ rotate: "45deg" }],
  },
  heroTitle: {
    zIndex: 1,
    color: "#FFFFFF",
    fontSize: 44,
    lineHeight: 52,
    fontWeight: "800",
  },
  heroSubtitle: {
    zIndex: 1,
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 34,
    marginTop: 6,
    fontWeight: "700",
  },
  heroFootnote: {
    zIndex: 1,
    position: "absolute",
    left: 16,
    bottom: 10,
    color: "#FFFFFF",
    fontSize: 13,
    opacity: 0.9,
    fontWeight: "600",
  },
  missionTitle: {
    marginTop: 30,
    textAlign: "center",
    color: "#3D34B6",
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "800",
    marginBottom: 14,
  },
  sectionHeading: {
    color: "#161F39",
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "800",
    marginBottom: 12,
  },
  bodyLarge: {
    color: "#465571",
    fontSize: 16,
    lineHeight: 28,
    fontWeight: "500",
    marginBottom: 14,
  },
  bodyText: {
    color: "#465571",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
    marginBottom: 12,
  },
  calloutCard: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D8DAE7",
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  calloutText: {
    flex: 1,
    color: "#445169",
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "600",
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  bodyTextBullet: {
    flex: 1,
    color: "#465571",
    fontSize: 15,
    lineHeight: 23,
    fontWeight: "500",
  },
  infoRow: {
    marginTop: 4,
  },
  infoText: {
    flex: 1,
    color: "#1A2238",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "800",
  },
  contactRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  emailLink: {
    color: "#3F41C9",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800",
  },
  locationText: {
    color: "#43526D",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
  footerDivider: {
    marginTop: 16,
    height: 1,
    backgroundColor: "#D8DCE8",
  },
  copyrightText: {
    marginTop: 16,
    textAlign: "center",
    color: "#8A95B0",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
  },
  versionText: {
    marginTop: 4,
    textAlign: "center",
    color: "#8390AC",
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.7,
  },
});

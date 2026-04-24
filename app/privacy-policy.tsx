import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  const emailAddress = "SOF@gmail.com";
  const googlePolicyUrl = "https://policies.google.com/privacy";

  const openUrl = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
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
          <Ionicons name="arrow-back" size={23} color="#3943A7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.updatePill}>
          <Text style={styles.updatePillText}>
            Last Updated: October 24, 2023
          </Text>
        </View>

        <Text style={styles.paragraphIntro}>
          This Privacy Policy explains how we collect, use, and handle
          information when you use our website. We have written this in plain
          language. If something is unclear, please contact us.
        </Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>

        <Text style={styles.subHeading}>A. Information you provide</Text>
        <Text style={styles.paragraphIndented}>
          If you create an account: your email address and any profile
          preferences you choose to set (such as opportunity types or language
          preference).
        </Text>
        <Text style={styles.paragraphIndented}>
          If you contact us: the message content and your email address.
        </Text>

        <Text style={styles.subHeading}>
          B. Information collected automatically
        </Text>
        <Text style={styles.paragraphIndented}>
          Basic usage data: pages visited, search terms used, filters applied.
        </Text>
        <Text style={styles.paragraphIndented}>
          Device and browser type, approximate location (country/city level
          only).
        </Text>
        <Text style={styles.paragraphIndented}>
          This is collected through standard server logs or analytics tools.
        </Text>

        <Text style={styles.subHeading}>C. What we do NOT collect</Text>
        <Text style={styles.paragraphIndented}>
          We do not collect your full name unless you provide it voluntarily.
        </Text>
        <Text style={styles.paragraphIndented}>
          We do not collect payment information - the platform is free.
        </Text>
        <Text style={styles.paragraphIndented}>
          We do not track you across other websites.
        </Text>

        <Text style={styles.sectionTitle}>
          2. Where Opportunity Data Comes From
        </Text>
        <Text style={styles.paragraphBody}>
          The listings on this platform are sourced from public Telegram
          channels operating in Cambodia. We do not scrape private groups,
          direct messages, or any content that is not publicly visible.
        </Text>
        <Text style={styles.paragraphBody}>
          The original posts are written by third-party organizations and
          individuals. We extract structured information (title, deadline,
          contact details) from these public posts using automated tools, then a
          human reviewer verifies each entry before it is published.
        </Text>

        <View style={styles.neutralNoteBox}>
          <Text style={styles.noteText}>
            If you are the author of a post and want it removed from our
            platform, contact us at
            <Text
              style={styles.inlineLink}
              onPress={() => openUrl(`mailto:${emailAddress}`)}
            >
              {` ${emailAddress}`}
            </Text>
            and we will remove it promptly.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
        <Text style={styles.paragraphIndented}>
          To operate the platform and display relevant opportunities to you.
        </Text>
        <Text style={styles.paragraphIndented}>
          To remember your preferences (language, filters, bookmarks) if you
          have an account.
        </Text>
        <Text style={styles.paragraphIndented}>
          To improve the platform based on how it is used (aggregated, not
          individual).
        </Text>
        <Text style={styles.paragraphIndented}>
          To respond to your messages if you contact us.
        </Text>

        <View style={styles.greenNoteBox}>
          <Text style={styles.greenNoteText}>
            We do not sell your data. We do not share your data with
            advertisers. We do not use your data to profile you for commercial
            purposes.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>4. Third-Party Services</Text>
        <Text style={styles.paragraphBody}>
          We use Google's AI services on the backend to help extract structured
          information from public post text. No personal user data is sent to
          these services.
        </Text>
        <Text style={styles.helperText}>See Google's Privacy Policy:</Text>
        <Text style={styles.blockLink} onPress={() => openUrl(googlePolicyUrl)}>
          https://policies.google.com/privacy
        </Text>

        <Text style={styles.sectionTitle}>5. Data Retention</Text>
        <Text style={styles.paragraphIndented}>
          Raw scraped posts are kept in our database indefinitely for auditing
          and reprocessing purposes.
        </Text>
        <Text style={styles.paragraphIndented}>
          If you delete your account, your personal data (email, preferences,
          bookmarks) is deleted within 30 days.
        </Text>
        <Text style={styles.paragraphIndented}>
          Server logs are retained for up to 90 days.
        </Text>

        <Text style={styles.sectionTitle}>6. Your Rights</Text>
        <Text style={styles.paragraphBody}>You have the right to:</Text>
        <Text style={styles.paragraphIndented}>
          Access the personal data we hold about you.
        </Text>
        <Text style={styles.paragraphIndented}>
          Request correction of inaccurate data.
        </Text>
        <Text style={styles.paragraphIndented}>
          Request deletion of your account and associated data.
        </Text>
        <Text style={styles.paragraphIndented}>
          Opt out of any non-essential data collection.
        </Text>
        <Text style={styles.paragraphBody}>
          To exercise any of these rights, email us at: {emailAddress}. We will
          respond within 14 days.
        </Text>

        <Text style={styles.sectionTitle}>7. Children</Text>
        <Text style={styles.paragraphBody}>
          This platform is intended for students and general users. We do not
          knowingly collect personal data from children under the age of 13. If
          you believe a child has submitted personal data to us, please contact
          us so we can remove it.
        </Text>

        <Text style={styles.sectionTitle}>8. Changes to This Policy</Text>
        <Text style={styles.paragraphBody}>
          If we make significant changes to this policy, we will update the
          "Last updated" date at the top. Continued use of the platform after
          changes means you accept the updated policy.
        </Text>

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>9. Contact Us</Text>

          <View style={styles.contactRow}>
            <Ionicons name="mail-outline" size={16} color="#DEE3FF" />
            <Text style={styles.contactText}>
              Email:
              <Text
                style={styles.contactLink}
                onPress={() => openUrl(`mailto:${emailAddress}`)}
              >
                {` ${emailAddress}`}
              </Text>
            </Text>
          </View>

          <View style={styles.contactRow}>
            <Ionicons name="cube-outline" size={15} color="#DEE3FF" />
            <Text style={styles.contactText}>Project: SOF</Text>
          </View>

          <View style={styles.contactRow}>
            <Ionicons name="location-outline" size={15} color="#DEE3FF" />
            <Text style={styles.contactText}>Location: Cambodia</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActionBar}>
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.9}
          onPress={() => router.back()}
        >
          <Text style={styles.ctaButtonText}>I Understand</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F8",
  },
  header: {
    minHeight: 58,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D8DCE7",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "800",
    color: "#1A223D",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 136,
  },
  updatePill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: "#ECE8F7",
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 22,
  },
  updatePillText: {
    color: "#3B35B0",
    fontSize: 14,
    fontWeight: "700",
  },
  paragraphIntro: {
    color: "#445169",
    fontSize: 15,
    lineHeight: 27,
    marginBottom: 26,
  },
  sectionTitle: {
    color: "#171F38",
    fontSize: 22,
    lineHeight: 34,
    fontWeight: "800",
    marginTop: 24,
    marginBottom: 12,
  },
  subHeading: {
    color: "#1D263D",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "800",
    marginTop: 12,
    marginBottom: 8,
  },
  paragraphBody: {
    color: "#445169",
    fontSize: 15,
    lineHeight: 27,
    marginBottom: 10,
  },
  paragraphIndented: {
    color: "#445169",
    fontSize: 15,
    lineHeight: 27,
    marginBottom: 8,
    paddingLeft: 16,
  },
  helperText: {
    color: "#1C253A",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 8,
  },
  blockLink: {
    color: "#2C2F9F",
    fontSize: 15,
    lineHeight: 24,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  neutralNoteBox: {
    marginTop: 12,
    marginBottom: 14,
    backgroundColor: "#ECECF2",
    borderColor: "#D8D8E8",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  noteText: {
    color: "#445169",
    fontSize: 15,
    lineHeight: 27,
  },
  inlineLink: {
    color: "#2C2F9F",
    fontWeight: "800",
    textDecorationLine: "underline",
  },
  greenNoteBox: {
    marginTop: 10,
    marginBottom: 18,
    backgroundColor: "#E5F4EB",
    borderColor: "#CAE8D5",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  greenNoteText: {
    color: "#1E6B3E",
    fontSize: 15,
    lineHeight: 26,
    fontWeight: "700",
  },
  contactCard: {
    marginTop: 16,
    borderRadius: 18,
    backgroundColor: "#28216B",
    paddingHorizontal: 24,
    paddingVertical: 22,
    shadowColor: "#1B184A",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  contactTitle: {
    color: "#F5F7FF",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 14,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  contactText: {
    color: "#D6DBFF",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
  },
  contactLink: {
    color: "#FFFFFF",
    textDecorationLine: "underline",
    fontWeight: "800",
  },
  bottomActionBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: "#D8DCE7",
    backgroundColor: "#F5F5F8",
  },
  ctaButton: {
    borderRadius: 14,
    backgroundColor: "#3E2CAB",
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2D257B",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  ctaButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
});

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

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBackground: string;
  iconColor: string;
  highlighted?: boolean;
  showUnreadDot?: boolean;
  showOnlineBadge?: boolean;
};

const notifications: NotificationItem[] = [
  {
    id: "scholarship-match",
    title: "New scholarship matching profile",
    message:
      "The 'Global Leaders Grant' for $15,000 is now open for your profile.",
    time: "2m ago",
    icon: "sparkles-outline",
    iconBackground: "#3C33B5",
    iconColor: "#FFFFFF",
    highlighted: true,
    showUnreadDot: true,
  },
  {
    id: "deadline",
    title: "Deadline approaching for application",
    message:
      "Final reminder: You have 48 hours left to submit your 2024 application.",
    time: "1h ago",
    icon: "time-outline",
    iconBackground: "#F4E3CB",
    iconColor: "#F07A1D",
    highlighted: true,
    showUnreadDot: true,
  },
  {
    id: "fund-message",
    title: "Message from Education Fund",
    message:
      '"We\'ve reviewed your preliminary documents. Please upload your..."',
    time: "4h ago",
    icon: "school-outline",
    iconBackground: "#0E5D5A",
    iconColor: "#DDF4F2",
    showOnlineBadge: true,
  },
  {
    id: "new-message",
    title: "New Message from Support",
    message:
      "Hi there, I wanted to follow up on your recent inquiry regarding the fellowship...",
    time: "Yesterday",
    icon: "mail-outline",
    iconBackground: "#EEF2F7",
    iconColor: "#55627A",
  },
  {
    id: "status-updated",
    title: "Application Status Updated",
    message:
      "Your application for the STEM Excellence Award has been moved to 'Under Review'.",
    time: "2d ago",
    icon: "ribbon-outline",
    iconBackground: "#F0F3F8",
    iconColor: "#5B667C",
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1A2338" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <TouchableOpacity activeOpacity={0.8} style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={22} color="#1A2338" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((item) => (
          <View
            key={item.id}
            style={[
              styles.row,
              item.highlighted ? styles.rowHighlighted : null,
            ]}
          >
            <View style={styles.rowMain}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: item.iconBackground },
                ]}
              >
                <Ionicons name={item.icon} size={23} color={item.iconColor} />
                {item.showOnlineBadge ? (
                  <View style={styles.onlineBadge} />
                ) : null}
              </View>

              <View style={styles.textWrap}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.itemMessage} numberOfLines={2}>
                  {item.message}
                </Text>
              </View>
            </View>

            <View style={styles.metaWrap}>
              <Text
                style={[
                  styles.itemTime,
                  item.showUnreadDot ? styles.itemTimeUnread : null,
                ]}
              >
                {item.time}
              </Text>
              {item.showUnreadDot ? <View style={styles.unreadDot} /> : null}
            </View>
          </View>
        ))}

        <Text style={styles.footerText}>No more notifications for today</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F9FC",
  },
  header: {
    height: 72,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E6EAF2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    marginLeft: 8,
    color: "#151F36",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 54,
  },
  row: {
    minHeight: 112,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E6EAF2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  rowHighlighted: {
    backgroundColor: "#F4F3FB",
  },
  rowMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  onlineBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#2ECC71",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  textWrap: {
    flex: 1,
    marginLeft: 14,
    paddingRight: 8,
  },
  itemTitle: {
    color: "#151F36",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800",
  },
  itemMessage: {
    marginTop: 4,
    color: "#5D6882",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  metaWrap: {
    marginLeft: 8,
    alignItems: "flex-end",
    minWidth: 60,
  },
  itemTime: {
    color: "#76809A",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  itemTimeUnread: {
    color: "#444AC0",
    fontWeight: "700",
  },
  unreadDot: {
    marginTop: 8,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#4A43C5",
  },
  footerText: {
    marginTop: 28,
    textAlign: "center",
    color: "#8B95AD",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
  },
});

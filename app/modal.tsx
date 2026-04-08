import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

type InterestChip = {
  id: string;
  label: string;
  selected?: boolean;
  emoji?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  dotColor?: string;
};

const iosSections: { title: string; items: InterestChip[] }[] = [
  {
    title: "OPPORTUNITY TYPE",
    items: [
      {
        id: "scholarships",
        label: "Scholarships",
        selected: true,
        emoji: "🎓",
      },
      { id: "events", label: "Events", selected: true, emoji: "🏢" },
      { id: "courses", label: "Courses", emoji: "📚" },
      {
        id: "volunteering",
        label: "Volunteering",
        selected: true,
        emoji: "🤝",
      },
      { id: "internships", label: "Internships", emoji: "💼" },
    ],
  },
  {
    title: "SUBJECT AREA",
    items: [
      { id: "web-dev", label: "Web Dev", selected: true, emoji: "💻" },
      { id: "business", label: "Business", emoji: "📊" },
      { id: "social-work", label: "Social Work", selected: true, emoji: "🌱" },
      { id: "healthcare", label: "Healthcare", emoji: "🧬" },
      { id: "arts", label: "Arts", emoji: "🎨" },
      { id: "technology", label: "Technology", emoji: "⚙️" },
    ],
  },
  {
    title: "FORMAT",
    items: [
      { id: "online", label: "Online", emoji: "🌐" },
      { id: "in-person", label: "In-person", emoji: "🏢" },
      { id: "hybrid", label: "Hybrid", emoji: "🔀" },
    ],
  },
];

const androidSections: { title: string; items: InterestChip[] }[] = [
  {
    title: "OPPORTUNITY TYPE",
    items: [
      {
        id: "scholarships",
        label: "Scholarships",
        selected: true,
        icon: "checkmark",
      },
      { id: "events", label: "Events", icon: "flash" },
      {
        id: "internships",
        label: "Internships",
        selected: true,
        icon: "checkmark",
      },
      { id: "volunteering", label: "Volunteering", icon: "hand-left" },
    ],
  },
  {
    title: "SUBJECT AREA",
    items: [
      { id: "web-dev", label: "Web Dev", selected: true, icon: "checkmark" },
      { id: "business", label: "Business", icon: "briefcase" },
      {
        id: "social-work",
        label: "Social Work",
        selected: true,
        icon: "checkmark",
      },
      { id: "healthcare", label: "Healthcare", icon: "medkit" },
      { id: "arts", label: "Arts", selected: true, icon: "checkmark" },
      { id: "technology", label: "Technology", icon: "laptop" },
    ],
  },
  {
    title: "FORMAT",
    items: [
      { id: "online", label: "Online", dotColor: "#40C978" },
      { id: "in-person", label: "In-person", dotColor: "#4F8EEB" },
      { id: "hybrid", label: "Hybrid", dotColor: "#A877F3" },
    ],
  },
];

function InterestPill({ item, isIOS }: { item: InterestChip; isIOS: boolean }) {
  const isSelected = Boolean(item.selected);

  if (isIOS) {
    return (
      <View
        style={[
          iosStyles.pill,
          isSelected ? iosStyles.pillSelected : iosStyles.pillDefault,
        ]}
      >
        {isSelected ? <Text style={iosStyles.tick}>✓</Text> : null}
        {item.emoji ? <Text style={iosStyles.emoji}>{item.emoji}</Text> : null}
        <Text style={iosStyles.pillText}>{item.label}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        androidStyles.pill,
        isSelected ? androidStyles.pillSelected : androidStyles.pillDefault,
      ]}
    >
      {item.dotColor ? (
        <View style={[androidStyles.dot, { backgroundColor: item.dotColor }]} />
      ) : null}
      {item.icon ? (
        <Ionicons
          name={item.icon}
          size={14}
          color={isSelected ? "#4F46D8" : "#6F778F"}
          style={androidStyles.icon}
        />
      ) : null}
      <Text
        style={[
          androidStyles.pillText,
          isSelected ? androidStyles.pillTextSelected : null,
        ]}
      >
        {item.label}
      </Text>
    </View>
  );
}

export default function ModalScreen() {
  const router = useRouter();
  const isIOS = Platform.OS === "ios";

  const sections = isIOS ? iosSections : androidSections;
  const selectedCount = sections
    .flatMap((section) => section.items)
    .filter((item) => item.selected).length;

  return (
    <SafeAreaView
      style={isIOS ? iosStyles.screen : androidStyles.screen}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={
          isIOS ? iosStyles.content : androidStyles.content
        }
        showsVerticalScrollIndicator={false}
      >
        <Text style={isIOS ? iosStyles.heading : androidStyles.heading}>
          What are you interested in?
        </Text>
        <Text style={isIOS ? iosStyles.subheading : androidStyles.subheading}>
          Select at least 3 to personalize your feed
        </Text>
        <Text
          style={isIOS ? iosStyles.selectedText : androidStyles.selectedText}
        >
          {selectedCount} selected
        </Text>

        {sections.map((section) => (
          <View
            key={section.title}
            style={isIOS ? iosStyles.section : androidStyles.section}
          >
            <Text
              style={
                isIOS ? iosStyles.sectionTitle : androidStyles.sectionTitle
              }
            >
              {section.title}
            </Text>
            <View style={isIOS ? iosStyles.pillWrap : androidStyles.pillWrap}>
              {section.items.map((item) => (
                <InterestPill key={item.id} item={item} isIOS={isIOS} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={isIOS ? iosStyles.footer : androidStyles.footer}>
        <TouchableOpacity
          style={
            isIOS ? iosStyles.continueButton : androidStyles.continueButton
          }
          activeOpacity={0.9}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text
            style={isIOS ? iosStyles.continueText : androidStyles.continueText}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const iosStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F6F8",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
  },
  heading: {
    color: "#0F1B4D",
    fontSize: 44,
    lineHeight: 48,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  subheading: {
    marginTop: 8,
    color: "#6C738B",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  selectedText: {
    marginTop: 2,
    color: "#F08A00",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    color: "#606B84",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginBottom: 10,
  },
  pillWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pill: {
    minHeight: 42,
    borderRadius: 22,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  pillSelected: {
    backgroundColor: "#E5E7FB",
    borderWidth: 1.5,
    borderColor: "#E5E7FB",
  },
  pillDefault: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#C7BEF0",
  },
  tick: {
    color: "#E58A09",
    fontSize: 13,
    fontWeight: "900",
    marginRight: 7,
  },
  emoji: {
    fontSize: 15,
    marginRight: 8,
  },
  pillText: {
    color: "#17214B",
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "700",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    borderTopColor: "#E7E5F3",
    borderTopWidth: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 18,
  },
  continueButton: {
    minHeight: 60,
    borderRadius: 14,
    backgroundColor: "#E88300",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#CC7400",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 11,
    elevation: 4,
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
});

const androidStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7FA",
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 18,
  },
  heading: {
    color: "#121B38",
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subheading: {
    marginTop: 8,
    color: "#6E758C",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500",
  },
  selectedText: {
    marginTop: 2,
    color: "#4F46D8",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    color: "#939AAA",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  pillWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1.2,
    minHeight: 42,
    paddingHorizontal: 13,
    marginRight: 8,
    marginBottom: 8,
  },
  pillSelected: {
    backgroundColor: "#DAD8FA",
    borderColor: "#DAD8FA",
  },
  pillDefault: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E3E6EF",
  },
  icon: {
    marginRight: 6,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 8,
  },
  pillText: {
    color: "#485066",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
  },
  pillTextSelected: {
    color: "#4F46D8",
    fontWeight: "700",
  },
  footer: {
    backgroundColor: "#F1F2F6",
    borderTopColor: "#E6E8F2",
    borderTopWidth: 1,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 16,
  },
  continueButton: {
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: "#5347DB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5347DB",
    shadowOpacity: 0.24,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "700",
  },
});

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

import { useUserInterests } from "../hooks/use-user-interests";

type InterestChip = {
  id: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  dotColor?: string;
};

type InterestSection = {
  title: string;
  items: InterestChip[];
};

const iosSections: InterestSection[] = [
  {
    title: "OPPORTUNITY TYPE",
    items: [
      { id: "scholarships", label: "Scholarships", icon: "school-outline" },
      { id: "events", label: "Events", icon: "calendar-outline" },
      { id: "courses", label: "Courses", icon: "book-outline" },
      { id: "volunteering", label: "Volunteering", icon: "heart-outline" },
      { id: "internships", label: "Internships", icon: "briefcase-outline" },
    ],
  },
  {
    title: "SUBJECT AREA",
    items: [
      { id: "web-dev", label: "Web Dev", icon: "code-slash-outline" },
      { id: "business", label: "Business", icon: "briefcase-outline" },
      { id: "social-work", label: "Social Work", icon: "people-outline" },
      { id: "healthcare", label: "Healthcare", icon: "medkit-outline" },
      { id: "arts", label: "Arts", icon: "color-palette-outline" },
      { id: "technology", label: "Technology", icon: "laptop-outline" },
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

const androidSections: InterestSection[] = [
  {
    title: "OPPORTUNITY TYPE",
    items: [
      { id: "scholarships", label: "Scholarships", icon: "school-outline" },
      { id: "events", label: "Events", icon: "flash-outline" },
      { id: "internships", label: "Internships", icon: "briefcase-outline" },
      { id: "volunteering", label: "Volunteering", icon: "hand-left-outline" },
    ],
  },
  {
    title: "SUBJECT AREA",
    items: [
      { id: "web-dev", label: "Web Dev", icon: "code-slash-outline" },
      { id: "business", label: "Business", icon: "briefcase-outline" },
      { id: "social-work", label: "Social Work", icon: "people-outline" },
      { id: "healthcare", label: "Healthcare", icon: "medkit-outline" },
      { id: "arts", label: "Arts", icon: "color-palette-outline" },
      { id: "technology", label: "Technology", icon: "laptop-outline" },
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

function InterestPill({
  item,
  isIOS,
  selected,
  onPress,
}: {
  item: InterestChip;
  isIOS: boolean;
  selected: boolean;
  onPress: () => void;
}) {
  const iconName = (selected && !item.dotColor ? "checkmark" : item.icon) as
    | keyof typeof Ionicons.glyphMap
    | undefined;

  if (isIOS) {
    return (
      <TouchableOpacity
        style={[
          iosStyles.pill,
          selected ? iosStyles.pillSelected : iosStyles.pillDefault,
        ]}
        activeOpacity={0.85}
        onPress={onPress}
      >
        {item.dotColor ? (
          <View style={[iosStyles.dot, { backgroundColor: item.dotColor }]} />
        ) : null}
        {iconName ? (
          <Ionicons
            name={iconName}
            size={14}
            color={selected ? "#E58A09" : "#6F778F"}
            style={iosStyles.icon}
          />
        ) : null}
        <Text
          style={[
            iosStyles.pillText,
            selected ? iosStyles.pillTextSelected : null,
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        androidStyles.pill,
        selected ? androidStyles.pillSelected : androidStyles.pillDefault,
      ]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      {item.dotColor ? (
        <View style={[androidStyles.dot, { backgroundColor: item.dotColor }]} />
      ) : null}
      {iconName ? (
        <Ionicons
          name={iconName}
          size={14}
          color={selected ? "#4F46D8" : "#6F778F"}
          style={androidStyles.icon}
        />
      ) : null}
      <Text
        style={[
          androidStyles.pillText,
          selected ? androidStyles.pillTextSelected : null,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

export default function SurveyScreen() {
  const router = useRouter();
  const isIOS = Platform.OS === "ios";
  const { selectedCount, selectedIdSet, toggleInterest } = useUserInterests();

  const sections = isIOS ? iosSections : androidSections;

  const canContinue = selectedCount >= 3;

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

        {isIOS ? (
          <>
            <Text style={iosStyles.subheading}>
              Select at least 3 to personalize your feed.
            </Text>
            <Text style={iosStyles.selectedText}>{selectedCount} selected</Text>
          </>
        ) : (
          <Text style={androidStyles.subheading}>
            Select at least 3 to personalize your feed.{" "}
            <Text style={androidStyles.selectedInline}>
              {selectedCount} selected
            </Text>
          </Text>
        )}

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
                <InterestPill
                  key={item.id}
                  item={item}
                  isIOS={isIOS}
                  selected={selectedIdSet.has(item.id)}
                  onPress={() => toggleInterest(item.id)}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={isIOS ? iosStyles.footer : androidStyles.footer}>
        <TouchableOpacity
          style={[
            isIOS ? iosStyles.continueButton : androidStyles.continueButton,
            !canContinue
              ? isIOS
                ? iosStyles.continueButtonDisabled
                : androidStyles.continueButtonDisabled
              : null,
          ]}
          activeOpacity={0.9}
          disabled={!canContinue}
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
    paddingTop: 44,
    paddingBottom: 20,
  },
  heading: {
    color: "#0F1B4D",
    fontSize: 42,
    lineHeight: 46,
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
    marginTop: 22,
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
    borderWidth: 1.5,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  pillSelected: {
    backgroundColor: "#E5E7FB",
    borderColor: "#C7BEF0",
  },
  pillDefault: {
    backgroundColor: "#FFFFFF",
    borderColor: "#C7BEF0",
  },
  icon: {
    marginRight: 7,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 8,
  },
  pillText: {
    color: "#17214B",
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "700",
  },
  pillTextSelected: {
    color: "#1C2A66",
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
  continueButtonDisabled: {
    backgroundColor: "#D5AF7B",
    shadowOpacity: 0,
    elevation: 0,
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
    backgroundColor: "#F2F2F6",
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 26,
    paddingBottom: 120,
  },
  heading: {
    color: "#121B38",
    fontSize: 44,
    lineHeight: 49,
    fontWeight: "800",
    letterSpacing: -0.9,
    maxWidth: 320,
  },
  subheading: {
    marginTop: 10,
    color: "#6E758C",
    fontSize: 13,
    lineHeight: 22,
    fontWeight: "500",
  },
  selectedInline: {
    color: "#4F46D8",
    fontWeight: "800",
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    color: "#939AAA",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.7,
    marginBottom: 12,
  },
  pillWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 17,
    borderWidth: 1.3,
    minHeight: 54,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  pillSelected: {
    backgroundColor: "#D5D2FC",
    borderColor: "#4F46D8",
  },
  pillDefault: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E3E6EF",
  },
  icon: {
    marginRight: 7,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 9,
  },
  pillText: {
    color: "#485066",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
  },
  pillTextSelected: {
    color: "#4F46D8",
    fontWeight: "700",
  },
  footer: {
    backgroundColor: "#F2F2F6",
    paddingHorizontal: 28,
    paddingTop: 10,
    paddingBottom: 20,
  },
  continueButton: {
    minHeight: 76,
    borderRadius: 22,
    backgroundColor: "#5347DB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5347DB",
    shadowOpacity: 0.24,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 6,
  },
  continueButtonDisabled: {
    backgroundColor: "#B6AFE8",
    shadowOpacity: 0,
    elevation: 0,
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
  },
});

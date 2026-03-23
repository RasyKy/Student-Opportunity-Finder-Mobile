import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type InterestOption = {
  id: string;
  icon: string;
  label: string;
};

const opportunityType: InterestOption[] = [
  { id: "scholarships", icon: "🎓", label: "Scholarships" },
  { id: "events", icon: "🗓️", label: "Events" },
  { id: "courses", icon: "📚", label: "Courses" },
  { id: "volunteering", icon: "🤝", label: "Volunteering" },
  { id: "internships", icon: "💼", label: "Internships" },
];

const subjectArea: InterestOption[] = [
  { id: "web-dev", icon: "💻", label: "Web Dev" },
  { id: "business", icon: "📊", label: "Business" },
  { id: "social-work", icon: "🌱", label: "Social Work" },
  { id: "healthcare", icon: "🩺", label: "Healthcare" },
  { id: "arts", icon: "🎨", label: "Arts" },
  { id: "technology", icon: "⚙️", label: "Technology" },
];

const formatType: InterestOption[] = [
  { id: "online", icon: "🌐", label: "Online" },
  { id: "in-person", icon: "🏢", label: "In-person" },
  { id: "hybrid", icon: "🔁", label: "Hybrid" },
];

const initialSelected = [
  "scholarships",
  "events",
  "volunteering",
  "web-dev",
  "social-work",
];

export default function HomeScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(
    new Set(initialSelected),
  );

  const selectedCount = selected.size;
  const canContinue = selectedCount >= 3;

  const sections = useMemo(
    () => [
      { title: "OPPORTUNITY TYPE", options: opportunityType },
      { title: "SUBJECT AREA", options: subjectArea },
      { title: "FORMAT", options: formatType },
    ],
    [],
  );

  const toggleOption = (id: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const onContinue = () => {
    if (!canContinue) return;
    router.push("/(tabs)/explore");
  };

  return (
    <SafeAreaView
      style={styles.screen}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>What are you interested in?</Text>
        <Text style={styles.subtitle}>
          Select at least 3 to personalize your feed
        </Text>
        <Text style={styles.selectedCount}>{selectedCount} selected</Text>

        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            <View style={styles.optionsWrap}>
              {section.options.map((option) => {
                const isSelected = selected.has(option.id);
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionChip,
                      isSelected ? styles.optionChipSelected : undefined,
                    ]}
                    activeOpacity={0.85}
                    onPress={() => toggleOption(option.id)}
                  >
                    {isSelected ? (
                      <Text style={styles.optionCheck}>✓</Text>
                    ) : null}
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                    <Text style={styles.optionText}>{option.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !canContinue ? styles.continueButtonDisabled : undefined,
          ]}
          onPress={onContinue}
          activeOpacity={0.92}
          disabled={!canContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 18,
    paddingBottom: 24,
  },
  title: {
    fontSize: 50,
    lineHeight: 56,
    fontWeight: "800",
    color: "#0A123B",
    maxWidth: 430,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 17,
    color: "#77809A",
    fontWeight: "500",
  },
  selectedCount: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: "700",
    color: "#E58600",
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 12,
    letterSpacing: 2,
    color: "#6E778F",
    fontWeight: "800",
  },
  optionsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 14,
  },
  optionChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#C1B5F3",
    backgroundColor: "#F5F5F8",
  },
  optionChipSelected: {
    backgroundColor: "#E8E9F8",
    borderColor: "#E8E9F8",
  },
  optionCheck: {
    marginRight: 6,
    fontSize: 14,
    color: "#E58600",
    fontWeight: "700",
  },
  optionIcon: {
    marginRight: 8,
    fontSize: 14,
  },
  optionText: {
    fontSize: 17,
    color: "#101A40",
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 30,
    paddingTop: 16,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: "#E0E0EA",
    backgroundColor: "#FBFBFC",
  },
  continueButton: {
    borderRadius: 18,
    backgroundColor: "#E58600",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 68,
    shadowColor: "#E58600",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  continueButtonDisabled: {
    backgroundColor: "#D6C6AA",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
});

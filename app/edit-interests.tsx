import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type InterestGroup = {
  title: string;
  items: string[];
};

const initialSelectedInterests = [
  "Robotics",
  "Coding",
  "Public Speaking",
  "UI Design",
  "Volunteering",
];

const suggestedInterestGroups: InterestGroup[] = [
  {
    title: "STEM & TECHNOLOGY",
    items: ["Machine Learning", "Biology", "Mathematics"],
  },
  {
    title: "ARTS & CREATIVE",
    items: ["Graphic Design", "Photography", "Music Production"],
  },
  {
    title: "CAREER & PROFESSIONAL",
    items: ["Leadership", "Entrepreneurship", "Marketing"],
  },
];

export default function EditInterestsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialSelectedInterests,
  );

  const normalizedQuery = query.trim().toLowerCase();

  const visibleGroups = useMemo(() => {
    return suggestedInterestGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (selectedInterests.includes(item)) {
            return false;
          }

          if (!normalizedQuery) {
            return true;
          }

          return item.toLowerCase().includes(normalizedQuery);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [normalizedQuery, selectedInterests]);

  const handleRemoveInterest = (interest: string) => {
    setSelectedInterests((current) =>
      current.filter((currentInterest) => currentInterest !== interest),
    );
  };

  const handleAddInterest = (interest: string) => {
    setSelectedInterests((current) => {
      if (current.includes(interest)) {
        return current;
      }

      return [...current, interest];
    });
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
          activeOpacity={0.8}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#141E39" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Interests</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={28} color="#746FC4" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search for new interests"
            placeholderTextColor="#9A96D8"
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionTitle}>Selected Interests</Text>
        <Text style={styles.sectionDescription}>
          These are the topics we&apos;ll prioritize for your opportunities.
        </Text>

        <View style={styles.selectedWrap}>
          {selectedInterests.map((interest) => (
            <TouchableOpacity
              key={interest}
              style={styles.selectedChip}
              activeOpacity={0.85}
              onPress={() => handleRemoveInterest(interest)}
            >
              <Text style={styles.selectedChipText}>{interest}</Text>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Suggested Categories</Text>

        {visibleGroups.length === 0 ? (
          <Text style={styles.noResultsText}>
            No suggested categories found.
          </Text>
        ) : null}

        {visibleGroups.map((group) => (
          <View key={group.title} style={styles.groupBlock}>
            <Text style={styles.groupTitle}>{group.title}</Text>

            <View style={styles.suggestedWrap}>
              {group.items.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.suggestedChip}
                  activeOpacity={0.85}
                  onPress={() => handleAddInterest(item)}
                >
                  <Ionicons name="add" size={26} color="#3B34B1" />
                  <Text style={styles.suggestedChipText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.9}
          onPress={() => router.back()}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },
  header: {
    height: 74,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E8F1",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  headerTitle: {
    color: "#161F38",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 130,
  },
  searchWrap: {
    minHeight: 66,
    borderRadius: 16,
    backgroundColor: "#F0F1F8",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: "#202A46",
    fontSize: 18,
    fontWeight: "500",
    paddingVertical: 10,
  },
  sectionTitle: {
    marginTop: 28,
    color: "#171F38",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  sectionDescription: {
    marginTop: 10,
    color: "#596A86",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "500",
    maxWidth: 430,
  },
  selectedWrap: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  selectedChip: {
    minHeight: 54,
    borderRadius: 27,
    paddingHorizontal: 20,
    backgroundColor: "#3E33B5",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#2E2490",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  selectedChipText: {
    color: "#FFFFFF",
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "700",
  },
  groupBlock: {
    marginTop: 26,
  },
  groupTitle: {
    color: "#3932AD",
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  suggestedWrap: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  suggestedChip: {
    minHeight: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#C9C5E8",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  suggestedChipText: {
    color: "#34435F",
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "700",
  },
  noResultsText: {
    marginTop: 18,
    color: "#7B86A0",
    fontSize: 15,
    fontWeight: "500",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 10,
    backgroundColor: "transparent",
  },
  saveButton: {
    minHeight: 74,
    borderRadius: 16,
    backgroundColor: "#3D2FAE",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#302695",
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});

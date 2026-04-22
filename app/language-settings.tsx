import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LanguageOption = {
  id: "english" | "khmer";
  label: string;
  region: string;
};

const languageOptions: LanguageOption[] = [
  {
    id: "english",
    label: "English",
    region: "United States",
  },
  {
    id: "khmer",
    label: "Khmer",
    region: "Cambodia",
  },
];

export default function LanguageSettingsScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageOption["id"]>("english");

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
          style={styles.headerBackButton}
        >
          <Ionicons name="arrow-back" size={26} color="#1A2340" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Language Settings</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="globe-outline" size={28} color="#3E35BC" />
          <Text style={styles.sectionTitle}>App Language</Text>
        </View>

        <Text style={styles.sectionDescription}>
          Select the primary language for the application interface.
        </Text>

        <View style={styles.optionsWrap}>
          {languageOptions.map((option) => {
            const isSelected = selectedLanguage === option.id;

            return (
              <TouchableOpacity
                key={option.id}
                style={styles.optionCard}
                activeOpacity={0.85}
                onPress={() => setSelectedLanguage(option.id)}
              >
                <View>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionRegion}>{option.region}</Text>
                </View>

                <View
                  style={[
                    styles.radioOuter,
                    isSelected ? styles.radioOuterSelected : null,
                  ]}
                >
                  {isSelected ? <View style={styles.radioInner} /> : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

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
    backgroundColor: "#F8F9FC",
  },
  header: {
    height: 74,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E8F2",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  headerBackButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  headerTitle: {
    color: "#17213A",
    fontSize: 39 / 2,
    lineHeight: 48 / 2,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 26,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionTitle: {
    color: "#1A2340",
    fontSize: 36 / 2,
    lineHeight: 44 / 2,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  sectionDescription: {
    marginTop: 14,
    color: "#4D5E7C",
    fontSize: 34 / 2,
    lineHeight: 46 / 2,
    fontWeight: "500",
    paddingRight: 8,
  },
  optionsWrap: {
    marginTop: 16,
    gap: 16,
  },
  optionCard: {
    minHeight: 84,
    borderWidth: 1,
    borderColor: "#DADDE8",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionLabel: {
    color: "#19233E",
    fontSize: 34 / 2,
    lineHeight: 42 / 2,
    fontWeight: "800",
  },
  optionRegion: {
    marginTop: 2,
    color: "#5A6A88",
    fontSize: 30 / 2,
    lineHeight: 38 / 2,
    fontWeight: "500",
  },
  radioOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#C6CEDD",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  radioOuterSelected: {
    borderColor: "#3E35BC",
    backgroundColor: "#3E35BC",
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#FFFFFF",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 10,
  },
  saveButton: {
    minHeight: 64,
    borderRadius: 14,
    backgroundColor: "#3E2FAF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#312693",
    shadowOpacity: 0.25,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});

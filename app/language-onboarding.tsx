import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LanguageOption = {
  id: "english" | "khmer";
  title: string;
  subtitle: string;
};

const LANGUAGE_STORAGE_KEY = "@opportcam:language:v1";

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    id: "english",
    title: "English",
    subtitle: "Default (US English)",
  },
  {
    id: "khmer",
    title: "Khmer",
    subtitle: "ភាសាខ្មែរ",
  },
];

export default function LanguageOnboardingScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageOption["id"]>("english");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, selectedLanguage);
    } catch {
      // Continue navigation even if persistence fails.
    } finally {
      setIsSubmitting(false);
      router.replace("/survey");
    }
  };

  return (
    <SafeAreaView
      style={styles.screen}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" />

      <View style={styles.content}>
        <Text style={styles.heading}>What's your preferred language?</Text>
        <Text style={styles.subheading}>
          Help us personalize your learning experience by choosing the language
          you're most comfortable with.
        </Text>

        <View style={styles.optionsWrap}>
          {LANGUAGE_OPTIONS.map((option) => {
            const isSelected = selectedLanguage === option.id;

            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  isSelected ? styles.optionCardSelected : null,
                ]}
                activeOpacity={0.88}
                onPress={() => setSelectedLanguage(option.id)}
                disabled={isSubmitting}
              >
                <View>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
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
          style={[
            styles.continueButton,
            isSubmitting ? styles.buttonMuted : null,
          ]}
          activeOpacity={0.9}
          onPress={handleContinue}
          disabled={isSubmitting}
        >
          <Text style={styles.continueText}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  heading: {
    color: "#171E39",
    fontSize: 44 / 2,
    lineHeight: 56 / 2,
    fontWeight: "800",
    letterSpacing: -0.2,
    maxWidth: 320,
  },
  subheading: {
    marginTop: 12,
    color: "#556280",
    fontSize: 34 / 2,
    lineHeight: 48 / 2,
    fontWeight: "500",
    maxWidth: 335,
  },
  optionsWrap: {
    marginTop: 26,
    gap: 14,
  },
  optionCard: {
    minHeight: 84,
    borderWidth: 1,
    borderColor: "#D8DDEB",
    borderRadius: 16,
    backgroundColor: "#F6F7FB",
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionCardSelected: {
    borderColor: "#3F34B7",
    borderWidth: 2,
    backgroundColor: "#F2F1FA",
  },
  optionTitle: {
    color: "#1A2240",
    fontSize: 34 / 2,
    lineHeight: 42 / 2,
    fontWeight: "800",
  },
  optionSubtitle: {
    marginTop: 2,
    color: "#61708D",
    fontSize: 30 / 2,
    lineHeight: 38 / 2,
    fontWeight: "500",
  },
  radioOuter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#C1CCDE",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFD",
  },
  radioOuterSelected: {
    borderColor: "#3F34B7",
    backgroundColor: "#3F34B7",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 8,
  },
  continueButton: {
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: "#3E30B1",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    shadowColor: "#31278E",
    shadowOpacity: 0.26,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  buttonMuted: {
    opacity: 0.7,
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
});

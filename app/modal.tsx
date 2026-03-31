import { useRouter } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type InterestChip = {
  id: string;
  label: string;
  icon: string;
  selected: boolean;
};

const opportunityType: InterestChip[] = [
  { id: "scholarships", label: "Scholarships", icon: "🎓", selected: true },
  { id: "events", label: "Events", icon: "🗓️", selected: true },
  { id: "courses", label: "Courses", icon: "📚", selected: false },
  { id: "volunteering", label: "Volunteering", icon: "🤝", selected: true },
  { id: "internships", label: "Internships", icon: "💼", selected: false },
];

const subjectArea: InterestChip[] = [
  { id: "web-dev", label: "Web Dev", icon: "💻", selected: true },
  { id: "business", label: "Business", icon: "📊", selected: false },
  { id: "social-work", label: "Social Work", icon: "🌱", selected: true },
  { id: "healthcare", label: "Healthcare", icon: "🧬", selected: false },
  { id: "arts", label: "Arts", icon: "🎨", selected: false },
  { id: "technology", label: "Technology", icon: "⚙️", selected: false },
];

const formatType: InterestChip[] = [
  { id: "online", label: "Online", icon: "🌐", selected: false },
  { id: "in-person", label: "In-person", icon: "🏢", selected: false },
  { id: "hybrid", label: "Hybrid", icon: "🔀", selected: false },
];

type Section = {
  title: string;
  items: InterestChip[];
};

const sections: Section[] = [
  { title: "OPPORTUNITY TYPE", items: opportunityType },
  { title: "SUBJECT AREA", items: subjectArea },
  { title: "FORMAT", items: formatType },
];

export default function ModalScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();

  const scale = height < 760 ? 0.8 : height < 830 ? 0.86 : 0.9;
  const sv = (value: number) => Math.round(value * scale);

  const onContinue = () => {
    router.replace("/(tabs)");
  };

  const selectedCount = [
    ...opportunityType,
    ...subjectArea,
    ...formatType,
  ].filter((item) => item.selected).length;

  const renderChip = (chip: InterestChip) => {
    const isSelected = chip.selected;

    return (
      <View
        key={chip.id}
        style={[
          styles.chip,
          {
            borderWidth: sv(1.5),
            paddingVertical: sv(8),
            paddingHorizontal: sv(13),
            minHeight: sv(46),
            marginRight: sv(10),
            marginBottom: sv(10),
          },
          isSelected ? styles.chipSelected : styles.chipUnselected,
        ]}
      >
        {isSelected ? (
          <Text
            style={[
              styles.chipMark,
              {
                fontSize: sv(13),
                lineHeight: sv(16),
                marginRight: sv(6),
              },
            ]}
          >
            ✓
          </Text>
        ) : null}
        <Text
          style={[
            styles.chipIcon,
            {
              fontSize: sv(15),
              marginRight: sv(8),
            },
          ]}
        >
          {chip.icon}
        </Text>
        <Text
          style={[
            styles.chipLabel,
            {
              fontSize: sv(16),
              lineHeight: sv(20),
            },
          ]}
        >
          {chip.label}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={styles.screen}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View
        style={[
          styles.container,
          {
            paddingHorizontal: sv(20),
            paddingTop: sv(80),
          },
        ]}
      >
        <View style={styles.contentArea}>
          <View style={[styles.headerBlock, { marginBottom: sv(14) }]}>
            <Text
              style={[styles.heading, { fontSize: sv(46), lineHeight: sv(50) }]}
            >
              What are you{"\n"}interested in?
            </Text>
            <Text
              style={[
                styles.subheading,
                {
                  fontSize: sv(15),
                  lineHeight: sv(22),
                },
              ]}
            >
              Select at least 3 to personalize your feed
            </Text>
            <Text
              style={[
                styles.selectedText,
                { fontSize: sv(16), lineHeight: sv(22), marginTop: sv(5) },
              ]}
            >
              {selectedCount} selected
            </Text>
          </View>

          {sections.map((section, index) => (
            <View
              key={section.title}
              style={[
                styles.section,
                { marginBottom: index === sections.length - 1 ? 0 : sv(12) },
              ]}
            >
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    fontSize: sv(12),
                    lineHeight: sv(25),
                    letterSpacing: 1.8,
                    marginBottom: sv(8),
                  },
                ]}
              >
                {section.title}
              </Text>
              <View style={styles.chipGrid}>
                {section.items.map(renderChip)}
              </View>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.bottomBar,
            {
              paddingHorizontal: sv(14),
              paddingTop: sv(30),
              paddingBottom: sv(50),
              marginHorizontal: -sv(20),
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.continueButton,
              {
                borderRadius: sv(14),
                minHeight: sv(66),
              },
            ]}
            onPress={onContinue}
          >
            <Text
              style={[
                styles.continueButtonText,
                {
                  fontSize: sv(20),
                  lineHeight: sv(44),
                },
              ]}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F7FA",
  },
  contentArea: {
    flex: 1,
    justifyContent: "flex-start",
  },
  headerBlock: {
    marginBottom: 0,
  },
  heading: {
    color: "#0D1540",
    fontWeight: "800",
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  subheading: {
    color: "#6C758D",
    fontWeight: "500",
  },
  selectedText: {
    marginTop: 4,
    color: "#E37F00",
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  section: {
    marginBottom: 0,
  },
  sectionTitle: {
    color: "#606B84",
    fontWeight: "800",
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  chip: {
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
  },
  chipSelected: {
    backgroundColor: "#EAEBFB",
    borderColor: "#EAEBFB",
  },
  chipUnselected: {
    backgroundColor: "#FFFFFF",
    borderColor: "#B7AFFF",
  },
  chipMark: {
    color: "#E58A09",
    fontWeight: "900",
    textAlign: "center",
  },
  chipIcon: {
    marginTop: -1,
  },
  chipLabel: {
    color: "#17214B",
    fontWeight: "700",
  },
  bottomBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E7E5F3",
  },
  continueButton: {
    backgroundColor: "#E88300",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#CC7400",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 11,
    elevation: 4,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 0,
  },
});

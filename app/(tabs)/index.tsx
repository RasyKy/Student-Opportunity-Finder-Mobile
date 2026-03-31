import { FontAwesome } from "@expo/vector-icons";
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

type TagTone = "gold" | "mint" | "pink" | "blue";

type OpportunityCard = {
  id: string;
  icon: string;
  title: string;
  org: string;
  tags: { label: string; tone: TagTone }[];
  date: string;
  hero: string;
};

type DiscoverItem = {
  id: string;
  icon: string;
  title: string;
  org: string;
  date: string;
  leftTone: "gold" | "pink";
  tags: { label: string; tone: TagTone }[];
};

const recentCards: OpportunityCard[] = [
  {
    id: "fulbright",
    icon: "🎓",
    title: "Fulbright Foreign Student Program 2025",
    org: "US Embassy Phnom Penh",
    tags: [
      { label: "Scholarship", tone: "gold" },
      { label: "Online", tone: "mint" },
    ],
    date: "12 days left",
    hero: "#F2EBCF",
  },
  {
    id: "tedx",
    icon: "🎪",
    title: "TEDxPhnomPenh Youth Leadership Summit",
    org: "TEDx Cambodia",
    tags: [
      { label: "Event", tone: "pink" },
      { label: "In-person", tone: "mint" },
    ],
    date: "Mar 25, 2025",
    hero: "#F0D6F2",
  },
];

const recommendedCards: OpportunityCard[] = [
  {
    id: "unicef",
    icon: "🌱",
    title: "Community Health Volunteer Programme",
    org: "UNICEF Cambodia",
    tags: [{ label: "Volunteer", tone: "mint" }],
    date: "Rolling basis",
    hero: "#CDEED9",
  },
  {
    id: "fullstack",
    icon: "💻",
    title: "Full Stack Web Development Bootcamp",
    org: "Technovation Khmer",
    tags: [
      { label: "Course", tone: "blue" },
      { label: "Online", tone: "mint" },
    ],
    date: "Free",
    hero: "#D9DBF0",
  },
];

const discoverItems: DiscoverItem[] = [
  {
    id: "jica",
    icon: "🎓",
    title: "JICA Japan Scholarship for STEM Students",
    org: "JICA Cambodia Office",
    date: "8 days left",
    leftTone: "gold",
    tags: [{ label: "Scholarship", tone: "gold" }],
  },
  {
    id: "arts",
    icon: "🎨",
    title: "Digital Arts Workshop - Design for Impact",
    org: "Meta x Creative Cambodia",
    date: "Apr 10, 2025",
    leftTone: "pink",
    tags: [
      { label: "Event", tone: "pink" },
      { label: "Online", tone: "mint" },
    ],
  },
];

const tagStyles: Record<TagTone, { backgroundColor: string; color: string }> = {
  gold: { backgroundColor: "#F8E9B9", color: "#503800" },
  mint: { backgroundColor: "#D7F0DF", color: "#134125" },
  pink: { backgroundColor: "#F8DDF2", color: "#5E1E5A" },
  blue: { backgroundColor: "#E0E5FF", color: "#1E2E7A" },
};

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity activeOpacity={0.8}>
        <Text style={styles.sectionAction}>See all</Text>
      </TouchableOpacity>
    </View>
  );
}

function OpportunityTile({
  item,
  onPress,
}: {
  item: OpportunityCard;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.tile} activeOpacity={0.9} onPress={onPress}>
      <View style={[styles.tileHero, { backgroundColor: item.hero }]}>
        <Text style={styles.heroIcon}>{item.icon}</Text>
      </View>
      <View style={styles.tileBody}>
        <View style={styles.tagRow}>
          {item.tags.map((tag) => (
            <View
              key={tag.label}
              style={[
                styles.tag,
                { backgroundColor: tagStyles[tag.tone].backgroundColor },
              ]}
            >
              <Text style={[styles.tagText, { color: tagStyles[tag.tone].color }]}>
                {tag.label}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.tileTitle}>{item.title}</Text>
        <Text style={styles.tileOrg}>{item.org}</Text>
        <View style={styles.tileMetaRow}>
          <Text style={styles.tileDate}>{item.date}</Text>
          <FontAwesome name="bookmark-o" size={17} color="#A88FD8" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function DiscoverTile({ item }: { item: DiscoverItem }) {
  return (
    <View style={styles.discoverTile}>
      <View
        style={[
          styles.discoverIconBlock,
          item.leftTone === "gold" ? styles.blockGold : styles.blockPink,
        ]}
      >
        <Text style={styles.discoverIcon}>{item.icon}</Text>
      </View>
      <View style={styles.discoverBody}>
        <View style={styles.tagRow}>
          {item.tags.map((tag) => (
            <View
              key={tag.label}
              style={[
                styles.tag,
                { backgroundColor: tagStyles[tag.tone].backgroundColor },
              ]}
            >
              <Text style={[styles.tagText, { color: tagStyles[tag.tone].color }]}>
                {tag.label}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.discoverTitle}>{item.title}</Text>
        <Text style={styles.tileOrg}>{item.org}</Text>
        <View style={styles.tileMetaRow}>
          <Text style={styles.tileDate}>{item.date}</Text>
          <FontAwesome name="bookmark-o" size={17} color="#A88FD8" />
        </View>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <View style={styles.brandWrap}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>O</Text>
            </View>
            <Text style={styles.brandText}>
              Opport<Text style={styles.brandAccent}>Cam</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.85}>
            <FontAwesome name="bell-o" size={20} color="#1B2146" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.greetingName}>Dara Khmer 👋</Text>
        </View>

        <SectionHeader title="Recent Opportunities" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {recentCards.map((item) => (
            <OpportunityTile
              key={item.id}
              item={item}
              onPress={
                item.id === "fulbright"
                  ? () => router.push("/opportunity-detail")
                  : undefined
              }
            />
          ))}
        </ScrollView>

        <SectionHeader title="Recommended for You" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {recommendedCards.map((item) => (
            <OpportunityTile key={item.id} item={item} />
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Discover All</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.sectionAction}>Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.discoverList}>
          {discoverItems.map((item) => (
            <DiscoverTile key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  brandWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandMark: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#EE8600",
    alignItems: "center",
    justifyContent: "center",
  },
  brandMarkText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  brandText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#10163E",
    letterSpacing: -0.2,
  },
  brandAccent: {
    color: "#EE8600",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F0F0F5",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 11,
    right: 11,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EE8600",
  },
  greetingBlock: {
    paddingTop: 8,
    paddingBottom: 4,
  },
  greeting: {
    fontSize: 17,
    color: "#7A7E95",
    fontWeight: "500",
  },
  greetingName: {
    marginTop: 2,
    fontSize: 17,
    lineHeight: 21,
    color: "#151B43",
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "800",
    color: "#151B43",
    letterSpacing: -0.35,
  },
  sectionAction: {
    color: "#EE8600",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "700",
  },
  horizontalList: {
    paddingBottom: 2,
    paddingRight: 8,
  },
  tile: {
    width: 244,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7E7EE",
    overflow: "hidden",
  },
  tileHero: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  heroIcon: {
    fontSize: 40,
  },
  tileBody: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
  },
  tag: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "700",
  },
  tileTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    color: "#1A2148",
  },
  tileOrg: {
    marginTop: 4,
    fontSize: 10,
    color: "#6F758B",
    fontWeight: "500",
  },
  tileMetaRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tileDate: {
    fontSize: 10,
    color: "#6F758B",
    fontWeight: "600",
  },
  discoverList: {
    gap: 12,
    paddingBottom: 8,
  },
  discoverTile: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E7E7EE",
    overflow: "hidden",
    flexDirection: "row",
  },
  discoverIconBlock: {
    width: 104,
    alignItems: "center",
    justifyContent: "center",
  },
  blockGold: {
    backgroundColor: "#F2EBCF",
  },
  blockPink: {
    backgroundColor: "#F0D6F2",
  },
  discoverIcon: {
    fontSize: 34,
  },
  discoverBody: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  discoverTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    color: "#1A2148",
  },
});

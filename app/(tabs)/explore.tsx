import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TagTone = "gold" | "mint" | "blue" | "pink";
type LeftTone = "sand" | "lavender" | "rose" | "green";

type DiscoverCard = {
  id: string;
  type: string;
  title: string;
  org: string;
  subLabel: string;
  leftTone: LeftTone;
  tags: { label: string; tone: TagTone }[];
  bookmarked?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
};

const filters = [
  { id: "all", label: "All", icon: undefined, active: true },
  { id: "sch", label: "Scholarship", icon: "school-outline" },
  { id: "event", label: "Events", icon: "calendar-outline" },
  { id: "int", label: "Internship", icon: "briefcase-outline" },
] as const;

const cards: DiscoverCard[] = [
  {
    id: "1",
    type: "Scholarship",
    title: "Chevening Scholarship UK 2025-26",
    org: "British Embassy",
    subLabel: "5 days left",
    leftTone: "sand",
    tags: [
      { label: "Scholarship", tone: "gold" },
      { label: "Fully Funded", tone: "mint" },
    ],
    icon: "school",
  },
  {
    id: "2",
    type: "Course",
    title: "Google Data Analytics Professional Certificate",
    org: "Google via Coursera",
    subLabel: "Free with aid",
    leftTone: "lavender",
    tags: [
      { label: "Course", tone: "blue" },
      { label: "Online", tone: "mint" },
    ],
    bookmarked: true,
    icon: "layers",
  },
  {
    id: "3",
    type: "Event",
    title: "Climate Youth Forum - Southeast Asia",
    org: "UNDP Cambodia",
    subLabel: "Apr 20, 2025",
    leftTone: "rose",
    tags: [{ label: "Event", tone: "pink" }],
    icon: "bonfire",
  },
  {
    id: "4",
    type: "Workshop",
    title: "Youth Leadership Bootcamp",
    org: "Cambodia Youth Network",
    subLabel: "Apr 27, 2025",
    leftTone: "green",
    tags: [
      { label: "Workshop", tone: "mint" },
      { label: "In-person", tone: "blue" },
    ],
    icon: "people",
  },
];

const tagColors: Record<TagTone, { bg: string; fg: string }> = {
  gold: { bg: "#F7E9BC", fg: "#6E5205" },
  mint: { bg: "#D9EFD9", fg: "#1E5A33" },
  blue: { bg: "#E2E7FB", fg: "#2A3D8F" },
  pink: { bg: "#F4DFF7", fg: "#6B3478" },
};

const leftColors: Record<LeftTone, string> = {
  sand: "#EFE6C9",
  lavender: "#DCDCF2",
  rose: "#EBCBED",
  green: "#CDEAD9",
};

function FilterChip({
  label,
  icon,
  active,
}: {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  active?: boolean;
}) {
  return (
    <TouchableOpacity style={[styles.filterChip, active && styles.filterChipActive]}>
      {icon ? <Ionicons name={icon} size={14} color="#36427A" /> : null}
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function OpportunityCard({
  item,
  onPress,
}: {
  item: DiscoverCard;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={[styles.cardLeft, { backgroundColor: leftColors[item.leftTone] }]}> 
        <Ionicons name={item.icon} size={34} color="#4B3B8A" />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.tagRow}>
          {item.tags.map((tag) => (
            <View
              key={`${item.id}-${tag.label}`}
              style={[styles.tag, { backgroundColor: tagColors[tag.tone].bg }]}
            >
              <Text style={[styles.tagText, { color: tagColors[tag.tone].fg }]}>
                {tag.label}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardOrg}>{item.org}</Text>

        <View style={styles.bottomRow}>
          {item.id === "1" ? (
            <View style={styles.deadlinePill}>
              <Ionicons name="alarm-outline" size={13} color="#B57700" />
              <Text style={styles.deadlineText}>{item.subLabel}</Text>
            </View>
          ) : (
            <Text style={styles.subLabel}>{item.subLabel}</Text>
          )}

          <Ionicons
            name={item.bookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color={item.bookmarked ? "#E58E26" : "#AAA3D4"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function SearchScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Discover</Text>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={24} color="#868995" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search opportunities..."
            placeholderTextColor="#868995"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filters.map((filter) => (
            <FilterChip
              key={filter.id}
              label={filter.label}
              icon={filter.icon as keyof typeof Ionicons.glyphMap | undefined}
              active={filter.active}
            />
          ))}
        </ScrollView>

        <View style={styles.divider} />

        <Text style={styles.resultText}>
          <Text style={styles.resultNumber}>24</Text> opportunities found
        </Text>

        <View style={styles.cardList}>
          {cards.map((item) => (
            <OpportunityCard
              key={item.id}
              item={item}
              onPress={
                item.id === "1" ? () => router.push("/opportunity-detail") : undefined
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F4F7",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
  },
  heading: {
    fontSize: 46,
    fontWeight: "800",
    letterSpacing: -0.6,
    color: "#0F194A",
    marginBottom: 12,
  },
  searchBox: {
    height: 60,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#C7BEF0",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#555C73",
    paddingVertical: 0,
  },
  filterRow: {
    paddingTop: 14,
    paddingBottom: 10,
    gap: 10,
  },
  filterChip: {
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: "#C7BEF0",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterChipActive: {
    backgroundColor: "#E8EBF8",
    borderColor: "#DDE0F2",
  },
  filterText: {
    color: "#1E2A68",
    fontSize: 15,
    fontWeight: "700",
  },
  filterTextActive: {
    color: "#1D2761",
  },
  divider: {
    height: 1,
    backgroundColor: "#E6E8F0",
    marginBottom: 12,
  },
  resultText: {
    fontSize: 16,
    color: "#46506D",
    marginBottom: 14,
  },
  resultNumber: {
    color: "#0F1F65",
    fontWeight: "800",
  },
  cardList: {
    gap: 14,
  },
  card: {
    flexDirection: "row",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    minHeight: 166,
    shadowColor: "#0B133A",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardLeft: {
    width: 108,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 7,
  },
  tag: {
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 13,
    fontWeight: "800",
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 22,
    color: "#101A4A",
    fontWeight: "800",
  },
  cardOrg: {
    marginTop: 3,
    fontSize: 13,
    color: "#616987",
    fontWeight: "500",
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subLabel: {
    fontSize: 14,
    color: "#5D6581",
  },
  deadlinePill: {
    borderRadius: 10,
    backgroundColor: "#F7E7B4",
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  deadlineText: {
    fontSize: 14,
    color: "#A66E00",
    fontWeight: "700",
  },
});

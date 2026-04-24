import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { mockOpportunities } from "../../data/mock-opportunities";
import { getOrganizerIdFromName } from "../../data/mock-organizers";
import { useSavedOpportunities } from "../../hooks/use-saved-opportunities";
import { TagTone } from "../../types/opportunity";

type DiscoverCard = (typeof mockOpportunities)[number];

const iosFilters = [
  { id: "all", label: "All", icon: undefined, active: true },
  { id: "sch", label: "Scholarship", icon: "school-outline" },
  { id: "event", label: "Events", icon: "calendar-outline" },
  { id: "int", label: "Internship", icon: "briefcase-outline" },
] as const;

const androidTrendingSearches = [
  "STEM Scholarships",
  "Summer 2024 Internships",
  "Europe",
  "Remote UI/UX",
  "Graduate Grants",
] as const;

const androidQuickFilters = [
  { id: "type", label: "Type: All" },
  { id: "region", label: "Region: Global" },
  { id: "deadline", label: "Deadline", icon: "calendar-outline" },
] as const;

const iosTagColors: Record<TagTone, { bg: string; fg: string }> = {
  gold: { bg: "#F7E9BC", fg: "#6E5205" },
  mint: { bg: "#D9EFD9", fg: "#1E5A33" },
  blue: { bg: "#E2E7FB", fg: "#2A3D8F" },
  pink: { bg: "#F4DFF7", fg: "#6B3478" },
};

const androidTagColors: Record<TagTone, { bg: string; fg: string }> = {
  gold: { bg: "#ECEBFE", fg: "#443BB4" },
  mint: { bg: "#D7F2E5", fg: "#0F9163" },
  blue: { bg: "#EFE9FF", fg: "#7C36DF" },
  pink: { bg: "#FFEBD8", fg: "#E27D19" },
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
    <TouchableOpacity
      style={[iosStyles.filterChip, active && iosStyles.filterChipActive]}
      activeOpacity={0.85}
    >
      {icon ? <Ionicons name={icon} size={14} color="#36427A" /> : null}
      <Text
        style={[iosStyles.filterText, active && iosStyles.filterTextActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function TrendingChip({ label }: { label: string }) {
  return (
    <TouchableOpacity style={androidStyles.trendingChip} activeOpacity={0.85}>
      <Text style={androidStyles.trendingChipText}>{label}</Text>
    </TouchableOpacity>
  );
}

function AndroidFilterPill({
  label,
  icon,
}: {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <TouchableOpacity style={androidStyles.filterPill} activeOpacity={0.85}>
      <Text style={androidStyles.filterPillText}>{label}</Text>
      {icon ? (
        <Ionicons name={icon} size={15} color="#2D3550" />
      ) : (
        <Ionicons name="chevron-down" size={14} color="#5B6278" />
      )}
    </TouchableOpacity>
  );
}

function OpportunityCardIOS({
  item,
  bookmarked,
  onPress,
  onPressOrganizer,
  onToggleSaved,
}: {
  item: DiscoverCard;
  bookmarked: boolean;
  onPress?: () => void;
  onPressOrganizer: () => void;
  onToggleSaved: () => void;
}) {
  return (
    <TouchableOpacity
      style={iosStyles.card}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={[iosStyles.cardLeft, { backgroundColor: item.heroColor }]}>
        <Ionicons
          name={item.detailIcon as keyof typeof Ionicons.glyphMap}
          size={34}
          color="#4B3B8A"
        />
      </View>

      <View style={iosStyles.cardBody}>
        <View style={iosStyles.tagRow}>
          {item.tags.map((tag) => (
            <View
              key={`${item.id}-${tag.label}`}
              style={[
                iosStyles.tag,
                { backgroundColor: iosTagColors[tag.tone].bg },
              ]}
            >
              <Text
                style={[
                  iosStyles.tagText,
                  { color: iosTagColors[tag.tone].fg },
                ]}
              >
                {tag.label}
              </Text>
            </View>
          ))}
        </View>

        <Text style={iosStyles.cardTitle}>{item.title}</Text>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={(event) => {
            event.stopPropagation();
            onPressOrganizer();
          }}
        >
          <Text style={iosStyles.cardOrg}>{item.org}</Text>
        </TouchableOpacity>

        <View style={iosStyles.bottomRow}>
          {item.id === "fulbright" ? (
            <View style={iosStyles.deadlinePill}>
              <Ionicons name="alarm-outline" size={13} color="#B57700" />
              <Text style={iosStyles.deadlineText}>{item.subLabel}</Text>
            </View>
          ) : (
            <Text style={iosStyles.subLabel}>{item.subLabel}</Text>
          )}

          <TouchableOpacity
            style={iosStyles.bookmarkButton}
            activeOpacity={0.8}
            onPress={(event) => {
              event.stopPropagation();
              onToggleSaved();
            }}
          >
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={20}
              color={bookmarked ? "#E58E26" : "#AAA3D4"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function OpportunityCardAndroid({
  item,
  bookmarked,
  onPress,
  onPressOrganizer,
  onToggleSaved,
}: {
  item: DiscoverCard;
  bookmarked: boolean;
  onPress?: () => void;
  onPressOrganizer: () => void;
  onToggleSaved: () => void;
}) {
  const typeTag = item.tags[0] ?? {
    label: item.searchType,
    tone: "blue" as TagTone,
  };

  return (
    <TouchableOpacity
      style={androidStyles.card}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={androidStyles.cardLeft}>
        <Ionicons
          name={item.detailIcon as keyof typeof Ionicons.glyphMap}
          size={34}
          color="#473AB7"
        />
      </View>

      <View style={androidStyles.cardBody}>
        <View style={androidStyles.cardHeaderRow}>
          <View
            style={[
              androidStyles.tag,
              { backgroundColor: androidTagColors[typeTag.tone].bg },
            ]}
          >
            <Text
              style={[
                androidStyles.tagText,
                { color: androidTagColors[typeTag.tone].fg },
              ]}
            >
              {typeTag.label.toUpperCase()}
            </Text>
          </View>

          <TouchableOpacity
            style={androidStyles.bookmarkButton}
            activeOpacity={0.8}
            onPress={(event) => {
              event.stopPropagation();
              onToggleSaved();
            }}
          >
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={20}
              color={bookmarked ? "#4539BE" : "#9BA4BA"}
            />
          </TouchableOpacity>
        </View>

        <Text numberOfLines={1} style={androidStyles.cardTitle}>
          {item.title}
        </Text>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={(event) => {
            event.stopPropagation();
            onPressOrganizer();
          }}
        >
          <Text numberOfLines={1} style={androidStyles.cardOrg}>
            {item.org} • {item.location}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function SearchScreen() {
  const router = useRouter();
  const { isSaved, toggleSaved } = useSavedOpportunities();
  const isAndroid = Platform.OS === "android";

  if (!isAndroid) {
    return (
      <SafeAreaView style={iosStyles.screen} edges={["top", "left", "right"]}>
        <StatusBar style="dark" />

        <ScrollView
          style={iosStyles.scroll}
          contentContainerStyle={iosStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={iosStyles.heading}>Discover</Text>

          <View style={iosStyles.searchBox}>
            <Ionicons name="search-outline" size={24} color="#868995" />
            <TextInput
              style={iosStyles.searchInput}
              placeholder="Search opportunities..."
              placeholderTextColor="#868995"
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={iosStyles.filterRow}
          >
            {iosFilters.map((filter) => (
              <FilterChip
                key={filter.id}
                label={filter.label}
                icon={filter.icon as keyof typeof Ionicons.glyphMap | undefined}
                active={"active" in filter ? filter.active : undefined}
              />
            ))}
          </ScrollView>

          <View style={iosStyles.divider} />

          <Text style={iosStyles.resultText}>
            <Text style={iosStyles.resultNumber}>
              {mockOpportunities.length}
            </Text>{" "}
            opportunities found
          </Text>

          <View style={iosStyles.cardList}>
            {mockOpportunities.map((item) => (
              <OpportunityCardIOS
                key={item.id}
                item={item}
                bookmarked={isSaved(item.id)}
                onToggleSaved={() => toggleSaved(item.id)}
                onPressOrganizer={() =>
                  router.push({
                    pathname: "/organizer/[id]",
                    params: { id: getOrganizerIdFromName(item.org) },
                  })
                }
                onPress={() =>
                  router.push({
                    pathname: "/opportunity/[id]",
                    params: { id: item.id },
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={androidStyles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />

      <ScrollView
        style={androidStyles.scroll}
        contentContainerStyle={androidStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={androidStyles.headerRow}>
          <TouchableOpacity
            style={androidStyles.headerIconButton}
            activeOpacity={0.85}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#3B2F9A" />
          </TouchableOpacity>

          <Text
            style={androidStyles.heading}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Search Opportunities
          </Text>

          <TouchableOpacity
            style={androidStyles.headerIconButton}
            activeOpacity={0.85}
          >
            <Ionicons name="options-outline" size={22} color="#3B2F9A" />
          </TouchableOpacity>
        </View>

        <View style={androidStyles.searchBox}>
          <Ionicons name="search-outline" size={24} color="#7F76D0" />
          <TextInput
            style={androidStyles.searchInput}
            placeholder="Search for scholarships, internships..."
            placeholderTextColor="#768095"
          />
        </View>

        <View style={androidStyles.divider} />

        <Text style={androidStyles.sectionLabel}>TRENDING SEARCHES</Text>
        <View style={androidStyles.trendingWrap}>
          {androidTrendingSearches.map((trend) => (
            <TrendingChip key={trend} label={trend} />
          ))}
        </View>

        <View style={androidStyles.filtersRow}>
          {androidQuickFilters.map((filter) => (
            <AndroidFilterPill
              key={filter.id}
              label={filter.label}
              icon={"icon" in filter ? filter.icon : undefined}
            />
          ))}
        </View>

        <View style={androidStyles.resultRow}>
          <Text style={androidStyles.resultText}>
            Found{" "}
            <Text style={androidStyles.resultNumber}>
              {mockOpportunities.length}
            </Text>{" "}
            opportunities
          </Text>
          <Text style={androidStyles.sortText}>Sort by: Newest</Text>
        </View>

        <View style={androidStyles.cardList}>
          {mockOpportunities.map((item) => (
            <OpportunityCardAndroid
              key={item.id}
              item={item}
              bookmarked={isSaved(item.id)}
              onToggleSaved={() => toggleSaved(item.id)}
              onPressOrganizer={() =>
                router.push({
                  pathname: "/organizer/[id]",
                  params: { id: getOrganizerIdFromName(item.org) },
                })
              }
              onPress={() =>
                router.push({
                  pathname: "/opportunity/[id]",
                  params: { id: item.id },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const iosStyles = StyleSheet.create({
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
  bookmarkButton: {
    padding: 4,
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

const androidStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 112,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECEBFA",
  },
  heading: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.8,
    color: "#141B3D",
    flex: 1,
    marginHorizontal: 10,
  },
  searchBox: {
    height: 62,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#CFCDE7",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#4E556F",
    paddingVertical: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "#E7E7F2",
    marginTop: 18,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 1.1,
    color: "#7B75D7",
    marginBottom: 11,
  },
  trendingWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  trendingChip: {
    borderRadius: 999,
    backgroundColor: "#E9E8F4",
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  trendingChipText: {
    color: "#3F3AAE",
    fontSize: 13,
    fontWeight: "700",
  },
  filtersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  filterPill: {
    minHeight: 40,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#C8CCE0",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 13,
  },
  filterPillText: {
    fontSize: 14,
    color: "#1D233F",
    fontWeight: "600",
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  resultText: {
    fontSize: 16,
    color: "#647088",
    fontWeight: "600",
  },
  resultNumber: {
    color: "#3A4570",
    fontWeight: "800",
  },
  sortText: {
    fontSize: 16,
    color: "#453DB7",
    fontWeight: "800",
  },
  cardList: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E3EF",
    backgroundColor: "#FFFFFF",
    minHeight: 118,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#111B49",
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardLeft: {
    width: 76,
    height: 76,
    borderRadius: 12,
    backgroundColor: "#ECEBFA",
    borderWidth: 1,
    borderColor: "#D6D7E9",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tag: {
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  cardTitle: {
    fontSize: 20,
    lineHeight: 27,
    color: "#151E42",
    fontWeight: "800",
  },
  cardOrg: {
    marginTop: 2,
    fontSize: 15,
    color: "#62708A",
    fontWeight: "500",
  },
  bookmarkButton: {
    padding: 2,
  },
});

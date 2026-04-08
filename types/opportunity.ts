export type TagTone = "gold" | "mint" | "blue" | "pink";

export type OpportunityTag = {
  label: string;
  tone: TagTone;
};

export type FeaturedBucket = "recent" | "recommended" | "discover";

export type DiscoverTone =
  | "gold"
  | "pink"
  | "green"
  | "lavender"
  | "sand"
  | "rose";

export type Opportunity = {
  id: string;
  title: string;
  org: string;
  emojiIcon: string;
  detailIcon: string;
  tags: OpportunityTag[];
  heroColor: string;
  heroTop: string;
  heroBottom: string;
  typeTag: string;
  fundingTag: string;
  statusTag: string;
  location: string;
  dateLeft: string;
  about: string;
  duration: string;
  award: string;
  level: string;
  format: string;
  howToApply: string;
  websiteCta: string;
  deadline: string;
  featuredIn: FeaturedBucket[];
  discoverTone: DiscoverTone;
  searchType: string;
  subLabel: string;
};

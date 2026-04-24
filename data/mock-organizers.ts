export type OrganizerProfile = {
  id: string;
  name: string;
  tagline: string;
  about: string;
  website: string;
};

const ORGANIZERS: OrganizerProfile[] = [
  {
    id: "us-embassy-phnom-penh",
    name: "US Embassy Phnom Penh",
    tagline: "Diplomatic Mission & Education Partner",
    about:
      "The U.S. Embassy in Phnom Penh is committed to strengthening the partnership between the United States and Cambodia. We provide numerous educational and professional opportunities for Cambodian students, including the YSEALI program, Fulbright scholarships, and specialized internships. Our mission is to empower the next generation of leaders in Cambodia through global exchange and skill-building.",
    website: "kh.usembassy.gov",
  },
  {
    id: "tedx-cambodia",
    name: "TEDx Cambodia",
    tagline: "Ideas & Leadership Community",
    about:
      "TEDx Cambodia organizes youth-centered talks and events that connect students with inspiring leaders, practical learning, and meaningful community impact opportunities.",
    website: "tedxcambodia.org",
  },
  {
    id: "jica-cambodia-office",
    name: "JICA Cambodia Office",
    tagline: "Development Cooperation Agency",
    about:
      "JICA supports Cambodia through education, skills development, and international cooperation programs. Students can access scholarships, exchange pathways, and training opportunities through its initiatives.",
    website: "jica.go.jp",
  },
  {
    id: "technovation-khmer",
    name: "Technovation Khmer",
    tagline: "Digital Skills Training Hub",
    about:
      "Technovation Khmer offers practical technology programs for students, from coding bootcamps to career readiness tracks designed for Cambodia's growing digital economy.",
    website: "technovationkhmer.org",
  },
];

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getOrganizerIdFromName(name: string) {
  return slugify(name);
}

export function getOrganizerById(id: string) {
  return ORGANIZERS.find((organizer) => organizer.id === id);
}

export function getAllOrganizers() {
  return ORGANIZERS;
}

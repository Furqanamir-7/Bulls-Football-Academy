export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/centres", label: "Centres" },
  { href: "/coaches", label: "Coaches" },
  { href: "/contact", label: "Contact" },
];

/** Header / quick actions — same as contact page */
export const academyPhoneDisplay = "+92 311 4888358";
export const academyPhoneTel = "tel:+923114888358";
export const academyWhatsAppUrl = "https://wa.me/923114888358";
export const academyInstagramUrl = "https://www.instagram.com/bullsfc00?igsh=MWw4c2hmdGlnNzg3eg==";
export const academyFacebookUrl = "https://www.facebook.com/share/1Mr6oZuA8u/?mibextid=wwXIfr";
export const academyTiktokUrl = "https://www.tiktok.com/@bullsfc00?_r=1&_t=ZS-969jRlQePas";

export const programs = [
  {
    title: "Beginner",
    duration: "12 Weeks",
    ageGroup: "Ages 11+",
    sessions: "3 sessions / week",
    description:
      "Fundamentals, confidence, and discipline training with guided technical repetition.",
    highlights: ["Passing and receiving", "Ball mastery", "Match confidence"],
  },
  {
    title: "Intermediate",
    duration: "16 Weeks",
    ageGroup: "Ages 13+",
    sessions: "4 sessions / week",
    description:
      "Tactical awareness, ball control, and match play with advanced transition drills.",
    highlights: ["Positioning", "Combination play", "Decision making under pressure"],
  },
  {
    title: "Advanced",
    duration: "20 Weeks",
    ageGroup: "Ages 15+",
    sessions: "5 sessions / week",
    description:
      "Elite high-performance coaching, analytics, and competition preparation for serious players.",
    highlights: ["Performance data", "Video analysis", "Trial readiness"],
  },
  {
    title: "Kids",
    duration: "8 Weeks",
    ageGroup: "Ages 6-10",
    sessions: "2 sessions / week",
    description:
      "Fun football learning for younger players through playful drills and coordination games.",
    highlights: ["Motor skills", "Basic technique", "Team habits"],
  },
];

export type ProgramCard = {
  /** Stable id for anchors (e.g. programs#senior-pro) */
  slug: string;
  title: string;
  description: string;
  /** Shown on the card before click; also the first image in the lightbox unless gallery lists its own order */
  previewImage: string;
  /** Additional photos in the lightbox (preview is always included as the first slide) */
  galleryImages?: string[];
};

const programPhoto = (photoIdWithSig: string) =>
  `https://images.unsplash.com/${photoIdWithSig}?auto=format&fit=crop&w=1600&q=82`;

/** Shown when no images exist under `/public/images/programs/{slug-folder}/`. */
export const PROGRAM_CARDS_FALLBACK: ProgramCard[] = [
  {
    slug: "senior-pro-squad",
    title: "Bulls Senior Pro Squad",
    description: "Elite-level training for advanced and professional players.",
    previewImage: programPhoto(
      "photo-1574629810360-7efbbe195018",
    ),
    galleryImages: [
      programPhoto("photo-1430263325361-7661bfdcc55e"),
      programPhoto("photo-1575361204480-aadeb25ad6ea"),
    ],
  },
  {
    slug: "junior-pro-squad",
    title: "Bulls Junior Pro Squad",
    description: "High-performance training for aspiring young footballers.",
    previewImage: programPhoto("photo-1517466787929-bc90951d0974"),
    galleryImages: [
      programPhoto("photo-1522778119026-d647f0565c6f"),
      programPhoto("photo-1543326727-fe622d7e4875"),
    ],
  },
  {
    slug: "all-girls-squad",
    title: "Bulls All Girls Squad",
    description:
      "Empowering female athletes through professional coaching and competitive opportunities.",
    previewImage: programPhoto("photo-1517649763962-0c6230660131"),
    galleryImages: [
      programPhoto(
        "photo-1574629810360-7efbbe195018",
      ),
      programPhoto("photo-1526232761682-d26e03dc148e"),
    ],
  },
  {
    slug: "game-changers-development",
    title: "Bulls Game Changers - Player Development Program",
    description:
      "A specialized program focused on skill enhancement, fitness, and tactical development.",
    previewImage: programPhoto("photo-1430263325361-7661bfdcc55e"),
    galleryImages: [
      programPhoto("photo-1459865264687-cf3903049a83"),
      programPhoto("photo-1575361204480-aadeb25ad6ea"),
    ],
  },
];

export type CoachEntry = {
  name: string;
  role: string;
  image: string;
  portraitZoom?: number;
  portraitOrigin?: string;
};

export const coaches: CoachEntry[] = [
  {
    name: "MUDASAR MUKHTAR",
    role: "Head Coach & Founder",
    image: "/images/coaches/coach-mudasar-mukhtar.jpeg",
  },
  {
    name: "Mujahid Ali Khan",
    role: "Head Coach · Askari 9",
    image: "/images/coaches/coach-mujahid.png",
  },
  {
    name: "Abdullah Rajput",
    role: "Head Coach · Askari 10",
    image: "/images/coaches/coach-abdullah.png",
  },
  {
    name: "Ejaz Ali",
    role: "Head Coach · Askari 5",
    image: "/images/coaches/coach-ejaz-ali.png",
  },
  {
    name: "Haseeb",
    role: "Head Coach · GC Askari 10",
    image: "/images/coaches/coach-haseeb.jpeg",
  },
  {
    name: "M Haseeb",
    role: "Head Coach · GC Askari 11",
    image: "/images/coaches/coach-m-haseeb.png",
  },
  {
    name: "Bhalu",
    role: "Head Coach · JR Pro Squad · Askari 11",
    image: "/images/coaches/coach-bhalu.png",
  },
  {
    name: "Hammad",
    role: "Head Coach · GC Askari 9",
    image: "/images/coaches/coach-hammad.jpeg",
  },
  {
    name: "Tahir",
    role: "Head Coach · GC Askari 11",
    image: "/images/coaches/coach-tahir.jpeg",
  },
];

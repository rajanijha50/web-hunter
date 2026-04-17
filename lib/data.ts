export type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  priceType: string;
  isPremium?: boolean;
  isTopRated?: boolean;
  isEditorPick?: boolean;
  developer: string;
  platform: string;
  imageSeed: string; // Used for picsum
  likes: string;
};

export const CATEGORIES = [
  "All AI",
  "Writing AI",
  "Image AI",
  "Code AI",
  "Video Gen",
  "Voice Synthesis",
  "ML Ops",
  "3D Design",
  "Productivity",
  "Data Analytics",
];

export const TOOLS: Tool[] = [
  {
    id: "1",
    name: "Synthesia Pro",
    description: "Enterprise-grade LLM for complex technical documentation and creative workflows.",
    category: "Writing AI",
    rating: 4.9,
    priceType: "Enterprise",
    isPremium: true,
    developer: "Synthesia Labs",
    platform: "Web",
    imageSeed: "ai-writing",
    likes: "2.5k",
  },
  {
    id: "2",
    name: "Canvas Flow",
    description: "Generative UI components and automated layout engine for modern web apps.",
    category: "Design AI",
    rating: 4.8,
    priceType: "Freemium",
    isEditorPick: true,
    developer: "Flow Inc.",
    platform: "Web, macOS",
    imageSeed: "layout",
    likes: "1.2k",
  },
  {
    id: "3",
    name: "Lexica Art v2",
    description: "Search through millions of curated AI-generated images with semantic intelligence.",
    category: "Image Generation",
    rating: 4.9,
    priceType: "Free to Try",
    developer: "Lexica Studio",
    platform: "Web",
    imageSeed: "abstract-art",
    likes: "8.4k",
  },
  {
    id: "4",
    name: "Cursor Studio",
    description: "The premier AI-native code editor that understands your entire codebase in real-time.",
    category: "Programming",
    rating: 5.0,
    priceType: "$20 / month",
    isPremium: true,
    developer: "CursorLabs",
    platform: "macOS, Windows, Linux",
    imageSeed: "code-screen",
    likes: "15k",
  },
  {
    id: "5",
    name: "Runway Gen-3",
    description: "Transform any text or image into a high-fidelity cinematic video experience instantly.",
    category: "Video Generation",
    rating: 4.7,
    priceType: "Freemium",
    developer: "RunwayML",
    platform: "Web",
    imageSeed: "cinematic",
    likes: "5.1k",
  },
  {
    id: "6",
    name: "ElevenLabs Voice",
    description: "The most realistic AI speech software ever, featuring groundbreaking voice cloning.",
    category: "Audio Synthesis",
    rating: 4.8,
    priceType: "Free Tier",
    developer: "ElevenLabs",
    platform: "Web, API",
    imageSeed: "sound-wave",
    likes: "11k",
  },
  {
    id: "7",
    name: "Perplexity AI",
    description: "A powerful conversational search engine that provides cited, accurate answers to any query.",
    category: "Research",
    rating: 4.9,
    priceType: "Free",
    developer: "Perplexity",
    platform: "Web, iOS, Android",
    imageSeed: "knowledge",
    likes: "9.2k",
  },
  {
    id: "8",
    name: "Zapier Central",
    description: "Build custom AI agents that work across 6,000+ apps to automate your workflows.",
    category: "Automation",
    rating: 4.6,
    priceType: "Enterprise",
    isTopRated: true,
    developer: "Zapier",
    platform: "Web",
    imageSeed: "nodes",
    likes: "3.7k",
  },
  {
    id: "9",
    name: "Lumina Studio",
    description: "Lumina Studio is a revolutionary design tool that bridges the gap between complex 3D rendering and intuitive web interfaces. By leveraging localized AI processing, Lumina allows designers to create photorealistic scenes in seconds without high-end hardware.",
    category: "3D Design",
    rating: 4.9,
    priceType: "Freemium",
    developer: "Lumina Lab",
    platform: "Web, macOS",
    imageSeed: "3d-render",
    likes: "4.2k",
  },
  {
    id: "10",
    name: "Nebula CRM",
    description: "The first relationship management platform designed for the spatial computing era.",
    category: "Productivity",
    rating: 4.5,
    priceType: "Premium",
    developer: "Nebula Systems",
    platform: "VisionOS, Web",
    imageSeed: "crm-dashboard",
    likes: "1.2k",
  },
  {
    id: "11",
    name: "Ghost Writer AI",
    description: "Neural-powered writing assistant that mimics your personal tone of voice perfectly.",
    category: "Writing",
    rating: 4.3,
    priceType: "Freemium",
    developer: "Ghost Inc",
    platform: "Web Extension",
    imageSeed: "writing-desk",
    likes: "843",
  },
  {
    id: "12",
    name: "FinEdge",
    description: "Modern banking infrastructure for global startups. Instant multi-currency accounts.",
    category: "Fintech",
    rating: 4.8,
    priceType: "Enterprise",
    isPremium: true,
    developer: "FinEdge Corp",
    platform: "API, Web",
    imageSeed: "finance-chart",
    likes: "2.5k",
  }
];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Sarah Jenkins",
    role: "PRODUCT DESIGNER",
    content: "Web Hunter has completely changed how I source inspiration for my projects. No more generic search results.",
    avatarSeed: "sarah"
  },
  {
    id: "2",
    name: "Marcus Thorne",
    role: "GROWTH LEAD",
    content: "The curation is top-tier. I found three incredible tools for my workflow within the first ten minutes of joining.",
    avatarSeed: "marcus"
  },
  {
    id: "3",
    name: "Lila Chen",
    role: "CREATIVE DIRECTOR",
    content: "A breath of fresh air for the internet. It feels like the old days of stumbling upon gems, but professionally organized.",
    avatarSeed: "lila"
  }
];

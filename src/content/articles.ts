export interface BlogArticle {
  number: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  published: string;
  intro: string;
  media?: ArticleMedia[];
  sections: { heading: string; paragraphs: string[] }[];
}

export interface ArticleMedia {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  poster?: string;
}

export const articles: BlogArticle[] = [
  {
    number: "01",
    slug: "does-space-precede-movement",
    title: "Does Space Precede Movement, or Does Movement Produce Space?",
    category: "Time Geography",
    readTime: "5 min",
    published: "June 2026",
    intro: "A research note on Hagerstrand's time-geography, individual space-time flows, and the question of whether movement simply crosses space or actively produces it.",
    media: [{
      type: "image",
      src: "blog/szescian_hagerstranda_pauza.gif",
      alt: "Animated Hagerstrand cube showing a traveller trajectory through space and time",
      caption: "Hagerstrand's cube: a moving trajectory with pauses, points, and time as a vertical dimension.",
    }],
    sections: [
      {
        heading: "A question for movement",
        paragraphs: [
          "This article opens a place for my work on time-space flows and the charts developed from individual trajectories. The question is simple but unstable: does space exist as a fixed container before movement begins, or is space continuously produced by movement, constraint, access, rhythm, and delay?",
          "The drawings treat a path as more than a line between coordinates. A trajectory becomes a temporal relation: direction, duration, hesitation, repetition, memory, and the friction of real geography are gathered into one visual gesture.",
        ],
      },
      {
        heading: "Hagerstrand and time-space flows",
        paragraphs: [
          "Hagerstrand's time-geography makes movement visible as a lived structure. Paths, constraints, stations, pauses, and possible routes become a way to draw how people and places meet in time, not only where they sit on a map.",
          "In my charts, this model becomes artistic and analytical at the same time. The diagrams do not only calculate connection; they ask how a journey creates a temporary geography around the person who is moving.",
        ],
      },
      {
        heading: "Reference online",
        paragraphs: [
          "DOI link: https://www.tandfonline.com/doi/abs/10.1080/23729333.2023.2282280",
          "Published with Antoni Moore, University of Otago, Dunedin NZ.",
          "Working fragment for the website: movement is not only an event occurring inside space; it is one of the methods through which space becomes readable, relational, and emotionally charged.",
        ],
      },
    ],
  },
  {
    number: "02",
    slug: "3d-reconstruction-digital-universe-archaeology",
    title: "3D reconstruction & digital universe in archaeology",
    category: "3D Design",
    readTime: "6 min",
    published: "May 2026",
    intro: "Digital reconstruction is changing how we encounter the past: not as a static record, but as a world that can be explored.",
    media: [{
      type: "image",
      src: "website.png",
      alt: "A digital landscape beneath a connected globe",
      caption: "Visual worlds can turn research into an experience.",
    }],
    sections: [{
      heading: "From documentation to experience",
      paragraphs: [
        "Three-dimensional models help researchers test spatial relationships, compare hypotheses, and communicate discoveries.",
        "Used thoughtfully, immersive tools connect scientific accuracy with a richer public experience of cultural heritage.",
      ],
    }],
  },
  {
    number: "03",
    slug: "can-llm-read-as-good-as-humans",
    title: "Can LLM read as good as humans?",
    category: "AI & Research",
    readTime: "4 min",
    published: "May 2026",
    intro: "Language models process enormous amounts of text, but reading is also context, interpretation, and judgment.",
    sections: [{
      heading: "A useful collaboration",
      paragraphs: [
        "Models can summarize, compare, and retrieve relationships across a huge range of material.",
        "The strongest results appear when computational scale meets a reader who still asks careful questions.",
      ],
    }],
  },
  {
    number: "04",
    slug: "building-worlds-edge-of-technology",
    title: "Building Worlds at the Edge of Technology",
    category: "Future",
    readTime: "7 min",
    published: "May 2026",
    intro: "The future is shaped by the stories and experiences that help people imagine where new tools might lead.",
    sections: [{
      heading: "Making possibility visible",
      paragraphs: [
        "Design gives technology rhythm, atmosphere, and a human invitation.",
        "Visual storytelling makes complexity approachable without flattening it.",
      ],
    }],
  },
];

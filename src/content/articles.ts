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
    number: "02",
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
    number: "03",
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

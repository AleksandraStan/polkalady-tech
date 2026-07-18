export interface BlogArticle {
  number: string;
  slug: string;
  articleClassName?: string;
  hideIntro?: boolean;
  hideSectionHeadings?: boolean;
  statusLabel?: string;
  subtitle?: string;
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
    slug: "llm-gps-history",
    articleClassName: "article-page-gps",
    hideIntro: true,
    hideSectionHeadings: true,
    subtitle: "A detective story made of coordinates",
    title: "How much can an LLM read from one's GPS history?",
    category: "AI & Mobility",
    readTime: "7 min",
    published: "July 2026",
    intro: "Some concerns about location privacy",
    media: [{
      type: "image",
      src: "blog/llm-gps-detective.png",
      alt: "Abstract violet detective scene with a magnifying glass over glowing GPS trajectories",
      caption: "",
    }],
    sections: [{
      heading: "",
      paragraphs: [
        "I have been thinking of Large Language Models mostly as text engines with multimodal capabilities, but every day I discover, and I presume many people do, that AI can, or cannot, do more than we expected.",
        "The fact that we now recognize so many of its capabilities makes it more difficult to regulate its use, and mostly its misuse. The EU AI Act and AI impact assessments for business are supposed to ensure that AI systems do not misuse the data they process.",
        "For me, this concern creates another one: what does anonymous data really mean anymore?",
        "We have all seen TV shows where investigators identify someone from a partial fingerprint or a few tiny clues. A good detective can create a story from so little because they can connect the facts and fill in the missing parts. Reading the latest papers on LLMs' potential skills is as fascinating as the first season of Elementary.",
        "One of the recently published papers is by Truong et al. (2025). They used a program called GLOBALTRACE, using 4,000 real-world trajectories, and tested how well LLMs could reconstruct missing segments of GPS trajectories without internet access, maps, or external tools.",
        "Scary? Well, a little.",
        "To perform that task, the LLM did not just predict the missing GPS coordinates to complete a path. It had to understand how someone was traveling, estimate speed and direction, and check whether the trajectory was consistent with constraints such as one-way streets and connected roads.",
        "In other words, the model rebuilt an internal environment. How far is it from finding the actual address?",
        "It sounds fascinating and dangerous at the same time. Before 2020, trajectory reconstruction in academic studies was mostly based on probabilistic models and map-matching algorithms. AI could recover GPS data lost in tunnels, dense urban areas, or mountainous terrain and match it to an existing road map.",
        "More recent approaches, such as TrajBERT, TrajFM, and BigCity, used Transformer-based models trained specifically for trajectory analysis. They became much better at recovering missing trajectory points and predicting future locations, but they were still designed for these particular problems.",
        "The very recent GLOBALTRACE results are based on a general-purpose LLM, without task-specific training, that was able to outperform several specialized trajectory recovery models.",
        "If an LLM can reconstruct where you have been from only fragments of your GPS history, it can potentially infer too much information from our anonymous data.",
        "I think there is an ethical risk behind it. We may need to start evaluating AI not only for accuracy or geographical bias, but also for how much sensitive information it can reconstruct from location data. The real concern is how much it can reveal and uncover to anyone.",
        "Truong, T. et al. (2025). Understanding the Geospatial Reasoning Capabilities of Large Language Models (GLOBALTRACE). arXiv.",
        "Shao, Z. et al. (2024). TrajFM: A Foundation Model for Urban Trajectory Analytics. arXiv.",
        "Sun, Y. et al. (2023). TrajBERT: Trajectory BERT for Urban Mobility Representation Learning.",
        "Yuan, Y. et al. (2024). BigCity: A Universal Foundation Model for Urban Spatio-Temporal Intelligence.",
        "Bierlaire, M., Chen, J., & Newman, J. (2013). A Probabilistic Map Matching Method for Smartphone GPS Data. Transportation Research Part C: Emerging Technologies, 26, 78-98. https://doi.org/10.1016/j.trc.2012.08.001",
      ],
    }],
  },
  {
    number: "02",
    slug: "does-space-precede-movement",
    statusLabel: "in progress",
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
    number: "03",
    slug: "3d-reconstruction-digital-universe-archaeology",
    statusLabel: "not available yet",
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
    number: "04",
    slug: "can-llm-read-as-good-as-humans",
    statusLabel: "not available yet",
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
];

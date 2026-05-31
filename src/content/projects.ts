import type { ArticleMedia } from "./articles";

export interface PortfolioProject {
    number: string;
    slug: string;
    title: string;
    category: string;
    intro: string;
    media?: ArticleMedia[];
    sections: { heading: string; paragraphs: string[] }[];
}

export const projects: PortfolioProject[] = [
  {
        number: "01",
        slug: "digital-travelling",
        title: "Digital travelling",
        category: "Creative Direction",
        intro: "An immersive visual identity built around possibility.",
        media: [{
                type: "image",
                src: "website.png",
                alt: "A neon digital world with a connected globe and futuristic city",
                caption: "A luminous visual direction for journeys beyond the ordinary.",
        }],
        sections: [{
                heading: "A world designed for curiosity",
                paragraphs: [
                          "This concept explores travel as a digital experience shaped by atmosphere, discovery, and connection.",
                        ],
        }],
  },
  {
        number: "02",
        slug: "connected-cities",
        title: "Connected Cities",
        category: "Concept Design",
        intro: "A luminous interface for stories of future urban life.",
        media: [{
                type: "image",
                src: "website.png",
                alt: "A connected futuristic city beneath a digital globe",
        }],
        sections: [{
                heading: "Networks made visible",
                paragraphs: [
                          "The visual language connects urban scale with a sense of movement, energy, and shared possibility.",
                        ],
        }],
  },
  {
        number: "03",
        slug: "beyond-ordinary",
        title: "Traversée Experience",
        category: "Immersive Travel Experience",
        intro: "A cinematic crossing of the Strait of Messina, shaped by water, distance, and movement.",
        media: [{
                type: "image",
                src: "website.png",
                alt: "A cinematic neon landscape with mountains and a futuristic skyline",
        }],
        sections: [{
                heading: "An invitation to explore",
                paragraphs: [
                          "A boat-level experience of the Strait of Messina that unfolds as you move through the crossing.",
                        ],
        }],
  },
  ];

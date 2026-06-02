import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const origin = "https://polkalady.com";
const dist = new URL("../dist/", import.meta.url).pathname;
const shell = await readFile(join(dist, "index.html"), "utf8");

const articles = [
  {
    description: "Digital reconstruction is changing how we encounter the past: not as a static record, but as a world that can be explored.",
    path: "/blog/3d-reconstruction-digital-universe-archaeology/",
    title: "3D reconstruction & digital universe in archaeology",
  },
  {
    description: "Language models process enormous amounts of text, but reading is also context, interpretation, and judgment.",
    path: "/blog/can-llm-read-as-good-as-humans/",
    title: "Can LLM read as good as humans?",
  },
  {
    description: "The future is shaped by the stories and experiences that help people imagine where new tools might lead.",
    path: "/blog/building-worlds-edge-of-technology/",
    title: "Building Worlds at the Edge of Technology",
  },
];

const projects = [
  {
    description: "An immersive visual identity built around possibility.",
    path: "/portfolio/digital-travelling/",
    title: "Digital travelling",
  },
  {
    description: "A compass of European cities connected by distance and direction.",
    path: "/portfolio/connected-cities/",
    title: "Connected Cities - European Compass",
  },
];

const routeLink = (path, label) => `<li><a href="${path}">${label}</a></li>`;
const links = {
  primary: [
    ["/about/", "About Aleksandra Stan"],
    ["/blog/", "Blog"],
    ["/portfolio/", "Portfolio"],
    ["/journeys/", "Journeys"],
  ],
};

const routes = [
  {
    description: "PolkaLady is the portfolio of Aleksandra Stan: digital experiences, research, travel stories, mapping methods, and new media.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "PolkaLady",
      url: `${origin}/`,
    },
    path: "/",
    seo: `<h1>PolkaLady: digital experiences, research and journeys</h1><p>Explore the portfolio of Aleksandra Stan across new media, technology, mapping methods, travel stories, and possible digital realities.</p>`,
    title: "PolkaLady | Digital Experiences, Research & Journeys",
  },
  {
    description: "About Aleksandra Stan, the artist, researcher, IT engineer, professor, and creator behind PolkaLady.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        alternateName: "PolkaLady",
        description: "Artist, researcher, IT engineer, content creator, and professor working across new media, mapping methods, and agent-based modelling.",
        image: `${origin}/about/aleksandra-by-the-sea.jpg`,
        name: "Aleksandra Stan",
        url: `${origin}/about/`,
      },
    },
    path: "/about/",
    seo: `<h1>About Aleksandra Stan</h1><p>Artist, researcher, IT engineer, content creator, and professor working across new media, mapping methods, agent-based models, and possible realities.</p>`,
    title: "About Aleksandra Stan | PolkaLady",
  },
  {
    description: "PolkaLady journal: articles in progress on design, technology, artificial intelligence, archaeology, and possible digital worlds.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "PolkaLady Blog",
      url: `${origin}/blog/`,
    },
    path: "/blog/",
    seo: `<h1>PolkaLady Blog</h1><p>Articles in progress on design, technology, artificial intelligence, archaeology, and possible digital worlds.</p><ul>${articles.map(({ path, title }) => routeLink(path, title)).join("")}</ul>`,
    title: "Blog | Design, Technology & Research | PolkaLady",
  },
  ...articles.map(({ description, path, title }) => ({
    description,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      author: { "@type": "Person", name: "Aleksandra Stan" },
      headline: title,
      mainEntityOfPage: `${origin}${path}`,
    },
    path,
    seo: `<article><h1>${title}</h1><p>${description}</p><a href="/blog/">Back to PolkaLady Blog</a></article>`,
    title: `${title} | PolkaLady`,
  })),
  {
    description: "Explore PolkaLady portfolio projects, including the immersive Traversée Experience trailer for the Strait of Messina.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "PolkaLady Portfolio",
      url: `${origin}/portfolio/`,
    },
    path: "/portfolio/",
    seo: `<h1>PolkaLady Portfolio</h1><p>Digital experiences and creative projects. Some content is currently being corrected; the Traversée Experience trailer is available.</p><ul>${projects.map(({ path, title }) => routeLink(path, title)).join("")}${routeLink("/portfolio/traversee-messina/", "Traversée Experience: Strait of Messina")}</ul>`,
    title: "Portfolio | Digital Experiences & Creative Projects | PolkaLady",
  },
  ...projects.map(({ description, path, title }) => ({
    description,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      creator: { "@type": "Person", name: "Aleksandra Stan" },
      description,
      name: title,
      url: `${origin}${path}`,
    },
    path,
    seo: `<article><h1>${title}</h1><p>${description}</p><a href="/portfolio/">Back to Portfolio</a></article>`,
    title: `${title} | PolkaLady Portfolio`,
  })),
  {
    description: "An immersive cinematic crossing of the Strait of Messina between Sicily and Calabria, experienced from boat level.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      contentUrl: `${origin}/messina/departure.mp4`,
      description: "An immersive cinematic crossing of the Strait of Messina between Sicily and Calabria, experienced from boat level.",
      name: "Traversée Experience: The Strait of Messina",
      thumbnailUrl: `${origin}/journeys/coastal-storm.jpg`,
      uploadDate: "2026-05-31",
    },
    path: "/portfolio/traversee-messina/",
    seo: `<article><h1>Traversée Experience: The Strait of Messina</h1><p>A cinematic crossing between Sicily and Calabria, shaped by water, distance, and movement.</p><a href="/portfolio/">Back to Portfolio</a></article>`,
    title: "Traversée Experience: Strait of Messina | PolkaLady",
  },
  {
    description: "Explore PolkaLady Journeys: travel stories and photography from Sicily, Greece, Australia, Albania, Montenegro, and Sydney.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "PolkaLady Journeys",
      url: `${origin}/journeys/`,
    },
    path: "/journeys/",
    seo: `<h1>PolkaLady Journeys</h1><p>Travel stories and photography from Sicily, Greece, Australia, Albania, Montenegro, and Sydney.</p><a href="https://polkaladyjourneys.wordpress.com/">Read the original PolkaLady Art & Travel journal</a>`,
    title: "Journeys | Travel Stories & Photography | PolkaLady",
  },
];

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function pageHtml(route) {
  const canonical = `${origin}${route.path}`;
  const structuredData = JSON.stringify(route.jsonLd).replaceAll("<", "\\u003c");
  const primaryLinks = `<nav aria-label="Primary"><ul>${links.primary.map(([path, label]) => routeLink(path, label)).join("")}</ul></nav>`;

  return shell
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeAttribute(route.description)}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeAttribute(route.title)}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeAttribute(route.description)}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapeAttribute(route.title)}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapeAttribute(route.description)}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace("</head>", `    <script type="application/ld+json">${structuredData}</script>\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"><main>${route.seo}${primaryLinks}</main></div>`);
}

for (const route of routes) {
  const output = route.path === "/" ? join(dist, "index.html") : join(dist, route.path, "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, pageHtml(route), "utf8");
}

await writeFile(join(dist, "404.html"), pageHtml(routes[0]), "utf8");

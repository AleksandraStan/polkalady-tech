import { articles } from "../content/articles";
import { projects } from "../content/projects";
import { pathForRoute, type SiteRoute } from "./navigation";

const defaults = {
  description: "PolkaLady is the portfolio of Aleksandra Stan: digital experiences, research, travel stories, mapping methods, and new media.",
  title: "PolkaLady | Digital Experiences, Research & Journeys",
};

export function metadataForRoute(route: SiteRoute) {
  if (route.page === "about") {
    return {
      description: "About Aleksandra Stan, the artist, researcher, IT engineer, professor, and creator behind PolkaLady.",
      title: "About Aleksandra Stan | PolkaLady",
    };
  }

  if (route.page === "journeys") {
    return {
      description: "Explore PolkaLady Journeys: travel stories and photography from Sicily, Greece, Australia, Albania, Montenegro, and Sydney.",
      title: "Journeys | Travel Stories & Photography | PolkaLady",
    };
  }

  if (route.page === "compass") {
    return {
      description: "Explore Connected Cities - European Compass, an interactive compass of European city connections by distance and direction.",
      title: "Connected Cities - European Compass | PolkaLady Portfolio",
    };
  }

  if (route.articleSlug) {
    const article = articles.find(({ slug }) => slug === route.articleSlug);
    if (article) return { description: article.intro, title: `${article.title} | PolkaLady` };
  }

  if (route.page === "blog") {
    return {
      description: "PolkaLady journal: articles in progress on design, technology, artificial intelligence, archaeology, and possible digital worlds.",
      title: "Blog | Design, Technology & Research | PolkaLady",
    };
  }

  if (route.projectSlug) {
    const project = projects.find(({ slug }) => slug === route.projectSlug);
    if (project) return { description: project.intro, title: `${project.title} | PolkaLady Portfolio` };
  }

  if (route.page === "portfolio") {
    return {
      description: "Explore PolkaLady portfolio projects, including the immersive Traversée Experience trailer for the Strait of Messina.",
      title: "Portfolio | Digital Experiences & Creative Projects | PolkaLady",
    };
  }

  return defaults;
}

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value));
}

export function updateMetadata(route: SiteRoute) {
  const metadata = metadataForRoute(route);
  const canonicalUrl = `${window.location.origin}${pathForRoute(route)}`;
  document.title = metadata.title;
  setMeta('meta[name="description"]', { content: metadata.description, name: "description" });
  setMeta('meta[property="og:title"]', { content: metadata.title, property: "og:title" });
  setMeta('meta[property="og:description"]', { content: metadata.description, property: "og:description" });
  setMeta('meta[property="og:url"]', { content: canonicalUrl, property: "og:url" });
  setMeta('meta[name="twitter:title"]', { content: metadata.title, name: "twitter:title" });
  setMeta('meta[name="twitter:description"]', { content: metadata.description, name: "twitter:description" });

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;
}

export type PageName = "home" | "about" | "blog" | "portfolio" | "journeys";

export interface SiteRoute {
  articleSlug?: string;
  page: PageName;
  projectSlug?: string;
}

const projectPaths: Record<string, string> = {
  "beyond-ordinary": "traversee-messina",
  "connected-cities": "connected-cities",
  "digital-travelling": "digital-travelling",
};

const projectSlugs = Object.fromEntries(
  Object.entries(projectPaths).map(([slug, path]) => [path, slug]),
);

export const pagePaths: Record<PageName, string> = {
  about: "/about/",
  blog: "/blog/",
  home: "/",
  journeys: "/journeys/",
  portfolio: "/portfolio/",
};

export function articlePath(slug: string) {
  return `/blog/${slug}/`;
}

export function projectPath(slug: string) {
  return `/portfolio/${projectPaths[slug] ?? slug}/`;
}

function routeFromLegacyHash(hash: string): SiteRoute | null {
  const value = hash.replace(/^#/, "");

  if (value.startsWith("article/")) {
    return { articleSlug: value.replace("article/", ""), page: "blog" };
  }

  if (value.startsWith("project/")) {
    return { page: "portfolio", projectSlug: value.replace("project/", "") };
  }

  if (value === "about" || value === "blog" || value === "journeys" || value === "portfolio") {
    return { page: value };
  }

  return null;
}

export function pathForRoute(route: SiteRoute) {
  if (route.articleSlug) return articlePath(route.articleSlug);
  if (route.projectSlug) return projectPath(route.projectSlug);
  return pagePaths[route.page];
}

export function routeFromLocation(): SiteRoute {
  const legacyRoute = routeFromLegacyHash(window.location.hash);

  if (legacyRoute) {
    window.history.replaceState({}, "", pathForRoute(legacyRoute));
    return legacyRoute;
  }

  const parts = window.location.pathname.split("/").filter(Boolean);

  if (parts[0] === "about") return { page: "about" };
  if (parts[0] === "journeys") return { page: "journeys" };
  if (parts[0] === "blog") {
    return { articleSlug: parts[1], page: "blog" };
  }
  if (parts[0] === "portfolio") {
    return { page: "portfolio", projectSlug: parts[1] ? projectSlugs[parts[1]] ?? parts[1] : undefined };
  }

  return { page: "home" };
}

export function navigateTo(path: string) {
  if (`${window.location.pathname}${window.location.search}` !== path) {
    window.history.pushState({}, "", path);
  }
  window.dispatchEvent(new PopStateEvent("popstate"));
}

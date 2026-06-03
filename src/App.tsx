import { useEffect, useState } from "react";
import AboutPage from "./components/about-page";
import AnalyticsConsent from "./components/analytics-consent";
import BlogPage from "./components/blog-page";
import CompassPage from "./components/compass-page";
import JourneysPage from "./components/journeys-page";
import PortfolioPage from "./components/portfolio-page";
import SiteFooter from "./components/site-footer";
import SmoothScrollHero from "./components/ui/smooth-scroll-hero";
import SiteMenu from "./components/ui/site-menu";
import { initializeAnalytics, trackPageView } from "./lib/analytics";
import { routeFromLocation, type SiteRoute } from "./lib/navigation";
import { metadataForRoute, updateMetadata } from "./lib/seo";

const heroImage = `${import.meta.env.BASE_URL}website.png`;

function App() {
  const [route, setRoute] = useState<SiteRoute>(() => routeFromLocation());

  useEffect(() => {
    initializeAnalytics();
    const syncRoute = () => setRoute(routeFromLocation());
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    const metadata = metadataForRoute(route);
    updateMetadata(route);
    trackPageView(window.location.pathname, metadata.title);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  return (
    <>
      <SiteMenu activePage={route.page} />
      <main>
        {route.page === "home" && (
          <>
            <section className="hero-section">
              <SmoothScrollHero
                scrollHeight={1500}
                desktopImage={heroImage}
                holdScrollHeight={800}
                mobileImage={heroImage}
                initialClipPercentage={25}
                finalClipPercentage={75}
              >
                <div className="hero-copy">
                  <p className="hero-kicker">Digital Horizons</p>
                  <h1>Building ideas beyond the ordinary.</h1>
                  <p className="hero-description">
                    Scroll to explore a world shaped by technology, curiosity, and
                    imagination.
                  </p>
                </div>
              </SmoothScrollHero>

              <div className="scroll-cue" aria-hidden="true">
                <span>Scroll to reveal</span>
                <i />
              </div>
            </section>

            <section className="closing-section">
              <p>PolkaLady</p>
              <h2>Explore. Create. Connect.</h2>
            </section>
          </>
        )}

        {route.page === "blog" && <BlogPage articleSlug={route.articleSlug} />}

        {route.page === "portfolio" && <PortfolioPage projectSlug={route.projectSlug} />}

        {route.page === "compass" && <CompassPage />}

        {route.page === "journeys" && <JourneysPage />}

        {route.page === "about" && <AboutPage />}
      </main>
      <SiteFooter />
      <AnalyticsConsent />
    </>
  );
}

export default App;

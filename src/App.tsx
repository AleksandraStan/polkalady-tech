import { useEffect, useState } from "react";
import AboutPage from "./components/about-page";
import BlogPage from "./components/blog-page";
import JourneysPage from "./components/journeys-page";
import PortfolioPage from "./components/portfolio-page";
import SmoothScrollHero from "./components/ui/smooth-scroll-hero";
import SiteMenu, { type PageName } from "./components/ui/site-menu";

const heroImage = `${import.meta.env.BASE_URL}website.png`;

function App() {
  const [page, setPage] = useState<PageName>(() => {
    const hash = window.location.hash.slice(1);
    if (hash === "portfolio" || hash.startsWith("project/")) {
      return "portfolio";
    }
    if (hash === "journeys") {
      return "journeys";
    }
    if (hash === "about") {
      return "about";
    }
    return hash === "blog" || hash.startsWith("article/") ? "blog" : "home";
  });

  useEffect(() => {
    if (!window.location.hash.startsWith("#article/") && !window.location.hash.startsWith("#project/")) {
      window.location.hash = page === "home" ? "" : page;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      <SiteMenu activePage={page} onNavigate={setPage} />
      <main>
        {page === "home" && (
          <>
            <section className="hero-section">
              <div className="hero-copy">
                <p className="hero-kicker">Digital Horizons</p>
                <h1>Building ideas beyond the ordinary.</h1>
                <p className="hero-description">
                  Scroll to explore a world shaped by technology, curiosity, and
                  imagination.
                </p>
              </div>

              <SmoothScrollHero
                scrollHeight={1500}
                desktopImage={heroImage}
                mobileImage={heroImage}
                initialClipPercentage={25}
                finalClipPercentage={75}
              />

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

        {page === "blog" && <BlogPage />}

        {page === "portfolio" && <PortfolioPage />}

        {page === "journeys" && <JourneysPage />}

        {page === "about" && <AboutPage />}
      </main>
    </>
  );
}

export default App;

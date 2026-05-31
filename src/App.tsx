import { useEffect, useState } from "react";
import BlogPage from "./components/blog-page";
import SmoothScrollHero from "./components/ui/smooth-scroll-hero";
import SiteMenu, { type PageName } from "./components/ui/site-menu";

const heroImage = `${import.meta.env.BASE_URL}website.png`;

const projects = [
    ["Digital travelling", "Creative Direction", "An immersive visual identity built around possibility."],
    ["Connected Cities", "Concept Design", "A luminous interface for stories of future urban life."],
    ["Beyond Ordinary", "Digital Experience", "A cinematic web journey shaped by motion and atmosphere."],
  ];

function App() {
    const [page, setPage] = useState<PageName>(() => {
          const hash = window.location.hash.slice(1);
          return hash === "blog" || hash.startsWith("article/") || hash === "portfolio"
            ? hash === "portfolio" ? "portfolio" : "blog"
                  : "home";
    });

  useEffect(() => {
        if (!window.location.hash.startsWith("#article/")) {
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
                                                              <p className="hero-kicker">Digital Horizons</p>p>
                                                              <h1>Building ideas beyond the ordinary.</h1>h1>
                                                              <p className="hero-description">
                                                                                Scroll to explore a world shaped by technology, curiosity, and
                                                                                imagination.
                                                              </p>p>
                                              </div>div>
                                
                                              <SmoothScrollHero
                                                                scrollHeight={1500}
                                                                desktopImage={heroImage}
                                                                mobileImage={heroImage}
                                                                initialClipPercentage={25}
                                                                finalClipPercentage={75}
                                                              />
                                
                                              <div className="scroll-cue" aria-hidden="true">
                                                              <span>Scroll to reveal</span>span>
                                                              <i />
                                              </div>div>
                                </section>section>
                    
                                <section className="closing-section">
                                              <p>PolkaLady</p>p>
                                              <h2>Explore. Create. Connect.</h2>h2>
                                </section>section>
                    </>>
                  )}
              
                {page === "blog" && <BlogPage />}
              
                {page === "portfolio" && (
                    <section className="content-page">
                                <p className="section-label">Selected Work</p>p>
                                <h1>Ideas made <span>visible.</span>span></h1>h1>
                                <p className="page-intro">
                                              A collection of concepts where bold colour, clear thinking, and
                                              digital atmosphere meet.
                                </p>p>
                                <div className="project-grid">
                                  {projects.map(([title, category, description], index) => (
                                      <article key={title}>
                                                        <div
                                                                              className={`project-art project-art-${index + 1}`}
                                                                              style={{ backgroundImage: `url(${heroImage})` }}
                                                                            />
                                                        <p>{category}</p>p>
                                                        <h2>{title}</h2>h2>
                                                        <span>{description}</span>span>
                                      </article>article>
                                    ))}
                                </div>div>
                    </section>section>
                      )}
              </main>main>
        </>>
      );
}

export default App;
</></>

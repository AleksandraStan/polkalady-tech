import { useEffect, useState } from "react";
import BlogPage from "./components/blog-page";
import SmoothScrollHero from "./components/ui/smooth-scroll-hero";
import SiteMenu, { type PageName } from "./components/ui/site-menu";

const heroImage = `${import.meta.env.BASE_URL}website.png`;

const projects = [
      ["Digital travelling", "Individual Journey", "An immersive visual journey across different territories."],
      ["Connected Cities", "Concept Design", "A hypothetical story of future urban life."],
      ["Beyond Visible", "Digital Experience", "A journey shaped by flows."],
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
                                                                  <p className="hero-kicker"></p>
                                                                  <h1>Research ideas.</h1>
                                                                  <p className="hero-description">
                                                                                    Digital humanities research is shaped by technology, curiosity, and
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
                
                    {page === "portfolio" && (
                        <section className="content-page">
                                    <p className="section-label">Selected Work</p>
                                    <h1>Ideas made <span>visible.</span></h1>
                                    <p className="page-intro">
                                                  A collection of concepts & models.
                                    </p>
                                    <div className="project-grid">
                                        {projects.map(([title, category, description], index) => (
                                            <article key={title}>
                                                              <div
                                                                                      className={`project-art project-art-${index + 1}`}
                                                                                      style={{ backgroundImage: `url(${heroImage})` }}
                                                                                    />
                                                              <p>{category}</p>
                                                              <h2>{title}</h2>
                                                              <span>{description}</span>
                                            </article>
                                          ))}
                                    </div>
                        </section>
                        )}
                </main>
          </>
        );
}

export default App;

import { useEffect, useState } from "react";
import SmoothScrollHero from "./components/ui/smooth-scroll-hero";
import SiteMenu, { type PageName } from "./components/ui/site-menu";

const heroImage = `${import.meta.env.BASE_URL}website.png`;

const articles = [
  ["01", "3D recontruction & digital universe in archaeology", "3D Design", "6 min"],
  ["02", "Can LLM read as good as humans?", "AI & research", "4 min"],
  ["03", "Building Worlds at the Edge of Technology", "Future", "7 min"],
];

const projects = [
  ["Digital travelling", "Creative Direction", "An immersive visual identity built around possibility."],
  ["Connected Cities", "Concept Design", "A luminous interface for stories of future urban life."],
  ["Beyond Ordinary", "Digital Experience", "A cinematic web journey shaped by motion and atmosphere."],
];

function App() {
  const [page, setPage] = useState<PageName>(() => {
    const hash = window.location.hash.slice(1);
    return hash === "blog" || hash === "portfolio" ? hash : "home";
  });

  useEffect(() => {
    window.location.hash = page === "home" ? "" : page;
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

        {page === "blog" && (
          <section className="content-page">
            <p className="section-label">Journal / 2026</p>
            <h1>Stories from the <span>digital edge.</span></h1>
            <p className="page-intro">
              Notes on design, technology, imagination, and the work of turning
              possibility into something you can experience.
            </p>
            <div className="article-list">
              {articles.map(([number, title, category, time]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div>
                    <p>{category} / {time} read</p>
                    <h2>{title}</h2>
                  </div>
                  <b>&rarr;</b>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === "portfolio" && (
          <section className="content-page">
            <p className="section-label">Selected Work</p>
            <h1>Ideas made <span>visible.</span></h1>
            <p className="page-intro">
              A collection of concepts where bold colour, clear thinking, and
              digital atmosphere meet.
            </p>
            <div className="project-grid">
              {projects.map(([title, category, description], index) => (
                <article key={title}>
                  <div className={`project-art project-art-${index + 1}`} style={{ backgroundImage: `url(${heroImage})` }} />
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

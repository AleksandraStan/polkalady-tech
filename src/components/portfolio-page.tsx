import { projects } from "../content/projects";
import { trackEvent } from "../lib/analytics";
import { navigateTo, pagePaths, projectPath } from "../lib/navigation";
import CompassPage from "./compass-page";
import MediaGallery from "./media-gallery";
import MessinaExperience from "./messina-experience";
import "./blog.css";

export default function PortfolioPage({ projectSlug }: { projectSlug?: string }) {
  if (projectSlug === "time-geography-compass") {
    return <CompassPage />;
  }

  const activeProject = projects.find((project) => project.slug === projectSlug);

  if (activeProject) {
    if (activeProject.slug === "beyond-ordinary") {
      return <MessinaExperience />;
    }

    if (activeProject.slug === "connected-cities") {
      return <CompassPage />;
    }

    return (
      <article className="content-page article-page">
        <button className="back-link" onClick={() => navigateTo(pagePaths.portfolio)}>
          &larr; Back to portfolio
        </button>
        <p className="section-label">{activeProject.category}</p>
        <h1>{activeProject.title}</h1>
        <p className="article-intro">{activeProject.intro}</p>
        <MediaGallery media={activeProject.media} />
        <div className="article-body">
          {activeProject.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    );
  }

  return (
    <section className="content-page">
      <p className="section-label">Selected Work</p>
      <h1>Ideas made <span>visible.</span></h1>
      <p className="page-intro">
        A collection of projects.
      </p>
      <aside className="page-notice">
        <strong>Work in progress</strong>
        <span>
          Some of the content is currently being corrected. In the meantime,
          you can open the Traversée Experience to watch the Messina project
          trailer.
        </span>
      </aside>
      <div className="project-grid">
        {projects.map((project, index) => (
          <a
            className="project-preview"
            href={projectPath(project.slug)}
            key={project.slug}
            onClick={(event) => {
              event.preventDefault();
              trackEvent("open_portfolio_project", { project_slug: project.slug });
              if (project.slug === "beyond-ordinary") {
                trackEvent("open_messina_experience");
              }
              navigateTo(projectPath(project.slug));
            }}
          >
            <div
              className={`project-art project-art-${index + 1}${project.slug === "beyond-ordinary" ? " project-art-messina" : ""}${project.slug === "connected-cities" || project.slug === "time-geography-compass" ? " project-art-compass" : ""}`}
              style={{
                backgroundImage: project.slug === "beyond-ordinary"
                  ? "none"
                  : `url(${import.meta.env.BASE_URL}website.png)`,
              }}
            >
              {project.slug === "beyond-ordinary" && (
                <video autoPlay loop muted playsInline src={`${import.meta.env.BASE_URL}messina/departure.mp4`} />
              )}
            </div>
            <p>{project.category}</p>
            <h2>{project.title}</h2>
            <span>{project.intro}</span>
            <b>Open project &rarr;</b>
          </a>
        ))}
      </div>
    </section>
  );
}

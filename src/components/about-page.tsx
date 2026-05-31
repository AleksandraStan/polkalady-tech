import "./about.css";

const interests = [
  {
    number: "01",
    title: "New Media",
    description:
      "Exploring digital forms as spaces for observation, expression, and discovery.",
  },
  {
    number: "02",
    title: "Mapping Methods",
    description:
      "Using maps and visual systems to make complex ideas tangible.",
  },
  {
    number: "03",
    title: "Agent-Based Models",
    description:
      "Working with ABM to understand how individual behaviours shape larger patterns.",
  },
  {
    number: "04",
    title: "Possible Realities",
    description:
      "Creating digital worlds that help investigate and solve scientific problems.",
  },
] as const;

export default function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-orbit about-orbit-one" aria-hidden="true" />
      <div className="about-orbit about-orbit-two" aria-hidden="true" />

      <div className="about-hero">
        <p className="section-label">About Me</p>
        <h1>
          Between systems and <span>possible realities.</span>
        </h1>
        <p className="about-lead">
          I am an artist and researcher working across new media, technology,
          mapping methods, and agent-based modelling.
        </p>
      </div>

      <div className="about-layout">
        <div className="about-statement">
          <p className="about-index">PL / PROFILE</p>
          <h2>Curiosity with a practical side.</h2>
          <p>
            I am interested in every form of digital reality creation that can
            help us see a question differently. My work moves between creative
            experimentation and scientific problem-solving: from maps and
            simulations to new ways of making complex systems visible.
          </p>
          <p>
            In everyday life, I work as an IT engineer, content creator, and
            professor.
          </p>
        </div>

        <div className="about-aside">
          <figure className="about-portrait">
            <img
              alt="Aleksandra sitting by the sea during a journey"
              src={`${import.meta.env.BASE_URL}about/aleksandra-by-the-sea.jpg`}
            />
            <figcaption>Somewhere between land and sea</figcaption>
          </figure>

          <div className="about-roles" aria-label="Professional roles">
            <p className="about-index">CURRENT ROLES</p>
            <span>IT Engineer</span>
            <span>Artist &amp; Researcher</span>
            <span>Content Creator</span>
            <span>Professor</span>
          </div>
        </div>
      </div>

      <div className="about-interests">
        <p className="about-index">FIELDS OF EXPLORATION</p>
        <div className="about-interest-grid">
          {interests.map((interest) => (
            <article key={interest.number}>
              <span>{interest.number}</span>
              <h2>{interest.title}</h2>
              <p>{interest.description}</p>
            </article>
          ))}
        </div>
      </div>

      <blockquote className="about-story">
        <p>
          I used to play the piano. At some point, I sold it to travel and
          replaced it with a good laptop.
        </p>
      </blockquote>
    </section>
  );
}

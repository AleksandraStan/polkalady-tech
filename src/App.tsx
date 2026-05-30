import SmoothScrollHero from "./components/ui/smooth-scroll-hero";

const heroImage = "/website.png";

function App() {
  return (
    <main>
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
        <p>Alexandra Stan</p>
        <h2>Explore. Create. Connect.</h2>
      </section>
    </main>
  );
}

export default App;

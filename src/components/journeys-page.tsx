import { useEffect, useState } from "react";
import "./journeys.css";

const wordpressUrl = "https://polkaladyjourneys.wordpress.com/";

const journeys = [
  {
    title: "Messina, Sicily",
    location: "La mia isola",
    image: "journeys/coastal-storm.jpg",
    icon: "wave",
    url: "https://polkaladyjourneys.wordpress.com/portfolio-2/",
  },
  {
    title: "Athens, Greece",
    location: "The Acropolis of Athens",
    image: "journeys/athens-theatre.jpg",
    icon: "landmark",
    url: "https://polkaladyjourneys.wordpress.com/2026/04/19/ancient-treasure-and-top-tourist-attraction-the-acropolis-of-athens/",
  },
  {
    title: "South Australia",
    location: "Approaching the south",
    image: "journeys/kangaroo.jpg",
    icon: "leaf",
    url: "https://polkaladyjourneys.wordpress.com/2018/01/08/arriving-to-south-australia/",
  },
  {
    title: "Santorini, Greece",
    location: "Inside a small volcanic island",
    image: "journeys/santorini.jpg",
    icon: "sun",
    url: "https://polkaladyjourneys.wordpress.com/2022/06/22/paradoxes-of-travelling-inside-of-small-volcanic-islands-santorini-in-greece/",
  },
  {
    title: "New Zealand",
    location: "Why some places attract travellers",
    image: "journeys/rainforest.jpg",
    icon: "leaf",
    url: "https://polkaladyjourneys.wordpress.com/2018/01/28/why-some-places-are-more-touristic-then-the-others/",
  },
  {
    title: "Albania",
    location: "A country still unfolding",
    image: "journeys/golden-beach.jpg",
    icon: "sun",
    url: "https://polkaladyjourneys.wordpress.com/2021/09/02/albania-what-part-1/",
  },
  {
    title: "Montenegro",
    location: "Wild Beauty",
    image: "journeys/mountain-lake.jpg",
    icon: "mountain",
    url: "https://polkaladyjourneys.wordpress.com/2020/10/04/montenegros-wild-beauty/",
  },
  {
    title: "Royal National Park",
    location: "Sydney, Australia",
    image: "journeys/sunset-frame.jpg",
    icon: "leaf",
    url: "https://polkaladyjourneys.wordpress.com/2018/05/09/royal-national-park-in-sydney/",
  },
  {
    title: "Sydney, Australia",
    location: "A dialogue between design and sea",
    image: "journeys/sydney-opera-house.jpg",
    icon: "landmark",
    url: "https://polkaladyjourneys.wordpress.com/2018/03/02/hypnotizing-dialogue-of-urban-landscape/",
  },
] as const;

const iconPaths = {
  wave: "M3 14c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 7 0M3 19c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 7 0",
  landmark: "M4 21h16M6 18h12M7 18V9m5 9V9m5 9V9M4 9h16L12 4 4 9Z",
  leaf: "M20 4C11 4 5 8 5 15c0 3 2 5 5 5 6 0 9-7 10-16ZM5 20c2-4 5-7 11-10",
  mountain: "m3 20 7-12 4 6 2-3 5 9H3Z",
  sun: "M12 4v2m0 12v2m8-8h-2M6 12H4m13.7-5.7-1.4 1.4M7.7 16.3l-1.4 1.4m11.4 0-1.4-1.4M7.7 7.7 6.3 6.3M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
};

function JourneyIcon({ name }: { name: keyof typeof iconPaths }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d={iconPaths[name]} />
    </svg>
  );
}

export default function JourneysPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = journeys.map((_, index) =>
      window.setTimeout(() => setVisibleCount(index + 1), 100 * index),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <section className="journeys-page">
      <div className="journeys-heading">
        <p className="section-label">PolkaLady Journeys</p>
        <h1>Stories shaped by <span>the road.</span></h1>
        <p>
          Open a frame, follow a memory, and continue into the original travel
          journal.
        </p>
      </div>

      <div className="journey-selector" aria-label="Travel photo highlights">
        {journeys.map((journey, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              className={`journey-option${isActive ? " active" : ""}${index < visibleCount ? " visible" : ""}`}
              key={journey.title}
              style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}${journey.image})`,
              }}
            >
              <button
                aria-label={`${journey.title}: ${journey.location}`}
                aria-pressed={isActive}
                className="journey-select"
                onClick={() => setActiveIndex(index)}
                type="button"
              />
              <span className="journey-shade" />
              <span className="journey-label">
                <span className="journey-icon">
                  <JourneyIcon name={journey.icon} />
                </span>
                <span className="journey-copy">
                  <strong>{journey.title}</strong>
                  <small>{journey.location}</small>
                  <a
                    href={journey.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Read story <span aria-hidden="true">&rarr;</span>
                  </a>
                </span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="journeys-footer">
        <p>The complete collection currently lives on WordPress.</p>
        <a href={wordpressUrl} rel="noreferrer" target="_blank">
          Visit PolkaLady Journeys <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}

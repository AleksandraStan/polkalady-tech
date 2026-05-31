import { useEffect, useState } from "react";
import "./journeys.css";

const wordpressUrl = "https://polkaladyjourneys.wordpress.com/";

const journeys = [
  {
    title: "Coastal Storm",
    location: "Mediterranean shores",
    image: "journeys/coastal-storm.jpg",
    icon: "wave",
  },
  {
    title: "Athens",
    location: "Ancient theatre views",
    image: "journeys/athens-theatre.jpg",
    icon: "landmark",
  },
  {
    title: "Koala Encounter",
    location: "Australia up close",
    image: "journeys/koala-encounter.jpg",
    icon: "leaf",
  },
  {
    title: "Santorini",
    location: "White cliffs and blue sea",
    image: "journeys/santorini.jpg",
    icon: "sun",
  },
  {
    title: "Rainforest",
    location: "A walk beneath the canopy",
    image: "journeys/rainforest.jpg",
    icon: "leaf",
  },
  {
    title: "Golden Beach",
    location: "Sunset at the water's edge",
    image: "journeys/golden-beach.jpg",
    icon: "sun",
  },
  {
    title: "Sunset Frame",
    location: "Light over the water",
    image: "journeys/sunset-frame.jpg",
    icon: "sun",
  },
  {
    title: "Mountain Lake",
    location: "The road through the valley",
    image: "journeys/mountain-lake.jpg",
    icon: "mountain",
  },
  {
    title: "Kangaroo",
    location: "Wildlife in Australia",
    image: "journeys/kangaroo.jpg",
    icon: "leaf",
  },
  {
    title: "Sydney",
    location: "The harbour after dusk",
    image: "journeys/sydney-opera-house.jpg",
    icon: "landmark",
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
          journal while its new home is taking shape.
        </p>
      </div>

      <div className="journey-selector" aria-label="Travel photo highlights">
        {journeys.map((journey, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              aria-label={`${journey.title}: ${journey.location}`}
              aria-pressed={isActive}
              className={`journey-option${isActive ? " active" : ""}${index < visibleCount ? " visible" : ""}`}
              key={journey.title}
              onClick={() => setActiveIndex(index)}
              style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}${journey.image})`,
              }}
              type="button"
            >
              <span className="journey-shade" />
              <span className="journey-label">
                <span className="journey-icon">
                  <JourneyIcon name={journey.icon} />
                </span>
                <span className="journey-copy">
                  <strong>{journey.title}</strong>
                  <small>{journey.location}</small>
                </span>
              </span>
            </button>
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

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { trackEvent } from "../lib/analytics";
import "./messina-experience.css";

const base = import.meta.env.BASE_URL;
const introVideo = `${base}messina/departure.mp4`;

const chapters = [
  {
    number: "01",
    eyebrow: "From the shore",
    title: "Traffic within the strait as seen from Messina province coast",
    location: "Messina, Sicily",
    video: `${base}messina/arrival.mov`,
    time: "00:00",
  },
  {
    number: "02",
    eyebrow: "Cast off",
    title: "Leaving the island",
    location: "Sicilian coast",
    video: `${base}messina/open-water.mp4`,
    time: "01:28",
  },
  {
    number: "03",
    eyebrow: "Open water",
    title: "Inside the strait",
    location: "38°14'N 15°38'E",
    video: `${base}messina/departure.mp4`,
    time: "03:06",
  },
  {
    number: "04",
    eyebrow: "Approach",
    title: "The other coast",
    location: "Villa San Giovanni",
    video: `${base}messina/final-approach.mp4`,
    time: "04:47",
  },
] as const;

function WaveMark() {
  return (
    <svg aria-hidden="true" className="messina-wave-mark" viewBox="0 0 96 32">
      <path d="M2 17c11-11 21-11 32 0s21 11 32 0 18-11 28-2" />
      <path d="M11 25c10-7 19-7 29 0s18 7 28 0" />
    </svg>
  );
}

function Compass() {
  return (
    <span className="messina-compass" aria-hidden="true">
      <i />
      <b>N</b>
    </span>
  );
}

const demandLevels = {
  calm: {
    label: "Calm",
    vehicles: 7,
    currentQueue: "14 min",
    bridgeQueue: "< 1 min",
    currentFlow: "68",
    bridgeFlow: "154",
  },
  regular: {
    label: "Regular",
    vehicles: 10,
    currentQueue: "24 min",
    bridgeQueue: "2 min",
    currentFlow: "92",
    bridgeFlow: "218",
  },
  peak: {
    label: "Peak",
    vehicles: 14,
    currentQueue: "38 min",
    bridgeQueue: "5 min",
    currentFlow: "116",
    bridgeFlow: "286",
  },
} as const;

type Demand = keyof typeof demandLevels;
type SimulationMode = "current" | "bridge";

function Vehicle({ index, mode, total }: { index: number; mode: SimulationMode; total: number }) {
  const lane = index % 2;
  const direction = lane === 0 ? "east" : "west";
  const style = {
    "--car-delay": `${index * -0.92}s`,
    "--car-lane": lane,
    "--car-speed": `${mode === "bridge" ? 6.4 : 8.8}s`,
    "--queue-row": Math.floor(index / 2),
  } as CSSProperties;

  return (
    <i
      aria-hidden="true"
      className={`traffic-vehicle traffic-vehicle-${mode} traffic-vehicle-${direction}${index >= total ? " traffic-vehicle-hidden" : ""}`}
      style={style}
    />
  );
}

function TrafficSimulation() {
  const [mode, setMode] = useState<SimulationMode>("current");
  const [demand, setDemand] = useState<Demand>("regular");
  const scenario = demandLevels[demand];
  const isBridge = mode === "bridge";

  const setSimulationMode = (nextMode: SimulationMode) => {
    setMode(nextMode);
    trackEvent("change_messina_traffic_scenario", { mode: nextMode });
  };

  return (
    <section className="traffic-lab">
      <div className="traffic-lab-heading">
        <p>Mobility lab / visual scenario</p>
        <h2>Hypothetical vision of traffic pattern<br /><em>with or without a bridge</em></h2>
        <span>
          Compare the ferry rhythm with an illustrative bridge scenario. Adjust
          demand to see how a scheduled crossing becomes a continuous flow.
        </span>
      </div>

      <div className="traffic-console">
        <div className="traffic-console-top">
          <div>
            <p>Strait flow simulator</p>
            <span>Messina &harr; Villa San Giovanni</span>
          </div>
          <b>Live model <i /></b>
        </div>

        <div className="traffic-mode-switch" aria-label="Traffic scenario">
          <button
            aria-pressed={!isBridge}
            className={!isBridge ? "active" : ""}
            onClick={() => setSimulationMode("current")}
            type="button"
          >
            <span>01</span>
            Today / ferry
          </button>
          <button
            aria-pressed={isBridge}
            className={isBridge ? "active" : ""}
            onClick={() => setSimulationMode("bridge")}
            type="button"
          >
            <span>02</span>
            With bridge
          </button>
        </div>

        <div className={`traffic-map traffic-map-${mode}`}>
          <div className="traffic-coast traffic-coast-sicily">
            <span>Sicily</span>
          </div>
          <div className="traffic-coast traffic-coast-calabria">
            <span>Calabria</span>
          </div>
          <div className="traffic-water">
            <b>Strait of Messina</b>
            <i />
            <i />
            <i />
          </div>
          <div className="traffic-route">
            <div className="traffic-route-line" />
            {isBridge && (
              <div className="traffic-bridge-deck">
                <span>5 km bridge span</span>
              </div>
            )}
            {!isBridge && (
              <>
                <div className="traffic-terminal traffic-terminal-sicily">Terminal</div>
                <div className="traffic-terminal traffic-terminal-calabria">Terminal</div>
                <div className="traffic-ferry traffic-ferry-east">
                  <i />
                  <b>Ferry</b>
                </div>
                <div className="traffic-ferry traffic-ferry-west">
                  <i />
                  <b>Ferry</b>
                </div>
              </>
            )}
            {Array.from({ length: 14 }, (_, index) => (
              <Vehicle index={index} key={index} mode={mode} total={scenario.vehicles} />
            ))}
          </div>
          <div className="traffic-map-note">
            <b>{isBridge ? "Two-way continuous crossing" : "Two-way departure window"}</b>
            <span>{isBridge ? "Vehicles move in both directions" : "One ship every 40 minutes"}</span>
          </div>
        </div>

        <div className="traffic-controls">
          <p>Traffic demand</p>
          <div>
            {(Object.keys(demandLevels) as Demand[]).map((level) => (
              <button
                aria-pressed={demand === level}
                className={demand === level ? "active" : ""}
                key={level}
                onClick={() => {
                  setDemand(level);
                  trackEvent("change_messina_traffic_demand", { demand: level });
                }}
                type="button"
              >
                {demandLevels[level].label}
              </button>
            ))}
          </div>
        </div>

        <div className="traffic-metrics">
          <div>
            <span>Est. queue time</span>
            <strong>{isBridge ? scenario.bridgeQueue : scenario.currentQueue}</strong>
          </div>
          <div>
            <span>Crossing rhythm</span>
            <strong>{isBridge ? "Continuous" : "40 min"}</strong>
          </div>
          <div>
            <span>Visual flow index</span>
            <strong>{isBridge ? scenario.bridgeFlow : scenario.currentFlow}<small>/ hr</small></strong>
          </div>
        </div>
        <p className="traffic-disclaimer">
          Illustrative comparison only. Values are designed to communicate the
          change in traffic pattern, not to present an engineering forecast.
        </p>
      </div>
    </section>
  );
}

export default function MessinaExperience() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [soundOn, setSoundOn] = useState(false);
  const introRef = useRef<HTMLElement | null>(null);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveIndex(Number((visible.target as HTMLElement).dataset.chapter));
        }
      },
      { threshold: [0.35, 0.55, 0.75] },
    );

    if (introRef.current) observer.observe(introRef.current);
    chapterRefs.current.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (introVideoRef.current) {
      introVideoRef.current.muted = !soundOn || activeIndex !== -1;
      if (activeIndex === -1) {
        void introVideoRef.current.play().catch(() => undefined);
      } else {
        introVideoRef.current.pause();
      }
    }

    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      video.muted = !soundOn || index !== activeIndex;
      video.playbackRate = index === 0 ? 2 : 1;
      if (index === activeIndex) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeIndex, soundOn]);

  return (
    <div className="messina-experience">
      <div className="messina-stage" aria-hidden="true">
        <video
          autoPlay
          className={`messina-bg${activeIndex === -1 ? " active" : ""}`}
          loop
          muted
          playsInline
          preload="auto"
          ref={introVideoRef}
          src={introVideo}
        />
        {chapters.map((chapter, index) => (
          <video
            className={`messina-bg messina-bg-chapter-${index + 1}${activeIndex === index ? " active" : ""}`}
            key={chapter.video}
            loop
            muted
            playsInline
            preload="metadata"
            ref={(video) => {
              videoRefs.current[index] = video;
            }}
            src={chapter.video}
          />
        ))}
        <div className="messina-vignette" />
        <div className="messina-grain" />
      </div>

      <aside className="messina-route" aria-label="Crossing progress">
        <span>MESSINA</span>
        <div className="messina-route-line">
          <i style={{ height: `${Math.max(activeIndex, 0) / (chapters.length - 1) * 100}%` }} />
          {chapters.map((chapter, index) => (
            <button
              aria-label={`Go to ${chapter.title}`}
              className={activeIndex === index ? "active" : ""}
              key={chapter.number}
              onClick={() => chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth" })}
              type="button"
            >
              <b>{chapter.number}</b>
            </button>
          ))}
        </div>
        <span>CALABRIA</span>
      </aside>

      <button
        aria-label={soundOn ? "Mute ambient sound" : "Play ambient sound"}
        className="messina-sound"
        onClick={() => setSoundOn((current) => {
          const next = !current;
          trackEvent(next ? "enable_sound" : "disable_sound", { experience: "traversee_messina" });
          return next;
        })}
        type="button"
      >
        <span>{soundOn ? "Sound on" : "Listen"}</span>
        <i className={soundOn ? "active" : ""} />
      </button>

      <section className="messina-intro" data-chapter="-1" ref={introRef}>
        <div className="messina-intro-top">
          <p>Sicily to Calabria / 5.1 km</p>
          <Compass />
        </div>
        <div className="messina-title">
          <p>Field note No. 04</p>
          <h1>
            The <em>Strait</em>
            <span>of Messina</span>
          </h1>
          <div className="messina-title-foot">
            <WaveMark />
            <p>
              A passage between two shores.<br />
              Stay with the horizon.
            </p>
          </div>
        </div>
        <div className="messina-scroll-cue">
          <span>Scroll to cross</span>
          <i />
        </div>
      </section>

      {chapters.map((chapter, index) => (
        <section
          className={`messina-chapter chapter-${index + 1}`}
          data-chapter={index}
          key={chapter.number}
          ref={(section) => {
            chapterRefs.current[index] = section;
          }}
        >
          <div className="messina-chapter-card">
            <div className="messina-card-top">
              <span>{chapter.time}</span>
              <span>Chapter {chapter.number}</span>
            </div>
            <p className="messina-eyebrow">{chapter.eyebrow}</p>
            <h2>{chapter.title}</h2>
            <div className="messina-card-bottom">
              <span>{chapter.location}</span>
              <WaveMark />
            </div>
          </div>
        </section>
      ))}

      <section className="messina-arrival">
        <p>Two coastlines, one current</p>
        <h2>Arrived, but still moving.</h2>
        <span>Strait of Messina / Mediterranean Sea</span>
      </section>

      <TrafficSimulation />
    </div>
  );
}

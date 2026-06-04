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

type SimulationMode = "current" | "bridge";

function trafficForHour(hour: number) {
  if (hour >= 2 && hour <= 6) {
    return {
      bridgeFlow: "54",
      bridgeQueue: "< 1 min",
      currentFlow: "28",
      currentQueue: "8 min",
      label: "Night / very low",
      rushHour: false,
      speed: 8.6,
      vehicles: 4,
    };
  }

  if (hour === 8 || hour === 18) {
    return {
      bridgeFlow: "286",
      bridgeQueue: "5 min",
      currentFlow: "116",
      currentQueue: "38 min",
      label: "Rush hour",
      rushHour: true,
      speed: 6.8,
      vehicles: 20,
    };
  }

  if (hour < 2 || hour >= 21) {
    return {
      bridgeFlow: "118",
      bridgeQueue: "< 1 min",
      currentFlow: "54",
      currentQueue: "12 min",
      label: "Quiet hours",
      rushHour: false,
      speed: 7.8,
      vehicles: 6,
    };
  }

  return {
    bridgeFlow: "218",
    bridgeQueue: "2 min",
    currentFlow: "92",
    currentQueue: "24 min",
    label: "Regular flow",
    rushHour: false,
    speed: 6.4,
    vehicles: 10,
  };
}

interface BridgeAgent {
  direction: "east" | "west";
  id: number;
  position: number;
  speed: number;
}

function FerryQueueVehicle({ index, queueVisible, total }: { index: number; queueVisible: boolean; total: number }) {
  const lane = index % 2;
  const direction = lane === 0 ? "east" : "west";
  const style = {
    "--arrival-delay": `${index * -2.4}s`,
    "--car-lane": lane,
    "--queue-row": Math.floor(index / 2),
  } as CSSProperties;

  return (
    <i
      aria-hidden="true"
      className={`traffic-vehicle traffic-vehicle-current traffic-vehicle-${direction}${queueVisible ? " traffic-vehicle-terminal-queue" : " traffic-vehicle-terminal-arrival"}${index >= total ? " traffic-vehicle-hidden" : ""}`}
      style={style}
    />
  );
}

function BridgeVehicle({ agent }: { agent: BridgeAgent }) {
  const style = {
    "--agent-position": `${agent.position}%`,
    "--car-lane": agent.direction === "east" ? 0 : 1,
  } as CSSProperties;

  return (
    <i
      aria-hidden="true"
      className={`traffic-vehicle traffic-vehicle-bridge traffic-vehicle-${agent.direction}`}
      style={style}
    />
  );
}

function createRoadAgents(total: number, startId: number) {
  const perDirection = Math.max(1, Math.floor(total / 2));

  return (["east", "west"] as const).flatMap((direction, directionIndex) =>
    Array.from({ length: perDirection }, (_, index) => ({
      direction,
      id: startId + directionIndex * perDirection + index,
      position: -4 + index * (108 / perDirection),
      speed: 0.34 + (index % 3) * 0.08,
    })),
  );
}

function TrafficSimulation() {
  const [mode, setMode] = useState<SimulationMode>("current");
  const [hour, setHour] = useState(13);
  const [bridgeAgents, setBridgeAgents] = useState<BridgeAgent[]>([]);
  const [centerPulseDirection, setCenterPulseDirection] = useState<BridgeAgent["direction"] | null>(null);
  const centerPulseDirectionRef = useRef<BridgeAgent["direction"] | null>(null);
  const centerPulseTimer = useRef<number | null>(null);
  const nextAgentId = useRef(0);
  const spawnCycles = useRef(0);
  const trafficTick = useRef(0);
  const scenario = trafficForHour(hour);
  const isBridge = mode === "bridge";
  const hasTrafficWave = bridgeAgents.filter((agent) => agent.speed < 0.18).length >= 2;
  const trafficStatus = centerPulseDirection
    ? `${centerPulseDirection === "east" ? "Eastbound" : "Westbound"} mid-span slowdown`
    : hasTrafficWave
    ? "Stop-and-go wave"
    : isBridge
    ? "Traffic flowing"
    : "Scheduled ferry crossing";

  useEffect(() => {
    if (!isBridge) {
      setBridgeAgents([]);
      centerPulseDirectionRef.current = null;
      setCenterPulseDirection(null);
      return;
    }

    setBridgeAgents(createRoadAgents(scenario.vehicles, nextAgentId.current));
    nextAgentId.current += scenario.vehicles;
    centerPulseDirectionRef.current = null;
    setCenterPulseDirection(null);

    const speedLimit = scenario.rushHour ? 0.88 : 1.22;
    const acceleration = 0.035;
    const deceleration = 0.16;
    const safeGap = scenario.rushHour ? 8.4 : 7;
    const arrivalTicks = scenario.rushHour ? 3 : scenario.vehicles <= 4 ? 34 : scenario.vehicles <= 6 ? 21 : 13;

    const interval = window.setInterval(() => {
      trafficTick.current += 1;
      setBridgeAgents((currentAgents) => {
        const activeAgents = currentAgents.filter((agent) => agent.position < 112);
        const movedAgents = activeAgents.map((agent) => {
          const nearestCar = activeAgents
            .filter((candidate) => candidate.direction === agent.direction && candidate.position > agent.position)
            .sort((a, b) => a.position - b.position)[0];
          const gap = nearestCar ? nearestCar.position - agent.position : 100;
          const hasCenterPulse = centerPulseDirectionRef.current === agent.direction
            && agent.position >= 42
            && agent.position <= 58;
          const nextSpeed = hasCenterPulse
            ? Math.max(0.12, agent.speed - 0.09)
            : gap < safeGap
            ? Math.max(0, Math.min(agent.speed, nearestCar.speed) - deceleration)
            : Math.min(speedLimit, agent.speed + acceleration);

          return { ...agent, position: agent.position + nextSpeed, speed: nextSpeed };
        });

        if (trafficTick.current % arrivalTicks === 0) {
          spawnCycles.current += 1;

          if (spawnCycles.current % 5 === 0) {
            const nextDirection = spawnCycles.current % 10 === 0 ? "west" : "east";
            centerPulseDirectionRef.current = nextDirection;
            setCenterPulseDirection(nextDirection);
            if (centerPulseTimer.current) window.clearTimeout(centerPulseTimer.current);
            centerPulseTimer.current = window.setTimeout(() => {
              centerPulseDirectionRef.current = null;
              setCenterPulseDirection(null);
            }, 1900);
          }

          (["east", "west"] as const).forEach((direction) => {
            const entryIsClear = movedAgents.every((agent) => agent.direction !== direction || agent.position > -4);

            if (entryIsClear && movedAgents.length < scenario.vehicles) {
              movedAgents.push({
                direction,
                id: nextAgentId.current++,
                position: -10,
                speed: scenario.rushHour && trafficTick.current % (arrivalTicks * 4) === 0 ? 0.08 : 0.3,
              });
            }
          });
        }

        return movedAgents;
      });
    }, 150);

    return () => {
      window.clearInterval(interval);
      if (centerPulseTimer.current) window.clearTimeout(centerPulseTimer.current);
    };
  }, [isBridge, scenario.rushHour, scenario.vehicles]);

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
          the hour to see how traffic changes across the day and night.
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
            <span><b>Messina</b><small>Sicily</small></span>
            <i aria-hidden="true" />
          </div>
          <div className="traffic-coast traffic-coast-calabria">
            <span><b>Villa San Giovanni</b><small>Calabria</small></span>
            <i aria-hidden="true" />
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
              <>
                <div className="traffic-approach-street traffic-approach-street-sicily">Approach street</div>
                <div className="traffic-approach-street traffic-approach-street-calabria">Approach street</div>
                <div className="traffic-bridge-deck">
                  <span>5 km bridge span</span>
                </div>
              </>
            )}
            {!isBridge && (
              <>
                <div className="traffic-terminal traffic-terminal-sicily">Terminal</div>
                <div className="traffic-terminal traffic-terminal-calabria">Terminal</div>
                <div className="traffic-ferry traffic-ferry-east">
                  <i />
                  <span />
                  <b>Ferry</b>
                </div>
                <div className="traffic-ferry traffic-ferry-west">
                  <i />
                  <span />
                  <b>Ferry</b>
                </div>
              </>
            )}
            {isBridge
              ? bridgeAgents.map((agent) => <BridgeVehicle agent={agent} key={agent.id} />)
              : Array.from({ length: 14 }, (_, index) => (
                <FerryQueueVehicle index={index} key={index} queueVisible={scenario.rushHour} total={scenario.rushHour ? 14 : Math.min(4, scenario.vehicles)} />
              ))}
          </div>
        </div>

        <div className="traffic-status">
          <span>Status</span>
          <b>{trafficStatus}</b>
        </div>

        <div className="traffic-controls">
          <div className="traffic-time-heading">
            <p>Time of day</p>
            <b>{String(hour).padStart(2, "0")}:00 <span>{scenario.label}</span></b>
          </div>
          <div className="traffic-time-control">
            <input
              aria-label="Time of day"
              max="23"
              min="0"
              onInput={(event) => {
                const nextHour = Number(event.currentTarget.value);
                setHour(nextHour);
                trackEvent("change_messina_traffic_hour", { hour: String(nextHour) });
              }}
              step="1"
              type="range"
              value={hour}
            />
            <div>
              <span>00</span>
              <span>06</span>
              <span>12</span>
              <span>18</span>
              <span>23</span>
            </div>
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

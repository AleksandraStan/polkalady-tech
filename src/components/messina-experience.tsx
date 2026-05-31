import { useEffect, useRef, useState } from "react";
import "./messina-experience.css";

const base = import.meta.env.BASE_URL;
const introVideo = `${base}messina/departure.mp4`;

const chapters = [
  {
    number: "01",
    eyebrow: "From the shore",
    title: "Messina sees far",
    location: "Messina, Sicily",
    video: `${base}messina/arrival.mov`,
    time: "00:00",
  },
  {
    number: "02",
    eyebrow: "Cast off",
    title: "Leaving Messina",
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
        onClick={() => setSoundOn((current) => !current)}
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
    </div>
  );
}

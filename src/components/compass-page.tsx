import { motion, useMotionValue } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import { navigateTo, pagePaths } from "../lib/navigation";
import "./compass.css";

type Place = {
  coordinates: string;
  description: string;
  label: string;
  lat: number;
  lon: number;
  terrain: "capital" | "coastal" | "mountain" | "rail-hub" | "island";
};

type Connection = {
  bearing: number;
  direction: string;
  distance: number;
  from: Place;
  id: string;
  minutes: number;
  to: Place;
};

type CompassStyle = CSSProperties & Partial<Record<"--ray-bearing" | "--ray-counter-bearing" | "--ray-length", string>>;
type JourneyIconName = "airport" | "car" | "pause" | "train";

const places: Place[] = [
  { coordinates: "48.8566 N, 2.3522 E", description: "Dense capital access with strong rail links, metro coverage, airport transfers, and high crowd pressure.", label: "Paris", lat: 48.8566, lon: 2.3522, terrain: "capital" },
  { coordinates: "52.5200 N, 13.4050 E", description: "Major rail and urban mobility hub with broad public transport coverage and moderate transfer complexity.", label: "Berlin", lat: 52.52, lon: 13.405, terrain: "rail-hub" },
  { coordinates: "41.9028 N, 12.4964 E", description: "Historic city access with airports, rail, dense walking routes, heritage surfaces, and crowd friction.", label: "Rome", lat: 41.9028, lon: 12.4964, terrain: "capital" },
  { coordinates: "41.3851 N, 2.1734 E", description: "Coastal city access shaped by airport transfers, metro connections, port geography, and tourist density.", label: "Barcelona", lat: 41.3851, lon: 2.1734, terrain: "coastal" },
  { coordinates: "48.2082 N, 16.3738 E", description: "Central European access with strong rail continuity, compact urban transit, and low navigation friction.", label: "Vienna", lat: 48.2082, lon: 16.3738, terrain: "rail-hub" },
  { coordinates: "59.3293 N, 18.0686 E", description: "Northern city access with bridges, islands, rail links, ferries, and seasonal weather effects.", label: "Stockholm", lat: 59.3293, lon: 18.0686, terrain: "island" },
  { coordinates: "47.3769 N, 8.5417 E", description: "Alpine-adjacent access with precise rail systems, lake geography, airport links, and topographic constraint.", label: "Zurich", lat: 47.3769, lon: 8.5417, terrain: "mountain" },
];

const directionOrder = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];

const terrainFriction: Record<Place["terrain"], number> = {
  capital: 17,
  coastal: 18,
  island: 26,
  mountain: 22,
  "rail-hub": 12,
};

function CompassMark({ bearing, label }: { bearing: number; label: string }) {
  return (
    <span
      className="compass-mark"
      style={{ transform: `rotate(${bearing}deg) translateY(-46%) rotate(${-bearing}deg)` }}
    >
      {label}
    </span>
  );
}

function JourneyIcon({ name }: { name: JourneyIconName }) {
  const paths: Record<JourneyIconName, ReactNode> = {
    airport: (
      <>
        <path d="M12 3l2 7 6 2-6 2-2 7-2-7-6-2 6-2z" />
        <path d="M7 19h10" />
      </>
    ),
    car: (
      <>
        <path d="M5 12l2-5h10l2 5" />
        <path d="M4 12h20v6H4z" />
        <path d="M8 18v2" />
        <path d="M20 18v2" />
        <path d="M7 15h.1" />
        <path d="M20 15h.1" />
      </>
    ),
    pause: (
      <>
        <path d="M8 5v14" />
        <path d="M16 5v14" />
      </>
    ),
    train: (
      <>
        <path d="M7 4h10a3 3 0 0 1 3 3v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7a3 3 0 0 1 3-3z" />
        <path d="M8 8h8" />
        <path d="M8 13h.1" />
        <path d="M16 13h.1" />
        <path d="M8 19l-2 2" />
        <path d="M16 19l2 2" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" className="journey-icon" fill="none" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}

function toRadians(value: number) {
  return value * (Math.PI / 180);
}

function distanceKm(from: Place, to: Place) {
  const earthRadius = 6371;
  const dLat = toRadians(to.lat - from.lat);
  const dLon = toRadians(to.lon - from.lon);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function bearingBetween(from: Place, to: Place) {
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);
  const dLon = toRadians(to.lon - from.lon);
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  return (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
}

function directionFromBearing(bearing: number) {
  return directionOrder[Math.round(bearing / 45) % directionOrder.length];
}

function estimatedMinutes(distance: number, from: Place, to: Place) {
  const isLongDistance = distance > 1200;
  const speed = isLongDistance ? 690 : 82;
  const connectionBuffer = isLongDistance ? 210 : 40;
  const terrainBuffer = (terrainFriction[from.terrain] + terrainFriction[to.terrain]) / 2;

  return distance / speed * 60 + connectionBuffer + terrainBuffer;
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

function formatKm(distance: number) {
  return `${Math.round(distance).toLocaleString("en-US")} km`;
}

function makeConnection(from: Place, to: Place): Connection {
  const distance = distanceKm(from, to);
  const bearing = bearingBetween(from, to);

  return {
    bearing,
    direction: directionFromBearing(bearing),
    distance,
    from,
    id: `${from.label}-${to.label}`,
    minutes: estimatedMinutes(distance, from, to),
    to,
  };
}

function shortestDirectionalConnections() {
  const routes = places.flatMap((from) =>
    places
      .filter((to) => to.label !== from.label)
      .map((to) => makeConnection(from, to)),
  ).sort((a, b) => a.distance - b.distance);
  const usedPairs = new Set<string>();
  const selected: Connection[] = [];

  for (const route of routes) {
    const pairKey = [route.from.label, route.to.label].sort().join("-");
    const hasDirection = selected.some((item) => item.direction === route.direction);

    if (hasDirection || usedPairs.has(pairKey)) continue;

    selected.push(route);
    usedPairs.add(pairKey);
    if (selected.length === directionOrder.length) break;
  }

  return selected.sort((a, b) => directionOrder.indexOf(a.direction) - directionOrder.indexOf(b.direction));
}

export default function CompassPage() {
  const compassRef = useRef<HTMLDivElement>(null);
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const connections = useMemo(shortestDirectionalConnections, []);
  const [activeConnectionId, setActiveConnectionId] = useState(connections[0]?.id ?? "");
  const activeConnection = connections.find((connection) => connection.id === activeConnectionId) ?? connections[0];
  const longestDistance = Math.max(...connections.map((connection) => connection.distance));

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const compass = compassRef.current;
    if (!compass) return;

    const rect = compass.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    spotlightX.set((x / rect.width) * 100);
    spotlightY.set((y / rect.height) * 100);
  };

  return (
    <section className="compass-page">
      <div className="compass-hero">
        <div className="compass-copy">
          <button className="back-link compass-back" onClick={() => navigateTo(pagePaths.portfolio)}>
            &larr; Back to portfolio
          </button>
          <p className="section-label">Portfolio / Connected Cities</p>
          <h1>Connected Cities <span>European Compass.</span></h1>
          <p>
            Move across the compass rays to see which two European cities are
            connected in each direction. Longer rays mean longer distances.
          </p>
        </div>

        <div className="compass-workbench">
          <motion.div
            className="compass-instrument"
            onPointerMove={handlePointerMove}
            ref={compassRef}
            style={{
              background: `radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(255, 224, 146, 0.28), transparent 24%), radial-gradient(circle at center, rgba(17, 30, 43, 0.72), rgba(4, 8, 19, 0.96) 70%)`,
            }}
          >
            <div className="compass-ring">
              <CompassMark bearing={0} label="N" />
              <CompassMark bearing={45} label="NE" />
              <CompassMark bearing={90} label="E" />
              <CompassMark bearing={135} label="SE" />
              <CompassMark bearing={180} label="S" />
              <CompassMark bearing={225} label="SW" />
              <CompassMark bearing={270} label="W" />
              <CompassMark bearing={315} label="NW" />
            </div>

            <div className="compass-rays" aria-label="Closest directional connections between European cities">
              {connections.map((connection) => {
                const isActive = connection.id === activeConnection.id;
                const rayLength = 28 + connection.distance / longestDistance * 20;

                return (
                  <button
                    aria-label={`${connection.from.label} to ${connection.to.label}: ${connection.direction}, ${formatKm(connection.distance)}`}
                    className={`compass-ray${isActive ? " active" : ""}`}
                    key={connection.id}
                    onFocus={() => setActiveConnectionId(connection.id)}
                    onMouseEnter={() => setActiveConnectionId(connection.id)}
                    style={{
                      "--ray-bearing": `${connection.bearing}deg`,
                      "--ray-counter-bearing": `${-connection.bearing}deg`,
                      "--ray-length": `${rayLength}%`,
                    } as CompassStyle}
                    title={`${connection.from.label} - ${connection.to.label}`}
                    type="button"
                  >
                    <span>{connection.from.label} - {connection.to.label}</span>
                    <small>{connection.direction}</small>
                  </button>
                );
              })}
            </div>

            <div className="compass-center">
              <strong>{Math.round(activeConnection.bearing).toString().padStart(3, "0")}°</strong>
              <span>{activeConnection.direction}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="compass-panel" aria-live="polite">
        <p className="section-label">Directional Connection</p>
        <h2>{activeConnection.from.label} to {activeConnection.to.label}</h2>
        <div className="journey-strip" aria-label={`Journey icons from ${activeConnection.from.label} to ${activeConnection.to.label}`}>
          {[
            { icon: "train" as const, label: "train" },
            { icon: "pause" as const, label: "pause" },
            { icon: "car" as const, label: "car" },
            { icon: "airport" as const, label: "airport" },
          ].map((step) => (
            <div aria-label={step.label} className="journey-step" key={step.label} title={step.label}>
              <JourneyIcon name={step.icon} />
            </div>
          ))}
        </div>
        <dl className="compass-meta">
          <div>
            <dt>Estimated Time</dt>
            <dd>{formatDuration(activeConnection.minutes)}</dd>
          </div>
          <div>
            <dt>Distance</dt>
            <dd>{formatKm(activeConnection.distance)}</dd>
          </div>
          <div>
            <dt>Direction</dt>
            <dd>{activeConnection.direction}</dd>
          </div>
          <div>
            <dt>Bearing</dt>
            <dd>{Math.round(activeConnection.bearing)}° true north</dd>
          </div>
        </dl>

        <div className="source-list" aria-label="Sources">
          <strong>Sources</strong>
          <a href="https://www.geonames.org/" target="_blank" rel="noreferrer">GeoNames place coordinate database</a>
          <a href="https://www.movable-type.co.uk/scripts/latlong.html" target="_blank" rel="noreferrer">Movable Type distance and bearing formulas</a>
        </div>
      </div>
    </section>
  );
}

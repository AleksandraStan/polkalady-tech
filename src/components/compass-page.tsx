import { motion, useMotionValue } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { navigateTo, pagePaths } from "../lib/navigation";
import "./compass.css";

type Place = {
  coordinates: string;
  country: string;
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

type CompassStyle = CSSProperties & Partial<Record<"--ray-bearing" | "--ray-color" | "--ray-counter-bearing" | "--ray-glow" | "--ray-length", string>>;
type JourneyIconName = "airport" | "car" | "pause" | "train";

const places: Place[] = [
  { coordinates: "48.8566 N, 2.3522 E", country: "France", description: "Dense capital access with strong rail links, metro coverage, airport transfers, and high crowd pressure.", label: "Paris", lat: 48.8566, lon: 2.3522, terrain: "capital" },
  { coordinates: "52.5200 N, 13.4050 E", country: "Germany", description: "Major rail and urban mobility hub with broad public transport coverage and moderate transfer complexity.", label: "Berlin", lat: 52.52, lon: 13.405, terrain: "rail-hub" },
  { coordinates: "41.9028 N, 12.4964 E", country: "Italy", description: "Historic city access with airports, rail, dense walking routes, heritage surfaces, and crowd friction.", label: "Rome", lat: 41.9028, lon: 12.4964, terrain: "capital" },
  { coordinates: "41.3851 N, 2.1734 E", country: "Spain", description: "Coastal city access shaped by airport transfers, metro connections, port geography, and tourist density.", label: "Barcelona", lat: 41.3851, lon: 2.1734, terrain: "coastal" },
  { coordinates: "48.2082 N, 16.3738 E", country: "Austria", description: "Central European access with strong rail continuity, compact urban transit, and low navigation friction.", label: "Vienna", lat: 48.2082, lon: 16.3738, terrain: "rail-hub" },
  { coordinates: "59.3293 N, 18.0686 E", country: "Sweden", description: "Northern city access with bridges, islands, rail links, ferries, and seasonal weather effects.", label: "Stockholm", lat: 59.3293, lon: 18.0686, terrain: "island" },
  { coordinates: "47.3769 N, 8.5417 E", country: "Switzerland", description: "Alpine-adjacent access with precise rail systems, lake geography, airport links, and topographic constraint.", label: "Zurich", lat: 47.3769, lon: 8.5417, terrain: "mountain" },
  { coordinates: "51.5072 N, 0.1276 W", country: "United Kingdom", description: "A western European rail and air hub with dense local transport.", label: "London", lat: 51.5072, lon: -0.1276, terrain: "capital" },
  { coordinates: "52.3676 N, 4.9041 E", country: "Netherlands", description: "Compact cycling, rail, canal, and airport connections.", label: "Amsterdam", lat: 52.3676, lon: 4.9041, terrain: "rail-hub" },
  { coordinates: "50.8503 N, 4.3517 E", country: "Belgium", description: "A highly connected European rail crossroads.", label: "Brussels", lat: 50.8503, lon: 4.3517, terrain: "rail-hub" },
  { coordinates: "55.6761 N, 12.5683 E", country: "Denmark", description: "A northern coastal hub linked by rail, bridges, and ferries.", label: "Copenhagen", lat: 55.6761, lon: 12.5683, terrain: "coastal" },
  { coordinates: "59.9139 N, 10.7522 E", country: "Norway", description: "A fjord-side capital with strong regional transport links.", label: "Oslo", lat: 59.9139, lon: 10.7522, terrain: "coastal" },
  { coordinates: "60.1699 N, 24.9384 E", country: "Finland", description: "A Baltic transport hub shaped by ferries and northern distances.", label: "Helsinki", lat: 60.1699, lon: 24.9384, terrain: "coastal" },
  { coordinates: "53.3498 N, 6.2603 W", country: "Ireland", description: "An island capital connected through ports and air routes.", label: "Dublin", lat: 53.3498, lon: -6.2603, terrain: "island" },
  { coordinates: "38.7223 N, 9.1393 W", country: "Portugal", description: "An Atlantic capital connected by rail, road, port, and air.", label: "Lisbon", lat: 38.7223, lon: -9.1393, terrain: "coastal" },
  { coordinates: "50.0755 N, 14.4378 E", country: "Czechia", description: "A compact central European rail and road hub.", label: "Prague", lat: 50.0755, lon: 14.4378, terrain: "rail-hub" },
  { coordinates: "52.2297 N, 21.0122 E", country: "Poland", description: "An eastern-central European capital with broad rail connections.", label: "Warsaw", lat: 52.2297, lon: 21.0122, terrain: "rail-hub" },
  { coordinates: "47.4979 N, 19.0402 E", country: "Hungary", description: "A Danube capital with strong regional rail continuity.", label: "Budapest", lat: 47.4979, lon: 19.0402, terrain: "rail-hub" },
  { coordinates: "44.4268 N, 26.1025 E", country: "Romania", description: "A southeastern capital connecting the Balkans and eastern Europe.", label: "Bucharest", lat: 44.4268, lon: 26.1025, terrain: "capital" },
  { coordinates: "37.9838 N, 23.7275 E", country: "Greece", description: "A southern capital shaped by ports, islands, roads, and air routes.", label: "Athens", lat: 37.9838, lon: 23.7275, terrain: "coastal" },
  { coordinates: "45.8150 N, 15.9819 E", country: "Croatia", description: "A regional hub between central Europe and the Adriatic.", label: "Zagreb", lat: 45.815, lon: 15.9819, terrain: "rail-hub" },
  { coordinates: "46.0569 N, 14.5058 E", country: "Slovenia", description: "A compact Alpine-adjacent regional connection point.", label: "Ljubljana", lat: 46.0569, lon: 14.5058, terrain: "mountain" },
  { coordinates: "59.4370 N, 24.7536 E", country: "Estonia", description: "A Baltic coastal capital linked by ferries and regional routes.", label: "Tallinn", lat: 59.437, lon: 24.7536, terrain: "coastal" },
  { coordinates: "42.6977 N, 23.3219 E", country: "Bulgaria", description: "A Balkan capital connected by road, rail, and air.", label: "Sofia", lat: 42.6977, lon: 23.3219, terrain: "mountain" },
];

const directionOrder = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];

const timezoneHubs: Record<string, string> = {
  "Europe/Amsterdam": "Amsterdam", "Europe/Athens": "Athens", "Europe/Berlin": "Berlin",
  "Europe/Brussels": "Brussels", "Europe/Bucharest": "Bucharest", "Europe/Budapest": "Budapest",
  "Europe/Copenhagen": "Copenhagen", "Europe/Dublin": "Dublin", "Europe/Helsinki": "Helsinki",
  "Europe/Lisbon": "Lisbon", "Europe/Ljubljana": "Ljubljana", "Europe/London": "London",
  "Europe/Madrid": "Barcelona", "Europe/Oslo": "Oslo", "Europe/Paris": "Paris",
  "Europe/Prague": "Prague", "Europe/Rome": "Rome", "Europe/Sofia": "Sofia",
  "Europe/Stockholm": "Stockholm", "Europe/Tallinn": "Tallinn", "Europe/Vienna": "Vienna",
  "Europe/Warsaw": "Warsaw", "Europe/Zagreb": "Zagreb", "Europe/Zurich": "Zurich",
};

const regionHubs: Record<string, string> = {
  AT: "Vienna", BE: "Brussels", BG: "Sofia", CH: "Zurich", CZ: "Prague", DE: "Berlin",
  DK: "Copenhagen", EE: "Tallinn", ES: "Barcelona", FI: "Helsinki", FR: "Paris", GB: "London",
  GR: "Athens", HR: "Zagreb", HU: "Budapest", IE: "Dublin", IT: "Rome", NL: "Amsterdam",
  NO: "Oslo", PL: "Warsaw", PT: "Lisbon", RO: "Bucharest", SE: "Stockholm", SI: "Ljubljana",
};

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

function visitorHub() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneHub = timezoneHubs[timezone];
  if (timezoneHub) return { city: timezoneHub, reason: `your browser time zone (${timezone})` };

  const region = navigator.languages
    .map((language) => language.match(/[-_]([A-Z]{2})$/i)?.[1]?.toUpperCase())
    .find((code) => code && regionHubs[code]);
  const regionHub = region ? regionHubs[region] : undefined;
  if (regionHub) return { city: regionHub, reason: `your browser region (${region})` };

  return { city: "Vienna", reason: "a neutral central-European fallback" };
}

function connectionsFromHub(hubLabel: string) {
  const hub = places.find((place) => place.label === hubLabel) ?? places.find((place) => place.label === "Vienna")!;

  return places
    .filter((place) => place.label !== hub.label)
    .map((place) => makeConnection(hub, place))
    .sort((a, b) => a.bearing - b.bearing);
}

export default function CompassPage() {
  const compassRef = useRef<HTMLDivElement>(null);
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const [hub, setHub] = useState({ city: "Vienna", reason: "a neutral central-European fallback" });
  const connections = useMemo(() => connectionsFromHub(hub.city), [hub.city]);
  const [activeConnectionId, setActiveConnectionId] = useState("");
  const activeConnection = connections.find((connection) => connection.id === activeConnectionId) ?? connections[0];
  const longestDistance = Math.max(...connections.map((connection) => connection.distance));

  useEffect(() => {
    setHub(visitorHub());
  }, []);

  useEffect(() => {
    setActiveConnectionId(connections[0]?.id ?? "");
  }, [connections]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const compass = compassRef.current;
    if (!compass) return;

    const rect = compass.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dx = x - rect.width / 2;
    const dy = y - rect.height / 2;
    const radius = Math.sqrt(dx ** 2 + dy ** 2);
    const cursorBearing = (Math.atan2(dx, -dy) * (180 / Math.PI) + 360) % 360;

    spotlightX.set((x / rect.width) * 100);
    spotlightY.set((y / rect.height) * 100);

    if (radius < rect.width * 0.12 || radius > rect.width * 0.46) return;

    const nearestConnection = connections.reduce((nearest, connection) => {
      const difference = Math.abs(connection.bearing - cursorBearing);
      const angularDistance = Math.min(difference, 360 - difference);
      const nearestDifference = Math.abs(nearest.bearing - cursorBearing);
      const nearestAngularDistance = Math.min(nearestDifference, 360 - nearestDifference);

      return angularDistance < nearestAngularDistance ? connection : nearest;
    }, connections[0]);

    if (nearestConnection && nearestConnection.id !== activeConnectionId) {
      setActiveConnectionId(nearestConnection.id);
    }
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
          <div className="compass-central-note">
            <strong>{activeConnection.from.label} is central for you now</strong>
            <span>
              The compass inferred {activeConnection.from.label}, {activeConnection.from.country},
              from {hub.reason}. Every ray starts there, so the network changes
              when opened from another supported European region.
            </span>
          </div>
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
              <CompassMark bearing={180} label="S" />
              <CompassMark bearing={270} label="W" />
              <CompassMark bearing={315} label="NW" />
            </div>

            <div className="compass-rays" aria-label={`Connections from ${activeConnection.from.label} to European cities`}>
              {connections.map((connection, index) => {
                const isActive = connection.id === activeConnection.id;
                const rayLength = 22 + connection.distance / longestDistance * 16;
                const hue = Math.round(index / connections.length * 300 + 25);
                const rayColor = `hsl(${hue} 76% 66%)`;
                const rayGlow = `hsl(${hue} 82% 58% / 0.44)`;

                return (
                  <button
                    aria-label={`${connection.from.label} to ${connection.to.label}: ${connection.direction}, ${formatKm(connection.distance)}`}
                    className={`compass-ray${isActive ? " active" : ""}`}
                    key={connection.id}
                    onFocus={() => setActiveConnectionId(connection.id)}
                    onMouseEnter={() => setActiveConnectionId(connection.id)}
                    onPointerEnter={() => setActiveConnectionId(connection.id)}
                    style={{
                      "--ray-bearing": `${connection.bearing}deg`,
                      "--ray-color": rayColor,
                      "--ray-counter-bearing": `${-connection.bearing}deg`,
                      "--ray-glow": rayGlow,
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

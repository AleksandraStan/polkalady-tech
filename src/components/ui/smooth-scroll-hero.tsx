"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

interface SmoothScrollHeroProps {
  scrollHeight?: number;
  desktopImage?: string;
  mobileImage?: string;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
}

const SmoothScrollHeroBackground = ({
  scrollHeight,
  desktopImage,
  mobileImage,
  initialClipPercentage,
  finalClipPercentage,
}: Required<SmoothScrollHeroProps>) => {
  const { scrollY } = useScroll();

  const clipStart = useTransform(
    scrollY,
    [0, scrollHeight],
    [initialClipPercentage, 0],
  );
  const clipEnd = useTransform(
    scrollY,
    [0, scrollHeight],
    [finalClipPercentage, 100],
  );
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const backgroundSize = useTransform(
    scrollY,
    [0, scrollHeight + 500],
    ["170%", "100%"],
  );

  return (
    <motion.div className="hero-sticky" style={{ clipPath }}>
      <motion.div
        className="hero-image hero-image-mobile"
        style={{
          backgroundImage: `url(${mobileImage})`,
          backgroundSize,
        }}
      />
      <motion.div
        className="hero-image hero-image-desktop"
        style={{
          backgroundImage: `url(${desktopImage})`,
          backgroundSize,
        }}
      />
    </motion.div>
  );
};

const SmoothScrollHero = ({
  scrollHeight = 1500,
  desktopImage = "/website.png",
  mobileImage = "/website.png",
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}: SmoothScrollHeroProps) => (
  <div
    className="scroll-hero"
    style={{ height: `calc(${scrollHeight}px + 100vh)` }}
  >
    <SmoothScrollHeroBackground
      scrollHeight={scrollHeight}
      desktopImage={desktopImage}
      mobileImage={mobileImage}
      initialClipPercentage={initialClipPercentage}
      finalClipPercentage={finalClipPercentage}
    />
  </div>
);

export default SmoothScrollHero;

"use client";

import type { ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

interface SmoothScrollHeroProps {
  children?: ReactNode;
  scrollHeight?: number;
  desktopImage?: string;
  holdScrollHeight?: number;
  mobileImage?: string;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
}

type SmoothScrollHeroBackgroundProps = Required<Omit<SmoothScrollHeroProps, "children" | "holdScrollHeight">> & {
  children?: ReactNode;
};

const SmoothScrollHeroBackground = ({
  children,
  scrollHeight,
  desktopImage,
  mobileImage,
  initialClipPercentage,
  finalClipPercentage,
}: SmoothScrollHeroBackgroundProps) => {
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
    <div className="hero-sticky">
      <motion.div className="hero-reveal" style={{ clipPath }}>
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
      {children}
    </div>
  );
};

const SmoothScrollHero = ({
  children,
  scrollHeight = 1500,
  desktopImage = "/website.png",
  holdScrollHeight = 650,
  mobileImage = "/website.png",
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}: SmoothScrollHeroProps) => (
  <div
    className="scroll-hero"
    style={{ height: `calc(${scrollHeight + holdScrollHeight}px + 100vh)` }}
  >
    <SmoothScrollHeroBackground
      children={children}
      scrollHeight={scrollHeight}
      desktopImage={desktopImage}
      mobileImage={mobileImage}
      initialClipPercentage={initialClipPercentage}
      finalClipPercentage={finalClipPercentage}
    />
  </div>
);

export default SmoothScrollHero;

"use client";

import { AnimatedText } from "./AnimatedText";

export function AnimatedTextLogo() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-20">
      <AnimatedText
        svgSrc="/kh-text-logo.svg"
        title=""
        imageWidth={900}
        imageHeight={200}
        className="max-w-[1600px] mx-auto"
        presets={["fade-on-scroll", "scale-on-scroll", "follow-pointer"]}
        animationOptions={{
          scrollThreshold: [0.3, 0.4], // Fade out between 30-40% scroll
          movementFactor: 0.03,
          deadZone: 50,
          initialY: -300,
          duration: 1,
        }}
        priority
        aria-label="Kunsthalle Ost"
      />
    </div>
  );
}

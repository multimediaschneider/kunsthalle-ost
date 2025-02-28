"use client";

import React, { forwardRef } from "react";
import { AnimatedText } from "./ui/AnimatedText";

interface ExhibitionHeaderProps {
  title: string;
  className?: string;
  targetRef?: React.RefObject<HTMLElement | null>;
}

const ExhibitionHeader = forwardRef<HTMLDivElement, ExhibitionHeaderProps>(
  ({ title, className, targetRef }, ref) => {
    return (
      <AnimatedText
        ref={ref}
        as="h1"
        presets={["fade-on-scroll", "scale-on-scroll", "header-reveal"]}
        animationOptions={{
          scrollThreshold: [0.3, 0.4], // Similar to the original animation
        }}
        textClassName="text-white text-9xl font-bold text-center w-full"
        className={className}
        targetRef={targetRef}
      >
        {title}
      </AnimatedText>
    );
  }
);

ExhibitionHeader.displayName = "ExhibitionHeader";

export { ExhibitionHeader };

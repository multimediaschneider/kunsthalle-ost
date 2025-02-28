"use client";

import { AnimatedKHLogo } from "../ui/AnimatedKHLogo";
import { AnimatedTextLogo } from "../ui/AnimatedTextLogo";

export function SVGContainer() {
  return (
    <div className="h-[500vh] relative">
      <AnimatedTextLogo />
      <AnimatedKHLogo />
    </div>
  );
}

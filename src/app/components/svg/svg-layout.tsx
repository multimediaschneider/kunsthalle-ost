"use client";

import { AnimatedTextLogo } from "../ui/AnimatedTextLogo";
import { AnimatedKHLogo } from "../ui/AnimatedKHLogo";

export function SVGContainer() {
  return (
    <div className="h-[500vh] relative">
      <AnimatedTextLogo />
      <AnimatedKHLogo />
    </div>
  );
}

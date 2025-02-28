"use client";

import React, { forwardRef, ReactNode, RefObject, CSSProperties } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  TextAnimationPreset,
  TextAnimationOptions,
  useTextAnimation,
} from "../../hooks/useTextAnimation";

// Props for the AnimatedText component
interface AnimatedTextProps extends HTMLMotionProps<"div"> {
  children?: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  presets?: TextAnimationPreset[];
  animationOptions?: TextAnimationOptions;
  svgSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  textClassName?: string;
  targetRef?: RefObject<HTMLElement | null>;
  priority?: boolean;
}

/**
 * Animated Text Component
 *
 * A flexible component for animating text or SVG text logos with various animation presets.
 */
const AnimatedText = forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      children,
      as = "div",
      presets = ["fade-on-scroll"],
      animationOptions = {},
      svgSrc,
      imageWidth = 900,
      imageHeight = 200,
      className,
      textClassName,
      targetRef,
      priority = false,
      ...props
    },
    ref
  ) => {
    // Get animation values based on selected presets
    const animValues = useTextAnimation(presets, animationOptions, targetRef);

    // Create the text element based on the 'as' prop
    const TextComponent = motion[as];

    return (
      <motion.div
        ref={ref}
        className={cn("relative", className)}
        initial={animValues.initial}
        animate={animValues.animate}
        {...props}
      >
        <motion.div
          style={{
            x: animValues.x,
            y: animValues.y,
            scale: animValues.scale,
            opacity: animValues.opacity,
            position: animValues.headerPosition as CSSProperties["position"],
          }}
        >
          {svgSrc ? (
            // Render as SVG image
            <Image
              src={svgSrc}
              alt={
                typeof props["aria-label"] === "string"
                  ? props["aria-label"]
                  : "Animated text"
              }
              width={imageWidth}
              height={imageHeight}
              className={cn("w-full", textClassName)}
              priority={priority}
            />
          ) : (
            // Render as text component
            <TextComponent className={textClassName}>{children}</TextComponent>
          )}
        </motion.div>

        {/* If using header-reveal, we need to render the clip path element separately */}
        {animValues.clipPath && (
          <motion.div
            className="absolute inset-0 bg-gray-500"
            style={{
              clipPath: animValues.clipPath,
            }}
          />
        )}
      </motion.div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };

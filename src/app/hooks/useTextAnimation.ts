import {
  MotionValue,
  useTransform,
  useScroll,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useEffect, RefObject, useState } from "react";

// Types for animation presets
export type TextAnimationPreset =
  | "fade-on-scroll"
  | "scale-on-scroll"
  | "follow-pointer"
  | "header-reveal";

// Options for text animations
export interface TextAnimationOptions {
  scrollThreshold?: [number, number]; // when to start/end scroll animations
  movementFactor?: number; // for follow-pointer, how much movement
  deadZone?: number; // for follow-pointer, dead zone radius
  initialY?: number; // for initial animation position
  initialOpacity?: number; // for initial animation opacity
  duration?: number; // animation duration
  delay?: number; // animation delay
}

// Return type of the animation hook
export interface TextAnimationValues {
  // Initial animation props
  initial: {
    y: number;
    opacity: number;
  };

  // Animation target props
  animate: {
    y: number;
    opacity: number;
    transition: {
      duration: number;
      delay: number;
    };
  };

  // Dynamic motion values
  x?: MotionValue<number>;
  y?: MotionValue<number>;
  scale?: MotionValue<number>;
  opacity?: MotionValue<number>;

  // Position properties (not motion values)
  headerPosition?: "absolute" | "fixed";

  // Other properties
  clipPath?: MotionValue<string>;
  headerY?: MotionValue<string>;
}

// Default options
const defaultOptions: TextAnimationOptions = {
  scrollThreshold: [0, 1],
  movementFactor: 0.03,
  deadZone: 50,
  initialY: -100,
  initialOpacity: 0,
  duration: 1,
  delay: 0,
};

/**
 * Hook to create text animation values based on selected presets
 */
export function useTextAnimation(
  presets: TextAnimationPreset[],
  options: TextAnimationOptions = {},
  targetRef?: RefObject<HTMLElement | null>
): TextAnimationValues {
  // Merge default options with provided options
  const mergedOptions = { ...defaultOptions, ...options };
  const threshold = mergedOptions.scrollThreshold ?? [0, 1];

  // State for header position (since we can't use a motion value for it)
  const [headerPosition, setHeaderPosition] = useState<"absolute" | "fixed">(
    "absolute"
  );

  // Set up scroll values - this needs to be called unconditionally
  const { scrollYProgress } = useScroll(
    targetRef
      ? {
          target: targetRef,
          offset: ["start start", "end end"],
        }
      : undefined
  );

  // Always create all motion values unconditionally
  // For opacity animation on scroll
  const opacityMotion = useTransform(scrollYProgress, threshold, [1, 0]);

  // For scale animation on scroll
  const scaleMotion = useTransform(scrollYProgress, threshold, [1, 0.95]);

  // For header reveal Y position
  const headerYMotion = useTransform(
    scrollYProgress,
    [0, 0.15, 0.16],
    ["50vh", "50vh", "50vh"]
  );

  // For clip path animation
  const clipPathMotion = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [
      "polygon(0 0, 100% 0, 100% 0, 0 0)",
      "polygon(0 0, 100% 5%, 100% 100%, 0 100%)",
      "polygon(0 0, 100% 5%, 100% 100%, 0 100%)",
      "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
    ]
  );

  // For pointer-following motion
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { damping: 10, stiffness: 100, restDelta: 0.001 };
  const springX = useSpring(pointerX, springConfig);
  const springY = useSpring(pointerY, springConfig);

  // useEffect for header reveal position - called unconditionally
  useEffect(() => {
    // Only add the scroll listener if the header-reveal preset is enabled
    if (presets.includes("header-reveal")) {
      const scrollListener = () => {
        const current = scrollYProgress.get();
        if (current < 0.15) {
          setHeaderPosition("absolute");
        } else {
          setHeaderPosition("fixed");
        }
      };

      scrollYProgress.onChange(scrollListener);
      return () => {
        scrollYProgress.clearListeners();
      };
    }
    // Empty cleanup function for when the preset is not enabled
    return () => {};
  }, [scrollYProgress, presets]);

  // useEffect for pointer movement - called unconditionally
  useEffect(() => {
    // Only add the mouse listener if the follow-pointer preset is enabled
    if (presets.includes("follow-pointer")) {
      const handleMouseMove = (event: MouseEvent) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const diffX = event.clientX - centerX;
        const diffY = event.clientY - centerY;

        const movementFactor = mergedOptions.movementFactor ?? 0.03;
        const deadZone = mergedOptions.deadZone ?? 50;

        const effectiveDiffX =
          Math.abs(diffX) > deadZone ? diffX - Math.sign(diffX) * deadZone : 0;
        const effectiveDiffY =
          Math.abs(diffY) > deadZone ? diffY - Math.sign(diffY) * deadZone : 0;

        pointerX.set(-effectiveDiffX * movementFactor);
        pointerY.set(-effectiveDiffY * movementFactor);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
    // Empty cleanup function for when the preset is not enabled
    return () => {};
  }, [
    mergedOptions.movementFactor,
    mergedOptions.deadZone,
    presets,
    pointerX,
    pointerY,
  ]);

  // Initialize result with basic animation values
  const result: TextAnimationValues = {
    initial: {
      y: mergedOptions.initialY ?? -100,
      opacity: mergedOptions.initialOpacity ?? 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: mergedOptions.duration ?? 1,
        delay: mergedOptions.delay ?? 0,
      },
    },
  };

  // Only assign the motion values to the result if the corresponding preset is enabled
  if (presets.includes("fade-on-scroll")) {
    result.opacity = opacityMotion;
  }

  if (presets.includes("scale-on-scroll")) {
    result.scale = scaleMotion;
  }

  if (presets.includes("header-reveal")) {
    result.headerY = headerYMotion;
    result.clipPath = clipPathMotion;
    result.headerPosition = headerPosition;
  }

  if (presets.includes("follow-pointer")) {
    result.x = springX;
    result.y = springY;
  }

  return result;
}

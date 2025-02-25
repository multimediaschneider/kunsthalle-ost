import { MotionValue, useTransform } from "framer-motion";

/**
 * Defines scroll-based animations using Framer Motion's useTransform.
 * @param scrollYProgress MotionValue<number> - The progress of the page scroll (0 = start, 1 = end).
 */
export function useScrollEffects(scrollYProgress: MotionValue<number>) {
  return {
    textLogoScale: useTransform(scrollYProgress, [0.4, 0.6], [1, 0.95]),
    textLogoOpacity: useTransform(scrollYProgress, [0.3, 0.4], [1, 0]),
    translateX: useTransform(scrollYProgress, [0, 0.3, 1], [100, "80%", "80%"]),
    rotate: useTransform(scrollYProgress, [0, 0.3, 0.4, 1], [0, 0, 90, 90]),
    // Hier der lineare Übergang von 0 zu -100vh:
    scrollTranslateY: useTransform(scrollYProgress, [0, 1], [0, "-100vh"]),
    scale: useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.18, 0.18]),
    logoOpacity: useTransform(scrollYProgress, [0.4, 1], [1, 0.7]),
  };
}

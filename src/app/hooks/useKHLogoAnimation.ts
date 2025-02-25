import { useEffect, useState } from "react";
import { MotionValue, useScroll, useTransform } from "framer-motion";

/**
 * Hook für die spezifische Scroll-Animation des KH-Logos
 *
 * @returns Diverse Motion Values für die Animation sowie Click Handler
 */
export function useKHLogoAnimation(): {
  translateX: MotionValue<number>;
  rotate: MotionValue<number>;
  scrollTranslateY: MotionValue<number>;
  scale: MotionValue<number>;
  logoOpacity: MotionValue<number>;
  handleLogoClick: () => void;
} {
  // Holt den aktuellen Scroll-Fortschritt
  const { scrollYProgress } = useScroll();

  // State für Viewport-Dimensionen
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  // Effect zum Updaten der Viewport-Größe
  useEffect(() => {
    const updateDimensions = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Konstanten für die Logo-Animation
  const logoWidth = 600; // Breite des Logos
  const finalScale = 0.25; // Finale Skalierung
  const margin = 0; // Abstand zum Rand

  // Berechnung der finalen X-Position
  // Problem könnte hier liegen - eventuell muss der Offset angepasst werden
  // Aktuell: viewportWidth - margin - logoWidth/2 - (logoWidth * finalScale)/40
  // Versuche den Divisor (40) anzupassen oder die Formel umzustrukturieren
  const finalX =
    viewportWidth > 0
      ? viewportWidth - margin - logoWidth / 2.9 - (logoWidth * finalScale) / 40
      : 0;
  const initialX = 750; // Startposition

  return {
    // X-Translation: Von initialX zu finalX zwischen 0-30% Scroll
    translateX: useTransform(
      scrollYProgress,
      [0, 0.3, 1],
      [initialX, finalX, finalX]
    ),

    // Rotation: 90 Grad zwischen 30-40% Scroll
    rotate: useTransform(scrollYProgress, [0, 0.3, 0.4, 1], [0, 0, 90, 90]),

    // Y-Translation: Beginnt nach 40% Scroll
    scrollTranslateY: useTransform(
      scrollYProgress,
      [0, 0.4, 1],
      [0, 0, -(viewportHeight - 350)]
    ),

    // Skalierung: Verkleinert sich zwischen 0-40% Scroll
    scale: useTransform(
      scrollYProgress,
      [0, 0.4, 1],
      [1, finalScale, finalScale]
    ),

    // Opacity: Verringert sich nach 40% Scroll
    logoOpacity: useTransform(scrollYProgress, [0.4, 1], [1, 0.7]),

    // Click Handler für Scroll-to-Top
    handleLogoClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  };
}

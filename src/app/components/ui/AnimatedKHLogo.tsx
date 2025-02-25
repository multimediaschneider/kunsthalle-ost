import { motion } from "framer-motion";
import Image from "next/image";
import { useKHLogoAnimation } from "../../hooks/useKHLogoAnimation";

// Erstelle eine motion-komponente aus Next.js' Image
const MotionImage = motion(Image);

export function AnimatedKHLogo() {
  const {
    translateX,
    rotate,
    scrollTranslateY,
    scale,
    logoOpacity,
    handleLogoClick,
  } = useKHLogoAnimation();

  return (
    // Äußere Container: feste Positionierung, Fade‑in und Scroll‑Effekte
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-2/3 left-8 z-10 w-fit h-fit"
      style={{ translateX, y: scrollTranslateY }}
    >
      {/*
        Innerer Container: Anwenden der Hook-Animationen (Rotation, Skalierung, Opazität)
        pointerEvents auf "none" setzen, damit Mausereignisse (Hover, Click) direkt das Bild erreichen.
      */}
      <motion.div
        style={{
          rotate,
          scale,
          opacity: logoOpacity,
          transformOrigin: "50% 50%",
          pointerEvents: "none",
        }}
        className="w-fit h-fit"
      >
        {/*
          Das interaktive Bild:
          - pointerEvents sind hier wieder "auto" gesetzt, sodass die Hover- und Click-Effekte
            direkt auf dem Bild (MotionImage) greifen.
          - whileHover und whileTap bewirken den gewünschten Skalierungseffekt,
            der mit der im übergeordneten Container gesetzten Skalierung multipliziert wird.
        */}
        <MotionImage
          src="/kh-logo.svg"
          alt="Kunsthalle Ost Logo"
          width={384}
          height={384}
          priority
          className="object-contain w-full h-full z-30"
          style={{ cursor: "pointer", pointerEvents: "auto" }}
          onClick={handleLogoClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
}

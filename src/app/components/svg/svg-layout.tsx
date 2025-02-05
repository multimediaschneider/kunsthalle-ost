"use client"; // Diese Zeile zeigt an, dass diese Komponente auf der Client-Seite ausgeführt wird.

import { motion, useScroll, useTransform } from "framer-motion"; // Importiert die notwendigen Funktionen aus der Framer Motion Bibliothek.
import { useEffect, useState } from "react"; // Importiert React Hooks.
import Image from "next/image"; // Importiert die Image-Komponente von Next.js.

export function SVGContainer() {
  const { scrollY } = useScroll(); // Verfolgt die Scroll-Position.
  const [viewportWidth, setViewportWidth] = useState(0); // Zustand für die Viewport-Breite.
  const [viewportHeight, setViewportHeight] = useState(0); // Zustand für die Viewport-Höhe.

  useEffect(() => {
    const updateViewportDimensions = () => {
      setViewportWidth(window.innerWidth); // Aktualisiert die Breite des Viewports.
      setViewportHeight(window.innerHeight); // Aktualisiert die Höhe des Viewports.
    };

    updateViewportDimensions(); // Setzt die initialen Dimensionen.
    window.addEventListener("resize", updateViewportDimensions); // Fügt einen Event-Listener für Fensteränderungen hinzu.
    return () => window.removeEventListener("resize", updateViewportDimensions); // Entfernt den Event-Listener beim Unmount.
  }, []); // Effekt wird nur einmal beim Mounten ausgeführt.

  const logoWidth = 1600; // Die Breite des Logos.

  // `translateX` steuert die horizontale Verschiebung des Logos.
  const translateX = useTransform(
    scrollY,
    [0, 1000], // Scroll-Bereich für die horizontale Verschiebung.
    [-450, viewportWidth - 950] // Werte für `translateX`.
  );

  // `rotate` steuert die Rotation des Logos.
  const rotate = useTransform(
    scrollY,
    [1000, 1200], // Scroll-Bereich für die Rotation.
    [0, 90] // Werte für `rotate` (von 0° bis 90°).
  );

  // `scale` steuert die Skalierung des Logos.
  const scale = useTransform(
    scrollY,
    [1000, 1200], // Scroll-Bereich für die Skalierung.
    [1, 0.4] // Werte für `scale` (von 100 % auf 20 %).
  );

  // `translateY` steuert die vertikale Verschiebung des Logos.
  const translateY = useTransform(
    scrollY,
    [1200, 1400], // Scroll-Bereich für die vertikale Verschiebung.
    [0, viewportHeight - logoWidth + 350] // Werte für `translateY`.
  );

  // `textLogoOpacity` steuert die Deckkraft des Text-Logos.
  const textLogoOpacity = useTransform(
    scrollY,
    [1200, 2300], // Scroll-Bereich für die Deckkraft.
    [1, 0] // Werte für `textLogoOpacity` (von sichtbar bis unsichtbar).
  );
  const logoOpacity = useTransform(
    scrollY,
    [1200, 2300], // Scroll-Bereich für die Deckkraft.
    [1, 0.7] // Werte für `textLogoOpacity` (von sichtbar bis unsichtbar).
  );

  return (
    <div className="h-[300vh] relative">
      {/* Das Text-Logo, das mit der Scroll-Position verschwindet. */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-10"
        style={{ opacity: textLogoOpacity }} // Deckkraft wird durch `textLogoOpacity` gesteuert.
      >
        <div className="max-w-[1600px] mx-auto">
          <Image
            src="/kh-text-logo.svg" // Pfad zum Text-Logo.
            alt="Kunsthalle Ost" // Alternativer Text für das Bild.
            width={900} // Breite des Bildes.
            height={200} // Höhe des Bildes.
            className="w-full mx-auto" // CSS-Klassen für das Bild.
            priority // Priorisiert das Laden des Bildes.
          />
        </div>
      </motion.div>

      {/* Das animierte Logo, das sich beim Scrollen bewegt, rotiert und skaliert. */}
      <motion.div
        className="fixed top-28 z-10"
        style={{
          translateX, // Horizontale Verschiebung.
          rotate, // Rotation.
          translateY, // Vertikale Verschiebung.
          scale, // Skalierung.
          opacity: logoOpacity,
          width: logoWidth, // Breite des Containers.
          height: logoWidth, // Höhe des Containers.
        }}
      >
        <Image
          src="/kh-logo.svg" // Pfad zum animierten Logo.
          alt="Kunsthalle Ost Logo" // Alternativer Text für das Bild.
          width={logoWidth} // Breite des Bildes.
          height={logoWidth} // Höhe des Bildes.
          className="object-contain" // CSS-Klasse für das Bild.
          priority // Priorisiert das Laden des Bildes.
        />
      </motion.div>
    </div>
  );
}

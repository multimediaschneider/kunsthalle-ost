"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface FlyingImageProps {
  src: string;
  alt: string;
}

// Definiere den CSS motion path für die Animation.
// In diesem Beispiel verläuft der Pfad vertikal: von oben (0vh) nach unten (100vh)
const offsetPath: string =
  'path("M 50vw 0vh C 50vw 25vh, 50vw 75vh, 50vw 100vh")';

const FlyingImage: React.FC<FlyingImageProps> = ({ src, alt }) => {
  // Referenz, um den Scroll-Fortschritt des Abschnitts zu messen.
  const ref = useRef<HTMLDivElement>(null);

  // Ermittle den Scroll-Fortschritt für diesen Abschnitt.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "start end"],
  });

  // Hier ändern wir das Mapping, damit der Pfad von oben nach unten durchlaufen wird.
  const offsetDistance: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  // Die Skalierung des Bildes von klein (0.3) bis groß (1) während des Scrollens
  const scale: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [0.3, 1]
  );

  return (
    <div
      ref={ref}
      className="z-10"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <motion.div
        className="p-4  bg-slate-300"
        style={{
          position: "absolute",
          // Wende den angepassten motion path an.
          offsetPath: offsetPath,
          offsetDistance: offsetDistance,
          scale: scale,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className=""
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </motion.div>
    </div>
  );
};

// Definiere die Bilder (passe die Pfade ggf. an)
const images: string[] = [
  "/10.webp",
  "/02.webp",
  "/03.webp",
  "/04.webp",
  "/05.webp",
];

const Gallery: React.FC = () => {
  return (
    <div>
      {images.map((src, index) => (
        <FlyingImage key={index} src={src} alt={`Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default Gallery;

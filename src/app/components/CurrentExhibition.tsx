"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const images: string[] = [
  "/10.webp",
  "/02.webp",
  "/03.webp",
  "/04.webp",
  "/05.webp",
];

export default function CurrentExhibition() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Image slider logic based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.33 && currentIndex !== 0) {
        setCurrentIndex(0);
      } else if (latest >= 0.33 && latest < 0.66 && currentIndex !== 1) {
        setCurrentIndex(1);
      } else if (latest >= 0.66 && currentIndex !== 2) {
        setCurrentIndex(2);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, currentIndex]);

  // Scale animation for the main image
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const slideVariants = {
    initial: { x: "100%" },
    animate: { x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    exit: { x: "-100%", transition: { duration: 0.8, ease: "easeInOut" } },
  };

  return (
    <div ref={ref} className="relative">
      {/* Background color section */}
      <motion.div
        className="fixed inset-0 bg-orange-100"
        style={{ opacity: backgroundOpacity }}
      />

      {/* Main image section */}
      <div className="h-screen relative flex items-center justify-center p-8">
        <motion.div
          className="relative w-full max-w-6xl aspect-[4/3]"
          style={{ scale, opacity }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex]}
                alt={`Exhibition image ${currentIndex + 1}`}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Content section */}
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-8">Meanwhile...</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <p className="text-lg mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam elementum purus lectus, vel fermentum sem sodales non.
                  Nunc tortor nibh, feugiat nec tellus in, cursus dictum arcu.
                </p>
                <p className="text-lg mb-6">
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Artist</h3>
                    <p>Markus Heller</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Social</h3>
                    <p>@markus.heller</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Photography</h3>
                    <p>@reprofoto1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

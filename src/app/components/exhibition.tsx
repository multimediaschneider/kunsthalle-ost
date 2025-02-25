"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useScrollEffects } from "../hooks/useScrollEffect";

function useExhibitionScrollEffects(scrollYProgress: MotionValue<number>) {
  return {
    // Background clip path animation with entrance and exit
    clipPath: useTransform(
      scrollYProgress,
      [0, 0.1, 0.9, 1],
      [
        "polygon(0 0, 100% 0, 100% 0, 0 0)",
        "polygon(0 0, 100% 5%, 100% 100%, 0 100%)",
        "polygon(0 0, 100% 5%, 100% 100%, 0 100%)",
        "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)", // Exit to the right
      ]
    ),
    // Header text vertical position
    headerY: useTransform(
      scrollYProgress,
      [0, 0.15, 0.16],
      ["50vh", "50vh", "50vh"]
    ),
    // Header text position switching between absolute and fixed
    headerPosition: useTransform(scrollYProgress, (value) =>
      value < 0.15 ? "absolute" : "fixed"
    ),
    // Background opacity with fade out
    backgroundOpacity: useTransform(scrollYProgress, [0, 0.3], [1, 1]),
    // Content section visibility
    contentOpacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]),
  };
}

const images: string[] = [
  "/10.webp",
  "/02.webp",
  "/03.webp",
  "/04.webp",
  "/05.webp",
];

export default function Exhibition() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Main scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Get all scroll-based animations from our custom hooks
  const {
    clipPath,
    headerY,
    headerPosition,
    backgroundOpacity,
    contentOpacity,
  } = useExhibitionScrollEffects(scrollYProgress);
  const { textLogoOpacity, textLogoScale } = useScrollEffects(scrollYProgress);

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

  const slideVariants = {
    initial: { x: "100%" },
    animate: { x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    exit: { x: "-100%", transition: { duration: 0.8, ease: "easeInOut" } },
  };

  return (
    <>
      {/* Main section container with defined height for scroll-based animations */}
      <section
        ref={sectionRef}
        className="relative h-[300vh]"
        style={{ zIndex: 0 }}
      >
        {/* Fixed position container for animations */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gray-500"
            style={{
              clipPath,
              opacity: backgroundOpacity,
            }}
          />

          {/* Content container */}
          <div ref={contentRef} className="relative h-full">
            {/* Animated header */}
            <motion.h1
              className="left-0 right-0 text-white text-9xl font-bold text-center w-full"
              style={{
                position: headerPosition,
                top: 0,
                y: headerY,
                opacity: textLogoOpacity,
                scale: textLogoScale,
              }}
            >
              Current Exhibition
            </motion.h1>

            {/* Main content with fade in/out */}
            <motion.div
              className="h-full flex items-center"
              style={{ opacity: contentOpacity }}
            >
              <div className="w-full h-full px-8 py-12 flex flex-col lg:flex-row items-center justify-center gap-12">
                {/* Text content - more compact */}
                <div className="lg:w-1/4 text-white z-30">
                  <h2 className="text-5xl mb-6">Meanwhile...</h2>
                  <div className="space-y-4">
                    <p className="text-lg">by Markus Heller</p>
                    <p className="text-lg">@markus.heller</p>
                    <p className="text-lg">Photo: @reprofoto1</p>
                    <p className="text-gray-300 max-w-md text-lg">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam elementum purus lectus, vel fermentum sem sodales
                      non. Nunc tortor nibh, feugiat nec tellus in, cursus
                      dictum arcu.
                    </p>
                  </div>
                </div>

                {/* Enlarged image container */}
                <div className="lg:w-3/4 h-[80vh] relative overflow-hidden">
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
                        alt={`Image ${currentIndex}`}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 75vw"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

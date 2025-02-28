"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ExhibitionHeader } from "./ExhibitionHeader";

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

  // Content opacity animation
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  // Background clip path and opacity
  const backgroundClipPath = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [
      "polygon(0 0, 100% 0, 100% 0, 0 0)",
      "polygon(0 0, 100% 5%, 100% 100%, 0 100%)",
      "polygon(0 0, 100% 5%, 100% 100%, 0 100%)",
      "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
    ]
  );
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 1]);

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
            clipPath: backgroundClipPath,
            opacity: backgroundOpacity,
          }}
        />

        {/* Content container */}
        <div ref={contentRef} className="relative h-full">
          {/* Using our new ExhibitionHeader component */}
          <ExhibitionHeader title="Current Exhibition" targetRef={sectionRef} />

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
                    non. Nunc tortor nibh, feugiat nec tellus in, cursus dictum
                    arcu.
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
  );
}

import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useSubtleFollowPointer } from "../../hooks/useSubtleFollowPointer";
import { useScrollEffects } from "../../hooks/useScrollEffect";

export function AnimatedTextLogo() {
  const { scrollYProgress } = useScroll(); // scrollYProgress is now correctly inferred
  const { x, y } = useSubtleFollowPointer(0.03, 50);
  const { textLogoOpacity, textLogoScale } = useScrollEffects(scrollYProgress); // Pass as argument

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-20">
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          style={{ opacity: textLogoOpacity, x, y, scale: textLogoScale }}
        >
          <div className="max-w-[1600px] mx-auto">
            <Image
              src="/kh-text-logo.svg"
              alt="Kunsthalle Ost"
              width={900}
              height={200}
              className="w-full mx-auto"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

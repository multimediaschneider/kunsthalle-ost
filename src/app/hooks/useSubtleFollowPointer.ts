import { useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function useSubtleFollowPointer(movementFactor = 0.05, deadZone = 50) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 10, stiffness: 100, restDelta: 0.001 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const diffX = event.clientX - centerX;
      const diffY = event.clientY - centerY;

      const effectiveDiffX =
        Math.abs(diffX) > deadZone ? diffX - Math.sign(diffX) * deadZone : 0;
      const effectiveDiffY =
        Math.abs(diffY) > deadZone ? diffY - Math.sign(diffY) * deadZone : 0;

      x.set(-effectiveDiffX * movementFactor);
      y.set(-effectiveDiffY * movementFactor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, movementFactor, deadZone]);

  return { x: springX, y: springY };
}

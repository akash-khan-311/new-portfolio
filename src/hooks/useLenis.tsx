"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => t * (2 - t),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const animate = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useLenis;

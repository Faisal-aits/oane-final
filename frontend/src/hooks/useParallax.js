import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

/**
 * useParallax — attaches to a section ref and returns y-offset
 * motion values for background and content layers.
 * 
 * bgOffset: small value for "slow" movement
 * fgOffset: larger value for "fast" movement
 */
export function useParallax(bgOffset = 50, fgOffset = 150) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Background moves slowly (drifts with scroll)
  const bgY = useTransform(scrollYProgress, [0, 1], [-bgOffset, bgOffset]);

  // Content moves faster (drifts against scroll)
  const contentY = useTransform(scrollYProgress, [0, 1], [fgOffset, -fgOffset]);

  // Opacity — full at center, fade at edges (optional helper)
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return { ref, bgY, contentY, opacity };
}

/**
 * useHeroParallax — special parallax for full-viewport hero.
 * Background video drifts slowly; text rises faster.
 */
export function useHeroParallax() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Background video moves slowly down (0% to 15%)
  const videoY   = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  
  // Text content rises faster (0% to -40%)
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  
  const opacity  = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale    = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return { ref, videoY, textY, opacity, scale };
}


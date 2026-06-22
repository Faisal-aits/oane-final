import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';

/**
 * useParallax — attaches to a section ref and returns y-offset
 * motion values for background and content layers.
 * 
 * bgOffset: small value for "slow" movement
 * fgOffset: larger value for "fast" movement
 */
export const useParallax = (bgOffset = 50, fgOffset = 150) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // On mobile, we zero out the offsets to prevent text clipping & overflow issues.
  // On desktop, we scale them down slightly to make the scroll shifts subtle and premium.
  const subtleBg = bgOffset * 0.8;
  const subtleFg = fgOffset * 0.9;

  const activeBg = isMobile ? 0 : subtleBg;
  const activeFg = isMobile ? 0 : subtleFg;

  // Background moves slowly (drifts with scroll)
  const bgY = useTransform(scrollYProgress, [0, 1], [-activeBg, activeBg]);

  // Content moves faster (drifts against scroll)
  const contentY = useTransform(scrollYProgress, [0, 1], [activeFg, -activeFg]);

  // Opacity — full at center, fade at edges (optional helper)
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return { ref, bgY, contentY, opacity };
}

/**
 * useHeroParallax — special parallax for full-viewport hero.
 * Background video drifts slowly; text rises faster.
 */
export const useHeroParallax = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Background video moves faster down (0% to 35%)
  const videoY   = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  
  // Text content rises faster (0% to -60%)
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  
  const opacity  = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale    = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return { ref, videoY, textY, opacity, scale };
}


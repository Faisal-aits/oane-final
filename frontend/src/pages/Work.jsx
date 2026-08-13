import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ServicesSection from '../components/Services.jsx';
import Process from '../components/Process.jsx';
import Sectors from '../components/Sectors.jsx';

// Brand color palette
const COLORS = {
  red:      '#DE3B2B',
  navy:     '#194688',
  blue:     '#34A0E7',
  offwhite: '#F5F2ED',
  gray:     '#999999',
};

const Work = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Positions — INVERTED vs About/Hero:
  // Orb 1 starts top-RIGHT, moves down
  // Orb 2 starts bottom-LEFT, moves up
  const yOrb1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  // Colors — INVERTED vs About page:
  // Orb 1 (right): navy → red → blue
  const orb1Color = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [COLORS.navy, COLORS.red, COLORS.blue, COLORS.offwhite]
  );

  // Orb 2 (left): red → blue → gray → navy
  const orb2Color = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [COLORS.red, COLORS.blue, COLORS.gray, COLORS.navy]
  );

  return (
    <div ref={containerRef} className="relative bg-black min-h-[100dvh] text-white">
      {/* FIXED BACKGROUND LAYER */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-black" />

        {/* Orb 1 — top RIGHT (inverted from About) */}
        <motion.div
          style={{ y: yOrb1, backgroundColor: orb1Color }}
          className="absolute top-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[120px] md:blur-[180px] opacity-60 will-change-transform transform-gpu"
        />

        {/* Orb 2 — bottom LEFT (inverted from About) */}
        <motion.div
          style={{ y: yOrb2, backgroundColor: orb2Color }}
          className="absolute bottom-[10%] left-[5%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[140px] md:blur-[200px] opacity-50 will-change-transform transform-gpu"
        />

        {/* Grain overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
        />
      </div>

      {/* Page content sits above the fixed background */}
      <div className="relative z-10">
        <ServicesSection />
        <Process />
        <Sectors />
      </div>
    </div>
  );
}

export default Work;

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import logo from '../assets/logo.png';
import { InsideOutText, InsideOutElement } from './InsideOut.jsx';
import { MeshGradient } from "@paper-design/shaders-react";

// Brand color palette (same as About page)
const COLORS = {
  red:      '#DE3B2B',
  navy:     '#194688',
  blue:     '#34A0E7',
  offwhite: '#F5F2ED',
  gray:     '#999999',
};

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const { scrollY } = useScroll();

  // Text scrolls up and fades out as user scrolls
  const textY = useTransform(scrollY, [0, window.innerHeight], [0, -window.innerHeight]);
  const textOpacity = useTransform(scrollY, [0, window.innerHeight * 0.5], [1, 0]);

  // Background blurs as you scroll down
  const bgBlur = useTransform(scrollY, [0, window.innerHeight * 0.5], ['blur(0px)', 'blur(20px)']);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    // Sticky so background stays in place as projects scroll over it
    <section
      id="hero"
      className="sticky top-0 w-full h-[100dvh] min-h-[600px] overflow-hidden bg-black z-0"
    >
      {/* ── Animated Shader Background ────── */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ filter: bgBlur }}
      >
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#DE3B2B", "#194688", "#000000", "#34A0E7"]}
          speed={0.3}
          backgroundColor="#000000"
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-60"
          colors={["#000000", "#194688", "#DE3B2B", "#000000"]}
          speed={0.2}
          wireframe={true}
          backgroundColor="transparent"
        />

        {/* Grain overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
        />
      </motion.div>

      {/* ── Text Content ──────────────────────────────────────── */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
      >
        {/* Logo mark */}
        <motion.div
          layoutId="onae-logo"
          transition={{ layout: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }}
          className="w-16 h-16 md:w-20 md:h-20 mb-10 flex items-center justify-center"
        >
          <img
            src={logo}
            alt="ONAÈ mark"
            className="w-full h-full object-contain animate-pulse-slow"
          />
        </motion.div>

        {/* Animated headline */}
        {loaded && (
          <h1
            className="font-poppins font-bold text-white text-center leading-[1.1] md:leading-none flex justify-center"
            style={{ fontSize: 'clamp(1.8rem, 8vw, 7.5rem)' }}
          >
            <InsideOutText text="Sculpted Light." delay={0.1} />
          </h1>
        )}

        {/* Subheadline */}
        <InsideOutElement delay={0.6} className="text-center">
          <p className="font-redhat text-[#999] mt-6 tracking-[0.15em] md:tracking-[0.2em] uppercase text-[10px] md:text-base max-w-[280px] md:max-w-none">
            Architectural lighting consultancy.&nbsp;&nbsp;Dubai.
          </p>
        </InsideOutElement>

        {/* Red accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={loaded ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-[2px] bg-[#DE3B2B] mt-8 origin-center"
        />
      </motion.div>

      {/* ── Corner coords ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        style={{ opacity: textOpacity }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 right-8 z-20 hidden md:block"
      >
        <p className="font-poppins text-[10px] tracking-[0.2em] text-[#555] rotate-90 origin-right">
          25.2048° N, 55.2708° E
        </p>
      </motion.div>
    </section>
  );
}

export default Hero;

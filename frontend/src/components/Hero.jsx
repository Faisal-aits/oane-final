import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHeroParallax } from '../hooks/useParallax.js';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import logo from '../assets/logo.png';
import { InsideOutText, InsideOutElement } from './InsideOut.jsx';

export default function Hero() {
  const { ref, videoY, textY, opacity, scale } = useHeroParallax();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300); // highly responsive cinematic entry transition
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#1A1A1A] grain-overlay"
    >
      {/* ── Parallax Video Background ─────────────────── */}
      <motion.div
        style={{ y: videoY, scale }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(0.8)' }}
        >
          <source src={video1} type="video/mp4" />
          <source src={video2} type="video/mp4" />
        </video>

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/40 via-transparent to-transparent" />
      </motion.div>

      {/* ── Parallax Text Content ────────────────────── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
      >
        {/* Logo mark — smoothly morphs from preloader */}
        <motion.div
          layoutId="onae-logo"
          transition={{
            layout: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
          }}
          className="w-16 h-16 md:w-20 md:h-20 mb-10 flex items-center justify-center"
        >
          <img
            src={logo}
            alt="ONAÈ mark"
            className="w-full h-full object-contain animate-pulse-slow"
          />
        </motion.div>

        {/* Animated headline — Inside-to-Outside Text Reveal */}
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

        {/* CTA */}
        <InsideOutElement delay={1.0}>
          <div className="mt-10">
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline-white text-xs tracking-[0.2em] uppercase rounded-none border-white/30"
            >
              Explore our approach
            </button>
          </div>
        </InsideOutElement>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-poppins text-[9px] md:text-[10px] tracking-[0.3em] text-white/70 uppercase text-center whitespace-nowrap">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#DE3B2B] to-transparent"
        />
      </motion.div>

      {/* ── Corner coords ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
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

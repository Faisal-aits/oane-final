import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHeroParallax } from '../hooks/useParallax.js';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import logo from '../assets/logo.png';

const letter_variants = {
  hidden: { opacity: 0, y: 60 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + i * 0.08, duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  }),
};


export default function Hero() {
  const { ref, videoY, textY, opacity, scale } = useHeroParallax();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Increase delay to 5 seconds as requested
    const t = setTimeout(() => setLoaded(true), 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#1A1A1A]"
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

      {/* ── Grain overlay ───────────────────────────── */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] z-10 pointer-events-none" />

      {/* ── Parallax Text Content ────────────────────── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
      >
        {/* Logo mark — smoothly morphs from preloader */}
        <motion.div
          layoutId="onae-logo"
          transition={{
            layout: { duration: 2.0, ease: [0.76, 0, 0.24, 1] }
          }}
          className="w-16 h-16 md:w-20 md:h-20 mb-10 flex items-center justify-center"
        >
          <img
            src={logo}
            alt="ONAÈ mark"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Animated headline — grouped by words to prevent breaking within words on mobile */}
        <h1 className="font-poppins font-bold text-white text-center leading-[1.1] md:leading-none flex flex-wrap justify-center gap-x-[0.3em]"
          style={{ fontSize: 'clamp(2.2rem, 10vw, 7.5rem)' }}
        >
          {'Sculpted Light.'.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="whitespace-nowrap inline-block">
              {word.split('').map((char, charIndex) => {
                // Calculate global index for staggered animation
                const globalIndex = wordIndex * 10 + charIndex; 
                return (
                  <motion.span
                    key={charIndex}
                    custom={globalIndex}
                    variants={{
                      hidden: { opacity: 0, y: 60 },
                      visible: i => ({
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.3 + i * 0.05, duration: 0.7, ease: [0.76, 0, 0.24, 1] },
                      }),
                    }}
                    initial="hidden"
                    animate={loaded ? 'visible' : 'hidden'}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
          className="font-redhat text-[#999] mt-6 tracking-[0.15em] md:tracking-[0.2em] uppercase text-[10px] md:text-base max-w-[280px] md:max-w-none text-center"
        >
          Architectural lighting consultancy.&nbsp;&nbsp;Dubai.
        </motion.p>

        {/* Red accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={loaded ? { scaleX: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
          className="w-12 h-[2px] bg-[#DE3B2B] mt-8 origin-left"
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
          className="mt-10"
        >
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline-white text-xs tracking-[0.2em] uppercase"
          >
            Explore our approach
          </button>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-poppins text-[10px] tracking-[0.3em] text-[#999] uppercase">Scroll</span>
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
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-10 right-8 z-20 hidden md:block"
      >
        <p className="font-poppins text-[10px] tracking-[0.2em] text-[#555] rotate-90 origin-right">
          25.2048° N, 55.2708° E
        </p>
      </motion.div>
    </section>
  );
}

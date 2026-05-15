import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SECTORS } from '../constants/index.jsx';
import { useParallax } from '../hooks/useParallax.js';

export default function Sectors() {
  const headRef    = useRef(null);
  const listRef    = useRef(null);
  const headVisible = useInView(headRef, { once: true, margin: '-80px' });
  const listVisible = useInView(listRef, { once: true, margin: '-60px' });

  const { ref: sectionRef, bgY, contentY } = useParallax(60, 100);

  return (
    <section
      id="sectors"
      ref={sectionRef}
      className="parallax-section bg-[#1A1A1A]"
    >
      {/* Parallax background geometry */}
      <motion.div
        style={{ y: bgY }}
        className="absolute right-0 top-0 h-full w-1/2 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div className="absolute top-1/4 right-8 w-[1px] h-[60%] bg-gradient-to-b from-transparent via-[#DE3B2B]/15 to-transparent" />
        <div className="absolute top-1/3 right-20 w-[1px] h-[40%] bg-gradient-to-b from-transparent via-[#194688]/15 to-transparent" />
        <div className="absolute top-1/2 right-36 w-[1px] h-[30%] bg-gradient-to-b from-transparent via-[#34A0E7]/10 to-transparent" />
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative z-10 section-pad max-w-[1440px] mx-auto">
        {/* Header */}
        <div ref={headRef} className="mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={headVisible ? { opacity: 1, y: 0 } : {}}
            className="section-label block mb-6"
          >
            Sectors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="section-heading-light max-w-md"
          >
            Collaborating across disciplines.
          </motion.h2>
        </div>

        {/* Sector list — large stacked typography */}
        <div ref={listRef} className="border-t border-white/8">
          {SECTORS.map((sector, i) => (
            <motion.div
              key={sector}
              initial={{ opacity: 0, x: -30 }}
              animate={listVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: i * 0.07 }}
              className="group flex items-center justify-between py-5 border-b border-white/8 cursor-default"
            >
              <span
                className="font-poppins font-light text-white group-hover:text-[#DE3B2B] transition-colors duration-300"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
              >
                {sector}
              </span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ x: 0, opacity: 1 }}
                className="font-poppins text-xs tracking-[0.2em] text-[#DE3B2B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
              >
                {String(i + 1).padStart(2, '0')}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Collaboration statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={listVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: SECTORS.length * 0.07 + 0.2, duration: 0.7 }}
          className="font-redhat text-[#999] mt-12 max-w-2xl leading-relaxed"
          style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
        >
          "We work alongside architects, interior designers, MEP consultancies, developers, and
          lighting suppliers. ONAÈ is designed to complete the project team — not replace any
          part of it."
        </motion.p>
      </motion.div>
    </section>
  );
}


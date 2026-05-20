import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SECTORS } from '../constants/index.jsx';
import { useParallax } from '../hooks/useParallax.js';
import { InsideOutText, InsideOutElement } from './InsideOut.jsx';

export default function Sectors() {
  const headRef = useRef(null);
  const listRef = useRef(null);
  const headVisible = useInView(headRef, { once: true, margin: '-80px' });
  const listVisible = useInView(listRef, { once: true, margin: '-60px' });

  const { ref: sectionRef, bgY, contentY } = useParallax(60, 100);

  const totalSectors = SECTORS.length;
  const centerIndex = (totalSectors - 1) / 2;

  return (
    <section
      id="sectors"
      ref={sectionRef}
      className="parallax-section bg-[#1A1A1A] overflow-hidden"
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
          <div className="mb-6">
            <InsideOutText
              text="Sectors"
              className="section-label block"
            />
          </div>
          <h2 className="section-heading-light max-w-md">
            <InsideOutText text="Collaborating across disciplines." className="block text-white" />
          </h2>
        </div>

        {/* Sector list — large stacked typography */}
        <div ref={listRef} className="border-t border-white/8">
          {SECTORS.map((sector, i) => {
            const distanceFromCenter = Math.abs(i - centerIndex);
            const staggerDelay = distanceFromCenter * 0.1;

            return (
              <motion.div
                key={sector}
                initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
                animate={listVisible ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: staggerDelay }}
                className="group flex items-center justify-between py-5 border-b border-white/8 cursor-default"
              >
                <span
                  className="font-poppins font-light text-white group-hover:text-[#DE3B2B] transition-colors duration-300"
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
                >
                  <InsideOutText text={sector} delay={staggerDelay + 0.1} />
                </span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="font-poppins text-xs tracking-[0.2em] text-[#DE3B2B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
                >
                  {String(i + 1).padStart(2, '0')}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        {/* Collaboration statement */}
        <motion.p
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          animate={listVisible ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ delay: centerIndex * 0.1 + 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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

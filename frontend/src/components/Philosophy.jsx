import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PHILOSOPHY_PRINCIPLES } from '../constants/index.jsx';
import { useParallax } from '../hooks/useParallax.js';

function PrincipleCard({ principle, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: index * 0.1 }}
      className="flex gap-8 md:gap-16 py-10 border-b border-white/8 group"
    >
      {/* Number */}
      <div className="flex-shrink-0 w-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
          className="font-poppins font-bold text-[#DE3B2B] block"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
        >
          {principle.number}
        </motion.span>
      </div>

      {/* Title + body */}
      <div className="flex-1">
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
          className="font-poppins font-semibold text-white mb-3 group-hover:text-[#DE3B2B] transition-colors duration-300"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
        >
          {principle.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.45, duration: 0.7 }}
          className="font-redhat text-[#999] leading-relaxed"
          style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
        >
          {principle.body}
        </motion.p>
      </div>

      {/* Arrow — visible on hover */}
      <div className="flex-shrink-0 self-center hidden md:flex">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ x: 6 }}
          className="text-[#DE3B2B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl"
        >
          →
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function Philosophy() {
  const headingRef = useRef(null);
  const headingVisible = useInView(headingRef, { once: true, margin: '-80px' });

  const { ref: sectionRef, bgY, contentY } = useParallax(40, 80);

  // Floating red circle decoration (still use custom if desired, or bgY)
  const deco1Y = bgY;
  const deco2Y = bgY;

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="parallax-section bg-[#1A1A1A]"
    >
      {/* Background decorations — parallax */}
      <motion.div
        style={{ y: deco1Y }}
        className="absolute -left-40 top-20 w-[400px] h-[400px] rounded-full"
        aria-hidden
      >
        <div className="w-full h-full rounded-full border border-[#DE3B2B]/6" />
        <div className="absolute inset-8 rounded-full border border-[#194688]/8" />
      </motion.div>
      <motion.div
        style={{ y: deco2Y }}
        className="absolute -right-24 bottom-20 w-[240px] h-[240px] rounded-full border border-[#34A0E7]/6"
        aria-hidden
      />

      <motion.div style={{ y: contentY }} className="relative z-10 section-pad max-w-[1440px] mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={headingVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label block mb-6"
          >
            How We Think
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="section-heading-light max-w-lg"
          >
            Five principles that shape every project.
          </motion.h2>
        </div>

        {/* Principles */}
        <div>
          {PHILOSOPHY_PRINCIPLES.map((p, i) => (
            <PrincipleCard key={p.number} principle={p} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

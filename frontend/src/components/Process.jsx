import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROCESS_PHASES } from '../constants/index.jsx';
import { useParallax } from '../hooks/useParallax.js';

function PhaseCard({ phase, index, total }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: index * 0.18 }}
      className="relative flex-1 min-w-[200px]"
    >
      {/* Connector line between cards (desktop) */}
      {index < total - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.18 + 0.5, duration: 0.6 }}
          className="hidden md:block absolute top-6 left-[calc(100%-4px)] w-full h-px bg-gradient-to-r from-[#DE3B2B] to-[#DE3B2B]/20 origin-left z-0"
          style={{ width: 'calc(100% - 52px)', left: '52px' }}
        />
      )}

      {/* Node dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.18 + 0.3, duration: 0.5, type: 'spring' }}
        className="w-3 h-3 rounded-full bg-[#DE3B2B] mb-6 relative z-10"
      />

      {/* Number */}
      <span className="font-poppins font-bold text-[#DE3B2B] block mb-3"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
      >
        {phase.number}
      </span>

      {/* Title */}
      <h3 className="font-poppins font-semibold text-white mb-4"
        style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)' }}
      >
        {phase.title}
      </h3>

      {/* Body */}
      <p className="font-redhat text-[#999] leading-relaxed text-sm md:text-base pr-4">
        {phase.body}
      </p>
    </motion.div>
  );
}

export default function Process() {
  const headRef     = useRef(null);
  const headVisible = useInView(headRef, { once: true, margin: '-80px' });

  const { ref: sectionRef, bgY, contentY } = useParallax(50, 120);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="parallax-section bg-[#1A1A1A]"
    >
      {/* Radial glow decoration */}
      <motion.div
        style={{ y: bgY }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        aria-hidden
      >
        <div
          className="w-full h-full rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, #DE3B2B 0%, transparent 70%)' }}
        />
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative z-10 section-pad max-w-[1440px] mx-auto">
        {/* Header */}
        <div ref={headRef} className="mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={headVisible ? { opacity: 1, y: 0 } : {}}
            className="section-label block mb-6"
          >
            Our Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="section-heading-light max-w-lg"
          >
            From intent to experience. Four phases.
          </motion.h2>
        </div>

        {/* Phase cards — horizontal on desktop */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-0">
          {PROCESS_PHASES.map((phase, i) => (
            <PhaseCard key={phase.number} phase={phase} index={i} total={PROCESS_PHASES.length} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}


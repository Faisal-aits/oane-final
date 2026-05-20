import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROCESS_PHASES } from '../constants/index.jsx';
import { useParallax } from '../hooks/useParallax.js';
import { InsideOutText, InsideOutElement } from './InsideOut.jsx';

function PhaseCard({ phase, index, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Calculate inside-out stagger delay (from center phases outward)
  const centerIndex = (total - 1) / 2;
  const distanceFromCenter = Math.abs(index - centerIndex);
  const staggerDelay = distanceFromCenter * 0.22;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: staggerDelay }}
      className="relative flex-1 min-w-[200px]"
    >
      {/* Connector line between cards (desktop) */}
      {index < total - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: staggerDelay + 0.4, duration: 0.6 }}
          className="hidden md:block absolute top-6 left-[calc(100%-4px)] w-full h-px bg-gradient-to-r from-[#DE3B2B] to-[#DE3B2B]/20 origin-left z-0"
          style={{ width: 'calc(100% - 52px)', left: '52px' }}
        />
      )}

      {/* Node dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: staggerDelay + 0.2, duration: 0.5, type: 'spring' }}
        className="w-3 h-3 rounded-full bg-[#DE3B2B] mb-6 relative z-10"
      />

      {/* Number */}
      <span
        className="font-poppins font-bold text-[#DE3B2B] block mb-3"
        style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
      >
        {phase.number}
      </span>

      {/* Title */}
      <h3
        className="font-poppins font-semibold text-white mb-4"
        style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)' }}
      >
        <InsideOutText text={phase.title} delay={staggerDelay + 0.15} />
      </h3>

      {/* Body */}
      <p className="font-redhat text-[#999] leading-relaxed text-sm md:text-base pr-4">
        {phase.body}
      </p>
    </motion.div>
  );
}

export default function Process() {
  const headRef = useRef(null);
  const headVisible = useInView(headRef, { once: true, margin: '-80px' });

  const { ref: sectionRef, bgY, contentY } = useParallax(50, 120);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="parallax-section bg-[#1A1A1A] overflow-hidden"
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
          <div className="mb-6">
            <InsideOutText
              text="Our Process"
              className="section-label block"
            />
          </div>
          <h2 className="section-heading-light max-w-lg">
            <InsideOutText text="From intent to" className="block text-white" />
            <InsideOutText text="experience. Four phases." className="block text-white" />
          </h2>
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

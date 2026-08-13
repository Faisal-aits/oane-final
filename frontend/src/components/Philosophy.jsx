import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useParallax } from '../hooks/useParallax.js';
import { InsideOutText, InsideOutElement } from './InsideOut.jsx';

const PHILOSOPHY_PRINCIPLES = [
  {
    number: '01',
    title: 'Light Follows Architecture',
    body: "We begin with the architect's intent, not the product catalogue. The space defines what the light needs to do. Every decision follows from the architecture — never the other way around.",
  },
  {
    number: '02',
    title: 'Experience Over Spectacle',
    body: "We design light that rewards attention, not demands it. The best lighting is the kind you feel — warmth in a lobby, intimacy in a restaurant, calm in a corridor — without ever noticing why.",
  },
  {
    number: '03',
    title: 'Function Before Decoration',
    body: "The lighting must work before it can be beautiful. Spatial hierarchy, task performance, material response, circadian comfort — these come first. The aesthetic follows from the function, not the other way around.",
  },
  {
    number: '04',
    title: 'Clarity Over Complexity',
    body: "The simplest solution that serves the architecture is usually the right one. We don't add layers of complexity to justify our involvement. We add clarity to what the space already wants to be.",
  },
  {
    number: '05',
    title: 'Design Before Product',
    body: "The fixture is the last decision, not the first. We specify products only after the design intent is established, the layers are defined, and the spatial hierarchy is clear. The right product emerges from the right design — never the reverse.",
  },
];

const PrincipleCard = ({ principle, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className="flex gap-8 md:gap-16 py-10 border-b border-white/8 group relative overflow-hidden"
    >
      {/* Number */}
      <div className="flex-shrink-0 w-16">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.2, duration: 0.6, ease: 'easeOut' }}
          className="font-poppins font-bold text-[#DE3B2B] block"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
        >
          {principle.number}
        </motion.span>
      </div>

      {/* Title + body */}
      <div className="flex-1">
        <h3
          className="font-poppins font-semibold text-white mb-3 group-hover:text-[#DE3B2B] transition-colors duration-300"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
        >
          <InsideOutText text={principle.title} delay={index * 0.12 + 0.1} />
        </h3>
        <motion.p
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.3, duration: 0.7 }}
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

const Philosophy = () => {
  const headingRef = useRef(null);
  const headingVisible = useInView(headingRef, { once: true, margin: '-80px' });

  const { ref: sectionRef, bgY, contentY } = useParallax(40, 80);

  // Floating circles decoration
  const deco1Y = bgY;
  const deco2Y = bgY;

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="parallax-section bg-transparent overflow-hidden"
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
          <div className="mb-6">
            <InsideOutText
              text="How We Think"
              className="section-label block"
            />
          </div>
          <h2 className="section-heading-light max-w-lg">
            <InsideOutText text="Five principles that" className="block text-white" />
            <InsideOutText text="shape every project." className="block text-white" />
          </h2>
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

export default Philosophy;

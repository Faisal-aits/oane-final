import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useParallax } from '../hooks/useParallax.js';
import { InsideOutText, InsideOutElement } from './InsideOut.jsx';

const SERVICES = [
  {
    title: 'Concept Development',
    body: "We translate the architect's spatial intent into a lighting language. From initial concept through to mood studies, reference imagery, and narrative direction — establishing what the light needs to achieve before a single fixture enters the conversation.",
  },
  {
    title: 'Detailed Lighting Design',
    body: "Comprehensive lighting layouts, fixture schedules, specification documents, and control strategies. Every fitting is selected to serve the design intent. We coordinate with the full project team to ensure the design is buildable, compliant, and on budget.",
  },
  {
    title: 'Specification & Procurement Support',
    body: "Product-agnostic specification based on performance, not brand loyalty. We evaluate fixtures on optical quality, colour rendering, beam control, and value. When budgets shift, we adapt specifications without compromising the design intent.",
  },
  {
    title: 'On-Site Focusing & Commissioning',
    body: "The moment the design becomes real. We attend site during installation and focusing to ensure every fixture is aimed, dimmed, and balanced exactly as designed. This is the most critical phase — and the one most projects skip.",
  },
  {
    title: 'Lighting Masterplanning',
    body: "For large-scale developments, campuses, and urban projects. A unified lighting strategy across multiple buildings, landscapes, and public spaces — ensuring consistency of atmosphere and experience across the entire site.",
  },
  {
    title: 'Daylight Integration',
    body: "Natural and artificial light are not separate systems. We model daylight behaviour across seasons and hours, then design the artificial lighting to complement, not compete with, the sun. In the UAE, where sunlight is the dominant condition, this is not optional — it is fundamental.",
  },
];

const ServiceCard = ({ service, index, total }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Inside-out stagger calculation
  const centerIndex = (total - 1) / 2;
  const distanceFromCenter = Math.abs(index - centerIndex);
  const staggerDelay = distanceFromCenter * 0.15;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: staggerDelay }}
      className="group py-8 px-0 border-b border-[#1A1A1A]/10 cursor-default"
    >
      <div className="flex items-start gap-6">
        {/* Number badge */}
        <span className="flex-shrink-0 font-poppins text-[11px] tracking-[0.2em] text-[#DE3B2B] mt-1 font-medium">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3
            className="font-poppins font-semibold text-[#1A1A1A] mb-3 relative block md:inline-block group-hover:text-[#DE3B2B] transition-colors duration-300"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}
          >
            <InsideOutText text={service.title} delay={staggerDelay + 0.1} />
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#DE3B2B] group-hover:w-full transition-all duration-500 ease-out" />
          </h3>
          <p className="font-redhat text-[#1A1A1A]/60 leading-relaxed text-sm md:text-base">
            {service.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const Services = () => {
  const headRef = useRef(null);
  const headVisible = useInView(headRef, { once: true, margin: '-80px' });

  const { ref: sectionRef, bgY, contentY } = useParallax(30, 60);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="parallax-section bg-[#F5F2ED] overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#DE3B2B]/3 to-transparent pointer-events-none"
        aria-hidden
      />

      <motion.div style={{ y: contentY }} className="relative z-10 section-pad max-w-[1440px] mx-auto">
        {/* Header */}
        <div ref={headRef} className="mb-16 max-w-xl">
          <div className="mb-6">
            <InsideOutText
              text="What We Do"
              className="section-label block"
            />
          </div>
          <h2 className="section-heading-dark">
            <InsideOutText text="Lighting design that" className="block text-[#1A1A1A]" />
            <InsideOutText text="completes the architecture." className="block text-[#1A1A1A]" />
          </h2>
        </div>

        {/* 2-column service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-28">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} service={svc} index={i} total={SERVICES.length} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Services;

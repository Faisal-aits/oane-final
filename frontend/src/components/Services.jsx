import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SERVICES } from '../constants/index.jsx';
import { useParallax } from '../hooks/useParallax.js';

function ServiceCard({ service, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: (index % 2) * 0.12 }}
      className="group py-8 px-0 border-b border-[#1A1A1A]/10 cursor-default"
    >
      <div className="flex items-start gap-6">
        {/* Number badge */}
        <span className="flex-shrink-0 font-poppins text-[11px] tracking-[0.2em] text-[#DE3B2B] mt-1 font-medium">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3 className="font-poppins font-semibold text-[#1A1A1A] mb-3 relative inline-block group-hover:text-[#DE3B2B] transition-colors duration-300"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}
          >
            {service.title}
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

export default function Services() {
  const headRef    = useRef(null);
  const headVisible = useInView(headRef, { once: true, margin: '-80px' });

  const { ref: sectionRef, bgY, contentY } = useParallax(30, 60);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="parallax-section bg-[#F5F2ED]"
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
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={headVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label block mb-6"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="section-heading-dark"
          >
            Lighting design that completes the architecture.
          </motion.h2>
        </div>

        {/* 2-column service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-28">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} service={svc} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}


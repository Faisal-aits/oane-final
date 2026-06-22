import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useParallax } from '../hooks/useParallax.js';
import { InsideOutText, InsideOutElement } from './InsideOut.jsx';

// Placeholder project items
const PROJECTS = [
  { id: 1, title: 'Lobby, Downtown Dubai',   sector: 'Hospitality',  aspect: 'tall'    },
  { id: 2, title: 'Restaurant, DIFC',        sector: 'F&B',          aspect: 'wide'    },
  { id: 3, title: 'Penthouse, Palm Jumeirah',sector: 'Residential',  aspect: 'square'  },
  { id: 4, title: 'Office Atrium, Business Bay', sector: 'Commercial',aspect: 'wide'   },
  { id: 5, title: 'Hotel Facade, JBR',       sector: 'Hospitality',  aspect: 'tall'    },
  { id: 6, title: 'Cultural Centre',         sector: 'Cultural',     aspect: 'square'  },
];

// Generate a subtle gradient per project
const GRADIENTS = [
  'from-[#1A1A1A] via-[#2a1a14] to-[#3a2010]',
  'from-[#0d0d1a] via-[#141428] to-[#1a1a35]',
  'from-[#1a1a0d] via-[#252510] to-[#2e2e14]',
  'from-[#1a0d0d] via-[#291414] to-[#331a1a]',
  'from-[#0d1a1a] via-[#102525] to-[#142e2e]',
  'from-[#1a1014] via-[#241520] to-[#2e1a28]',
];

const ProjectCard = ({ project, index, total }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  // Calculate inside-out stagger delay
  const centerIndex = (total - 1) / 2;
  const distanceFromCenter = Math.abs(index - centerIndex);
  const staggerDelay = distanceFromCenter * 0.12;

  const heightClass = {
    tall:   'h-80 md:h-96',
    wide:   'h-56 md:h-64',
    square: 'h-64 md:h-72',
  }[project.aspect];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: staggerDelay }}
      className={`relative overflow-hidden group cursor-pointer ${heightClass}`}
    >
      {/* Placeholder gradient bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`} />

      {/* Light ray decoration */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at ${index % 2 === 0 ? '20% 30%' : '80% 70%'}, rgba(222,59,43,0.4) 0%, transparent 60%)`,
        }}
      />

      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 bg-[#1A1A1A]/85 flex flex-col items-center justify-center z-10"
      >
        <p className="font-poppins font-semibold text-white text-center px-6"
          style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}
        >
          {project.title}
        </p>
        <p className="font-redhat text-[#999] text-sm mt-2 tracking-wider">{project.sector}</p>
        <div className="w-8 h-px bg-[#DE3B2B] mt-4" />
      </motion.div>

      {/* Project number */}
      <span className="absolute top-4 right-4 font-poppins text-xs tracking-widest text-white/20 z-5">
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.div>
  );
}

const Portfolio = () => {
  const headRef = useRef(null);
  const headVisible = useInView(headRef, { once: true, margin: '-80px' });

  const { ref: sectionRef, bgY, contentY } = useParallax(30, 80);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="parallax-section bg-[#F5F2ED] overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\' fill=\'%23DE3B2B\' fill-opacity=\'0.04\'/%3E%3C/g%3E%3C/svg%3E')] opacity-60 pointer-events-none"
        aria-hidden
      />

      <motion.div style={{ y: contentY }} className="relative z-10 section-pad max-w-[1440px] mx-auto">
        {/* Header */}
        <div ref={headRef} className="mb-14">
          <div className="mb-6">
            <InsideOutText
              text="Selected Work"
              className="section-label block"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="section-heading-dark max-w-md">
              <InsideOutText text="Spaces shaped by" className="block text-[#1A1A1A]" />
              <InsideOutText text="considered light." className="block text-[#1A1A1A]" />
            </h2>
            <motion.p
              initial={{ opacity: 0, scale: 0.98 }}
              animate={headVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className="font-redhat text-[#1A1A1A]/50 text-sm max-w-xs"
            >
              Our first projects are nearing completion. Portfolio updates coming soon.
            </motion.p>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} total={PROJECTS.length} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Portfolio;

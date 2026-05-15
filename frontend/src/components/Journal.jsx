import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { JOURNAL_ARTICLES } from '../constants/index.jsx';
import { useParallax } from '../hooks/useParallax.js';

function ArticleCard({ article, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: index * 0.15 }}
      className="group relative bg-white border border-[#1A1A1A]/8 p-8 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[260px]"
    >
      {/* Red left border that thickens on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#DE3B2B] group-hover:w-[6px] transition-all duration-300" />

      <div>
        {/* Tag + date */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-poppins text-[10px] tracking-[0.25em] text-[#DE3B2B] uppercase font-medium">
            {article.tag}
          </span>
          <span className="font-redhat text-[#999] text-xs">{article.date}</span>
        </div>

        {/* Title */}
        <h3
          className="font-poppins font-semibold text-[#1A1A1A] leading-snug mb-4 group-hover:text-[#DE3B2B] transition-colors duration-300"
          style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="font-redhat text-[#1A1A1A]/55 text-sm leading-relaxed">
          {article.excerpt}
        </p>
      </div>

      {/* Read more */}
      <div className="flex items-center gap-2 mt-8 pt-6 border-t border-[#1A1A1A]/8">
        <span className="font-poppins text-xs tracking-wider text-[#1A1A1A]/40 group-hover:text-[#DE3B2B] transition-colors duration-300">
          Read article
        </span>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: index * 0.3 }}
          className="text-[#DE3B2B] text-sm"
        >
          →
        </motion.span>
      </div>

      {/* Hover background tint */}
      <div className="absolute inset-0 bg-[#DE3B2B]/0 group-hover:bg-[#DE3B2B]/2 transition-colors duration-500 pointer-events-none" />
    </motion.article>
  );
}

export default function Journal() {
  const headRef    = useRef(null);
  const headVisible = useInView(headRef, { once: true, margin: '-80px' });

  const { ref: sectionRef, bgY, contentY } = useParallax(40, 80);

  return (
    <section
      id="journal"
      ref={sectionRef}
      className="parallax-section bg-[#F5F2ED]"
    >
      {/* Background decoration */}
      <motion.div
        style={{ y: bgY }}
        className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(222,59,43,0.06) 0%, transparent 70%)' }}
        />
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative z-10 section-pad max-w-[1440px] mx-auto">
        {/* Header */}
        <div ref={headRef} className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={headVisible ? { opacity: 1, y: 0 } : {}}
              className="section-label block mb-6"
            >
              Journal
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="section-heading-dark max-w-xs"
            >
              Thinking about light.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-redhat text-[#1A1A1A]/45 text-sm max-w-xs leading-relaxed"
          >
            Essays, observations, and perspectives on architectural lighting design.
          </motion.p>
        </div>

        {/* Article cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {JOURNAL_ARTICLES.map((article, i) => (
            <ArticleCard key={article.title} article={article} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}


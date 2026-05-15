import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '../hooks/useParallax.js';
import leavesImg from '../assets/leaves.png';

export default function AboutUs() {
  const { ref: containerRef, bgY, contentY, opacity: aboutOpacity } = useParallax(60, 100);

  // Parallax transforms for leaves and elements (more specific to this section)
  const leafY1 = bgY; 
  const leafY2 = bgY;
  const rotateLeaves = 15; 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.45, 0.32, 0.9],
      },
    },
  };

  return (
    <div id="about" ref={containerRef} className="bg-black">
      {/* SECTION 1: ONLY "About Us" — Max Negative Space */}
      <section className="relative min-h-screen bg-black text-white flex items-center overflow-hidden px-6 md:px-12">
        <motion.div 
          style={{ y: bgY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-onae-red/3 rounded-full blur-[180px] pointer-events-none" 
        />

        {/* Outer: scroll-driven parallax */}
        <motion.div
          style={{ y: contentY, opacity: aboutOpacity }}
          className="max-w-7xl mx-auto w-full z-10"
        >
          {/* Inner: entrance animation */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] }}
            viewport={{ once: true }}
            className="text-onae-red text-2xl md:text-3xl font-poppins font-bold tracking-[0.4em] uppercase block"
          >
            About Us
          </motion.span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
        >
          <span className="text-[10px] tracking-widest uppercase text-white/20">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-onae-red/40 to-transparent" />
        </motion.div>
      </section>

      {/* SECTION 2: Heading + Description + Cards */}
      <section className="relative min-h-screen py-32 px-6 md:px-12 bg-black text-white overflow-hidden">
        {/* Parallax Leaves Background */}
        <motion.img 
          src={leavesImg} 
          style={{ y: leafY1, rotate: rotateLeaves }}
          className="absolute top-0 right-0 w-1/3 opacity-20 pointer-events-none filter blur-sm md:blur-none"
        />
        <motion.img 
          src={leavesImg} 
          style={{ y: leafY2, rotate: -rotateLeaves }}
          className="absolute bottom-0 left-0 w-1/4 opacity-15 pointer-events-none scale-x-[-1] filter blur-md"
        />

        {/* Central Animated Line */}
        <motion.div 
          className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-onae-red/20 to-transparent hidden md:block origin-top"
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Heading + Description */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-24"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-8xl font-poppins font-bold tracking-tighter mb-8 leading-[0.95] text-white"
            >
              Sculpting space <br />
              <span className="text-white/30">through light.</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl text-white/50 font-redhat leading-relaxed max-w-2xl"
            >
              ONAÈ is a design-first architectural lighting consultancy. 
              We blend artistic vision with technical precision to create 
              atmospheres that resonate and inspire.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-48 items-start">
            
            {/* Box 1: Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative p-10 md:p-14 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group hover:border-onae-red/20 transition-all duration-700"
            >
              <span className="text-onae-red/40 text-sm md:text-xs font-poppins font-bold tracking-[0.2em] mb-6 block uppercase">Approach</span>
              <h3 className="text-3xl md:text-4xl font-poppins font-semibold mb-6">The Vision</h3>
              <p className="text-white/50 font-redhat text-xl md:text-lg leading-relaxed">
                We don't just specify fixtures; we design experiences. Our approach begins 
                with the architecture, understanding the interplay of shadow and texture 
                to reveal the soul of every space.
              </p>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-onae-red/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Box 2: Right (Offset vertically for asymmetry) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:mt-64 relative p-10 md:p-14 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group hover:border-onae-red/20 transition-all duration-700"
            >
              <span className="text-onae-red/40 text-sm md:text-xs font-poppins font-bold tracking-[0.2em] mb-6 block uppercase">Process</span>
              <h3 className="text-3xl md:text-4xl font-poppins font-semibold mb-6">The Craft</h3>
              <p className="text-white/50 font-redhat text-xl md:text-lg leading-relaxed">
                Based in Dubai, we navigate the complex intersection of aesthetics 
                and technology. From conceptual sketches to final commissioning, 
                we ensure light is an integral part of the architectural narrative.
              </p>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-onae-navy/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}



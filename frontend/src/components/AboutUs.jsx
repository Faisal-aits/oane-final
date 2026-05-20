import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '../hooks/useParallax.js';
import { InsideOutText, InsideOutElement } from './InsideOut.jsx';

export default function AboutUs() {
  const { ref: containerRef, bgY, contentY, opacity: aboutOpacity } = useParallax(60, 100);

  return (
    <div id="about" ref={containerRef} className="bg-black overflow-hidden relative grain-overlay">
      {/* SECTION 1: ONLY "About Us" — Max Negative Space */}
      <section className="relative min-h-screen bg-black text-white flex items-center overflow-hidden px-6 md:px-12">
        <motion.div
          style={{ y: bgY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-onae-red/3 rounded-full blur-[180px] pointer-events-none"
        />

        {/* Outer: scroll-driven parallax */}
        <motion.div
          style={{ y: contentY, opacity: aboutOpacity }}
          className="max-w-7xl mx-auto w-full z-10 flex justify-start"
        >
          {/* Inside-to-Outside Text Entrance */}
          <h2 className="text-left">
            <InsideOutText
              text="ABOUT US"
              className="text-onae-red text-xl sm:text-3xl md:text-5xl font-poppins font-bold tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase"
            />
          </h2>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
        >
          <span className="text-[10px] tracking-widest uppercase text-white/20">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-onae-red/40 to-transparent" />
        </motion.div>
      </section>

      {/* SECTION 2: Heading + Description */}
      <section className="relative min-h-screen py-20 md:py-32 px-6 md:px-12 bg-onae-offwhite text-onae-black overflow-hidden flex items-center">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-onae-navy/5 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="mb-12 md:mb-24">
            <h2 className="text-2xl sm:text-4xl md:text-7xl font-poppins font-bold tracking-tighter mb-6 md:mb-8 leading-[1.0] md:leading-[0.95] text-onae-black">
              <InsideOutText text="Sculpting space" className="block text-onae-black" />
              <br />
              <InsideOutText text="through light." className="block text-onae-black/40" />
            </h2>
            
            <InsideOutElement delay={0.3}>
              <p className="text-lg md:text-2xl text-onae-black/60 font-redhat leading-relaxed max-w-3xl mt-6">
                ONAÈ is a design-first architectural lighting consultancy.
                We blend artistic vision with technical precision to create
                atmospheres that resonate and inspire.
              </p>
            </InsideOutElement>
          </div>
        </div>
      </section>

      {/* SECTION 3: APPROACH / THE VISION (Full Screen, High Negative Space, Card-less) */}
      <section className="relative min-h-screen py-20 md:py-32 px-6 md:px-12 bg-onae-offwhite text-onae-black overflow-hidden flex items-center">
        <motion.div
          style={{ y: bgY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-onae-red/5 rounded-full blur-[180px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="mb-12 md:mb-24">
            <h2 className="text-2xl sm:text-4xl md:text-7xl font-poppins font-bold tracking-tighter mb-6 md:mb-8 leading-[1.0] md:leading-[0.95] text-onae-black">
              <InsideOutText text="Approach" className="block text-onae-black" />
              <br />
              <InsideOutText text="The Vision." className="block text-onae-black/40" />
            </h2>
            
            <InsideOutElement delay={0.3}>
              <p className="text-lg md:text-2xl text-onae-black/60 font-redhat leading-relaxed max-w-3xl mt-6">
                We don't just specify fixtures; we design experiences. Our approach begins
                with the architecture, understanding the interplay of shadow and texture
                to reveal the soul of every space.
              </p>
            </InsideOutElement>
          </div>
        </div>
      </section>

      {/* SECTION 4: PROCESS / THE CRAFT (Full Screen, High Negative Space, Card-less) */}
      <section className="relative min-h-screen py-20 md:py-32 px-6 md:px-12 bg-onae-offwhite text-onae-black overflow-hidden flex items-center">
        <motion.div
          style={{ y: bgY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-onae-navy/5 rounded-full blur-[180px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="mb-12 md:mb-24">
            <h2 className="text-2xl sm:text-4xl md:text-7xl font-poppins font-bold tracking-tighter mb-6 md:mb-8 leading-[1.0] md:leading-[0.95] text-onae-black">
              <InsideOutText text="Process" className="block text-onae-black" />
              <br />
              <InsideOutText text="The Craft." className="block text-onae-black/40" />
            </h2>
            
            <InsideOutElement delay={0.3}>
              <p className="text-lg md:text-2xl text-onae-black/60 font-redhat leading-relaxed max-w-3xl mt-6">
                Based in Dubai, we navigate the complex intersection of aesthetics
                and technology. From conceptual sketches to final commissioning,
                we ensure light is an integral part of the architectural narrative.
              </p>
            </InsideOutElement>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { InsideOutText } from './InsideOut.jsx';
import { LampContainer } from './Lamp.jsx';

const FadeInContent = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const AboutUs = () => {
  return (
    <div className="relative bg-transparent text-white w-full">

      {/* SCROLLABLE CONTENT LAYER */}
      <div className="relative z-10">

        {/* SECTION 1: LAMP HERO ─────────────────────────────── */}
        <LampContainer>
          {/* Text starts 50px below, rises up as light expands */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: 0.5, duration: 1.0, ease: 'easeInOut' }}
            className=" relative bottom-[143px] flex flex-col items-center gap-5 text-center"
          >

            {/* Main heading */}
            <h1
              className="font-poppins font-bold tracking-[0.12em] leading-none text-white uppercase"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
            >
              About Us
            </h1>

            {/* Sub-line */}
            <p className="font-redhat text-white/40 tracking-[0.15em] uppercase text-[10px] md:text-xs">
              Architectural lighting consultancy · Dubai
            </p>

            {/* Scroll cue — fades in slightly later */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="absolute top-[350px] flex flex-col items-center gap-3 mt-6"
            >
              <span className="text-[9px] tracking-widest uppercase text-white/30">
                Scroll to explore
              </span>
              <div className="w-px h-10 bg-gradient-to-b from-[#34A0E7]/60 to-transparent" />
            </motion.div>
          </motion.div>
        </LampContainer>

        {/* SECTION 2: HEADING + DESCRIPTION */}
        <section className="min-h-[100dvh] flex items-center px-6 md:px-12 py-20 md:py-32">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-12 md:mb-24">
              <FadeInContent>
                <h2 className="text-2xl sm:text-4xl md:text-7xl font-poppins font-bold tracking-tighter mb-6 md:mb-8 leading-[1.0] md:leading-[0.95]">
                  <span className="block text-white">Sculpting space</span>
                  <span className="block text-white/40">through light.</span>
                </h2>
              </FadeInContent>

              <FadeInContent delay={0.2}>
                <p className="text-lg md:text-2xl text-white/60 font-redhat leading-relaxed max-w-3xl mt-6">
                  ONAÈ is a architectural lighting consultancy.
                  We blend artistic vision with technical precision to create
                  atmospheres that resonate and inspire.
                </p>
              </FadeInContent>
            </div>
          </div>
        </section>

        {/* SECTION 3: APPROACH / THE VISION */}
        <section className="min-h-[100dvh] flex items-center px-6 md:px-12 py-20 md:py-32">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-12 md:mb-24">
              <FadeInContent>
                <h2 className="text-2xl sm:text-4xl md:text-7xl font-poppins font-bold tracking-tighter mb-6 md:mb-8 leading-[1.0] md:leading-[0.95]">
                  <span className="block text-white">Approach</span>
                  <span className="block text-white/40">The Vision.</span>
                </h2>
              </FadeInContent>

              <FadeInContent delay={0.2}>
                <p className="text-lg md:text-2xl text-white/60 font-redhat leading-relaxed max-w-3xl mt-6">
                  We don't just specify fixtures; we design experiences. Our approach begins
                  with the architecture, understanding the interplay of shadow and texture
                  to reveal the soul of every space.
                </p>
              </FadeInContent>
            </div>
          </div>
        </section>

        {/* SECTION 4: PROCESS / THE CRAFT */}
        <section className="min-h-[100dvh] flex items-center px-6 md:px-12 py-20 md:py-32">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-12 md:mb-24">
              <FadeInContent>
                <h2 className="text-2xl sm:text-4xl md:text-7xl font-poppins font-bold tracking-tighter mb-6 md:mb-8 leading-[1.0] md:leading-[0.95]">
                  <span className="block text-white">Process</span>
                  <span className="block text-white/40">The Craft.</span>
                </h2>
              </FadeInContent>

              <FadeInContent delay={0.2}>
                <p className="text-lg md:text-2xl text-white/60 font-redhat leading-relaxed max-w-3xl mt-6">
                  Based in Dubai, we navigate the complex intersection of aesthetics
                  and technology. From conceptual sketches to final commissioning,
                  we ensure light is an integral part of the architectural narrative.
                </p>
              </FadeInContent>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default AboutUs;

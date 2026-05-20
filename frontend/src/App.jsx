import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import AboutUs from './components/AboutUs.jsx';
import Philosophy from './components/Philosophy.jsx';
import Services from './components/Services.jsx';
import Process from './components/Process.jsx';
// import Portfolio from './components/Portfolio.jsx';
import Sectors from './components/Sectors.jsx';
// import Journal   from './components/Journal.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

// ── Custom cursor ─────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const onEnter = () => ring.classList.add('hovered');
    const onLeave = () => ring.classList.remove('hovered');

    const tick = () => {
      // Dot follows instantly
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      // Ring lerps behind
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <CustomCursor />
            <Navbar />

            <main>
              <Hero />
              <AboutUs />
              <Philosophy />
              <Services />
              <Process />
              {/* <Portfolio /> */}
              <Sectors />
              {/* <Journal /> */}
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

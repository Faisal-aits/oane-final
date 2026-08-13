import { useEffect, useRef, useState } from 'react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';

import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import logo from './assets/logo.png';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Work from './pages/Work.jsx';
import Contact from './pages/Contact.jsx';

// ── Smooth Scrolling ─────────────────────────────────────────
const SmoothScrolling = () => {
  useEffect(() => {
    // Completely disable Lenis on touch devices to prevent first-swipe issues
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) {
      return; // Do nothing on mobile/touch
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

// ── Scroll to top on route change ─────────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ── Custom cursor ─────────────────────────────────────────────
const CustomCursor = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    const cursorLogo = logoRef.current;
    if (!cursorLogo) return;

    let mx = 0, my = 0;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const onEnter = () => cursorLogo.classList.add('hovered');
    const onLeave = () => cursorLogo.classList.remove('hovered');

    const tick = () => {
      cursorLogo.style.left = mx + 'px';
      cursorLogo.style.top = my + 'px';
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
    <div ref={logoRef} className="cursor-logo">
      <img src={logo} alt="cursor" className="w-full h-full object-contain" />
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <MemoryRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <SmoothScrolling />
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
            className="flex flex-col min-h-[100dvh]"
          >
            <CustomCursor />
            <Navbar />

            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/work" element={<Work />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </MemoryRouter>
  );
}

export default App;

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logoFull from '../assets/onae logo OG.png';

/* ─── Nav data ───────────────────────────────────────────── */
const NAV_LINKS = [
  { path: '/work',     label: 'Work'     },
  { path: '/about',    label: 'About'    },
  { path: '#',         label: 'Ideas'    },
  { path: '/contact',  label: 'Contact'  },
];

/* ─── Slide animation ────────────────────────────────────── */
const SLIDE = {
  initial: { x: 'calc(100% + 120px)' },
  enter:   { x: '0%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit:    { x: 'calc(100% + 120px)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

/* ─── Curved left edge ───────────────────────────────────── */
const Curve = () => {
  const h = window.innerHeight;
  const initial = `M100 0 L200 0 L200 ${h} L100 ${h} Q-100 ${h / 2} 100 0`;
  const target  = `M100 0 L200 0 L200 ${h} L100 ${h} Q100 ${h / 2} 100 0`;

  return (
    <svg
      className="absolute top-0 -left-[99px] w-[100px] h-full stroke-none pointer-events-none"
      style={{ fill: '#0a0a0a' }}
    >
      <motion.path
        variants={{
          initial: { d: initial },
          enter:   { d: target,  transition: { duration: 1,   ease: [0.76, 0, 0.24, 1] } },
          exit:    { d: initial, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
        }}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
};

/* ─── Nav item with letter-stagger ──────────────────────── */
const NavItem = ({ path, label, index, setOpen }) => {
  const { pathname } = useLocation();
  const isActive = pathname === path;

  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      className="flex items-center border-b border-white/10 py-5"
    >
      <Link
        to={path}
        onClick={(e) => {
          if (path === '#') e.preventDefault();
          setOpen(false);
        }}
        className="flex items-center gap-4 w-full"
      >
        <span className="text-white/25 text-lg font-light w-7 shrink-0 font-poppins">
          {String(index).padStart(2, '0')}
        </span>
        <motion.span
          variants={{ initial: { x: 0 }, whileHover: { x: -10 } }}
          transition={{ type: 'spring', staggerChildren: 0.04, delayChildren: 0.05 }}
          className={`text-3xl font-extralight tracking-wide font-poppins uppercase ${
            isActive ? 'text-[#DE3B2B]' : 'text-white'
          }`}
        >
          {label.split('').map((ch, i) => (
            <motion.span
              key={i}
              variants={{ initial: { x: 0 }, whileHover: { x: 10 } }}
              transition={{ type: 'spring' }}
              className="inline-block"
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          ))}
        </motion.span>
      </Link>
    </motion.div>
  );
};

/* ─── Curved slide panel ────────────────────────────────── */
const CurvedPanel = ({ open, setOpen }) => (
  <AnimatePresence mode="wait">
    {open && (
      <motion.div
        variants={SLIDE}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed right-0 top-0 h-[100dvh] w-[85vw] max-w-sm z-[110] bg-[#0a0a0a] flex flex-col"
      >
        <Curve />

        <div className="flex flex-col h-full pt-24 pb-10 px-10">
          {/* Label */}
          <p className="text-white/30 text-[9px] uppercase tracking-[0.3em] font-poppins border-b border-white/10 pb-4 mb-2">
            Navigation
          </p>

          {/* Links */}
          <nav className="flex flex-col flex-1">
            {NAV_LINKS.map((item, i) => (
              <NavItem key={item.path} {...item} index={i + 1} setOpen={setOpen} />
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
            <p className="font-poppins text-[9px] uppercase tracking-[0.2em] text-white/30 leading-relaxed">
              Dubai · Architectural Lighting<br />
              Specialising in immersive lighting experiences.
            </p>
            <div className="flex items-center gap-5">
              <a href="https://www.instagram.com/onae_lighting" target="_blank" rel="noopener noreferrer"
                className="text-white/40 hover:text-[#34A0E7] transition-colors font-poppins text-[9px] uppercase tracking-widest">
                Instagram
              </a>
              <a href="https://www.linkedin.com/company/onae-lighting/" target="_blank" rel="noopener noreferrer"
                className="text-white/40 hover:text-[#34A0E7] transition-colors font-poppins text-[9px] uppercase tracking-widest">
                LinkedIn
              </a>
              <a href="mailto:hello@onae.ae"
                className="text-white/40 hover:text-[#34A0E7] transition-colors font-poppins text-[9px] uppercase tracking-widest">
                Email
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─── Backdrop ───────────────────────────────────────────── */
const Backdrop = ({ open, setOpen }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-[109] bg-black/40 backdrop-blur-sm"
      />
    )}
  </AnimatePresence>
);

/* ─── Main Navbar ────────────────────────────────────────── */
/* Pages with a light (white/bright) background where the nav must use dark text */
const LIGHT_BG_ROUTES = [];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  /* true when the page has a light background */
  const isLight = LIGHT_BG_ROUTES.includes(pathname);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Only close if we are actively scrolling while it's open
      if (window.scrollY > 50 && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    // Check initial scroll position for background ONLY
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Dynamic navbar styling based on scroll and theme
  const navStyles = scrolled
    ? isLight
      ? 'bg-white/30 backdrop-blur-xl border-b border-black/10 py-4 shadow-sm'
      : 'bg-black/30 backdrop-blur-xl border-b border-white/10 py-4 shadow-sm'
    : 'bg-transparent border-b border-transparent py-6';

  return (
    <>
      {/* ── Dynamic top bar ── */}
      <div className={`fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6 md:px-12 pointer-events-none transition-all duration-400 ${navStyles}`}>

        {/* Logo */}
        <Link
          to="/"
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}
          className="pointer-events-auto flex items-center shrink-0 w-[70px] h-8 relative"
        >
          <img
            src={logoFull}
            alt="ONAÈ"
            className="h-[100px] w-auto object-contain absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none max-w-none"
          />
        </Link>

        {/* Desktop nav links — centered */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-poppins text-[10px] uppercase tracking-[0.22em] transition-all duration-300 relative
                ${ 
                  isLight
                    ? pathname === link.path
                      ? 'text-[#DE3B2B]'
                      : 'text-gray-500 hover:text-gray-900'
                    : pathname === link.path
                      ? 'text-[#DE3B2B]'
                      : 'text-white/50 hover:text-white'
                }
              `}
            >
              {link.label}
              {pathname === link.path && (
                <motion.span
                  layoutId="activeDot"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#DE3B2B] rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side — hamburger on all screen sizes */}
        <div className="pointer-events-auto flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="flex flex-col items-center justify-center w-10 h-10 gap-[6px] bg-transparent border-0 p-1 relative z-[120]"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="block rounded-sm"
              style={{ width: '26px', height: '3px', backgroundColor: isLight ? '#1a1a1a' : '#ffffff' }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block rounded-sm"
              style={{ width: '26px', height: '3px', backgroundColor: isLight ? '#1a1a1a' : '#ffffff' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="block rounded-sm"
              style={{ width: '26px', height: '3px', backgroundColor: isLight ? '#1a1a1a' : '#ffffff' }}
            />
          </button>
        </div>
      </div>

      {/* ── Curved slide panel + backdrop (mobile) ── */}
      <Backdrop open={menuOpen} setOpen={setMenuOpen} />
      <CurvedPanel open={menuOpen} setOpen={setMenuOpen} />
    </>
  );
};

export default Navbar;

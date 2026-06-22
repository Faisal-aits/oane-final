import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const NAV_LINKS = [
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/work', label: 'Work' },
  { path: '/contact', label: 'Contact', isButton: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { pathname } = useLocation();

  // Sections with light backgrounds where text should be black
  const lightSections = [];
  const isLightSection = lightSections.includes(pathname);

  // Scroll logic for dynamic shrinking/expanding based on direction
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setScrolled(false);
      } else if (currentScrollY > lastScrollY) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const textColor = isLightSection ? 'text-black' : 'text-white';
  const borderColor = isLightSection ? 'border-black/10' : 'border-white/10';
  const logoFilter = isLightSection ? 'brightness(0)' : 'none';
  const navBg = isLightSection ? 'bg-white/40 shadow-sm' : 'bg-[#1A1A1A]/60 shadow-2xl';

  return (
    <>
      <motion.nav
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className={`fixed top-6 left-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] px-6 rounded-full border flex items-center justify-between gap-6 lg:gap-10 backdrop-blur-xl
          ${scrolled
            ? 'w-auto min-w-[300px] max-w-[95%] py-2.5'
            : 'w-[90%] max-w-5xl py-4'
          } ${navBg} ${borderColor}`}
      >
        {/* Logo Section */}
        <Link
          to="/"
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}
          className="flex items-center gap-2 group shrink-0"
        >
          <div className="relative w-7 h-7 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
            <motion.img
              src={logo}
              alt="ONAÈ"
              style={{ filter: logoFilter }}
              className="w-full h-full object-contain transition-all duration-500"
            />
          </div>
          
          <AnimatePresence>
            {!scrolled && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`font-poppins font-semibold text-[13px] tracking-[0.2em] overflow-hidden whitespace-nowrap transition-colors duration-500 ${textColor}`}
              >
                ONAÈ
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Desktop Links - Always Visible */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10">
          {NAV_LINKS.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`font-poppins text-[10px] uppercase tracking-[0.2em] transition-all duration-500 relative group
                  ${pathname === link.path ? (isLightSection ? 'text-black font-semibold' : 'text-white font-semibold') : (isLightSection ? 'text-black/50 hover:text-black' : 'text-white/40 hover:text-white')}
                `}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-[#DE3B2B] transition-all duration-500 rounded-full
                  ${pathname === link.path ? 'w-1' : 'w-0 group-hover:w-1'}
                `} />
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Button / Hamburger */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex flex-col items-end gap-1 p-2 transition-all duration-500 ${textColor}`}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 4, width: '20px' } : { rotate: 0, y: 0, width: scrolled ? '16px' : '22px' }}
              className={`h-[1.5px] rounded-full transition-all duration-500 ${isLightSection ? 'bg-black' : 'bg-white'}`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -4, width: '20px' } : { rotate: 0, y: 0, width: scrolled ? '22px' : '14px' }}
              className={`h-[1.5px] rounded-full transition-all duration-500 ${isLightSection ? 'bg-black' : 'bg-[#DE3B2B]'}`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0D0D0D] flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            {/* Background Text Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] text-[30vw] font-poppins font-bold whitespace-nowrap text-white">
              ONAÈ
            </div>

            <ul className="relative z-10 flex flex-col items-center gap-6 text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="group relative"
                  >
                    <span className="font-poppins text-3xl md:text-4xl font-semibold text-white/20 group-hover:text-[#DE3B2B] transition-colors duration-500 uppercase tracking-widest">
                      {link.label}
                    </span>
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-[10px] font-poppins font-medium text-[#DE3B2B] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 flex flex-col items-center gap-4 text-center"
            >
              <div className="w-12 h-[1px] bg-white/10" />
              <p className="font-poppins text-[10px] uppercase tracking-[0.3em] text-white/40">
                Dubai · Architectural Lighting
              </p>
              <a href="mailto:hello@onae.ae" className="font-poppins text-sm text-white hover:text-[#DE3B2B] transition-colors">
                hello@onae.ae
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;

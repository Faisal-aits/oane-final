import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import logoFull from '../assets/onae logo OG.png';

const NAV_LINKS = [
  { label: 'Work',     path: '/work' },
  { label: 'About',    path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact',  path: '/contact' },
];

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/onae_lighting?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/onae-lighting/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const Footer = () => {
  const ref = useRef(null);

  return (
    <footer ref={ref} className="relative z-10 bg-black border-t border-white/[0.06]">

      {/* Subtle orb glow — top left red, bottom right navy */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#DE3B2B] rounded-full mix-blend-screen filter blur-[160px] opacity-10" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#194688] rounded-full mix-blend-screen filter blur-[160px] opacity-10" />
      </div>

      {/* ── Main Footer Body ──────────────────────────────────── */}
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-16 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">

          {/* Col 1 — Brand */}
          <motion.div {...fadeUp(0)} className="md:col-span-5 flex flex-col gap-6">
            {/* Logo */}
            <div className="relative h-8 w-36">
              <img
                src={logoFull}
                alt="ONAÈ"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[100px] w-auto max-w-none object-contain"
              />
            </div>

            <p className="font-redhat text-white/40 text-sm leading-relaxed max-w-xs mt-4">
              Design-first architectural lighting consultancy
              based in Dubai. We sculpt spaces through the
              art of light.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-5 mt-2">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/30 hover:text-[#DE3B2B] transition-colors duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Navigation */}
          <motion.div {...fadeUp(0.1)} className="md:col-span-3">
            <p className="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#DE3B2B] mb-6">
              The Studio
            </p>
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="font-poppins text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Get In Touch */}
          <motion.div {...fadeUp(0.2)} className="md:col-span-4">
            <p className="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#DE3B2B] mb-6">
              Get In Touch
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="mailto:hello@onae.ae"
                  className="font-poppins text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
                >
                  hello@onae.ae
                </a>
              </li>
              <li>
                <span className="font-poppins text-sm text-white/30 tracking-wide">
                  Dubai, United Arab Emirates
                </span>
              </li>
              <li className="pt-4">
                <Link
                  to="/contact"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 font-poppins text-[10px] tracking-[0.25em] uppercase text-white border border-white/20 hover:border-[#DE3B2B] hover:text-[#DE3B2B] transition-all duration-300 px-5 py-3"
                >
                  Start a project
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────────────────── */}
      <motion.div
        {...fadeUp(0.3)}
        className="relative max-w-[1440px] mx-auto px-6 md:px-16 py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="font-poppins text-[11px] tracking-[0.2em] uppercase text-white/20">
          © 2026 ONAÈ. All rights reserved.
        </p>
        <p className="font-poppins text-[11px] tracking-[0.2em] uppercase text-white/20">
          Architectural Lighting · Dubai
        </p>
      </motion.div>

    </footer>
  );
}

export default Footer;

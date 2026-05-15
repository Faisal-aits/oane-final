import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import logo from '../assets/logo.png';

export default function Footer() {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="bg-[#1A1A1A] border-t border-[#DE3B2B]/40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">

        {/* Logo + name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5"
        >
          <img src={logo} alt="ONAÈ" className="w-7 h-7 object-contain" />
          <span className="font-poppins text-sm font-medium text-white tracking-[0.15em]">ONAÈ</span>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-redhat text-[#555] text-xs tracking-wider hidden sm:block"
        >
          © 2026 ONAÈ. All rights reserved.
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <a
            href="https://instagram.com/onae.light"
            target="_blank"
            rel="noopener noreferrer"
            className="font-poppins text-xs text-[#999] hover:text-[#DE3B2B] transition-colors duration-200 tracking-wider"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-poppins text-xs text-[#999] hover:text-[#DE3B2B] transition-colors duration-200 tracking-wider"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </footer>
  );
}

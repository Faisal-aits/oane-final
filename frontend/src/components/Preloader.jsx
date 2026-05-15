import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 1, ease: 'easeInOut' }
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0D0D0D]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative flex flex-col items-center"
      >
        <motion.div
          layoutId="onae-logo"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            layout: { duration: 2.0, ease: [0.76, 0, 0.24, 1] },
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut'
          }}
          className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center"
        >
          <img
            src={logo}
            alt="ONAÈ Logo"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Soft atmospheric glow */}
        <div className="absolute inset-0 bg-[#DE3B2B]/20 blur-[60px] rounded-full pointer-events-none" />
      </motion.div>

      {/* Soft tracking text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 overflow-hidden"
      >
        <span className="font-poppins text-[9px] tracking-[0.6em] text-[#DE3B2B] uppercase font-medium">
          ONAÈ
        </span>
      </motion.div>
    </motion.div>
  );
}

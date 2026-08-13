import { motion } from 'framer-motion';

const C = '#34A0E7';

export const LampContainer = ({ children, className = '' }) => {
  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-x-clip bg-gradient-to-b from-black from-70% to-transparent w-full z-0 pt-40 md:pt-52 ${className}`}
    >
      {/* ─── Light cone layer ────────────────────────────────────── */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 -translate-y-32">

        {/* LEFT conic beam */}
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '42rem' }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible text-white"
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, ${C}, transparent, transparent)`,
          }}
        >
          <div className="absolute w-full left-0 h-40 bottom-0 z-20 bg-black"
            style={{ maskImage: 'linear-gradient(to top, white, transparent)', WebkitMaskImage: 'linear-gradient(to top, white, transparent)' }} />
          <div className="absolute w-40 h-full left-0 bottom-0 z-20 bg-black"
            style={{ maskImage: 'linear-gradient(to right, white, transparent)', WebkitMaskImage: 'linear-gradient(to right, white, transparent)' }} />
        </motion.div>

        {/* RIGHT conic beam */}
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '42rem' }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-auto left-1/2 h-56 text-white"
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, ${C})`,
          }}
        >
          <div className="absolute w-40 h-full right-0 bottom-0 z-20 bg-black"
            style={{ maskImage: 'linear-gradient(to left, white, transparent)', WebkitMaskImage: 'linear-gradient(to left, white, transparent)' }} />
          <div className="absolute w-full right-0 h-40 bottom-0 z-20 bg-black"
            style={{ maskImage: 'linear-gradient(to top, white, transparent)', WebkitMaskImage: 'linear-gradient(to top, white, transparent)' }} />
        </motion.div>

        {/* Dark fill below beams */}
        <div className="absolute top-1/2 h-[500px] w-full translate-y-12 scale-x-150 bg-gradient-to-b from-black to-transparent blur-2xl" />


        {/* Wide glow orb */}
        <div
          className="absolute inset-auto z-50 h-48 w-[42rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: C }}
        />

        {/* Narrow hot-spot */}
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '24rem' }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-auto z-30 h-36 -translate-y-[6rem] rounded-full blur-2xl"
          style={{ backgroundColor: C }}
        />

        {/* Tubelight bar line */}
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{
            width: '42rem',
            boxShadow: `0 0 12px 3px ${C}, 0 0 40px 10px rgba(52,160,231,0.6)`,
          }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-auto z-50 h-0.5 -translate-y-[7rem]"
          style={{ backgroundColor: C }}
        />

        {/* Dark cover above bar */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-black" />
      </div>

      {/* ─── Content in the illuminated zone ─────────────────────── */}
      <div className="relative z-50 flex -translate-y-60 flex-col items-center px-5" style={{ top: '20px' }}>
        {children}
      </div>
    </div>
  );
};

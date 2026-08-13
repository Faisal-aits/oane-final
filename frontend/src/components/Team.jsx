import { motion } from 'framer-motion';
import { InsideOutText } from './InsideOut.jsx';

/* ─── Fade-in helper ─────────────────────────────────────── */
const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Team members ───────────────────────────────────────── */
const TEAM = [
  { name: 'Danish Sayed',      title: 'Design Director and Creative Lead' },
  { name: 'Renuka Abrol',      title: 'Intermediate Lighting Designer' },
  { name: 'Indrajeet Mohite',  title: 'Senior Lighting Designer' },
  { name: 'Ramees Hangad',     title: 'BIM Coordinator' },
  { name: 'Farheen Sayed',     title: 'Administration' },
  { name: 'Abdullah Husain',   title: 'Social Media and Marketing' },
];

/* ─── Team Component ─────────────────────────────────────── */
const Team = () => {
  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden">

      {/* ── Divider & Label ── */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <h2 className="text-2xl sm:text-4xl md:text-7xl font-poppins font-bold tracking-tighter leading-[1.0] md:leading-[0.95]">
          <span className="block text-white">
            <InsideOutText text="The Team" />
          </span>
        </h2>
      </div>

      {/* ════════════════════════════════════════════════════
          TEAM MEMBERS LIST
      ════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between
                         border-b border-white/10 py-6 gap-2 hover:border-white/20
                         transition-colors duration-300"
            >
              {/* Left — index + name */}
              <div className="flex items-baseline gap-5">
                <span className="font-poppins text-[11px] text-white/20 w-6 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-poppins font-semibold text-lg md:text-xl text-white group-hover:text-[#DE3B2B] transition-colors duration-300">
                  <InsideOutText text={member.name} />
                </span>
              </div>

              {/* Right — title + spec */}
              <div className="flex flex-col sm:items-end gap-1 pl-11 sm:pl-0">
                <span className="font-poppins text-sm uppercase tracking-[0.18em] text-white/60">
                  {member.title}
                </span>
                {member.spec && (
                  <span className="font-redhat text-sm text-[#DE3B2B] tracking-wide">
                    {member.spec}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Team;

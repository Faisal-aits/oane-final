import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { InsideOutText } from './InsideOut.jsx';

import imgHospitality from '../assets/Hotel 2.jpg';
import imgRestaurant from '../assets/Restaurant 2.jpg';
import imgCommercial from '../assets/Commercial 1.jpg';
import imgResidential from '../assets/Residential 1.jpg';
import imgRetail from '../assets/Retail 2.jpg';
import imgCultural from '../assets/Cultural 1.jpg';
import imgFacade from '../assets/Facade 2.jpg';
import imgMasterplanning from '../assets/Masterplanning 2.jpg';

const SECTORS = [
  { id: 1, title: 'Hospitality & Hotels', image: imgHospitality },
  { id: 2, title: 'Restaurants & F&B', image: imgRestaurant },
  { id: 3, title: 'Commercial Offices', image: imgCommercial },
  { id: 4, title: 'Residential', image: imgResidential },
  { id: 5, title: 'Retail', image: imgRetail },
  { id: 6, title: 'Cultural & Public Spaces', image: imgCultural },
  { id: 7, title: 'Facades & Landscapes', image: imgFacade },
  { id: 8, title: 'Masterplanning', image: imgMasterplanning },
];

const SectorCard = ({ sector, index }) => {
  const containerRef = useRef(null);
  
  // Track scroll for parallax effect on the image/background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background moves slightly slower than the container (parallax)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  // Text moves slightly faster
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[80vh] md:h-[100dvh] overflow-hidden mb-4 md:mb-10 rounded-2xl group cursor-pointer border border-white/5">
      {/* Parallax Background */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-[130%] -top-[15%] will-change-transform transform-gpu">
        {sector.image ? (
          <img 
            src={sector.image} 
            alt={sector.title} 
            className="w-full h-full object-cover transform-gpu" 
          />
        ) : (
          <div className="w-full h-full bg-[#0a0a0a] group-hover:bg-[#1a1a1a] transition-colors duration-700" />
        )}
        {/* Performance-friendly darkening overlay (replaces CSS filter) */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 pointer-events-none" />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
      </motion.div>

      {/* Parallax Text */}
      <motion.div 
        style={{ y: textY }}
        className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10"
      >
        <p className="font-poppins text-[#DE3B2B] text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
          {String(index + 1).padStart(2, '0')} — SECTOR
        </p>
        <h2 className="font-poppins font-bold text-white text-4xl md:text-7xl leading-tight mb-2">
          {sector.title}
        </h2>
      </motion.div>
    </div>
  );
};

const Sectors = () => {
  return (
    <section id="sectors" className="relative w-full bg-transparent z-10 px-4 md:px-8 py-20">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-20 px-4">
          <InsideOutText
            text="Sectors"
            className="section-label block mb-6"
          />
          <h2 className="section-heading-light max-w-md mb-8">
            <InsideOutText text="Collaborating across disciplines." className="block text-white" />
          </h2>
          <p className="font-redhat text-[#999] max-w-2xl leading-relaxed text-sm md:text-base">
            "We work alongside architects, interior designers, MEP consultancies, developers, and
            lighting suppliers. ONAÈ is designed to complete the project team — not replace any
            part of it."
          </p>
        </div>

        {/* Sector Cards */}
        <div className="flex flex-col">
          {SECTORS.map((sector, i) => (
            <SectorCard key={sector.id} sector={sector} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Sectors;

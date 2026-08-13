import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.png';
import { InsideOutText } from './InsideOut.jsx';

const PROJECTS = [
  { id: 1, title: 'The Royal Atlantis', location: 'Dubai, UAE', image: project1, category: 'Hospitality' },
  { id: 2, title: 'Zuma', location: 'DIFC, Dubai', image: project2, category: 'F&B' },
  { id: 3, title: 'Palm Jumeirah Villa', location: 'Dubai, UAE', image: project3, category: 'Residential' },
  { id: 4, title: 'Louvre Abu Dhabi', location: 'Abu Dhabi, UAE', image: project4, category: 'Cultural' },
];

const ProjectCard = ({ project, index }) => {
  const containerRef = useRef(null);
  
  // Track scroll for parallax effect on the image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Image moves slightly slower than the container (parallax)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  // Text moves slightly faster
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[80vh] md:h-[100dvh] overflow-hidden mb-4 md:mb-10 rounded-2xl group cursor-pointer">
      {/* Parallax Image */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover filter brightness-[0.6] group-hover:brightness-[0.8] transition-all duration-700" 
        />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </motion.div>

      {/* Parallax Text */}
      <motion.div 
        style={{ y: textY }}
        className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10"
      >
        <p className="font-poppins text-[#DE3B2B] text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
          {String(index + 1).padStart(2, '0')} — {project.category}
        </p>
        <h2 className="font-poppins font-bold text-white text-4xl md:text-7xl leading-tight mb-2">
          {project.title}
        </h2>
        <p className="font-redhat text-[#999] text-sm md:text-lg tracking-widest uppercase">
          {project.location}
        </p>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="relative w-full bg-transparent z-10 px-4 md:px-8 py-20 pb-40">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-20 px-4">
          <InsideOutText
            text="Selected Works"
            className="section-label block mb-6"
          />
          <h2 className="section-heading-light max-w-2xl">
            <InsideOutText text="Illuminating spaces" className="block text-white" />
            <InsideOutText text="that inspire." className="block text-white/50" />
          </h2>
        </div>
        
        <div className="flex flex-col">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;

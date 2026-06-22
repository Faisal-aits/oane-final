import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import motionVideo from '../assets/O Motion.mp4';

const Preloader = ({ onComplete }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Autoplay fallback: in case the video is blocked or does not fire onEnded,
    // automatically transition after 4.5 seconds.
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2200);

    // Attempt to force play in case of general browser policies
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Silent catch for browsers with strict interaction rules
      });
    }

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleVideoEnded = () => {
    if (onComplete) onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 z-[9999] w-screen h-screen bg-[#000000] flex items-center justify-center overflow-hidden"
    >
      {/* 
        By setting the container and video backgrounds to pure black (#000000), 
        the boundaries of the centered video melt away completely. The motion graphics 
        float beautifully and play without any letterboxing, stretching, or cropping.
      */}
      <div className="relative w-full max-w-[480px] aspect-video sm:max-w-[640px] md:max-w-[800px] flex items-center justify-center p-6 bg-[#000000]">
        <video
          ref={videoRef}
          src={motionVideo}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="w-full h-full object-contain pointer-events-none bg-[#000000]"
        />
      </div>
    </motion.div>
  );
}

export default Preloader;

import { motion } from 'framer-motion';

/**
 * InsideOutText — Animates text characters from the inside (center of each word) outwards.
 * The characters are initially collapsed toward the word's center, scaled down, and blurred.
 * When they appear, they expand outwards to their natural letter spacing with a premium ease.
 */
export const InsideOutText = ({ text, className = '', delay = 0 }) => {
  if (!text) return null;
  
  // Split by words to prevent broken line wraps on mobile devices
  const words = text.split(' ');
  
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-15px' }}
      className={`inline ${className}`}
    >
      {words.map((word, wordIdx) => {
        const chars = Array.from(word);
        const centerIdx = (chars.length - 1) / 2;
        
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
            {chars.map((char, charIdx) => {
              // Distance from the center of this specific word
              const distance = Math.abs(charIdx - centerIdx);
              // Direction from center: -1 for left, 1 for right, 0 for center
              const direction = charIdx === centerIdx ? 0 : charIdx < centerIdx ? -1 : 1;
              
              const variants = {
                hidden: {
                  opacity: 0,
                  scale: 0.4,
                  x: direction * -10, // Pull inwards toward center
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  transition: {
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1], // premium easeOutExpo curve
                    delay: delay + distance * 0.04,
                  },
                },
              };

              return (
                <motion.span
                  key={charIdx}
                  variants={variants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </motion.span>
  );
}

/**
 * InsideOutElement — Animates a single container/element from the inside out (scaling up,
 * blooming, and fading in).
 */
export const InsideOutElement = ({ children, className = '', delay = 0, duration = 0.95 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        delay,
      }}
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * InsideOutStagger — Animates a collection of children items by staggering their entrance
 * starting from the center index outward to the edges.
 */
export const InsideOutStagger = ({ children, delay = 0, duration = 0.9, interval = 0.12, className = '' }) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const total = childrenArray.length;
  const center = (total - 1) / 2;

  return (
    <div className={className}>
      {childrenArray.map((child, index) => {
        const distanceFromCenter = Math.abs(index - center);
        const staggerDelay = delay + distanceFromCenter * interval;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration,
              delay: staggerDelay,
              ease: [0.16, 1, 0.3, 1], // easeOutExpo
            }}
            viewport={{ once: true, margin: '-80px' }}
            className="w-full h-full"
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}

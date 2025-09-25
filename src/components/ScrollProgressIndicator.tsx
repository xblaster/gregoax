import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollProgressIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Transform scroll progress for different elements
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="scroll-progress-container"
      style={{ opacity }}
    >
      {/* Progress Bar */}
      <motion.div
        className="scroll-progress-bar"
        style={{
          scaleX,
          transformOrigin: "left center"
        }}
      />

      {/* Crystal Progress Indicator */}
      <motion.div
        className="scroll-progress-crystal"
        style={{
          rotate,
          x: useTransform(scrollYProgress, [0, 1], [0, 300])
        }}
      >
        <div className="crystal-shape crystal-diamond"></div>
      </motion.div>

      <style>{`
        .scroll-progress-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          z-index: var(--z-navigation);
          pointer-events: none;
        }

        .scroll-progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(90deg,
            var(--crystal-primary) 0%,
            var(--crystal-light) 50%,
            var(--geometric-purple) 100%);
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
        }

        .scroll-progress-crystal {
          position: absolute;
          top: -8px;
          left: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .scroll-progress-crystal .crystal-shape {
          width: 100%;
          height: 100%;
          opacity: 0.9;
          filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.6));
        }
      `}</style>
    </motion.div>
  );
};

export default ScrollProgressIndicator;
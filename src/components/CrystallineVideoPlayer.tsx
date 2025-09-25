import React, { useState, useRef } from 'react';
import { motion, useInView, useTransform, useScroll } from 'framer-motion';
import { generateYouTubeEmbedUrl, extractYouTubeVideoId, isValidYouTubeVideoId } from '../utils/youtube';

interface CrystallineVideoPlayerProps {
  videoId: string; // Can be a full YouTube URL or just the video ID
  title?: string;
  description?: string;
}

const CrystallineVideoPlayer: React.FC<CrystallineVideoPlayerProps> = ({
  videoId: videoIdProp,
  title = "Performance Exceptionnelle",
  description = "Découvrez le talent extraordinaire dans cette performance cristalline"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Scroll-based animations
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -50]);

  // Extract clean video ID from URL or validate existing ID
  const cleanVideoId = extractYouTubeVideoId(videoIdProp) || videoIdProp;

  // Validate the video ID
  if (!isValidYouTubeVideoId(cleanVideoId)) {
    return (
      <div className="video-error glass-effect">
        <div className="error-crystal">
          <div className="crystal-shape crystal-triangle"></div>
        </div>
        <h3 className="text-title error-title">Erreur Vidéo</h3>
        <p className="text-body">
          ID de vidéo YouTube invalide. Veuillez fournir un ID valide ou une URL complète.
        </p>
      </div>
    );
  }

  const embedUrl = generateYouTubeEmbedUrl(cleanVideoId);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="crystalline-video-container"
      style={{ y }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Crystal Formations */}
      <div className="video-background-crystals">
        <motion.div
          className="background-crystal crystal-1"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="crystal-shape crystal-hexagon"></div>
        </motion.div>
        <motion.div
          className="background-crystal crystal-2"
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="crystal-shape crystal-diamond"></div>
        </motion.div>
        <motion.div
          className="background-crystal crystal-3"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="crystal-shape crystal-triangle"></div>
        </motion.div>
      </div>

      {/* Title Section */}
      <motion.div className="video-header" variants={childVariants}>
        <div className="header-decoration">
          <motion.div
            className="decoration-line"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <div className="crystal-shape crystal-diamond header-crystal"></div>
          <motion.div
            className="decoration-line"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        <motion.h3
          className="video-title text-title"
          variants={childVariants}
        >
          {title}
        </motion.h3>

        <motion.p
          className="video-description text-body"
          variants={childVariants}
        >
          {description}
        </motion.p>
      </motion.div>

      {/* Video Frame */}
      <motion.div
        className="crystalline-video-frame glass-effect"
        variants={childVariants}
        whileHover={{
          scale: 1.02,
          rotateX: 2,
          rotateY: 2,
          transition: { duration: 0.3 }
        }}
      >
        {/* Prismatic Border Effect */}
        <div className="prismatic-border">
          <div className="border-segment segment-1"></div>
          <div className="border-segment segment-2"></div>
          <div className="border-segment segment-3"></div>
          <div className="border-segment segment-4"></div>
        </div>

        {/* Corner Crystals */}
        <div className="corner-crystals">
          <motion.div
            className="corner-crystal top-left"
            animate={{
              rotate: isHovered ? 45 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="crystal-shape crystal-diamond"></div>
          </motion.div>
          <motion.div
            className="corner-crystal top-right"
            animate={{
              rotate: isHovered ? -45 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="crystal-shape crystal-diamond"></div>
          </motion.div>
          <motion.div
            className="corner-crystal bottom-left"
            animate={{
              rotate: isHovered ? -45 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="crystal-shape crystal-diamond"></div>
          </motion.div>
          <motion.div
            className="corner-crystal bottom-right"
            animate={{
              rotate: isHovered ? 45 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="crystal-shape crystal-diamond"></div>
          </motion.div>
        </div>

        {/* Video Container */}
        <div className="video-wrapper">
          <motion.iframe
            src={embedUrl}
            title={title}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="video-iframe"
            onLoad={() => setIsPlaying(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Loading Overlay */}
          {!isPlaying && (
            <motion.div
              className="video-loading"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="loading-crystal">
                <motion.div
                  className="crystal-shape crystal-hexagon"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
              <span className="loading-text text-caption">Chargement...</span>
            </motion.div>
          )}
        </div>

        {/* Floating Particles */}
        <div className="video-particles">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="video-particle"
              animate={{
                y: [-20, -40, -20],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 2) * 60}%`
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Performance Stats */}
      <motion.div
        className="video-stats"
        variants={childVariants}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="stats-grid">
          <div className="stat-item glass-effect">
            <div className="stat-crystal">
              <div className="crystal-shape crystal-triangle"></div>
            </div>
            <span className="stat-value text-title">4K</span>
            <span className="stat-label text-caption">Qualité Ultra HD</span>
          </div>
          <div className="stat-item glass-effect">
            <div className="stat-crystal">
              <div className="crystal-shape crystal-hexagon"></div>
            </div>
            <span className="stat-value text-title">7.1</span>
            <span className="stat-label text-caption">Audio Surround</span>
          </div>
          <div className="stat-item glass-effect">
            <div className="stat-crystal">
              <div className="crystal-shape crystal-diamond"></div>
            </div>
            <span className="stat-value text-title">Studio</span>
            <span className="stat-label text-caption">Enregistrement</span>
          </div>
        </div>
      </motion.div>

      <style>{`
        .crystalline-video-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: var(--space-xl) var(--space-md);
        }

        .video-background-crystals {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .background-crystal {
          position: absolute;
          opacity: 0.1;
        }

        .crystal-1 {
          top: 10%;
          left: 5%;
          width: 60px;
          height: 60px;
        }

        .crystal-2 {
          top: 70%;
          right: 10%;
          width: 80px;
          height: 80px;
        }

        .crystal-3 {
          bottom: 20%;
          left: 15%;
          width: 50px;
          height: 50px;
        }

        .video-header {
          text-align: center;
          margin-bottom: var(--space-lg);
          position: relative;
          z-index: 1;
        }

        .header-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        .decoration-line {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg,
            transparent 0%,
            var(--crystal-primary) 50%,
            transparent 100%);
          transform-origin: center;
        }

        .header-crystal {
          width: 20px;
          height: 20px;
          animation: crystal-pulse 2s ease-in-out infinite;
        }

        .video-title {
          margin-bottom: var(--space-sm);
          background: linear-gradient(135deg,
            var(--crystal-primary) 0%,
            var(--crystal-light) 50%,
            var(--geometric-purple) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .video-description {
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.85;
          line-height: 1.7;
        }

        .crystalline-video-frame {
          position: relative;
          border-radius: 24px;
          padding: var(--space-md);
          margin: var(--space-lg) 0;
          transform-style: preserve-3d;
          overflow: hidden;
        }

        .prismatic-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          overflow: hidden;
          z-index: 1;
        }

        .border-segment {
          position: absolute;
          background: linear-gradient(45deg,
            var(--crystal-primary),
            var(--crystal-light),
            var(--geometric-purple));
          opacity: 0.6;
        }

        .segment-1 {
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg,
            var(--crystal-primary) 0%,
            var(--crystal-light) 100%);
        }

        .segment-2 {
          top: 0;
          right: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg,
            var(--crystal-light) 0%,
            var(--geometric-purple) 100%);
        }

        .segment-3 {
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(270deg,
            var(--geometric-purple) 0%,
            var(--crystal-primary) 100%);
        }

        .segment-4 {
          top: 0;
          left: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(0deg,
            var(--crystal-primary) 0%,
            var(--crystal-light) 100%);
        }

        .corner-crystals {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          pointer-events: none;
        }

        .corner-crystal {
          position: absolute;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .top-left {
          top: -10px;
          left: -10px;
        }

        .top-right {
          top: -10px;
          right: -10px;
        }

        .bottom-left {
          bottom: -10px;
          left: -10px;
        }

        .bottom-right {
          bottom: -10px;
          right: -10px;
        }

        .corner-crystal .crystal-shape {
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }

        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
          border-radius: 16px;
          background: #000;
          z-index: 3;
        }

        .video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 16px;
        }

        .video-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          background: rgba(0, 17, 34, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          z-index: 4;
        }

        .loading-crystal {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-text {
          opacity: 0.8;
        }

        .video-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .video-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle,
            var(--crystal-primary) 0%,
            transparent 70%);
          border-radius: 50%;
        }

        .video-stats {
          margin-top: var(--space-lg);
          position: relative;
          z-index: 1;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
          max-width: 600px;
          margin: 0 auto;
        }

        .stat-item {
          padding: var(--space-md);
          border-radius: 16px;
          text-align: center;
          position: relative;
          transition: all var(--timing-medium) ease;
        }

        .stat-item:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
        }

        .stat-crystal {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-crystal .crystal-shape {
          animation: geometric-spin 8s linear infinite;
          opacity: 0.7;
        }

        .stat-value {
          display: block;
          margin-bottom: var(--space-xs);
          color: var(--crystal-accent);
        }

        .stat-label {
          opacity: 0.7;
        }

        .video-error {
          text-align: center;
          padding: var(--space-xl);
          border-radius: 20px;
          position: relative;
          max-width: 500px;
          margin: 0 auto;
        }

        .error-crystal {
          position: absolute;
          top: -15px;
          right: -15px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error-title {
          color: #ff6b6b;
          margin-bottom: var(--space-sm);
        }

        @media (max-width: 768px) {
          .crystalline-video-container {
            padding: var(--space-lg) var(--space-sm);
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: var(--space-sm);
          }

          .decoration-line {
            width: 40px;
          }

          .background-crystal {
            transform: scale(0.7);
          }
        }

        @media (max-width: 480px) {
          .crystalline-video-frame {
            padding: var(--space-sm);
          }

          .stat-item {
            padding: var(--space-sm);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default CrystallineVideoPlayer;
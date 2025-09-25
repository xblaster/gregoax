import React, { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import ParticleSystem from './components/ParticleSystem';
import CrystallineNavigation from './components/CrystallineNavigation';
import CrystallineVideoPlayer from './components/CrystallineVideoPlayer';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import './App.css';

const App: React.FC = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax transforms for different layers
  const heroParallax = useTransform(scrollY, [0, 800], [0, -200]);
  const aboutParallax = useTransform(scrollY, [400, 1200], [0, -100]);
  const musicParallax = useTransform(scrollY, [800, 1600], [0, -150]);

  const navigationSections = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À Propos' },
    { id: 'music', label: 'Musique' },
    { id: 'videos', label: 'Vidéos' }
  ];


  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div ref={containerRef} className="crystalline-app">
      <div className="crystal-ground">
        <div className="mobile-crystal crystal-floating-1"></div>
        <div className="mobile-crystal crystal-floating-2"></div>
        <div className="mobile-crystal crystal-floating-3"></div>
        <div className="mobile-crystal crystal-floating-4"></div>
        <div className="mobile-crystal crystal-floating-5"></div>
        <div className="mobile-crystal crystal-floating-6"></div>
        <div className="mobile-crystal crystal-floating-7"></div>
        <div className="mobile-crystal crystal-floating-8"></div>
      </div>
      <ScrollProgressIndicator />
      <Suspense fallback={<CrystallineLoader />}>
        <ParticleSystem />
      </Suspense>
      <CrystallineNavigation sections={navigationSections} />

      {/* Hero Section */}
      <motion.section
        id="home"
        className="hero-section"
        style={{ y: heroParallax }}
      >
        <div className="hero-background">
          <div className="crystal-formations">
            <div className="crystal-shape crystal-hexagon formation-1"></div>
            <div className="crystal-shape crystal-diamond formation-2"></div>
            <div className="crystal-shape crystal-triangle formation-3"></div>
            <div className="crystal-shape crystal-hexagon formation-4"></div>
            <div className="crystal-shape crystal-diamond formation-5"></div>
          </div>
        </div>

        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.h1
              className="text-display hero-title"
              variants={fadeInUp}
            >
              Greg'Oax
            </motion.h1>
            <motion.p
              className="hero-subtitle text-headline"
              variants={fadeInUp}
            >
              Virtuose du Piano Classique
            </motion.p>
            <motion.p
              className="hero-description text-body"
              variants={fadeInUp}
            >
              Découvrez l'univers musical extraordinaire de Greg'Oax,
              où la technique cristalline rencontre l'émotion pure dans
              des performances qui transcendent les frontières de l'art pianistique.
            </motion.p>
            <motion.div
              className="hero-cta"
              variants={fadeInUp}
            >
              <button
                className="cta-button primary-cta hover-lift"
                onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Découvrir la Musique</span>
                <div className="button-crystal"></div>
              </button>
              <button
                className="cta-button secondary-cta hover-lift"
                onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Voir les Performances</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-scroll-indicator">
          <motion.div
            className="scroll-crystal"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="crystal-shape crystal-diamond"></div>
          </motion.div>
          <span className="scroll-text text-caption">Scroll pour explorer</span>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="about-section"
        style={{ y: aboutParallax }}
      >
        <AboutContent />
      </motion.section>

      {/* Music Section */}
      <motion.section
        id="music"
        className="music-section"
        style={{ y: musicParallax }}
      >
        <MusicContent />
      </motion.section>

      {/* Videos Section */}
      <section id="videos" className="videos-section">
        <VideosContent />
      </section>
    </div>
  );
};

// About Section Component
const AboutContent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="section-container">
      <motion.div
        className="section-content"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="section-header">
          <h2 className="text-headline section-title">À Propos de Greg'Oax</h2>
          <div className="section-decoration">
            <div className="crystal-shape crystal-hexagon"></div>
          </div>
        </div>

        <div className="about-grid">
          <motion.div
            className="about-card glass-effect hover-lift"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-crystal">
              <div className="crystal-shape crystal-triangle"></div>
            </div>
            <h3 className="text-title">Formation Classique</h3>
            <p className="text-body">
              Formé dans les plus prestigieux conservatoires européens,
              Greg'Oax maîtrise le répertoire classique avec une précision technique
              et une sensibilité artistique remarquables.
            </p>
          </motion.div>

          <motion.div
            className="about-card glass-effect hover-lift"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="card-crystal">
              <div className="crystal-shape crystal-diamond"></div>
            </div>
            <h3 className="text-title">Innovation Artistique</h3>
            <p className="text-body">
              Ses interprétations uniques allient tradition et modernité,
              créant des performances qui résonnent avec les audiences
              contemporaines tout en respectant l'héritage musical.
            </p>
          </motion.div>

          <motion.div
            className="about-card glass-effect hover-lift wide-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="card-crystal">
              <div className="crystal-shape crystal-hexagon"></div>
            </div>
            <h3 className="text-title">Reconnaissance Internationale</h3>
            <p className="text-body">
              Lauréat de nombreux concours internationaux, Greg'Oax se produit
              régulièrement dans les plus grandes salles de concert du monde,
              partageant sa passion pour la musique avec des audiences diversifiées.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Music Section Component
const MusicContent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="section-container">
      <motion.div
        className="section-content"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="section-header">
          <h2 className="text-headline section-title">Univers Musical</h2>
          <div className="section-decoration">
            <div className="crystal-shape crystal-diamond"></div>
          </div>
        </div>

        <div className="music-grid">
          <motion.div
            className="music-category glass-effect hover-lift"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="category-crystal">
              <div className="crystal-shape crystal-hexagon"></div>
            </div>
            <h3 className="text-title">Répertoire Classique</h3>
            <p className="text-body">
              Bach, Mozart, Chopin, Debussy - une exploration profonde des maîtres
              qui ont défini l'art pianistique à travers les siècles.
            </p>
            <div className="music-visualization">
              <div className="sound-wave"></div>
              <div className="sound-wave"></div>
              <div className="sound-wave"></div>
            </div>
          </motion.div>

          <motion.div
            className="music-category glass-effect hover-lift"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="category-crystal">
              <div className="crystal-shape crystal-triangle"></div>
            </div>
            <h3 className="text-title">Créations Contemporaines</h3>
            <p className="text-body">
              Collaboration avec des compositeurs modernes pour créer des œuvres
              qui repoussent les limites de l'expression pianistique.
            </p>
            <div className="music-visualization">
              <div className="sound-wave"></div>
              <div className="sound-wave"></div>
              <div className="sound-wave"></div>
            </div>
          </motion.div>
        </div>

        <div className="streaming-integration">
          <p className="text-body">
            Écoutez les enregistrements de Greg'Oax sur toutes les plateformes de streaming musical.
          </p>
          <div className="streaming-placeholder">
            <div className="crystal-border">
              <div className="streaming-content">
                <div className="crystal-shape crystal-diamond streaming-icon"></div>
                <span className="text-caption">Intégration Spotify à venir</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Videos Section Component
const VideosContent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <div ref={ref} className="featured-video-container">
      <motion.div
        className="section-content"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
          <motion.h2
            className="text-display section-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              textAlign: 'center',
              marginBottom: 'var(--space-md)',
              textShadow: '0 0 40px rgba(121, 134, 203, 0.4)'
            }}
          >
            Performance Exclusive
          </motion.h2>
          <motion.p
            className="text-body"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto var(--space-lg)',
              fontSize: '1.1rem',
              opacity: 0.9
            }}
          >
            Découvrez l'art pianistique de Greg'Oax dans cette performance captivante
            qui révèle toute sa maîtrise technique et sa sensibilité musicale.
          </motion.p>
          <div className="section-decoration">
            <motion.div
              className="crystal-shape crystal-triangle"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </div>
        </div>

        <motion.div
          className="video-hero-wrapper"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <CrystallineVideoPlayer
            videoId="59cWCKekUgM"
            title="Greg'Oax - Virtuosité Pianistique"
            description="Une interprétation magistrale qui transcende la technique pour toucher l'âme. Greg'Oax révèle ici toute la profondeur de son art dans une performance inoubliable."
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

// Loading Component
const CrystallineLoader: React.FC = () => {
  return (
    <div className="crystalline-loader">
      <div className="loader-crystals">
        <motion.div
          className="crystal-shape crystal-hexagon loader-crystal"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="crystal-shape crystal-diamond loader-crystal"
          animate={{ rotate: -360, scale: [1, 0.8, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
        <motion.div
          className="crystal-shape crystal-triangle loader-crystal"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }}
        />
      </div>
      <motion.p
        className="loader-text text-caption"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Initialisation de l'univers cristallin...
      </motion.p>

      <style>{`
        .crystalline-loader {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg-space);
          z-index: var(--z-overlay);
          gap: var(--space-lg);
        }

        .loader-crystals {
          display: flex;
          gap: var(--space-md);
          align-items: center;
        }

        .loader-crystal {
          width: 40px;
          height: 40px;
          opacity: 0.8;
        }

        .loader-text {
          text-align: center;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default App;
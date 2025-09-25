import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface NavigationProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
}

const CrystallineNavigation: React.FC<NavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transform values for parallax effects
  const headerOpacity = useTransform(scrollY, [0, 100], [0.9, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [10, 20]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 200;

      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop;
        const height = section.clientHeight;
        const id = section.getAttribute('id') || '';

        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="crystalline-nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: `blur(${headerBlur}px)`,
          WebkitBackdropFilter: `blur(${headerBlur}px)`,
          background: `linear-gradient(135deg,
            rgba(0, 17, 34, ${headerOpacity}) 0%,
            rgba(0, 61, 77, ${typeof headerOpacity === 'number' ? headerOpacity * 0.8 : 0.76}) 100%)`,
          borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
        }}
      >
        <nav className="nav-container">
          {/* Logo/Brand */}
          <motion.div
            className="nav-brand"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="brand-crystal">
              <div className="crystal-shape crystal-diamond"></div>
            </div>
            <span className="brand-text text-headline">Stella Crescendo</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-only">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => scrollToSection(section.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="link-text">{section.label}</span>
                <div className="link-crystal"></div>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="mobile-menu-toggle mobile-only"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.button>
        </nav>

        {/* Geometric Decoration */}
        <div className="nav-decoration">
          <div className="crystal-shape crystal-hexagon" style={{ left: '10%', animationDelay: '0s' }}></div>
          <div className="crystal-shape crystal-triangle" style={{ right: '15%', animationDelay: '2s' }}></div>
          <div className="crystal-shape crystal-diamond" style={{ left: '70%', animationDelay: '1s' }}></div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="mobile-menu-overlay"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          scale: isMenuOpen ? 1 : 0.9,
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="mobile-menu-content glass-effect">
          <div className="mobile-menu-header">
            <h2 className="text-title">Navigation</h2>
            <button
              className="close-button"
              onClick={() => setIsMenuOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="mobile-menu-links">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                className={`mobile-nav-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => scrollToSection(section.id)}
                initial={{ opacity: 0, x: -30 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -30
                }}
                transition={{ duration: 0.3, delay: isMenuOpen ? index * 0.1 : 0 }}
              >
                <div className="mobile-link-crystal"></div>
                <span className="text-body">{section.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        .crystalline-nav {
          padding: 1rem 0;
          transition: all 0.3s ease;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
          position: relative;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
        }

        .brand-crystal {
          position: relative;
          width: 40px;
          height: 40px;
        }

        .brand-crystal .crystal-diamond {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 30px;
          height: 30px;
          animation: geometric-spin 8s linear infinite;
        }

        .brand-text {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--crystal-primary), var(--geometric-purple));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          position: relative;
          background: none;
          border: none;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          border-radius: 8px;
          overflow: hidden;
        }

        .nav-link:hover {
          background: rgba(0, 212, 255, 0.1);
          transform: translateY(-2px);
        }

        .nav-link.active {
          background: linear-gradient(135deg,
            rgba(0, 212, 255, 0.2) 0%,
            rgba(138, 43, 226, 0.1) 100%);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
        }

        .link-text {
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--ice-blue);
          letter-spacing: 0.02em;
          position: relative;
          z-index: 2;
        }

        .link-crystal {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 8px;
          height: 8px;
          background: var(--crystal-primary);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .nav-link:hover .link-crystal,
        .nav-link.active .link-crystal {
          opacity: 1;
          transform: scale(1.2);
        }

        .mobile-menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hamburger span {
          width: 25px;
          height: 2px;
          background: var(--crystal-primary);
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 200;
          background: rgba(0, 17, 34, 0.9);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-content {
          max-width: 90%;
          width: 400px;
          padding: 2rem;
          text-align: center;
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 212, 255, 0.2);
        }

        .close-button {
          background: none;
          border: none;
          color: var(--crystal-primary);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          background: rgba(0, 212, 255, 0.1);
          transform: rotate(90deg);
        }

        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
          text-align: left;
        }

        .mobile-nav-link:hover {
          background: rgba(0, 212, 255, 0.1);
          transform: translateX(10px);
        }

        .mobile-nav-link.active {
          background: linear-gradient(135deg,
            rgba(0, 212, 255, 0.2) 0%,
            rgba(138, 43, 226, 0.1) 100%);
        }

        .mobile-link-crystal {
          width: 12px;
          height: 12px;
          background: var(--crystal-primary);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          flex-shrink: 0;
        }

        .nav-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .nav-decoration .crystal-shape {
          animation: crystalline-float 6s ease-in-out infinite;
          opacity: 0.3;
        }

        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }

          .mobile-only {
            display: block;
          }

          .nav-container {
            padding: 0 1rem;
          }

          .brand-text {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
};

export default CrystallineNavigation;
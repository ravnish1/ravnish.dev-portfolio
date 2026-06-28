/**
 * Floating CTA Component
 * A sticky floating button that appears after a delay, 
 * directing users to the contact section.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay of 3 seconds so it doesn't compete with the preloader
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 9998 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/drop-message" className="floating-cta-btn">
            <span className="floating-cta-text">LET'S TALK</span>
            <FiArrowRight className="floating-cta-icon" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;

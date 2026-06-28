/**
 * Preloader Component
 * Cinematic Batman-style logo intro with split screen reveal.
 */
import { useEffect, useState } from 'react';

const Preloader = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [phase, setPhase] = useState(0); 
  // Phase 0: Checking / Initial
  // Phase 1: Entrance + Hold
  // Phase 2: Split Reveal
  // Phase 3: Cleanup / Unmounted

  useEffect(() => {
    setIsMounted(true);
    const hasShown = sessionStorage.getItem('preloader_v2_shown');
    
    if (!hasShown) {
      setPhase(1);
      
      // Trigger split at 1400ms
      const splitTimer = setTimeout(() => {
        setPhase(2);
      }, 1400);

      // Cleanup at 2000ms
      const cleanupTimer = setTimeout(() => {
        setPhase(3);
        sessionStorage.setItem('preloader_v2_shown', 'true');
      }, 2000);

      return () => {
        clearTimeout(splitTimer);
        clearTimeout(cleanupTimer);
      };
    } else {
      setPhase(3);
    }
  }, []);

  if (!isMounted || phase === 0 || phase === 3) return null;

  const isSplit = phase === 2;

  return (
    <>
      {/* Split Panels */}
      <div className={`preloader-panel preloader-top ${isSplit ? 'split' : ''}`} />
      <div className={`preloader-panel preloader-bottom ${isSplit ? 'split' : ''}`} />

      {/* Logo Wrapper */}
      <div className={`preloader-logo-wrapper ${isSplit ? 'hidden' : ''}`}>
        <img 
          src="/bat-logo.svg" 
          alt="logo" 
          className="preloader-logo" 
        />
      </div>
    </>
  );
};

export default Preloader;

import React, { useEffect } from 'react';

const ParallaxBackground = () => {
  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.scrollY;
      const parallaxBg = document.querySelector('.parallax-bg');
      if (parallaxBg) {
        // Use translate3d to force GPU hardware acceleration
        parallaxBg.style.transform = `translate3d(0, ${-scrolled * 0.2}px, 0)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="parallax-bg">
        <video 
          className="parallax-video" 
          src="/bg.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
        ></video>
      </div>
      <div className="parallax-overlay"></div>
    </>
  );
};

export default ParallaxBackground;

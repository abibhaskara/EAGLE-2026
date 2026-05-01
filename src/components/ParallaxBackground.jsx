import React, { useEffect } from 'react';

const ParallaxBackground = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxBg = document.querySelector('.parallax-bg');
      if (parallaxBg) {
        // Move the background UP slightly based on scroll position (slower than foreground)
        parallaxBg.style.transform = `translateY(${-scrolled * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="parallax-bg"></div>
      <div className="parallax-overlay"></div>
    </>
  );
};

export default ParallaxBackground;

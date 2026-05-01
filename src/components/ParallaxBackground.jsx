import React, { useEffect } from 'react';

const ParallaxBackground = () => {
  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.scrollY;
      const parallaxBg = document.querySelector('.parallax-bg');
      const video = document.querySelector('.parallax-video');
      
      if (parallaxBg && video) {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const videoHeight = video.getBoundingClientRect().height;
        
        // Calculate how much extra video height we have beyond the screen
        let maxTranslate = videoHeight - window.innerHeight;
        if (maxTranslate < 0) maxTranslate = 0; // Prevent upward translation if video is too short
        
        // Proportional translate: reaches exactly the bottom of the video at the bottom of the page
        const translateY = (scrolled / maxScroll) * maxTranslate;
        
        // Use translate3d to force GPU hardware acceleration
        parallaxBg.style.transform = `translate3d(0, ${-translateY}px, 0)`;
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

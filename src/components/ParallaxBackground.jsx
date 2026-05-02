import React, { useEffect, useRef } from 'react';

const ParallaxBackground = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let videoHeight = 0;
    let maxScroll = 0;
    let maxTranslate = 0;

    const updateMeasurements = () => {
      if (videoRef.current) {
        videoHeight = videoRef.current.offsetHeight;
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        maxTranslate = Math.max(0, videoHeight - window.innerHeight);
      }
    };

    const updateParallax = () => {
      const scrolled = window.scrollY;
      if (containerRef.current && maxScroll > 0) {
        const translateY = (scrolled / maxScroll) * maxTranslate;
        containerRef.current.style.transform = `translate3d(0, ${-translateY}px, 0)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    const handleResize = () => {
      updateMeasurements();
      updateParallax();
    };

    // Initial measurements after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      updateMeasurements();
      updateParallax();
    }, 500);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="parallax-bg" ref={containerRef}>
        <video 
          ref={videoRef}
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

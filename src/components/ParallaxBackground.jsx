import React, { useEffect, useRef } from 'react';

const ParallaxBackground = ({ animateIn }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let videoHeight = 0;
    let maxScroll = 0;
    let maxTranslate = 0;
    let lastWidth = window.innerWidth;

    const updateMeasurements = () => {
      if (videoRef.current) {
        videoHeight = videoRef.current.offsetHeight;
        // Use document.body to get the most accurate content height
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        maxTranslate = Math.max(0, videoHeight - window.innerHeight);
      }
    };

    const updateParallax = () => {
      // Re-read scroll height just in case, but keep it performant
      const scrolled = Math.max(0, Math.min(window.scrollY, maxScroll));
      
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
      lastWidth = window.innerWidth;
    };

    // Use ResizeObserver to detect any height changes in the document (reveal animations, etc.)
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    
    resizeObserver.observe(document.body);

    // Initial measurements after a short delay
    const timer = setTimeout(handleResize, 500);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="parallax-bg" ref={containerRef}>
        <video 
          ref={videoRef}
          className={`parallax-video${animateIn ? ' bg-zoom-out' : ''}`}
          src="/bg.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          onLoadedMetadata={() => {
            const video = videoRef.current;
            if (video) {
              const videoHeight = video.offsetHeight;
              const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
              const maxTranslate = Math.max(0, videoHeight - window.innerHeight);
              // Store these if needed, but the effect uses local variables in the hook closure.
              // Actually the hook closure variables won't be updated this way easily.
              // I should use a shared object or just dispatch a resize event.
              window.dispatchEvent(new Event('resize'));
            }
          }}
        ></video>
      </div>
      <div className="parallax-overlay"></div>
    </>
  );
};

export default ParallaxBackground;

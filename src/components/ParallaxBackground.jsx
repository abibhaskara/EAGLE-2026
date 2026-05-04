/**
 * ────────────────────────────────────────────────────────────
 * [ DESIGN & DEVELOPMENT ]
 * Crafted with passion by Abi Bhaskara
 * Discover more: https://abibhaskara.com
 * ────────────────────────────────────────────────────────────
 */

import React, { useEffect, useRef } from 'react';

const ParallaxBackground = ({ animateIn }) => {
  const moverRef = useRef(null);
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
      const scrolled = Math.max(0, Math.min(window.scrollY, maxScroll));
      if (moverRef.current && maxScroll > 0) {
        const translateY = (scrolled / maxScroll) * maxTranslate;
        moverRef.current.style.transform = `translate3d(0, ${-translateY}px, 0)`;
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

    const resizeObserver = new ResizeObserver(() => {
      const timeout = setTimeout(handleResize, 100);
      return () => clearTimeout(timeout);
    });
    
    resizeObserver.observe(document.body);
    const timer = setTimeout(handleResize, 500);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', handleResize);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (video) {
        video.removeEventListener('loadedmetadata', handleResize);
      }
    };
  }, []);

  return (
    <>
      <div className={`parallax-bg${animateIn ? ' visible' : ''}`}>
        <div ref={moverRef} style={{ width: '100%', height: '100%', willChange: 'transform' }}>
          <video 
            ref={videoRef}
            className={`parallax-video${animateIn ? ' bg-zoom-out' : ''}`}
            src="/bg.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="metadata"
          ></video>
        </div>
      </div>
      <div className="parallax-overlay"></div>
    </>
  );
};

export default ParallaxBackground;

/**
 * ────────────────────────────────────────────────────────────
 * [ DESIGN & DEVELOPMENT ]
 * Crafted with passion by Abi Bhaskara
 * Discover more: https://abibhaskara.com
 * ────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import OpeningAnimation from './components/OpeningAnimation';
import './components/OpeningAnimation.css';
import BackgroundStars from './components/BackgroundStars';
import ParallaxBackground from './components/ParallaxBackground';
import ScrollProgress from './components/ScrollProgress';

const MainCard = React.lazy(() => import('./pages/MainCard'));

function App() {
  const [showOpening, setShowOpening] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const audio = audioRef.current;

    const tryPlayAudio = () => {
      if (!audio) return;
      audio.play().catch(e => {});
    };

    const handleVisibilityChange = () => {
      if (!audio) return;
      if (document.visibilityState === 'hidden') {
        audio.pause();
      } else {
        tryPlayAudio();
      }
    };

    const handleFirstInteraction = () => {
      tryPlayAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    if (audio) {
      audio.volume = 0.5;
      tryPlayAudio();
      document.addEventListener('visibilitychange', handleVisibilityChange);
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);
    }

    return () => {
      lenis.destroy();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <audio ref={audioRef} src="/bgmusic.mp3" loop preload="none" />
      <BackgroundStars />
      <ParallaxBackground animateIn={!showOpening} />

      {showOpening && (
        <OpeningAnimation isActive={showOpening} onComplete={() => setShowOpening(false)} />
      )}

      <div className={`app-container${!showOpening ? ' fade-in' : ''}`}>
        <div className="content-wrapper">
          <React.Suspense fallback={null}>
            <MainCard openingDone={!showOpening} />
          </React.Suspense>
        </div>
      </div>
    </>
  );
}

export default App;

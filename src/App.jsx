import React, { useState, useEffect, useRef } from 'react';
import OpeningAnimation from './components/OpeningAnimation';
import BackgroundStars from './components/BackgroundStars';
import ParallaxBackground from './components/ParallaxBackground';
import MainCard from './pages/MainCard';

function App() {
  const [showOpening, setShowOpening] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Audio Logic
    const audio = audioRef.current;
    
    const tryPlayAudio = () => {
      if (!audio) return;
      audio.play().catch(e => console.log("Play prevented by browser:", e));
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
      // Remove the listeners once interacted so it doesn't try to play on every click
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    if (audio) {
      audio.volume = 0.5;
      tryPlayAudio();
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Safari and strict browsers need a user interaction to start audio.
      // We listen for the first click or touch to trigger playback.
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/bgmusic.webm" loop />
      <BackgroundStars />
      <ParallaxBackground />
      
      {showOpening && (
        <OpeningAnimation isActive={showOpening} onComplete={() => setShowOpening(false)} />
      )}
      
      <div className="app-container fade-in">
        <MainCard />
      </div>
    </>
  );
}

export default App;

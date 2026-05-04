/**
 * ────────────────────────────────────────────────────────────
 * [ DESIGN & DEVELOPMENT ]
 * Crafted with passion by Abi Bhaskara
 * Discover more: https://abibhaskara.com
 * ────────────────────────────────────────────────────────────
 */

import React from 'react';
import './LinkButton.css';

const LinkButton = ({ title, url }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const audio = new Audio('/clicksfx.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
    
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 200);
  };

  return (
    <a 
      href={url} 
      className="fantasy-button" 
      onClick={handleClick}
    >
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>
      {title}
    </a>
  );
};

export default LinkButton;

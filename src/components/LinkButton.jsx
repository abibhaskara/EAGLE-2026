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
  const handleClick = () => {
    const audio = new Audio('/clicksfx.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  return (
    <a 
      href={url} 
      className="fantasy-button" 
      target="_blank" 
      rel="noopener noreferrer"
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

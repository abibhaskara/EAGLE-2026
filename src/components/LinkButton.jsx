import React from 'react';
import './LinkButton.css';

const LinkButton = ({ title, url }) => {
  return (
    <a href={url} className="link-button-wrapper" target="_blank" rel="noopener noreferrer">
      <div className="link-button-inner">
        <span className="link-button-text">{title}</span>
        
        {/* Decorative elements to match dark fantasy UI */}
        <div className="deco-corner top-left"></div>
        <div className="deco-corner top-right"></div>
        <div className="deco-corner bottom-left"></div>
        <div className="deco-corner bottom-right"></div>
        <div className="deco-edge top-edge"></div>
        <div className="deco-edge bottom-edge"></div>
      </div>
    </a>
  );
};

export default LinkButton;

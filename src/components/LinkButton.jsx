import React from 'react';
import './LinkButton.css';

const LinkButton = ({ title, url }) => {
  return (
    <a href={url} className="fantasy-button" target="_blank" rel="noopener noreferrer">
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>
      {title}
    </a>
  );
};

export default LinkButton;

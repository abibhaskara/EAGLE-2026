import React, { useEffect } from 'react';
import LinkButton from '../components/LinkButton';
import './MainCard.css';

const MainCard = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="main-card">
      <div className="profile-section reveal">
        <div className="profile-image-container">
          <img src="/logo.webp" alt="Profile" className="profile-image" />
          <div className="profile-glow"></div>
        </div>
        <h1 className="main-title">EAGLE 2026</h1>
        <p className="main-desc">Annual English Competition held by Smansa Debating Community for Junior High Schoolers Around Bali.</p>
      </div>

      <div className="text-section reveal">
        <h2 className="section-title">What is EAGLE?</h2>
        <p className="section-desc">EAGLE (Educating Active Generation by Learning English) is an annual English competition organized by Smansa Debating Community for junior high school students around Bali. EAGLE Competition includes four competition categories: Debate Competition, Speech Competition, Story Telling Competition, and News Casting Competition.</p>
      </div>

      <div className="text-section reveal grand-theme-section">
        <h2 className="section-title">EAGLE 2026 Grand Theme</h2>
        <p className="grand-theme-quote"><em>Let Your Truth Fly On The Wings of Fantasy</em></p>
        <p className="section-desc">Harnessing the power of creative imagination to liberate authentic voices, this theme empowers participants to transcend the limits of reality and fearlessly express their inner truths.</p>
      </div>

      <div className="links-section reveal">
        <LinkButton title="EAGLE 2026 Registration Link" url="#" />
        <LinkButton title="EAGLE 2026 Guidebook" url="#" />
      </div>

      <div className="contact-section reveal">

        <p className="section-desc" style={{ marginBottom: '20px', textAlign: 'center' }}>For further information, be sure to reach out the contact person below:</p>
        <LinkButton title="cp 1" url="#" />
        <LinkButton title="cp 2" url="#" />

        <p className="section-desc" style={{ marginTop: '30px', marginBottom: '20px', textAlign: 'center' }}>
          You can also reach our email,<br />debatesmansacommunity@gmail.com
        </p>
        <LinkButton title="email" url="mailto:debatesmansacommunity@gmail.com" />
      </div>

      <footer className="footer reveal">
        <p>made with creativity by <a href="https://portfolio.abibhaskara.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>abi bhaskara</a></p>
      </footer>
    </div>
  );
};

export default MainCard;

/**
 * ────────────────────────────────────────────────────────────
 * [ DESIGN & DEVELOPMENT ]
 * Crafted with passion by Abi Bhaskara
 * Discover more: https://abibhaskara.com
 * ────────────────────────────────────────────────────────────
 */

import React, { useEffect } from 'react';
import LinkButton from '../components/LinkButton';
import CountdownTimer from '../components/CountdownTimer';
import './MainCard.css';

const MainCard = React.memo(({ openingDone }) => {
  useEffect(() => {
    if (!openingDone) return;
    const revealElements = Array.from(document.querySelectorAll('.reveal'));
    const belowFold = [];
    const timeouts = [];
    let delay = 200;
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        const t = setTimeout(() => el.classList.add('active'), delay);
        timeouts.push(t);
        delay += 900;
      } else {
        belowFold.push(el);
      }
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('active')) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.12 });
    belowFold.forEach((el) => observer.observe(el));
    return () => {
      timeouts.forEach(t => clearTimeout(t));
      belowFold.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [openingDone]);

  return (
    <div className="main-card">
      <div className="profile-section reveal">
        <div className="profile-image-container">
          <img src="/logo.webp" alt="Profile" className="profile-image" />
          <div className="profile-glow"></div>
        </div>
        <h1 className="main-title">EAGLE 2026</h1>
        <p className="main-desc">Annual English Competition held by Smansa Debating Community for Junior High Schoolers Around Bali.</p>
        <CountdownTimer targetDate="2026-06-25T23:59:00+08:00" />
      </div>

      <div className="text-section reveal">
        <h2 className="section-title">What is EAGLE?</h2>
        <p className="section-desc">EAGLE (Educating Active Generation by Learning English) is an annual English competition organized by Smansa Debating Community for junior high school students around Bali. EAGLE Competition includes four competition categories: Debate Competition, Speech Competition, Story Telling Competition, and News Casting Competition.</p>
      </div>

      <div className="grand-theme-links-section reveal">
        <h2 className="section-title">EAGLE 2026 Grand Theme</h2>
        <p className="grand-theme-quote"><em>Let Your Truth Fly On The Wings of Fantasy</em></p>
        <p className="section-desc">Harnessing the power of creative imagination to liberate authentic voices, this theme empowers participants to transcend the limits of reality and fearlessly express their inner truths.</p>
        <div className="links-group">
          <LinkButton title="EAGLE 2026 Registration Link" url="https://forms.gle/RPio13gSrADoRhvs9" />
          <LinkButton title="EAGLE 2026 Guidebook" url="#" />
        </div>
      </div>

      <div className="contact-section reveal">
        <p className="section-desc" style={{ marginBottom: '20px', textAlign: 'center' }}>For further information, be sure to reach out the contact person below:</p>
        <LinkButton title="cp 1" url="#" />
        <LinkButton title="cp 2" url="#" />
        <p className="section-desc" style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
          You can also reach our email,<br />debatesmansacommunity@gmail.com
        </p>
        <LinkButton title="email" url="mailto:debatesmansacommunity@gmail.com" />
      </div>

      <footer className="footer reveal">
        <p>made with creativity by <a href="https://portfolio.abibhaskara.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>abi bhaskara</a></p>
      </footer>
    </div>
  );
});

export default MainCard;

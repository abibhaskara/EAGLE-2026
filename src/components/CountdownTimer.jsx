/**
 * ────────────────────────────────────────────────────────────
 * [ DESIGN & DEVELOPMENT ]
 * Crafted with passion by Abi Bhaskara
 * Discover more: https://abibhaskara.com
 * ────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
        setIsClosed(false);
      } else {
        setIsClosed(true);
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }) => (
    <div className="time-unit">
      <div className="time-value">{value.toString().padStart(2, '0')}</div>
      <div className="time-label">{label}</div>
    </div>
  );

  return (
    <div className="countdown-container reveal">
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>
      
      <div className="countdown-title">Registration Deadline</div>
      
      {isClosed ? (
        <div className="registration-closed">Registration Closed</div>
      ) : (
        <div className="timer-wrapper">
          <TimeUnit value={timeLeft.days} label="Days" />
          <div className="timer-divider">:</div>
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <div className="timer-divider">:</div>
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <div className="timer-divider">:</div>
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;

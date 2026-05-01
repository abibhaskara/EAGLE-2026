import React, { useEffect, useRef } from 'react';

const BackgroundStars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          speed: Math.random() * 0.05 + 0.01,
          glow: Math.random() > 0.8 // Some stars glow more
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        // Blinking effect
        star.alpha += star.speed;
        if (star.alpha <= 0 || star.alpha >= 1) {
          star.speed = -star.speed;
        }

        if (star.glow) {
          // Simulate glow with a larger transparent circle instead of expensive shadowBlur
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${Math.abs(star.alpha) * 0.3})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        const alphaStr = Math.abs(star.alpha).toFixed(2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alphaStr})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawStars();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="stars-canvas" ref={canvasRef} />;
};

export default BackgroundStars;

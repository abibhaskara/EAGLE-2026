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
      const numStars = Math.floor((canvas.width * canvas.height) / 20000);
      for (let i = 0; i < numStars; i++) {
        const r = Math.random() * 1.5 + 0.5;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: r,
          alpha: Math.random(),
          speed: Math.random() * 0.05 + 0.001,
          glow: Math.random() > 0.9, // Some stars glow more
          parallaxSpeed: r * 1.5 // Stronger parallax effect based on size
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentScrollY = window.scrollY;

      stars.forEach(star => {
        // Blinking effect
        star.alpha += star.speed;
        if (star.alpha <= 0 || star.alpha >= 0.7) {
          star.speed = -star.speed;
        }

        // Apply true parallax logic: scroll offset with wrapping
        const parallaxOffset = currentScrollY * star.parallaxSpeed;
        let drawY = (star.y - parallaxOffset) % canvas.height;
        if (drawY < 0) drawY += canvas.height;

        if (star.glow) {
          // Simulate glow with a larger transparent circle instead of expensive shadowBlur
          ctx.beginPath();
          ctx.arc(star.x, drawY, star.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${Math.abs(star.alpha) * 0.3})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, drawY, star.radius, 0, Math.PI * 2);
        const alphaStr = Math.abs(star.alpha).toFixed(2);
        ctx.fillStyle = `rgba(212, 175, 55, ${alphaStr})`;
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

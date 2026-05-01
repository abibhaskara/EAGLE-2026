import React, { useState, useEffect, useMemo } from 'react';

const OpeningAnimation = ({ isActive, onComplete }) => {
    const [phase, setPhase] = useState(0);

    // Capricorn constellation stars
    const constellationStars = useMemo(() => [
        { x: 20, y: 40, delay: 0 }, { x: 26, y: 42, delay: 0.1 },
        { x: 40, y: 44, delay: 0.2 }, { x: 55, y: 42, delay: 0.3 },
        { x: 75, y: 38, delay: 0.4 }, { x: 82, y: 32, delay: 0.5 },
        { x: 70, y: 50, delay: 0.6 }, { x: 62, y: 62, delay: 0.7 },
        { x: 52, y: 72, delay: 0.8 }, { x: 42, y: 62, delay: 0.9 },
        { x: 30, y: 52, delay: 1.0 },
    ], []);

    const constellationLines = useMemo(() => [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
        [4, 6], [6, 7], [7, 8],
        [0, 10], [10, 9], [9, 8]
    ], []);

    useEffect(() => {
        if (!isActive) return;
        document.body.style.overflow = 'hidden';
        const t1 = setTimeout(() => setPhase(1), 100);
        const t2 = setTimeout(() => setPhase(2), 1000);
        const t3 = setTimeout(() => setPhase(3), 2000);
        const t4 = setTimeout(() => setPhase(4), 5000);
        const t5 = setTimeout(() => onComplete?.(), 6000);
        return () => {
            document.body.style.overflow = '';
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
        };
    }, [isActive, onComplete]);

    if (!isActive) return null;

    return (
        <div 
            style={{ 
                position: 'fixed', inset: 0, zIndex: 200, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                overflow: 'hidden', backgroundColor: 'var(--primary-color)',
                opacity: phase === 4 ? 0 : 1,
                transition: 'opacity 0.5s ease'
            }}
        >
            <div 
                style={{ 
                    position: 'absolute', inset: 0, 
                    background: 'radial-gradient(ellipse at center, #1a2744 0%, #0b0a1a 100%)',
                    opacity: phase >= 3 ? 0.3 : 1,
                    transition: 'opacity 2s ease'
                }}
            />

            {phase >= 1 && constellationStars.map((star, i) => (
                <div key={i} style={{ 
                    position: 'absolute', left: `${star.x}%`, top: `${star.y}%`,
                    transform: 'scale(0)',
                    animation: `popIn 0.5s ease forwards`,
                    animationDelay: `${star.delay}s`
                }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent-gold)', borderRadius: '50%', boxShadow: '0 0 10px rgba(212,175,55,0.8)' }} />
                </div>
            ))}

            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {phase >= 2 && constellationLines.map(([from, to], i) => {
                    const s1 = constellationStars[from];
                    const s2 = constellationStars[to];
                    
                    // We use strokeDasharray and strokeDashoffset to animate line drawing in CSS
                    return (
                        <line key={i} x1={`${s1.x}%`} y1={`${s1.y}%`} x2={`${s2.x}%`} y2={`${s2.y}%`}
                            stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1"
                            strokeDasharray="2000"
                            strokeDashoffset="2000"
                            style={{
                                animation: `drawLine 1s ease forwards`,
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    );
                })}
            </svg>

            <style>{`
                @keyframes popIn {
                    0% { transform: scale(0); }
                    100% { transform: scale(1); }
                }
                @keyframes drawLine {
                    0% { stroke-dashoffset: 2000; }
                    100% { stroke-dashoffset: 0; }
                }
            `}</style>
        </div>
    );
};

export default OpeningAnimation;

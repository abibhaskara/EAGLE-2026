/**
 * ────────────────────────────────────────────────────────────
 * [ DESIGN & DEVELOPMENT ]
 * Crafted with passion by Abi Bhaskara
 * Discover more: https://abibhaskara.com
 * ────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect, useMemo } from 'react';

const OpeningAnimation = ({ isActive, onComplete }) => {
    const [phase, setPhase] = useState(0);

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
        const t4 = setTimeout(() => setPhase(4), 4500);
        const t5 = setTimeout(() => onComplete?.(), 5500);
        return () => {
            document.body.style.overflow = '';
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
        };
    }, [isActive, onComplete]);

    if (!isActive) return null;

    return (
        <div className="opening-container" style={{ opacity: phase === 4 ? 0 : 1 }}>
            <div className="opening-gradient" style={{ opacity: phase >= 3 ? 0.3 : 1 }} />
            {phase >= 1 && constellationStars.map((star, i) => (
                <div key={i} className="star-point" style={{ 
                    left: `${star.x}%`, 
                    top: `${star.y}%`,
                    animationDelay: `${star.delay}s`
                }}>
                    <div className="star-dot" />
                </div>
            ))}
            <svg className="constellation-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                {phase >= 2 && (
                    <path
                        d={constellationLines.map(([from, to]) => {
                            const s1 = constellationStars[from];
                            const s2 = constellationStars[to];
                            return `M ${s1.x},${s1.y} L ${s2.x},${s2.y}`;
                        }).join(' ')}
                        className="constellation-line"
                        style={{ strokeDasharray: '1000', strokeDashoffset: '1000' }}
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                    />
                )}
            </svg>
        </div>
    );
};

export default OpeningAnimation;

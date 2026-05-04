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
        { x: 80, y: 50, delay: 0 },    // 0: Beak Tip
        { x: 72, y: 44, delay: 0.1 },  // 1: Upper Beak
        { x: 62, y: 38, delay: 0.2 },  // 2: Forehead
        { x: 50, y: 35, delay: 0.3 },  // 3: Crown
        { x: 35, y: 42, delay: 0.4 },  // 4: Back of Head
        { x: 30, y: 55, delay: 0.5 },  // 5: Back Neck
        { x: 45, y: 65, delay: 0.6 },  // 6: Throat
        { x: 55, y: 58, delay: 0.7 },  // 7: Jaw
        { x: 70, y: 52, delay: 0.8 },  // 8: Lower Beak
        { x: 62, y: 45, delay: 0.9 },  // 9: Eye
    ], []);

    const constellationLines = useMemo(() => [
        [0, 1], [1, 2], [2, 3], [3, 4], // Top curve
        [4, 5], [5, 6], [6, 7], [7, 8], // Bottom curve
        [8, 0],                         // Close beak
        [1, 8],                         // Beak base
        [2, 9], [1, 9]                  // Eye highlight
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

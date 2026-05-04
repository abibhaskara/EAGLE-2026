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
        { x: 20, y: 50, delay: 0 },    // 0: Beak Tip
        { x: 28, y: 44, delay: 0.1 },  // 1: Upper Beak
        { x: 38, y: 38, delay: 0.2 },  // 2: Forehead
        { x: 50, y: 35, delay: 0.3 },  // 3: Crown
        { x: 65, y: 33, delay: 0.4 },  // 4: Tuft
        { x: 72, y: 42, delay: 0.5 },  // 5: Back Head
        { x: 75, y: 55, delay: 0.6 },  // 6: Upper Neck
        { x: 70, y: 68, delay: 0.7 },  // 7: Mid Neck
        { x: 55, y: 72, delay: 0.8 },  // 8: Throat
        { x: 45, y: 65, delay: 0.9 },  // 9: Lower Throat
        { x: 40, y: 58, delay: 1.0 },  // 10: Jaw
        { x: 30, y: 52, delay: 1.1 },  // 11: Lower Beak
        { x: 38, y: 45, delay: 1.2 },  // 12: Eye
        { x: 25, y: 48, delay: 1.3 },  // 13: Nostril
    ], []);

    const constellationLines = useMemo(() => [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], // Top silhouette
        [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], // Neck silhouette
        [10, 11], [11, 0],                       // Beak closing
        [1, 11],                                 // Beak base
        [2, 12], [1, 12],                        // Eye focus
        [1, 13]                                  // Detail
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

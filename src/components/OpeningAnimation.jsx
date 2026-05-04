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
        { x: 25, y: 57, delay: 0 },    // 0: Beak Tip
        { x: 23, y: 50, delay: 0.1 },  // 1: Lower Beak
        { x: 33, y: 43, delay: 0.2 },  // 2: Upper Beak Curve
        { x: 47, y: 45, delay: 0.3 },  // 3: Beak Base
        { x: 49, y: 37, delay: 0.4 },  // 4: Eye
        { x: 45, y: 37, delay: 0.5 },  // 5: Monocle L
        { x: 49, y: 33, delay: 0.6 },  // 6: Monocle T
        { x: 53, y: 37, delay: 0.7 },  // 7: Monocle R
        { x: 49, y: 41, delay: 0.8 },  // 8: Monocle B
        { x: 47, y: 27, delay: 0.9 },  // 9: Forehead
        { x: 65, y: 30, delay: 1.0 },  // 10: Crown
        { x: 77, y: 47, delay: 1.1 },  // 11: Back Head
        { x: 73, y: 70, delay: 1.2 },  // 12: Nape
        { x: 55, y: 73, delay: 1.3 },  // 13: Throat
        { x: 50, y: 60, delay: 1.4 },  // 14: Mid Neck
        { x: 40, y: 55, delay: 1.5 },  // 15: Lower Jaw
    ], []);

    const constellationLines = useMemo(() => [
        // Silhouette based on reference
        [0, 1], [1, 2], [2, 9], [9, 10], [10, 11], [11, 12],
        [12, 13], [13, 14], [14, 15], [15, 3], [3, 0],
        // Monocle Detail (Crossing)
        [5, 6], [6, 7], [7, 8], [8, 5],
        // Internal Crossing Structure
        [4, 2], [4, 9], [4, 10], [4, 11], [4, 14], [4, 15],
        [3, 5], [3, 8]
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
            <div className="constellation-wrapper">
                {phase >= 1 && constellationStars.map((star, i) => (
                    <div key={i} className="star-point" style={{ 
                        left: `${star.x}%`, 
                        top: `${star.y}%`,
                        animationDelay: `${star.delay}s`
                    }}>
                        <div className="star-dot" />
                    </div>
                ))}
                <svg className="constellation-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
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
        </div>
    );
};

export default OpeningAnimation;

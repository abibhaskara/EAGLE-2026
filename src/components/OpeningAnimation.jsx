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
        { x: 12, y: 45, delay: 0 },    // 0: Beak Tip
        { x: 20, y: 35, delay: 0.1 },  // 1: Upper Beak
        { x: 28, y: 35, delay: 0.2 },  // 2: Beak Notch
        { x: 40, y: 28, delay: 0.3 },  // 3: Forehead
        { x: 50, y: 25, delay: 0.4 },  // 4: Crown 1
        { x: 60, y: 24, delay: 0.5 },  // 5: Crown 2
        { x: 70, y: 22, delay: 0.6 },  // 6: Tuft 1
        { x: 78, y: 26, delay: 0.7 },  // 7: Tuft 2
        { x: 85, y: 38, delay: 0.8 },  // 8: Back Head
        { x: 88, y: 50, delay: 0.9 },  // 9: Nape 1
        { x: 85, y: 65, delay: 1.0 },  // 10: Nape 2
        { x: 75, y: 78, delay: 1.1 },  // 11: Lower Neck
        { x: 60, y: 85, delay: 1.2 },  // 12: Chest Edge
        { x: 45, y: 82, delay: 1.3 },  // 13: Throat Bottom
        { x: 35, y: 72, delay: 1.4 },  // 14: Mid Throat
        { x: 30, y: 62, delay: 1.5 },  // 15: Jaw Line 1
        { x: 28, y: 52, delay: 1.6 },  // 16: Jaw Line 2
        { x: 22, y: 50, delay: 1.7 },  // 17: Lower Beak Base
        { x: 15, y: 48, delay: 1.8 },  // 18: Lower Beak Tip
        { x: 42, y: 40, delay: 1.9 },  // 19: Eye Center
        { x: 42, y: 38, delay: 2.0 },  // 20: Eye Top
        { x: 42, y: 42, delay: 2.1 },  // 21: Eye Bottom
        { x: 38, y: 40, delay: 2.2 },  // 22: Eye Front
        { x: 46, y: 40, delay: 2.3 },  // 23: Eye Back
        { x: 35, y: 36, delay: 2.4 },  // 24: Brow Front
        { x: 50, y: 36, delay: 2.5 },  // 25: Brow Back
        { x: 18, y: 42, delay: 2.6 },  // 26: Nostril
        { x: 65, y: 55, delay: 2.7 },  // 27: Neck Detail 1
        { x: 55, y: 60, delay: 2.8 },  // 28: Neck Detail 2
    ], []);

    const constellationLines = useMemo(() => [
        [0, 1], [1, 2], [2, 16], // Upper Beak
        [0, 18], [18, 17], [17, 16], // Lower Beak
        [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], // Crown
        [8, 9], [9, 10], [10, 11], [11, 12], // Back Silhouette
        [12, 13], [13, 14], [14, 15], [15, 16], // Throat/Jaw
        [20, 23], [23, 21], [21, 22], [22, 20], // Eye shape
        [24, 25], // Brow
        [27, 8], [27, 28], [28, 14], // Internal neck feathers
        [1, 26] // Nostril
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

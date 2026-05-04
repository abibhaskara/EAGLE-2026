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
        { x: 15, y: 50, delay: 0 },    // 0: Beak Tip
        { x: 25, y: 42, delay: 0.1 },  // 1: Upper Beak
        { x: 35, y: 42, delay: 0.2 },  // 2: Beak Base Top
        { x: 45, y: 35, delay: 0.3 },  // 3: Forehead
        { x: 58, y: 32, delay: 0.4 },  // 4: Crown
        { x: 70, y: 30, delay: 0.5 },  // 5: Tuft
        { x: 82, y: 45, delay: 0.6 },  // 6: Upper Back
        { x: 85, y: 58, delay: 0.7 },  // 7: Nape
        { x: 80, y: 75, delay: 0.8 },  // 8: Lower Neck
        { x: 65, y: 82, delay: 0.9 },  // 9: Chest
        { x: 50, y: 78, delay: 1.0 },  // 10: Mid Throat
        { x: 40, y: 68, delay: 1.1 },  // 11: Lower Throat
        { x: 38, y: 58, delay: 1.2 },  // 12: Jaw
        { x: 30, y: 55, delay: 1.3 },  // 13: Lower Beak Base
        { x: 18, y: 54, delay: 1.4 },  // 14: Lower Beak Tip
        { x: 44, y: 46, delay: 1.5 },  // 15: Eye
        { x: 38, y: 42, delay: 1.6 },  // 16: Brow Front
        { x: 48, y: 42, delay: 1.7 },  // 17: Brow Back
        { x: 22, y: 47, delay: 1.8 },  // 18: Nostril
    ], []);

    const constellationLines = useMemo(() => [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], // Top edge
        [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], // Bottom edge
        [12, 13], [13, 14], [14, 0], // Beak connection
        [1, 13], // Beak separation
        [16, 17], // Brow
        [15, 2], [15, 3], // Eye socket
        [1, 18] // Nostril detail
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

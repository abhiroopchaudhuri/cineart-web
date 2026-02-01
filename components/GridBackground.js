"use client";

import { useEffect, useState } from "react";

export default function GridBackground() {
    const [dots, setDots] = useState([]);

    useEffect(() => {
        // Generate random dots aligned to 40px grid
        const generateDots = () => {
            const newDots = [];
            const numDots = 50;
            const gridSize = 40; // Match background grid size

            // Calculate how many grid cells fit in viewport
            const cols = Math.ceil(window.innerWidth / gridSize);
            const rows = Math.ceil(window.innerHeight / gridSize);

            for (let i = 0; i < numDots; i++) {
                // Random col/row but with padding to avoid edges
                // 40px grid. Skip first 2 and last 2 cols/rows to be safe
                const xGrid = Math.floor(Math.random() * (cols - 4)) + 2;
                const yGrid = Math.floor(Math.random() * (rows - 4)) + 2;

                newDots.push({
                    id: i,
                    x: xGrid * gridSize + 1, // +1px to align with 1px grid line center
                    y: yGrid * gridSize + 1, // +1px to align with 1px grid line center
                    delay: Math.random() * 8,
                    duration: 2 + Math.random() * 3,
                });
            }
            setDots(newDots);
        };

        generateDots();
        window.addEventListener('resize', generateDots);
        return () => window.removeEventListener('resize', generateDots);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {/* Grid - subtler lines */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundSize: '40px 40px',
                    backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
                }}
            />

            {/* Radial fade mask - smoother transition */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: 'black',
                    maskImage: 'radial-gradient(ellipse at center, transparent 0%, black 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 0%, black 80%)'
                }}
            />

            {/* Blue Gradient Blob */}
            <div
                className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)',
                    animation: 'moveBlob1 25s infinite alternate ease-in-out',
                    top: '-20%',
                    left: '-20%',
                }}
            />

            {/* Purple Gradient Blob */}
            <div
                className="absolute w-[700px] h-[700px] rounded-full opacity-20 blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                    animation: 'moveBlob2 30s infinite alternate-reverse ease-in-out',
                    top: '40%',
                    right: '-20%',
                }}
            />

            {/* Green Gradient Blob */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(45, 212, 191, 0.4) 0%, transparent 70%)',
                    animation: 'moveBlob3 28s infinite alternate ease-in-out',
                    bottom: '-20%',
                    left: '30%',
                }}
            />

            {/* Random Dots at grid intersections */}
            {dots.map((dot) => (
                <div
                    key={dot.id}
                    className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
                    style={{
                        left: `${dot.x}px`,
                        top: `${dot.y}px`,
                        opacity: 0,
                        animation: `twinkle ${dot.duration}s infinite ${dot.delay}s ease-in-out`
                    }}
                />
            ))}

            <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes moveBlob1 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20vw, 30vh) scale(1.1); }
          66% { transform: translate(50vw, 10vh) scale(0.9); }
          100% { transform: translate(80vw, 50vh) scale(1.2); }
        }
        @keyframes moveBlob2 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30vw, 20vh) scale(1.1); }
          66% { transform: translate(-50vw, -10vh) scale(0.9); }
          100% { transform: translate(-20vw, 60vh) scale(1.2); }
        }
        @keyframes moveBlob3 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30vw, -20vh) scale(1.2); }
          66% { transform: translate(-20vw, -40vh) scale(0.8); }
          100% { transform: translate(50vw, -20vh) scale(1.1); }
        }
      `}</style>
        </div>
    );
}

import { useEffect, useState } from 'react';
import './ChunkLoader.scss';

export default function QuantumLoader({ message }: { message: string }) {
    const [particles, setParticles] = useState<Array<{ id: number, style: React.CSSProperties }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            style: {
                '--particle-index': i,
                '--total-particles': 12,
                '--hue': i * 30, // 360° color spectrum
                '--animation-delay': `${i * 0.08}s`,
            } as React.CSSProperties
        }));
        setParticles(newParticles);

        return () => setParticles([]);
    }, []);

    return (
        <div className="quantum-loader">
            <div className="quantum-orb">
                {/* Larger centered logo with heartbeat */}
                <div className="logo-container">
                    <img
                        src="/LOGO.png"
                        alt="Loading"
                        className="main-logo"
                    />
                </div>

                {/* Compact quantum particles */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="quantum-particle"
                        style={particle.style}
                    >
                        <div className="particle-light"></div>
                    </div>
                ))}

                {/* Subtle glow effect */}
                <div className="orb-glow"></div>
            </div>

            <div className="loading-message">
                <span className="animated-ellipsis"></span>
            </div>
        </div>
    );
}
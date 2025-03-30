import { useEffect, useState } from 'react';
import './ChunkLoader.scss';

export default function QuantumLoader({ message }: { message: string }) {
    return (
        <div className="quantum-loader">
            <div className="quantum-orb">
                {/* Larger centered logo with heartbeat */}
                <div className="logo-container">
                    <img
                        src="/LOGO.png"
                        alt="Loading"
                        className="main-logo"
                        style={{
                            width: '200px',
                            height: '200px',
                            animation: 'heartbeat 1.5s ease-in-out infinite'
                        }}
                    />
                </div>
            </div>

            <div className="loading-message">
                <span className="animated-ellipsis"></span>
            </div>
        </div>
    );
}
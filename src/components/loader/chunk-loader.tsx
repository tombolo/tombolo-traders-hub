export default function QuantumLoader({ message }: { message: string }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
            background: 'radial-gradient(ellipse at center, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            overflow: 'hidden'
        }}>
            {/* Holographic Grid Background */}
            <div style={{
                position: 'absolute',
                width: '200%',
                height: '200%',
                background: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
                backgroundSize: '40px 40px',
                animation: 'gridMove 20s linear infinite',
                transform: 'rotate(15deg)'
            }}></div>

            {/* Quantum Core */}
            <div style={{
                position: 'relative',
                width: '220px',
                height: '220px',
                marginBottom: '40px'
            }}>
                {/* Energy Pulse Rings */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '2px solid rgba(0, 255, 255, 0.3)',
                    animation: 'pulse 3s ease-out infinite',
                    boxShadow: '0 0 15px cyan'
                }}></div>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 0, 255, 0.3)',
                    animation: 'pulse 3s ease-out infinite',
                    animationDelay: '1s',
                    boxShadow: '0 0 15px magenta'
                }}></div>

                {/* Quantum Particles */}
                {[...Array(12)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: `hsl(${i * 30}, 100%, 70%)`,
                        filter: 'blur(1px)',
                        animation: `orbit ${4 + Math.random() * 3}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                        top: '50%',
                        left: '50%',
                        marginTop: '-6px',
                        marginLeft: '-6px',
                        transformOrigin: `${100 + (i % 2 ? 20 : 40)}px center`,
                        boxShadow: '0 0 10px currentColor'
                    }}></div>
                ))}

                {/* Central Hologram */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    perspective: '1000px'
                }}>
                    <img
                        src="/LOGO.png"
                        alt="Loading"
                        style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'contain',
                            animation: 'hologramFloat 4s ease-in-out infinite',
                            filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.8))'
                        }}
                    />
                </div>
            </div>

            {/* Loading Text */}
            <div style={{
                position: 'relative',
                fontSize: '20px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.9)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}>
                {message}
                <span style={{
                    display: 'inline-block',
                    width: '30px',
                    textAlign: 'left',
                    animation: 'quantumDots 2s infinite steps(4)'
                }}></span>
            </div>

            {/* Binary Rain Effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: -1
            }}>
                {[...Array(30)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        fontSize: '14px',
                        color: `rgba(0, 255, 255, ${Math.random() * 0.3 + 0.1})`,
                        top: '-20px',
                        left: `${Math.random() * 100}%`,
                        animation: `binaryFall ${Math.random() * 5 + 3}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                        fontFamily: 'monospace'
                    }}>
                        {Array.from({ length: 10 }).map((_, j) => (
                            Math.random() > 0.5 ? '1' : '0'
                        )).join(' ')}
                    </div>
                ))}
            </div>

            {/* CSS Animations */}
            <style>
                {`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        
        @keyframes hologramFloat {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          25% { transform: translateY(-15px) rotateY(15deg); }
          50% { transform: translateY(0) rotateY(0deg); }
          75% { transform: translateY(-10px) rotateY(-15deg); }
        }
        
        @keyframes quantumDots {
          0% { content: ''; }
          25% { content: '.'; }
          50% { content: '..'; }
          75% { content: '...'; }
          100% { content: ''; }
        }
        
        @keyframes binaryFall {
          to { transform: translateY(100vh); }
        }
        
        @keyframes gridMove {
          from { transform: rotate(15deg) translateX(0); }
          to { transform: rotate(15deg) translateX(-40px) translateY(-40px); }
        }
        `}
            </style>
        </div>
    );
}
export default function QuantumLoader({ message }: { message: string }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
            background: 'radial-gradient(circle, #f5f7fa 0%, #e4e8ed 100%)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999
        }}>
            {/* Animated Orb Container */}
            <div style={{
                position: 'relative',
                width: '180px',
                height: '180px',
                marginBottom: '30px'
            }}>
                {/* Pulsing Glow */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(100,149,237,0.2) 0%, rgba(100,149,237,0) 70%)',
                    animation: 'pulse 2s ease-in-out infinite',
                    filter: 'blur(5px)'
                }}></div>

                {/* Main Orb */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6495ed 0%, #4169e1 100%)',
                    boxShadow: '0 10px 30px rgba(65, 105, 225, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    {/* Floating Particles */}
                    {[...Array(8)].map((_, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.8)',
                            animation: `orbit ${3 + i * 0.5}s linear infinite`,
                            animationDelay: `${i * 0.2}s`,
                            top: '50%',
                            left: '50%',
                            marginTop: '-4px',
                            marginLeft: '-4px',
                            transformOrigin: `${(i % 2) ? '60px' : '80px'} center`
                        }}></div>
                    ))}

                    {/* Center Logo */}
                    <img
                        src="/LOGO.png"
                        alt="Loading"
                        style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain',
                            animation: 'float 3s ease-in-out infinite',
                            zIndex: 2
                        }}
                    />
                </div>
            </div>

            {/* Loading Message */}
            <div style={{
                fontSize: '18px',
                fontWeight: 500,
                color: '#4169e1',
                marginTop: '20px',
                textAlign: 'center'
            }}>
                {message}
                <span style={{
                    display: 'inline-block',
                    width: '20px',
                    textAlign: 'left',
                    animation: 'dots 1.5s steps(5, end) infinite'
                }}></span>
            </div>

            {/* CSS Animations */}
            <style>
                {`
                @keyframes pulse {
                    0% { transform: scale(0.95); opacity: 0.7; }
                    50% { transform: scale(1.05); opacity: 0.9; }
                    100% { transform: scale(0.95); opacity: 0.7; }
                }
                
                @keyframes orbit {
                    0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
                }
                
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                
                @keyframes dots {
                    0%, 20% { content: '.'; }
                    40% { content: '..'; }
                    60%, 100% { content: '...'; }
                }
                `}
            </style>
        </div>
    );
}
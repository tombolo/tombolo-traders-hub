export default function QuantumLoader({ message }: { message: string }) {
    const isMobile = window.innerWidth < 768;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            overflow: 'hidden',
            padding: isMobile ? '20px' : '0'
        }}>
            {/* Elegant backdrop with subtle pattern */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                opacity: 0.8
            }}></div>

            {/* Sophisticated loading indicator */}
            <div style={{
                position: 'relative',
                width: isMobile ? '120px' : '180px',
                height: isMobile ? '120px' : '180px',
                marginBottom: isMobile ? '24px' : '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Concentric circles with subtle animation */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    animation: 'pulse 4s ease-in-out infinite'
                }}></div>
                <div style={{
                    position: 'absolute',
                    width: '80%',
                    height: '80%',
                    borderRadius: '50%',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    animation: 'pulse 4s ease-in-out infinite 0.5s'
                }}></div>
                <div style={{
                    position: 'absolute',
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    border: '1px solid rgba(167, 139, 250, 0.4)',
                    animation: 'pulse 4s ease-in-out infinite 1s'
                }}></div>

                {/* Central logo with refined animation */}
                <div style={{
                    position: 'relative',
                    width: isMobile ? '50px' : '70px',
                    height: isMobile ? '50px' : '70px',
                    animation: 'gentleFloat 3s ease-in-out infinite'
                }}>
                    <img
                        src="/LOGO.png"
                        alt="Loading"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))'
                        }}
                    />
                </div>
            </div>

            {/* Progress indicator */}
            <div style={{
                width: isMobile ? '80%' : '300px',
                height: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: isMobile ? '20px' : '24px'
            }}>
                <div style={{
                    height: '100%',
                    width: '0%',
                    backgroundColor: '#6366f1',
                    borderRadius: '2px',
                    animation: 'progressLoad 2.5s ease-in-out infinite',
                    boxShadow: '0 0 8px rgba(99, 102, 241, 0.5)'
                }}></div>
            </div>

            {/* Loading text with refined typography */}
            <div style={{
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.9)',
                letterSpacing: '0.5px',
                textAlign: 'center',
                marginBottom: '8px',
                textTransform: 'uppercase'
            }}>
                {message}
            </div>

            {/* Status indicator */}
            <div style={{
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: 300,
                color: 'rgba(255, 255, 255, 0.6)',
                letterSpacing: '0.3px',
                textAlign: 'center',
                height: '18px'
            }}>
                <span style={{
                    display: 'inline-block',
                    animation: 'statusRotate 6s linear infinite'
                }}>
                    {['Initializing', 'Loading assets', 'Finalizing setup'][Math.floor(Date.now() / 1000 % 3)]}
                </span>
                <span style={{
                    display: 'inline-block',
                    width: '16px',
                    textAlign: 'left',
                    animation: 'fadeDots 1.5s infinite steps(4)'
                }}></span>
            </div>

            {/* CSS Animations */}
            <style>
                {`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        
        @keyframes progressLoad {
          0% { width: 0%; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0%; left: 100%; }
        }
        
        @keyframes statusRotate {
          0%, 33% { content: 'Initializing'; }
          34%, 66% { content: 'Loading assets'; }
          67%, 100% { content: 'Finalizing setup'; }
        }
        
        @keyframes fadeDots {
          0% { opacity: 0; content: ''; }
          25% { opacity: 1; content: '.'; }
          50% { opacity: 1; content: '..'; }
          75% { opacity: 1; content: '...'; }
          100% { opacity: 0; content: ''; }
        }
        `}
            </style>
        </div>
    );
}
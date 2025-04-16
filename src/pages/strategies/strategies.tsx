import { useState } from 'react';

const CopyTrading = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={{
            width: '100vw',
            minHeight: '60vh',
            background: 'radial-gradient(circle at 10% 20%, rgba(11, 19, 43, 0.9) 0%, rgba(8, 14, 33, 0.9) 90%)',
            padding: '20px',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '16px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center'
        }}>
            {/* Animated background elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                width: '300px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(56, 182, 255, 0.15) 0%, rgba(56, 182, 255, 0) 70%)',
                filter: 'blur(20px)',
                animation: 'float 8s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '15%',
                right: '15%',
                width: '400px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 56, 140, 0.15) 0%, rgba(255, 56, 140, 0) 70%)',
                filter: 'blur(25px)',
                animation: 'float 10s ease-in-out infinite 2s'
            }} />

            {/* Main content */}
            <div style={{
                maxWidth: '500px',
                maxHeight: '470px',
                padding: '20px',
                zIndex: 2,
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
                marginBottom: '120px',
               
            }}>
                <div style={{
                    marginBottom: '40px',
                    position: 'relative',
                    display: 'inline-block'
                }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="90"
                        height="90"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            marginBottom: '20px',
                            color: '#38b6ff',
                            filter: 'drop-shadow(0 0 10px rgba(56, 182, 255, 0.5))',
                            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        <path d="M15 5l2 2"></path>
                        <path d="M12 15l-2.5 2.5"></path>
                    </svg>
                    <div style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        background: 'linear-gradient(135deg, #38b6ff 0%, #ff388c 100%)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        animation: 'pulse 2s infinite'
                    }}>
                        !
                    </div>
                </div>

                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    margin: '0 0 10px 0',
                    background: 'linear-gradient(90deg, #38b6ff, #ff388c)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.2'
                }}>
                    Copy Trading Platform
                </h1>

                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    margin: '0 0 30px 0',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: '1.5'
                }}>
                    Coming Soon - Revolutionizing Social Trading
                </h2>

                <p style={{
                    fontSize: '1.0rem',
                    lineHeight: '1.8',
                    marginBottom: '40px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    We're building an innovative copy trading platform that will allow you to automatically replicate the trades of top-performing investors in real-time. Get ready for a new era of social trading.
                </p>

                <div style={{
                    display: 'inline-block',
                    position: 'relative',
                    marginBottom: '40px'
                }}>
                    <div style={{
                        padding: '18px 36px',
                        background: 'linear-gradient(135deg, rgba(56, 182, 255, 0.2) 0%, rgba(255, 56, 140, 0.2) 100%)',
                        borderRadius: '50px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(5px)',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        ':hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                            background: 'linear-gradient(135deg, rgba(56, 182, 255, 0.3) 0%, rgba(255, 56, 140, 0.3) 100%)'
                        }
                    }}>
                        We will Notify you When It Launches
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: '-5px',
                        left: '-5px',
                        right: '-5px',
                        bottom: '-5px',
                        borderRadius: '50px',
                        border: '1px solid rgba(56, 182, 255, 0.5)',
                        animation: 'pulse 2s infinite',
                        pointerEvents: 'none'
                    }} />
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    flexWrap: 'wrap',
                    marginTop: '40px'
                }}>
                </div>
            </div>

            {/* Footer */}
            

            {/* Global styles */}
            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
                
                @keyframes pulse {
                    0% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                    100% { opacity: 0.6; transform: scale(1); }
                }
                `}
            </style>
        </div>
    );
};

export default CopyTrading;
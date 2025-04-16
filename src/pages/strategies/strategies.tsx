import { useState } from 'react';

const Trade = () => {
    const [activeStrategy, setActiveStrategy] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);

    const strategies = {
        overUnder: {
            title: "Over/Under Strategy",
            description: "The Over/Under approach involves forecasting whether the market will finish higher (Over) or lower (Under) a specific price point. Traders analyze charts to spot potential breakout or reversal areas, then place positions accordingly. This method excels in trending market conditions.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"></path>
                    <path d="M18 7V3"></path>
                    <path d="M15 15l3-3 3 3"></path>
                    <path d="M18 21v-4"></path>
                    <path d="M9 9l3-3 3 3"></path>
                    <path d="M12 21v-4"></path>
                </svg>
            ),
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            tips: [
                <><strong>OVER 0</strong><br />
                    • Ensure Digit 0 shows less than 10%<br />
                    • Avoid highlighted bars at 0<br />
                    • Monitor Digit 0 for stability<br />
                    • Green bar should be at EVEN DIGIT<br />
                    <strong>ENTRY:</strong> Click OVER when cursor hits DIGIT 0 and remains stable</>,

                <><strong>OVER 1</strong><br />
                    • Digits 0-1 should be under 10%<br />
                    • Avoid highlighted bars at 0 or 1<br />
                    • Green bar at ODD DIGIT<br />
                    <strong>ENTRY:</strong> Click OVER when cursor hits DIGIT 1 with stable 0-1</>,

                <><strong>OVER 2</strong><br />
                    • Digits 0-2 under 10%<br />
                    • Green bar at EVEN DIGIT<br />
                    <strong>ENTRY:</strong> Click OVER when cursor hits 0 or 2 with stability</>,

                <><strong>OVER 3</strong><br />
                    • Digits 0-3 under 10%<br />
                    • Green/red bars at ODD DIGITS<br />
                    <strong>ENTRY:</strong> Click OVER when cursor hits 1 or 3 with stability</>,

                <><strong>OVER 4</strong><br />
                    • At least three digits under 4 below 10%<br />
                    • Green/red bars at EVEN DIGITS<br />
                    <strong>ENTRY:</strong> Click OVER when cursor hits 2 or 4 with stability</>,

                <><strong>OVER 5</strong><br />
                    • Three digits under 5 below 10%<br />
                    • Green/red bars at ODD DIGITS<br />
                    <strong>ENTRY:</strong> Click OVER when cursor hits 1, 3, or 5 with stability</>,

                <><strong>OVER 6</strong><br />
                    • Green bar must be at digit 8<br />
                    • Red bar on even digits below 6<br />
                    • Two digits above 6 should exceed 11%<br />
                    <strong>ENTRY:</strong> Wait for cursor at 4, 2, or 0 (highest %) with stability</>,

                <><strong>OVER 7</strong><br />
                    • Green bar at digit 9 or 1<br />
                    • Red bar at 5 or 3<br />
                    • Digits above 7 should be rising<br />
                    <strong>ENTRY:</strong> Click OVER when cursor hits red bar with rising digits above</>
            ]
        },
        evenOdd: {
            title: "Even/Odd Strategy",
            description: "The Even/Odd technique focuses on whether the final digit of the asset's price will be even or odd at expiration. This short-term method uses statistical patterns and price behavior analysis. It's especially effective for rapid trades during market volatility.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3v4"></path>
                    <path d="M16 3v4"></path>
                    <path d="M3 10h18"></path>
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <path d="M9 16l2 2 4-4"></path>
                </svg>
            ),
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            tips: [
                <><span style={{ color: '#e74c3c', fontWeight: 'bold' }}>⚠️ This method requires automated tools - Not for manual trading!</span><br /><br />
                    <strong>REQUIREMENTS</strong><br />
                    • Use 1 tick duration<br />
                    • Apply volatility: 100/75/50 with 1s intervals<br />
                    • Utilize rapid execution tools</>,

                <><strong>TRADING EVEN</strong><br />
                    • Green bar at EVEN digit (12.5%+)<br />
                    • Three EVEN digits above 10.5%<br />
                    • Red bar on EVEN digit below 9.5%<br />
                    <strong>ENTRY:</strong> Wait for cursor to hit TWO ODD digits then GREEN BAR</>,

                <><strong>TRADING ODD</strong><br />
                    • Green bar at ODD digit (12.5%+)<br />
                    • Three ODD digits above 10.5%<br />
                    • Red bar on ODD digit below 9.5%<br />
                    <strong>ENTRY:</strong> Wait for cursor to hit TWO EVEN digits then GREEN BAR</>,

                <><span style={{ color: '#e74c3c', fontWeight: 'bold' }}>⚠️ PATIENCE IS KEY!</span><br />
                    Never rush the market - wait for perfect conditions</>
            ]
        }
    };

    const handleBackClick = () => {
        setActiveStrategy(null);
    };

    return (
        <div style={{
            width: '100vw',
            minHeight: '90vh',
            background: 'radial-gradient(circle at 10% 20%, rgba(245, 247, 250, 0.9) 0%, rgba(228, 232, 237, 0.9) 90%)',
            padding: '20px',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '16px',
            marginBottom: '100px',
            overflow: 'auto',
            position: 'relative',
            '::before': {
                content: '""',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '400px',
                background: 'linear-gradient(135deg, rgba(43,88,118,0.05) 0%, rgba(78,67,118,0.05) 100%)',
                zIndex: 0,
                pointerEvents: 'none'
            }
        }}>
            {!activeStrategy ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '30px',
                    padding: '20px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative',
                    margin: '20px',
                    zIndex: 1
                }}>
                    {/* Animated Background Elements */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '10%',
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(74, 175, 254, 0.1) 0%, rgba(74, 175, 254, 0) 70%)',
                        filter: 'blur(20px)',
                        transform: 'translate(-50%, -50%)',
                        zIndex: -1,
                        animation: 'float 6s ease-in-out infinite'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '30%',
                        right: '15%',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(245, 87, 108, 0.1) 0%, rgba(245, 87, 108, 0) 70%)',
                        filter: 'blur(15px)',
                        transform: 'translate(50%, -50%)',
                        zIndex: -1,
                        animation: 'float 8s ease-in-out infinite 2s'
                    }} />

                    <h1 style={{
                        color: '#212529',
                        fontSize: '3.5rem',
                        textAlign: 'center',
                        marginTop: '100px',
                        fontWeight: '800',
                        background: 'linear-gradient(90deg, #2b5876 0%, #4e4376 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.5px',
                        lineHeight: '1.2',
                        textShadow: '0 2px 10px rgba(0,0,0,0.05)',
                        position: 'relative',
                        paddingBottom: '2px',
                        '::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: '0',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100px',
                            height: '4px',
                            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                            borderRadius: '2px'
                        }
                    }}>
                        Advanced Trading Strategies
                    </h1>

                    <p style={{
                        color: '#495057',
                        fontSize: '1.75rem',
                        maxWidth: '700px',
                        textAlign: 'center',
                        lineHeight: '1.6',
                        marginBottom: '2px',
                        position: 'relative',
                        padding: '0 20px',
                        fontWeight: '400'
                    }}>
                        Select a trading strategy to view detailed execution guidelines and market insights
                    </p>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '40px',
                        width: '100%',
                        maxWidth: '1200px',
                        marginBottom: '80px',
                        perspective: '1000px'
                    }}>
                        {/* Over/Under Strategy Card */}
                        <div
                            onClick={() => setActiveStrategy('overUnder')}
                            onMouseEnter={() => setHoveredCard('overUnder')}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '24px',
                                padding: '30px',
                                width: '380px',
                                boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                border: '1px solid rgba(255,255,255,0.8)',
                                backdropFilter: 'blur(8px)',
                                transform: hoveredCard === 'overUnder' ? 'translateY(-10px) rotateY(5deg)' : 'translateY(0)',
                                position: 'relative',
                                overflow: 'hidden',
                                '::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '5px',
                                    background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                                    transition: 'all 0.3s ease'
                                },
                                ':hover': {
                                    boxShadow: '0 20px 40px rgba(74, 175, 254, 0.2)',
                                    '::before': {
                                        height: '8px'
                                    }
                                }
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '20px'
                            }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(145deg, #4facfe 0%, #00f2fe 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 10px 20px rgba(74, 175, 254, 0.3)',
                                    transition: 'all 0.3s ease',
                                    transform: hoveredCard === 'overUnder' ? 'scale(1.1) rotate(10deg)' : 'scale(1) rotate(0)'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 3v18h18"></path>
                                        <path d="M18 7V3"></path>
                                        <path d="M15 15l3-3 3 3"></path>
                                        <path d="M18 21v-4"></path>
                                        <path d="M9 9l3-3 3 3"></path>
                                        <path d="M12 21v-4"></path>
                                    </svg>
                                </div>
                                <h2 style={{
                                    color: '#212529',
                                    fontSize: '2.2rem',
                                    margin: '0',
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    letterSpacing: '-0.5px',
                                    background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>Over/Under</h2>
                                <p style={{
                                    color: '#6c757d',
                                    textAlign: 'center',
                                    lineHeight: '1.6',
                                    margin: '0',
                                    fontSize: '1.55rem'
                                }}>Predict if price will finish above or below target</p>
                                <div style={{
                                    marginTop: '15px',
                                    padding: '10px 25px',
                                    background: 'rgba(74, 175, 254, 0.1)',
                                    borderRadius: '50px',
                                    color: '#4e4376',
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    border: '1px solid rgba(74, 175, 254, 0.2)',
                                    transition: 'all 0.3s ease',
                                    transform: hoveredCard === 'overUnder' ? 'scale(1.05)' : 'scale(1)'
                                }}>
                                    Trending Markets
                                </div>
                            </div>
                        </div>

                        {/* Even/Odd Strategy Card */}
                        <div
                            onClick={() => setActiveStrategy('evenOdd')}
                            onMouseEnter={() => setHoveredCard('evenOdd')}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '24px',
                                padding: '30px',
                                width: '380px',
                                boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                border: '1px solid rgba(255,255,255,0.8)',
                                backdropFilter: 'blur(8px)',
                                transform: hoveredCard === 'evenOdd' ? 'translateY(-10px) rotateY(-5deg)' : 'translateY(0)',
                                position: 'relative',
                                overflow: 'hidden',
                                '::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '5px',
                                    background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
                                    transition: 'all 0.3s ease'
                                },
                                ':hover': {
                                    boxShadow: '0 20px 40px rgba(245, 87, 108, 0.2)',
                                    '::before': {
                                        height: '8px'
                                    }
                                }
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '20px'
                            }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(145deg, #f093fb 0%, #f5576c 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 10px 20px rgba(245, 87, 108, 0.3)',
                                    transition: 'all 0.3s ease',
                                    transform: hoveredCard === 'evenOdd' ? 'scale(1.1) rotate(-10deg)' : 'scale(1) rotate(0)'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M8 3v4"></path>
                                        <path d="M16 3v4"></path>
                                        <path d="M3 10h18"></path>
                                        <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                                        <path d="M9 16l2 2 4-4"></path>
                                    </svg>
                                </div>
                                <h2 style={{
                                    color: '#212529',
                                    fontSize: '2.2rem',
                                    margin: '0',
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    letterSpacing: '-0.5px',
                                    background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>Even/Odd</h2>
                                <p style={{
                                    color: '#6c757d',
                                    textAlign: 'center',
                                    lineHeight: '1.6',
                                    margin: '0',
                                    fontSize: '1.75rem'
                                }}>Forecast whether the final digit will be even or odd</p>
                                <div style={{
                                    marginTop: '15px',
                                    padding: '10px 25px',
                                    background: 'rgba(245, 87, 108, 0.1)',
                                    borderRadius: '50px',
                                    color: '#4e4376',
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    border: '1px solid rgba(245, 87, 108, 0.2)',
                                    transition: 'all 0.3s ease',
                                    transform: hoveredCard === 'evenOdd' ? 'scale(1.05)' : 'scale(1)'
                                }}>
                                    Volatile Markets
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        textAlign: 'center',
                        color: '#adb5bd',
                        fontSize: '0.9rem',
                        marginTop: 'auto',
                        paddingTop: '40px',
                        position: 'relative',
                        '::before': {
                            content: '""',
                            position: 'absolute',
                            top: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100px',
                            height: '1px',
                            background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)'
                        }
                    }}>
                        Select a strategy to begin your market analysis
                    </div>
                </div>
            ) : (
                <div style={{
                    background: 'rgba(255, 255, 255, 0.97)',
                    borderRadius: '20px',
                    padding: '40px',
                    maxWidth: '1000px',
                    maxHeight: '67vh',
                    width: '100%',
                    margin: '20px auto',
                    marginBottom: '100px',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
                    position: 'relative',
                    overflow: 'auto',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(0,0,0,0.05)',
                    backdropFilter: 'blur(10px)',
                    '::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '10px',
                        background: activeStrategy === 'overUnder'
                            ? 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)'
                            : 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
                        zIndex: 2
                    }
                }}>
                    <button
                        onClick={handleBackClick}
                        style={{
                            position: 'absolute',
                            top: '25px',
                            left: '25px',
                            background: 'rgba(255,255,255,0.9)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#6c757d',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            transition: 'all 0.2s ease',
                            zIndex: 2,
                            padding: '10px 15px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            ':hover': {
                                color: '#495057',
                                transform: 'translateX(-3px)',
                                background: 'rgba(255,255,255,1)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.08)'
                            }
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Strategies
                    </button>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '25px',
                        textAlign: 'center',
                        marginTop: '20px',
                        flex: 1,
                        overflowY: 'auto',
                        padding: '20px',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#e9ecef transparent',
                        '::-webkit-scrollbar': {
                            width: '8px'
                        },
                        '::-webkit-scrollbar-track': {
                            background: 'transparent'
                        },
                        '::-webkit-scrollbar-thumb': {
                            backgroundColor: '#e9ecef',
                            borderRadius: '10px'
                        }
                    }}>
                        <div style={{
                            width: '140px',
                            height: '140px',
                            borderRadius: '50%',
                            background: strategies[activeStrategy].gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 20px 40px ${activeStrategy === 'overUnder' ? 'rgba(74, 175, 254, 0.3)' : 'rgba(245, 87, 108, 0.3)'}`,
                            marginBottom: '15px',
                            transition: 'all 0.3s ease',
                            ':hover': {
                                transform: 'scale(1.05) rotate(5deg)'
                            }
                        }}>
                            {strategies[activeStrategy].icon}
                        </div>

                        <h2 style={{
                            color: '#212529',
                            fontSize: '2.8rem',
                            margin: '0',
                            fontWeight: '800',
                            background: strategies[activeStrategy].gradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.5px',
                            lineHeight: '1.2',
                            marginBottom: '10px',
                            position: 'relative',
                            paddingBottom: '15px',
                            '::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: '0',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '100px',
                                height: '4px',
                                background: strategies[activeStrategy].gradient,
                                borderRadius: '2px'
                            }
                        }}>{strategies[activeStrategy].title}</h2>

                        <p style={{
                            color: '#495057',
                            lineHeight: '1.7',
                            fontSize: '1.25rem',
                            marginBottom: '25px',
                            maxWidth: '700px',
                            padding: '0 20px'
                        }}>{strategies[activeStrategy].description}</p>

                        <div style={{
                            width: '100%',
                            maxWidth: '800px',
                            marginTop: '20px'
                        }}>
                            <h3 style={{
                                color: '#212529',
                                margin: '0 0 20px 0',
                                paddingBottom: '15px',
                                fontSize: '1.8rem',
                                fontWeight: '700',
                                position: 'sticky',
                                top: 0,
                                background: 'rgba(255,255,255,0.9)',
                                zIndex: 1,
                                borderBottom: '2px solid #f1f3f5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                backdropFilter: 'blur(5px)'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={activeStrategy === 'overUnder' ? '#4facfe' : '#f5576c'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 16v-4"></path>
                                    <path d="M12 8h.01"></path>
                                </svg>
                                Execution Guidelines
                            </h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                                gap: '25px',
                                paddingBottom: '30px'
                            }}>
                                {strategies[activeStrategy].tips.map((tip, index) => (
                                    <div key={index} style={{
                                        background: 'rgba(255,255,255,0.9)',
                                        borderRadius: '16px',
                                        padding: '28px',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                                        fontSize: '1.15rem',
                                        lineHeight: '1.7',
                                        border: '1px solid rgba(0,0,0,0.03)',
                                        transition: 'all 0.3s ease',
                                        ':hover': {
                                            transform: 'translateY(-3px)',
                                            boxShadow: `0 10px 25px ${activeStrategy === 'overUnder' ? 'rgba(74, 175, 254, 0.15)' : 'rgba(245, 87, 108, 0.15)'}`,
                                            borderColor: activeStrategy === 'overUnder'
                                                ? 'rgba(74, 175, 254, 0.3)'
                                                : 'rgba(245, 87, 108, 0.3)'
                                        },
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '5px',
                                            height: '100%',
                                            background: strategies[activeStrategy].gradient
                                        }
                                    }}>
                                        {tip}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Global styles */}
            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
                `}
            </style>
        </div>
    );
};

export default Trade;
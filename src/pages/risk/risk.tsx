import { useState } from 'react';

const RiskManagementCalculator = () => {
    const [capital, setCapital] = useState('');
    const [isCalculated, setIsCalculated] = useState(false);

    const calculateResults = () => {
        if (!capital || isNaN(capital) || capital <= 0) return;
        setIsCalculated(true);
    };

    const resetCalculator = () => {
        setCapital('');
        setIsCalculated(false);
    };

    const appendNumber = (num) => {
        setCapital((prev) => (prev === '0' ? num.toString() : (prev || '') + num.toString()));
    };

    const deleteLast = () => {
        setCapital((prev) => (prev.length > 1 ? prev.slice(0, -1) : ''));
    };

    return (
        <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            <div
                style={{
                    maxHeight: '78vh',
                    width: '100vw',
                    padding: '10px',
                    fontFamily: "'Inter', sans-serif",
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
                    borderRadius: '5px',
                    boxShadow: '0 15px 50px rgba(0,0,0,0.1)',
                    position: 'relative',
                    border: '1px solid rgba(255,255,255,0.3)',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '50px',

                }}
            >
                <h1
                    style={{
                        textAlign: 'center',
                        color: '#2c3e50',
                        marginBottom: '30px',
                        fontWeight: '700',
                        fontSize: '1.8rem',
                    }}
                >
                    Risk Management Calculator
                </h1>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '30px',
                        flexWrap: 'wrap',
                    }}
                >


                    {/* Input Column */}
                    <div
                        style={{
                            flex: '1 1 300px',
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: '15px',
                            padding: '25px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(255,255,255,0.5)',
                        }}
                    >
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '600',
                                color: '#34495e',
                                fontSize: '0.9rem',
                            }}
                        >
                            Enter Your Capital ($)
                        </label>
                        <div
                            style={{
                                padding: '15px 20px',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                                fontSize: '20px',
                                backgroundColor: 'white',
                                marginBottom: '10px',
                                textAlign: 'right',
                                fontWeight: '600',
                                color: '#2c3e50',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}
                        >
                            {capital ? `$${capital}` : '$0'}
                        </div>

                        {/* Keypad */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '⌫'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => (item === '⌫' ? deleteLast() : appendNumber(item))}
                                    style={{
                                        padding: '15px',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background:
                                            typeof item === 'number' || item === '.'
                                                ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                                                : 'linear-gradient(135deg, #f1f3f5 0%, #dee2e6 100%)',
                                        color: '#2c3e50',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <button
                                onClick={calculateResults}
                                style={{
                                    flex: '1 1 45%',
                                    padding: '15px',
                                    background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}
                            >
                                Calculate Risk
                            </button>
                            <button
                                onClick={resetCalculator}
                                style={{
                                    flex: '1 1 45%',
                                    padding: '15px',
                                    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    {/* Results Column */}
                    <div
                        style={{
                            flex: '1 1 300px',
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: '15px',
                            padding: '25px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(255,255,255,0.5)',
                        }}
                    >
                        <h2
                            style={{
                                color: '#2c3e50',
                                marginTop: '0',
                                marginBottom: '20px',
                                textAlign: 'center',
                                fontSize: '1.4rem',
                                fontWeight: '600',
                            }}
                        >
                            Risk Management Plan
                        </h2>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '15px',
                                marginBottom: '20px',
                            }}
                        >
                            <ResultCard
                                title="Stake Amount"
                                value={isCalculated ? `$${(capital * 0.1).toFixed(2)}` : '$0.00'}
                                color="#3498db"
                                icon="💰"
                            />
                            <ResultCard
                                title="Take Profit"
                                value={isCalculated ? `$${(capital * 3 * 0.1).toFixed(2)}` : '$0.00'}
                                color="#2ecc71"
                                icon="🎯"
                            />
                            <ResultCard
                                title="Stop Loss"
                                value={isCalculated ? `$${(capital * 3 * 0.1).toFixed(2)}` : '$0.00'}
                                color="#e74c3c"
                                icon="🛑"
                            />
                            <ResultCard
                                title="Loss Protection"
                                value="3 Trades"
                                color="#9b59b6"
                                icon="🛡️"
                            />
                        </div>

                        <div
                            style={{
                                backgroundColor: 'rgba(241,196,15,0.1)',
                                padding: '15px',
                                borderRadius: '10px',
                                borderLeft: '4px solid #f1c40f',
                                marginBottom: '15px',
                            }}
                        >
                            <div
                                style={{
                                    color: '#7f8c8d',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    marginBottom: '8px',
                                }}
                            >
                                Martingale Sequence (x2)
                            </div>
                            <div
                                style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: '#2c3e50',
                                    padding: '15px',
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    border: '1px dashed rgba(241,196,15,0.5)',
                                }}
                            >
                                {isCalculated
                                    ? `${(capital * 0.02).toFixed(2)} → ${(capital * 0.04).toFixed(2)} → ${(capital * 0.08).toFixed(2)}`
                                    : 'Enter amount to calculate'}
                            </div>
                        </div>

                        <div
                            style={{
                                backgroundColor: 'rgba(52,73,94,0.1)',
                                padding: '15px',
                                borderRadius: '10px',
                                borderLeft: '4px solid #34495e',
                            }}
                        >
                            <div style={{ color: '#7f8c8d', fontSize: '0.8rem', fontWeight: '600' }}>
                                Required Capital Buffer
                            </div>
                            <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#2c3e50' }}>
                                {isCalculated ? `$${(capital * 0.02 * 7).toFixed(2)}` : '$0.00'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ResultCard = ({ title, value, color, icon }) => (
    <div
        style={{
            backgroundColor: `rgba(${hexToRgb(color)},0.1)`,
            padding: '15px',
            borderRadius: '10px',
            borderLeft: `4px solid ${color}`,
        }}
    >
        <div
            style={{
                color: '#7f8c8d',
                fontSize: '0.8rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
            }}
        >
            <span>{icon}</span> {title}
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#2c3e50' }}>{value}</div>
    </div>
);

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

export default RiskManagementCalculator;

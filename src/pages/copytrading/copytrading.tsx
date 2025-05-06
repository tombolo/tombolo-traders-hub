'use client';

import React, { useState, useRef, useEffect } from 'react';

const CopyTradingPage = () => {
    const [copierToken, setCopierToken] = useState('');
    const [response, setResponse] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('controls');
    const wsRef = useRef<WebSocket | null>(null);

    // Hidden trader token
    const TRADER_TOKEN = 'WTbty6OPvswbdYz';

    useEffect(() => {
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    const connectWebSocket = (onOpenCallback?: () => void) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            onOpenCallback?.();
            return;
        }

        wsRef.current = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=70344');

        wsRef.current.onopen = () => {
            setIsConnected(true);
            if (copierToken.trim()) {
                wsRef.current?.send(JSON.stringify({ authorize: copierToken.trim() }));
            }
            onOpenCallback?.();
        };

        wsRef.current.onclose = () => setIsConnected(false);

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setResponse(data);

            if (data.msg_type === 'authorize' && data.error) {
                alert('Authorization failed: ' + data.error.message);
            }

            if (data.msg_type === 'copy_start' && data.error) {
                alert('Copy start error: ' + data.error.message);
            }

            if (data.msg_type === 'copy_stop' && data.error) {
                alert('Copy stop error: ' + data.error.message);
            }

            if (data.msg_type === 'set_settings') {
                if (!data.error) {
                    console.log('Copy trading permission enabled.');
                } else {
                    console.error('Failed to enable copy trading:', data.error.message);
                }
            }
        };
    };

    const authorizeAndEnableCopying = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            const traderWs = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=70344');

            traderWs.onopen = () => {
                traderWs.send(JSON.stringify({ authorize: TRADER_TOKEN }));
            };

            traderWs.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.msg_type === 'authorize' && data.authorize?.loginid) {
                    traderWs.send(JSON.stringify({ set_settings: 1, copytrading_allowed: 1 }));
                } else if (data.msg_type === 'set_settings') {
                    traderWs.close();
                    resolve();
                } else if (data.error) {
                    alert('Error enabling copy trading: ' + data.error.message);
                    traderWs.close();
                    reject();
                }
            };
        });
    };

    const fetchTraderLoginId = async (): Promise<string | null> => {
        return new Promise((resolve) => {
            const tempWs = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=70344');

            tempWs.onopen = () => {
                tempWs.send(JSON.stringify({ authorize: TRADER_TOKEN }));
            };

            tempWs.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.msg_type === 'authorize' && data.authorize?.loginid) {
                    resolve(data.authorize.loginid);
                    tempWs.close();
                } else if (data.error) {
                    alert('Failed to fetch trader login ID: ' + data.error.message);
                    resolve(null);
                    tempWs.close();
                }
            };
        });
    };

    const startCopyTrading = async () => {
        if (!copierToken.trim()) {
            alert('Copier token is required.');
            return;
        }

        setIsLoading(true);
        try {
            await authorizeAndEnableCopying();

            connectWebSocket(() => {
                const request = {
                    copy_start: TRADER_TOKEN,
                    req_id: Date.now(),
                };
                wsRef.current?.send(JSON.stringify(request));
            });
        } catch {
            // Error handled in authorizeAndEnableCopying
        } finally {
            setIsLoading(false);
        }
    };

    const stopCopyTrading = async () => {
        setIsLoading(true);
        try {
            const traderLoginId = await fetchTraderLoginId();
            if (!copierToken.trim() || !traderLoginId) {
                alert('Copier token and trader ID are required.');
                return;
            }

            connectWebSocket(() => {
                const request = {
                    copy_stop: 1,
                    trader_loginid: traderLoginId,
                    req_id: Date.now(),
                };
                wsRef.current?.send(JSON.stringify(request));
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            height: '75vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
            color: 'white',
            padding: '16px',
            fontFamily: 'Arial, sans-serif',
            overflow: 'auto'

        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                backgroundColor: '#1f2937',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
                width: '100%'
            }}>
                {/* Header */}
                <div style={{
                    backgroundColor: '#4f46e5',
                    padding: '24px',
                    color: 'white'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h1 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            margin: '0'
                        }}>Copy Trading Dashboard</h1>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                height: '12px',
                                width: '12px',
                                borderRadius: '50%',
                                marginRight: '8px',
                                backgroundColor: isConnected ? '#34d399' : '#ef4444'
                            }}></div>
                            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                        </div>
                    </div>
                    <p style={{
                        color: '#a5b4fc',
                        marginTop: '8px',
                        marginBottom: '0'
                    }}>Automatically copy trades from our expert trader</p>
                </div>

                {/* Main Content */}
                <div style={{ padding: '24px', width: '100%' }}>
                    {/* Tabs */}
                    <div style={{
                        display: 'flex',
                        borderBottom: '1px solid #374151',
                        marginBottom: '24px'
                    }}>
                        <button
                            onClick={() => setActiveTab('controls')}
                            style={{
                                padding: '8px 16px',
                                fontWeight: '600',
                                color: activeTab === 'controls' ? '#818cf8' : '#9ca3af',
                                borderBottom: activeTab === 'controls' ? '2px solid #818cf8' : 'none',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Trading Controls
                        </button>
                        <button
                            onClick={() => setActiveTab('response')}
                            style={{
                                padding: '8px 16px',
                                fontWeight: '600',
                                color: activeTab === 'response' ? '#818cf8' : '#9ca3af',
                                borderBottom: activeTab === 'response' ? '2px solid #818cf8' : 'none',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            API Response
                        </button>
                    </div>

                    {/* Controls Tab */}
                    {activeTab === 'controls' && (
                        <div style={{ display: 'grid', gap: '24px', width: '100%' }}>
                            <div style={{
                                backgroundColor: '#374151',
                                padding: '20px',
                                borderRadius: '8px',
                                width: '100%'
                            }}>
                                <h2 style={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    marginBottom: '16px',
                                    color: 'white'
                                }}>Account Setup</h2>
                                <div style={{ display: 'grid', gap: '16px', width: '100%' }}>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#d1d5db',
                                            marginBottom: '4px'
                                        }}>
                                            Your API Token
                                        </label>
                                        <input
                                            type="password"
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                backgroundColor: '#111827',
                                                border: '1px solid #4b5563',
                                                borderRadius: '6px',
                                                color: 'white',
                                                outline: 'none',
                                                transition: 'all 0.2s'
                                            }}
                                            placeholder="Enter your Deriv API token"
                                            value={copierToken}
                                            onChange={(e) => setCopierToken(e.target.value)}
                                        />
                                        <p style={{
                                            marginTop: '4px',
                                            fontSize: '12px',
                                            color: '#9ca3af'
                                        }}>
                                            This token authenticates your account for copy trading
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                backgroundColor: '#374151',
                                padding: '20px',
                                borderRadius: '8px',
                                width: '100%'
                            }}>
                                <h2 style={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    marginBottom: '16px',
                                    color: 'white'
                                }}>Trading Actions</h2>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '16px',
                                    width: '100%'
                                }}>
                                    <button
                                        onClick={startCopyTrading}
                                        disabled={isLoading}
                                        style={{
                                            flex: '1',
                                            minWidth: '200px',
                                            backgroundColor: isLoading ? '#4f46e5' : '#4f46e5',
                                            color: 'white',
                                            fontWeight: '500',
                                            padding: '12px 24px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            cursor: isLoading ? 'not-allowed' : 'pointer',
                                            opacity: isLoading ? '0.7' : '1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        {isLoading ? (
                                            <>
                                                <div style={{
                                                    animation: 'spin 1s linear infinite',
                                                    width: '20px',
                                                    height: '20px',
                                                    border: '2px solid rgba(255,255,255,0.3)',
                                                    borderTopColor: 'white',
                                                    borderRadius: '50%',
                                                    marginRight: '12px'
                                                }}></div>
                                                Starting...
                                            </>
                                        ) : (
                                            'Start Copy Trading'
                                        )}
                                    </button>
                                    <button
                                        onClick={stopCopyTrading}
                                        disabled={isLoading}
                                        style={{
                                            flex: '1',
                                            minWidth: '200px',
                                            backgroundColor: '#dc2626',
                                            color: 'white',
                                            fontWeight: '500',
                                            padding: '12px 24px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            cursor: isLoading ? 'not-allowed' : 'pointer',
                                            opacity: isLoading ? '0.7' : '1',
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        Stop Copy Trading
                                    </button>
                                </div>
                            </div>

                            <div style={{
                                backgroundColor: '#374151',
                                padding: '20px',
                                borderRadius: '8px',
                                width: '100%'
                            }}>
                                <h2 style={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    marginBottom: '16px',
                                    color: 'white'
                                }}>Connection Status</h2>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '16px',
                                    width: '100%'
                                }}>
                                    <div style={{
                                        backgroundColor: '#1f2937',
                                        padding: '16px',
                                        borderRadius: '8px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <div style={{
                                                height: '12px',
                                                width: '12px',
                                                borderRadius: '50%',
                                                marginRight: '8px',
                                                backgroundColor: isConnected ? '#34d399' : '#ef4444'
                                            }}></div>
                                            <span>WebSocket</span>
                                        </div>
                                        <p style={{
                                            fontSize: '14px',
                                            color: '#9ca3af',
                                            marginTop: '8px'
                                        }}>
                                            {isConnected ? 'Connected to trading server' : 'Disconnected from trading server'}
                                        </p>
                                    </div>
                                    <div style={{
                                        backgroundColor: '#1f2937',
                                        padding: '16px',
                                        borderRadius: '8px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <div style={{
                                                height: '12px',
                                                width: '12px',
                                                borderRadius: '50%',
                                                marginRight: '8px',
                                                backgroundColor: copierToken ? '#34d399' : '#f59e0b'
                                            }}></div>
                                            <span>Account Auth</span>
                                        </div>
                                        <p style={{
                                            fontSize: '14px',
                                            color: '#9ca3af',
                                            marginTop: '8px'
                                        }}>
                                            {copierToken ? 'Token provided' : 'No token provided'}
                                        </p>
                                    </div>
                                    <div style={{
                                        backgroundColor: '#1f2937',
                                        padding: '16px',
                                        borderRadius: '8px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <div style={{
                                                height: '12px',
                                                width: '12px',
                                                borderRadius: '50%',
                                                marginRight: '8px',
                                                backgroundColor: '#34d399'
                                            }}></div>
                                            <span>Trader Ready</span>
                                        </div>
                                        <p style={{
                                            fontSize: '14px',
                                            color: '#9ca3af',
                                            marginTop: '8px'
                                        }}>
                                            Expert trader configured
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Response Tab */}
                    {activeTab === 'response' && response && (
                        <div style={{
                            backgroundColor: '#111827',
                            padding: '20px',
                            borderRadius: '8px',
                            overflow: 'auto',
                            maxHeight: '500px',
                            width: '100%'
                        }}>
                            <h2 style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                marginBottom: '16px',
                                color: 'white'
                            }}>API Response</h2>
                            <pre style={{
                                fontSize: '14px',
                                color: '#d1d5db',
                                backgroundColor: '#1f2937',
                                padding: '16px',
                                borderRadius: '6px',
                                overflowX: 'auto',
                                whiteSpace: 'pre-wrap',
                                wordWrap: 'break-word'
                            }}>
                                {JSON.stringify(response, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    backgroundColor: '#111827',
                    padding: '16px',
                    textAlign: 'center',
                    fontSize: '14px',
                    color: '#9ca3af'
                }}>
                    <p>Copy Trading Dashboard • Use with caution • Not financial advice</p>
                </div>
            </div>
        </div>
    );
};

export default CopyTradingPage;
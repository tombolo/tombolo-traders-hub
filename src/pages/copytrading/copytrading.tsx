'use client';

import React, { useState, useRef, useEffect } from 'react';

const CopyTradingPage = () => {
    const [copierToken, setCopierToken] = useState('');
    const [traderToken, setTraderToken] = useState('');
    const [response, setResponse] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);

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

            if (data.msg_type === 'authorize') {
                if (data.error) {
                    alert('Authorization failed: ' + data.error.message);
                }
            }

            if (data.msg_type === 'copy_start' && data.error) {
                alert('Copy start error: ' + data.error.message);
            }

            if (data.msg_type === 'set_settings') {
                if (!data.error) {
                    alert('Copy trading permission enabled.');
                } else {
                    console.error('Failed to enable copy trading:', data.error.message);
                }
            }
        };
    };

    const startCopyTrading = () => {
        if (!copierToken.trim() || !traderToken.trim()) {
            alert('Both copier and trader tokens are required.');
            return;
        }

        connectWebSocket(() => {
            const request = {
                copy_start: traderToken.trim(),
                req_id: Date.now(),
            };
            wsRef.current?.send(JSON.stringify(request));
        });
    };

    const stopCopyTrading = () => {
        if (!copierToken.trim() || !traderToken.trim()) {
            alert('Both copier and trader tokens are required.');
            return;
        }

        connectWebSocket(() => {
            const request = {
                copy_stop: traderToken.trim(),
                req_id: Date.now(),
            };
            wsRef.current?.send(JSON.stringify(request));
        });
    };

    return (
        <div style={{ padding: '32px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px' }}>Copy Trading</h1>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div
                    style={{
                        height: '12px',
                        width: '12px',
                        borderRadius: '50%',
                        marginRight: '12px',
                        backgroundColor: isConnected ? '#22c55e' : '#ef4444',
                    }}
                />
                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>

            <input
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '12px',
                    border: '1px solid #888',
                    borderRadius: '4px',
                    backgroundColor: 'black',
                }}
                placeholder="Copier Token"
                value={copierToken}
                onChange={(e) => setCopierToken(e.target.value)}
            />

            <input
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '12px',
                    border: '1px solid #888',
                    borderRadius: '4px',
                    backgroundColor: 'black',
                }}
                placeholder="Trader Token"
                value={traderToken}
                onChange={(e) => setTraderToken(e.target.value)}
            />

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <button
                    onClick={startCopyTrading}
                    style={{
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                    Start Copy
                </button>

                <button
                    onClick={stopCopyTrading}
                    style={{
                        backgroundColor: '#dc2626',
                        color: '#fff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                >
                    Stop Copy
                </button>
            </div>

            {response && (
                <pre
                    style={{
                        backgroundColor: '#1f2937',
                        color: '#e5e7eb',
                        padding: '16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        overflowX: 'auto',
                        border: '1px solid #4b5563',
                    }}
                >
                    {JSON.stringify(response, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default CopyTradingPage;

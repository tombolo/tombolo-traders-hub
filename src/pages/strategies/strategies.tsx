import React, { useEffect, useRef, useState } from "react";

const Trade = () => {
    const ws = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [copying, setCopying] = useState(false);
    const [traderToken, setTraderToken] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const app_id = "70344";
    const api_token = "***********yCtJ"; // Your Deriv API token for your own account

    const pingInterval = useRef<NodeJS.Timeout | null>(null);

    // Show notification
    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    // Connect to Deriv WebSocket
    const connectWebSocket = () => {
        ws.current = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

        ws.current.onopen = () => {
            setIsConnected(true);
            showNotification("Successfully connected to Deriv WebSocket", 'success');

            // Authorize your own account
            ws.current?.send(
                JSON.stringify({
                    authorize: api_token,
                })
            );

            // Start sending ping every 30 seconds to keep connection alive
            pingInterval.current = setInterval(() => {
                if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                    ws.current.send(JSON.stringify({ ping: 1 }));
                }
            }, 30000); // 30 seconds
        };

        ws.current.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log(response);

            if (response.msg_type === "authorize") {
                showNotification("Authorization successful", 'success');
            }
            if (response.msg_type === "copy_start") {
                setIsLoading(false);
                if (response.copy_start === 1) {
                    showNotification("Copy trading started successfully", 'success');
                    setCopying(true);
                } else {
                    showNotification("Failed to start copy trading. The trader may not have authorized copy trading.", 'error');
                }
            }
            if (response.msg_type === "copy_stop") {
                setIsLoading(false);
                if (response.copy_stop === 1) {
                    showNotification("Copy trading stopped successfully", 'success');
                    setCopying(false);
                } else {
                    showNotification("Failed to stop copy trading", 'error');
                }
            }
        };

        ws.current.onerror = (err) => {
            showNotification(`Copy Trading error: ${JSON.stringify(err)}`, 'error');
        };

        ws.current.onclose = () => {
            setIsConnected(false);
            showNotification("Copy Trading disconnected", 'error');

            // Stop ping when socket closes
            if (pingInterval.current) {
                clearInterval(pingInterval.current);
                pingInterval.current = null;
            }
        };
    };

    // Disconnect WebSocket
    const disconnectWebSocket = () => {
        ws.current?.close();
    };

    // Start Copy Trading
    const startCopyTrading = () => {
        if (!traderToken) {
            showNotification("Please enter a trader token first", 'error');
            return;
        }

        if (ws.current && isConnected) {
            setIsLoading(true);
            ws.current.send(
                JSON.stringify({
                    copy_start: 1,
                    trader_token: traderToken,
                    assets: ["R_50", "R_100"],
                    max_trade_stake: 50,
                    min_trade_stake: 1,
                    trade_types: ["CALL", "PUT"],
                    req_id: 1,
                })
            );
        }
    };

    // Stop Copy Trading
    const stopCopyTrading = () => {
        if (!traderToken) {
            showNotification("Please enter a trader token first", 'error');
            return;
        }

        if (ws.current && isConnected) {
            setIsLoading(true);
            ws.current.send(
                JSON.stringify({
                    copy_stop: 1,
                    trader_token: traderToken,
                    req_id: 2,
                })
            );
        }
    };

    // Connect on first render
    useEffect(() => {
        connectWebSocket();
        return () => {
            disconnectWebSocket();
            if (pingInterval.current) {
                clearInterval(pingInterval.current);
            }
        };
    }, []);

    return (
        <div className="min-h-screen w-full" style={{
            background: "linear-gradient(135deg, #0E0E2C 0%, #15153B 100%)",
            fontFamily: "'Inter', sans-serif",
            color: "#FFFFFF",
            padding: "20px"
        }}>
            {/* Notification */}
            {notification && (
                <div style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    padding: "16px 24px",
                    borderRadius: "8px",
                    color: "white",
                    backgroundColor: notification.type === 'success' ? "#4BB4B3" : "#FF444F",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                    zIndex: 1000,
                    animation: "fadeIn 0.3s ease-in-out",
                    display: "flex",
                    alignItems: "center",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255,255,255,0.1)"
                }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "12px",
                            fill: "white"
                        }}
                        viewBox="0 0 24 24"
                    >
                        {notification.type === 'success' ? (
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        ) : (
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        )}
                    </svg>
                    {notification.message}
                </div>
            )}

            {/* Main Container */}
            <div style={{
                maxWidth: "1200px",
                minHeight: "700px",
                margin: "0 auto",
                backgroundColor: "#1A1A3A",
                borderRadius: "16px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)"
            }}>
                {/* Header */}
                <div style={{
                    background: "linear-gradient(90deg, #2A3052 0%, #3E4C8B 100%)",
                    padding: "28px 32px",
                    color: "white",
                    borderBottom: "1px solid rgba(255,255,255,0.1)"
                }}>
                    <h1 style={{
                        fontSize: "28px",
                        fontWeight: "700",
                        margin: "0",
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: "0.5px"
                    }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                width: "32px",
                                height: "32px",
                                marginRight: "16px"
                            }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Deriv Copy Trading Panel
                    </h1>
                    <p style={{
                        margin: "12px 0 0",
                        opacity: "0.8",
                        fontSize: "16px",
                        fontWeight: "300"
                    }}>Automatically copy trades from expert traders</p>
                </div>

                {/* Connection Status */}
                <div style={{
                    padding: "18px 32px",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(255,255,255,0.03)"
                }}>
                    <div style={{
                        height: "14px",
                        width: "14px",
                        borderRadius: "50%",
                        marginRight: "14px",
                        backgroundColor: isConnected ? "#4BB4B3" : "#FF444F",
                        boxShadow: `0 0 8px ${isConnected ? "rgba(75, 180, 179, 0.5)" : "rgba(255, 68, 79, 0.5)"}`
                    }}></div>
                    <span style={{
                        fontSize: "15px",
                        color: "#FFFFFF",
                        fontWeight: "500"
                    }}>{isConnected ? 'Connected to Deriv WebSocket' : 'Disconnected - Please refresh'}</span>
                </div>

                {/* Main Content */}
                <div style={{ padding: "32px" }}>
                    {/* Token Input */}
                    <div style={{ marginBottom: "32px" }}>
                        <label style={{
                            display: "block",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#FFFFFF",
                            marginBottom: "12px",
                            opacity: "0.9"
                        }}>
                            Trader Token
                        </label>
                        <input
                            type="text"
                            placeholder="Enter trader's token"
                            value={traderToken}
                            onChange={(e) => setTraderToken(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "16px 20px",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "12px",
                                fontSize: "16px",
                                outline: "none",
                                transition: "all 0.3s ease",
                                boxSizing: "border-box",
                                backgroundColor: "rgba(255,255,255,0.05)",
                                color: "#FFFFFF",
                                backdropFilter: "blur(4px)"
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#7A91FF";
                                e.target.style.boxShadow = "0 0 0 3px rgba(122, 145, 255, 0.2)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "rgba(255,255,255,0.1)";
                                e.target.style.boxShadow = "none";
                            }}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        marginBottom: "32px"
                    }}>
                        <button
                            onClick={startCopyTrading}
                            disabled={!isConnected || copying || isLoading}
                            style={{
                                flex: 1,
                                padding: "18px",
                                borderRadius: "12px",
                                fontWeight: "600",
                                fontSize: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: (!isConnected || copying || isLoading) ? "not-allowed" : "pointer",
                                background: (!isConnected || copying || isLoading) ?
                                    "linear-gradient(135deg, rgba(74, 95, 179, 0.3) 0%, rgba(58, 71, 133, 0.3) 100%)" :
                                    "linear-gradient(135deg, #4BB4B3 0%, #3E8C8B 100%)",
                                color: "white",
                                border: "none",
                                transition: "all 0.3s ease",
                                boxShadow: (!isConnected || copying || isLoading) ? "none" : "0 4px 15px rgba(75, 180, 179, 0.3)",
                                opacity: (!isConnected || copying || isLoading) ? 0.7 : 1
                            }}
                            onMouseOver={(e) => {
                                if (!(!isConnected || copying || isLoading)) {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(75, 180, 179, 0.4)";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!(!isConnected || copying || isLoading)) {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(75, 180, 179, 0.3)";
                                }
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        style={{
                                            animation: "spin 1s linear infinite",
                                            width: "22px",
                                            height: "22px",
                                            marginRight: "12px"
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle style={{ opacity: "0.25" }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path style={{ opacity: "0.75" }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Starting...
                                </>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{
                                            width: "22px",
                                            height: "22px",
                                            marginRight: "12px"
                                        }}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    Start Copy Trading
                                </>
                            )}
                        </button>

                        <button
                            onClick={stopCopyTrading}
                            disabled={!isConnected || !copying || isLoading}
                            style={{
                                flex: 1,
                                padding: "18px",
                                borderRadius: "12px",
                                fontWeight: "600",
                                fontSize: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: (!isConnected || !copying || isLoading) ? "not-allowed" : "pointer",
                                background: (!isConnected || !copying || isLoading) ?
                                    "linear-gradient(135deg, rgba(255, 68, 79, 0.3) 0%, rgba(200, 50, 60, 0.3) 100%)" :
                                    "linear-gradient(135deg, #FF444F 0%, #D63A45 100%)",
                                color: "white",
                                border: "none",
                                transition: "all 0.3s ease",
                                boxShadow: (!isConnected || !copying || isLoading) ? "none" : "0 4px 15px rgba(255, 68, 79, 0.3)",
                                opacity: (!isConnected || !copying || isLoading) ? 0.7 : 1
                            }}
                            onMouseOver={(e) => {
                                if (!(!isConnected || !copying || isLoading)) {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 68, 79, 0.4)";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!(!isConnected || !copying || isLoading)) {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 68, 79, 0.3)";
                                }
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        style={{
                                            animation: "spin 1s linear infinite",
                                            width: "22px",
                                            height: "22px",
                                            marginRight: "12px"
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle style={{ opacity: "0.25" }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path style={{ opacity: "0.75" }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Stopping...
                                </>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{
                                            width: "22px",
                                            height: "22px",
                                            marginRight: "12px"
                                        }}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                    </svg>
                                    Stop Copy Trading
                                </>
                            )}
                        </button>
                    </div>

                    {/* Status Card */}
                    <div style={{
                        background: "linear-gradient(135deg, rgba(42, 48, 82, 0.5) 0%, rgba(30, 35, 64, 0.5) 100%)",
                        padding: "24px",
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        backdropFilter: "blur(8px)"
                    }}>
                        <h2 style={{
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#FFFFFF",
                            marginBottom: "20px",
                            display: "flex",
                            alignItems: "center",
                            letterSpacing: "0.3px"
                        }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    marginRight: "12px",
                                    color: "#7A91FF"
                                }}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Current Status
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{
                                    height: "14px",
                                    width: "14px",
                                    borderRadius: "50%",
                                    marginRight: "14px",
                                    backgroundColor: copying ? "#4BB4B3" : "#7A91FF",
                                    boxShadow: copying ? "0 0 8px rgba(75, 180, 179, 0.5)" : "0 0 8px rgba(122, 145, 255, 0.5)"
                                }}></div>
                                <span style={{ color: "#FFFFFF", opacity: "0.9" }}>
                                    {copying ? 'Currently copying trades' : 'Not currently copying'}
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{
                                    height: "14px",
                                    width: "14px",
                                    borderRadius: "50%",
                                    marginRight: "14px",
                                    backgroundColor: isConnected ? "#4BB4B3" : "#FF444F",
                                    boxShadow: isConnected ? "0 0 8px rgba(75, 180, 179, 0.5)" : "0 0 8px rgba(255, 68, 79, 0.5)"
                                }}></div>
                                <span style={{ color: "#FFFFFF", opacity: "0.9" }}>
                                    {isConnected ? 'Copy Trading connection active' : 'Copy Trading disconnected'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    padding: "20px 32px",
                    textAlign: "center",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.6)",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    fontWeight: "300"
                }}>
                    <p>Ensure you have proper authorization before starting copy trading</p>
                </div>
            </div>

            {/* Add some simple animations */}
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
};

export default Trade;
import React, { useEffect } from 'react';

declare global {
    interface Window {
        TradingView: any;
    }
}

const Trade = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;

        script.onload = () => {
            if (typeof window.TradingView !== 'undefined') {
                new window.TradingView.widget({
                    container_id: 'tradingview-chart',
                    autosize: true,
                    symbol: 'NASDAQ:AAPL',
                    interval: 'D',
                    timezone: 'Etc/UTC',
                    theme: 'light',
                    style: '1',
                    locale: 'en',
                    toolbar_bg: '#f1f3f6',
                    enable_publishing: false,
                    withdateranges: true,
                    hide_side_toolbar: false,
                    allow_symbol_change: true,
                    details: false,
                    hotlist: false,
                    calendar: false,
                });
            }
        };

        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#111' }}>
            <h1 style={{ color: 'white', textAlign: 'center', padding: '10px' }}>TradingView Chart</h1>
            <div id="tradingview-chart" style={{ width: '100%', height: '80vh', backgroundColor: '#222', borderRadius: '8px' }}></div>
        </div>
    );
};

export default Trade;

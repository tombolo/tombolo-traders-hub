import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import './BlocklyLoading.scss';

const BlocklyLoading = observer(() => {
    const { blockly_store } = useStore();
    const { is_loading } = blockly_store;
    const [progress, setProgress] = useState(0);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let timeout: NodeJS.Timeout;

        if (is_loading) {
            setShowLoading(true);
            setProgress(0);

            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 97) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + Math.random() * 5; // Smoother progress
                });
            }, 200);
        } else {
            setProgress(100);
            timeout = setTimeout(() => {
                setShowLoading(false);
            }, 800); // Longer fade-out for smoother transition
        }

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [is_loading]);

    if (!showLoading) return null;

    return (
        <div className={`bot__loading ${!is_loading ? 'fade-out' : ''}`} data-testid='blockly-loader'>
            <div className="loading-content">
                <div className="loading-logo">
                    <svg viewBox="0 0 100 100" className="logo-spinner">
                        <circle cx="50" cy="50" r="45" className="logo-track" />
                        <circle cx="50" cy="50" r="45" className="logo-path" />
                    </svg>
                </div>
                <div className="loading-text">Initializing Tombolo Bot</div>
                <div className="progress-container">
                    <div className="progress-track">
                        <div
                            className="progress-bar"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="progress-percentage">{Math.round(progress)}%</div>
                </div>
                <div className="loading-status">
                    {progress < 30 && 'Loading components...'}
                    {progress >= 30 && progress < 70 && 'Configuring settings...'}
                    {progress >= 70 && progress < 90 && 'Finalizing setup...'}
                    {progress >= 90 && 'Almost ready...'}
                </div>
            </div>
        </div>
    );
});

export default BlocklyLoading;
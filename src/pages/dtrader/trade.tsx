import React from 'react';

const Trade = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <iframe
                src="https://finestanalysis.netlify.app/"
                title="Finest Analysis"
                style={{ width: '100%', height: '70vh', border: 'none' }}
                allowFullScreen
            />
        </div>
    );
};

export default Trade;

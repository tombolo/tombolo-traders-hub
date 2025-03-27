import { useEffect, useState } from 'react';
import './social-icons.css';

interface SVGIconProps {
    iconName: string;
    className?: string;
}

const SVGIcon = ({ iconName, className }: SVGIconProps) => {
    const [svgContent, setSvgContent] = useState('');

    useEffect(() => {
        const loadSVG = async () => {
            try {
                const response = await fetch(`/svg/${iconName}.svg`);
                const svgText = await response.text();
                setSvgContent(svgText);
            } catch (error) {
                console.error(`Error loading ${iconName} icon:`, error);
            }
        };

        loadSVG();
    }, [iconName]);

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
};

export const SocialIcons = () => {
    return (
        <div className="social-icons-container">
            <a
                href="https://www.tiktok.com/@finestburu?_t=ZM-8v1BwN67d1L&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label="TikTok"
            >
                <SVGIcon iconName="tiktok" className="social-icon tiktok-icon" />
            </a>
            <a
                href="https://t.me/FinestTraders"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label="Telegram"
            >
                <SVGIcon iconName="telegram" className="social-icon telegram-icon" />
            </a>
            <a
                href="https://www.instagram.com/finestburu?igsh=dXVwdzY1dDdhdGdm"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label="Instagram"
            >
                <SVGIcon iconName="instagram" className="social-icon instagram-icon" />
            </a>
        </div>
    );
};
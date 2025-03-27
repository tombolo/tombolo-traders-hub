import { standalone_routes } from '@/components/shared';
import { useDevice } from '@deriv-com/ui';
import './app-logo.scss';

export const AppLogo = () => {
    const { isDesktop } = useDevice();

    if (!isDesktop) return null;
    return (
        <a
            href={standalone_routes.deriv_com}
            target='_blank'
            rel='noopener noreferrer'
            className='app-header__logo'
        >
            <img
                src='/LOGO.png'
                alt='App Logo'
                className='app-header__logo-img'
                style={{
                    height: 'auto', // Maintain aspect ratio
                    maxHeight: '60px', // Increased from likely smaller value
                    width: 'auto', // Maintain original aspect ratio
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))', // Added shadow
                }}
            />
        </a>
    );
};
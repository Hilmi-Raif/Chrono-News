import React from 'react';
import { Button } from 'primereact/button';
import { useTheme } from '../../context/useTheme.ts';

interface ThemeToggleProps {
    className?: string;
    sizeClass?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', sizeClass = 'w-10 h-10' }) => {
    const { theme, toggleTheme } = useTheme();
    const icon = theme === 'dark' ? 'pi-star' : 'pi-sun';

    return (
        <Button
            key={theme}
            type="button"
            icon={`pi ${icon}`}
            className={`theme-toggle-button ${sizeClass} ${className}`}
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
        />
    );
};

export default ThemeToggle;

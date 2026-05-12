import React from 'react';
import { Button } from 'primereact/button';
import { useTheme } from '../../context/useTheme.ts';

interface ThemeToggleProps {
    className?: string;
    sizeClass?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', sizeClass = 'w-10 h-10' }) => {
    const { toggleTheme } = useTheme();

    return (
        <Button
            type="button"
            className={`theme-toggle-button p-button-icon-only ${sizeClass} ${className}`}
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
        >
            <i className="p-button-icon p-c pi pi-sun theme-icon-light"></i>
            <i className="p-button-icon p-c pi pi-moon theme-icon-dark"></i>
        </Button>
    );
};

export default ThemeToggle;

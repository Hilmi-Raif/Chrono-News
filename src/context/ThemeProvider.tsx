import React, { useEffect, useState } from 'react';
import { Theme, ThemeContext } from './themeContext.ts';

const getClientTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [themeReady, setThemeReady] = useState(false);
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        setTheme(getClientTheme());
    }, []);

    useEffect(() => {
        setThemeReady(false);

        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);

        let themeLink = document.getElementById('theme-link') as HTMLLinkElement | null;
        if (!themeLink) {
            themeLink = document.createElement('link');
            themeLink.id = 'theme-link';
            themeLink.rel = 'stylesheet';
            document.head.appendChild(themeLink);
        }

        const nextHref =
            theme === 'dark'
                ? 'https://unpkg.com/primereact/resources/themes/lara-dark-amber/theme.css'
                : 'https://unpkg.com/primereact/resources/themes/lara-light-amber/theme.css';

        let fallbackTimeout: number | undefined;

        const markReady = () => {
            if (fallbackTimeout) {
                clearTimeout(fallbackTimeout);
            }
            setThemeReady(true);
        };

        themeLink.onload = markReady;
        themeLink.onerror = markReady;

        if (themeLink.href !== nextHref) {
            themeLink.href = nextHref;
        } else if (themeLink.sheet) {
            markReady();
        } else {
            fallbackTimeout = window.setTimeout(markReady, 300);
        }

        return () => {
            themeLink.onload = null;
            themeLink.onerror = null;
            if (fallbackTimeout) {
                clearTimeout(fallbackTimeout);
            }
        };
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, themeReady, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

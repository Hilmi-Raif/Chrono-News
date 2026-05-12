import React, { useEffect, useState } from 'react';
import { Theme, ThemeContext } from './themeContext.ts';

const getClientTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [themeReady, setThemeReady] = useState(false);
    const [theme, setTheme] = useState<Theme>(getClientTheme);

    useEffect(() => {
        setThemeReady(false);

        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);

        const nextHref =
            theme === 'dark'
                ? 'https://unpkg.com/primereact/resources/themes/lara-dark-amber/theme.css'
                : 'https://unpkg.com/primereact/resources/themes/lara-light-amber/theme.css';

        const oldThemeLink = document.getElementById('theme-link') as HTMLLinkElement | null;

        if (!oldThemeLink) {
            const newLink = document.createElement('link');
            newLink.id = 'theme-link';
            newLink.rel = 'stylesheet';
            newLink.href = nextHref;
            document.head.appendChild(newLink);
            setThemeReady(true);
            return;
        }

        if (oldThemeLink.href === nextHref) {
            setThemeReady(true);
            return;
        }

        const newLink = document.createElement('link');
        newLink.id = 'theme-link-clone';
        newLink.rel = 'stylesheet';
        newLink.href = nextHref;

        const markReady = () => {
            clearTimeout(fallbackTimeout);
            newLink.id = 'theme-link';
            if (oldThemeLink && oldThemeLink.parentNode) {
                oldThemeLink.parentNode.removeChild(oldThemeLink);
            }
            setThemeReady(true);
        };

        newLink.onload = markReady;
        newLink.onerror = markReady;

        oldThemeLink.parentNode?.insertBefore(newLink, oldThemeLink.nextSibling);

        const fallbackTimeout = window.setTimeout(markReady, 1000);

        return () => {
            newLink.onload = null;
            newLink.onerror = null;
            clearTimeout(fallbackTimeout);
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

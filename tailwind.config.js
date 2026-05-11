/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                xs: '490px',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            colors: {
                primary: 'var(--primary-color)',
                'primary-text': 'var(--primary-color-text)',
                surface: {
                    0: 'var(--surface-0)',
                    50: 'var(--surface-50)',
                    100: 'var(--surface-100)',
                    200: 'var(--surface-200)',
                    300: 'var(--surface-300)',
                    400: 'var(--surface-400)',
                    500: 'var(--surface-500)',
                    600: 'var(--surface-600)',
                    700: 'var(--surface-700)',
                    800: 'var(--surface-800)',
                    900: 'var(--surface-900)',
                    ground: 'var(--surface-ground)',
                    section: 'var(--surface-section)',
                    card: 'var(--surface-card)',
                    overlay: 'var(--surface-overlay)',
                    border: 'var(--surface-border)',
                    hover: 'var(--surface-hover)',
                },
                text: {
                    color: 'var(--text-color)',
                    secondary: 'var(--text-color-secondary)',
                },
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};

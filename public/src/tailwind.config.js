/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Playfair Display', 'serif'],
                body: ['Manrope', 'sans-serif'],
            },
            colors: {
                background: '#0a0a0a',
                foreground: '#F5F5F5',
                primary: {
                    DEFAULT: '#C41E3A',
                    foreground: '#FFFFFF',
                    dark: '#8B0000',
                    light: '#E63950',
                },
                secondary: {
                    DEFAULT: '#C9A84C',
                    foreground: '#000000',
                },
                muted: {
                    DEFAULT: '#1A1A1A',
                    foreground: '#A3A3A3',
                },
                card: {
                    DEFAULT: '#121212',
                    foreground: '#F5F5F5',
                },
                border: '#333333',
                input: '#262626',
                ring: '#C9A84C',
                wine: {
                    50: '#fdf2f4',
                    100: '#fce7eb',
                    200: '#f9d0d9',
                    300: '#f4a9ba',
                    400: '#ec7694',
                    500: '#e04970',
                    600: '#cb2958',
                    700: '#ab1d48',
                    800: '#8B0000',
                    900: '#4A0404',
                    950: '#2D0202',
                },
                gold: {
                    DEFAULT: '#C9A84C',
                    light: '#EDC967',
                    dark: '#A08939',
                },
            },
            borderRadius: {
                lg: '0px',
                md: '0px',
                sm: '0px',
                none: '0px',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(196, 30, 58, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(196, 30, 58, 0.5)' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'wine-gradient': 'linear-gradient(to bottom, #0a0a0a 0%, #4A0404 100%)',
                'gold-sheen': 'linear-gradient(135deg, #C9A84C 0%, #EDC967 50%, #C9A84C 100%)',
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
};

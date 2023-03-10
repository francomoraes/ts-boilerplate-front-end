import React, { createContext, useContext, useState } from 'react';

import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

interface IThemeContext {
    toggleTheme(): void;
    theme: ITheme;
}

interface ITheme {
    title: string;
    color: {
        primary: string;
        secondary: string;
        tertiary: string;

        white: string;
        black: string;
        gray: string;

        background: string;
    };
}

interface ProviderChildren {
    children: React.ReactNode;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider: React.FC<ProviderChildren> = ({ children }) => {
    const [theme, setTheme] = useState<ITheme>(() => {
        const themeSaved = localStorage.getItem(
            '@Stytch-Authentication-React-Tutorial'
        );

        if (themeSaved) {
            return JSON.parse(themeSaved);
        } else {
            return dark;
        }
    });

    const toggleTheme = () => {
        if (theme.title === 'dark') {
            setTheme(light);
            localStorage.setItem(
                '@Stytch-Authentication-React-Tutorial',
                JSON.stringify(light)
            );
        } else {
            setTheme(dark);
            localStorage.setItem(
                '@Stytch-Authentication-React-Tutorial',
                JSON.stringify(dark)
            );
        }
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

function useTheme(): IThemeContext {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within an ThemeProvider');
    }

    return context;
}

export { ThemeProvider, useTheme };

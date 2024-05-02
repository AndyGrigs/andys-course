// src/hooks/ThemeProvider.tsx
import React, { useState, createContext, useContext } from "react";
import { ConfigProvider } from "antd";

const darkTheme = {
  colorPrimary: "#121212",
  colorTextBase: "lightgrey",
};

const lightTheme = {
  colorPrimary: "black",
  colorTextBase: " #474040",
};

// Create a context for the theme
const ThemeContext = createContext({
  theme: "light",
  handleTheme: (theme: string) => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const handleTheme = (theme: string) => setTheme(theme);

  // Provide the theme and handleTheme function to child components
  return (
    <ThemeContext.Provider value={{ theme, handleTheme }}>
      <ConfigProvider
        theme={{
          token: theme === "light" ? lightTheme : darkTheme,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
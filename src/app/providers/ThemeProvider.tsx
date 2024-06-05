// src/hooks/ThemeProvider.tsx
import React, { useState, createContext, useEffect } from "react";
import { ConfigProvider } from "antd";

const darkTheme = {
  colorPrimary: "#00204a",
  colorTextBase: "#e3f6f5",
};

const lightTheme = {
  colorPrimary: "grey",
  colorTextBase: " #474040",
};


const ThemeContext = createContext({
  theme: "light",
  handleTheme: (_theme: string) => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const handleTheme = (theme: string) => setTheme(theme);

  useEffect(() => {
    const rootElement = document.documentElement;

    if (theme === "dark") {
      rootElement.classList.add("app.dark");
      rootElement.classList.remove("app.light");
    } else {
      rootElement.classList.add("app.light");
      rootElement.classList.remove("app.dark");
    }
  }, [theme]);

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

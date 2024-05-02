// src/hooks/useTheme.ts
import { useState } from "react";

// Define your themes
const darkTheme = {
  colorPrimary: "#121212",
  colorTextBase: "lightgrey",
};

const lightTheme = {
  colorPrimary: "black",
  colorTextBase: " #474040",
};

// Custom hook
export const useTheme = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, lightTheme, darkTheme, toggleTheme };
};

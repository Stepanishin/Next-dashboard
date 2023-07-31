"use client";

import React, { createContext, useState, ReactNode } from "react";

interface ThemeContextProps {
  toggle: () => void;
  mode: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

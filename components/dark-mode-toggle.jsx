"use client";

import { Moon, Sun } from "lucide-react";

import useDarkMode from "@/hooks/use-dark-mode";

import Button from "./button";

export default function DarkModeToggle({ defaultMode = "dark" }) {
  const { theme, toggleTheme } = useDarkMode(defaultMode);
  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === "light" && <Moon className="w-4 h-4" />}
      {theme === "dark" && <Sun className="w-4 h-4" />}
    </Button>
  );
}

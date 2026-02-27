"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="">
      <Button
        variant="outline"
        onClick={toggleTheme}
        size="icon"
        className="relative"
      >
        <Sun
          key="sun-icon"
          className="rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
        />
        <Moon
          key="moon-icon"
          className="absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures this component renders only after the client has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure SSR matches client
  if (!mounted) {
    return <div className="w-8 h-8" />; // Avoids mismatch
  }

  function handleTheme() {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            onClick={handleTheme}
            className="h-10 w-10"
            variant="ghost"
          >
            {resolvedTheme === "dark" ? (
              <Moon className="size-6" />
            ) : (
              <Sun color="black" className="size-6" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Switch Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

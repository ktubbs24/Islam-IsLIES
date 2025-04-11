
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsTransitioning(true);
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // Add a dim effect to the whole page
    document.body.classList.add("dim-transition");
    document.body.style.backgroundColor = theme === "light" 
      ? "rgba(0,0,0,0.1)" 
      : "rgba(255,255,255,0.1)";
    
    // Transition to the new theme
    setTimeout(() => {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
      
      setTimeout(() => {
        document.body.style.backgroundColor = "";
        document.body.classList.remove("dim-transition");
        setIsTransitioning(false);
      }, 300);
    }, 200);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
      aria-label="Toggle theme"
      disabled={isTransitioning}
    >
      <div className="relative w-6 h-6 flex items-center justify-center transition-transform duration-500">
        {theme === "light" ? (
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:-rotate-90" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;

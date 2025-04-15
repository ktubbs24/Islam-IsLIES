
import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  // Set theme based on user preferences on first load
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!localStorage.getItem('theme')) {
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, [setTheme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none bg-primary/20"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="sr-only">
        {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      </span>
      <div
        className={`flex items-center justify-center absolute transform transition-transform duration-300 ease-in-out h-5 w-5 rounded-full bg-primary ${
          theme === 'light' ? 'translate-x-1' : 'translate-x-6'
        }`}
      >
        {theme === 'light' ? (
          <Sun size={12} className="text-white" />
        ) : (
          <Moon size={12} className="text-white" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;

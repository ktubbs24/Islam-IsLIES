
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Add a dim overlay to the whole page
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-50 transition-opacity duration-500 pointer-events-none';
    overlay.style.backgroundColor = theme === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)';
    document.body.appendChild(overlay);
    
    // Allow the overlay to render before fading it out
    setTimeout(() => {
      toggleTheme();
      
      // Fade out the overlay
      overlay.style.opacity = '0';
      
      // Remove the overlay after animation
      setTimeout(() => {
        document.body.removeChild(overlay);
        setIsTransitioning(false);
      }, 500);
    }, 100);
  };

  return (
    <button
      onClick={handleToggle}
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


import { Moon, Sun } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

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
      ref={toggleBtnRef}
      onClick={handleToggle}
      className={cn(
        "theme-toggle",
        theme === "dark" ? "" : "active"
      )}
      aria-label="Toggle theme"
      disabled={isTransitioning}
    >
      <div className="icon">
        {theme === "dark" ? (
          <Moon className="h-[1.2rem] w-[1.2rem] text-[#999]" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] text-[#ff9900]" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;

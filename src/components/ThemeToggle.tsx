
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
      
      // Animate the icon rotation
      if (toggleBtnRef.current) {
        toggleBtnRef.current.classList.add('animate-spin-half');
        
        setTimeout(() => {
          if (toggleBtnRef.current) {
            toggleBtnRef.current.classList.remove('animate-spin-half');
          }
        }, 500);
      }
      
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
        "relative p-2 rounded-full transition-all duration-300",
        theme === "dark" 
          ? "bg-[#42455a] hover:bg-[#42455a]" 
          : "bg-white/80 hover:bg-white"
      )}
      aria-label="Toggle theme"
      disabled={isTransitioning}
    >
      <div className="relative w-6 h-6 flex items-center justify-center transition-transform duration-500">
        <div 
          className={cn(
            "absolute inset-0 rounded-full border transition-all duration-300",
            theme === "dark" 
              ? "border-[#999] bg-[#42455a]" 
              : "border-[#dbdbdb] bg-white"
          )}
        ></div>
        {theme === "dark" ? (
          <Moon className="h-[1.2rem] w-[1.2rem] relative z-10 transition-all text-[#999]" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] relative z-10 transition-all text-[#ff9900]" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;

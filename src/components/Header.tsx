
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SearchDialog from "./SearchDialog";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, DollarSign } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add subtle animation to search bar
    const searchInput = searchRef.current?.querySelector('input');
    if (searchInput) {
      const animateSearch = () => {
        searchInput.classList.add('search-pulse');
        setTimeout(() => {
          searchInput.classList.remove('search-pulse');
        }, 1000);
      };
      
      // Initial animation
      setTimeout(animateSearch, 1000);
      
      // Periodic animation
      const interval = setInterval(animateSearch, 10000);
      return () => clearInterval(interval);
    }
  }, []);
  
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex flex-1 items-center justify-end gap-6">
        <div className="flex-grow hidden md:flex justify-center" ref={searchRef}>
          <SearchDialog placeholder="Search documents..." />
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/support" 
            className="text-foreground hover:text-primary transition-colors font-medium button-custom py-2 px-3 rounded-full"
          >
            <DollarSign className="inline-block mr-1" size={18} />
            Support
          </Link>
          
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
        </div>
      </div>
      <style jsx>{`
        .search-pulse {
          animation: searchPulse 1s ease-in-out;
        }
        
        @keyframes searchPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(45, 166, 95, 0.4);
          }
          70% {
            box-shadow: 0 0 0 5px rgba(45, 166, 95, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(45, 166, 95, 0);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;

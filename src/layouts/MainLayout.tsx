import { useEffect, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import "../styles.css";
import { useTheme } from "@/hooks/use-theme";
import SlidingPaneManager from "@/components/SlidingPaneManager";

const MainLayout = () => {
  const [isEntering, setIsEntering] = useState(true);
  const [prevPath, setPrevPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInjeel, setShowInjeel] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    // Skip animation on first load
    if (prevPath === "") {
      setPrevPath(location.pathname);
      setTimeout(() => setIsEntering(false), 100);
      return;
    }
    
    // Animate only when pathname changes
    if (location.pathname !== prevPath) {
      setIsEntering(true);
      setLoading(true);
      
      // Simulate loading (remove in production and use real loading states)
      setTimeout(() => {
        setLoading(false);
        setPrevPath(location.pathname);
        setIsEntering(false);
        
        // Show Injeel button when page is loaded
        setTimeout(() => {
          setShowInjeel(true);
          
          // Blink Injeel button for attention
          setTimeout(() => {
            const injeelBtn = document.getElementById('injeel-button');
            if (injeelBtn) {
              injeelBtn.classList.add('animate-pulse');
              setTimeout(() => {
                injeelBtn.classList.remove('animate-pulse');
              }, 3000);
            }
          }, 500);
        }, 500);
      }, 800);
    }
  }, [location.pathname]);
  
  // Initial show of Injeel button
  useEffect(() => {
    setTimeout(() => {
      setShowInjeel(true);
      
      // Blink Injeel button for attention
      setTimeout(() => {
        const injeelBtn = document.getElementById('injeel-button');
        if (injeelBtn) {
          injeelBtn.classList.add('animate-pulse');
          setTimeout(() => {
            injeelBtn.classList.remove('animate-pulse');
          }, 3000);
        }
      }, 1000);
    }, 1000);
  }, []);
  
  // Click sound for Injeel button
  const playClickSound = () => {
    const audio = new Audio('/download-sound.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio play error:', e));
  };

  useEffect(() => {
    // Add glowing effect to Injeel button on page load
    const timer1 = setTimeout(() => {
      const injeelBtn = document.getElementById('injeel-button');
      if (injeelBtn) injeelBtn.classList.add('glowing');
      
      // Remove glowing effect after a few seconds
      const timer2 = setTimeout(() => {
        if (injeelBtn) injeelBtn.classList.remove('glowing');
      }, 3000);
      
      return () => clearTimeout(timer2);
    }, 1000);
    
    return () => clearTimeout(timer1);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen flex dim-transition ${theme}`}>
      <Sidebar />
      <div className="flex-1 min-w-0 pl-0 md:pl-72 transition-all duration-300">
        <div className="flex min-h-screen flex-col">
          <Header />
          
          {/* Injeel Button */}
          <div className="flex justify-center mt-3 mb-2">
            <Link 
              to="/gospel" 
              id="injeel-button"
              className={cn(
                "glow-on-hover transition-opacity duration-500 text-center px-6 py-2",
                showInjeel ? "opacity-100" : "opacity-0"
              )}
              onClick={() => {
                playClickSound();
                setShowInjeel(false);
                setTimeout(() => {
                  const floatingText = document.createElement('div');
                  floatingText.className = 'absolute top-full mt-1 text-sm text-green-500 animate-float';
                  floatingText.textContent = 'Yes!';
                  document.getElementById('injeel-button')?.appendChild(floatingText);
                  
                  setTimeout(() => {
                    floatingText.remove();
                  }, 3000);
                }, 100);
              }}
            >
              What's the InJeel?
            </Link>
          </div>
          
          <main className="flex-1 px-4 sm:px-6 py-6 sm:py-10">
            <div 
              className={cn(
                "container max-w-4xl transition-all duration-300",
                isEntering ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"
              )}
            >
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
      
      {/* Sliding Panes Manager */}
      <SlidingPaneManager />
      
      {/* Loading animation */}
      {loading && (
        <div className="loader">
          <span className="loader__element"></span>
          <span className="loader__element"></span>
          <span className="loader__element"></span>
        </div>
      )}
    </div>
  );
};

export default MainLayout;

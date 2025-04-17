
import { useEffect, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import "../styles.css";
import { useTheme } from "@/hooks/use-theme";
import { ChevronUp } from "lucide-react";

const MainLayout = () => {
  const [isEntering, setIsEntering] = useState(true);
  const [prevPath, setPrevPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInjeel, setShowInjeel] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  // Handle scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for sidebar toggle events
  useEffect(() => {
    const handleSidebarToggle = (event: any) => {
      if (event.detail && typeof event.detail.isOpen === 'boolean') {
        setIsSidebarOpen(event.detail.isOpen);
      }
    };
    window.addEventListener('sidebar-toggle', handleSidebarToggle);
    return () => window.removeEventListener('sidebar-toggle', handleSidebarToggle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Click sound for Injeel button
  const playClickSound = () => {
    const audio = new Audio('/download-sound.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio play error:', e));
  };

  return (
    <div className={`min-h-screen flex dim-transition ${theme}`}>
      <Sidebar onToggle={isOpen => setIsSidebarOpen(isOpen)} />
      <div className={cn(
        "flex-1 min-w-0 transition-all duration-300 flex flex-col",
        isSidebarOpen ? "md:ml-80" : "ml-0"
      )}>
        <Header />
        
        {/* Injeel Button */}
        <div className="flex justify-center mt-2 mb-0">
          <Link to="/gospel" id="injeel-button" className={cn("glow-on-hover flex items-center justify-center font-bold transition-opacity duration-500 h-[50px] w-[220px] text-center", showInjeel ? "opacity-100" : "opacity-0")} onClick={playClickSound}>
            <span className="text-center w-full">What's the InJeel?</span>
          </Link>
        </div>
        
        <main className="flex-1">
          <div className={cn("transition-all duration-300 max-w-5xl mx-auto", isEntering ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0")}>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
      
      {/* Loading animation */}
      {loading && <div className="loader">
          <span className="loader__element"></span>
          <span className="loader__element"></span>
          <span className="loader__element"></span>
        </div>}

      {/* Scroll to top button */}
      <button className={`scroll-to-top ${showScrollToTop ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Scroll to top">
        <ChevronUp size={20} />
      </button>

      <style>
        {`
        .logo-glow-animation {
          animation: logoPulseGlow 0.5s ease-in-out;
        }

        @keyframes logoPulseGlow {
          0% {
            filter: drop-shadow(0 0 0 rgba(45, 166, 95, 0));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(45, 166, 95, 0.8));
            transform: scale(1.1);
          }
          100% {
            filter: drop-shadow(0 0 0 rgba(45, 166, 95, 0));
            transform: scale(1);
          }
        }
        `}
      </style>
    </div>
  );
};

export default MainLayout;

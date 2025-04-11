
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import "../styles.css";

const MainLayout = () => {
  const [isEntering, setIsEntering] = useState(true);
  const [prevPath, setPrevPath] = useState("");
  const location = useLocation();

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
      setTimeout(() => {
        setPrevPath(location.pathname);
        setIsEntering(false);
      }, 300);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 min-w-0 pl-0 md:pl-64 transition-all duration-300">
        <div className="flex min-h-screen flex-col">
          <Header />
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
    </div>
  );
};

export default MainLayout;

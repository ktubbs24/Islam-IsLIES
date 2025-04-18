
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect } from "react";
import { initScrollToTopOnNavigation, useScrollToTop } from "@/utils/navigation";
import "../styles/footer.css";

const MainLayout = () => {
  // Use the scroll to top hook
  useScrollToTop();
  
  useEffect(() => {
    // Initialize scroll-to-top behavior for all navigation
    initScrollToTopOnNavigation();
  }, []);
  
  return (
    <div className="grid grid-cols-[auto_1fr] min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        
        <main className="flex-grow container p-6 pt-4 pb-16">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;

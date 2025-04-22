
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { ScrollToTop } from "@/utils/scrollToTop";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 bg-background overflow-auto">
          <Header />
          <main className="container mx-auto px-4 pb-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

import MainLayout from "./layouts/MainLayout";
import MarkdownPage from "./components/MarkdownPage"; // Import MarkdownPage

// Lazy-loaded components
const Index = lazy(() => import("./pages/Index"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Helmet>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          </Helmet>
          <BrowserRouter>
            <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
              <Routes>
                <Route element={<MainLayout />}>
                  {/* Home Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/home/welcome" element={<MarkdownPage folderPath="home/welcome" />} />
                  <Route path="/home/gospel" element={<MarkdownPage folderPath="home/gospel" />} />
                  <Route path="/home/about" element={<MarkdownPage folderPath="home/about" />} />
                  <Route path="/home/support" element={<MarkdownPage folderPath="home/support" />} />

                  {/* Blog Routes */}
                  <Route path="/blog/latest-articles" element={<MarkdownPage folderPath="blog/latest-articles" />} />
                  <Route path="/blog/jesus-denial" element={<MarkdownPage folderPath="blog/Jesus doesnt deny Himeself" />} />
                  <Route path="/blog/islamic-teachings" element={<MarkdownPage folderPath="blog/understanding-islamic-teachings" />} />

                  {/* Docs Routes */}
                  <Route path="/docs/faith-in-jesus" element={<MarkdownPage folderPath="docs/Faith-in-Jesus-leads-to-Salvation" />} />
                  <Route path="/docs/faith-in-mohammad" element={<MarkdownPage folderPath="docs/Faith-in-Mohammad-leads-to-Damnation" />} />
                  <Route path="/docs/faith-in-allah" element={<MarkdownPage folderPath="docs/Faith-in-Allah-leads-to-lies" />} />

                  {/* Resources Routes */}
                  <Route path="/resources/faq" element={<MarkdownPage folderPath="Resources/FAQ" />} />
                  <Route path="/resources/bible" element={<MarkdownPage folderPath="Resources/The-Bible" />} />
                  <Route path="/resources/common-questions" element={<MarkdownPage folderPath="Resources/Common-Questions-Muslims-Ask-About-Jesus" />} />
                  <Route path="/resources/believe-in-jesus" element={<MarkdownPage folderPath="Resources/Believe-Jesus-Christ-NOT-Christianity" />} />
                  <Route path="/resources/types-of-christians" element={<MarkdownPage folderPath="Resources/Types-of-Christians-To-Avoid" />} />
                  <Route path="/resources/become-christian" element={<MarkdownPage folderPath="Resources/What-Can-I-Do-Now-To-Become-Christian" />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
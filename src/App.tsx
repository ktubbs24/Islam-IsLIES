import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { HelmetProvider, Helmet } from "react-helmet-async"; // Import HelmetProvider and Helmet

import MainLayout from "./layouts/MainLayout";

// Lazy-loaded components
const Index = lazy(() => import("./pages/Index"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const BlogFolderPage = lazy(() => import("./pages/blog/BlogFolderPage"));
const FaithInJesusFolderPage = lazy(() => import("./pages/docs/FaithInJesusFolderPage"));
const FaithInMohammadFolderPage = lazy(() => import("./pages/docs/FaithInMohammadFolderPage"));
const FaithInAllahFolderPage = lazy(() => import("./pages/docs/FaithInAllahFolderPage"));
const ResourcesFolderPage = lazy(() => import("./pages/resources/ResourcesFolderPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const TagPage = lazy(() => import("./pages/TagPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MarkdownPage = lazy(() => import("./components/MarkdownPage"));
const BlogArchives = lazy(() => import("./components/BlogArchives"));

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Helmet>
            {/* Add the <link> tags dynamically */}
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          </Helmet>
          <BrowserRouter>
            <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/blog" element={<BlogFolderPage />} />
                  <Route path="/docs/faith-in-jesus" element={<FaithInJesusFolderPage />} />
                  <Route path="/docs/faith-in-mohammad" element={<FaithInMohammadFolderPage />} />
                  <Route path="/docs/faith-in-allah" element={<FaithInAllahFolderPage />} />
                  <Route path="/resources" element={<ResourcesFolderPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/tags" element={<TagPage />} />
                  <Route path="/markdown" element={<MarkdownPage />} />
                  <Route path="/archives" element={<BlogArchives />} />
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

// KEEP DocDummyPage EXACTLY THE SAME
const DocDummyPage = ({ title }: { title: string }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* ... existing dummy page code ... */}
    </div>
  );
};

export default App;
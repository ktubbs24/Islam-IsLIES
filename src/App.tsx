import { lazy, Suspense } from "react"; // ONLY ADD THIS LINE
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import MainLayout from "./layouts/MainLayout";
// REPLACE THESE IMPORTS WITH LAZY VERSIONS:
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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* ONLY ADD THIS SUSPENSE WRAPPER */}
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <Routes>
              <Route element={<MainLayout />}>
                {/* ALL YOUR EXISTING ROUTES REMAIN EXACTLY THE SAME */}
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<HomePage />} />
                {/* ... keep all other routes exactly as they are ... */}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
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
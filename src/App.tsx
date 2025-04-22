
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

import MainLayout from "./layouts/MainLayout";

// Lazy-loaded components
const Index = lazy(() => import("./pages/Index"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FolderOverview = lazy(() => import("./pages/content/overview")); // Import the dynamic overview page

// Import folder page components from the backup files
const HomeFolderPage = lazy(() => import("./pages/home/HomeFolderPage"));
const FaithInJesusFolderPage = lazy(() => import("./pages/faith-in-jesus/FaithInJesusFolderPage"));
const FaithInMohammadFolderPage = lazy(() => import("./pages/faith-in-mohammad/FaithInMohammadFolderPage"));
const FaithInAllahFolderPage = lazy(() => import("./pages/faith-in-allah/FaithInAllahFolderPage"));
const BlogFolderPage = lazy(() => import("./pages/blog/BlogFolderPage"));
const ResourcesFolderPage = lazy(() => import("./pages/resources/ResourcesFolderPage"));

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

                  {/* Dynamic Folder Routes */}
                  <Route path="/content/:folder" element={<FolderOverview />} />

                  {/* Folder Pages */}
                  <Route path="/content/home" element={<HomeFolderPage />} />
                  <Route path="/content/faith-in-jesus" element={<FaithInJesusFolderPage />} />
                  <Route path="/content/faith-in-mohammad" element={<FaithInMohammadFolderPage />} />
                  <Route path="/content/faith-in-allah" element={<FaithInAllahFolderPage />} />
                  <Route path="/content/blog" element={<BlogFolderPage />} />
                  <Route path="/content/resources" element={<ResourcesFolderPage />} />

                  {/* Catch-All Route */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;

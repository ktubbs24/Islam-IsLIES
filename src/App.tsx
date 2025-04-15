
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";

import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import FaithInJesusPage from "./pages/FaithInJesusPage";
import GetStartedPage from "./pages/GetStartedPage";
import AboutPage from "./pages/AboutPage";
import JesusDenialPage from "./pages/JesusDenialPage";
import BibleVsQuranPage from "./pages/BibleVsQuranPage";
import ScriptureAnalysisPage from "./pages/ScriptureAnalysisPage";
import RecentUpdatesPage from "./pages/RecentUpdatesPage";
import FAQPage from "./pages/FAQPage";
import TagPage from "./pages/TagPage";
import NewsletterPage from "./pages/NewsletterPage";
import GospelPage from "./pages/GospelPage";
import SupportPage from "./pages/SupportPage";
import NotFound from "./pages/NotFound";

// Move this inside the component function to fix hook initialization issues
const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/faith-in-jesus-to-salvation" element={<FaithInJesusPage />} />
                <Route path="/getting-started" element={<GetStartedPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/gospel" element={<GospelPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/biblical-truths/jesus-doesnt-deny-himself" element={<JesusDenialPage />} />
                <Route path="/comparative-studies/bible-vs-quran" element={<BibleVsQuranPage />} />
                <Route path="/biblical-truths/scripture-analysis" element={<ScriptureAnalysisPage />} />
                <Route path="/recent-updates" element={<RecentUpdatesPage />} />
                <Route path="/newsletter" element={<NewsletterPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/tags/:tagName" element={<TagPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

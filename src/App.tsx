
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";

import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import GetStartedPage from "./pages/GetStartedPage";
import AboutPage from "./pages/AboutPage";
import JesusDenialPage from "./pages/JesusDenialPage";
import BibleVsQuranPage from "./pages/BibleVsQuranPage";
import ScriptureAnalysisPage from "./pages/ScriptureAnalysisPage";
import RecentUpdatesPage from "./pages/RecentUpdatesPage";
import FAQPage from "./pages/FAQPage";
import TagPage from "./pages/TagPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/getting-started" element={<GetStartedPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/biblical-truths/jesus-doesnt-deny-himself" element={<JesusDenialPage />} />
              <Route path="/comparative-studies/bible-vs-quran" element={<BibleVsQuranPage />} />
              <Route path="/biblical-truths/scripture-analysis" element={<ScriptureAnalysisPage />} />
              <Route path="/recent-updates" element={<RecentUpdatesPage />} />
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

export default App;

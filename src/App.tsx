
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { ChevronRight } from "lucide-react";

import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import HomeFolderPage from "./pages/HomeFolderPage";
import BlogPage from "./pages/BlogPage";
import BlogFolderPage from "./pages/BlogFolderPage";
import FaithInJesusPage from "./pages/FaithInJesusPage";
import FaithInJesusFolderPage from "./pages/FaithInJesusFolderPage";
import FaithInMohammadFolderPage from "./pages/FaithInMohammadFolderPage";
import FaithInAllahFolderPage from "./pages/FaithInAllahFolderPage";
import ResourcesFolderPage from "./pages/ResourcesFolderPage";
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

// Import our new Markdown components
import ArchivePage from "./components/ArchivePage";
import MarkdownPage from "./components/MarkdownPage";

// Move this inside the component function to fix hook initialization issues
const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();
  
  // Add scroll to top on navigation
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
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
                <Route path="/home" element={<HomeFolderPage />} />
                <Route path="/blog" element={<BlogFolderPage />} />
                <Route path="/faith-in-jesus-to-salvation" element={<FaithInJesusFolderPage />} />
                <Route path="/faith-in-mohammad-leads-to-damnation" element={<FaithInMohammadFolderPage />} />
                <Route path="/faith-in-allah-leads-to-lies" element={<FaithInAllahFolderPage />} />
                <Route path="/resources" element={<ResourcesFolderPage />} />
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
                
                {/* Markdown content routes */}
                <Route path="/blog/archives" element={
                  <ArchivePage 
                    title="Blog Archives" 
                    description="Browse all blog posts" 
                    contentDirectory="/content/blog"
                    basePath="/blog"
                  />
                } />
                <Route path="/blog/:slug" element={<MarkdownPage basePath="/content/blog" contentType="blog" />} />
                <Route path="/docs/:slug" element={<MarkdownPage basePath="/content/docs" contentType="docs" />} />
                
                {/* Dummy pages for testing navigation */}
                <Route path="/jesus" element={<DocDummyPage title="Jesus" />} />
                <Route path="/works" element={<DocDummyPage title="Works" />} />
                <Route path="/sheep" element={<DocDummyPage title="Sheep" />} />
                <Route path="/salvation" element={<DocDummyPage title="Salvation" />} />
                <Route path="/scriptures" element={<DocDummyPage title="Scriptures" />} />
                <Route path="/islam" element={<DocDummyPage title="Islam" />} />
                <Route path="/quran" element={<DocDummyPage title="The Quran" />} />
                <Route path="/shahada" element={<DocDummyPage title="The Shahada" />} />
                <Route path="/mohammad" element={<DocDummyPage title="Mohammad" />} />
                <Route path="/islamic-salvation" element={<DocDummyPage title="Salvation in Islam" />} />
                <Route path="/allah" element={<DocDummyPage title="Allah" />} />
                <Route path="/satan" element={<DocDummyPage title="Satan" />} />
                <Route path="/false-prophets" element={<DocDummyPage title="False Prophets/Teachers" />} />
                <Route path="/deception" element={<DocDummyPage title="The Great Deception" />} />
                <Route path="/comparison-god-allah" element={<DocDummyPage title="God vs. Allah: A Comparison" />} />
                <Route path="/bible" element={<DocDummyPage title="The Bible" />} />
                <Route path="/christians-to-avoid" element={<DocDummyPage title="Types of 'Christians' to Avoid" />} />
                <Route path="/common-questions" element={<DocDummyPage title="Common Questions Muslims Ask About Jesus" />} />
                <Route path="/jesus-not-christianity" element={<DocDummyPage title="Believe in Jesus Christ NOT Christianity" />} />
                <Route path="/become-christian" element={<DocDummyPage title="What Can I Do Now To Become Christian" />} />
                <Route path="/blog/latest" element={<DocDummyPage title="Latest Articles" />} />
                <Route path="/blog/featured" element={<DocDummyPage title="Featured Posts" />} />
                <Route path="/blog/categories" element={<DocDummyPage title="Categories" />} />
                <Route path="/blog/understanding-islamic-teachings" element={<DocDummyPage title="Understanding Islamic Teachings" />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Dummy page component for testing navigation
const DocDummyPage = ({ title }: { title: string }) => {
  // Ensure page scrolls to top when navigating
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <p className="mb-4">This is a dummy page for "{title}" created for navigation testing.</p>
        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porta metus velit, et finibus arcu sagittis id. Duis facilisis sapien nec commodo tempor. Donec vel risus vel eros imperdiet eleifend.</p>
        <p className="mb-4">Aliquam erat volutpat. Proin iaculis pulvinar velit eu vehicula. Vivamus fringilla nisi at lobortis euismod. Duis vestibulum eros massa, vel suscipit nulla viverra eu. Quisque in urna malesuada, faucibus dolor eget, aliquet ex.</p>
        
        <div className="doc-navigation mt-8">
          <Link to="/faith-in-jesus-to-salvation" className="doc-navigation-link prev">
            <ChevronRight className="mr-2 rotate-180" />
            <span>Previous Page</span>
          </Link>
          <Link to="/faith-in-jesus-to-salvation" className="doc-navigation-link next">
            <span>Next Page</span>
            <ChevronRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;

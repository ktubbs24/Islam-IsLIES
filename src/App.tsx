
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import HomePage from "./pages/home/HomePage";
import BlogFolderPage from "./pages/blog/BlogFolderPage";
import FaithInJesusFolderPage from "./pages/docs/FaithInJesusFolderPage";
import FaithInMohammadFolderPage from "./pages/docs/FaithInMohammadFolderPage";
import FaithInAllahFolderPage from "./pages/docs/FaithInAllahFolderPage";
import ResourcesFolderPage from "./pages/resources/ResourcesFolderPage";
import FAQPage from "./pages/FAQPage";
import TagPage from "./pages/TagPage";
import NotFound from "./pages/NotFound";
import MarkdownPage from "./components/MarkdownPage";
import BlogArchives from "./components/BlogArchives";

// Move this inside the component function to fix hook initialization issues
const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              
              {/* Home folder pages */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/getting-started" element={<MarkdownPage contentType="home" />} />
              <Route path="/about" element={<MarkdownPage contentType="home" />} />
              <Route path="/gospel" element={<MarkdownPage contentType="home" showNavigation={false} />} />
              <Route path="/support" element={<MarkdownPage contentType="home" showNavigation={false} />} />
              
              {/* Blog pages */}
              <Route path="/blog" element={<BlogFolderPage />} />
              <Route path="/blog/latest" element={<MarkdownPage contentType="blog" folderPath="latest-articles" />} />
              <Route path="/blog/featured" element={<MarkdownPage contentType="blog" folderPath="featured" />} />
              <Route path="/blog/categories" element={<MarkdownPage contentType="blog" folderPath="categories" />} />
              <Route path="/blog/archives" element={<BlogArchives />} />
              <Route path="/blog/latest-articles/:slug" element={<MarkdownPage contentType="blog" folderPath="latest-articles" />} />
              <Route path="/blog/understanding-islamic-teachings" 
                element={<MarkdownPage contentType="blog" folderPath="latest-articles" />} />
              
              {/* Faith in Jesus docs */}
              <Route path="/faith-in-jesus-to-salvation" element={<FaithInJesusFolderPage />} />
              <Route path="/jesus" element={
                <MarkdownPage 
                  contentType="docs" 
                  folderPath="Faith In Jesus Leads To Salvation" 
                  showBreadcrumbs={true} 
                  showDates={true} 
                  showDownload={true} 
                />
              } />
              
              {/* Faith in Mohammad docs */}
              <Route path="/faith-in-mohammad-leads-to-damnation" element={<FaithInMohammadFolderPage />} />
              
              {/* Faith in Allah docs */}
              <Route path="/faith-in-allah-leads-to-lies" element={<FaithInAllahFolderPage />} />
              
              {/* Resources docs */}
              <Route path="/resources" element={<ResourcesFolderPage />} />
              <Route path="/faq" element={
                <MarkdownPage 
                  contentType="docs" 
                  folderPath="Resources"
                  showBreadcrumbs={true} 
                  showDates={true} 
                  showDownload={true} 
                />
              } />
              
              {/* Tags page */}
              <Route path="/tags/:tagName" element={<TagPage />} />
              
              {/* Add routes for all other markdown pages here */}
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
              <Route path="/biblical-truths/jesus-doesnt-deny-himself" element={<DocDummyPage title="Jesus doesn't deny Himself" />} />
              <Route path="/biblical-truths/scripture-analysis" element={<DocDummyPage title="Scripture Analysis of Jesus's Divinity" />} />
              <Route path="/comparative-studies/bible-vs-quran" element={<DocDummyPage title="Bible vs Quran Comparative Study" />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Dummy page component for testing navigation
const DocDummyPage = ({ title }: { title: string }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-container bg-card/30 backdrop-blur-md p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <p className="mb-4">This is a dummy page for "{title}" created for navigation testing. In a production site, this would be a markdown file.</p>
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

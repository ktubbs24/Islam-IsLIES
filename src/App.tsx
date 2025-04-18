import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import AboutPage from '@/pages/AboutPage';
import NotFound from '@/pages/NotFound';
import DocPage from '@/pages/DocPage';
import GetStartedPage from '@/pages/GetStartedPage';
import MainLayout from '@/layouts/MainLayout';
import FaithInJesusPage from '@/pages/FaithInJesusPage';
import GospelPage from '@/pages/GospelPage';
import FaithInJesusFolderPage from '@/pages/FaithInJesusFolderPage';
import FaithInMohammadFolderPage from '@/pages/FaithInMohammadFolderPage';
import FaithInAllahFolderPage from '@/pages/FaithInAllahFolderPage';
import ResourcesFolderPage from '@/pages/ResourcesFolderPage';
import FAQPage from '@/pages/FAQPage';
import HomeFolderPage from '@/pages/HomeFolderPage';
import BlogFolderPage from '@/pages/BlogFolderPage';
import BlogPage from '@/pages/BlogPage';
import SupportPage from '@/pages/SupportPage';
import JesusDenialPage from '@/pages/JesusDenialPage';
import ScriptureAnalysisPage from '@/pages/ScriptureAnalysisPage';
import BibleVsQuranPage from '@/pages/BibleVsQuranPage';
import NewsletterPage from '@/pages/NewsletterPage';
import RecentUpdatesPage from '@/pages/RecentUpdatesPage';
import TagPage from '@/pages/TagPage';
import "@/App.css";

interface AppProps {}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/getting-started" element={<GetStartedPage />} />
          
          {/* Faith in Jesus Routes */}
          <Route path="/faith-in-jesus-to-salvation" element={<FaithInJesusFolderPage />} />
          <Route path="/jesus" element={<FaithInJesusPage />} />
          <Route path="/works" element={<FaithInJesusPage />} />
          <Route path="/sheep" element={<FaithInJesusPage />} />
          <Route path="/salvation" element={<FaithInJesusPage />} />
          <Route path="/scriptures" element={<FaithInJesusPage />} />
          
          {/* Faith in Mohammad Routes */}
          <Route path="/faith-in-mohammad-leads-to-damnation" element={<FaithInMohammadFolderPage />} />
          <Route path="/islam" element={<FaithInJesusPage />} />
          <Route path="/quran" element={<FaithInJesusPage />} />
          <Route path="/shahada" element={<FaithInJesusPage />} />
          <Route path="/mohammad" element={<FaithInJesusPage />} />
          <Route path="/islamic-salvation" element={<FaithInJesusPage />} />
          
          {/* Faith in Allah Routes */}
          <Route path="/faith-in-allah-leads-to-lies" element={<FaithInAllahFolderPage />} />
          <Route path="/allah" element={<FaithInJesusPage />} />
          <Route path="/satan" element={<FaithInJesusPage />} />
          <Route path="/false-prophets" element={<FaithInJesusPage />} />
          <Route path="/deception" element={<FaithInJesusPage />} />
          <Route path="/comparison-god-allah" element={<FaithInJesusPage />} />
          
          {/* Resources Routes */}
           <Route path="/resources" element={<ResourcesFolderPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/bible" element={<FaithInJesusPage />} />
          <Route path="/christians-to-avoid" element={<FaithInJesusPage />} />
          <Route path="/common-questions" element={<FaithInJesusPage />} />
          <Route path="/jesus-not-christianity" element={<FaithInJesusPage />} />
          <Route path="/become-christian" element={<FaithInJesusPage />} />
          
          {/* Home Routes */}
          <Route path="/home" element={<HomeFolderPage />} />
          <Route path="/recent-updates" element={<RecentUpdatesPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/tag" element={<TagPage />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<BlogFolderPage />} />
          <Route path="/blog/latest" element={<BlogPage />} />
          <Route path="/blog/featured" element={<BlogPage />} />
          <Route path="/blog/categories" element={<BlogPage />} />
          <Route path="/blog/archives" element={<BlogPage />} />
          <Route path="/blog/understanding-islamic-teachings" element={<BlogPage />} />

          {/* Biblical Truths Routes */}
          <Route path="/biblical-truths/jesus-doesnt-deny-himself" element={<JesusDenialPage />} />
          <Route path="/biblical-truths/scripture-analysis" element={<ScriptureAnalysisPage />} />

          {/* Comparative Studies Routes */}
           <Route path="/comparative-studies/bible-vs-quran" element={<BibleVsQuranPage />} />
          
          <Route path="/gospel" element={<GospelPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

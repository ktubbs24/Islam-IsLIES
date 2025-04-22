import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Document routes organized by parent folder and in order
const documentRoutes = {
  home: [
    { path: '/home/welcome', title: 'Welcome' },
    { path: '/home/gospel', title: 'The Gospel' },
    { path: '/home/about', title: 'About' },
    { path: '/home/newsletter', title: 'Newsletter' },
    { path: '/home/recent-updates', title: 'Recent Updates' },
    { path: '/home/support', title: 'Support' },
  ],
  blog: [
    { path: '/blog/latest-articles', title: 'Latest Articles' },
    { path: '/blog/jesus-denial', title: "Jesus Doesn't Deny Himself" },
    { path: '/blog/islamic-teachings', title: 'Understanding Islamic Teachings' },
  ],
  docs: [
    { path: '/docs/faith-in-jesus/jesus', title: 'Jesus' },
    { path: '/docs/faith-in-jesus/works', title: 'Works' },
    { path: '/docs/faith-in-jesus/sheep', title: 'Sheep' },
    { path: '/docs/faith-in-jesus/salvation', title: 'Salvation' },
    { path: '/docs/faith-in-jesus/scriptures', title: 'Scriptures' },
    { path: '/docs/faith-in-mohammad/islam', title: 'Islam' },
    { path: '/docs/faith-in-mohammad/quran', title: 'The Quran' },
    { path: '/docs/faith-in-mohammad/shahada', title: 'The Shahada' },
    { path: '/docs/faith-in-mohammad/mohammad', title: 'Mohammad' },
    { path: '/docs/faith-in-mohammad/islamic-salvation', title: 'Islamic Salvation' },
    { path: '/docs/faith-in-allah/allah', title: 'Allah' },
    { path: '/docs/faith-in-allah/satan', title: 'Satan' },
    { path: '/docs/faith-in-allah/false-prophets', title: 'False Prophets/Teachers' },
    { path: '/docs/faith-in-allah/deception', title: 'The Great Deception' },
    { path: '/docs/faith-in-allah/comparison-god-allah', title: 'God vs. Allah: A Comparison' },
  ],
  resources: [
    { path: '/resources/faq', title: 'FAQ' },
    { path: '/resources/bible', title: 'The Bible' },
    { path: '/resources/common-questions', title: 'Common Questions' },
    { path: '/resources/believe-in-jesus', title: 'Believe in Jesus' },
    { path: '/resources/types-of-christians', title: 'Types of Christians' },
    { path: '/resources/become-christian', title: 'Become Christian' },
  ],
};

// Helper to determine which folder a path belongs to
const getDocumentFolder = (path: string) => {
  for (const folder in documentRoutes) {
    if (documentRoutes[folder].some(doc => doc.path === path)) {
      return folder;
    }
  }
  return null;
};

interface DocumentNavigationProps {
  excludeOn?: string[];
}

const DocumentNavigation: React.FC<DocumentNavigationProps> = ({ excludeOn = ['/gospel', '/support'] }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Skip rendering on excluded pages
  if (excludeOn.includes(currentPath)) {
    return null;
  }

  // Find the folder this document belongs to
  const folder = getDocumentFolder(currentPath);

  // If no folder found, we can't determine navigation
  if (!folder || !documentRoutes[folder]) {
    return null;
  }

  // Find the current document's index in the folder
  const documents = documentRoutes[folder];
  const currentIndex = documents.findIndex(doc => doc.path === currentPath);

  // If we can't find the document, don't render navigation
  if (currentIndex === -1) {
    return null;
  }

  // Determine previous and next documents
  const prevDoc = currentIndex > 0 ? documents[currentIndex - 1] : null;
  const nextDoc = currentIndex < documents.length - 1 ? documents[currentIndex + 1] : null;

  return (
    <div className="doc-navigation mt-8">
      {prevDoc ? (
        <Link to={prevDoc.path} className="doc-navigation-link prev">
          <ChevronRight className="mr-2 rotate-180" />
          <span>{prevDoc.title}</span>
        </Link>
      ) : (
        <div className="doc-navigation-link prev disabled">
          <ChevronRight className="mr-2 rotate-180 opacity-50" />
          <span className="opacity-50">First Document</span>
        </div>
      )}

      {nextDoc ? (
        <Link to={nextDoc.path} className="doc-navigation-link next">
          <span>{nextDoc.title}</span>
          <ChevronRight className="ml-2" />
        </Link>
      ) : (
        <div className="doc-navigation-link next disabled">
          <span className="opacity-50">Last Document</span>
          <ChevronRight className="ml-2 opacity-50" />
        </div>
      )}
    </div>
  );
};

export default DocumentNavigation;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Document routes organized by parent folder and in order
const documentRoutes = {
  'faith-in-jesus-to-salvation': [
    { path: '/jesus', title: 'Jesus' },
    { path: '/works', title: 'Works' },
    { path: '/sheep', title: 'Sheep' },
    { path: '/salvation', title: 'Salvation' },
    { path: '/scriptures', title: 'Scriptures' }
  ],
  'faith-in-mohammad-leads-to-damnation': [
    { path: '/islam', title: 'Islam' },
    { path: '/quran', title: 'The Quran' },
    { path: '/shahada', title: 'The Shahada' },
    { path: '/mohammad', title: 'Mohammad' },
    { path: '/islamic-salvation', title: 'Salvation in Islam' }
  ],
  'faith-in-allah-leads-to-lies': [
    { path: '/allah', title: 'Allah' },
    { path: '/satan', title: 'Satan' },
    { path: '/false-prophets', title: 'False Prophets/Teachers' },
    { path: '/deception', title: 'The Great Deception' },
    { path: '/comparison-god-allah', title: 'God vs. Allah: A Comparison' }
  ],
  'resources': [
    { path: '/faq', title: 'FAQ' },
    { path: '/bible', title: 'The Bible' },
    { path: '/christians-to-avoid', title: 'Types of "Christians" to Avoid' },
    { path: '/common-questions', title: 'Common Questions Muslims Ask About Jesus' },
    { path: '/jesus-not-christianity', title: 'Believe in Jesus Christ NOT Christianity' },
    { path: '/become-christian', title: 'What Can I Do Now To Become Christian' }
  ],
  'biblical-truths': [
    { path: '/biblical-truths/jesus-doesnt-deny-himself', title: 'Jesus doesn\'t deny Himself' },
    { path: '/biblical-truths/scripture-analysis', title: 'Scripture Analysis of Jesus\'s Divinity' }
  ],
  'comparative-studies': [
    { path: '/comparative-studies/bible-vs-quran', title: 'Bible vs Quran Comparative Study' }
  ],
  'blog': [
    { path: '/blog/latest', title: 'Latest Articles' },
    { path: '/blog/featured', title: 'Featured Posts' },
    { path: '/blog/categories', title: 'Categories' },
    { path: '/blog/archives', title: 'Archives' },
    { path: '/blog/understanding-islamic-teachings', title: 'Understanding Islamic Teachings' }
  ]
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

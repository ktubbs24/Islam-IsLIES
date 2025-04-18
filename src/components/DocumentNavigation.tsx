
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

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

// Helper to get all documents flattened
const getAllDocuments = () => {
  const allDocs: { path: string; title: string; folder: string }[] = [];
  
  for (const folder in documentRoutes) {
    documentRoutes[folder].forEach(doc => {
      allDocs.push({
        ...doc,
        folder
      });
    });
  }
  
  return allDocs;
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
  
  const allDocs = getAllDocuments();
  
  // Find the current document in all documents
  const currentDocIndex = allDocs.findIndex(doc => doc.path === currentPath);
  
  // If we can't find the document, use folder-based navigation as fallback
  if (currentDocIndex === -1) {
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
      <div className="doc-navigation mt-8 grid grid-cols-2 gap-4">
        {prevDoc ? (
          <Link to={prevDoc.path} className="doc-navigation-btn prev-btn group">
            <ChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="truncate">{prevDoc.title}</span>
          </Link>
        ) : (
          <div className="doc-navigation-btn prev-btn disabled">
            <ChevronLeft className="mr-2 opacity-50" />
            <span className="opacity-50 truncate">First Document</span>
          </div>
        )}
        
        {nextDoc ? (
          <Link to={nextDoc.path} className="doc-navigation-btn next-btn group">
            <span className="truncate">{nextDoc.title}</span>
            <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div className="doc-navigation-btn next-btn disabled">
            <span className="opacity-50 truncate">Last Document</span>
            <ChevronRight className="ml-2 opacity-50" />
          </div>
        )}
      </div>
    );
  }
  
  // Use the flattened all docs for navigation
  const prevDoc = currentDocIndex > 0 ? allDocs[currentDocIndex - 1] : null;
  const nextDoc = currentDocIndex < allDocs.length - 1 ? allDocs[currentDocIndex + 1] : null;
  
  return (
    <div className="doc-navigation mt-8 grid grid-cols-2 gap-4">
      {prevDoc ? (
        <Link to={prevDoc.path} className="doc-navigation-btn prev-btn group">
          <ChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
          <span className="truncate">{prevDoc.title}</span>
        </Link>
      ) : (
        <div className="doc-navigation-btn prev-btn disabled">
          <ChevronLeft className="mr-2 opacity-50" />
          <span className="opacity-50 truncate">First Document</span>
        </div>
      )}
      
      {nextDoc ? (
        <Link to={nextDoc.path} className="doc-navigation-btn next-btn group">
          <span className="truncate">{nextDoc.title}</span>
          <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <div className="doc-navigation-btn next-btn disabled">
          <span className="opacity-50 truncate">Last Document</span>
          <ChevronRight className="ml-2 opacity-50" />
        </div>
      )}
      
      <style jsx>{`
        .doc-navigation-btn {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          border: 1px solid rgba(45, 166, 95, 0.2);
          background-color: rgba(45, 166, 95, 0.05);
          color: inherit;
          font-weight: 500;
        }
        
        .prev-btn {
          justify-content: flex-start;
        }
        
        .next-btn {
          justify-content: flex-end;
        }
        
        .doc-navigation-btn:hover:not(.disabled) {
          border-color: rgba(45, 166, 95, 0.6);
          box-shadow: 0 0 15px rgba(45, 166, 95, 0.4);
          transform: translateY(-2px);
          background-color: rgba(45, 166, 95, 0.1);
        }
        
        .doc-navigation-btn:active:not(.disabled) {
          transform: translateY(0);
          box-shadow: 0 0 5px rgba(45, 166, 95, 0.3);
        }
        
        .disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default DocumentNavigation;

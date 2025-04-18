
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface MarkdownContentProps {
  html: string;
  className?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ html, className = '' }) => {
  useEffect(() => {
    // After the component mounts, find any code blocks and enhance them
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
      // Add syntax highlighting classes or other enhancements
      block.classList.add('syntax-highlighted');
    });
    
    // Process internal wiki-style links
    const contentArea = document.querySelector(`.${className}`);
    if (contentArea) {
      const wikiLinks = contentArea.querySelectorAll('a[href^="[["]');
      wikiLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('[[') && href.endsWith(']]')) {
          const pageName = href.substring(2, href.length - 2);
          const path = `/${pageName.toLowerCase().replace(/\s+/g, '-')}`;
          link.setAttribute('href', path);
          link.classList.add('wiki-link', 'slide-link');
        }
      });
    }
    
    // Ensure page scroll to top
    window.scrollTo(0, 0);
  }, [html, className]);

  return (
    <div 
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownContent;

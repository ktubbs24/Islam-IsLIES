
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Link } from 'react-router-dom';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Convert wiki-style links [[Page Title]] to proper links
const processWikilinks = (content: string): string => {
  // Regular expression to match [[Page Title]] format
  const wikiLinkRegex = /\[\[(.*?)\]\]/g;
  
  return content.replace(wikiLinkRegex, (match, title) => {
    // Convert title to URL-friendly format
    const url = `/${title.toLowerCase().replace(/\s+/g, '-')}`;
    // Return markdown link format
    return `[${title}](${url})`;
  });
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  const [processedContent, setProcessedContent] = useState('');

  useEffect(() => {
    if (content) {
      setProcessedContent(processWikilinks(content));
    }
  }, [content]);

  // Custom components for React Markdown
  const components = {
    // Add slide-link class to all links
    a: ({ node, ...props }: any) => {
      const { href } = props;
      const isInternal = href && !href.startsWith('http') && !href.startsWith('mailto:');
      
      if (isInternal) {
        return <Link to={href} className="slide-link" {...props} />;
      }
      
      return <a target="_blank" rel="noopener noreferrer" {...props} />;
    }
  };

  return (
    <div className={`markdown-content ${className || ''}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]} 
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

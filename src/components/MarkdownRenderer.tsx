
import React from 'react';
import { MarkdownContent } from '@/utils/markdownUtils';

interface MarkdownRendererProps {
  content: MarkdownContent;
  showMetadata?: boolean;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  showMetadata = true 
}) => {
  const { metadata, content: htmlContent, path } = content;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <article className="markdown-content">
      {showMetadata && (
        <div className="markdown-metadata mb-6 pb-4 border-b">
          {metadata.title && <h1 className="text-3xl font-bold mb-2">{metadata.title}</h1>}
          
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {metadata.date && (
              <div className="metadata-item">
                <span className="font-medium">Published:</span> {formatDate(metadata.date)}
              </div>
            )}
            
            {metadata.updated && (
              <div className="metadata-item ml-4">
                <span className="font-medium">Updated:</span> {formatDate(metadata.updated)}
              </div>
            )}
            
            {metadata.author && (
              <div className="metadata-item ml-4">
                <span className="font-medium">Author:</span> {metadata.author}
              </div>
            )}
          </div>
          
          {(metadata.categories && metadata.categories.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {metadata.categories.map((category, index) => (
                <span 
                  key={`cat-${index}`}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
          
          {(metadata.tags && metadata.tags.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {metadata.tags.map((tag, index) => (
                <span 
                  key={`tag-${index}`}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div 
        className="markdown-body prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      
      {content.path.includes('/docs/') && (
        <div className="mt-8 pt-4 border-t">
          <a 
            href={`/documents/${path.replace(/^.*\/docs\//, '').replace(/\.md$/, '.pdf')}`} 
            className="doc-download-btn inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            download
          >
            Download as PDF
          </a>
        </div>
      )}
      
      <style jsx>{`
        .doc-download-btn {
          transition: all 0.2s ease;
        }
        
        .doc-download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(45, 166, 95, 0.4);
        }
        
        .doc-download-btn:active {
          transform: translateY(0);
          box-shadow: 0 0 5px rgba(45, 166, 95, 0.3);
        }
      `}</style>
    </article>
  );
};

export default MarkdownRenderer;

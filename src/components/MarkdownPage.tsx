
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownRenderer from './MarkdownRenderer';
import { useMarkdownContent } from '@/utils/markdownUtils';
import { Breadcrumbs } from './Breadcrumbs';
import DocumentNavigation from './DocumentNavigation';
import { Button } from './ui/button';
import { FileDown } from 'lucide-react';

interface MarkdownPageProps {
  contentType: 'home' | 'blog' | 'docs';
  folderPath?: string;
  showNavigation?: boolean;
  showBreadcrumbs?: boolean;
  showDates?: boolean;
  showDownload?: boolean;
}

const MarkdownPage: React.FC<MarkdownPageProps> = ({
  contentType,
  folderPath = '',
  showNavigation = true,
  showBreadcrumbs = true,
  showDates = true,
  showDownload = true
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Determine the file path based on the content type, folder path, and slug
  const filePath = folderPath 
    ? `${contentType}/${folderPath}/${slug}.md` 
    : `${contentType}/${slug}.md`;
  
  const { content, loading, error } = useMarkdownContent(filePath);
  
  // Scroll to top on page load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md mb-6 w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-3 w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-3 w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-3 w-5/6"></div>
      </div>
    );
  }
  
  if (error || !content) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Content</h1>
        <p className="mb-4">We couldn't find the page you were looking for.</p>
        <Button onClick={() => navigate(-1)} variant="default">Go Back</Button>
      </div>
    );
  }

  // Special case for Gospel and Support pages
  const hideNavigation = slug === 'gospel' || slug === 'support';
  const isSpecialPage = contentType === 'home' && (slug === 'gospel' || slug === 'support');
  
  // Create breadcrumbs path
  const breadcrumbItems = [
    { label: 'Home', path: '/' }
  ];
  
  if (contentType === 'blog') {
    breadcrumbItems.push({ label: 'Blog', path: '/blog' });
  } else if (contentType === 'docs') {
    breadcrumbItems.push({ label: 'Documentation', path: '/docs' });
  }
  
  if (folderPath) {
    const pathParts = folderPath.split('/');
    let currentPath = contentType === 'docs' ? '/docs' : `/${contentType}`;
    
    pathParts.forEach((part) => {
      currentPath += `/${part.toLowerCase().replace(/\s+/g, '-')}`;
      breadcrumbItems.push({ label: part, path: currentPath });
    });
  }
  
  breadcrumbItems.push({ label: content.frontmatter.title, path: window.location.pathname });

  // Function to handle document download
  const handleDownload = () => {
    // Create a Blob with the markdown content
    const blob = new Blob([content.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.md`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {showBreadcrumbs && contentType !== 'home' && (
        <Breadcrumbs items={breadcrumbItems} className="mb-4" />
      )}

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-4">{content.frontmatter.title}</h1>
        
        {showDates && contentType !== 'home' && (
          <div className="text-sm text-muted-foreground mb-6">
            <time dateTime={content.frontmatter.date}>
              Published: {new Date(content.frontmatter.date).toLocaleDateString()}
            </time>
            {content.frontmatter.lastUpdated && (
              <>
                <span className="mx-2">•</span>
                <time dateTime={content.frontmatter.lastUpdated}>
                  Last updated: {new Date(content.frontmatter.lastUpdated).toLocaleDateString()}
                </time>
              </>
            )}
          </div>
        )}
        
        <MarkdownRenderer content={content.content} />
        
        {showDownload && contentType !== 'home' && (
          <div className="mt-8 flex justify-end">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Download
            </Button>
          </div>
        )}
      </article>

      {showNavigation && !isSpecialPage && <DocumentNavigation />}
    </div>
  );
};

export default MarkdownPage;

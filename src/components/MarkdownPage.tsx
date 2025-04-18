
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMarkdownFile } from '../utils/markdownUtils';
import MarkdownContent from './MarkdownContent';
import DocPage from '../components/DocPage';
import { Calendar, AlertCircle } from 'lucide-react';

interface MarkdownPageProps {
  basePath: string;
  contentType: 'blog' | 'docs';
}

const MarkdownPage: React.FC<MarkdownPageProps> = ({ basePath, contentType }) => {
  const { slug } = useParams<{ slug: string }>();
  const [markdownData, setMarkdownData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadMarkdownContent = async () => {
      if (!slug) {
        setError('No page specified');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // Construct path to the markdown file
        const filePath = `${basePath}/${slug}.md`;
        const data = await fetchMarkdownFile(filePath);
        
        if (!data) {
          setError(`Failed to load content for "${slug}"`);
          setLoading(false);
          return;
        }
        
        setMarkdownData(data);
        setError(null);
      } catch (err) {
        console.error('Error loading markdown page:', err);
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };
    
    loadMarkdownContent();
    
    // Ensure scroll to top when navigating
    window.scrollTo(0, 0);
  }, [slug, basePath]);
  
  if (loading) {
    return <div className="loading-indicator">Loading content...</div>;
  }
  
  if (error || !markdownData) {
    return (
      <div className="error-container">
        <AlertCircle className="text-red-500 h-8 w-8" />
        <h2>Error Loading Content</h2>
        <p>{error || 'Unknown error occurred'}</p>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary mt-4"
        >
          Return to Home
        </button>
      </div>
    );
  }
  
  const { frontMatter, html } = markdownData;
  
  // Special case for Gospel and Support pages - no navigation
  const isSpecialPage = slug === 'gospel' || slug === 'support';
  
  return (
    <DocPage
      title={frontMatter.title}
      publishDate={frontMatter.date}
      updateDate={frontMatter.updateDate}
      imageSrc={frontMatter.coverImage}
      tags={frontMatter.tags}
      disclaimer={frontMatter.disclaimer}
      prevPage={!isSpecialPage ? { title: 'Previous Document', path: '#' } : undefined}
      nextPage={!isSpecialPage ? { title: 'Next Document', path: '#' } : undefined}
    >
      <MarkdownContent html={html} className="prose dark:prose-invert max-w-none" />
    </DocPage>
  );
};

export default MarkdownPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMarkdownFiles, getMarkdownFilesList, sortMarkdownByDate } from '../utils/markdownUtils';
import { Calendar } from 'lucide-react';

interface ArchivePageProps {
  title?: string;
  description?: string;
  contentDirectory: string;
  basePath: string;
}

const ArchivePage: React.FC<ArchivePageProps> = ({ 
  title = "Archive", 
  description = "Browse all content", 
  contentDirectory,
  basePath
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadArchiveContent = async () => {
      try {
        setLoading(true);
        
        // Get list of markdown files in the directory
        const filesList = await getMarkdownFilesList(contentDirectory);
        
        if (!filesList || filesList.length === 0) {
          setPosts([]);
          setLoading(false);
          return;
        }
        
        // Fetch all markdown files
        const markdownContents = await fetchMarkdownFiles(contentDirectory, filesList);
        
        // Sort by date
        const sortedContents = sortMarkdownByDate(markdownContents);
        
        setPosts(sortedContents.map(content => ({
          ...content.frontMatter,
          excerpt: content.frontMatter.excerpt || extractExcerpt(content.content)
        })));
        
        setError(null);
      } catch (err) {
        console.error('Error loading archive content:', err);
        setError('Failed to load archive content');
      } finally {
        setLoading(false);
      }
    };
    
    loadArchiveContent();
    
    // Ensure scroll to top
    window.scrollTo(0, 0);
  }, [contentDirectory]);
  
  // Helper function to extract an excerpt from content if not provided in front matter
  const extractExcerpt = (content: string, maxLength: number = 150): string => {
    const text = content.replace(/[#*_~`]/g, '').trim();
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="archive-page">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <p className="text-muted-foreground mb-8">{description}</p>
      
      {loading && (
        <div className="loading-indicator">Loading content...</div>
      )}
      
      {error && (
        <div className="error-container bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-600 dark:text-red-400">
          <p>{error}</p>
        </div>
      )}
      
      {!loading && posts.length === 0 && !error && (
        <div className="empty-state bg-muted p-6 rounded-md text-center">
          <p>No content available yet. Check back soon!</p>
        </div>
      )}
      
      <div className="posts-grid space-y-8">
        {posts.map((post, index) => (
          <div key={index} className="post-item border-b pb-6 mb-6 last:border-0">
            <h2 className="text-xl font-semibold mb-2">
              <Link 
                to={`${basePath}/${post.slug}`} 
                className="hover:text-primary transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <Calendar className="h-4 w-4 mr-1" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.author && (
                <>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </>
              )}
            </div>
            
            {post.excerpt && (
              <p className="text-muted-foreground mb-3">{post.excerpt}</p>
            )}
            
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags && post.tags.map((tag: string, idx: number) => (
                <Link 
                  key={idx}
                  to={`/tags/${tag}`}
                  className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivePage;

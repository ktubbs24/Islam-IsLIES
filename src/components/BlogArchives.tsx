
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MarkdownContent, getAllMarkdownContent } from '@/utils/markdownUtils';

const BlogArchives = () => {
  const [posts, setPosts] = useState<MarkdownContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real implementation, you would fetch the content from your API
    // For now, we're simulating this with a timeout
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real implementation, this would be replaced with actual API call
        // const posts = await getAllMarkdownContent('content/blog');
        
        // Mock data for now
        const mockPosts: MarkdownContent[] = [
          {
            content: '<p>Sample content 1</p>',
            metadata: {
              title: 'Understanding the Trinity',
              date: '2023-08-15',
              author: 'Islam IsLIES',
              excerpt: 'An exploration of the Christian concept of the Trinity',
              slug: 'understanding-trinity',
              categories: ['Theology', 'Christianity'],
              tags: ['trinity', 'doctrine', 'faith']
            },
            path: '/blog/understanding-trinity'
          },
          {
            content: '<p>Sample content 2</p>',
            metadata: {
              title: 'The True Nature of Salvation',
              date: '2023-07-20',
              author: 'Islam IsLIES',
              excerpt: 'Exploring what salvation really means in Christianity',
              slug: 'true-nature-salvation',
              categories: ['Salvation', 'Faith'],
              tags: ['salvation', 'grace', 'faith']
            },
            path: '/blog/true-nature-salvation'
          },
          {
            content: '<p>Sample content 3</p>',
            metadata: {
              title: 'Common Misunderstandings About Jesus',
              date: '2023-06-10',
              author: 'Islam IsLIES',
              excerpt: 'Addressing common misconceptions about Jesus Christ',
              slug: 'misunderstandings-jesus',
              categories: ['Jesus', 'Apologetics'],
              tags: ['jesus', 'misconceptions', 'truth']
            },
            path: '/blog/misunderstandings-jesus'
          }
        ];
        
        setPosts(mockPosts);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        setIsLoading(false);
      }
    };
    
    loadPosts();
  }, []);
  
  // Group posts by year
  const postsByYear: Record<string, MarkdownContent[]> = {};
  posts.forEach(post => {
    const year = new Date(post.metadata.date).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });
  
  // Sort years in descending order
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (isLoading) {
    return <div className="p-8 text-center">Loading archives...</div>;
  }
  
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }
  
  if (posts.length === 0) {
    return <div className="p-8 text-center">No posts found in archives.</div>;
  }
  
  return (
    <div className="archives-container">
      <h1 className="text-3xl font-bold mb-8">Blog Archives</h1>
      
      {years.map(year => (
        <div key={year} className="year-section mb-10">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b">{year}</h2>
          <ul className="space-y-4">
            {postsByYear[year].map((post, index) => (
              <li key={index} className="archive-item p-4 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <h3 className="text-lg font-medium">
                    <Link to={post.path} className="text-primary hover:text-primary/80 hover:underline">
                      {post.metadata.title}
                    </Link>
                  </h3>
                  <span className="text-sm text-muted-foreground mt-1 md:mt-0">
                    {formatDate(post.metadata.date)}
                  </span>
                </div>
                {post.metadata.excerpt && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {post.metadata.excerpt}
                  </p>
                )}
                {post.metadata.categories && post.metadata.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.metadata.categories.map((category, catIndex) => (
                      <span 
                        key={`cat-${catIndex}`}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BlogArchives;

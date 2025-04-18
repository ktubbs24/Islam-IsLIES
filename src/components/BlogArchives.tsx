
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MarkdownContent, useMarkdownContent } from '@/utils/markdownUtils';

interface BlogArchivesProps {
  title?: string;
}

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  path: string;
}

const BlogArchives: React.FC<BlogArchivesProps> = ({ title = "Blog Archives" }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, BlogPost[]>);
  
  // Sort years in descending order
  const sortedYears = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        // Fetch the list of blog post files
        const response = await fetch('/api/blog-posts');
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }
        
        const data = await response.json();
        const blogPosts: BlogPost[] = [];
        
        // For demo purposes, we'll use some hardcoded posts
        // In a real implementation, you would fetch and parse the actual markdown files
        const dummyPosts = [
          {
            slug: 'understanding-islamic-teachings',
            title: 'Understanding Islamic Teachings from a Christian Perspective',
            date: '2024-04-10',
            excerpt: 'A critical analysis of Islamic teachings and their contradictions with biblical truth.',
            path: '/blog/latest-articles/understanding-islamic-teachings'
          },
          {
            slug: 'common-questions-muslims-ask',
            title: 'Common Questions Muslims Ask About Jesus',
            date: '2024-03-15',
            excerpt: 'Addressing the most frequent questions Muslims have about Jesus and Christianity.',
            path: '/blog/questions/common-questions-muslims-ask'
          },
          {
            slug: 'comparing-god-and-allah',
            title: 'God vs. Allah: A Comprehensive Comparison',
            date: '2024-02-20',
            excerpt: 'An in-depth look at the differences between the Christian God and the Islamic Allah.',
            path: '/blog/theological-studies/comparing-god-and-allah'
          },
          {
            slug: 'salvation-in-christianity-vs-islam',
            title: 'Salvation in Christianity vs. Islam',
            date: '2023-12-10',
            excerpt: 'Exploring the fundamental differences in how salvation works in Christianity and Islam.',
            path: '/blog/theological-studies/salvation-in-christianity-vs-islam'
          },
          {
            slug: 'historical-reliability-bible-quran',
            title: 'The Historical Reliability of the Bible vs. the Quran',
            date: '2023-11-05',
            excerpt: 'Examining the historical evidence supporting the Bible and the lack thereof for the Quran.',
            path: '/blog/historical-studies/historical-reliability-bible-quran'
          }
        ];
        
        setPosts(dummyPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    }
    
    fetchAllPosts();
  }, []);
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md mb-6 w-1/4"></div>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="mb-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md mb-3 w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-2 w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return <div className="text-red-500">Error loading blog posts: {error.message}</div>;
  }
  
  if (posts.length === 0) {
    return <div>No blog posts found.</div>;
  }

  return (
    <div className="blog-archives">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      
      {sortedYears.map(year => (
        <div key={year} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{year}</h2>
          <ul className="space-y-4 pl-0">
            {postsByYear[year].map(post => (
              <li key={post.slug} className="border-b border-gray-200 dark:border-gray-800 pb-4 list-none">
                <Link 
                  to={post.path} 
                  className="group no-underline"
                >
                  <h3 className="text-xl font-medium group-hover:text-primary transition-colors mb-1">
                    {post.title}
                  </h3>
                  <time className="text-sm text-muted-foreground block mb-2">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  {post.excerpt && (
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BlogArchives;

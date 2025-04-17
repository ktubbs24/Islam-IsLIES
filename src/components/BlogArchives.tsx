
import React from 'react';
import { Link } from 'react-router-dom';
import { MarkdownContent } from '../utils/markdownUtils';
import { Calendar } from 'lucide-react';

interface BlogArchivesProps {
  posts: MarkdownContent[];
}

const BlogArchives: React.FC<BlogArchivesProps> = ({ posts }) => {
  // Group posts by year
  const postsByYear = posts.reduce((acc: Record<string, MarkdownContent[]>, post) => {
    const year = new Date(post.frontMatter.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-archives space-y-8">
      <h1 className="text-3xl font-bold mb-6">Blog Archives</h1>
      
      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts found.</p>
      ) : (
        sortedYears.map(year => (
          <div key={year} className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">{year}</h2>
            <div className="space-y-4">
              {postsByYear[year].map((post, index) => (
                <div 
                  key={index} 
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="min-w-[120px] text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.frontMatter.date)}
                  </div>
                  <div>
                    <Link 
                      to={post.frontMatter.slug || `#`} 
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {post.frontMatter.title}
                    </Link>
                    {post.frontMatter.excerpt && (
                      <p className="text-muted-foreground mt-1">{post.frontMatter.excerpt}</p>
                    )}
                    {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.frontMatter.tags.map((tag, idx) => (
                          <Link
                            key={idx}
                            to={`/tags/${tag.replace('#', '').replace('/', '-')}`}
                            className="text-xs px-2 py-1 rounded-full bg-muted hover:bg-primary/10"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogArchives;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        const response = await fetch("/api/blog-posts");
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }

        const data = await response.json();
        const blogPosts: BlogPost[] = data.map((post: any) => ({
          slug: post.slug,
          title: post.title,
          date: post.date,
          excerpt: post.excerpt,
          path: `/blog/${post.category}/${post.slug}`, // Ensure this matches your app's route structure
        }));

        setPosts(
          blogPosts.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
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
        {[1, 2, 3, 4, 5].map((i) => (
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

      {sortedYears.map((year) => (
        <div key={year} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{year}</h2>
          <ul className="space-y-4 pl-0">
            {postsByYear[year].map((post) => (
              <li
                key={post.slug}
                className="border-b border-gray-200 dark:border-gray-800 pb-4 list-none"
              >
                <Link to={post.path} className="group no-underline">
                  <h3 className="text-xl font-medium group-hover:text-primary transition-colors mb-1">
                    {post.title}
                  </h3>
                  <time className="text-sm text-muted-foreground block mb-2">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
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
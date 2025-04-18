
import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MarkdownContent {
  slug: string;
  content: string;
  frontmatter: {
    title: string;
    date: string;
    lastUpdated?: string;
    excerpt?: string;
    author?: string;
    category?: string;
    tags?: string[];
    [key: string]: any;
  };
  filePath: string;
}

// Function to convert wiki-style links to markdown links
export function convertWikiLinks(content: string): string {
  const wikiLinkRegex = /\[\[(.*?)\]\]/g;
  return content.replace(wikiLinkRegex, (_, text) => {
    // Convert spaces to hyphens for the URL
    const slug = text.toLowerCase().replace(/\s+/g, '-');
    return `[${text}](/${slug})`;
  });
}

// Client-side function to fetch markdown content
export function useMarkdownContent(filePath: string) {
  const [content, setContent] = useState<MarkdownContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`/content/${filePath}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.status}`);
        }
        
        const rawContent = await response.text();
        const { data, content } = matter(rawContent);
        
        setContent({
          slug: path.basename(filePath, '.md'),
          content: convertWikiLinks(content),
          frontmatter: {
            title: data.title || 'Untitled',
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            lastUpdated: data.lastUpdated ? new Date(data.lastUpdated).toISOString() : undefined,
            excerpt: data.excerpt || '',
            author: data.author || 'Unknown',
            category: data.category || 'Uncategorized',
            tags: data.tags || [],
            ...data
          },
          filePath
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching markdown content:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    }

    fetchContent();
  }, [filePath]);

  return { content, loading, error };
}

// Function to get all markdown files in a directory (client-side version)
export async function getAllMarkdownFiles(directory: string): Promise<string[]> {
  try {
    const response = await fetch(`/api/list-markdown?directory=${directory}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown files list: ${response.status}`);
    }
    
    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error("Error fetching markdown files:", error);
    return [];
  }
}

// Function to get all markdown content from files in a directory (client-side version)
export async function getAllMarkdownContent(directory: string): Promise<MarkdownContent[]> {
  const files = await getAllMarkdownFiles(directory);
  const contentPromises = files.map(async (filePath) => {
    const { content } = await useMarkdownContent(path.join(directory, filePath));
    return content;
  });
  
  const contents = await Promise.all(contentPromises);
  return contents.filter((content): content is MarkdownContent => content !== null);
}

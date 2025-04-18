
import fm from 'front-matter';
import { marked } from 'marked';

export interface MarkdownFrontMatter {
  title: string;
  slug: string;
  date: string;
  updateDate?: string;
  author?: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  categories?: string[];
  [key: string]: any;
}

export interface MarkdownContent {
  frontMatter: MarkdownFrontMatter;
  content: string;
  html: string;
}

// Process a markdown file and return structured data
export async function processMarkdown(markdownText: string): Promise<MarkdownContent> {
  try {
    // Parse front matter
    const { attributes, body } = fm<MarkdownFrontMatter>(markdownText);
    
    // Convert markdown to HTML
    const html = marked(body);
    
    return {
      frontMatter: attributes,
      content: body,
      html
    };
  } catch (error) {
    console.error('Error processing markdown:', error);
    throw error;
  }
}

// Fetch markdown file from the content directory
export async function fetchMarkdownFile(path: string): Promise<MarkdownContent | null> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      console.error(`Failed to fetch markdown file: ${path}`);
      return null;
    }
    
    const markdown = await response.text();
    return await processMarkdown(markdown);
  } catch (error) {
    console.error(`Error fetching markdown file ${path}:`, error);
    return null;
  }
}

// Fetch multiple markdown files from a directory
export async function fetchMarkdownFiles(
  basePath: string, 
  filePaths: string[]
): Promise<MarkdownContent[]> {
  const markdownContents: MarkdownContent[] = [];
  
  for (const filePath of filePaths) {
    const fullPath = `${basePath}/${filePath}`;
    const content = await fetchMarkdownFile(fullPath);
    if (content) {
      markdownContents.push(content);
    }
  }
  
  return markdownContents;
}

// Helper to get a list of available markdown files in a directory
// NOTE: This would require server-side code in a production app
// For this demo, we'll implement a simple client-side version that works with predefined lists
export async function getMarkdownFilesList(directory: string): Promise<string[]> {
  // In a real implementation, this would scan the directory server-side
  // For this demo, we'll return hard-coded file paths based on the directory
  if (directory === '/content/blog') {
    return ['sample-blog-post.md'];
  } else if (directory === '/content/docs') {
    return ['getting-started.md'];
  }
  
  // For a real implementation, you might fetch an index file or use an API endpoint
  return [];
}

// Sort markdown contents by date descending (newest first)
export function sortMarkdownByDate(contents: MarkdownContent[]): MarkdownContent[] {
  return [...contents].sort((a, b) => {
    const dateA = new Date(a.frontMatter.date).getTime();
    const dateB = new Date(b.frontMatter.date).getTime();
    return dateB - dateA;
  });
}

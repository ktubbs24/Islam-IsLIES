
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'front-matter';

export interface MarkdownFrontMatter {
  title: string;
  date: string;
  updated?: string;
  author?: string;
  excerpt?: string;
  slug?: string;
  featuredImage?: string;
  categories?: string[];
  tags?: string[];
  [key: string]: any;
}

export interface MarkdownContent {
  content: string;
  metadata: MarkdownFrontMatter;
  path: string;
}

/**
 * Reads and parses a markdown file with front matter
 */
export const readMarkdownFile = (filePath: string): MarkdownContent | null => {
  try {
    const fullPath = path.resolve(process.cwd(), filePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Parse front matter
    const { attributes, body } = matter(fileContents);
    
    // Convert markdown to HTML
    const htmlContent = marked(body);
    
    return {
      content: htmlContent,
      metadata: attributes as MarkdownFrontMatter,
      path: filePath
    };
  } catch (error) {
    console.error(`Error reading markdown file ${filePath}:`, error);
    return null;
  }
};

/**
 * Get all markdown files in a directory
 */
export const getMarkdownFiles = (dirPath: string): string[] => {
  try {
    const fullPath = path.resolve(process.cwd(), dirPath);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`Directory ${dirPath} does not exist`);
      return [];
    }
    
    const files = fs.readdirSync(fullPath);
    
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(dirPath, file));
  } catch (error) {
    console.error(`Error getting markdown files from ${dirPath}:`, error);
    return [];
  }
};

/**
 * Get all markdown content from a directory
 */
export const getAllMarkdownContent = (dirPath: string): MarkdownContent[] => {
  const filePaths = getMarkdownFiles(dirPath);
  const contents = filePaths
    .map(readMarkdownFile)
    .filter((content): content is MarkdownContent => content !== null);
  
  // Sort by date (newest first)
  return contents.sort((a, b) => {
    const dateA = new Date(a.metadata.date).getTime();
    const dateB = new Date(b.metadata.date).getTime();
    return dateB - dateA;
  });
};

/**
 * Gets previous and next posts based on date
 */
export const getAdjacentContent = (
  currentSlug: string,
  contents: MarkdownContent[]
): { previous: MarkdownContent | null; next: MarkdownContent | null } => {
  const currentIndex = contents.findIndex(
    content => content.metadata.slug === currentSlug
  );
  
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }
  
  const previous = currentIndex < contents.length - 1 ? contents[currentIndex + 1] : null;
  const next = currentIndex > 0 ? contents[currentIndex - 1] : null;
  
  return { previous, next };
};

/**
 * Generate a slug from a string
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/gi, '-');
};

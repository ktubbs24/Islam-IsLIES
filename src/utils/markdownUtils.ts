
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export interface FrontMatter {
  title: string;
  date: string;
  updateDate?: string;
  excerpt?: string;
  author?: string;
  slug?: string;
  imageSrc?: string;
  categories?: string[];
  tags?: string[];
  disclaimer?: string;
  [key: string]: any;
}

export interface MarkdownContent {
  content: string;
  frontMatter: FrontMatter;
}

// Helper function to read markdown files
export const getMarkdownContent = (filePath: string): MarkdownContent | null => {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return null;
    }
    
    // Read the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Extract front matter and content
    const { data, content } = matter(fileContents);
    
    // Convert markdown to HTML
    const processedContent = remark()
      .use(html)
      .processSync(content)
      .toString();
    
    // Return the processed content and front matter
    return {
      content: processedContent,
      frontMatter: data as FrontMatter
    };
  } catch (error) {
    console.error(`Error processing markdown file: ${filePath}`, error);
    return null;
  }
};

// Function to get all markdown files from a directory
export const getAllMarkdownFiles = (directory: string): string[] => {
  try {
    const files = fs.readdirSync(directory);
    return files.filter(file => file.endsWith('.md'));
  } catch (error) {
    console.error(`Error reading directory: ${directory}`, error);
    return [];
  }
};

// Function to get all markdown content from a directory
export const getAllMarkdownContent = (directory: string): MarkdownContent[] => {
  const files = getAllMarkdownFiles(directory);
  
  return files
    .map(file => {
      const filePath = path.join(directory, file);
      return getMarkdownContent(filePath);
    })
    .filter((content): content is MarkdownContent => content !== null)
    .sort((a, b) => {
      // Sort by date, newest first
      return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
    });
};

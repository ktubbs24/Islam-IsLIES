import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const getMarkdownFiles = async (folderPath: string) => {
  try {
    const files = await fs.readdir(folderPath);
    const markdownFiles = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(folderPath, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        markdownFiles.push({
          frontmatter: data,
          content: content,
          path: filePath,
          name: path.basename(file, '.md'),
        });
      }
    }

    return markdownFiles;
  } catch (error) {
    console.error('Error reading markdown files:', error);
    return [];
  }
};

// Add these functions that are being referenced by components
export const fetchMarkdownFiles = async (folderPath: string) => {
  return getMarkdownFiles(folderPath);
};

export const fetchMarkdownFile = async (filePath: string) => {
  const files = await getMarkdownFiles(path.dirname(filePath));
  return files.find(file => file.path === filePath);
};

export const getMarkdownFilesList = async (folderPath: string) => {
  return getMarkdownFiles(folderPath);
};

export const sortMarkdownByDate = (files: any[]) => {
  return [...files].sort((a, b) => {
    const dateA = new Date(a.frontmatter?.date || 0);
    const dateB = new Date(b.frontmatter?.date || 0);
    return dateB.getTime() - dateA.getTime(); // Sort descending (newest first)
  });
};

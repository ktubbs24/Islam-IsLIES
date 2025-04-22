// sidebar-auto-generator.tsx
import fs from 'fs';
import path from 'path';

// Path to your content directory
const CONTENT_DIR = path.join(process.cwd(), 'src/content');

// Type definitions for TypeScript
interface SidebarItem {
  title: string;
  path: string;
  isFolder?: boolean;
  children?: SidebarItem[];
}

/**
 * Generates sidebar items from your content folder structure
 * @returns Array of SidebarItem objects for your navigation
 */
export const generateSidebarItems = (): SidebarItem[] => {
  // Read the main content directory
  return fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory()) // Only include folders
    .map(dirent => {
      const folderName = dirent.name;
      const folderPath = path.join(CONTENT_DIR, folderName);
      
      // Get children items (markdown files)
      const children = fs.readdirSync(folderPath)
        .filter(file => 
          file.endsWith('.md') && 
          !file.startsWith('_') // Exclude files starting with _
        )
        .map(file => ({
          title: formatTitle(file.replace('.md', '')),
          path: `/content/${folderName}/${file.replace('.md', '')}`
        }));

      // Check if folder has index.md
      const hasIndex = fs.existsSync(path.join(folderPath, 'index.md'));

      return {
        title: formatTitle(folderName),
        path: hasIndex ? `/content/${folderName}` : `#`, // Use # as fallback
        isFolder: true,
        children: children.length > 0 ? children : undefined
      };
    });
};

// Helper to convert kebab-case to Title Case
const formatTitle = (str: string) => {
  return str.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Example usage in your sidebar component:
/*
const Sidebar = () => {
  const sidebarItems = generateSidebarItems();

  return (
    <nav>
      {sidebarItems.map(item => (
        <div key={item.path}>
          <Link href={item.path}>{item.title}</Link>
          {item.children?.map(child => (
            <Link key={child.path} href={child.path}>
              {child.title}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
*/
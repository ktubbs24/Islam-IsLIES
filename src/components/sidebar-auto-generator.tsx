import fs from "fs";
import path from "path";

// Path to your content directory
const CONTENT_DIR = path.join(process.cwd(), "src/content");

// Type definitions for TypeScript
interface SidebarItem {
  title: string;
  path: string;
  isFolder?: boolean;
  children?: SidebarItem[];
}

/**
 * Recursively generates sidebar items from your content folder structure
 * @param dirPath - The current directory path
 * @param basePath - The base path for the generated URLs
 * @returns Array of SidebarItem objects for your navigation
 */
const generateSidebarItemsRecursive = (
  dirPath: string,
  basePath: string = "/content"
): SidebarItem[] => {
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .map((dirent) => {
      const itemPath = path.join(dirPath, dirent.name);
      const relativePath = path.relative(CONTENT_DIR, itemPath);
      const urlPath = `${basePath}/${relativePath.replace(/\\/g, "/")}`;

      if (dirent.isDirectory()) {
        // Recursively generate children for folders
        const children = generateSidebarItemsRecursive(itemPath, basePath);
        return {
          title: formatTitle(dirent.name),
          path: urlPath,
          isFolder: true,
          children: children.length > 0 ? children : undefined,
        };
      } else if (dirent.isFile() && dirent.name.endsWith(".md")) {
        // Generate item for markdown files
        return {
          title: formatTitle(dirent.name.replace(".md", "")),
          path: urlPath.replace(".md", ""),
          isFolder: false,
        };
      }
      return null;
    })
    .filter(Boolean) as SidebarItem[];
};

/**
 * Generates sidebar items from your content folder structure
 * @returns Array of SidebarItem objects for your navigation
 */
export const generateSidebarItems = (): SidebarItem[] => {
  return generateSidebarItemsRecursive(CONTENT_DIR);
};

// Helper to convert kebab-case to Title Case
const formatTitle = (str: string) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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
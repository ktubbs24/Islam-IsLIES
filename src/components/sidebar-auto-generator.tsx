
import path from "path-browserify";

// Define types for our sidebar structure
export interface SidebarItem {
  title: string;
  path: string;
  isFolder?: boolean;
  children?: SidebarItem[];
}

/**
 * Client-side function to generate sidebar items
 * @param basePath - The base path for the content
 * @returns Array of sidebar items for navigation
 */
export const generateSidebarItems = (
  basePath: string = "/content"
): SidebarItem[] => {
  // This is a placeholder implementation that would normally fetch from an API
  // In a real application, you would fetch the folder structure from an API endpoint
  
  // Example structure (replace with actual API call in production)
  const folderStructure = [
    {
      name: "docs",
      isDirectory: true,
      children: [
        { name: "Getting Started", isDirectory: false },
        { name: "Scripture Analysis", isDirectory: false },
        {
          name: "Faith-in-Jesus-leads-to-Salvation",
          isDirectory: true,
          children: [
            { name: "Jesus", isDirectory: false },
            { name: "Salvation", isDirectory: false },
            { name: "Works", isDirectory: false },
            { name: "Sheep", isDirectory: false },
            { name: "Scriptures", isDirectory: false }
          ]
        },
        {
          name: "Faith-in-Mohammad-leads-to-Damnation",
          isDirectory: true,
          children: [
            { name: "Islam", isDirectory: false },
            { name: "The-Quran", isDirectory: false },
            { name: "The-Shahada", isDirectory: false },
            { name: "Mohammad", isDirectory: false },
            { name: "Islamic-Salvation", isDirectory: false }
          ]
        },
        {
          name: "Faith-in-Allah-leads-to-Lies",
          isDirectory: true,
          children: [
            { name: "Allah", isDirectory: false },
            { name: "Satan", isDirectory: false },
            { name: "False-Prophets", isDirectory: false },
            { name: "Deception", isDirectory: false },
            { name: "Comparison-God-Allah", isDirectory: false }
          ]
        }
      ]
    },
    {
      name: "blog",
      isDirectory: true,
      children: [
        { name: "Jesus doesnt deny Himself", isDirectory: false },
        { name: "Understanding Islamic Teachings", isDirectory: false },
        { name: "The Bible Versus the Quran", isDirectory: false }
      ]
    }
  ];
  
  return generateSidebarItemsFromStructure(folderStructure, basePath);
};

/**
 * Helper function to recursively generate sidebar items from a folder structure
 */
const generateSidebarItemsFromStructure = (
  structure: any[],
  basePath: string
): SidebarItem[] => {
  return structure
    .map((item) => {
      // Format path: remove spaces, convert to lowercase, convert .md extension
      const itemPath = item.name
        .replace(/\s+/g, "-")
        .toLowerCase()
        .replace(/\.md$/, "");
      
      const fullPath = `${basePath}/${itemPath}`;
      
      if (item.isDirectory && item.children) {
        // Recursively generate children for folders
        const children = generateSidebarItemsFromStructure(item.children, fullPath);
        return {
          title: formatTitle(item.name),
          path: fullPath,
          isFolder: true,
          children: children.length > 0 ? children : undefined,
        };
      } else {
        // Generate item for files
        return {
          title: formatTitle(item.name),
          path: fullPath,
          isFolder: false,
        };
      }
    })
    .filter(Boolean) as SidebarItem[];
};

// Helper to convert kebab-case or spaces to Title Case
const formatTitle = (str: string) => {
  return str
    .split(/[-\s]/)
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

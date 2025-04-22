import React from "react";
import { Link, useLocation } from "react-router-dom";
import { generateSidebarItems } from "./sidebar-auto-generator";

const DocumentNavigation: React.FC = () => {
  const location = useLocation();
  const sidebarItems = generateSidebarItems();

  // Flatten the sidebar items to create a linear navigation structure
  const flattenItems = (items: any[]): { path: string; title: string }[] => {
    return items.reduce((acc, item) => {
      acc.push({ path: item.path, title: item.title });
      if (item.children) {
        acc = acc.concat(flattenItems(item.children));
      }
      return acc;
    }, [] as { path: string; title: string }[]);
  };

  const allDocuments = flattenItems(sidebarItems);

  // Find the current document and its neighbors
  const currentIndex = allDocuments.findIndex((doc) => doc.path === location.pathname);
  const prevDoc = currentIndex > 0 ? allDocuments[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocuments.length - 1 ? allDocuments[currentIndex + 1] : null;

  return (
    <div className="flex justify-between mt-8">
      {prevDoc ? (
        <Link
          to={prevDoc.path}
          className="text-primary hover:underline transition-colors"
        >
          ← {prevDoc.title}
        </Link>
      ) : (
        <span />
      )}
      {nextDoc ? (
        <Link
          to={nextDoc.path}
          className="text-primary hover:underline transition-colors"
        >
          {nextDoc.title} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
};

export default DocumentNavigation;
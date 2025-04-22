import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  title?: string; // Add the title prop here
}

const Breadcrumbs = ({ items = [], className = "", title }: BreadcrumbProps) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // If no items are provided, build breadcrumb items from the current path
  const breadcrumbItems = items.length > 0 ? items : pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const formattedName = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      label: formattedName,
      path,
    };
  });

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav className={cn("flex mb-6", className)} aria-label="Breadcrumb">
      {title && <h2 className="text-lg font-bold mb-2">{title}</h2>} {/* Display the title if provided */}
      <ol className="inline-flex items-center space-x-1 text-sm md:space-x-3 text-muted-foreground">
        <li>
          <Link to="/" className="flex items-center hover:text-primary">
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            {index === breadcrumbItems.length - 1 ? (
              <span className="text-foreground font-medium">{item.label}</span>
            ) : (
              <Link to={item.path} className="hover:text-primary">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
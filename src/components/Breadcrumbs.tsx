
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  title?: string;
}

const Breadcrumbs = ({ title }: BreadcrumbProps) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  
  // Build breadcrumb items with paths
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const formattedName = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    return {
      name: index === pathSegments.length - 1 && title ? title : formattedName,
      path,
      isLast: index === pathSegments.length - 1,
    };
  });

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
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
            {item.isLast ? (
              <span className="text-foreground font-medium">{item.name}</span>
            ) : (
              <Link 
                to={item.path}
                className="hover:text-primary"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

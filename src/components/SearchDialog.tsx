import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { generateSidebarItems } from "./sidebar-auto-generator"; // Import the sidebar generator
import { useDebounce } from "use-debounce"; // For debouncing search input

interface SearchResult {
  title: string;
  path: string;
  content: string;
}

interface SearchDialogProps {
  placeholder?: string;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ placeholder = "Search..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [debouncedQuery] = useDebounce(query, 300); // Debounce the query to improve performance
  const navigate = useNavigate();

  // Handle focus
  const handleFocus = () => {
    setIsOpen(true);
  };

  // Handle blur with timeout to allow clicking on results
  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (debouncedQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedQuery)}`);
      setIsOpen(false);
    }
  };

  // Handle result click
  const handleResultClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery("");
  };

  // Dynamic search functionality
  useEffect(() => {
    if (debouncedQuery.trim().length > 2) {
      // Generate sidebar items dynamically
      const allItems = generateSidebarItems();

      // Flatten the hierarchy to make searching easier
      const flattenItems = (items: any[]): SearchResult[] => {
        return items.reduce((acc, item) => {
          acc.push({ title: item.title, path: item.path, content: "" }); // Add content if available
          if (item.children) {
            acc = acc.concat(flattenItems(item.children));
          }
          return acc;
        }, [] as SearchResult[]);
      };

      const allResults = flattenItems(allItems);

      // Filter based on query
      const filtered = allResults.filter((result) =>
        result.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );

      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  // Highlight matching text in search results
  const highlightMatch = (text: string, query: string) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Blur overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-90"></div>}

      {/* Search container */}
      <div
        className={`relative w-full max-w-md ${isOpen ? "search-expanded" : ""}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={-1}
      >
        <form onSubmit={handleSearch} className="relative w-full search-container z-100">
          <div className="relative z-100">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 search-icon" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="block w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary search-input"
              aria-label="Search through content"
            />
          </div>

          {isOpen && (
            <div className="search-results absolute top-full mt-2 w-full bg-card shadow-lg rounded-md overflow-hidden z-100">
              {results.length > 0 ? (
                <ul className="divide-y divide-border">
                  {results.map((result, index) => (
                    <li
                      key={index}
                      className="p-3 hover:bg-muted cursor-pointer"
                      onClick={() => handleResultClick(result.path)}
                      role="option"
                    >
                      <div className="block">
                        <h4
                          className="text-sm font-medium"
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(result.title, debouncedQuery),
                          }}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {result.content.slice(0, 100)}...
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : debouncedQuery.trim() ? (
                <div className="p-3 text-sm text-muted-foreground">No results found</div>
              ) : null}
            </div>
          )}
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .search-container {
          position: relative;
          z-index: 100; /* Higher than the blur overlay */
        }

        .search-results {
          z-index: 100; /* Higher than the blur overlay */
        }

        /* Responsive styling for mobile and tablets */
        @media (max-width: 768px) {
          .search-container {
            width: 90%; /* Adjust width for smaller screens */
            margin: 0 auto;
          }

          .search-input {
            font-size: 14px; /* Slightly smaller font size for mobile */
            padding: 10px 12px; /* Adjust padding for better fit */
          }

          .search-results {
            width: 100%; /* Ensure results take full width on mobile */
          }
        }
      `}} />
    </div>
  );
};

export default SearchDialog;
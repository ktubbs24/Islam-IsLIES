
import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
}

// Mock search results - in a real app this would come from an API or search index
const mockResults: SearchResult[] = [
  {
    title: "Jesus Doesn't Deny Himself",
    path: "/biblical-truths/jesus-doesnt-deny-himself",
    excerpt: "Explaining how Jesus' 'Why do you call me good?' statement is not a denial of divinity..."
  },
  {
    title: "Bible vs Quran",
    path: "/comparative-studies/bible-vs-quran",
    excerpt: "Comparative analysis of Biblical and Quranic teachings..."
  },
  {
    title: "About Islam IsLIES",
    path: "/about",
    excerpt: "Our mission to reveal Biblical truths about Islam..."
  }
];

const SearchDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const openSearch = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };
  
  const closeSearch = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
    setQuery("");
    setResults([]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
      // Close on Escape
      if (e.key === "Escape" && isOpen) {
        closeSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Handle clicks outside to close
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  // Simple search function
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = mockResults.filter(
      item => item.title.toLowerCase().includes(query.toLowerCase()) ||
             item.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(filtered);
  }, [query]);

  const handleResultClick = (path: string) => {
    navigate(path);
    closeSearch();
  };

  return (
    <>
      <button
        onClick={openSearch}
        className="p-2 rounded-md hover:bg-muted transition-colors flex items-center gap-2 text-sm text-muted-foreground"
        aria-label="Search documentation"
      >
        <Search size={18} />
        <span>Search...</span>
        <kbd className="hidden sm:inline-flex ml-auto h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-[20vh]">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm animate-fade-in" />
          
          {/* Search dialog */}
          <div
            ref={searchRef}
            className="relative z-50 w-full max-w-lg animate-scale-in overflow-hidden rounded-lg border bg-background shadow-lg"
          >
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation..."
                className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="mr-2"
                >
                  <X className="h-4 w-4 opacity-50" />
                </button>
              )}
              <button
                onClick={closeSearch}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {results.length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto p-2">
                {results.map((result, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left px-4 py-2 hover:bg-muted rounded-md flex flex-col"
                    onClick={() => handleResultClick(result.path)}
                  >
                    <span className="font-medium">{result.title}</span>
                    <span className="text-sm text-muted-foreground">{result.excerpt}</span>
                  </button>
                ))}
              </div>
            ) : query ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            ) : null}
            
            {!query && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Type to search documentation
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchDialog;

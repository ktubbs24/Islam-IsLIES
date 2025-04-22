
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchResult {
  title: string;
  path: string;
  content: string;
}

interface SearchDialogProps {
  placeholder?: string;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ placeholder = 'Search...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
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
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // For now, just navigate to a search results page
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };
  
  // Handle result click
  const handleResultClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };
  
  // Basic search functionality (replace with more advanced search later)
  useEffect(() => {
    if (query.trim().length > 2) {
      // Simulated search results (replace with actual search later)
      const mockResults: SearchResult[] = [
        {
          title: "Jesus doesn't deny Himself",
          path: "/blog/jesus-denial",
          content: "Jesus came and humbled Himself even in speech so when He says no man is good but God alone..."
        },
        {
          title: "Understanding Islamic Teachings",
          path: "/blog/islamic-teachings",
          content: "A critical analysis of Islamic teachings and their contradictions with biblical truth..."
        }
      ];
      
      // Filter based on query
      const filtered = mockResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) || 
        result.content.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);
  
  return (
    <div className="relative w-full max-w-md">
      {/* Blur overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-90"></div>}

      {/* Search container */}
      <div
        className={`relative w-full max-w-md ${isOpen ? 'search-expanded' : ''}`}
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
                    >
                      <div className="block">
                        <h4 className="text-sm font-medium">{result.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {result.content.slice(0, 100)}...
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : query.trim() ? (
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
      `}} />
    </div>
  );
};

export default SearchDialog;

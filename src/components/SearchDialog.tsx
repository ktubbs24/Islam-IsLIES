import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

interface SearchDialogProps {
  placeholder?: string;
  documents: { title: string; path: string; content: string }[];
}

const SearchDialog: React.FC<SearchDialogProps> = ({ placeholder = "Search documents...", documents }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const fuse = new Fuse(documents, {
    keys: ['title', 'content'],
    threshold: 0.3,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const searchResults = fuse.search(query).map(result => result.item);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
    document.body.classList.add('search-overlay-active');
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
      document.body.classList.remove('search-overlay-active');
    }
  };

  const handleResultClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
    document.body.classList.remove('search-overlay-active');
  };

  useEffect(() => {
    if (query.trim()) {
      const searchResults = fuse.search(query).map(result => result.item);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        document.body.classList.remove('search-overlay-active');
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div
      className={`relative w-full max-w-md ${isOpen ? 'search-expanded' : ''}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={-1}
    >
      <form onSubmit={handleSearch} className="relative w-full search-container">
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

      <style jsx>{`
        /* Background overlay when search is active */
        body.search-overlay-active::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(3px);
          z-index: 90; /* Lower than the search container */
          animation: fadeIn 0.2s ease;
        }

        /* Ensure input and results are above the blur overlay */
        .search-container {
          position: relative;
          z-index: 100; /* Higher than the blur overlay */
        }

        .search-results {
          z-index: 100; /* Higher than the blur overlay */
        }

        /* Fade-in animation for the overlay */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchDialog;
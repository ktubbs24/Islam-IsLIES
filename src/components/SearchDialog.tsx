
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '@/services/searchService';
import { useNavigate } from 'react-router-dom';

interface SearchDialogProps {
  placeholder?: string;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ placeholder = "Search documents..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const { search, indexed } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    
    if (query.trim() && indexed) {
      const searchResults = search(query);
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
    // Only close if not clicking on a search result
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
  
  // Update search results on query change
  useEffect(() => {
    if (query.trim() && indexed) {
      const searchResults = search(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, search, indexed]);
  
  // Close search on Escape key
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
        <div className="relative">
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
          <div className="search-results absolute top-full mt-2 w-full bg-card shadow-lg rounded-md overflow-hidden z-50">
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
                      <p className="text-xs text-muted-foreground mt-1">{result.excerpt}</p>
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
        /* Default state - centered in header */
        .search-container {
          position: relative;
          transition: all 0.3s ease;
          width: 100%;
          margin: 0 auto;
        }
        
        /* Expanded state - centered in viewport */
        .search-expanded .search-container {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          max-width: 600px;
          z-index: 100;
        }
        
        /* Input styling */
        .search-input {
          transition: all 0.3s ease;
          width: 100%;
          border-color: transparent;
        }
        
        .search-input:focus {
          box-shadow: 0 0 0 3px rgba(45, 166, 95, 0.25);
          transform: scale(1.02);
        }
        
        /* Icon animation */
        .search-icon {
          transition: all 0.3s ease;
        }
        
        .search-input:focus ~ .search-icon {
          color: rgba(45, 166, 95, 1);
        }
        
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
          z-index: 90;
          animation: fadeIn 0.2s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Gentle pulse animation for the search input */
        @keyframes gentle-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(45, 166, 95, 0.2);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(45, 166, 95, 0.1);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(45, 166, 95, 0.2);
          }
        }
        
        /* Apply animation to the search input */
        .search-input:not(:focus) {
          animation: gentle-pulse 3s infinite ease-in-out;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .search-expanded .search-container {
            width: 90%;
            top: 15%;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchDialog;

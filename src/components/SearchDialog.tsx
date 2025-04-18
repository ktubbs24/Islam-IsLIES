
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useSearch } from '@/services/searchService';

interface SearchDialogProps {
  placeholder?: string;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ placeholder = "Search documents..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { search, loading, indexed } = useSearch();
  const isMobile = window.innerWidth <= 768;
  
  // Handle search when query changes
  useEffect(() => {
    if (query.trim().length > 1) {
      const searchResults = search(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, search]);
  
  // Handle click outside to close expanded search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Handle escape key to close search
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);
  
  const handleFocus = () => {
    setIsOpen(true);
    // Focus the input after a short delay to ensure the expanded state is set
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 10);
  };
  
  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // Implement search functionality here
  };

  return (
    <>
      {/* Overlay for when search is open */}
      {isOpen && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClose}
        ></div>
      )}
      
      <div 
        className={`relative ${isMobile ? 'w-full' : 'w-full max-w-md'} ${isOpen ? 'z-50' : 'z-0'}`}
        ref={searchContainerRef}
      >
        <form 
          onSubmit={handleSearch} 
          className={`relative search-container transition-all ${
            isOpen 
              ? 'fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[600px]' 
              : 'w-full mx-auto'
          }`}
        >
          <div className="relative">
            <Search 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground search-icon ${
                isOpen ? 'h-5 w-5' : 'h-4 w-4'
              }`} 
            />
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              onFocus={handleFocus}
              className={`block w-full rounded-md border border-input bg-background py-2 pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary search-input transition-all ${
                isOpen ? 'py-3 text-base' : ''
              }`}
            />
            {isOpen && (
              <button 
                type="button" 
                onClick={handleClose}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Search Results */}
          {isOpen && query.length > 1 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-input rounded-md shadow-lg max-h-[60vh] overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : results.length > 0 ? (
                <ul className="py-2">
                  {results.map((result) => (
                    <li key={result.id} className="px-4 py-2 hover:bg-accent cursor-pointer">
                      <a href={result.path} className="block">
                        <div className="font-medium">{result.title}</div>
                        <div className="text-sm text-muted-foreground">{result.excerpt}</div>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : query.length > 1 ? (
                <div className="p-4 text-center">No results found</div>
              ) : null}
            </div>
          )}
        </form>
      </div>
      <style>
        {`.search-container {
          transition: all 0.3s ease;
          margin: 0 auto;
        }
        
        .search-input {
          transition: all 0.3s ease;
          width: 100%;
        }
        
        .search-input:focus {
          box-shadow: 0 0 0 3px rgba(45, 166, 95, 0.2);
          transform: scale(1.02);
        }
        
        .search-icon {
          transition: all 0.3s ease;
        }
        
        .search-input:focus + .search-icon {
          color: rgba(45, 166, 95, 1);
        }
        
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
        
        .search-input {
          animation: gentle-pulse 3s infinite ease-in-out;
        }

        @media (max-width: 768px) {
          .search-container.w-full {
            max-width: calc(100% - 20px);
          }
        }
        `}
      </style>
    </>
  );
};

export default SearchDialog;

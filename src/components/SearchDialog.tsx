
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchDialogProps {
  placeholder?: string;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ placeholder = "Search documents..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // Implement search functionality here
  };

  return (
    <div className="relative w-full max-w-md">
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
      </form>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .search-container {
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
          .search-container {
            max-width: 100%;
          }
        }
      ` }} />
    </div>
  );
};

export default SearchDialog;

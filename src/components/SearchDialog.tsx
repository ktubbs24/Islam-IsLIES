
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchDialogProps {
  placeholder?: string;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ placeholder = "Search..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // Implement search functionality here
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative w-full max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="block w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchDialog;

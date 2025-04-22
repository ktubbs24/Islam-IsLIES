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
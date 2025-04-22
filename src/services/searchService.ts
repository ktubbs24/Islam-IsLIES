import { useState, useEffect, useCallback } from 'react';

interface SearchResult {
  id: string;
  title: string;
  path: string;
  excerpt: string;
  score: number;
}

interface SearchIndex {
  [key: string]: {
    id: string;
    title: string;
    path: string;
    content: string;
    date?: string;
    category?: string;
  };
}

export const useSearch = () => {
  const [searchIndex, setSearchIndex] = useState<SearchIndex | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [indexed, setIndexed] = useState<boolean>(false);

  useEffect(() => {
    const loadSearchIndex = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/search-index'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch search index: ${response.status}`);
        }
        const index: SearchIndex = await response.json();
        setSearchIndex(index);
        setIndexed(true);
      } catch (error) {
        console.error('Failed to load search index:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSearchIndex();
  }, []);

  const search = useCallback((query: string): SearchResult[] => {
    if (!searchIndex || !query.trim()) {
      return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const words = normalizedQuery.split(/\s+/);
    const results: SearchResult[] = [];

    Object.values(searchIndex).forEach(item => {
      const normalizedTitle = item.title.toLowerCase();
      const normalizedContent = item.content.toLowerCase();

      let score = 0;
      let matchFound = false;

      if (normalizedTitle.includes(normalizedQuery)) {
        score += 10;
        matchFound = true;
      }

      for (const word of words) {
        if (word.length > 2 && normalizedTitle.includes(word)) {
          score += 5;
          matchFound = true;
        }
      }

      if (normalizedContent.includes(normalizedQuery)) {
        score += 5;
        matchFound = true;
      }

      for (const word of words) {
        if (word.length > 2 && normalizedContent.includes(word)) {
          score += 2;
          matchFound = true;
        }
      }

      if (matchFound) {
        let excerpt = '';
        const queryPos = normalizedContent.indexOf(normalizedQuery);

        if (queryPos !== -1) {
          const startPos = Math.max(0, queryPos - 50);
          const endPos = Math.min(normalizedContent.length, queryPos + normalizedQuery.length + 50);
          excerpt = '...' + item.content.substring(startPos, endPos) + '...';
        } else {
          for (const word of words) {
            if (word.length > 2) {
              const wordPos = normalizedContent.indexOf(word);
              if (wordPos !== -1) {
                const startPos = Math.max(0, wordPos - 50);
                const endPos = Math.min(normalizedContent.length, wordPos + word.length + 50);
                excerpt = '...' + item.content.substring(startPos, endPos) + '...';
                break;
              }
            }
          }
        }

        if (!excerpt) {
          excerpt = item.content.substring(0, 100) + '...';
        }

        results.push({
          id: item.id,
          title: item.title,
          path: item.path,
          excerpt: excerpt,
          score: score
        });
      }
    });

    return results.sort((a, b) => b.score - a.score);
  }, [searchIndex]);

  return {
    search,
    loading,
    indexed
  };
};
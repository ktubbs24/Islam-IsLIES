
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

/**
 * Custom hook for performing full-text search on content
 */
export const useSearch = () => {
  const [searchIndex, setSearchIndex] = useState<SearchIndex | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [indexed, setIndexed] = useState<boolean>(false);
  
  // Load and index content
  useEffect(() => {
    const loadSearchIndex = async () => {
      setLoading(true);
      
      try {
        // This would be your API endpoint in a real implementation
        // For now, we'll build a search index from known content
        
        // Build search index from all content types
        const index: SearchIndex = {
          'welcome': {
            id: 'welcome',
            title: 'Welcome to Islam IsLIES',
            path: '/getting-started',
            content: 'Welcome to Islam IsLIES. This is a site dedicated to exposing the lies of Islam. The purpose of this site is to help Muslims and non-Muslims alike understand the truth about Islam.'
          },
          'gospel': {
            id: 'gospel',
            title: 'The Gospel',
            path: '/gospel',
            content: 'The Gospel is the good news that Jesus Christ died for our sins, was buried, and rose again on the third day. This is the message of salvation that we preach.'
          },
          'about': {
            id: 'about',
            title: 'About Islam IsLIES',
            path: '/about',
            content: 'Islam IsLIES is dedicated to showing the truth about Islam and its false teachings through a Christian perspective.'
          },
          'jesus': {
            id: 'jesus',
            title: 'Jesus - The Way, the Truth, and the Life',
            path: '/jesus',
            content: 'Jesus Christ is the central figure of Christianity, the Son of God who came to Earth as a human to save humanity from sin. He is not merely a prophet, as Islam claims, but God incarnate.'
          },
          'allah': {
            id: 'allah',
            title: 'Allah',
            path: '/allah',
            content: 'Understanding the concept of Allah in Islam and why it differs from the Biblical God.'
          },
          'quran': {
            id: 'quran',
            title: 'The Quran',
            path: '/quran',
            content: 'Analysis of the Quran and its contradictions with Biblical truth.'
          },
          'faq': {
            id: 'faq',
            title: 'Frequently Asked Questions',
            path: '/faq',
            content: 'Common questions about Christianity, Islam, and salvation through Jesus Christ.'
          },
          'salvation': {
            id: 'salvation',
            title: 'Salvation',
            path: '/salvation',
            content: 'Salvation comes through faith in Jesus Christ alone, not through works or following false prophets.'
          },
        };
        
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
  
  // Search function
  const search = useCallback((query: string): SearchResult[] => {
    if (!searchIndex || !query.trim()) {
      return [];
    }
    
    const normalizedQuery = query.toLowerCase().trim();
    const words = normalizedQuery.split(/\s+/);
    const results: SearchResult[] = [];
    
    // Search through the index
    Object.values(searchIndex).forEach(item => {
      const normalizedTitle = item.title.toLowerCase();
      const normalizedContent = item.content.toLowerCase();
      
      let score = 0;
      let matchFound = false;
      
      // Check exact matches in title (highest score)
      if (normalizedTitle.includes(normalizedQuery)) {
        score += 10;
        matchFound = true;
      }
      
      // Check word matches in title
      for (const word of words) {
        if (word.length > 2 && normalizedTitle.includes(word)) {
          score += 5;
          matchFound = true;
        }
      }
      
      // Check exact matches in content
      if (normalizedContent.includes(normalizedQuery)) {
        score += 5;
        matchFound = true;
      }
      
      // Check word matches in content
      for (const word of words) {
        if (word.length > 2 && normalizedContent.includes(word)) {
          score += 2;
          matchFound = true;
        }
      }
      
      if (matchFound) {
        // Generate an excerpt with match context
        let excerpt = '';
        const queryPos = normalizedContent.indexOf(normalizedQuery);
        
        if (queryPos !== -1) {
          const startPos = Math.max(0, queryPos - 50);
          const endPos = Math.min(normalizedContent.length, queryPos + normalizedQuery.length + 50);
          excerpt = '...' + item.content.substring(startPos, endPos) + '...';
        } else {
          // If exact query not found, look for first word match
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
        
        // If still no excerpt, use first 100 chars
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
    
    // Sort by score
    return results.sort((a, b) => b.score - a.score);
  }, [searchIndex]);
  
  return {
    search,
    loading,
    indexed
  };
};

import { useState, useCallback } from 'react';
import { SearchService, SearchResult, SearchFilters } from '../services/searchService';

export const useSearch = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);

  const performSearch = useCallback(async (filters: SearchFilters) => {
    if (!filters.query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchResults = await SearchService.search(filters);
      setResults(searchResults);
    } catch (err: any) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadRecentSearches = useCallback(async () => {
    try {
      const recent = await SearchService.getRecentSearches();
      setRecentSearches(recent);
    } catch (err: any) {
      console.error('Failed to load recent searches:', err);
    }
  }, []);

  return {
    results,
    loading,
    error,
    recentSearches,
    performSearch,
    loadRecentSearches,
  };
};

import { useQuery } from '@tanstack/react-query';
import type { WikiData } from '../types';
import { mockWikiData } from '@/mocks/api/wiki';

// Use window.location.origin as fallback
const API_BASE = import.meta.env.VITE_API_URL || window.location.origin;

export const useWikiData = () => {
  return useQuery<WikiData>({
    queryKey: ['wiki'],
    queryFn: async () => {
      // Temporarily use mock data in all environments until API is ready
      return mockWikiData;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
}; 
import { useQuery } from '@tanstack/react-query';
import type { WikiData } from '../types';
import { mockWikiData } from '@/mocks/api/wiki';

const isDevelopment = process.env.NODE_ENV === 'development';

export const useWikiData = () => {
  return useQuery<WikiData>({
    queryKey: ['wiki'],
    queryFn: async () => {
      // Use mock data in development
      if (isDevelopment) {
        return mockWikiData;
      }

      try {
        const response = await fetch('/api/wiki/data', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `API Error: ${response.status} ${response.statusText}\n${errorText}`
          );
        }

        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          const text = await response.text();
          console.error('Invalid response:', {
            contentType,
            responseText: text.substring(0, 200) + '...'
          });
          throw new Error(`Invalid content type: ${contentType}`);
        }

        const data = await response.json();
        return data as WikiData;
      } catch (error) {
        console.error('Wiki data fetch error:', {
          error,
          timestamp: new Date().toISOString(),
          endpoint: '/api/wiki/data',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    retry: (failureCount, error) => {
      if (error instanceof Error) {
        const shouldNotRetry = [
          'content type',
          '404',
          '401',
          '403'
        ].some(code => error.message.includes(code));
        return !shouldNotRetry && failureCount < 3;
      }
      return failureCount < 3;
    },
    onError: (error) => {
      console.error('Query error:', {
        error,
        queryKey: ['wiki'],
        timestamp: new Date().toISOString()
      });
    }
  });
}; 
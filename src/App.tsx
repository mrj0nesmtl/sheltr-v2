import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MetaTags } from '@/components/SEO/MetaTags';

export function App() {
  return (
    <RouterProvider 
      router={router} 
      fallbackElement={
        <ThemeProvider>
          <HelmetProvider>
            <ErrorBoundary>
              <MetaTags />
              <div>Loading...</div>
            </ErrorBoundary>
          </HelmetProvider>
        </ThemeProvider>
      }
    />
  );
}

export default App;
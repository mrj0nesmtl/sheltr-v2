import { BrowserRouter } from 'react-router-dom';
import { Layout } from '@/layouts/base/Layout';
import AppRoutes from './routes/AppRoutes';
import { HelmetProvider } from 'react-helmet-async';
import { MetaTags } from '@/components/SEO/MetaTags';
import { ScrollToTop } from '@/components/ScrollToTop';

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MetaTags />
        <Layout>
          <div className="min-h-screen bg-gray-900">
            <AppRoutes />
          </div>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
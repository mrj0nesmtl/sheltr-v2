import { BrowserRouter } from 'react-router-dom';
import { Layout } from '@/layouts/base/Layout';
import AppRoutes from './routes/AppRoutes';
import { HelmetProvider } from 'react-helmet-async';
import { MetaTags } from '@/components/SEO/MetaTags';

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
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
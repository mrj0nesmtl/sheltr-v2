import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from '@/auth/components/AuthProvider';
import { Layout } from '@/layouts/base/Layout';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <div className="min-h-screen bg-gray-900">
            <AppRoutes />
          </div>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
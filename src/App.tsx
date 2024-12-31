import { BrowserRouter } from 'react-router-dom';
import { Layout } from '@/layouts/base/Layout';
import AppRoutes from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div className="min-h-screen bg-gray-900">
          <AppRoutes />
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
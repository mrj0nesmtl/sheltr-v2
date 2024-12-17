import { BrowserRouter } from 'react-router-dom';
import { Header } from '@/components/Layout/Header';
import AppRoutes from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main className="pt-16">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
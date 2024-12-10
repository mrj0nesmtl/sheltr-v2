import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Layout } from './components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '*',
        element: <AppRoutes />
      }
    ]
  }
]); 
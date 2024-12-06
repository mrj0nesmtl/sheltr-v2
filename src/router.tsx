import { createBrowserRouter } from 'react-router-dom';
import { TokenPage } from '@/components/Token/TokenPage';
import { VerifyPage } from '@/components/Verify/VerifyPage';

export const router = createBrowserRouter([
  {
    path: '/token',
    element: <TokenPage />
  },
  {
    path: '/verify',
    element: <VerifyPage />
  }
]); 
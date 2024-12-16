import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/auth/components/AuthProvider';
import { Layout } from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import { About } from './pages/About';
import HowItWorks from '@/pages/HowItWorks';
import Solutions from '@/pages/Solutions';
import ImpactPage from '@/pages/ImpactPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import ScanDonatePage from '@/pages/ScanDonatePage';
import './styles/globals.css';
import { Footer } from '@/components/Footer/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Layout>
            <div className="min-h-screen flex flex-col">
              <main className="flex-grow pb-[300px]">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/impact" element={<ImpactPage />} />
                  <Route path="/scan-donate" element={<ScanDonatePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Layout>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
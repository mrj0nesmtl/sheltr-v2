import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Layout/Header';
import HomePage from '@/pages/HomePage';
import HowItWorks from '@/pages/HowItWorks';
import Solutions from '@/pages/Solutions';
import ImpactPage from '@/pages/ImpactPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import ScanDonatePage from '@/pages/ScanDonatePage';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/scan-donate" element={<ScanDonatePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
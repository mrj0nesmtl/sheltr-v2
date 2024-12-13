import { Button } from '@/components/ui/Button';
import { Calendar, DollarSign, QrCode, TrendingUp } from 'lucide-react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAuthStore } from '../../stores/authStore';

interface DonationData {
  id: string;
  amount: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: string;
  donor_name?: string;
}

export function ParticipantDashboard() {
  const { user, signOut } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [donations, setDonations] = React.useState<DonationData[]>([]);
  const [qrCode, setQrCode] = React.useState<string>('');
  const [stats, setStats] = React.useState({
    totalReceived: 0,
    housingFund: 0,
    donationCount: 0
  });

  useEffect(() => {
    if (!user || user.role !== 'participant') {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  React.useEffect(() => {
    // TODO: Fetch participant data from Supabase
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {t('dashboard.participant.title', { name: user?.name })}
          </h1>
          <p className="text-gray-400">
            {t('dashboard.participant.subtitle')}
          </p>
        </div>
        <Button
          variant="default"
          onClick={signOut}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Sign Out
        </Button>
      </div>
      
      <div className="min-h-screen bg-gray-900">
        <div className="pt-20 pb-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Cards */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Received</p>
                  <p className="text-2xl font-bold text-white">
                    ${stats.totalReceived.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Housing Fund</p>
                  <p className="text-2xl font-bold text-white">
                    ${stats.housingFund.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Donations</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.donationCount}
                  </p>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Your QR Code
              </h2>
              <div className="flex items-center justify-center bg-white p-4 rounded-lg">
                <img src={qrCode} alt="Your QR Code" className="w-48 h-48" />
              </div>
              <p className="mt-4 text-center text-gray-400">
                Share this QR code to receive donations
              </p>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {donations.slice(0, 5).map(donation => (
                  <div key={donation.id} className="flex items-start gap-3">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <DollarSign className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        ${donation.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(donation.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation Chart */}
            <div className="lg:col-span-3 bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Donation History</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={donations}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="timestamp"
                      tickFormatter={(date) => new Date(date).toLocaleDateString()}
                      stroke="#9CA3AF"
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
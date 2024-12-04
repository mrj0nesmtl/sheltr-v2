import React from 'react';
import { useParams } from 'react-router-dom';
import { QrCode, Wallet, Home, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/utils';

interface DonationHistory {
  date: string;
  amount: number;
}

interface ParticipantData {
  id: string;
  name: string;
  qr_code: string;
  total_received: number;
  housing_fund: number;
  wallet_balance: number;
  donation_history: DonationHistory[];
  created_at: string;
}

export function ParticipantProfile() {
  const { id } = useParams();
  const [participant, setParticipant] = React.useState<ParticipantData | null>(null);

  React.useEffect(() => {
    // TODO: Fetch participant data
  }, [id]);

  if (!participant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
            <h1 className="text-2xl font-bold text-white mb-6">{participant.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Wallet className="h-5 w-5" />
                  <span>Available Balance</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  ${participant.wallet_balance.toFixed(2)}
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Home className="h-5 w-5" />
                  <span>Housing Fund</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  ${participant.housing_fund.toFixed(2)}
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Total Received</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  ${participant.total_received.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Donation History</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={participant.donation_history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="date"
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

        <div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">QR Code</h2>
            <div className="bg-white rounded-lg p-4 flex items-center justify-center">
              <QrCode className="h-48 w-48" />
            </div>
            <p className="text-center text-gray-400 mt-4">
              Scan to donate directly to {participant.name}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Account Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">Member Since</label>
                <div className="flex items-center gap-2 text-white mt-1">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(participant.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
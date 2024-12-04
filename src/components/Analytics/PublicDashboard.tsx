import React from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, Users, Home, TrendingUp, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

interface AnalyticsData {
  totalDonations: number;
  totalParticipants: number;
  totalHousingFund: number;
  averageDonation: number;
  impactMetrics: {
    participantsHoused: number;
    communitiesServed: number;
    monthlyGrowth: number;
  };
  donationTrends: Array<{
    date: string;
    amount: number;
  }>;
  locationData: Array<{
    city: string;
    participants: number;
    donations: number;
  }>;
}

export function PublicDashboard() {
  const { t } = useTranslation();
  const [data, setData] = React.useState<AnalyticsData>({
    totalDonations: 125000,
    totalParticipants: 250,
    totalHousingFund: 45000,
    averageDonation: 50,
    impactMetrics: {
      participantsHoused: 15,
      communitiesServed: 8,
      monthlyGrowth: 12
    },
    donationTrends: [
      { date: '2024-01', amount: 15000 },
      { date: '2024-02', amount: 22000 },
      { date: '2024-03', amount: 28000 }
    ],
    locationData: [
      { city: 'New York', participants: 85, donations: 42000 },
      { city: 'Los Angeles', participants: 65, donations: 35000 },
      { city: 'Chicago', participants: 45, donations: 28000 }
    ]
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="relative flex-grow">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
            alt="Analytics background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-6">
              {t('impact.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('impact.subtitle')}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Donations</p>
                  <p className="text-2xl font-bold text-white">
                    ${data.totalDonations.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Active Participants</p>
                  <p className="text-2xl font-bold text-white">
                    {data.totalParticipants.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Home className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Housing Fund</p>
                  <p className="text-2xl font-bold text-white">
                    ${data.totalHousingFund.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Average Donation</p>
                  <p className="text-2xl font-bold text-white">
                    ${data.averageDonation.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Housing Impact</h3>
              <div className="flex items-center gap-4">
                <Home className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-3xl font-bold text-white">
                    {data.impactMetrics.participantsHoused}
                  </p>
                  <p className="text-sm text-gray-400">Participants Housed</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Communities Served</h3>
              <div className="flex items-center gap-4">
                <MapPin className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-3xl font-bold text-white">
                    {data.impactMetrics.communitiesServed}
                  </p>
                  <p className="text-sm text-gray-400">Cities & Towns</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Monthly Growth</h3>
              <div className="flex items-center gap-4">
                <TrendingUp className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-3xl font-bold text-white">
                    {data.impactMetrics.monthlyGrowth}%
                  </p>
                  <p className="text-sm text-gray-400">Increase in Donations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Trends Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Donation Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.donationTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="date"
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

          {/* Location Data */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-16">
            <h2 className="text-xl font-bold text-white mb-6">Community Impact</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4 text-gray-400">City</th>
                    <th className="pb-4 text-gray-400">Participants</th>
                    <th className="pb-4 text-gray-400">Total Donations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {data.locationData.map((location) => (
                    <tr key={location.city}>
                      <td className="py-3 text-white">{location.city}</td>
                      <td className="py-3 text-white">{location.participants}</td>
                      <td className="py-3 text-white">${location.donations.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('impact.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {t('impact.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup/donor"
                className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {t('common.cta.becomeDonor')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/signup/shelter"
                className="inline-flex items-center px-8 py-3 border border-white text-lg font-medium rounded-md text-white hover:bg-white/10"
              >
                {t('common.cta.partnerWithUs')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
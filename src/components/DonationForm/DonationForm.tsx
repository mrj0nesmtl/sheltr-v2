import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DollarSign, Mail } from 'lucide-react';
import { useDonationStore } from '../../stores/donationStore';

export function DonationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const { isLoading, error, processDonation } = useDonationStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !amount) return;

    try {
      await processDonation(id, Number(amount), email);
      navigate('/thank-you');
    } catch (error) {
      console.error('Donation failed:', error);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Make a Donation</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-md text-red-200">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
                Donation Amount (USD)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  min="1"
                  step="0.01"
                  required
                  className="bg-white/5 border border-gray-600 text-white block w-full pl-10 pr-12 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-white/5 border border-gray-600 text-white block w-full pl-10 pr-12 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Donation Breakdown</h3>
              <div className="space-y-1 text-sm text-gray-400">
                <p>80% - Direct Support: ${(Number(amount) * 0.8).toFixed(2)}</p>
                <p>15% - Housing Fund: ${(Number(amount) * 0.15).toFixed(2)}</p>
                <p>5% - Operations: ${(Number(amount) * 0.05).toFixed(2)}</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !amount}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Donate Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function ThankYou() {
  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Thank You for Your Donation!</h2>
          <p className="text-gray-300 mb-6">
            Your contribution will make a real difference in someone's life. We've sent you a confirmation email with the transaction details.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
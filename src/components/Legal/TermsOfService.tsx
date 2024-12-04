import React from 'react';

export function TermsOfService() {
  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
          
          <div className="prose prose-invert">
            <p className="text-gray-300">Last updated: March 1, 2024</p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing and using SHELTR's platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Use of Service</h2>
            <p className="text-gray-300">
              You agree to use our service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Donations</h2>
            <p className="text-gray-300">
              All donations made through our platform are final. We use secure payment processing and maintain transparent records of all transactions.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Privacy</h2>
            <p className="text-gray-300">
              Your use of our service is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect and use your information.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Contact</h2>
            <p className="text-gray-300">
              For any questions regarding these Terms, please contact us at{' '}
              <a href="mailto:support@arcanaconcept.com" className="text-indigo-400 hover:text-indigo-300">
                support@arcanaconcept.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
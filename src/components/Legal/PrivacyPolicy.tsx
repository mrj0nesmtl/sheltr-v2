
export function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
          
          <div className="prose prose-invert">
            <p className="text-gray-300">Last updated: March 1, 2024</p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-300">
              SHELTR ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Information We Collect</h2>
            <p className="text-gray-300">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-300">
              <li>Name and contact information</li>
              <li>Payment information</li>
              <li>Donation history</li>
              <li>Location data when making donations</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-300">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-300">
              <li>Process donations</li>
              <li>Provide customer support</li>
              <li>Send transaction confirmations</li>
              <li>Improve our services</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at{' '}
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
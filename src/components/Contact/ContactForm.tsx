import { Building2, Mail, Phone, Send, Users } from 'lucide-react';
import React, { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    shelterSize: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Implement form submission to Supabase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitStatus('success');
      setFormData({
        organizationName: '',
        contactName: '',
        email: '',
        phone: '',
        shelterSize: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="relative overflow-hidden pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-6">
              Partner With SHELTR
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join us in revolutionizing charitable giving and making a lasting impact in your community.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-md text-green-200">
                Thank you for your interest! We'll be in touch soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-md text-red-200">
                Something went wrong. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="organizationName" className="block text-sm font-medium text-gray-300">
                    Organization Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="organizationName"
                      id="organizationName"
                      required
                      className="bg-white/5 border border-gray-600 text-white block w-full pl-10 pr-12 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.organizationName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-300">
                    Contact Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="contactName"
                      id="contactName"
                      required
                      className="bg-white/5 border border-gray-600 text-white block w-full pl-10 pr-12 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.contactName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="bg-white/5 border border-gray-600 text-white block w-full pl-10 pr-12 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="bg-white/5 border border-gray-600 text-white block w-full pl-10 pr-12 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="shelterSize" className="block text-sm font-medium text-gray-300">
                  Shelter Size
                </label>
                <select
                  name="shelterSize"
                  id="shelterSize"
                  required
                  className="mt-1 bg-white/5 border border-gray-600 text-white block w-full py-2 px-3 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.shelterSize}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select size</option>
                  <option value="small">Small (1-50 beds)</option>
                  <option value="medium">Medium (51-150 beds)</option>
                  <option value="large">Large (151+ beds)</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="mt-1 bg-white/5 border border-gray-600 text-white block w-full py-2 px-3 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) throw error;
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {status === 'success' && (
        <p className="mt-2 text-green-600 dark:text-green-400">Successfully subscribed!</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-red-600 dark:text-red-400">Error subscribing. Please try again.</p>
      )}
    </form>
  );
}; 
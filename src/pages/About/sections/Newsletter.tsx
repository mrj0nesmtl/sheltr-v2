import { NewsletterForm } from '../components';

export const Newsletter = () => {
  return (
    <section className="py-16 bg-primary-50 dark:bg-primary-900/20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Join our newsletter for the latest updates on our mission to hack homelessness.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}; 
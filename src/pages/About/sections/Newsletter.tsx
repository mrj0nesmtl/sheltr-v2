export function Newsletter() {
  return (
    <section className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="relative bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-10 border border-purple-500/20 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-3 text-white">
              Stay Updated
            </h2>
            <p className="text-gray-300">
              Join our newsletter for the latest updates on our mission to hack homelessness.
            </p>
          </div>
          
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-900/40 border border-purple-500/20 
                       rounded-lg text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-purple-500/40 
                       focus:border-transparent transition-all"
            />
            <button
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white 
                       rounded-lg font-medium transition-colors duration-200
                       hover:shadow-lg hover:shadow-purple-500/20"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 
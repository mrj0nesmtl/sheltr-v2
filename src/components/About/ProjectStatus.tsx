import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { motion } from 'framer-motion';

interface ProjectDoc {
  content: string;
  title: string;
}

export function ProjectStatus() {
  const [docs, setDocs] = useState<ProjectDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStatus() {
      try {
        setLoading(true);
        const files = [
          'project/progress/status_report.md',
          'project/technical/build_tract.md',
          'project/progress/checkpoint.md'
        ];

        const responses = await Promise.all(
          files.map(async (file) => {
            const response = await fetch(`/docs/${file}`);
            if (!response.ok) {
              throw new Error(`Failed to load ${file}`);
            }
            const text = await response.text();
            const html = marked(text);
            return {
              content: html,
              title: file.split('/').pop()?.replace('.md', '') || ''
            };
          })
        );

        setDocs(responses);
      } catch (err) {
        setError('Failed to load project status');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadStatus();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400">
        <p>Loading project status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (!docs.length) {
    return (
      <div className="text-center text-gray-400">
        <p>No status documents available</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Status Report Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">📊</div>
            <h3 className="text-2xl font-bold text-white">Status Report</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-300">
              <span>Version: 0.4.2</span>
              <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-sm">
                Pivoting
              </span>
            </div>
            
            <div className="prose prose-invert">
              <h4 className="text-xl font-semibold mb-2">System Overview</h4>
              <ul className="list-none space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">⚠️</span>
                  Authentication System (60%)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Notification Backend (85%)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">⚠️</span>
                  Navigation System (45%)
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Development Checkpoint Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 rounded-xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🎯</div>
            <h3 className="text-2xl font-bold text-white">Development Checkpoint</h3>
          </div>

          <div className="space-y-4">
            <div className="prose prose-invert">
              <h4 className="text-xl font-semibold mb-2">Today's Progress</h4>
              <ul className="list-none space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Notification System Backend
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Database Schema Implementation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">🔄</span>
                  Frontend Integration
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-4">Next Actions</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <span className="text-sm text-gray-400">Priority</span>
                  <p className="text-white">Complete Auth Flow</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <span className="text-sm text-gray-400">In Progress</span>
                  <p className="text-white">Dashboard UI</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
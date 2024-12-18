import { Icon } from '@/components/ui/Icon';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

// Import markdown files
import roadmap from '@/docs/roadmap.md';
import shelter_intro_fr from '@/docs/shelter_inro_fr.md';
import sheltr_intro_eng from '@/docs/sheltr_intro_eng.md';
import status_report from '@/docs/status_report.md';
import tech_stack from '@/docs/tech_stack.md';
import whitepaper_eng from '@/docs/whitepaper_eng.md';
import whitepaper_fr from '@/docs/whitepaper_fr.md';

const documents = {
  'whitepaper': {
    content: whitepaper_eng,
    title: 'Technical White Paper',
    language: 'en'
  },
  'whitepaper-fr': {
    content: whitepaper_fr,
    title: 'Livre Blanc Technique',
    language: 'fr'
  },
  'tech-stack': {
    content: tech_stack,
    title: 'Tech Stack'
  },
  'intro': {
    content: sheltr_intro_eng,
    title: 'SHELTR Introduction',
    language: 'en'
  },
  'intro-fr': {
    content: shelter_intro_fr,
    title: 'Introduction SHELTR',
    language: 'fr'
  },
  'status': {
    content: status_report,
    title: 'Status Report'
  },
  'roadmap': {
    content: roadmap,
    title: 'Roadmap'
  }
} as const;

export function DocumentViewer() {
  const { docId } = useParams();
  const doc = docId ? documents[docId as keyof typeof documents] : null;

  if (!doc) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Document Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            The requested document could not be found.
          </p>
          <Link 
            to="/docs"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300"
          >
            <Icon name="arrow-left" className="h-5 w-5 mr-2" />
            Back to Documentation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              to="/docs"
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-4"
            >
              <Icon name="arrow-left" className="h-5 w-5 mr-2" />
              Back to Documentation
            </Link>
            <h1 className="text-3xl font-bold text-white">
              {doc.title}
            </h1>
          </div>
          {doc.language && (
            <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
              {doc.language.toUpperCase()}
            </span>
          )}
        </div>
        
        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {doc.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 
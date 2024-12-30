import { useEffect, useState } from 'react';
import { loadMarkdown, loadProjectDocs, MarkdownData, parseFrontMatter } from '@/utils/markdown';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import remarkFrontmatter from 'remark-frontmatter';
import remarkHtml from 'remark-html';

interface BuildProgress {
  component: string;
  status: string;
  progress: number;
}

const BuildProgressTable = ({ data }: { data: BuildProgress[] }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-700">
      <thead>
        <tr>
          <th className="px-4 py-3 bg-gray-800 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
            Component
          </th>
          <th className="px-4 py-3 bg-gray-800 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
            Status
          </th>
          <th className="px-4 py-3 bg-gray-800 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
            Progress
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {data.map((item, index) => (
          <tr key={index} className="bg-gray-900">
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
              {item.component}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                item.status.includes('STABLE') ? 'bg-green-100 text-green-800' :
                item.status.includes('IN PROGRESS') ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {item.status}
              </span>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    item.progress >= 90 ? 'bg-green-500' :
                    item.progress >= 70 ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <span className="ml-2">{item.progress}%</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Wiki = () => {
  const [docs, setDocs] = useState<{
    readme: MarkdownData & { buildProgress?: BuildProgress[] };
    roadmap: MarkdownData;
    status: MarkdownData;
    checkpoint: MarkdownData;
  }>({
    readme: { content: '', data: {}, buildProgress: [] },
    roadmap: { content: '', data: {} },
    status: { content: '', data: {} },
    checkpoint: { content: '', data: {} }
  });

  const [loading, setLoading] = useState(true);

  // Function to convert markdown to HTML using the existing parser
  const markdownToHtml = async (markdown: string) => {
    const result = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter, ['yaml'])
      .use(remarkHtml)
      .process(markdown);
    
    return result.toString();
  };

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const [readme, roadmap, status, checkpoint] = await Promise.all([
          loadMarkdown('readme'),
          loadProjectDocs('roadmap'),
          loadProjectDocs('statusReport'),
          loadProjectDocs('checkpoint')
        ]);

        // Convert markdown content to HTML
        const readmeHtml = await markdownToHtml(readme.content);
        const roadmapHtml = await markdownToHtml(roadmap.content);
        const statusHtml = await markdownToHtml(status.content);
        const checkpointHtml = await markdownToHtml(checkpoint.content);

        setDocs({
          readme: { ...readme, content: readmeHtml },
          roadmap: { ...roadmap, content: roadmapHtml },
          status: { ...status, content: statusHtml },
          checkpoint: { ...checkpoint, content: checkpointHtml }
        });
      } catch (error) {
        console.error('Error loading documentation:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDocs();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 sm:py-12 max-w-7xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-12 text-gray-800 dark:text-white">
          We Build in Public
        </h1>

        {/* Switch to single column layout */}
        <div className="flex flex-col gap-6">
          {/* Platform Overview Card */}
          <Card className="w-full p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Platform Overview
            </h2>
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
              {/* Overview Section */}
              <div dangerouslySetInnerHTML={{ 
                __html: docs.readme.content.split('## 🎯 Recent Achievements')[0] 
              }} />
              
              {/* Build Progress Table */}
              <div className="my-4 sm:my-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Build Progress (Late Alpha)
                </h3>
                <div className="overflow-x-auto">
                  <BuildProgressTable data={docs.readme.buildProgress || []} />
                </div>
              </div>
              
              {/* Rest of the Content */}
              <div dangerouslySetInnerHTML={{ 
                __html: docs.readme.content.split('## 🎯 Recent Achievements')[1] 
              }} />
            </div>
          </Card>

          {/* Development Roadmap Card */}
          <Card className="w-full p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Development Roadmap
            </h2>
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: docs.roadmap.content }} />
            </div>
          </Card>

          {/* Status Report Card */}
          <Card className="w-full p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Status Report
            </h2>
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: docs.status.content }} />
            </div>
          </Card>

          {/* Checkpoint Card */}
          <Card className="w-full p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Development Checkpoint
            </h2>
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: docs.checkpoint.content }} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Wiki; 
import { load } from 'js-yaml';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

export interface MarkdownData {
  content: string;
  data: Record<string, any>;
}

// Markdown file mapping
export const markdownFiles = {
  intro: {
    en: () => import('@/pages/About/content/sheltr_intro_eng.md?raw'),
    fr: () => import('@/pages/About/content/shelter_intro_fr.md?raw')
  },
  whitepaper: {
    en: () => import('@/content/whitepaper/whitepaper_en.md?raw'),
    fr: () => import('@/content/whitepaper/whitepaper_fr.md?raw')
  },
  techStack: () => import('/docs/core/technical.md?url&raw'),
  // Project documentation
  project: {
    statusReport: () => import('/docs/project/status_report.md?url&raw'),
    roadmap: () => import('/docs/about/roadmap.md?url&raw'),
    checkpoint: () => import('/docs/project/checkpoint.md?url&raw')
  },
  readme: () => import('/README.md?url&raw')
};

// Parse markdown with frontmatter
export function parseFrontMatter(markdown: string): MarkdownData {
  try {
    const processor = unified()
      .use(remarkParse)
      .use(remarkFrontmatter, ['yaml']);

    const tree = processor.parse(markdown);
    let frontmatter = {};

    if (tree.children[0]?.type === 'yaml') {
      try {
        frontmatter = load(tree.children[0].value) || {};
        tree.children.shift();
      } catch (e) {
        console.error('Error parsing frontmatter:', e);
      }
    }

    return {
      content: markdown.replace(/^---[\s\S]+?---/, '').trim(),
      data: frontmatter
    };
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return {
      content: markdown,
      data: {}
    };
  }
}

// Add this helper function to clean up the README content
function cleanReadmeContent(content: string): string {
  // Remove the original build progress table section
  return content.replace(
    /### 📊 Build Progress \(Late Alpha\)[\s\S]*?(?=### 🎯 Recent Achievements)/,
    ''
  );
}

// Add interface for build progress data
export interface BuildProgress {
  component: string;
  status: string;
  progress: number;
}

// Add function to parse build progress from markdown content
function parseBuildProgress(content: string): BuildProgress[] {
  try {
    // Find the build progress table section
    const tableMatch = content.match(/### 📊 Build Progress \(Late Alpha\)([\s\S]*?)(?=###)/);
    if (!tableMatch) return [];

    const tableContent = tableMatch[1];
    
    // Parse the table rows
    const rows = tableContent.match(/\|(.*?)\|(.*?)\|(.*?)\|/g);
    if (!rows) return [];

    // Convert rows to BuildProgress objects (skip header row)
    return rows.slice(1).map(row => {
      const [_, component, status, progress] = row.split('|').map(cell => cell.trim());
      const progressNumber = parseInt(progress.match(/\d+/)?.[0] || '0');
      
      return {
        component,
        status: status.includes('STABLE') ? '✅ STABLE' :
               status.includes('IN PROGRESS') ? '🟡 IN PROGRESS' :
               '🔵 PLANNED',
        progress: progressNumber
      };
    });
  } catch (error) {
    console.error('Error parsing build progress:', error);
    return [];
  }
}

// Load and parse markdown files
export async function loadMarkdown(
  type: keyof typeof markdownFiles, 
  lang?: 'en' | 'fr'
): Promise<MarkdownData & { buildProgress?: BuildProgress[] }> {
  try {
    let content: string;
    
    if (lang && type in markdownFiles && 'en' in markdownFiles[type]) {
      const module = await markdownFiles[type][lang]();
      content = module.default;
    } else {
      const module = await (markdownFiles[type] as () => Promise<{ default: string }>)();
      content = module.default;
    }

    // Parse build progress if it's the readme file
    const buildProgress = type === 'readme' ? parseBuildProgress(content) : undefined;

    // Clean up README content
    if (type === 'readme') {
      content = cleanReadmeContent(content);
    }

    return {
      content,
      data: {},
      buildProgress
    };
  } catch (error) {
    console.error(`Error loading markdown: ${error}`);
    return {
      content: '',
      data: {},
      buildProgress: []
    };
  }
}

// Helper for project docs
export async function loadProjectDocs(docType: keyof typeof markdownFiles.project): Promise<MarkdownData> {
  try {
    const module = await markdownFiles.project[docType]();
    return parseFrontMatter(module.default);
  } catch (error) {
    console.error(`Error loading project doc: ${error}`);
    return {
      content: '',
      data: {}
    };
  }
}

type SupportedLocale = 'en' | 'fr';
type ContentLoader = Record<SupportedLocale, () => Promise<typeof import('*?raw')>>;

const contentLoaders: Record<string, ContentLoader> = {
  about: {
    en: () => import('@/pages/About/content/sheltr_intro_eng.md?raw'),
    fr: () => import('@/pages/About/content/shelter_intro_fr.md?raw')
  }
};

export async function loadContent(path: string, locale: SupportedLocale): Promise<string> {
  const loader = contentLoaders[path];
  if (!loader || !loader[locale]) {
    throw new Error(`Content not found for path: ${path} and locale: ${locale}`);
  }
  
  const content = await loader[locale]();
  return content.default;
}
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import { load } from 'js-yaml';

export interface MarkdownData {
  content: string;
  data: Record<string, any>;
}

// Markdown file mapping
export const markdownFiles = {
  intro: {
    en: () => import('@/docs/sheltr_intro_eng.md?raw'),
    fr: () => import('@/docs/shelter_inro_fr.md?raw')
  },
  whitepaper: {
    en: () => import('@/docs/whitepaper_eng.md?raw'),
    fr: () => import('@/docs/whitepaper_fr.md?raw')
  },
  techStack: () => import('@/docs/tech_stack.md?raw'),
  // Project documentation
  project: {
    statusReport: () => import('@/docs/project/status_report.md?raw'),
    buildTract: () => import('@/docs/technical/build_tract.md?raw'),
    checkpoint: () => import('@/docs/project/checkpoint.md?raw')
  }
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

// Load and parse markdown files
export async function loadMarkdown(
  type: keyof typeof markdownFiles, 
  lang?: 'en' | 'fr'
): Promise<MarkdownData> {
  try {
    let content: string;
    
    if (lang && type in markdownFiles && 'en' in markdownFiles[type]) {
      const module = await markdownFiles[type][lang]();
      content = module.default;
    } else {
      const module = await (markdownFiles[type] as () => Promise<{ default: string }>)();
      content = module.default;
    }

    return parseFrontMatter(content);
  } catch (error) {
    console.error(`Error loading markdown: ${error}`);
    return {
      content: '',
      data: {}
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
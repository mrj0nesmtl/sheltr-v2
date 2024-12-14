interface MarkdownResult {
  frontmatter: Record<string, any>;
  content: string;
}

export async function fetchMarkdownFile(path: string): Promise<MarkdownResult | null> {
  try {
    const response = await fetch(`/src/${path}`);
    if (!response.ok) {
      console.warn(`Failed to fetch ${path}: ${response.status}`);
      return null;
    }

    const text = await response.text();
    
    // Simple frontmatter parser for browser
    const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    
    if (!frontmatterMatch) {
      return {
        frontmatter: {},
        content: text
      };
    }

    const [, frontmatterText, content] = frontmatterMatch;
    
    // Parse YAML-like frontmatter
    const frontmatter = frontmatterText.split('\n')
      .reduce((acc, line) => {
        const [key, ...values] = line.split(':');
        if (key && values.length) {
          acc[key.trim()] = values.join(':').trim();
        }
        return acc;
      }, {} as Record<string, string>);

    return {
      frontmatter,
      content: content.trim()
    };
    
  } catch (error) {
    console.error(`Error fetching markdown file: ${path}`, error);
    return null;
  }
}

export async function parseProjectDocs() {
  const paths = [
    'project/status_report.md',
    'project/checkpoint.md',
    'project/buildout_implementation.md',
    'project/roadmap.md',
    'project/tech_stack.md',
    'technical/build_tract.md',
    'technical/user_flow_testing.md'
  ];

  const docs = await Promise.all(paths.map(fetchMarkdownFile));
  return docs.filter((doc): doc is MarkdownResult => doc !== null);
} 
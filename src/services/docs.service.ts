export async function fetchMarkdownContent(filePath: string) {
  try {
    // Use relative path from public directory
    const response = await fetch(`/docs/${filePath}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath}`);
    }
    const text = await response.text();
    return text;
  } catch (error) {
    console.error(`Error loading markdown file: ${filePath}`, error);
    return '';
  }
}

export async function parseProjectDocs(files: string[]) {
  try {
    const docs = await Promise.all(
      files.map(file => fetchMarkdownContent(file))
    );
    return docs;
  } catch (error) {
    console.error('Error parsing project docs:', error);
    return [];
  }
}

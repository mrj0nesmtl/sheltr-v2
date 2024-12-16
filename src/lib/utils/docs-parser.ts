// src/lib/utils/docs-parser.ts
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';

export async function fetchMarkdownFile(filePath: string) {
  try {
    const basePath = path.join(process.cwd(), 'docs');
    const fullPath = path.join(basePath, filePath);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { data, content };
  } catch (error) {
    console.error(`Error loading markdown file: ${filePath}`, error);
    return { data: {}, content: '' };
  }
}

export async function parseProjectDocs(files: string[]) {
  try {
    const docs = await Promise.all(
      files.map(file => fetchMarkdownFile(file))
    );
    return docs;
  } catch (error) {
    console.error('Error parsing project docs:', error);
    return [];
  }
}
import matter from 'gray-matter';
import { parseISO } from 'date-fns';

export interface ProjectStatus {
  version: string;
  lastUpdated: Date;
  status: 'critical' | 'stable' | 'inProgress';
  buildNumber: string;
  metrics: {
    bundleSize: string;
    firstPaint: string;
    lighthouseScore: number;
  };
  environment: {
    production: string;
    staging: string;
    development: string;
  };
}

export interface RoadmapItem {
  phase: string;
  status: 'completed' | 'inProgress' | 'planned';
  features: string[];
  completionDate?: Date;
}

async function fetchMarkdownFile(filePath: string) {
  try {
    const response = await fetch(`/docs/${filePath}`);
    if (!response.ok) throw new Error(`Failed to fetch ${filePath}`);
    const text = await response.text();
    return matter(text);
  } catch (error) {
    console.error(`Error fetching markdown file: ${filePath}`, error);
    return null;
  }
}

export async function parseProjectDocs() {
  // Read status from status_report.md
  const [statusReport, buildTract, checkpoint] = await Promise.all([
    fetchMarkdownFile('project/status_report.md'),
    fetchMarkdownFile('technical/build_tract.md'),
    fetchMarkdownFile('project/checkpoint.md')
  ]);

  // Parse the status from our markdown files
  const status: ProjectStatus = {
    version: buildTract?.data?.version || '1.6',
    lastUpdated: parseISO(buildTract?.data?.lastUpdated || new Date().toISOString()),
    status: determineStatus(statusReport),
    buildNumber: buildTract?.data?.build || '#1246',
    metrics: {
      bundleSize: buildTract?.data?.metrics?.bundleSize || '180KB',
      firstPaint: buildTract?.data?.metrics?.firstPaint || '0.9s',
      lighthouseScore: buildTract?.data?.metrics?.lighthouseScore || 97
    },
    environment: {
      production: getEnvironmentStatus(statusReport, 'production'),
      staging: getEnvironmentStatus(statusReport, 'staging'),
      development: getEnvironmentStatus(statusReport, 'development')
    }
  };

  return { status };
}

function determineStatus(statusReport: any): ProjectStatus['status'] {
  if (!statusReport) return 'inProgress';
  
  const content = statusReport.content.toLowerCase();
  if (content.includes('🔴') || content.includes('critical issues')) {
    return 'critical';
  }
  if (content.includes('🟡') || content.includes('in progress')) {
    return 'inProgress';
  }
  return 'stable';
}

function getEnvironmentStatus(statusReport: any, env: string): string {
  if (!statusReport) return '🟡';
  
  const content = statusReport.content.toLowerCase();
  if (content.includes(`${env}: 🔴`)) return '🔴';
  if (content.includes(`${env}: 🟡`)) return '🟡';
  return '🟢';
} 
import { promises as fs } from 'fs';
import path from 'path';

async function archiveCheckpoint() {
  const date = new Date();
  const month = date.toISOString().slice(0, 7); // YYYY-MM
  const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD
  
  const sourcePath = 'public/docs/project/checkpoint.md';
  const archivePath = `public/docs/project/archives/checkpoints/${month}`;
  const archiveFile = `checkpoint-${dateStr}.md`;

  try {
    // Create directory if it doesn't exist
    await fs.mkdir(archivePath, { recursive: true });

    // Copy current checkpoint to archive
    await fs.copyFile(
      sourcePath,
      path.join(archivePath, archiveFile)
    );

    console.log(`Checkpoint archived to ${archiveFile}`);
  } catch (error) {
    console.error('Archive failed:', error);
  }
}

// Run archiver
archiveCheckpoint(); 
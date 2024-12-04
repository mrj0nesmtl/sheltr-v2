import { promises as fs } from 'fs';
import path from 'path';

async function createBackup(name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join('backups', `${name}_${timestamp}`);
  
  try {
    // Create backups directory if it doesn't exist
    await fs.mkdir('backups', { recursive: true });
    await fs.mkdir(backupDir, { recursive: true });

    // Directories to backup
    const dirsToBackup = ['src', 'public'];
    
    // Files to backup
    const filesToBackup = [
      'package.json',
      'vite.config.ts',
      'tsconfig.json',
      'tailwind.config.js',
      'index.html'
    ];

    // Backup directories
    for (const dir of dirsToBackup) {
      await copyDir(dir, path.join(backupDir, dir));
    }

    // Backup individual files
    for (const file of filesToBackup) {
      if (await fileExists(file)) {
        await fs.copyFile(file, path.join(backupDir, file));
      }
    }

    console.log(`Backup created successfully: ${backupDir}`);
    return backupDir;
  } catch (error) {
    console.error('Backup failed:', error);
    throw error;
  }
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function fileExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function restoreBackup(backupDir) {
  try {
    // Verify backup exists
    if (!await fileExists(backupDir)) {
      throw new Error(`Backup directory not found: ${backupDir}`);
    }

    // Restore directories
    const dirsToRestore = ['src', 'public'];
    for (const dir of dirsToRestore) {
      const srcDir = path.join(backupDir, dir);
      if (await fileExists(srcDir)) {
        await copyDir(srcDir, dir);
      }
    }

    // Restore individual files
    const files = await fs.readdir(backupDir);
    for (const file of files) {
      if (!file.includes('src') && !file.includes('public')) {
        await fs.copyFile(
          path.join(backupDir, file),
          file
        );
      }
    }

    console.log(`Restored successfully from: ${backupDir}`);
  } catch (error) {
    console.error('Restore failed:', error);
    throw error;
  }
}

export { createBackup, restoreBackup };
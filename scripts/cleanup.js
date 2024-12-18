import { Project } from 'ts-morph';

async function cleanUnusedImports() {
  const project = new Project({
    tsConfigFilePath: "tsconfig.json"
  });

  console.log('🔍 Scanning for unused imports...');

  // Get all source files
  const sourceFiles = project.getSourceFiles();
  let count = 0;

  sourceFiles.forEach(sourceFile => {
    // Organize imports
    sourceFile.organizeImports();
    
    // Get all imports after organization
    const imports = sourceFile.getImportDeclarations();
    
    // Log the cleanup
    const beforeCount = imports.length;
    sourceFile.fixUnusedIdentifiers();
    const afterCount = sourceFile.getImportDeclarations().length;
    
    const removedCount = beforeCount - afterCount;
    if (removedCount > 0) {
      count += removedCount;
      console.log(`🧹 Removed ${removedCount} unused imports in ${sourceFile.getFilePath()}`);
    }
  });

  // Save changes
  project.saveSync();
  console.log(`✅ Cleanup complete! Removed ${count} unused imports`);
}

// Self-executing async function
(async () => {
  try {
    await cleanUnusedImports();
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
})(); 
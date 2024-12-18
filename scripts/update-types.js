import { Project } from 'ts-morph';
import path from 'path';

async function updateTypeReferences() {
  console.log('🔍 Scanning for UserRole references...');
  
  const project = new Project({
    tsConfigFilePath: "tsconfig.json"
  });

  const sourceFiles = project.getSourceFiles();
  let replacementCount = 0;

  sourceFiles.forEach(sourceFile => {
    // Skip node_modules
    if (sourceFile.getFilePath().includes('node_modules')) {
      return;
    }

    console.log(`Checking ${path.relative(process.cwd(), sourceFile.getFilePath())}`);

    // Replace type references
    const fileContent = sourceFile.getFullText();
    if (fileContent.includes('UserRole')) {
      // Replace import statements
      sourceFile.getImportDeclarations().forEach(importDecl => {
        if (importDecl.getText().includes('UserRole')) {
          const newText = importDecl.getText().replace('UserRole', 'AUTH_ROLES');
          importDecl.replaceWithText(newText);
          replacementCount++;
        }
      });

      // Replace type references
      sourceFile.forEachDescendant(node => {
        if (node.getText() === 'UserRole') {
          node.replaceWithText('AUTH_ROLES');
          replacementCount++;
        }
      });

      // Save changes
      sourceFile.save();
    }
  });

  console.log(`\n✅ Replacement complete!`);
  console.log(`📊 Summary:`);
  console.log(`   - Replaced ${replacementCount} occurrences of UserRole with AUTH_ROLES`);
}

// Run the update
updateTypeReferences().catch(error => {
  console.error('❌ Error during update:', error);
  process.exit(1);
}); 
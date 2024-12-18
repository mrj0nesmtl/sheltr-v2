import { Project } from 'ts-morph';

async function checkTypeScriptErrors() {
  console.log('🔍 Scanning for TypeScript errors...');
  
  const project = new Project({
    tsConfigFilePath: "tsconfig.json"
  });

  const diagnostics = project.getPreEmitDiagnostics();
  let errorCount = 0;
  let warningCount = 0;

  if (diagnostics.length > 0) {
    console.log('\n🔎 Found the following issues:\n');

    diagnostics.forEach(diagnostic => {
      const message = diagnostic.getMessageText();
      const location = diagnostic.getSourceFile()?.getFilePath();
      const category = diagnostic.getCategory();
      const line = diagnostic.getLineNumber();
      
      const prefix = category === 1 ? '❌ Error' : '⚠️ Warning';
      if (category === 1) errorCount++;
      if (category === 0) warningCount++;

      console.log(`${prefix} in ${location}:${line}`);
      console.log(`   ${message}\n`);
    });

    console.log(`\n📊 Summary:`);
    console.log(`   Errors: ${errorCount}`);
    console.log(`   Warnings: ${warningCount}`);
  } else {
    console.log('✅ No TypeScript errors found!');
  }
}

// Self-executing async function
(async () => {
  try {
    await checkTypeScriptErrors();
  } catch (error) {
    console.error('❌ Error during type checking:', error);
    process.exit(1);
  }
})(); 
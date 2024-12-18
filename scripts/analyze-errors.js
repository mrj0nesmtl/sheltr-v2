import { Project } from 'ts-morph';

async function analyzeTypeScriptErrors() {
  console.log('🔍 Analyzing TypeScript errors...');
  
  const project = new Project({
    tsConfigFilePath: "tsconfig.json"
  });

  const diagnostics = project.getPreEmitDiagnostics();
  const errorMap = new Map();
  const fileErrors = new Map();

  // Analyze errors
  diagnostics.forEach(diagnostic => {
    const code = diagnostic.getCode();
    const message = diagnostic.getMessageText();
    const file = diagnostic.getSourceFile()?.getFilePath() || 'Unknown file';
    
    // Group by error code
    if (!errorMap.has(code)) {
      errorMap.set(code, {
        count: 0,
        message: typeof message === 'string' ? message : message.messageText,
        files: new Set()
      });
    }
    errorMap.get(code).count++;
    errorMap.get(code).files.add(file);

    // Group by file
    if (!fileErrors.has(file)) {
      fileErrors.set(file, new Set());
    }
    fileErrors.get(file).add(code);
  });

  // Print Analysis
  console.log('\n📊 Error Analysis:\n');
  
  // Most common errors
  console.log('🔴 Most Common Error Types:');
  const sortedErrors = Array.from(errorMap.entries())
    .sort((a, b) => b[1].count - a[1].count);
  
  sortedErrors.slice(0, 5).forEach(([code, data]) => {
    console.log(`\nTS${code} (${data.count} occurrences)`);
    console.log(`Message: ${data.message}`);
    console.log(`Affected Files: ${data.files.size}`);
  });

  // Files with most errors
  console.log('\n📁 Files with Most Errors:');
  const sortedFiles = Array.from(fileErrors.entries())
    .sort((a, b) => b[1].size - a[1].size);
  
  sortedFiles.slice(0, 5).forEach(([file, errors]) => {
    console.log(`\n${file}`);
    console.log(`Error Types: ${errors.size}`);
    console.log(`Error Codes: ${Array.from(errors).join(', ')}`);
  });

  // Summary
  console.log('\n📈 Summary:');
  console.log(`Total Errors: ${diagnostics.length}`);
  console.log(`Unique Error Types: ${errorMap.size}`);
  console.log(`Affected Files: ${fileErrors.size}`);
}

// Self-executing async function
(async () => {
  try {
    await analyzeTypeScriptErrors();
  } catch (error) {
    console.error('❌ Error during analysis:', error);
    process.exit(1);
  }
})(); 
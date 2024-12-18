import { Project } from 'ts-morph';
import path from 'path';

async function analyzeErrors() {
  console.log('🔍 Running detailed error analysis...');
  
  const project = new Project({
    tsConfigFilePath: "tsconfig.json"
  });

  const diagnostics = project.getPreEmitDiagnostics();
  const errorsByType = new Map();
  const errorsByFile = new Map();
  const componentErrors = new Map();

  diagnostics.forEach(diagnostic => {
    const code = diagnostic.getCode();
    const message = diagnostic.getMessageText();
    const file = diagnostic.getSourceFile()?.getFilePath() || 'Unknown';
    const line = diagnostic.getLineNumber() || 0;
    
    // Group by error type
    if (!errorsByType.has(code)) {
      errorsByType.set(code, {
        count: 0,
        message: typeof message === 'string' ? message : message.messageText,
        files: new Set()
      });
    }
    errorsByType.get(code).count++;
    errorsByType.get(code).files.add(file);

    // Group by file
    if (!errorsByFile.has(file)) {
      errorsByFile.set(file, new Set());
    }
    errorsByFile.get(file).add(`TS${code} at line ${line}`);

    // Special handling for component files
    if (file.includes('/components/')) {
      if (!componentErrors.has(file)) {
        componentErrors.set(file, []);
      }
      componentErrors.get(file).push({
        code,
        line,
        message: typeof message === 'string' ? message : message.messageText
      });
    }
  });

  // Print detailed analysis
  console.log('\n📊 Detailed Error Analysis:\n');
  
  console.log('🔍 Top Error Types:');
  Array.from(errorsByType.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)
    .forEach(([code, data]) => {
      console.log(`\nTS${code} (${data.count} occurrences)`);
      console.log(`Message: ${data.message}`);
      console.log(`Affected Files: ${data.files.size}`);
    });

  console.log('\n🗂 Most Affected Components:');
  Array.from(componentErrors.entries())
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5)
    .forEach(([file, errors]) => {
      console.log(`\n${path.relative(process.cwd(), file)}`);
      console.log(`Errors: ${errors.length}`);
      errors.slice(0, 3).forEach(error => 
        console.log(`- TS${error.code} at line ${error.line}: ${error.message}`)
      );
    });

  console.log('\n📈 Summary:');
  console.log(`Total Errors: ${diagnostics.length}`);
  console.log(`Unique Error Types: ${errorsByType.size}`);
  console.log(`Affected Files: ${errorsByFile.size}`);
  console.log(`Affected Components: ${componentErrors.size}`);
}

// Run the analysis
analyzeErrors().catch(error => {
  console.error('❌ Error during analysis:', error);
  process.exit(1);
}); 
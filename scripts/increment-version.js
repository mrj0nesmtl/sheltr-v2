#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function incrementVersion() {
  const packagePath = path.join(process.cwd(), 'package.json');
  const package = require(packagePath);
  const currentVersion = package.version;
  
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  
  // Increment patch version
  const newVersion = `${major}.${minor}.${patch + 1}-beta`;
  
  // Update package.json
  package.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(package, null, 2) + '\n');
  
  console.log(newVersion);
  return newVersion;
}

if (require.main === module) {
  incrementVersion();
}

module.exports = incrementVersion; 
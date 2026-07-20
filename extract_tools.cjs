const fs = require('fs');
const path = require('path');
const devDir = 'c:/Users/Bonnie/Desktop/MR. BIT TOOLS/src/pages/development';
const dirs = fs.readdirSync(devDir);
let tools = [];

dirs.forEach(dir => {
  const dirPath = path.join(devDir, dir);
  if (fs.statSync(dirPath).isDirectory()) {
    const files = fs.readdirSync(dirPath);
    const dataFile = files.find(f => f.endsWith('Data.ts'));
    if (dataFile) {
      const content = fs.readFileSync(path.join(dirPath, dataFile), 'utf8');
      const matches = [...content.matchAll(/name:\s*\"([^\"]+)\"/g)];
      matches.forEach(m => tools.push(m[1]));
    }
  }
});

fs.writeFileSync('c:/Users/Bonnie/Desktop/MR. BIT TOOLS/tools_list.json', JSON.stringify(tools, null, 2));
console.log('Extracted', tools.length, 'tools');

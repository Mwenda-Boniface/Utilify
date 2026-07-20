const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages', 'nosignups');
const files = [
  'ai/AI.tsx', 'audio/Audio.tsx', 'downloading/Downloading.tsx',
  'educational/Educational.tsx', 'gaming/Gaming.tsx', 'linux-macos/LinuxMacOS.tsx',
  'misc/Misc.tsx', 'mobile/Mobile.tsx', 'non-english/NonEnglish.tsx',
  'privacy/Privacy.tsx', 'reading/Reading.tsx', 'torrenting/Torrenting.tsx',
  'video/Video.tsx'
];

files.forEach(f => {
  const fullPath = path.join(dir, f);
  let content = fs.readFileSync(fullPath, 'utf-8');
  
  const componentName = path.basename(f, '.tsx');
  
  // 1. Update signature
  content = content.replace(
    `const ${componentName}: React.FC = () => {`,
    `interface ${componentName}Props { searchValue?: string; }
const ${componentName}: React.FC<${componentName}Props> = ({ searchValue = '' }) => {
  const filteredSections = SECTIONS.map(sec => ({
    ...sec,
    items: sec.items.filter(item => 
      item.name.toLowerCase().includes(searchValue.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchValue.toLowerCase())
    )
  })).filter(sec => sec.items.length > 0);`
  );
  
  // 2. Update map
  content = content.replace(
    '{SECTIONS.map((sec) => (',
    `{filteredSections.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No tools found matching "{searchValue}"
          </div>
        ) : filteredSections.map((sec) => (`
  );
  
  // 3. Close the new ternary operator
  // Find the last </div></section>)) block
  content = content.replace(
    '</section>\r\n        ))}\r\n      </div>',
    '</section>\r\n        ))}\r\n      </div>' // wait, this might be tricky with CRLF vs LF.
  );
  
  content = content.replace(
    '</section>\n        ))}\n      </div>',
    '</section>\n        ))}\n      </div>'
  );
  
  // Safer close:
  content = content.replace(/<\/section>\s*\)\)\}\s*<\/div>/, '</section>\n        ))}\n      </div>');
  
  fs.writeFileSync(fullPath, content);
  console.log('Patched', f);
});

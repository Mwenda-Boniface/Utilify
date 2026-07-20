const fs = require('fs');
const file = 'c:/Users/Bonnie/Desktop/MR. BIT TOOLS/src/layout/Layout.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Code to lucide-react imports
content = content.replace(
  /import \{ LayoutGrid, Moon, Sun, Info, History, GitMerge, Search, UserX, Brain, Box \} from 'lucide-react';/,
  "import { LayoutGrid, Moon, Sun, Info, History, GitMerge, Search, UserX, Brain, Box, Code } from 'lucide-react';"
);

// 2. Add Development to menuItems
const menuItemsOld = `    { name: 'Software', icon: <Box size={18} /> },
    { name: 'About', icon: <Info size={18} /> },`;
const menuItemsNew = `    { name: 'Software', icon: <Box size={18} /> },
    { 
      name: 'Development', 
      icon: <Code size={18} />,
      isDevDropdown: true,
      dropdown: [
        { name: 'IDEs & Editors', tab: 'IDEs, Code Editors, and Development Environments' },
        { name: 'Version Control', tab: 'Version Control and Collaboration' },
        { name: 'Build Tools', tab: 'Build Tools, Package Managers, and Dependency Management' },
        { name: 'Containers & VM', tab: 'Containerization, Virtualization, and Infrastructure as Code (IaC)' },
        { name: 'Testing & QA', tab: 'Testing, Quality Assurance (QA), and Automation' },
        { name: 'CI/CD', tab: 'Continuous Integration & Continuous Deployment (CI/CD)' },
        { name: 'Cloud & BaaS', tab: 'Cloud Platforms, Backend-as-a-Service (BaaS), and Infrastructure' },
        { name: 'Databases', tab: 'Database Management and Analytics' },
        { name: 'APIs', tab: 'API Clients, Development, and Testing' },
        { name: 'AI Assistants', tab: 'AI-Assisted Development, Agents, and Copilots' },
        { name: 'Monitoring', tab: 'Monitoring, Observability, and Logging' },
        { name: 'Project Management', tab: 'Project Management, Collaboration, and Team Communication' },
        { name: 'Documentation', tab: 'Documentation, Code Search, and Learning' },
        { name: 'Utilities', tab: 'Developer Utilities and Productivity Tools' },
        { name: 'Web Frameworks', tab: 'Web Frameworks and Libraries' },
        { name: 'Mobile Dev', tab: 'Mobile Development and Cross-Platform Tools' },
        { name: 'Game Dev', tab: 'Game Development Engines and Tools' },
        { name: 'Design Tools', tab: 'Design, Prototyping, and Creative Tools' },
        { name: 'Data Science & AI', tab: 'Data Science, Machine Learning, and AI Platforms' },
        { name: 'No-Code / Low-Code', tab: 'No-Code / Low-Code Development Platforms' },
        { name: 'Security', tab: 'Security, Secrets Management, and Authentication' },
        { name: 'Collaboration', tab: 'Collaboration and Communication (Cross-Functional)' },
        { name: 'Feature Flags', tab: 'Feature Flagging and Experimentation' },
        { name: 'Platform Eng', tab: 'Platform Engineering and Internal Developer Platforms' }
      ]
    },
    { name: 'About', icon: <Info size={18} /> },`;
content = content.replace(menuItemsOld, menuItemsNew);

// 3. Desktop isTabActive and Dev Menu
const desktopMapOld = `          {menuItems.map((item) => {
            const isDropdown = 'dropdown' in item;
            const isTabActive = isDropdown
              ? (activeTab === 'No Sign-ups' || activeTab === 'AI Tools' || activeTab === 'No-Login Web Apps')
              : activeTab === item.name;

            if (isDropdown) {`;
            
const desktopMapNew = `          {menuItems.map((item) => {
            const isDropdown = 'dropdown' in item;
            const isDevDropdown = 'isDevDropdown' in item;
            const isTabActive = isDropdown
              ? item.dropdown?.some(sub => sub.tab === activeTab) || activeTab === item.name
              : activeTab === item.name;

            if (isDevDropdown) {
              return (
                <div key={item.name} className={styles.dropdownContainer}>
                  <a href="#" className={\`\${styles.navItem} \${isTabActive ? styles.navItemActive : ''}\`} onClick={(e) => { e.preventDefault(); }}>
                    {item.icon}
                    <span>{item.name}</span>
                    {isTabActive && <motion.div layoutId="activeHeaderNav" className={styles.activeIndicator} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                  </a>
                  <div className={styles.megaDropdownMenu} style={{ width: '600px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className={styles.megaColumnWithList}>
                      <span className={styles.megaColumnListTitle}>Core & Tools</span>
                      <div className={\`\${styles.megaColumnListItemsSingle} \${styles.expanded}\`}>
                        {item.dropdown?.slice(0, 12).map((subItem) => (
                          <a key={subItem.name} href="#" onClick={(e) => { e.preventDefault(); setActiveTab(subItem.tab); }} className={\`\${styles.megaSubLink} \${activeTab === subItem.tab ? styles.megaSubLinkActive : ''}\`}>
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className={styles.megaColumnWithList}>
                      <span className={styles.megaColumnListTitle}>Platforms & Specialized</span>
                      <div className={\`\${styles.megaColumnListItemsSingle} \${styles.expanded}\`}>
                        {item.dropdown?.slice(12).map((subItem) => (
                          <a key={subItem.name} href="#" onClick={(e) => { e.preventDefault(); setActiveTab(subItem.tab); }} className={\`\${styles.megaSubLink} \${activeTab === subItem.tab ? styles.megaSubLinkActive : ''}\`}>
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (isDropdown && !isDevDropdown) {`;
content = content.replace(desktopMapOld, desktopMapNew);

// 4. Mobile isTabActive
const mobileMapOld = `        {menuItems.map((item) => {
          const isDropdown = 'dropdown' in item;
          const isTabActive = isDropdown
            ? (activeTab === 'No Sign-ups' || activeTab === 'AI Tools' || activeTab === 'No-Login Web Apps')
            : activeTab === item.name;`;

const mobileMapNew = `        {menuItems.map((item) => {
          const isDropdown = 'dropdown' in item;
          const isTabActive = isDropdown
            ? item.dropdown?.some(sub => sub.tab === activeTab) || activeTab === item.name
            : activeTab === item.name;`;
content = content.replace(mobileMapOld, mobileMapNew);

fs.writeFileSync(file, content);
console.log('Layout.tsx successfully updated!');

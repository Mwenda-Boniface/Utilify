import React, { useState, useRef, useEffect } from 'react';
import { Menu as MenuIcon, Code, UserX, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Menu.module.css';

interface MenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DEVELOPMENT_LINKS = [
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
];

const NO_SIGNUP_LINKS = [
  { name: 'Free AI Tools', tab: 'AI Tools' },
  { name: 'Productivity Tools', tab: 'No Sign-ups' },
  { name: 'No-Login Web Apps', tab: 'No-Login Web Apps' }
];

export const HeaderMenu: React.FC<MenuProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'dev' | 'nosignup'>('dev');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  const isDevActive = DEVELOPMENT_LINKS.some(link => link.tab === activeTab);
  const isNoSignupActive = NO_SIGNUP_LINKS.some(link => link.tab === activeTab);
  const isActive = isDevActive || isNoSignupActive;

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <button 
        className={`${styles.menuTrigger} ${isActive ? styles.menuTriggerActive : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon size={18} />
        <span>Menu</span>
        <ChevronDown size={14} className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
        {isActive && <motion.div layoutId="activeHeaderNav" className={styles.activeIndicator} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.dropdownContent}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.sidebar}>
              <button 
                className={`${styles.sidebarItem} ${expandedSection === 'dev' ? styles.sidebarItemActive : ''}`}
                onClick={() => setExpandedSection('dev')}
              >
                <Code size={16} />
                <span>Development</span>
                <ChevronRight size={14} />
              </button>
              <button 
                className={`${styles.sidebarItem} ${expandedSection === 'nosignup' ? styles.sidebarItemActive : ''}`}
                onClick={() => setExpandedSection('nosignup')}
              >
                <UserX size={16} />
                <span>No Sign-ups</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className={styles.contentArea}>
              {expandedSection === 'dev' && (
                <div className={styles.gridList}>
                  {DEVELOPMENT_LINKS.map(link => (
                    <button 
                      key={link.name}
                      className={`${styles.linkItem} ${activeTab === link.tab ? styles.linkItemActive : ''}`}
                      onClick={() => handleNavigate(link.tab)}
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              )}

              {expandedSection === 'nosignup' && (
                <div className={styles.flexList}>
                  {NO_SIGNUP_LINKS.map(link => (
                    <button 
                      key={link.name}
                      className={`${styles.linkItem} ${activeTab === link.tab ? styles.linkItemActive : ''}`}
                      onClick={() => handleNavigate(link.tab)}
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const MobileMenu: React.FC<MenuProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDevActive = DEVELOPMENT_LINKS.some(link => link.tab === activeTab);
  const isNoSignupActive = NO_SIGNUP_LINKS.some(link => link.tab === activeTab);
  const isActive = isDevActive || isNoSignupActive;

  return (
    <div className={styles.mobileDropdownWrapper} ref={menuRef}>
      <a
        href="#"
        className={`${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ''}`}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <MenuIcon size={18} />
        <span>Menu</span>
      </a>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileDropdownMenu}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.15 }}
          >
            <div className={styles.mobileMenuHeader}>Development</div>
            {DEVELOPMENT_LINKS.map((subItem) => (
              <a
                key={subItem.name}
                href="#"
                className={`${styles.mobileDropdownItem} ${activeTab === subItem.tab ? styles.mobileDropdownItemActive : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(subItem.tab);
                  setIsOpen(false);
                }}
              >
                {subItem.name}
              </a>
            ))}
            
            <div className={styles.mobileMenuHeader} style={{ marginTop: '0.5rem' }}>No Sign-ups</div>
            {NO_SIGNUP_LINKS.map((subItem) => (
              <a
                key={subItem.name}
                href="#"
                className={`${styles.mobileDropdownItem} ${activeTab === subItem.tab ? styles.mobileDropdownItemActive : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(subItem.tab);
                  setIsOpen(false);
                }}
              >
                {subItem.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

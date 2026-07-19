import React, { useState } from 'react';
import { LayoutGrid, Moon, Sun, Info, History, GitMerge, Search, UserX, Brain } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import styles from './Layout.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import utilifyLogo from '../assets/images/UTILIFY.png';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isToolOpen?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isToolOpen, searchValue, onSearchChange, showSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [expandedColumn, setExpandedColumn] = useState<string | null>(null);

  const toggleColumn = (col: string) =>
    setExpandedColumn(prev => (prev === col ? null : col));

  const menuItems = [
    { name: 'Tools', icon: <LayoutGrid size={18} /> },
    { name: 'History', icon: <History size={18} /> },
    { name: 'About', icon: <Info size={18} /> },
    { name: 'Contribute', icon: <GitMerge size={18} /> },
    { 
      name: 'No Sign-ups', 
      icon: <UserX size={18} />,
      dropdown: [
        { name: 'Free AI Tools', tab: 'AI Tools' },
        { name: 'Productivity Tools', tab: 'No Sign-ups' },
        { name: 'No-Login Web Apps', tab: 'No-Login Web Apps' }
      ]
    },
  ];

  return (
    <div className={`${styles.layout} ${isToolOpen ? styles.noScrollLayout : ''}`}>
      {/* Top Header Navigation */}
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <div className={styles.logoSection}>
            <div className={styles.logoIcon}>
              <img src={utilifyLogo} alt="Utilify" className={styles.logoIconImage} width={64} height={64} fetchPriority="low" />
            </div>
            <span className={styles.logoText}>Utilify</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={styles.navigation}>
          {menuItems.map((item) => {
            const isDropdown = 'dropdown' in item;
            const isTabActive = isDropdown
              ? (activeTab === 'No Sign-ups' || activeTab === 'AI Tools' || activeTab === 'No-Login Web Apps')
              : activeTab === item.name;

            if (isDropdown) {
              return (
                <div key={item.name} className={styles.dropdownContainer}>
                  <a
                    href="#"
                    className={`${styles.navItem} ${isTabActive ? styles.navItemActive : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    {isTabActive && (
                      <motion.div
                        layoutId="activeHeaderNav"
                        className={styles.activeIndicator}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                  <div className={styles.megaDropdownMenu}>

                    {/* Row 1, Column 1 — Free AI Tools */}
                    <div className={styles.megaColumnWithList}>
                      <a href="#/ai-tools"
                        onClick={(e) => { e.preventDefault(); toggleColumn('ai-tools'); }}
                        className={`${styles.megaColumnListTitle} ${activeTab === 'AI Tools' ? styles.megaLinkActiveTitle : ''} ${expandedColumn === 'ai-tools' ? styles.megaColumnTitleExpanded : ''}`}>
                        Free AI Tools <span className={styles.colChevron}>{expandedColumn === 'ai-tools' ? '▲' : '▼'}</span>
                      </a>
                      <div className={`${styles.megaColumnListItemsSingle} ${expandedColumn === 'ai-tools' ? styles.expanded : ''}`}>
                        <a href="#/ai-tools" onClick={() => { setActiveTab('AI Tools'); setExpandedColumn(null); }} className={styles.megaSubLink}>Chatbots &amp; Assistants</a>
                        <a href="#/ai-tools" onClick={() => { setActiveTab('AI Tools'); setExpandedColumn(null); }} className={styles.megaSubLink}>Image Generation</a>
                        <a href="#/ai-tools" onClick={() => { setActiveTab('AI Tools'); setExpandedColumn(null); }} className={styles.megaSubLink}>Photo &amp; Image Editing</a>
                        <a href="#/ai-tools" onClick={() => { setActiveTab('AI Tools'); setExpandedColumn(null); }} className={styles.megaSubLink}>Video Generation</a>
                        <a href="#/ai-tools" onClick={() => { setActiveTab('AI Tools'); setExpandedColumn(null); }} className={styles.megaSubLink}>Coding &amp; Dev</a>
                      </div>
                    </div>

                    {/* Row 1, Column 2 — Productivity Tools */}
                    <div className={styles.megaColumnWithList}>
                      <a href="#/no-signups"
                        onClick={(e) => { e.preventDefault(); toggleColumn('productivity'); }}
                        className={`${styles.megaColumnListTitle} ${activeTab === 'No Sign-ups' ? styles.megaLinkActiveTitle : ''} ${expandedColumn === 'productivity' ? styles.megaColumnTitleExpanded : ''}`}>
                        Productivity Tools <span className={styles.colChevron}>{expandedColumn === 'productivity' ? '▲' : '▼'}</span>
                      </a>
                      <div className={`${styles.megaColumnListItemsSingle} ${expandedColumn === 'productivity' ? styles.expanded : ''}`}>
                        <a href="#/no-signups" onClick={() => { setActiveTab('No Sign-ups'); setExpandedColumn(null); }} className={styles.megaSubLink}>Productivity</a>
                        <a href="#/no-signups" onClick={() => { setActiveTab('No Sign-ups'); setExpandedColumn(null); }} className={styles.megaSubLink}>Design &amp; Graphics</a>
                        <a href="#/no-signups" onClick={() => { setActiveTab('No Sign-ups'); setExpandedColumn(null); }} className={styles.megaSubLink}>Development</a>
                        <a href="#/no-signups" onClick={() => { setActiveTab('No Sign-ups'); setExpandedColumn(null); }} className={styles.megaSubLink}>Utilities</a>
                      </div>
                    </div>

                    {/* Row 1, Column 3 — No-Login Web Apps */}
                    <div className={styles.megaColumnWithList}>
                      <a href="#/no-login-apps"
                        onClick={(e) => { e.preventDefault(); toggleColumn('no-login'); }}
                        className={`${styles.megaColumnListTitle} ${activeTab === 'No-Login Web Apps' ? styles.megaLinkActiveTitle : ''} ${expandedColumn === 'no-login' ? styles.megaColumnTitleExpanded : ''}`}>
                        No-Login Web Apps <span className={styles.colChevron}>{expandedColumn === 'no-login' ? '▲' : '▼'}</span>
                      </a>
                      <div className={`${styles.megaColumnListItemsSingle} ${expandedColumn === 'no-login' ? styles.expanded : ''}`}>
                        <a href="#/no-login-apps" onClick={() => { setActiveTab('No-Login Web Apps'); setExpandedColumn(null); }} className={styles.megaSubLink}>Code Editors &amp; IDEs</a>
                        <a href="#/no-login-apps" onClick={() => { setActiveTab('No-Login Web Apps'); setExpandedColumn(null); }} className={styles.megaSubLink}>File Host &amp; Share</a>
                        <a href="#/no-login-apps" onClick={() => { setActiveTab('No-Login Web Apps'); setExpandedColumn(null); }} className={styles.megaSubLink}>Document Editors</a>
                        <a href="#/ns-ai" onClick={() => { setActiveTab('Artificial Intelligence'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Artificial Intelligence' ? styles.megaSubLinkActive : ''}`}>Artificial Intelligence</a>
                        <a href="#/ns-downloading" onClick={() => { setActiveTab('Downloading'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Downloading' ? styles.megaSubLinkActive : ''}`}>Downloading</a>
                        <a href="#/ns-torrenting" onClick={() => { setActiveTab('Torrenting'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Torrenting' ? styles.megaSubLinkActive : ''}`}>Torrenting</a>
                        <a href="#/ns-mobile" onClick={() => { setActiveTab('Android / iOS'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Android / iOS' ? styles.megaSubLinkActive : ''}`}>Android / iOS</a>
                        <a href="#/ns-linux-macos" onClick={() => { setActiveTab('Linux / macOS'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Linux / macOS' ? styles.megaSubLinkActive : ''}`}>Linux / macOS</a>
                        <a href="#/ns-non-english" onClick={() => { setActiveTab('Non-English'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Non-English' ? styles.megaSubLinkActive : ''}`}>Non-English</a>
                        <a href="#/ns-misc" onClick={() => { setActiveTab('Miscellaneous'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Miscellaneous' ? styles.megaSubLinkActive : ''}`}>Miscellaneous</a>
                      </div>
                    </div>

                    {/* Row 2, Column 1 — Entertainment */}
                    <div className={styles.megaColumnWithList}>
                      <span role="button"
                        onClick={() => toggleColumn('entertainment')}
                        className={`${styles.megaColumnListTitle} ${['Movies / TV / Anime','Music / Podcasts / Radio','Gaming / Emulation'].includes(activeTab) ? styles.megaLinkActiveTitle : ''} ${expandedColumn === 'entertainment' ? styles.megaColumnTitleExpanded : ''}`}>
                        Entertainment <span className={styles.colChevron}>{expandedColumn === 'entertainment' ? '▲' : '▼'}</span>
                      </span>
                      <div className={`${styles.megaColumnListItemsSingle} ${expandedColumn === 'entertainment' ? styles.expanded : ''}`}>
                        <a href="#/ns-audio" onClick={() => { setActiveTab('Music / Podcasts / Radio'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Music / Podcasts / Radio' ? styles.megaSubLinkActive : ''}`}>Music / Podcasts / Radio</a>
                        <a href="#/ns-gaming" onClick={() => { setActiveTab('Gaming / Emulation'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Gaming / Emulation' ? styles.megaSubLinkActive : ''}`}>Gaming / Emulation</a>
                        <a href="#/ns-video" onClick={() => { setActiveTab('Movies / TV / Anime'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Movies / TV / Anime' ? styles.megaSubLinkActive : ''}`}>Movies / TV / Anime</a>
                      </div>
                    </div>

                    {/* Row 2, Column 2 — Education */}
                    <div className={styles.megaColumnWithList}>
                      <span role="button"
                        onClick={() => toggleColumn('education')}
                        className={`${styles.megaColumnListTitle} ${['Books / Comics / Manga','Educational'].includes(activeTab) ? styles.megaLinkActiveTitle : ''} ${expandedColumn === 'education' ? styles.megaColumnTitleExpanded : ''}`}>
                        Education <span className={styles.colChevron}>{expandedColumn === 'education' ? '▲' : '▼'}</span>
                      </span>
                      <div className={`${styles.megaColumnListItemsSingle} ${expandedColumn === 'education' ? styles.expanded : ''}`}>
                        <a href="#/ns-reading" onClick={() => { setActiveTab('Books / Comics / Manga'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Books / Comics / Manga' ? styles.megaSubLinkActive : ''}`}>Books / Comics / Manga</a>
                        <a href="#/ns-educational" onClick={() => { setActiveTab('Educational'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Educational' ? styles.megaSubLinkActive : ''}`}>Educational Resources</a>
                      </div>
                    </div>

                    {/* Row 2, Column 3 — Security */}
                    <div className={styles.megaColumnWithList}>
                      <span role="button"
                        onClick={() => toggleColumn('security')}
                        className={`${styles.megaColumnListTitle} ${['Adblocking / Privacy','No-Login Web Apps'].includes(activeTab) ? styles.megaLinkActiveTitle : ''} ${expandedColumn === 'security' ? styles.megaColumnTitleExpanded : ''}`}>
                        Security <span className={styles.colChevron}>{expandedColumn === 'security' ? '▲' : '▼'}</span>
                      </span>
                      <div className={`${styles.megaColumnListItemsSingle} ${expandedColumn === 'security' ? styles.expanded : ''}`}>
                        <a href="#/no-login-apps" onClick={() => { setActiveTab('No-Login Web Apps'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'No-Login Web Apps' ? styles.megaSubLinkActive : ''}`}>Security &amp; Privacy</a>
                        <a href="#/ns-privacy" onClick={() => { setActiveTab('Adblocking / Privacy'); setExpandedColumn(null); }} className={`${styles.megaSubLink} ${activeTab === 'Adblocking / Privacy' ? styles.megaSubLinkActive : ''}`}>Adblocking / Privacy</a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            }

            return (
              <a
                key={item.name}
                href="#"
                className={`${styles.navItem} ${isTabActive ? styles.navItemActive : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.name);
                }}
              >
                {item.icon}
                <span>{item.name}</span>
                {isTabActive && (
                  <motion.div
                    layoutId="activeHeaderNav"
                    className={styles.activeIndicator}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Search Bar */}
        {showSearch && (
          <div className={styles.headerSearch}>
            <Search className={styles.headerSearchIcon} size={18} />
            <input 
              type="text" 
              placeholder="Search tools..." 
              className={styles.headerSearchInput}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        )}

      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className={styles.mobileNav}>
        {menuItems.map((item) => {
          const isDropdown = 'dropdown' in item;
          const isTabActive = isDropdown
            ? (activeTab === 'No Sign-ups' || activeTab === 'AI Tools' || activeTab === 'No-Login Web Apps')
            : activeTab === item.name;

          if (isDropdown) {
            return (
              <div key={item.name} className={styles.mobileDropdownWrapper}>
                <a
                  href="#"
                  className={`${styles.mobileNavItem} ${isTabActive ? styles.mobileNavItemActive : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileDropdownOpen(!mobileDropdownOpen);
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
                <AnimatePresence>
                  {mobileDropdownOpen && (
                    <motion.div 
                      className={styles.mobileDropdownMenu}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.15 }}
                    >
                      {item.dropdown?.map((subItem) => (
                        <a
                          key={subItem.name}
                          href="#"
                          className={`${styles.mobileDropdownItem} ${activeTab === subItem.tab ? styles.mobileDropdownItemActive : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab(subItem.tab);
                            setMobileDropdownOpen(false);
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
          }

          return (
            <a
              key={item.name}
              href="#"
              className={`${styles.mobileNavItem} ${isTabActive ? styles.mobileNavItemActive : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.name);
                setMobileDropdownOpen(false);
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          );
        })}
      </nav>

      {/* Main Workspace */}
      <main className={styles.main}>
        <section className={styles.content}>
          {children}
        </section>
      </main>

      {/* Footer Section */}
      {!isToolOpen && (
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.logoSection}>
                <div className={styles.logoIcon}>
                  <img src={utilifyLogo} alt="Utilify" className={styles.logoIconImage} />
                </div>
                <span className={styles.logoText}>Utilify</span>
              </div>
              <p className={styles.footerDescription}>
                A premium, client-side utility suite for developers and designers.
              </p>
            </div>
            
            <div className={styles.footerLinksGroup}>
              <div className={styles.linksCol}>
                <h4>Navigation</h4>
                <a href="#/tools" onClick={() => setActiveTab('Tools')}>Home</a>
                <a href="#/history" onClick={() => setActiveTab('History')}>History</a>
                <a href="#/about" onClick={() => setActiveTab('About')}>About Us</a>
                <a href="#/contribute" onClick={() => setActiveTab('Contribute')}>Contribute</a>
                <a href="#/no-signups" onClick={() => setActiveTab('No Sign-ups')}>No Sign-ups</a>
                <a href="#/ai-tools" onClick={() => setActiveTab('AI Tools')}>AI Tools</a>
                <a href="#/no-login-apps" onClick={() => setActiveTab('No-Login Web Apps')}>No-Login Web Apps</a>
              </div>
              <div className={styles.linksCol}>
                <h4>Legal Policies</h4>
                <a href="#/privacy" onClick={() => setActiveTab('Privacy')}>Privacy Policy</a>
                <a href="#/terms" onClick={() => setActiveTab('Terms')}>Terms of Service</a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>© 2026 Utilify. All rights locally reserved.</span>
            <span>Security Level: SSL Secured (HTTPS)</span>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;


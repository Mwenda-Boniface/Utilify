import React, { useState } from 'react';
import { LayoutGrid, Moon, Sun, Info, History, GitMerge, Search, UserX, Brain, Box, Code, Home as HomeIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import styles from './Layout.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import utilifyLogo from '../assets/images/UTILIFY.png';
import { HeaderMenu, MobileMenu } from '../components/menu/Menu';

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
    { name: 'Home', icon: <HomeIcon size={18} /> },
    { name: 'Tools', icon: <LayoutGrid size={18} /> },
    { name: 'Software', icon: <Box size={18} /> },
    { name: 'History', icon: <History size={18} /> },
    { name: 'About', icon: <Info size={18} /> },
    { name: 'Contribute', icon: <GitMerge size={18} /> },
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
            const isTabActive = activeTab === item.name;

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
          <HeaderMenu activeTab={activeTab} setActiveTab={setActiveTab} />
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
          const isTabActive = activeTab === item.name;

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
        <MobileMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      </nav>

      {/* Main Workspace */}
      <main className={styles.main}>
        <section className={styles.content}>
          {children}
        </section>
      </main>

      {/* Footer Section */}
      {!isToolOpen && activeTab === 'Home' && (
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


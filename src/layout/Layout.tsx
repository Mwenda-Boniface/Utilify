import React from 'react';
import { LayoutGrid, Moon, Sun, Info, History, GitMerge } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import styles from './Layout.module.css';
import { motion } from 'framer-motion';
import utilifyLogo from '../assets/images/UTILIFY.png';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isToolOpen?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isToolOpen }) => {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { name: 'Tools', icon: <LayoutGrid size={18} /> },
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
          {menuItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`${styles.navItem} ${activeTab === item.name ? styles.navItemActive : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.name);
              }}
            >
              {item.icon}
              <span>{item.name}</span>
              {activeTab === item.name && (
                <motion.div
                  layoutId="activeHeaderNav"
                  className={styles.activeIndicator}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right Section Actions & Status */}
        <div className={styles.rightSection}>
          <div className={styles.statusPanel}>
            <span className={styles.pulseDot}></span>
            <span className={styles.statusText}>Local Node</span>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className={styles.mobileNav}>
        {menuItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`${styles.mobileNavItem} ${activeTab === item.name ? styles.mobileNavItemActive : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item.name);
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
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


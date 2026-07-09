import React from 'react';
import { LayoutGrid, Moon, Sun, Info, Box, History } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import styles from './Layout.module.css';
import { motion } from 'framer-motion';
import utilifyLogo from '../assets/images/UTILIFY.png';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { name: 'Tools', icon: <LayoutGrid size={18} /> },
    { name: 'History', icon: <History size={18} /> },
    { name: 'About', icon: <Info size={18} /> },
  ];

  return (
    <div className={styles.layout}>
      {/* Top Header Navigation */}
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <div className={styles.logoSection}>
            <div className={styles.logoIcon}>
              <img src={utilifyLogo} alt="Utilify" className={styles.logoIconImage} />
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
          
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
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
        <button
          className={styles.mobileNavItem}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </nav>

      {/* Main Workspace */}
      <main className={styles.main}>
        <section className={styles.content}>
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;


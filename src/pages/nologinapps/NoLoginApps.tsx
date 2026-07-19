import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Search, Globe, ShieldAlert 
} from 'lucide-react';
import { NO_LOGIN_APPS, NO_LOGIN_CATEGORIES } from './noLoginAppsData';
import styles from './NoLoginApps.module.css';

interface NoLoginAppsProps {
  onNavigate: (tab: string) => void;
  searchValue: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Utilities': 'productivity',
  'Developer & Programming Tools': 'developer',
  'Code Editors & IDEs': 'developer',
  'Graphics, Image & Design': 'design',
  'Audio & Video Editing': 'scanner',
  'Document & Text Editors': 'file',
  'Text & Data Tools': 'misc',
  'File Converters': 'encoder',
  'File Hosting & Sharing': 'security',
  'Communication': 'seo',
  'Privacy, Security & Cryptography': 'security',
  'Search Engines': 'seo',
  'Study & Education': 'calculators',
  'Business & Finance': 'calculators',
  'Publishing': 'misc',
  'Internet Downloaders': 'productivity',
  'Music, Radio & Podcasts': 'scanner',
  'Games': 'image'
};

const NoLoginApps: React.FC<NoLoginAppsProps> = ({ onNavigate, searchValue }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter and sort tools alphabetically
  const filteredApps = useMemo(() => {
    return NO_LOGIN_APPS.filter(app => {
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
      const matchesSearch = app.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                            app.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                            app.category.toLowerCase().includes(searchValue.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [selectedCategory, searchValue]);

  return (
    <div className={styles.container}>
      {/* Directory Section */}
      <section className={styles.directorySection}>
        <div className={styles.directoryHeader}>
          <div className={styles.directoryTitleContainer}>
            <Globe size={24} className={styles.directoryIcon} />
            <h2>No-Login Web Apps</h2>
          </div>
          <p className={styles.directorySubtitle}>
            A curated, deduplicated directory of free web tools that work <strong>without creating an account</strong>.
          </p>
          <div className={styles.reliabilityNotice}>
            <div className={styles.noticeHeader}>
              <ShieldAlert size={16} className={styles.noticeIcon} />
              <span className={styles.noticeBadge}>Awesome List Integration Notice</span>
            </div>
            <p>
              Merged from open-source awesome lists (<code>awesome-no-login-web-apps</code>, <code>awesome-free-tools</code>, and <code>awesome-loginless</code>). Note that independent sites may add signups over time. Avoid submitting sensitive or confidential data.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className={styles.controlsRow}>
          <nav className={styles.filterSection}>
            {NO_LOGIN_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterChip} ${selectedCategory === cat ? styles.filterChipActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeNoLoginFilterBubble"
                    className={styles.activeFilterBubble}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={styles.filterText}>{cat}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Info label */}
        <div className={styles.toolsCount}>
          Showing {filteredApps.length} signup-free web apps
        </div>

        {/* App 4-in-a-row Grid */}
        <div className={styles.toolsGrid}>
          <AnimatePresence mode="popLayout">
            {filteredApps.map(app => {
              const categoryClass = CATEGORY_COLORS[app.category] || 'misc';
              return (
                <motion.a 
                  key={app.name}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.toolCard} ${styles[categoryClass]} glass`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.categoryBadge}>{app.category}</span>
                  </div>

                  <h3 className={styles.toolName}>
                    {app.name}
                    <ArrowUpRight size={14} className={styles.arrowIcon} />
                  </h3>
                  
                  <p className={styles.toolDesc}>{app.description}</p>
                  
                  <div className={styles.cardFooter}>
                    <span className={styles.urlLabel}>{new URL(app.url).hostname}</span>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredApps.length === 0 && (
          <div className={styles.noResults}>
            <Search size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <h3>No apps found</h3>
            <p>Try searching for a different keyword or changing the category filter.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default NoLoginApps;

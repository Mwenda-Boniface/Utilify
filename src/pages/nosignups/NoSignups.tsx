import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, UserX, CheckCircle2, 
  ArrowUpRight, Search, Star, ExternalLink 
} from 'lucide-react';
import { EXTERNAL_TOOLS, EXTERNAL_CATEGORIES } from './externalToolsData';
import type { ExternalTool } from './externalToolsData';
import styles from './NoSignups.module.css';

interface NoSignupsProps {
  onNavigate: (tab: string) => void;
  searchValue: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Productivity': 'productivity',
  'Design & Graphics': 'design',
  'Development': 'developer',
  'Writing & Docs': 'file',
  'Privacy & Security': 'security',
  'Utilities': 'misc',
  'Data & Analytics': 'seo',
  'Media': 'image',
  'Education': 'calculators',
  'Lists': 'encoder'
};

const NoSignups: React.FC<NoSignupsProps> = ({ onNavigate, searchValue }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter and sort tools: starred first, then alphabetically by name
  const filteredTools = useMemo(() => {
    return EXTERNAL_TOOLS.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchValue.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      // Put starred tools first
      if (a.starred && !b.starred) return -1;
      if (!a.starred && b.starred) return 1;
      // Then sort alphabetically
      return a.name.localeCompare(b.name);
    });
  }, [selectedCategory, searchValue]);

  return (
    <div className={styles.container}>

      {/* Directory Section */}
      <section className={styles.directorySection}>
        <div className={styles.directoryHeader}>
          <div className={styles.directoryTitleContainer}>
            <ExternalLink size={22} className={styles.directoryIcon} />
            <h2>Productivity Tools Directory</h2>
          </div>
          <p className={styles.directorySubtitle}>
            A curated database of 220+ external online tools that respect your privacy and don't require registration.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className={styles.controlsRow}>
          <div className={styles.categoryChips}>
            {EXTERNAL_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.categoryChip} ${selectedCategory === cat ? styles.categoryChipActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* External Tools 4-in-a-row Grid */}
        <div className={styles.toolsCount}>
          Showing {filteredTools.length} account-free tools
        </div>

        <div className={styles.toolsGrid}>
          <AnimatePresence mode="popLayout">
            {filteredTools.map(tool => {
              const categoryClass = CATEGORY_COLORS[tool.category] || 'misc';
              return (
                <motion.a 
                  key={tool.name}
                  href={tool.url}
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
                    <span className={styles.categoryBadge}>{tool.category}</span>
                    {tool.starred && (
                      <span className={styles.starBadge} title="Featured Free Tool">
                        <Star size={12} fill="var(--star-color, #fbbf24)" color="var(--star-color, #fbbf24)" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <h3 className={styles.toolName}>
                    {tool.name}
                    <ArrowUpRight size={14} className={styles.arrowIcon} />
                  </h3>
                  
                  <p className={styles.toolDesc}>{tool.description}</p>
                  
                  <div className={styles.cardFooter}>
                    <span className={styles.urlLabel}>{new URL(tool.url).hostname}</span>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredTools.length === 0 && (
          <div className={styles.noResults}>
            <Search size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <h3>No external tools found</h3>
            <p>Try searching for a different keyword or changing the category filter.</p>
          </div>
        )}
      </section>

      {/* Footer CTA Box */}
      <motion.div 
        className={`${styles.ctaBox} glass`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className={styles.ctaContent}>
          <div className={styles.checkTitle}>
            <ShieldCheck size={28} className={styles.checkIcon} />
            <h2>100% Client-Side Infrastructure</h2>
          </div>
          <p>
            Utilify is designed to be a trustless utility workspace. Because zero files are uploaded to our hosting servers, we comply natively with international frameworks like GDPR and CCPA.
          </p>
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <CheckCircle2 size={16} /> No credit cards or payment forms
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={16} /> No cookies or behavioral ad tracking
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={16} /> Offline capability & fast local execution
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NoSignups;

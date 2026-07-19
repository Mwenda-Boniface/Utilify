import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, ArrowUpRight, Search, Star, ExternalLink, Bot 
} from 'lucide-react';
import { AI_TOOLS, AI_CATEGORIES } from './aiToolsData';
import type { AITool } from './aiToolsData';
import styles from './AITools.module.css';

interface AIToolsProps {
  onNavigate: (tab: string) => void;
  searchValue: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Chatbots & General Assistants': 'developer',
  'Image Generation': 'design',
  'Photo & Image Editing': 'image',
  'Transcription & Speech-to-Text': 'file',
  'Video Generation & Editing': 'scanner',
  'Writing, Grammar & Paraphrasing': 'misc',
  'PDF & Document Tools': 'file',
  'Translation': 'seo',
  'Coding & Developer Tools': 'developer',
  'Text-to-Speech & Voice': 'security',
  'All-in-One Toolkits': 'encoder'
};

const AITools: React.FC<AIToolsProps> = ({ onNavigate, searchValue }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter and sort tools: verified first, then alphabetically by name
  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                            (tool.notes && tool.notes.toLowerCase().includes(searchValue.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      // Put verified tools first
      if (a.verified && !b.verified) return -1;
      if (!a.verified && b.verified) return 1;
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
            <Bot size={24} className={styles.directoryIcon} />
            <h2>Free AI Tools Directory</h2>
          </div>
          <p className={styles.directorySubtitle}>
            A curated database of AI-powered tools you can use in your browser <strong>without creating an account</strong>.
          </p>
          <div className={styles.reliabilityNotice}>
            <span className={styles.noticeBadge}>Note on Reliability</span>
            <p>
              Tools marked <strong className={styles.verifiedText}>Verified</strong> are well-established or open-source. Tools marked <strong className={styles.cautionText}>Use with caution</strong> are functional but less established—avoid uploading sensitive data to them.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className={styles.controlsRow}>
          <nav className={styles.filterSection}>
            {AI_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterChip} ${selectedCategory === cat ? styles.filterChipActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeAIFilterBubble"
                    className={styles.activeFilterBubble}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={styles.filterText}>{cat}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* AI Tools 4-in-a-row Grid */}
        <div className={styles.toolsCount}>
          Showing {filteredTools.length} signup-free AI tools
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
                    {tool.verified ? (
                      <span className={styles.verifiedBadge} title="Verified Safe/Trusted">
                        <ShieldCheck size={12} />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className={styles.cautionBadge} title="Use with caution">
                        <AlertTriangle size={12} />
                        <span>Caution</span>
                      </span>
                    )}
                  </div>

                  <h3 className={styles.toolName}>
                    {tool.name}
                    <ArrowUpRight size={14} className={styles.arrowIcon} />
                  </h3>
                  
                  <p className={styles.toolDesc}>{tool.description}</p>

                  {tool.notes && (
                    <div className={styles.toolNotes}>
                      <strong>Note: </strong>{tool.notes}
                    </div>
                  )}
                  
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
            <h3>No AI tools found</h3>
            <p>Try searching for a different keyword or changing the category filter.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AITools;

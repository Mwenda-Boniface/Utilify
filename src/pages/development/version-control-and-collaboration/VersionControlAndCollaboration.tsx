import React from 'react';
import { Code, ArrowUpRight } from 'lucide-react';
import styles from './VersionControlAndCollaboration.module.css';
import { VERSIONCONTROLANDCOLLABORATION_ITEMS } from './versionControlAndCollaborationData.ts';

interface Props { searchValue?: string; }

const VersionControlAndCollaborationCategory: React.FC<Props> = ({ searchValue = '' }) => {
  const filteredItems = VERSIONCONTROLANDCOLLABORATION_ITEMS.filter(item =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Code size={26} className={styles.icon} />
          <h2>Version Control and Collaboration</h2>
        </div>
      </header>
      <div className={styles.cardsGrid}>
        {filteredItems.length === 0 ? (
          <div className={styles.emptyState}>No items found matching "{searchValue}"</div>
        ) : (
          filteredItems.map(item => (
            <div key={item.name} className={`${styles.card} glass`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4>{item.name}</h4>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </div>
              {item.desc && <p className={styles.cardDesc}>{item.desc}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VersionControlAndCollaborationCategory;

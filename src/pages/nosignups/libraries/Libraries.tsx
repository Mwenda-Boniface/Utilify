import React, { useState } from 'react';
import { Library, ArrowUpRight, Search, BookMarked } from 'lucide-react';
import styles from './Libraries.module.css';
import { LIBRARY_SECTIONS } from './librariesData';

interface LibrariesProps { searchValue?: string; }
const Libraries: React.FC<LibrariesProps> = ({ searchValue = '' }) => {
  const [query, setQuery] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const totalCount = LIBRARY_SECTIONS.reduce((sum, s) => sum + s.items.length, 0);

  const effectiveQuery = searchValue || query;

  const filteredSections = LIBRARY_SECTIONS.map(sec => ({
    ...sec,
    items: sec.items.filter(
      item =>
        item.name.toLowerCase().includes(effectiveQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(effectiveQuery.toLowerCase()) ||
        (item.subject ?? '').toLowerCase().includes(effectiveQuery.toLowerCase())
    )
  })).filter(sec => (activeSection ? sec.title === activeSection : true) && sec.items.length > 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Library size={28} className={styles.icon} />
          <h2>Free Digital Libraries</h2>
          <span className={styles.badge}>{totalCount}+ libraries</span>
        </div>
        <p className={styles.subtitle}>
          Public-domain ebook collections, academic repositories, national libraries, open textbooks,
          and open media archives — all free to browse with no account required.
        </p>
        <div className={styles.note}>
          ⚠️ Nearly every entry lets you <strong>browse and read</strong> without an account.
          A few offer optional free sign-up for extra features like borrowing or downloading.
          Shadow libraries (Anna's Archive, LibGen, Z-Library) are deliberately excluded — see the Books/Comics page for those.
        </div>
      </header>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search libraries, subjects, regions…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${activeSection === null ? styles.filterActive : ''}`}
            onClick={() => setActiveSection(null)}
          >
            All ({totalCount})
          </button>
          {LIBRARY_SECTIONS.map(sec => (
            <button
              key={sec.title}
              className={`${styles.filterBtn} ${activeSection === sec.title ? styles.filterActive : ''}`}
              onClick={() => setActiveSection(prev => prev === sec.title ? null : sec.title)}
            >
              {sec.emoji} {sec.count}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className={styles.sectionsGrid}>
        {filteredSections.length === 0 ? (
          <div className={styles.empty}>
            <BookMarked size={40} opacity={0.3} />
            <p>No libraries found for "<strong>{query}</strong>"</p>
          </div>
        ) : (
          filteredSections.map(sec => (
            <section key={sec.title} className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionEmoji}>{sec.emoji}</span>
                <h3>{sec.title}</h3>
                <span className={styles.sectionCount}>{sec.items.length}</span>
              </div>
              <div className={styles.cardsGrid}>
                {sec.items.map(item => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.card} glass`}
                  >
                    <div className={styles.cardInfo}>
                      <h4 className={styles.cardName}>
                        {item.name}
                        <ArrowUpRight size={14} className={styles.arrow} />
                      </h4>
                      {item.subject && (
                        <span className={styles.subject}>{item.subject}</span>
                      )}
                      <p className={styles.cardDesc}>{item.desc}</p>
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.hostname}>
                        {(() => { try { return new URL(item.url).hostname; } catch { return item.url; } })()}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default Libraries;

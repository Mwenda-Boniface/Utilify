import React from 'react';
import { BookOpen, ArrowUpRight, Book } from 'lucide-react';
import styles from './Reading.module.css';

interface ReadingItem {
  name: string;
  url: string;
  desc: string;
}

interface ReadingSection {
  title: string;
  items: ReadingItem[];
}

const SECTIONS: ReadingSection[] = [
  {
    title: 'Digital Libraries & Search',
    items: [
      { name: 'Open Slum', url: 'https://open-slum.org/', desc: 'A community indexing directory for active digital book archives' },
      { name: 'Anna\'s Archive', url: 'https://annas-archive.gl/', desc: 'The largest open-source shadow library search engine for books and papers' },
      { name: 'Z-Library', url: 'https://z-lib.gd/', desc: 'Global digital library database offering millions of ebooks' },
      { name: 'Mobilism', url: 'https://forum.mobilism.org', desc: 'Active community forum sharing ebooks, audiobooks, and magazines' },
      { name: 'Bookracy', url: 'https://bookracy.com/', desc: 'Ebook, comic book, and manga download portal' },
      { name: 'MyAnonaMouse', url: 'https://www.myanonamouse.net/', desc: 'Private tracker community for audiobooks, graphic novels, and ebooks' },
      { name: 'Library Genesis', url: 'https://libgen.li/', desc: 'Scientific papers and literature shadow library mirror' },
      { name: 'Rave', url: 'https://ravebooksearch.com/', desc: 'Unified book search engine scraping multiple catalog systems' },
      { name: 'Internet Archive', url: 'https://archive.org/details/texts', desc: 'Non-profit digital library hosting millions of free public texts' },
      { name: 'WeLib', url: 'https://welib.org/', desc: 'Fast client mirror interface parsing the Anna\'s Archive database' }
    ]
  }
];

const Reading: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <BookOpen size={26} className={styles.icon} />
          <h2>Books / Comics / Manga</h2>
        </div>
        <p className={styles.subtitle}>
          Search extensive shadow libraries, download open-source scientific literature, and read magazines.
        </p>
      </header>

      <div className={styles.sectionsGrid}>
        {SECTIONS.map((sec) => (
          <section key={sec.title} className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <Book size={18} className={styles.sectionIcon} />
              <h3>{sec.title}</h3>
            </div>
            
            <div className={styles.cardsGrid}>
              {sec.items.map((item) => (
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
                    <p className={styles.cardDesc}>{item.desc}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.hostname}>{new URL(item.url).hostname}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Reading;

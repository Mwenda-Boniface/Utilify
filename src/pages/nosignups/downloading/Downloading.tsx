import React from 'react';
import { Download, ArrowUpRight, Cpu } from 'lucide-react';
import styles from './Downloading.module.css';

interface DownloadingItem {
  name: string;
  url: string;
  desc: string;
}

interface DownloadingSection {
  title: string;
  items: DownloadingItem[];
}

const SECTIONS: DownloadingSection[] = [
  {
    title: 'Software Sites & Search',
    items: [
      { name: 'Adobe Alternatives', url: 'https://github.com/KenneyNL/Adobe-Alternatives', desc: 'Curated list of free, open-source alternatives to Adobe products' },
      { name: 'Virgil Software Search', url: 'https://virgil.samidy.com/Software/', desc: 'Meta search engine scanning multiple safe software download repositories' },
      { name: 'CracksURL', url: 'https://cracksurl.com/', desc: 'Direct download repository hosting full-version desktop software' },
      { name: 'LRepacks', url: 'https://lrepacks.net/', desc: 'Popular repack index hosting cracked and portable Windows programs' },
      { name: 'Soft98', url: 'https://soft98.ir/', desc: 'Massive Persian software archive offering direct downloads and keygens' },
      { name: 'Mobilism', url: 'https://forum.mobilism.org/', desc: 'Forum for sharing mobile applications, books, and cracked packages' },
      { name: 'Nsane Forums', url: 'https://www.nsaneforums.com/', desc: 'Active community forum focusing on software updates, patches, and repacks' },
      { name: 'AlternativeTo', url: 'https://alternativeto.net/', desc: 'Crowdsourced software recommendation platform to find user alternatives' },
      { name: 'European Alternatives', url: 'https://european-alternatives.eu/', desc: 'Index focusing on ethical, European-based open alternatives' },
      { name: 'AIOWares', url: 'https://www.aiowares.com/', desc: 'All-In-One software forum hosting custom builds and activation guides' },
      { name: 'DownloadHa', url: 'https://www.downloadha.com/', desc: 'Large Persian archive of cracked games, software, and movies' },
      { name: 'Moum', url: 'https://moum.top/en/', desc: 'Direct download portal for utility applications and software' },
      { name: 'RetroSystemRevival', url: 'https://retrosystemsrevival.blogspot.com/', desc: 'Archive dedicated to retro operating system programs and classic software' }
    ]
  }
];

const Downloading: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Download size={26} className={styles.icon} />
          <h2>Downloading</h2>
        </div>
        <p className={styles.subtitle}>
          Browse software directories, alternative recommendations databases, repack hubs, and retro system archives.
        </p>
      </header>

      <div className={styles.sectionsGrid}>
        {SECTIONS.map((sec) => (
          <section key={sec.title} className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <Cpu size={18} className={styles.sectionIcon} />
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

export default Downloading;

import React from 'react';
import { RefreshCw, ArrowUpRight, CloudLightning } from 'lucide-react';
import styles from './Torrenting.module.css';

interface TorrentingItem {
  name: string;
  url: string;
  desc: string;
}

interface TorrentingSection {
  title: string;
  items: TorrentingItem[];
}

const SECTIONS: TorrentingSection[] = [
  {
    title: 'Torrent Clients & Tools',
    items: [
      { name: 'TorBox', url: 'https://torbox.app/', desc: 'Freemium cloud-torrent downloader allowing up to 10GB cached files' },
      { name: 'Seedr', url: 'https://www.seedr.cc/', desc: 'Fast cloud torrent client fetching links with up to 2GB free storage' },
      { name: 'webtor', url: 'https://webtor.io/', desc: 'Stream torrents directly in browser, unlimited storage with speed limits' },
      { name: 'Magnet.diy', url: 'https://magnet.diy/', desc: 'Minimal cloud-based torrent client providing 2.5GB free space' },
      { name: 'SonicBit', url: 'https://my.sonicbit.net/', desc: 'Cloud storage client providing 4GB space for magnet conversions' },
      { name: 'Multi-Up', url: 'https://multiup.io/en/upload/from-torrent', desc: 'Direct file host mirror upload tool caching up to 10GB torrent files' }
    ]
  },
  {
    title: 'Private Trackers',
    items: [
      { name: 'OpenSignup', url: 'https://opensignup.xyz/', desc: 'Real-time notifications and registry windows for private trackers' },
      { name: 'TrackerHub', url: 'https://hdvinnie.github.io/TrackerHub/', desc: 'GitHub index monitoring private tracker registry statuses' },
      { name: 'Tracker Pathways', url: 'https://trackerpathways.org/', desc: 'Interactive paths and recruitment guides for private bittorrent trackers' }
    ]
  }
];

const Torrenting: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <CloudLightning size={26} className={styles.icon} />
          <h2>Torrenting</h2>
        </div>
        <p className={styles.subtitle}>
          Download torrent links via secure cloud clients, stream video files directly, and check tracker signup statuses.
        </p>
      </header>

      <div className={styles.sectionsGrid}>
        {SECTIONS.map((sec) => (
          <section key={sec.title} className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <RefreshCw size={18} className={styles.sectionIcon} />
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

export default Torrenting;

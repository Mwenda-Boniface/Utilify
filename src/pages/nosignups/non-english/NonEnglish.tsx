import React from 'react';
import { Globe, ArrowUpRight, Search } from 'lucide-react';
import styles from './NonEnglish.module.css';

interface NonEnglishItem {
  name: string;
  url: string;
  desc: string;
}

interface NonEnglishSection {
  title: string;
  items: NonEnglishItem[];
}

const SECTIONS: NonEnglishSection[] = [
  {
    title: 'Arabic / العربية',
    items: [
      { name: 'Faharys', url: 'https://t.me/faharys', desc: 'Comprehensive Arabic Telegram channel index and catalog' },
      { name: 'AdslGate', url: 'https://www.adslgate.com/', desc: 'Large Arabic forum focusing on digital technology and broadband' },
      { name: 'ZeroTaxJobs', url: 'https://zerotaxjobs.com/', desc: 'Tax-free job board database for global software engineers' },
      { name: 'arabic-reddit-extension', url: 'https://github.com/andronasef/arabic-reddit-extension', desc: 'Open-source browser extension fixing Arabic RTL alignment on Reddit' }
    ]
  },
  {
    title: 'Downloading / تحميل',
    items: [
      { name: 'ArabP2P', url: 'https://www.arabp2p.net/', desc: 'Leading private Arabic BitTorrent tracker for videos and media' }
    ]
  },
  {
    title: 'Streaming / البث',
    items: [
      { name: 'FaselHD', url: 'https://web52518x.faselhdx.bid/', desc: 'Popular Arabic video hub streaming movies and TV shows' },
      { name: 'Anime3rb', url: 'https://anime3rb.com/', desc: 'Arabic anime stream aggregator and online catalog library' },
      { name: 'egydead', url: 'https://egydead.skin/', desc: 'Arabic movies and television series streaming catalog' },
      { name: 'FajerShow', url: 'https://fajer.show', desc: 'Arabic portal streaming cartoons, movies, and TV programs' },
      { name: 'egybest', url: 'https://egybest.la/', desc: 'One of the largest Arabic movie and anime streaming mirrors' },
      { name: 'TopCinema', url: 'https://web6.topcinema.cam/', desc: 'Arabic database directory streaming recent movies and series' },
      { name: 'kirmalk', url: 'https://ta.kirmalk.com/', desc: 'Multilingual and Arabic streaming server for TV series' },
      { name: 'My Cima', url: 'https://my-cima.video/', desc: 'Popular Arab streaming mirror hosting cinema releases and television shows' },
      { name: 'Laroza TV', url: 'https://tv.laroza.now/', desc: 'Arabic entertainment and series streaming network portal' },
      { name: 'witanime', url: 'https://witanime.you/', desc: 'Comprehensive anime database and stream player in Arabic' },
      { name: 'ristoanime', url: 'https://ristoanime.com/', desc: 'Arabic mirror streaming animation and anime series' },
      { name: 'Kawaii Anime', url: 'https://kawaii-anime.com/', desc: 'Arabic anime library offering direct browser streaming' },
      { name: 'animeslayer', url: 'https://animeslayer.to/', desc: 'Popular Arabic mobile tracker portal database for anime' },
      { name: 'animezid', url: 'https://animezid.net/', desc: 'Streaming directory hosting translated cartoons and anime' },
      { name: 'shahiid', url: 'https://shahiid-anime.net/', desc: 'Arabic anime streamer hub with subtitle selections' },
      { name: 'ani-cli-arabic', url: 'https://ani-cli-arabic.dev/', desc: 'CLI script interface to scrape and play anime with Arabic subtitles' },
      { name: 'arabic-toons', url: 'https://www.arabic-toons.com/', desc: 'Archive hosting classic and modern Arab dubbed cartoons' },
      { name: 'al-fann', url: 'https://www.al-fann.net/', desc: 'Classic Arabic music and audio history streaming directory' }
    ]
  }
];

const NonEnglish: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Globe size={26} className={styles.icon} />
          <h2>Non-English</h2>
        </div>
        <p className={styles.subtitle}>
          Explore regional tech forums, Arabic translation tools, dubbed cartoon archives, and global stream mirrors.
        </p>
      </header>

      <div className={styles.sectionsGrid}>
        {SECTIONS.map((sec) => (
          <section key={sec.title} className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <Search size={18} className={styles.sectionIcon} />
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

export default NonEnglish;

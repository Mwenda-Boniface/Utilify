import React from 'react';
import { Play, ArrowUpRight, Film } from 'lucide-react';
import styles from './Video.module.css';

interface VideoItem {
  name: string;
  url: string;
  desc: string;
}

interface VideoSection {
  title: string;
  items: VideoItem[];
}

const SECTIONS: VideoSection[] = [
  {
    title: 'Stream Aggregators',
    items: [
      { name: 'Cineby', url: 'https://cineby.at/', desc: 'High-quality Movies, TV series, and Anime web aggregator' },
      { name: 'Cineplay', url: 'https://www.cineplay.to/', desc: 'Interactive streaming platform for movies and TV series' },
      { name: 'Fmovies+', url: 'https://www.fmovies.gd/', desc: 'Ad-reduced movie and series streaming directory' },
      { name: 'Rive', url: 'https://www.rivestream.app/', desc: 'Clean, modern catalog for movie and series streaming' },
      { name: 'CorsFlix', url: 'https://watch.corsflix.net', desc: 'No-ads stream mirror for movie and television titles' },
      { name: 'Flixer', url: 'https://flixer.gd', desc: 'Catalog tracking active streaming mirrors for popular films' },
      { name: 'Hexa', url: 'https://hexa.su/', desc: 'Minimalist browser catalog streaming movies, series, and anime' },
      { name: 'PopcornMovies', url: 'https://popcornmovies.io/', desc: 'Simple streaming hub hosting recent releases and tv series' },
      { name: 'BingeBox', url: 'https://bingebox.to/', desc: 'Aggregated search database for movies and TV streams' },
      { name: '67Movies', url: 'https://67movies.nl/', desc: 'European movie database streaming mirror' },
      { name: '456movie', url: 'https://456movie.nl', desc: 'Alternative streaming node for television series and films' },
      { name: 'Coreflix', url: 'https://coreflix.tv/', desc: 'Free online streaming portal for global shows and cinema' },
      { name: 'bCine', url: 'https://bcine.ru/', desc: 'Russian and multilingual movie catalog streams' },
      { name: 'ShuttleTV', url: 'https://shuttletv.su/', desc: 'Interactive TV streaming portal' },
      { name: 'GOATED', url: 'https://goated.cx/', desc: 'Premium quality 4K movie and show streaming catalog' },
      { name: 'TouStream', url: 'https://toustream.xyz/', desc: 'Stream aggregator with direct player servers' },
      { name: 'cinrift', url: 'https://cinrift.me/', desc: 'Catalog library for streaming television releases' },
      { name: 'Vyla', url: 'https://vyla.cc/', desc: 'Clean interface hosting movies, anime, and series streams' },
      { name: 'ArrowTV', url: 'https://arrowtv.net/', desc: 'Television series database tracker and web player' },
      { name: 'Cinezo', url: 'https://www.cinezo.net/', desc: 'Free browser-based streaming utility' },
      { name: 'Flikhub', url: 'https://www.flikhub.net/', desc: 'Online directory for active movie streams' },
      { name: 'Cinetaro', url: 'https://cinetaro.tv/', desc: 'Simple player catalog for movies and television series' }
    ]
  }
];

const Video: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Film size={26} className={styles.icon} />
          <h2>Movies / TV / Anime</h2>
        </div>
        <p className={styles.subtitle}>
          Browse high-quality stream aggregators, television catalogs, and global animation platforms.
        </p>
      </header>

      <div className={styles.sectionsGrid}>
        {SECTIONS.map((sec) => (
          <section key={sec.title} className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <Play size={18} className={styles.sectionIcon} />
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

export default Video;

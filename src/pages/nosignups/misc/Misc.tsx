import React from 'react';
import { Layers, ArrowUpRight, ShieldCheck } from 'lucide-react';
import styles from './Misc.module.css';

interface MiscItem {
  name: string;
  url: string;
  desc: string;
}

interface MiscSection {
  title: string;
  items: MiscItem[];
}

const SECTIONS: MiscSection[] = [
  {
    title: 'Indexes',
    items: [
      { name: 'Awesome List Index', url: 'https://github.com/sindresorhus/awesome', desc: 'The official index of all Awesome Lists on GitHub' },
      { name: 'Lists', url: 'https://github.com/jnv/lists', desc: 'A curated list of list directories and resource indexes' },
      { name: 'FMHY Search', url: 'https://fmhy.net/posts/search', desc: 'Full-text search engine for the Freemediaheckoutpost wiki database' },
      { name: 'Awesome Search', url: 'https://awesomelists.top/', desc: 'High-speed search engine covering all public GitHub awesome repositories' },
      { name: 'Couleur Tweak Tips', url: 'https://ctt.cx/', desc: 'Resource portal containing technical scripts, utilities, and configuration tweaks' },
      { name: 'r/InternetIsBeautiful', url: 'https://reddit.com/r/InternetIsBeautiful', desc: 'Subreddit sharing unique, interesting, and single-purpose web tools' },
      { name: 'Track Awesome List', url: 'https://www.trackawesomelist.com/', desc: 'Tool tracking daily updates and commits across awesome projects' },
      { name: 'ForumDirectory', url: 'https://www.forumdirectory.com/', desc: 'Global index cataloging active internet bulletin boards and forums' },
      { name: 'theindex.fyi', url: 'https://theindex.fyi/', desc: 'Index cataloging indie websites, tools, and developer portfolios' },
      { name: 'ooh.directory', url: 'https://ooh.directory/', desc: 'Searchable directory collection of blogs categorized by topic areas' },
      { name: 'Kagi Small Web', url: 'https://kagi.com/smallweb/', desc: 'Kagi Search index magnifying non-commercial indie blogs and sites' },
      { name: 'Dan\'s Guides', url: 'https://rentry.co/danxyz7', desc: 'Extensive index of guides, security tweaks, and technical tutorials' },
      { name: 'findPWA', url: 'https://findpwa.com/', desc: 'Index database listing Progressive Web Apps you can install offline' },
      { name: 'Store.app', url: 'https://store.app/', desc: 'App store search engine directory listing PWA web applications' },
      { name: 'NoSignups', url: 'https://nosignups.net/', desc: 'Original index directory of free signup-less utility tools' },
      { name: 'SmartLinks', url: 'https://smartlinks.org/index.html', desc: 'Curated directory of internet links and reference tools' },
      { name: 'Data Hoarding', url: 'https://datahoarding.org/', desc: 'Resource index covering archiving scripts, tools, and storage guides' },
      { name: 'Single Serving Sites', url: 'https://singleservingsites.cool/', desc: 'List of single-page apps that perform exactly one simple task' },
      { name: 'Clone Wars', url: 'https://gourav.io/clone-wars', desc: 'GitHub index tracking open-source replicas of popular sites' },
      { name: 'Open Sustainable Technology', url: 'https://opensustain.tech/', desc: 'Directory tracking open-source projects in green and sustainable tech' }
    ]
  }
];

const Misc: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Layers size={26} className={styles.icon} />
          <h2>Miscellaneous</h2>
        </div>
        <p className={styles.subtitle}>
          Browse community resource indexes, search awesome lists, find PWA web applications, and read technical guides.
        </p>
      </header>

      <div className={styles.sectionsGrid}>
        {SECTIONS.map((sec) => (
          <section key={sec.title} className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <ShieldCheck size={18} className={styles.sectionIcon} />
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

export default Misc;

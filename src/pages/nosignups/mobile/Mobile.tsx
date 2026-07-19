import React from 'react';
import { Smartphone, ArrowUpRight, Grid } from 'lucide-react';
import styles from './Mobile.module.css';

interface MobileItem {
  name: string;
  url: string;
  desc: string;
}

interface MobileSection {
  title: string;
  items: MobileItem[];
}

const SECTIONS: MobileSection[] = [
  {
    title: 'Telegram Channels (Modded APKs)',
    items: [
      { name: 'Youarefinished Mods', url: 'https://t.me/+h95JCUnuf-M1MTE1', desc: 'Telegram community sharing modded applications and games' },
      { name: 'Satriyaid', url: 'https://t.me/s/satriyaid', desc: 'Public updates and archives for modded image and video editing apps' },
      { name: 'ANiK555_Mods', url: 'https://t.me/+1gj58uSCVFw1OTJl', desc: 'Secure repository for ad-free utility applications' },
      { name: 'alexstranniklite', url: 'https://t.me/alexstranniklite', desc: 'High-quality modded Android apps in lightweight versions' },
      { name: 'AMRTSOFFICIAL', url: 'https://t.me/+UGzSc_aVSbI8yTw2', desc: 'Android mod community sharing custom client applications' },
      { name: 'Sam Mods', url: 'https://t.me/+RUVXlRhdsXR2yemD', desc: 'Telegram repository for custom client mods' },
      { name: 'MustHave', url: 'https://t.me/Alexey070315', desc: 'Recommended list of essential modded applications' },
      { name: 'Tech Day', url: 'https://t.me/s/tech_d4y', desc: 'Tech channel catalog listing modded applications and tools' },
      { name: 'Modules Repository', url: 'https://t.me/modulesrepo', desc: 'Central updates channel for Magisk and mobile root modules' },
      { name: 'EasyAPK', url: 'https://t.me/EasyAPK', desc: 'Verified modded games and apps direct installer packages' },
      { name: 'AyraProject', url: 'https://t.me/AyraProject', desc: 'Custom ROM development updates, ports, and vendor files' }
    ]
  },
  {
    title: 'App Launchers',
    items: [
      { name: 'Lawnchair', url: 'https://lawnchair.app/', desc: 'Highly customizable open-source launcher bringing Pixel features to Android' },
      { name: 'Niagara Launcher', url: 'https://niagaralauncher.app/', desc: 'Minimalist launcher designed for fast single-hand navigation' },
      { name: 'SmartLauncher', url: 'https://www.smartlauncher.net/', desc: 'Launcher featuring auto-categorizing and app hiding search widgets' },
      { name: 'Kvaesitso', url: 'https://kvaesitso.mm20.de/', desc: 'Search-focused open-source home screen client launcher' },
      { name: 'KISS', url: 'https://kisslauncher.com/', desc: 'Fast, simple, low-memory launcher focusing on search-first navigation' }
    ]
  }
];

const Mobile: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Smartphone size={26} className={styles.icon} />
          <h2>Android / iOS</h2>
        </div>
        <p className={styles.subtitle}>
          Discover modded APK channels, explore mobile root modules directories, and configure open-source launcher apps.
        </p>
      </header>

      <div className={styles.sectionsGrid}>
        {SECTIONS.map((sec) => (
          <section key={sec.title} className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <Grid size={18} className={styles.sectionIcon} />
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

export default Mobile;

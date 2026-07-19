import React from 'react';
import { Gamepad2, ArrowUpRight, Trophy } from 'lucide-react';
import styles from './Gaming.module.css';

interface GamingItem {
  name: string;
  url: string;
  desc: string;
}

interface GamingSection {
  title: string;
  items: GamingItem[];
}

const SECTIONS: GamingSection[] = [
  {
    title: 'Download Games',
    items: [
      { name: 'r/PiratedGames Mega', url: 'https://rentry.org/pgames', desc: 'The comprehensive Reddit gaming piracy index megathread' },
      { name: 'CS.RIN Mega', url: 'https://cs.rin.ru/forum/viewtopic.php?f=10&t=95461', desc: 'Central guide directory for Steam game files on CS.RIN forum' },
      { name: 'privateersclub', url: 'https://megathread.pages.dev/', desc: 'Community-driven game indexes and safety tools' },
      { name: 'Wotaku', url: 'https://wotaku.wiki/games', desc: 'Wiki tracking Japanese and Otaku game downloads and patches' },
      { name: 'EverythingMoe', url: 'https://everythingmoe.com/section/game', desc: 'Directory tracking anime games, visual novels, and emulators' },
      { name: 'CS.RIN.RU', url: 'https://cs.rin.ru/forum', desc: 'Large Steam underground gaming community and forum' },
      { name: 'AnkerGames', url: 'https://ankergames.net/', desc: 'Download site hosting direct files and torrent mirrors' },
      { name: 'SteamRIP', url: 'https://steamrip.com/', desc: 'Download pre-installed and cracked PC games directly' },
      { name: 'AstralGames', url: 'https://astralgames.net/', desc: 'PC game repack downloads with working achievements integration' },
      { name: 'UnionCrax', url: 'https://union-crax.xyz/', desc: 'Direct downloads and torrent resources for PC games' },
      { name: 'Online Fix', url: 'https://online-fix.me/', desc: 'Multiplayer cracks and co-op online play files' },
      { name: 'GameBounty', url: 'https://gamebounty.world/', desc: 'Direct link directory for pre-installed desktop games' },
      { name: 'SteamUnderground', url: 'https://steamunderground.net/', desc: 'Steam game file mirrors and emulators hub' },
      { name: 'Ova Games', url: 'https://www.ovagames.com/', desc: 'Download PC games split across direct file host links' },
      { name: 'Torrminatorr', url: 'https://forum.torrminatorr.com/', desc: 'Gaming discussion forum with torrent links' }
    ]
  }
];

interface GamingProps { searchValue?: string; }
const Gaming: React.FC<GamingProps> = ({ searchValue = '' }) => {
  const filteredSections = SECTIONS.map(sec => ({
    ...sec,
    items: sec.items.filter(item => 
      item.name.toLowerCase().includes(searchValue.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchValue.toLowerCase())
    )
  })).filter(sec => sec.items.length > 0);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Gamepad2 size={26} className={styles.icon} />
          <h2>Gaming / Emulation</h2>
        </div>
        <p className={styles.subtitle}>
          Browse community megathreads, Visual Novel wikis, repack databases, and multiplayer online fixes.
        </p>
      </header>

      <div className={styles.sectionsGrid}>
        {filteredSections.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No tools found matching "{searchValue}"
          </div>
        ) : filteredSections.map((sec) => (
          <section key={sec.title} className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <Trophy size={18} className={styles.sectionIcon} />
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

export default Gaming;

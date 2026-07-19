import React from 'react';
import { Music, ArrowUpRight, Radio } from 'lucide-react';
import styles from './Audio.module.css';

interface AudioItem {
  name: string;
  url: string;
  desc: string;
}

interface AudioSection {
  title: string;
  items: AudioItem[];
}

const SECTIONS: AudioSection[] = [
  {
    title: 'Streaming Apps',
    items: [
      { name: 'Pear Desktop', url: 'https://github.com/pear-devs/pear-desktop', desc: 'Modern YouTube Music desktop client with built-in adblocking' },
      { name: 'BeatBoss', url: 'https://beatboss.thevolecitor.qzz.io/', desc: 'High-performance cross-platform audio streaming client' },
      { name: 'PlayTorrio', url: 'https://playtorrio.xyz/', desc: 'Free online streaming player client interface' },
      { name: 'yewtube', url: 'https://github.com/mps-youtube/yewtube', desc: 'Console-based YouTube Music player terminal utility' },
      { name: 'WAVE', url: 'https://waveapp.pages.dev/', desc: 'Clean, client-side web application for streaming YouTube Music' },
      { name: 'BetterSoundcloud', url: 'https://alirezakj.com/bsc/', desc: 'Custom browser extension for an ad-free SoundCloud experience' },
      { name: 'Nuclear', url: 'https://nuclearplayer.com/', desc: 'Desktop music player that pulls content from free sources' },
      { name: 'FunkWhale', url: 'https://funkwhale.audio/', desc: 'Decentralized audio sharing and social streaming network' },
      { name: 'Muffon', url: 'https://muffon.netlify.app/', desc: 'Multi-source music browser and desktop streamer client' },
      { name: 'Sonosano', url: 'https://github.com/KRSHH/Sonosano', desc: 'Self-hosted, peer-to-peer lossless audio player network' }
    ]
  },
  {
    title: 'Streaming Sites',
    items: [
      { name: 'YouTube Music', url: 'https://music.youtube.com/', desc: 'Official browser client for YouTube Music streams' },
      { name: 'Ytify', url: 'https://ytify.pp.ua/', desc: 'Lightweight web wrapper frontend client for YouTube Music' },
      { name: 'Monochrome', url: 'https://monochrome.tf/', desc: 'Lossless web audio player and streaming server' },
      { name: 'Octave', url: 'https://octavestreaming.com/', desc: 'Modern in-browser music player streaming portal' },
      { name: 'SoundCloud', url: 'https://soundcloud.com/', desc: 'Leading platform to stream user-created audio and music' },
      { name: 'Spotify', url: 'https://open.spotify.com/', desc: 'Official web player to stream music and podcasts' },
      { name: 'Deezer', url: 'https://www.deezer.com/', desc: 'Web music player hosting millions of global songs' }
    ]
  }
];

interface AudioProps { searchValue?: string; }
const Audio: React.FC<AudioProps> = ({ searchValue = '' }) => {
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
          <Music size={26} className={styles.icon} />
          <h2>Music / Podcasts / Radio</h2>
        </div>
        <p className={styles.subtitle}>
          Stream ad-free music applications, customize SoundCloud players, and listen to global podcasts.
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
              <Radio size={18} className={styles.sectionIcon} />
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

export default Audio;

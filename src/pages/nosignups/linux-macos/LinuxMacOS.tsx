import React from 'react';
import { Terminal, ArrowUpRight, Cpu } from 'lucide-react';
import styles from './LinuxMacOS.module.css';

interface LinuxMacOSItem {
  name: string;
  url: string;
  desc: string;
}

interface LinuxMacOSSection {
  title: string;
  items: LinuxMacOSItem[];
}

const SECTIONS: LinuxMacOSSection[] = [
  {
    title: 'CLI Cheat Sheets',
    items: [
      { name: 'Linux Command Library', url: 'https://linuxcommandlibrary.com/', desc: 'Searchable manual index database containing 5000+ commands' },
      { name: 'CommandlineFU', url: 'https://www.commandlinefu.com/', desc: 'Community-driven repository sharing terminal command snippets' },
      { name: 'cheat.sh', url: 'https://github.com/chubin/cheat.sh', desc: 'Unified console-first cheat sheets aggregator accessible via curl' },
      { name: 'Commands.dev', url: 'https://www.commands.dev/', desc: 'Interactive search database for terminal commands and arguments' },
      { name: 'Bash Academy', url: 'https://guide.bash.academy/', desc: 'Comprehensive guide covering bash scripting and command-line usage' },
      { name: 'ss64 Bash', url: 'https://ss64.com/bash/', desc: 'Alphabetical reference guide for Linux command line arguments' },
      { name: 'navi', url: 'https://github.com/denisidoro/navi', desc: 'Interactive cli cheatsheet launcher utilizing shell prompt select lists' }
    ]
  },
  {
    title: 'Linux Communities',
    items: [
      { name: 'LinuxQuestions', url: 'https://www.linuxquestions.org/questions/', desc: 'Veteran Linux help forum and troubleshooting database' },
      { name: 'Linux.Chat', url: 'https://discord.gg/linuxchat', desc: 'Large Discord community covering Linux sysadmin discussions' },
      { name: 'Linux x Technology', url: 'https://linuxdiscord.com/', desc: 'Discord chat for general tech, software development, and Linux OS' },
      { name: 'Neon Genesis Linux', url: 'https://discord.gg/nglinux', desc: 'Discord community discussing desktop Linux customization and programming' },
      { name: 'Discord-Linux', url: 'https://discord.gg/discord-linux', desc: 'Social community for Linux desktop users and administrators' },
      { name: 'Arch Linux Community', url: 'https://discord.gg/3m6dbPR', desc: 'Unofficial Arch Linux Discord help chat support group' },
      { name: 'Debian Community', url: 'https://discord.gg/debian', desc: 'Debian server and system administration Discord community' },
      { name: 'r/debian', url: 'https://www.reddit.com/r/debian/', desc: 'Active Reddit community discussing Debian releases and packages' },
      { name: 'Linux.org', url: 'https://linux.org/', desc: 'Educational portals, tutorials, and general Linux forums' },
      { name: 'Arch Forums', url: 'https://bbs.archlinux.org/', desc: 'Official bulletin board forum for Arch Linux users' },
      { name: 'Gentoo Forums', url: 'https://forums.gentoo.org/', desc: 'Official Gentoo compilation and configuration support forum' },
      { name: 'phoronix', url: 'https://www.phoronix.com/forums/', desc: 'Hardware benchmarking news and open-source driver forums' }
    ]
  },
  {
    title: 'Linux Distros',
    items: [
      { name: 'DistroWatch', url: 'https://distrowatch.com/dwres.php?resource=popularity', desc: 'Comprehensive news database and popularity rankings for Linux distributions' }
    ]
  }
];

const LinuxMacOS: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Terminal size={26} className={styles.icon} />
          <h2>Linux / macOS</h2>
        </div>
        <p className={styles.subtitle}>
          Browse CLI cheat sheets, join regional Linux communities, troubleshoot configuration scripts, and find system distros.
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

export default LinuxMacOS;

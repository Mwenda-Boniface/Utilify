import React from 'react';
import { ShieldCheck, ArrowUpRight, Shield } from 'lucide-react';
import styles from './Privacy.module.css';

interface PrivacyItem {
  name: string;
  url: string;
  desc: string;
}

interface PrivacySection {
  title: string;
  items: PrivacyItem[];
}

const SECTIONS: PrivacySection[] = [
  {
    title: 'Adblocking 工具与扩展',
    items: [
      { name: 'uBlock Origin', url: 'https://github.com/gorhill/uBlock', desc: 'Highly efficient wide-spectrum content blocker' },
      { name: 'AdGuard', url: 'https://github.com/AdguardTeam/AdguardBrowserExtension', desc: 'Powerful ad blocking and privacy protection extension' },
      { name: 'uBO Lite', url: 'https://github.com/uBlockOrigin/uBOL-home', desc: 'Permission-less MV3 ad blocker based on declarativeNetRequest' },
      { name: 'SponsorBlock', url: 'https://sponsor.ajay.app/', desc: 'Skip sponsored segments, intros, and outros in YouTube videos' },
      { name: 'Popup Blocker (strict)', url: 'https://github.com/schomery/popup-blocker', desc: 'Strict pop-up blocker with white/black list support' },
      { name: 'Popupblocker All', url: 'https://addons.mozilla.org/firefox/addon/popupblockerall/', desc: 'Simple extension to block all popups automatically' },
      { name: 'PopUpOFF', url: 'https://popupoff.org/', desc: 'Remove popups, overlays, cookie banners and annoying prompts' },
      { name: 'Disblock Origin', url: 'https://codeberg.org/AllPurposeMat/Disblock-Origin', desc: 'Hide Discord Nitro and server boost promotion banners' },
      { name: 'Discord Adblock', url: 'https://codeberg.org/ridge/Discord-AdBlock', desc: 'Adblocker specifically for the Discord client web application' },
      { name: 'BehindTheOverlay', url: 'https://github.com/NicolaeNMV/BehindTheOverlay', desc: 'Dismiss page-blocking overlays with a single click' },
      { name: 'BilibiliSponsorBlock', url: 'https://www.bsbsb.top/', desc: 'Skip sponsor ads and promo segments in Bilibili videos' }
    ]
  },
  {
    title: 'Adblock 过滤列表',
    items: [
      { name: 'FilterLists', url: 'https://filterlists.com/', desc: 'The comprehensive independent directory of filterlists for adblockers' },
      { name: 'LegitimateURLShortener', url: 'https://raw.githubusercontent.com/DandelionSprout/adfilt/refs/heads/master/LegitimateURLShortener.txt', desc: 'Query parameter cleaning list to remove tracking trackers' },
      { name: 'Hagezi Blocklists', url: 'https://github.com/hagezi/dns-blocklists', desc: 'Extensive DNS-level blocker lists to secure routers and apps' },
      { name: 'blacklist', url: 'https://github.com/anudeepND/blacklist', desc: 'Pi-hole and DNS-level blocklist collection' },
      { name: 'FMHY Filterlist', url: 'https://github.com/fmhy/FMHYFilterlist', desc: 'Filter list blocking dangerous or malicious sites' },
      { name: 'AI uBlock Blacklist', url: 'https://github.com/alvi-se/ai-ublock-blacklist', desc: 'Blocklist targeting AI-generated low-quality sites' },
      { name: 'Huge AI Blocklist', url: 'https://github.com/laylavish/uBlockOrigin-HUGE-AI-Blocklist', desc: 'Filters and removes AI-generated images from web search engines' }
    ]
  },
  {
    title: 'DNS Adblocking',
    items: [
      { name: 'DNS Providers', url: 'https://adguard-dns.io/kb/general/dns-providers/', desc: 'Global index of public secure DNS servers and resolvers' },
      { name: 'Pi-Hole', url: 'https://pi-hole.net/', desc: 'Network-wide self-hosted DNS adblocking server' },
      { name: 'AdGuard Home', url: 'https://adguard.com/en/adguard-home/overview.html', desc: 'Network-wide self-hosted ad, tracker, and DNS blocker' },
      { name: 'Mullvad DNS', url: 'https://mullvad.net/en/help/dns-over-https-and-dns-over-tls/', desc: 'Public DNS resolver with DoH/DoT and adfiltering support' },
      { name: 'NextDNS', url: 'https://nextdns.io', desc: 'Highly customizable cloud-based DNS adblocking resolver' },
      { name: 'LibreDNS', url: 'https://libredns.gr/', desc: 'Public encrypted DNS service with adblocking options' },
      { name: 'Rethink DNS', url: 'https://rethinkdns.com/configure', desc: 'Customizable DNS resolver and local firewall client' },
      { name: 'DNSWarden', url: 'https://dnswarden.com/', desc: 'Uncensored, secure public DNS resolver with adblocking features' },
      { name: 'Blocky', url: 'https://0xerr0r.github.io/blocky/latest/', desc: 'Fast local DNS proxy server and adblocker for home networks' },
      { name: 'AdGuard DNS', url: 'https://adguard-dns.io/', desc: 'Cloud service for custom DNS-level content filtering' },
      { name: 'Control D', url: 'https://controld.com/free-dns', desc: 'Cloud DNS service targeting ads, trackers, malware, and social networks' },
      { name: 'NxFilter', url: 'https://nxfilter.org/', desc: 'Self-hosted enterprise-grade DNS filter and adblocker' },
      { name: 'TBlock', url: 'https://tblock.me/', desc: 'DNS-level host filter and client blocker utility' },
      { name: 'Technitium', url: 'https://technitium.com/dns', desc: 'Self-hosted DNS server for custom DNS rules and adblocking' }
    ]
  },
  {
    title: 'Antivirus / Anti-Malware',
    items: [
      { name: 'Malwarebytes', url: 'https://www.malwarebytes.com/', desc: 'Leading security scanner for malware, adware, and ransomware protection' },
      { name: 'AdwCleaner', url: 'https://www.malwarebytes.com/adwcleaner/', desc: 'Ultra-lightweight adware, PUP, and browser hijacker removal tool' },
      { name: 'Triage', url: 'https://tria.ge/', desc: 'Interactive malware analysis sandbox for analyzing binaries and scripts' },
      { name: 'ANY.RUN', url: 'https://any.run/', desc: 'Interactive online sandbox to track real-time script and file behavior' },
      { name: 'Sandboxie Plus', url: 'https://sandboxie-plus.com/', desc: 'Sandboxing wrapper to isolate running apps from OS files' },
      { name: 'Dangerzone', url: 'https://dangerzone.rocks/', desc: 'Isolates and converts untrusted PDF files into safe, clean PDFs' },
      { name: 'VirusTotal', url: 'https://www.virustotal.com/', desc: 'Online utility to scan files and links against 70+ antivirus engines' },
      { name: 'Hybrid Analysis', url: 'https://hybrid-analysis.com/', desc: 'Free online malware analysis service and sandbox file scanner' },
      { name: 'Jotti', url: 'https://virusscan.jotti.org/en', desc: 'Online file scanner comparing uploads across multiple security engines' },
      { name: 'Filescan.io', url: 'https://www.filescan.io/', desc: 'Next-gen static malware analysis system and file scanner' },
      { name: 'MetaDefender Cloud', url: 'https://metadefender.com/', desc: 'Multi-scan technology scanner for threat detection' }
    ]
  },
  {
    title: 'Privacy / Security',
    items: [
      { name: 'Whonix', url: 'https://www.whonix.org/', desc: 'Tor-enforced secure operating system running in VMs' },
      { name: 'Qubes OS', url: 'https://www.qubes-os.org/', desc: 'Reasonably secure OS using virtualized container domains' },
      { name: 'Tails', url: 'https://tails.net/', desc: 'Live system OS designed to start from USB, Tor-routing all traffic' },
      { name: 'W10Privacy', url: 'https://www.w10privacy.de/english-home/', desc: 'Granular utility to block Windows telemetry and tracker processes' },
      { name: 'GnuPG', url: 'https://gnupg.org/', desc: 'Open-source implementation of OpenPGP standard for secure file/email encrypting' },
      { name: 'PrivNote', url: 'https://privnote.com/', desc: 'Send notes that will self-destruct after they are read' },
      { name: 'PrivateBin', url: 'https://privatebin.net/', desc: 'Minimal pastebin encrypting data client-side before sending' },
      { name: 'One Time Secrets', url: 'https://ots.fyi/', desc: 'Self-destructing text share tool with custom passwords' },
      { name: 'Burn.Link', url: 'https://burn.link/', desc: 'Create secure, self-destructing text links' },
      { name: 'ThisLinkWillSelfDestruct', url: 'https://thislinkwillselfdestruct.com/', desc: 'Simple, secure self-destructing notes pad' },
      { name: 'Hemmelig', url: 'https://hemmelig.app/', desc: 'Share passwords and secrets safely via encrypted self-destructing links' },
      { name: 'OneTimeSecret', url: 'https://onetimesecret.com/', desc: 'Share sensitive information and links that self-destruct on view' }
    ]
  }
];

interface PrivacyProps { searchValue?: string; }
const Privacy: React.FC<PrivacyProps> = ({ searchValue = '' }) => {
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
          <Shield size={26} className={styles.icon} />
          <h2>Adblocking & Privacy</h2>
        </div>
        <p className={styles.subtitle}>
          Secure your browser, block tracker scripts, configure DNS shielding, and audit files safely.
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

export default Privacy;

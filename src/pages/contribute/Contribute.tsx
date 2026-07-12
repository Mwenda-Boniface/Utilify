import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contribute.module.css';

interface ContributeProps {
  onNavigate: (tab: string) => void;
}

const STEPS = [
  {
    number: '01',
    title: 'Fork the Repository',
    description: 'Start by forking the Utilify repository to your own GitHub account. This creates a personal copy where you can safely make changes.',
    code: 'gh repo fork https://github.com/Mwenda-Boniface/Utilify.git\n# or click "Fork" on GitHub',
    icon: '🍴',
  },
  {
    number: '02',
    title: 'Clone & Install',
    description: 'Clone your fork locally and install the project dependencies with npm.',
    code: 'git clone https://github.com/<your-username>/Utilify.git\ncd Utilify\nnpm install',
    icon: '📦',
  },
  {
    number: '03',
    title: 'Create a Branch',
    description: 'Create a descriptive feature branch. Use the prefix feat/, fix/, docs/, or perf/ depending on your change type.',
    code: 'git checkout -b feat/my-new-tool\n# or: git checkout -b fix/bug-description',
    icon: '🌿',
  },
  {
    number: '04',
    title: 'Make Your Changes',
    description: 'Run the dev server, build your feature, fix a bug, or improve the docs. The project uses React 19 + TypeScript + Vite.',
    code: 'npm run dev\n# Dev server runs at http://localhost:5173',
    icon: '⚙️',
  },
  {
    number: '05',
    title: 'Commit & Push',
    description: 'Commit your changes with a clear, conventional commit message and push your branch to your fork.',
    code: 'git add .\ngit commit -m "feat: add new utility tool"\ngit push origin feat/my-new-tool',
    icon: '🚀',
  },
  {
    number: '06',
    title: 'Open a Pull Request',
    description: 'Navigate to the original Utilify repository on GitHub and open a Pull Request from your branch. Describe your changes clearly.',
    code: '# Visit:\n# https://github.com/Mwenda-Boniface/Utilify/pulls\n# Click "New Pull Request"',
    icon: '🔀',
  },
];

const CONTRIBUTION_TYPES = [
  {
    icon: '🛠️',
    title: 'Build a New Tool',
    description: 'Create a new utility tool. Each tool is a self-contained React component in its own folder under src/pages/.',
    badge: 'Most Welcome',
    badgeColor: 'green',
  },
  {
    icon: '🐛',
    title: 'Fix a Bug',
    description: 'Found something broken? Open an issue, then submit a PR with the fix. Label your issue with the "bug" tag.',
    badge: 'Always Needed',
    badgeColor: 'blue',
  },
  {
    icon: '🎨',
    title: 'Improve the UI/UX',
    description: 'Enhance accessibility, animations, responsive layouts, or visual polish. All styling uses Vanilla CSS modules.',
    badge: 'Creative',
    badgeColor: 'purple',
  },
  {
    icon: '⚡',
    title: 'Performance Optimization',
    description: 'Improve Lighthouse scores, reduce bundle sizes, optimize images, or improve Core Web Vitals metrics.',
    badge: 'Impactful',
    badgeColor: 'orange',
  },
  {
    icon: '📝',
    title: 'Write Documentation',
    description: 'Improve the README, add code comments, document props and hooks, or create usage guides for complex tools.',
    badge: 'Always Open',
    badgeColor: 'teal',
  },
  {
    icon: '🌍',
    title: 'Report Issues & Ideas',
    description: 'Open a GitHub Issue to report bugs, request features, or share improvement ideas. Every piece of feedback counts.',
    badge: 'Easy Start',
    badgeColor: 'yellow',
  },
];

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const Contribute: React.FC<ContributeProps> = ({ onNavigate }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className={styles.contributePage}>

      {/* ── Hero ──────────────────────────────── */}
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeDot} />
          Open Source Project
        </div>
        <h1 className={styles.heroTitle}>
          Build the Future of<br />
          <span className={styles.heroGradient}>Utilify Together</span>
        </h1>
        <p className={styles.heroSub}>
          Utilify is an open-source project that thrives on community contributions. Whether you're fixing a bug, adding a new tool, or improving documentation — every contribution matters.
        </p>
        <div className={styles.heroCtas}>
          <a
            href="https://github.com/Mwenda-Boniface/Utilify"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
          >
            <GitHubIcon />
            View on GitHub
          </a>
          <a
            href="https://github.com/Mwenda-Boniface/Utilify/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaSecondary}
          >
            Open an Issue
          </a>
        </div>

        <div className={styles.statsStrip}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>MIT</span>
            <span className={styles.statDesc}>License</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>60+</span>
            <span className={styles.statDesc}>Tools Built</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>100%</span>
            <span className={styles.statDesc}>Client-Side</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>React 19</span>
            <span className={styles.statDesc}>Tech Stack</span>
          </div>
        </div>
      </motion.div>

      {/* ── Ways to Contribute ────────────────── */}
      <section className={styles.section}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className={styles.sectionLabel}>Ways to Contribute</div>
          <h2 className={styles.sectionTitle}>How Can You Help?</h2>
          <p className={styles.sectionSub}>No contribution is too small. Pick what suits your skills and interests.</p>
        </motion.div>

        <div className={styles.contributionGrid}>
          {CONTRIBUTION_TYPES.map((type, i) => (
            <motion.div
              key={type.title}
              className={styles.contributionCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <div className={styles.cardIcon}>{type.icon}</div>
              <div className={`${styles.cardBadge} ${styles[`badge_${type.badgeColor}`]}`}>
                {type.badge}
              </div>
              <h3 className={styles.cardTitle}>{type.title}</h3>
              <p className={styles.cardDesc}>{type.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Step-by-step PR guide ─────────────── */}
      <section className={styles.section}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className={styles.sectionLabel}>Step-by-Step Guide</div>
          <h2 className={styles.sectionTitle}>How to Submit a Pull Request</h2>
          <p className={styles.sectionSub}>Follow these steps to get your first contribution merged.</p>
        </motion.div>

        <div className={styles.stepsContainer}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className={styles.stepCard}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <div className={styles.stepLeft}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepConnector} />
              </div>
              <div className={styles.stepRight}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepIcon}>{step.icon}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                </div>
                <p className={styles.stepDesc}>{step.description}</p>
                <div className={styles.codeBlock}>
                  <div className={styles.codeHeader}>
                    <div className={styles.codeDots}>
                      <span /><span /><span />
                    </div>
                    <button
                      className={styles.copyBtn}
                      onClick={() => copyCode(step.code, i)}
                    >
                      {copiedIndex === i ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className={styles.codePre}><code>{step.code}</code></pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── License ──────────────────────────── */}
      <motion.section
        className={styles.licenseSection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.licenseCard}>
          <div className={styles.licenseBadge}>MIT License</div>
          <h2 className={styles.licenseTitle}>Free to Use, Fork & Build Upon</h2>
          <p className={styles.licenseText}>
            Utilify is released under the <strong>MIT License</strong> — one of the most permissive open-source licenses available. This means you are free to:
          </p>
          <div className={styles.licensePerms}>
            {[
              { icon: '✅', title: 'Use commercially', desc: 'Deploy or integrate Utilify tools in personal, commercial, or enterprise projects.' },
              { icon: '✅', title: 'Modify freely', desc: 'Customize, extend, or refactor any part of the codebase to fit your needs.' },
              { icon: '✅', title: 'Distribute', desc: 'Share your modified version with others, as long as you include the original license notice.' },
              { icon: '✅', title: 'Private use', desc: 'Use the software privately without any obligation to open-source your changes.' },
            ].map((perm) => (
              <div key={perm.title} className={styles.permItem}>
                <span className={styles.permIcon}>{perm.icon}</span>
                <div>
                  <strong>{perm.title}</strong>
                  <p>{perm.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.licenseNote}>
            <span>📄</span>
            The only requirement is that the original MIT license and copyright notice must be included in any substantial copy or redistribution of the software.
          </div>
          <a
            href="https://github.com/Mwenda-Boniface/Utilify/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.licenseLinkBtn}
          >
            Read Full License on GitHub →
          </a>
        </div>
      </motion.section>

      {/* ── Final CTA ────────────────────────── */}
      <motion.div
        className={styles.finalCta}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.finalCtaGlow} />
        <h2 className={styles.finalCtaTitle}>Ready to Contribute?</h2>
        <p className={styles.finalCtaSub}>
          The Utilify repository is open and waiting for your ideas. Every star, fork, and pull request helps the project grow.
        </p>
        <div className={styles.finalCtaBtns}>
          <a
            href="https://github.com/Mwenda-Boniface/Utilify"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
          >
            <GitHubIcon />
            Fork on GitHub
          </a>
          <a
            href="https://github.com/Mwenda-Boniface/Utilify/issues"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaSecondary}
          >
            Browse Issues
          </a>
          <button
            onClick={() => onNavigate('Tools')}
            className={styles.ctaGhost}
          >
            Explore Tools
          </button>
        </div>
      </motion.div>

    </div>
  );
};

export default Contribute;

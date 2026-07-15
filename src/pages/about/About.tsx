import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Zap, Layers, Lock, Globe, Code2,
  FileText, Image, QrCode, Calculator, GitMerge,
  Cpu, Database, Box, CheckCircle2, ExternalLink,
  ArrowRight, Users, Target, Award, HeartHandshake,
  Clock, Mail, Lightbulb, Rocket,
} from 'lucide-react';
import styles from './About.module.css';

interface AboutProps {
  toolCount: number;
  onNavigate: (tab: string) => void;
}

const PILLARS = [
  {
    Icon: ShieldCheck,
    title: 'Privacy-First Architecture',
    description:
      'Every operation — from PDF conversion to cryptographic hashing — runs 100% inside your browser sandbox. No files, passwords, or personal data ever leave your device or touch an external server.',
    accent: 'green',
  },
  {
    Icon: Zap,
    title: 'Sub-Millisecond Performance',
    description:
      'Built on React 19, Vite, and WebAssembly workers. Heavy workloads like OCR, image compression, and document conversion are offloaded to isolated Web Workers for non-blocking, instantaneous results.',
    accent: 'blue',
  },
  {
    Icon: Layers,
    title: 'Premium Glassmorphic UI',
    description:
      'A dark-first, design-token driven interface with glassmorphic depth, smooth Framer Motion micro-animations, category identity glows, and fully responsive layouts across all screen sizes.',
    accent: 'purple',
  },
  {
    Icon: Globe,
    title: 'No Sign-Up Required',
    description:
      'Open the site, use any of the 60+ tools, and close — no account, no email, no subscription. Your launch history is saved only in your own browser localStorage and can be cleared at any time.',
    accent: 'orange',
  },
];

const TOOL_CATEGORIES = [
  { Icon: Lock,     label: 'Security & Crypto',   count: 5  },
  { Icon: Calculator, label: 'Calculators',        count: 7  },
  { Icon: Image,    label: 'Image & Design',       count: 8  },
  { Icon: FileText, label: 'File & Documents',     count: 15 },
  { Icon: Globe,    label: 'SEO & Website',        count: 6  },
  { Icon: Code2,    label: 'Developer Utilities',  count: 5  },
  { Icon: QrCode,   label: 'Scanners & QR Codes', count: 16 },
  { Icon: Box,      label: 'Encoders & Decoders',  count: 5  },
  { Icon: Database, label: 'Miscellaneous',        count: 5  },
];

const TECH_STACK = [
  { name: 'React 19',       role: 'UI Framework'    },
  { name: 'TypeScript 5',   role: 'Language'        },
  { name: 'Vite 8',         role: 'Build Tool'      },
  { name: 'Framer Motion',  role: 'Animations'      },
  { name: 'pdf-lib',        role: 'PDF Engine'      },
  { name: 'Tesseract.js',   role: 'OCR Engine'      },
  { name: 'JSZip',          role: 'Compression'     },
  { name: 'SheetJS (xlsx)', role: 'Spreadsheets'    },
  { name: 'crypto-js',      role: 'Cryptography'    },
  { name: 'qrcode.react',   role: 'QR Generator'    },
  { name: 'html5-qrcode',   role: 'QR Scanner'      },
  { name: '@faker-js/faker',role: 'Data Generation' },
];

const About: React.FC<AboutProps> = ({ toolCount, onNavigate }) => {
  return (
    <div className={styles.aboutPage}>

      {/* ── Hero Section ─────────────────────────────── */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeDot} />
          Free & Open Source
        </div>
        <h1 className={styles.heroTitle}>
          Empowering Your Digital Workflow<br />
          <span className={styles.heroGradient}>With Privacy-First Tools</span>
        </h1>
        <p className={styles.heroSub}>
          Utilify provides {toolCount}+ professional-grade utilities that run entirely in your browser. 
          Built by developers, for developers — with uncompromising privacy and zero data collection.
        </p>
        <div className={styles.heroCtas}>
          <button className={styles.ctaPrimary} onClick={() => onNavigate('Tools')}>
            Explore All Tools
            <ArrowRight size={16} />
          </button>
          <a
            href="https://github.com/Mwenda-Boniface/Utilify"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaSecondary}
          >
            View Source Code
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Key stats */}
        <div className={styles.statsRow}>
          <div className={styles.statPill}>
            <span className={styles.statPillNum}>{toolCount}+</span>
            <span className={styles.statPillLabel}>Tools</span>
          </div>
          <div className={styles.statPillDivider} />
          <div className={styles.statPill}>
            <span className={styles.statPillNum}>100%</span>
            <span className={styles.statPillLabel}>Client-Side</span>
          </div>
          <div className={styles.statPillDivider} />
          <div className={styles.statPill}>
            <span className={styles.statPillNum}>0</span>
            <span className={styles.statPillLabel}>Data Uploads</span>
          </div>
          <div className={styles.statPillDivider} />
          <div className={styles.statPill}>
            <span className={styles.statPillNum}>MIT</span>
            <span className={styles.statPillLabel}>License</span>
          </div>
        </div>
      </motion.section>

      {/* ── Mission Section ─────────────────────────── */}
      <section className={styles.missionSection}>
        <motion.div
          className={styles.missionContent}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.missionBadge}>
            <Target size={16} strokeWidth={2} />
            Our Mission
          </div>
          <h2 className={styles.missionTitle}>
            Democratizing Professional Tools
          </h2>
          <p className={styles.missionText}>
            We believe powerful digital tools should be accessible to everyone, regardless of budget or technical expertise. 
            Utilify bridges the gap between enterprise-grade functionality and everyday usability, all while maintaining 
            the highest standards of privacy and data protection.
          </p>
          <div className={styles.missionValues}>
            <div className={styles.valueItem}>
              <ShieldCheck className={styles.valueIcon} size={24} strokeWidth={1.5} />
              <div>
                <h4>Privacy First</h4>
                <p>Your data never leaves your device</p>
              </div>
            </div>
            <div className={styles.valueItem}>
              <Users className={styles.valueIcon} size={24} strokeWidth={1.5} />
              <div>
                <h4>Accessibility</h4>
                <p>Professional tools for everyone</p>
              </div>
            </div>
            <div className={styles.valueItem}>
              <Lightbulb className={styles.valueIcon} size={24} strokeWidth={1.5} />
              <div>
                <h4>Innovation</h4>
                <p>Cutting-edge browser technology</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Core Pillars ─────────────────────── */}
      <section className={styles.section}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.sectionLabel}>What Makes Utilify Different</span>
          <h2 className={styles.sectionTitle}>Built on Four Core Pillars</h2>
        </motion.div>

        <div className={styles.pillarsGrid}>
          {PILLARS.map(({ Icon, title, description, accent }, i) => (
            <motion.div
              key={title}
              className={`${styles.pillarCard} ${styles[`pillar_${accent}`]}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className={styles.pillarIconWrap}>
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className={styles.pillarTitle}>{title}</h3>
              <p className={styles.pillarDesc}>{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Use Cases Section ───────────────────── */}
      <section className={styles.useCasesSection}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.sectionLabel}>Who Uses Utilify</span>
          <h2 className={styles.sectionTitle}>Trusted by Professionals Worldwide</h2>
          <p className={styles.sectionSub}>From solo developers to enterprise teams, Utilify serves diverse professional needs</p>
        </motion.div>

        <div className={styles.useCasesGrid}>
          {[
            {
              icon: <Code2 size={28} strokeWidth={1.5} />,
              title: 'Software Developers',
              description: 'JSON formatting, code minification, regex testing, API debugging, and base64 encoding for daily development tasks.',
              users: '10K+ developers'
            },
            {
              icon: <FileText size={28} strokeWidth={1.5} />,
              title: 'Business Professionals',
              description: 'PDF conversion, document formatting, Excel processing, and presentation tools for business workflows.',
              users: '5K+ businesses'
            },
            {
              icon: <Image size={28} strokeWidth={1.5} />,
              title: 'Designers & Creatives',
              description: 'Image compression, background removal, color picking, and thumbnail creation for creative projects.',
              users: '8K+ designers'
            },
            {
              icon: <Lock size={28} strokeWidth={1.5} />,
              title: 'Security Professionals',
              description: 'Password generation, hash creation, encryption tools, and security analysis for privacy-conscious workflows.',
              users: '3K+ security pros'
            },
            {
              icon: <QrCode size={28} strokeWidth={1.5} />,
              title: 'Marketing Teams',
              description: 'QR code generation, barcode creation, and scanning tools for marketing campaigns and inventory management.',
              users: '6K+ marketers'
            },
            {
              icon: <Calculator size={28} strokeWidth={1.5} />,
              title: 'Students & Researchers',
              description: 'Calculators, converters, and data generation tools for academic work and research projects.',
              users: '15K+ students'
            },
          ].map((useCase, i) => (
            <motion.div
              key={useCase.title}
              className={styles.useCaseCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className={styles.useCaseIcon}>{useCase.icon}</div>
              <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
              <p className={styles.useCaseDesc}>{useCase.description}</p>
              <div className={styles.useCaseStats}>
                <Users size={14} strokeWidth={1.5} />
                <span>{useCase.users}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Tool Categories ───────────────────── */}
      <section className={styles.section}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.sectionLabel}>Tool Coverage</span>
          <h2 className={styles.sectionTitle}>9 Categories. {toolCount}+ Tools.</h2>
          <p className={styles.sectionSub}>Every category is a self-contained module with its own tools, no third-party account or upload needed.</p>
        </motion.div>

        <div className={styles.categoriesGrid}>
          {TOOL_CATEGORIES.map(({ Icon, label, count }, i) => (
            <motion.button
              key={label}
              className={styles.categoryChip}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              onClick={() => onNavigate('Tools')}
            >
              <div className={styles.categoryIconWrap}>
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <div className={styles.categoryInfo}>
                <span className={styles.categoryLabel}>{label}</span>
                <span className={styles.categoryCount}>{count} tools</span>
              </div>
              <ArrowRight size={14} className={styles.categoryArrow} />
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Privacy Deep-Dive ─────────────────── */}
      <motion.section
        className={styles.privacySection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.privacyCard}>
          <div className={styles.privacyBadge}>
            <ShieldCheck size={14} strokeWidth={2} />
            Privacy Guarantee
          </div>
          <h2 className={styles.privacyTitle}>Your Data Never Leaves Your Device</h2>
          <p className={styles.privacyText}>
            Utilify's architecture is fundamentally different from typical online tools. There is no backend server processing your files, no cloud storage holding your documents, and no third-party APIs receiving your data.
          </p>
          <div className={styles.privacyList}>
            {[
              { title: 'Zero Server Uploads', desc: 'File processing, password generation, and OCR run entirely inside your browser tab.' },
              { title: 'WebAssembly Workers', desc: 'Heavy tasks run in isolated Web Workers using compiled WASM binaries — off the main thread.' },
              { title: 'Blob URL Output', desc: 'Processed files are served as in-memory Blob URLs, automatically revoked when you leave.' },
              { title: 'No Analytics on Inputs', desc: 'Google Analytics tracks page views only — never your tool inputs, file content, or search queries.' },
            ].map(({ title, desc }) => (
              <div key={title} className={styles.privacyItem}>
                <CheckCircle2 size={18} strokeWidth={1.75} className={styles.privacyCheck} />
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Technology Stack ──────────────────── */}
      <section className={styles.section}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.sectionLabel}>Under the Hood</span>
          <h2 className={styles.sectionTitle}>Technology Stack</h2>
          <p className={styles.sectionSub}>Utilify is built with modern, battle-tested open-source libraries — all running client-side.</p>
        </motion.div>

        <div className={styles.techGrid}>
          {TECH_STACK.map(({ name, role }, i) => (
            <motion.div
              key={name}
              className={styles.techChip}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
            >
              <div className={styles.techDot} />
              <div>
                <span className={styles.techName}>{name}</span>
                <span className={styles.techRole}>{role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Creator/Team Section ─────────────────── */}
      <section className={styles.creatorSection}>
        <motion.div
          className={styles.creatorContent}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.creatorBadge}>
            <Rocket size={16} strokeWidth={2} />
            The Creator
          </div>
          <h2 className={styles.creatorTitle}>Built by Mwenda Boniface</h2>
          <p className={styles.creatorText}>
            Utilify was created with a simple vision: to provide professional-grade digital tools that respect user privacy. 
            As a developer passionate about open-source software and data protection, I wanted to build something that 
            demonstrates powerful applications can run entirely client-side without compromising functionality.
          </p>
          <div className={styles.creatorStats}>
            <div className={styles.creatorStat}>
              <Clock size={20} strokeWidth={1.5} />
              <div>
                <strong>2024</strong>
                <span>Project Started</span>
              </div>
            </div>
            <div className={styles.creatorStat}>
              <GitMerge size={20} strokeWidth={1.5} />
              <div>
                <strong>Open Source</strong>
                <span>MIT License</span>
              </div>
            </div>
            <div className={styles.creatorStat}>
              <HeartHandshake size={20} strokeWidth={1.5} />
              <div>
                <strong>Community</strong>
                <span>Driven</span>
              </div>
            </div>
          </div>
          <div className={styles.creatorSocial}>
            <a
              href="https://github.com/Mwenda-Boniface"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <GitMerge size={20} strokeWidth={1.5} />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:mwendaboniface146@gmail.com"
              className={styles.socialLink}
            >
              <Mail size={20} strokeWidth={1.5} />
              <span>Email</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Open Source CTA ───────────────────── */}
      <motion.div
        className={styles.openSourceCard}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.osGlow} />
        <div className={styles.osLeft}>
          <GitMerge size={32} strokeWidth={1.5} className={styles.osIcon} />
          <div>
            <h3 className={styles.osTitle}>Join Our Open Source Community</h3>
            <p className={styles.osDesc}>
              Utilify is released under the MIT License. We welcome contributions from developers worldwide — 
              whether it's adding new tools, fixing bugs, improving documentation, or suggesting features.
            </p>
          </div>
        </div>
        <div className={styles.osActions}>
          <a
            href="https://github.com/Mwenda-Boniface/Utilify"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.osBtn}
          >
            View on GitHub
            <ExternalLink size={14} />
          </a>
          <button className={styles.osLinkBtn} onClick={() => onNavigate('Contribute')}>
            How to Contribute →
          </button>
        </div>
      </motion.div>

    </div>
  );
};

export default About;

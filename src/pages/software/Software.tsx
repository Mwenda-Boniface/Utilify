import React, { useState, useRef, useEffect } from 'react';
import { Box, ArrowUpRight, Filter, ChevronDown } from 'lucide-react';
import styles from './Software.module.css';
import { SOFTWARE_SECTIONS } from './softwareData';

interface SoftwareProps {
  searchValue?: string;
}

const Software: React.FC<SoftwareProps> = ({ searchValue = '' }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const effectiveQuery = searchValue;

  const filteredSections = SOFTWARE_SECTIONS.map(sec => ({
    ...sec,
    items: sec.items.filter(
      item =>
        item.name.toLowerCase().includes(effectiveQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(effectiveQuery.toLowerCase())
    )
  })).filter(sec => (activeSection ? sec.title === activeSection : true) && sec.items.length > 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Box size={26} className={styles.icon} />
          <h2>Software Directory</h2>
        </div>
        <p className={styles.subtitle}>
          A curated catalog of 20 software categories, including open-source repositories, direct download sites, legacy applications, and developer tools.
        </p>
      </header>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.dropdownContainer} ref={dropdownRef}>
          <button 
            className={`${styles.dropdownToggle} ${isDropdownOpen ? styles.dropdownToggleActive : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Filter size={16} />
            <span>{activeSection ? activeSection : 'Filter Categories'}</span>
            <ChevronDown size={16} className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button
                className={`${styles.dropdownItem} ${activeSection === null ? styles.dropdownItemActive : ''}`}
                onClick={() => { setActiveSection(null); setIsDropdownOpen(false); }}
              >
                All Categories
              </button>
              {SOFTWARE_SECTIONS.map(sec => (
                <button
                  key={sec.title}
                  className={`${styles.dropdownItem} ${activeSection === sec.title ? styles.dropdownItemActive : ''}`}
                  onClick={() => { setActiveSection(sec.title); setIsDropdownOpen(false); }}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.sectionsGrid}>
        {filteredSections.length === 0 ? (
          <div className={styles.emptyState}>
            No software found matching "{searchValue}"
          </div>
        ) : (
          filteredSections.map((sec) => (
            <section key={sec.title} className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <h3>{sec.title}</h3>
                <span className={styles.countBadge}>{sec.items.length}</span>
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
                    <div className={styles.cardHeader}>
                      <h4>{item.name}</h4>
                      <ArrowUpRight size={16} className={styles.linkIcon} />
                    </div>
                    {item.desc && <p className={styles.cardDesc}>{item.desc}</p>}
                  </a>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default Software;

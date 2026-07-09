import React, { useState, useEffect, useRef } from 'react';
import { Globe, Clock, Search, MapPin } from 'lucide-react';
import styles from '../Calculators.module.css';

const TIME_ZONES = [
  { id: 'AoE', name: 'Anywhere on Earth (UTC-12)', offset: -12 },
  { id: 'NUT', name: 'Niue Time (UTC-11)', offset: -11 },
  { id: 'HST', name: 'Hawaii Standard Time (Honolulu) (UTC-10)', offset: -10 },
  { id: 'AKST', name: 'Alaska Standard Time (Anchorage) (UTC-9)', offset: -9 },
  { id: 'PST', name: 'Pacific Standard Time (Los Angeles) (UTC-8)', offset: -8 },
  { id: 'MST', name: 'Mountain Standard Time (Denver) (UTC-7)', offset: -7 },
  { id: 'CST', name: 'Central Standard Time (Chicago) (UTC-6)', offset: -6 },
  { id: 'EST', name: 'Eastern Standard Time (New York) (UTC-5)', offset: -5 },
  { id: 'COT', name: 'Colombia Time (Bogota) (UTC-5)', offset: -5 },
  { id: 'PET', name: 'Peru Time (Lima) (UTC-5)', offset: -5 },
  { id: 'AST_CA', name: 'Atlantic Standard Time (Halifax) (UTC-4)', offset: -4 },
  { id: 'CLT', name: 'Chile Standard Time (Santiago) (UTC-4)', offset: -4 },
  { id: 'VET', name: 'Venezuela Time (Caracas) (UTC-4)', offset: -4 },
  { id: 'NST', name: 'Newfoundland Standard Time (St. John\'s) (UTC-3.5)', offset: -3.5 },
  { id: 'ART', name: 'Argentina Time (Buenos Aires) (UTC-3)', offset: -3 },
  { id: 'BRT', name: 'Brasilia Time (Sao Paulo) (UTC-3)', offset: -3 },
  { id: 'AZOT', name: 'Azores Time (Pontadelgada) (UTC-1)', offset: -1 },
  { id: 'CVT', name: 'Cape Verde Time (Praia) (UTC-1)', offset: -1 },
  { id: 'UTC', name: 'Coordinated Universal Time (UTC+0)', offset: 0 },
  { id: 'GMT', name: 'Greenwich Mean Time (London) (UTC+0)', offset: 0 },
  { id: 'WET', name: 'Western European Time (Lisbon) (UTC+0)', offset: 0 },
  { id: 'CET', name: 'Central European Time (Berlin, Paris, Rome) (UTC+1)', offset: 1 },
  { id: 'WAT', name: 'West Africa Time (Lagos, Kinshasa) (UTC+1)', offset: 1 },
  { id: 'EET', name: 'Eastern European Time (Athens, Helsinki) (UTC+2)', offset: 2 },
  { id: 'CAT', name: 'Central Africa Time (Harare, Cairo) (UTC+2)', offset: 2 },
  { id: 'EAT', name: 'East Africa Time (Nairobi) (UTC+3)', offset: 3 },
  { id: 'MSK', name: 'Moscow Standard Time (Moscow) (UTC+3)', offset: 3 },
  { id: 'AST_SA', name: 'Arabian Standard Time (Riyadh) (UTC+3)', offset: 3 },
  { id: 'IRST', name: 'Iran Standard Time (Tehran) (UTC+3.5)', offset: 3.5 },
  { id: 'GST', name: 'Gulf Standard Time (Dubai) (UTC+4)', offset: 4 },
  { id: 'GET', name: 'Georgia Standard Time (Tbilisi) (UTC+4)', offset: 4 },
  { id: 'MUT', name: 'Mauritius Time (Port Louis) (UTC+4)', offset: 4 },
  { id: 'AFT', name: 'Afghanistan Time (Kabul) (UTC+4.5)', offset: 4.5 },
  { id: 'PKT', name: 'Pakistan Standard Time (Karachi) (UTC+5)', offset: 5 },
  { id: 'IST', name: 'Indian Standard Time (Mumbai, New Delhi) (UTC+5.5)', offset: 5.5 },
  { id: 'NPT', name: 'Nepal Time (Kathmandu) (UTC+5.75)', offset: 5.75 },
  { id: 'ALMT', name: 'Alma-Ata Time (Almaty) (UTC+6)', offset: 6 },
  { id: 'KGT', name: 'Kyrgyzstan Time (Bishkek) (UTC+6)', offset: 6 },
  { id: 'BST_BD', name: 'Bangladesh Standard Time (Dhaka) (UTC+6)', offset: 6 },
  { id: 'MMT', name: 'Myanmar Time (Yangon) (UTC+6.5)', offset: 6.5 },
  { id: 'ICT', name: 'Indochina Time (Bangkok) (UTC+7)', offset: 7 },
  { id: 'WIB', name: 'Western Indonesian Time (Jakarta) (UTC+7)', offset: 7 },
  { id: 'CST_CN', name: 'China Standard Time (Beijing) (UTC+8)', offset: 8 },
  { id: 'SGT', name: 'Singapore Time (Singapore) (UTC+8)', offset: 8 },
  { id: 'WITA', name: 'Central Indonesian Time (Makassar) (UTC+8)', offset: 8 },
  { id: 'ULAT', name: 'Ulaanbaatar Time (Ulaanbaatar) (UTC+8)', offset: 8 },
  { id: 'PHT', name: 'Philippine Time (Manila) (UTC+8)', offset: 8 },
  { id: 'JST', name: 'Japan Standard Time (Tokyo) (UTC+9)', offset: 9 },
  { id: 'WIT', name: 'Eastern Indonesian Time (Jayapura) (UTC+9)', offset: 9 },
  { id: 'ACST', name: 'Australian Central Standard Time (Adelaide) (UTC+9.5)', offset: 9.5 },
  { id: 'AEST', name: 'Australian Eastern Standard Time (Sydney) (UTC+10)', offset: 10 },
  { id: 'CHST', name: 'Chamorro Standard Time (Guam) (UTC+10)', offset: 10 },
  { id: 'LHST', name: 'Lord Howe Standard Time (Lord Howe Island) (UTC+10.5)', offset: 10.5 },
  { id: 'SBT', name: 'Solomon Islands Time (Honiara) (UTC+11)', offset: 11 },
  { id: 'VUT', name: 'Vanuatu Time (Port Vila) (UTC+11)', offset: 11 },
  { id: 'NFT', name: 'Norfolk Island Time (Kingston) (UTC+11)', offset: 11 },
  { id: 'NZST', name: 'New Zealand Standard Time (Auckland) (UTC+12)', offset: 12 },
  { id: 'FJT', name: 'Fiji Time (Suva) (UTC+12)', offset: 12 },
  { id: 'TKT', name: 'Tokelau Time (Fakaofo) (UTC+13)', offset: 13 },
  { id: 'PHOT', name: 'Phoenix Islands Time (Kanton) (UTC+13)', offset: 13 },
  { id: 'LINT', name: 'Line Islands Time (Kiritimati) (UTC+14)', offset: 14 }
];

const TimeZoneConverter: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>(new Date().toTimeString().slice(0, 5));
  
  const defaultFrom = TIME_ZONES.find(z => z.id === 'UTC') || TIME_ZONES[0];
  const defaultTo = TIME_ZONES.find(z => z.id === 'EST') || TIME_ZONES[1];

  const [fromZone, setFromZone] = useState(defaultFrom);
  const [toZone, setToZone] = useState(defaultTo);
  const [convertedTime, setConvertedTime] = useState<string>('');

  useEffect(() => {
    convertTime();
  }, [localTime, fromZone, toZone]);

  const convertTime = () => {
    if (!localTime) return;

    const [hours, minutes] = localTime.split(':').map(Number);
    
    // Convert base timezone local time to UTC
    let baseMinutesTotal = hours * 60 + minutes - (fromZone.offset * 60);
    
    // Convert from UTC to target timezone offset
    let targetMinutesTotal = baseMinutesTotal + (toZone.offset * 60);
    
    // Normalize to 24 hour range
    let normalizedMinutes = ((targetMinutesTotal % 1440) + 1440) % 1440;
    
    let targetHours = Math.floor(normalizedMinutes / 60);
    let targetMins = Math.floor(normalizedMinutes % 60);

    const pad = (num: number) => String(num).padStart(2, '0');
    setConvertedTime(`${pad(targetHours)}:${pad(targetMins)}`);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <Globe size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Time Zone Converter</h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.card}>
          <div className={styles.field}>
            <label><Clock size={16} /> Base Time</label>
            <input 
              type="time"
              className={styles.input}
              value={localTime}
              onChange={(e) => setLocalTime(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label><Search size={16} /> From Time Zone</label>
            <SearchableDropdown 
              value={fromZone} 
              onChange={setFromZone} 
              timezones={TIME_ZONES} 
            />
          </div>

          <div className={styles.field}>
            <label><MapPin size={16} /> Target Time Zone</label>
            <SearchableDropdown 
              value={toZone} 
              onChange={setToZone} 
              timezones={TIME_ZONES} 
            />
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Converted Time</span>
            <span className={styles.resultValue}>{convertedTime}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {toZone.name}
            </span>
          </div>

          <div className={styles.card} style={{ gap: '0.5rem', background: 'rgba(var(--primary-rgb), 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Time Offset</span>
              <span style={{ fontWeight: 700 }}>
                {toZone.offset - fromZone.offset >= 0 ? '+' : ''}{toZone.offset - fromZone.offset} hours
              </span>
            </div>
            <div className={styles.visualization} style={{ marginTop: '0.5rem' }}>
               <div className={styles.progressBar} style={{ background: 'var(--border)', height: '4px' }}>
                  <div 
                    className={styles.progressFill} 
                    style={{ 
                      width: '60%', 
                      marginLeft: '20%', 
                      background: 'var(--primary)' 
                    }} 
                  />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SearchableDropdownProps {
  value: typeof TIME_ZONES[number];
  onChange: (val: typeof TIME_ZONES[number]) => void;
  timezones: typeof TIME_ZONES;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ value, onChange, timezones }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [maxOptionsHeight, setMaxOptionsHeight] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 300 && rect.top > spaceBelow) {
        setOpenUpward(true);
        // Calculate available height between button top and bottom of sticky header (72px)
        const availableHeight = rect.top - 72 - 12; // 12px padding buffer
        const searchWrapperHeight = 54; // Search wrapper height
        setMaxOptionsHeight(Math.max(100, availableHeight - searchWrapperHeight));
      } else {
        setOpenUpward(false);
        setMaxOptionsHeight(null);
      }
    }
    setIsOpen(!isOpen);
  };

  const filtered = timezones.filter(z => 
    z.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    z.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `utc${z.offset >= 0 ? '+' : ''}${z.offset}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <button 
        type="button" 
        className={styles.dropdownButton} 
        onClick={toggleDropdown}
      >
        <span>{value.name} (UTC{value.offset >= 0 ? '+' : ''}{value.offset})</span>
        <span className={styles.dropdownArrow}>▼</span>
      </button>

      {isOpen && (
        <div className={openUpward ? styles.dropdownMenuUp : styles.dropdownMenu}>
          <div className={styles.searchWrapper}>
            <input 
              type="text"
              className={styles.searchInput}
              placeholder="Search timezone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <div 
            className={styles.optionsList}
            style={maxOptionsHeight ? { maxHeight: `${maxOptionsHeight}px` } : undefined}
          >
            {filtered.length > 0 ? (
              filtered.map(z => (
                <button
                  key={z.id}
                  type="button"
                  className={`${styles.optionItem} ${z.id === value.id ? styles.optionItemActive : ''}`}
                  onClick={() => {
                    onChange(z);
                    setIsOpen(false);
                  }}
                >
                  <span className={styles.optionCode}>{z.id}</span>
                  <span className={styles.optionName}>{z.name}</span>
                  <span className={styles.optionSymbol} style={{ minWidth: '4.5rem', textAlign: 'right' }}>
                    UTC{z.offset >= 0 ? '+' : ''}{z.offset}
                  </span>
                </button>
              ))
            ) : (
              <div className={styles.noResults}>No matches</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeZoneConverter;

import React, { useState, useEffect } from 'react';
import { Globe, Clock, Search, MapPin } from 'lucide-react';
import styles from '../Calculators.module.css';

const TIME_ZONES = [
  { id: 'UTC', name: 'UTC / GMT', offset: 0 },
  { id: 'EST', name: 'Eastern Standard Time (New York)', offset: -5 },
  { id: 'PST', name: 'Pacific Standard Time (Los Angeles)', offset: -8 },
  { id: 'GMT', name: 'London / Greenwich', offset: 0 },
  { id: 'CET', name: 'Central European Time (Berlin)', offset: 1 },
  { id: 'IST', name: 'Indian Standard Time (Mumbai)', offset: 5.5 },
  { id: 'EAT', name: 'East Africa Time (Nairobi)', offset: 3 },
  { id: 'CST_CN', name: 'China Standard Time (Beijing)', offset: 8 },
  { id: 'JST', name: 'Japan Standard Time (Tokyo)', offset: 9 },
  { id: 'AEDT', name: 'Australian Eastern Time (Sydney)', offset: 11 },
];

const TimeZoneConverter: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>(new Date().toTimeString().slice(0, 5));
  const [fromZone, setFromZone] = useState(TIME_ZONES[0]);
  const [toZone, setToZone] = useState(TIME_ZONES[1]);
  const [convertedTime, setConvertedTime] = useState<string>('');

  useEffect(() => {
    convertTime();
  }, [localTime, fromZone, toZone]);

  const convertTime = () => {
    if (!localTime) return;

    const [hours, minutes] = localTime.split(':').map(Number);
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    // Convert to UTC first
    const utcHours = hours - fromZone.offset;
    const targetHours = utcHours + toZone.offset;
    
    let targetDate = new Date();
    targetDate.setHours(targetHours);
    targetDate.setMinutes(minutes);

    setConvertedTime(targetDate.toTimeString().slice(0, 5));
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
            <select 
              className={styles.select}
              value={fromZone.id}
              onChange={(e) => setFromZone(TIME_ZONES.find(z => z.id === e.target.value) || TIME_ZONES[0])}
            >
              {TIME_ZONES.map(z => <option key={z.id} value={z.id}>{z.name} (UTC{z.offset >= 0 ? '+' : ''}{z.offset})</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label><MapPin size={16} /> Target Time Zone</label>
            <select 
              className={styles.select}
              value={toZone.id}
              onChange={(e) => setToZone(TIME_ZONES.find(z => z.id === e.target.value) || TIME_ZONES[1])}
            >
              {TIME_ZONES.map(z => <option key={z.id} value={z.id}>{z.name} (UTC{z.offset >= 0 ? '+' : ''}{z.offset})</option>)}
            </select>
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
              <span color="var(--text-muted)">Time Offset</span>
              <span style={{ fontWeight: 700 }}>{toZone.offset - fromZone.offset} hours</span>
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

export default TimeZoneConverter;

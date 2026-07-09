import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Gift } from 'lucide-react';
import styles from '../Calculators.module.css';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const [nextBirthday, setNextBirthday] = useState<{ months: number; days: number } | null>(null);

  useEffect(() => {
    if (birthDate) calculateAge();
  }, [birthDate]);

  const calculateAge = () => {
    const today = new Date();
    const dob = new Date(birthDate);
    
    if (isNaN(dob.getTime())) return;

    let y = today.getFullYear() - dob.getFullYear();
    let m = today.getMonth() - dob.getMonth();
    let d = today.getDate() - dob.getDate();

    if (d < 0) {
      m--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      d += prevMonth.getDate();
    }

    if (m < 0) {
      y--;
      m += 12;
    }

    setAge({ years: y, months: m, days: d });

    // Next Birthday calculation
    const nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }

    let diff = nextBday.getTime() - today.getTime();
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    
    const nextM = Math.floor(diffDays / 30);
    const nextD = diffDays % 30;
    
    setNextBirthday({ months: nextM, days: nextD });
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <Calendar size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Age Calculator</h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.card}>
          <div className={styles.field}>
            <label><Calendar size={16} /> Date of Birth</label>
            <input 
              type="date"
              className={styles.input}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div className={`${styles.field} glass`} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', marginTop: '1rem', background: 'rgba(var(--primary-rgb), 0.05)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              Enter your birth date to calculate your exact age in years, months, and days, along with your next birthday countdown.
            </p>
          </div>
        </div>

        <div className={styles.results}>
          {age ? (
            <>
              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>Your Current Age</span>
                <span className={styles.resultValue}>{age.years}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Years Old</span>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Months</div>
                  <div className={styles.statValue}>{age.months}</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Days</div>
                  <div className={styles.statValue}>{age.days}</div>
                </div>
              </div>

              {nextBirthday && (
                <div className={styles.card} style={{ gap: '0.5rem', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ec4899', fontWeight: 700, fontSize: '0.9rem' }}>
                    <Gift size={16} />
                    NEXT BIRTHDAY
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    In {nextBirthday.months} months and {nextBirthday.days} days
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={styles.card} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', opacity: 0.5 }}>
              <Clock size={48} strokeWidth={1} style={{ marginBottom: '1rem' }} />
              <p>Please enter your birth date to see the results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;

import React, { useState, useEffect } from 'react';
import { Percent, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from '../Calculators.module.css';

const PercentageCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'what-is' | 'is-what' | 'change'>('what-is');
  
  // Tab 1: What is P% of V?
  const [p1, setP1] = useState<number>(20);
  const [v1, setV1] = useState<number>(100);
  const [r1, setR1] = useState<number>(0);

  // Tab 2: V1 is what % of V2?
  const [v2a, setV2a] = useState<number>(25);
  const [v2b, setV2b] = useState<number>(100);
  const [, setR2] = useState<number>(0);

  // Tab 3: % Change from V1 to V2
  const [v3a, setV3a] = useState<number>(100);
  const [v3b, setV3b] = useState<number>(120);
  const [r3, setR3] = useState<number>(0);

  useEffect(() => {
    setR1((p1 / 100) * v1);
  }, [p1, v1]);

  useEffect(() => {
    setR2((v2a / v2b) * 100);
  }, [v2a, v2b]);

  useEffect(() => {
    if (v3a === 0) setR3(0);
    else setR3(((v3b - v3a) / v3a) * 100);
  }, [v3a, v3b]);

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <Percent size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Percentage Calculator</h2>
      </div>

      <div className={styles.statsGrid} style={{ marginBottom: '1.5rem' }}>
        <button 
          className={activeTab === 'what-is' ? styles.btnPrimary : styles.btnSecondary}
          onClick={() => setActiveTab('what-is')}
          style={{ padding: '0.75rem', fontSize: '0.85rem' }}
        >
          P% of Value
        </button>
        <button 
          className={activeTab === 'is-what' ? styles.btnPrimary : styles.btnSecondary}
          onClick={() => setActiveTab('is-what')}
          style={{ padding: '0.75rem', fontSize: '0.85rem' }}
        >
          Is what %?
        </button>
        <button 
          className={activeTab === 'change' ? styles.btnPrimary : styles.btnSecondary}
          onClick={() => setActiveTab('change')}
          style={{ padding: '0.75rem', fontSize: '0.85rem' }}
        >
          % Change
        </button>
      </div>

      <div className={styles.layout}>
        <div className={styles.card}>
          {activeTab === 'what-is' && (
            <>
              <div className={styles.field}>
                <label>What is</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input type="number" className={styles.input} value={p1} onChange={(e) => setP1(Number(e.target.value))} style={{ width: '100px' }} />
                  <span style={{ fontWeight: 600 }}>% of</span>
                  <input type="number" className={styles.input} value={v1} onChange={(e) => setV1(Number(e.target.value))} style={{ flex: 1 }} />
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Calculate a percentage of a given amount.</p>
            </>
          )}

          {activeTab === 'is-what' && (
            <>
              <div className={styles.field}>
                <label>Value</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input type="number" className={styles.input} value={v2a} onChange={(e) => setV2a(Number(e.target.value))} style={{ flex: 1 }} />
                  <span style={{ fontWeight: 600 }}>is what % of</span>
                  <input type="number" className={styles.input} value={v2b} onChange={(e) => setV2b(Number(e.target.value))} style={{ flex: 1 }} />
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Find the percentage relation between two numbers.</p>
            </>
          )}

          {activeTab === 'change' && (
            <>
              <div className={styles.field}>
                <label>Change from</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input type="number" className={styles.input} value={v3a} onChange={(e) => setV3a(Number(e.target.value))} style={{ flex: 1 }} />
                  <span style={{ fontWeight: 600 }}>to</span>
                  <input type="number" className={styles.input} value={v3b} onChange={(e) => setV3b(Number(e.target.value))} style={{ flex: 1 }} />
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Calculate the percentage increase or decrease.</p>
            </>
          )}
        </div>

        <div className={styles.results}>
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>RESULT</span>
            <span className={styles.resultValue}>
              {activeTab === 'change' && r3 > 0 ? '+' : ''}
              {activeTab === 'what-is' ? r1.toLocaleString() : r3.toFixed(1)}
              {activeTab !== 'what-is' ? '%' : ''}
            </span>
            {activeTab === 'change' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: r3 >= 0 ? '#10b981' : '#ef4444' }}>
                {r3 >= 0 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                {r3 >= 0 ? 'INCREASE' : 'DECREASE'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculator;

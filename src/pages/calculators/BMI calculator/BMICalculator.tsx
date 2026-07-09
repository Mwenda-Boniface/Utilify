import React, { useState, useEffect } from 'react';
import { Activity, Scale, Ruler, Info } from 'lucide-react';
import styles from '../Calculators.module.css';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    calculateBMI();
  }, [weight, height, unit]);

  const calculateBMI = () => {
    let value = 0;
    if (unit === 'metric') {
      value = weight / ((height / 100) * (height / 100));
    } else {
      value = (weight / (height * height)) * 703;
    }
    
    setBmi(Math.round(value * 10) / 10);
    
    if (value < 18.5) {
      setCategory('Underweight');
      setColor('#3b82f6'); // Blue
    } else if (value < 25) {
      setCategory('Normal Weight');
      setColor('#10b981'); // Green
    } else if (value < 30) {
      setCategory('Overweight');
      setColor('#f59e0b'); // Amber
    } else {
      setCategory('Obese');
      setColor('#ef4444'); // Red
    }
  };

  const getPointerPosition = () => {
    if (!bmi) return 0;
    // Map BMI 15-40 to 0-100%
    const pos = ((bmi - 15) / (40 - 15)) * 100;
    return Math.min(Math.max(pos, 0), 100);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <Activity size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>BMI Calculator</h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.card}>
          <div className={styles.statsGrid}>
            <button 
              className={unit === 'metric' ? styles.btnPrimary : styles.btnSecondary}
              onClick={() => setUnit('metric')}
              style={{ padding: '0.5rem' }}
            >
              Metric
            </button>
            <button 
              className={unit === 'imperial' ? styles.btnPrimary : styles.btnSecondary}
              onClick={() => setUnit('imperial')}
              style={{ padding: '0.5rem' }}
            >
              Imperial
            </button>
          </div>

          <div className={styles.field}>
            <label><Scale size={16} /> Weight ({unit === 'metric' ? 'kg' : 'lb'})</label>
            <input 
              type="number"
              className={styles.input}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>

          <div className={styles.field}>
            <label><Ruler size={16} /> Height ({unit === 'metric' ? 'cm' : 'in'})</label>
            <input 
              type="number"
              className={styles.input}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
        </div>

        <div className={styles.results}>
          {bmi ? (
            <>
              <div className={styles.resultCard} style={{ background: `linear-gradient(135deg, ${color}22, rgba(var(--primary-rgb), 0.1))` }}>
                <span className={styles.resultLabel}>Your BMI</span>
                <span className={styles.resultValue} style={{ color: color, WebkitTextFillColor: color }}>{bmi}</span>
                <span style={{ fontWeight: 700, color: color, fontSize: '1.25rem' }}>{category}</span>
              </div>

              <div className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <span>15</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40+</span>
                </div>
                <div className={styles.progressBar} style={{ height: '12px', background: 'linear-gradient(to right, #3b82f6 0%, #10b981 35%, #f59e0b 60%, #ef4444 100%)' }}>
                  <div 
                    style={{ 
                      position: 'absolute', 
                      left: `${getPointerPosition()}%`, 
                      top: '-4px',
                      bottom: '-4px',
                      width: '4px', 
                      backgroundColor: 'var(--text-main)', 
                      borderRadius: '2px',
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                    }} 
                  />
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <Info size={14} />
                  BMI is a useful measure of overweight and obesity. It is calculated from your height and weight.
                </p>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;

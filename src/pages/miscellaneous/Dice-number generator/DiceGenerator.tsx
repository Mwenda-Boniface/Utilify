import React, { useState } from 'react';
import { RefreshCw, Star, Hash, Sliders } from 'lucide-react';
import styles from './DiceGenerator.module.css';

const DiceGenerator: React.FC = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(6);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setResults([]);
    
    // Simulate rolling animation time
    setTimeout(() => {
      const newResults = [];
      for (let i = 0; i < count; i++) {
        newResults.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      setResults(newResults);
      setIsRolling(false);
    }, 600);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.settingsCard}>
          <div className={styles.controlGroup}>
            <div className={styles.labelWrapper}>
              <span className={styles.label}>
                <Hash size={14} style={{ marginRight: '4px' }} /> Range (Min - Max)
              </span>
            </div>
            <div className={styles.rangeInputs}>
              <input 
                type="number" 
                value={min} 
                onChange={(e) => setMin(parseInt(e.target.value) || 0)} 
                className={styles.numInput}
              />
              <span className={styles.separator}>to</span>
              <input 
                type="number" 
                value={max} 
                onChange={(e) => setMax(parseInt(e.target.value) || 0)} 
                className={styles.numInput}
              />
            </div>
          </div>

          <div className={styles.controlGroup}>
            <div className={styles.labelWrapper}>
              <span className={styles.label}>
                <Sliders size={14} style={{ marginRight: '4px' }} /> Amount of Numbers
              </span>
              <span className={styles.countBadge}>{count}</span>
            </div>
            <div className={styles.sliderWrapper}>
              <input 
                type="range" 
                min="1" 
                max="20" 
                value={count} 
                onChange={(e) => setCount(parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>
          </div>

          <button className={styles.rollBtn} onClick={rollDice} disabled={isRolling}>
            <RefreshCw size={22} className={isRolling ? styles.spinning : ''} />
            {isRolling ? 'Generating...' : 'Generate Random'}
          </button>
        </div>

        <div className={styles.resultsArea}>
          {results.length > 0 ? (
            <div className={styles.diceGrid}>
              {results.map((n, i) => (
                <div key={i} className={styles.die} style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className={styles.dieValue}>{n}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.placeholder}>
              <Star size={48} className={styles.starIcon} />
              <p>{isRolling ? 'Generating numbers...' : 'Ready to generate?'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiceGenerator;

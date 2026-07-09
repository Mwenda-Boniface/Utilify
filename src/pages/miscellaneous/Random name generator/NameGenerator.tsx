import React, { useState } from 'react';
import { User, RefreshCw, Copy, Check, Users } from 'lucide-react';
import styles from './NameGenerator.module.css';

const NameGenerator: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [gender, setGender] = useState<'both' | 'male' | 'female'>('both');
  const [count, setCount] = useState(10);
  const [copied, setCopied] = useState(false);

  const maleNames = ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua'];
  const femaleNames = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Lisa', 'Nancy', 'Betty', 'Sandra', 'Margaret', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzales', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

  const generateNames = () => {
    const newNames = [];
    const pool = gender === 'male' ? maleNames : gender === 'female' ? femaleNames : [...maleNames, ...femaleNames];
    
    for (let i = 0; i < count; i++) {
      const first = pool[Math.floor(Math.random() * pool.length)];
      const last = lastNames[Math.floor(Math.random() * lastNames.length)];
      newNames.push(`${first} ${last}`);
    }
    setNames(newNames);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(names.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.settings}>
          <div className={styles.group}>
            <label>Gender Preference</label>
            <div className={styles.segmentedControl}>
              {(['both', 'male', 'female'] as const).map((g) => (
                <button 
                  key={g}
                  className={gender === g ? styles.active : ''}
                  onClick={() => setGender(g)}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.group}>
            <label>Names to Generate: {count}</label>
            <input 
              type="range" min="1" max="50" value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className={styles.slider}
            />
          </div>

          <button className={styles.mainBtn} onClick={generateNames}>
            <RefreshCw size={18} /> Generate Names
          </button>
        </div>

        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <h4>Generated Names ({names.length})</h4>
            <button className={styles.copyBtn} onClick={copyAll} disabled={names.length === 0}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy List'}
            </button>
          </div>
          <div className={styles.nameList}>
            {names.map((name, i) => (
              <div key={i} className={styles.nameItem} style={{ animationDelay: `${i * 0.05}s` }}>
                <User size={14} className={styles.userIcon} />
                {name}
              </div>
            ))}
            {names.length === 0 && <div className={styles.empty}>Click generate to start</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameGenerator;

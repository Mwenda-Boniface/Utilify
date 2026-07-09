import React, { useState } from 'react';
import { List, RefreshCw, Copy, Check, Lock } from 'lucide-react';
import styles from './PasswordList.module.css';

const PasswordList: React.FC = () => {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [count, setCount] = useState(10);
  const [length, setLength] = useState(12);
  const [copied, setCopied] = useState(false);

  const generatePasswords = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const newPasswords = [];
    
    for (let i = 0; i < count; i++) {
      let pwd = '';
      const array = new Uint32Array(length);
      window.crypto.getRandomValues(array);
      for (let j = 0; j < length; j++) {
        pwd += charset.charAt(array[j] % charset.length);
      }
      newPasswords.push(pwd);
    }
    setPasswords(newPasswords);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(passwords.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.settings}>
          <div className={styles.group}>
            <label>Amount: {count}</label>
            <input type="range" min="1" max="100" value={count} onChange={(e) => setCount(parseInt(e.target.value))} className={styles.slider} />
          </div>
          <div className={styles.group}>
            <label>Length: {length}</label>
            <input type="range" min="4" max="32" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className={styles.slider} />
          </div>
          <button className={styles.mainBtn} onClick={generatePasswords}>
            <RefreshCw size={18} /> Generate List
          </button>
        </div>

        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <h4>Secure Passwords ({passwords.length})</h4>
            <button className={styles.copyBtn} onClick={copyAll} disabled={passwords.length === 0}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'List Copied' : 'Copy All'}
            </button>
          </div>
          <div className={styles.list}>
            {passwords.map((p, i) => (
              <div key={i} className={styles.item}>
                <Lock size={14} className={styles.icon} />
                <code>{p}</code>
              </div>
            ))}
            {passwords.length === 0 && <div className={styles.empty}>Generate a list to start</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordList;

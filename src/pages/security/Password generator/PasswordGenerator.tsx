import React, { useState, useEffect } from 'react';
import { Shield, RefreshCw, Copy, Check, Hash, Lock } from 'lucide-react';
import styles from './PasswordGenerator.module.css';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);

  const generatePassword = () => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    let fullCharset = '';
    if (options.uppercase) fullCharset += charset.uppercase;
    if (options.lowercase) fullCharset += charset.lowercase;
    if (options.numbers) fullCharset += charset.numbers;
    if (options.symbols) fullCharset += charset.symbols;

    if (!fullCharset) return;

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += fullCharset.charAt(array[i] % fullCharset.length);
    }

    setPassword(result);
    calculateStrength(result);
  };

  const calculateStrength = (pass: string) => {
    let s = 0;
    if (pass.length > 8) s += 1;
    if (pass.length > 12) s += 1;
    if (/[A-Z]/.test(pass)) s += 1;
    if (/[0-9]/.test(pass)) s += 1;
    if (/[^A-Za-z0-9]/.test(pass)) s += 1;
    setStrength(Math.min(s, 4));
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthText = () => {
    const texts = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    return texts[strength];
  };

  const getStrengthColor = () => {
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
    return colors[strength];
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.outputCard}>
          <div className={styles.passwordDisplay}>
            <span className={styles.passwordText}>{password}</span>
            <div className={styles.displayActions}>
              <button className={styles.iconBtn} onClick={generatePassword} title="Regenerate">
                <RefreshCw size={20} />
              </button>
              <button className={styles.iconBtn} onClick={handleCopy} title="Copy">
                {copied ? <Check size={20} color="#10b981" /> : <Copy size={20} />}
              </button>
            </div>
          </div>
          <div className={styles.strengthMeter}>
            <div className={styles.meterLabels}>
              <span>Strength: <strong>{getStrengthText()}</strong></span>
              <span>Entropy: <strong>{Math.floor(length * Math.log2(70))} bits</strong></span>
            </div>
            <div className={styles.meterBar}>
              {[0, 1, 2, 3].map(i => (
                <div 
                  key={i} 
                  className={styles.meterSegment}
                  style={{ 
                    backgroundColor: i < strength ? getStrengthColor() : 'var(--border)',
                    opacity: i < strength ? 1 : 0.3
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.settingsGrid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Hash size={18} />
              <h4>Password Length: {length}</h4>
            </div>
            <input 
              type="range" 
              min="4" 
              max="64" 
              value={length} 
              onChange={(e) => setLength(parseInt(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLabels}>
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Shield size={18} />
              <h4>Character Sets</h4>
            </div>
            <div className={styles.optionsList}>
              {Object.entries(options).map(([key, val]) => (
                <label key={key} className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={val} 
                    onChange={() => setOptions({ ...options, [key as keyof typeof options]: !val })}
                  />
                  <span className={styles.checkboxText}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;

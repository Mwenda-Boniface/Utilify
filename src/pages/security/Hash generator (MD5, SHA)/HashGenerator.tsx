import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { Shield, Copy, Check, Hash, AlertCircle } from 'lucide-react';
import styles from './HashGenerator.module.css';

const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: ''
  });
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (input) {
      setHashes({
        md5: CryptoJS.MD5(input).toString(),
        sha1: CryptoJS.SHA1(input).toString(),
        sha256: CryptoJS.SHA256(input).toString(),
        sha512: CryptoJS.SHA512(input).toString()
      });
    } else {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
    }
  }, [input]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.inputCard}>
          <div className={styles.cardHeader}>
            <Hash size={18} />
            <h4>Input Data</h4>
          </div>
          <textarea 
            className={styles.textarea}
            placeholder="Enter text to hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className={styles.resultsGrid}>
          {Object.entries(hashes).map(([type, value]) => (
            <div key={type} className={styles.hashCard}>
              <div className={styles.hashHeader}>
                <span className={styles.hashType}>{type.toUpperCase()}</span>
                <button 
                  className={styles.copyBtn} 
                  onClick={() => handleCopy(value, type)}
                  disabled={!value}
                >
                  {copied === type ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <div className={styles.hashValue}>
                {value || <span className={styles.placeholder}>Awaiting input...</span>}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.infoCard}>
          <AlertCircle size={18} />
          <p>All hashing is performed client-side. Your data never leaves your device.</p>
        </div>
      </div>
    </div>
  );
};

export default HashGenerator;

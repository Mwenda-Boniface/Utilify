import React, { useState } from 'react';
import { Type, Copy, Check } from 'lucide-react';
import styles from './CaseConverter.module.css';

const CaseConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = (type: string) => {
    let result = '';
    switch (type) {
      case 'upper': result = text.toUpperCase(); break;
      case 'lower': result = text.toLowerCase(); break;
      case 'title': result = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); break;
      case 'sentence': result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(); break;
      case 'camel': result = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()); break;
      case 'snake': result = text.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_'); break;
      case 'kebab': result = text.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-'); break;
      default: result = text;
    }
    setText(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.inputArea}>
          <textarea 
            className={styles.textarea}
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className={styles.charCount}>
            Characters: {text.length} | Words: {text.trim() ? text.trim().split(/\s+/).length : 0}
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.buttonGroup}>
            <button onClick={() => convert('upper')}>UPPERCASE</button>
            <button onClick={() => convert('lower')}>lowercase</button>
            <button onClick={() => convert('title')}>Title Case</button>
            <button onClick={() => convert('sentence')}>Sentence case</button>
          </div>
          <div className={styles.buttonGroup}>
            <button onClick={() => convert('camel')}>camelCase</button>
            <button onClick={() => convert('snake')}>snake_case</button>
            <button onClick={() => convert('kebab')}>kebab-case</button>
          </div>
          <div className={styles.mainActions}>
            <button className={styles.copyBtn} onClick={handleCopy} disabled={!text}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied' : 'Copy Result'}
            </button>
            <button className={styles.clearBtn} onClick={() => setText('')}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;

import React, { useState } from 'react';
import { Check, Copy, Trash2, Zap } from 'lucide-react';
import styles from '../DevTools.module.css';

const Minifier: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'js' | 'html' | 'css'>('js');
  const [copied, setCopied] = useState(false);

  const minifyCode = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    let minified = '';
    if (mode === 'js') {
      minified = input
        .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1') // Remove comments
        .replace(/\s+/g, ' ') // Collapse spaces
        .replace(/\{\s+/g, '{')
        .replace(/\s+\}/g, '}')
        .replace(/;\s+/g, ';')
        .trim();
    } else if (mode === 'css') {
      minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse spaces
        .replace(/\s*([:;{}])\s*/g, '$1') // Remove spaces around delimiters
        .trim();
    } else if (mode === 'html') {
      minified = input
        .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse spaces
        .replace(/>\s+</g, '><') // Remove spaces between tags
        .trim();
    }
    
    setOutput(minified);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className={styles.container}>

      <div className={styles.settings}>
        <div className={styles.settingItem}>
          <span>Language:</span>
          <select 
            className={styles.select} 
            value={mode} 
            onChange={(e) => setMode(e.target.value as any)}
          >
            <option value="js">JavaScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>
        <div className={styles.settingItem} style={{ marginLeft: 'auto' }}>
          <button className={styles.button + ' ' + styles.secondary} onClick={clear}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Source Code</span>
          </div>
          <div className={styles.editorWrapper}>
            <textarea 
              className={styles.textarea}
              placeholder={`Paste your ${mode.toUpperCase()} code here...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className={styles.actionBar}>
            <button className={styles.button + ' ' + styles.primary} onClick={minifyCode}>
              <Zap size={16} /> Minify Now
            </button>
          </div>
        </div>

        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Minified Result</span>
            {output && (
              <button 
                className={styles.button + ' ' + styles.secondary} 
                onClick={copyToClipboard}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <div className={styles.editorWrapper}>
            <textarea 
              className={styles.textarea}
              readOnly
              placeholder="Minified result will appear here..."
              value={output}
            />
            {output && (
              <div className={styles.successIndicator}>
                Saved {((1 - output.length / input.length) * 100).toFixed(1)}% space
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Minifier;

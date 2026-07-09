import React, { useState } from 'react';
import { Check, AlertCircle, Copy, Trash2, Code } from 'lucide-react';
import styles from '../DevTools.module.css';

const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    setError(null);
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      const obj = JSON.parse(input);
      const formatted = JSON.stringify(obj, null, indent);
      setOutput(formatted);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    setError(null);
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Input JSON</span>
            <div className={styles.labelActions}>
              <div className={styles.settingItemCompact}>
                <span>Indent:</span>
                <select 
                  className={styles.selectCompact} 
                  value={indent} 
                  onChange={(e) => setIndent(Number(e.target.value))}
                >
                  <option value={2}>2 Spaces</option>
                  <option value={4}>4 Spaces</option>
                  <option value={8}>8 Spaces</option>
                </select>
              </div>
              <button className={styles.buttonCompact + ' ' + styles.primary} onClick={formatJSON} disabled={!input}>
                <Code size={14} /> Format
              </button>
              <button className={styles.buttonCompact + ' ' + styles.secondary} onClick={minifyJSON} disabled={!input}>
                Minify
              </button>
              <button className={styles.buttonCompact + ' ' + styles.danger} onClick={clear} disabled={!input}>
                <Trash2 size={14} /> Clear
              </button>
            </div>
          </div>
          <div className={styles.editorWrapper}>
            <textarea 
              className={styles.textarea}
              placeholder="Paste your JSON here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Formatted Output</span>
            {output && (
              <button 
                className={styles.buttonCompact + ' ' + styles.secondary} 
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
              placeholder="Result will appear here..."
              value={output}
            />
            {error && (
              <div className={styles.errorOverlay}>
                <AlertCircle size={16} />
                <span>Invalid JSON: {error}</span>
              </div>
            )}
            {output && !error && (
              <div className={styles.successIndicator}>
                <Check size={12} /> Valid JSON
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONFormatter;

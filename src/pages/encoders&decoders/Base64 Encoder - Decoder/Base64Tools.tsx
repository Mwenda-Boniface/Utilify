import React, { useState } from 'react';
import { Check, Copy, Trash2, ArrowRightLeft, ShieldAlert } from 'lucide-react';
import styles from '../../developer tools/DevTools.module.css';

const Base64Tools: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const encode = () => {
    setError(null);
    try {
      setOutput(btoa(input));
    } catch (e: any) {
      setError('Encoding failed: Check for non-Latin1 characters.');
    }
  };

  const decode = () => {
    setError(null);
    try {
      setOutput(atob(input));
    } catch (e: any) {
      setError('Decoding failed: Invalid Base64 string.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swap = () => {
    setInput(output);
    setOutput('');
    setError(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Input Data</span>
            <button className={styles.button + ' ' + styles.secondary} onClick={() => setInput('')} style={{ padding: '0.25rem' }}>
              <Trash2 size={14} />
            </button>
          </div>
          <div className={styles.editorWrapper}>
            <textarea 
              className={styles.textarea}
              placeholder="Enter text or base64 here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className={styles.actionBar}>
            <button className={styles.button + ' ' + styles.primary} onClick={encode}>
              Encode to Base64
            </button>
            <button className={styles.button + ' ' + styles.secondary} onClick={decode}>
              Decode from Base64
            </button>
            <button className={styles.button + ' ' + styles.secondary} onClick={swap}>
              <ArrowRightLeft size={16} /> Result to Input
            </button>
          </div>
        </div>

        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Output Result</span>
            {output && (
              <button className={styles.button + ' ' + styles.secondary} onClick={copyToClipboard}>
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
                <ShieldAlert size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Tools;

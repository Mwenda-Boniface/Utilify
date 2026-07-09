import React, { useState } from 'react';
import { Check, Copy, ArrowRightLeft } from 'lucide-react';
import styles from '../../developer tools/DevTools.module.css';

const URLEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const encode = () => {
    setOutput(encodeURIComponent(input));
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch {
      setOutput('Error: Invalid URL encoding.');
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
  };

  return (
    <div className={styles.container}>

      <div className={styles.layout}>
        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Input URL / Text</span>
          </div>
          <div className={styles.editorWrapper}>
            <textarea 
              className={styles.textarea}
              placeholder="Enter text or URL to encode/decode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className={styles.actionBar}>
            <button className={styles.button + ' ' + styles.primary} onClick={encode}>
              Encode URL
            </button>
            <button className={styles.button + ' ' + styles.secondary} onClick={decode}>
              Decode URL
            </button>
            <button className={styles.button + ' ' + styles.secondary} onClick={swap}>
              <ArrowRightLeft size={16} /> Result to Input
            </button>
          </div>
        </div>

        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Processed Result</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLEncoder;

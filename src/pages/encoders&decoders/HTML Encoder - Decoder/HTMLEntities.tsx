import React, { useState } from 'react';
import { Copy, Check, Trash2, Code, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import styles from './HTMLEntities.module.css';

const HTMLEntities: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeHTML = () => {
    const el = document.createElement('div');
    el.innerText = input;
    setOutput(el.innerHTML);
  };

  const decodeHTML = () => {
    const el = document.createElement('div');
    el.innerHTML = input;
    setOutput(el.innerText);
  };

  const handleCopy = () => {
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
      <div className={styles.workspace}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>
              <Code size={16} /> Input Text / HTML
            </span>
            <button className={styles.ghostBtn} onClick={clear} title="Clear Input">
              <Trash2 size={16} />
            </button>
          </div>
          <div className={styles.editorWrapper}>
            <textarea
              className={styles.textarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your text or HTML here..."
            />
          </div>
          <div className={styles.actionBar}>
            <button className={styles.mainBtn} onClick={encodeHTML}>
              <Code size={18} /> Encode
            </button>
            <button className={styles.secondaryBtn} onClick={decodeHTML}>
              <ShieldCheck size={18} /> Decode
            </button>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>
              <ArrowRightLeft size={16} /> Processed Result
            </span>
            {output && (
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy Result'}
              </button>
            )}
          </div>
          <div className={styles.editorWrapper}>
            <div className={styles.outputArea}>
              {output || <span className={styles.placeholder}>Result will appear here...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HTMLEntities;

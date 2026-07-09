import React, { useState } from 'react';
import { Check, Copy, ArrowRightLeft } from 'lucide-react';
import styles from '../../developer tools/DevTools.module.css';

const BinaryConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const textToBinary = () => {
    const binary = input.split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
    setOutput(binary);
  };

  const binaryToText = () => {
    try {
      const text = input.split(' ')
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');
      setOutput(text);
    } catch {
      setOutput('Error: Invalid binary format.');
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
            <span className={styles.label}>Input Data</span>
          </div>
          <div className={styles.editorWrapper}>
            <textarea 
              className={styles.textarea}
              placeholder="Enter text or binary (0101...)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className={styles.actionBar}>
            <button className={styles.button + ' ' + styles.primary} onClick={textToBinary}>
              Text ➡️ Binary
            </button>
            <button className={styles.button + ' ' + styles.secondary} onClick={binaryToText}>
              Binary ➡️ Text
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryConverter;

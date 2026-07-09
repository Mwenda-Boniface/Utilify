import React, { useState } from 'react';
import { Check, Copy, Trash2 } from 'lucide-react';
import beautify from 'js-beautify';
import styles from '../DevTools.module.css';

const CodeBeautifier: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'js' | 'html' | 'css'>('js');
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const formatCode = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    const options = {
      indent_size: indent,
      indent_char: ' ',
      max_preserve_newlines: 2,
      preserve_newlines: true,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: 'normal' as const,
      brace_style: 'collapse' as const,
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: false,
      wrap_line_length: 0,
      indent_inner_html: false,
      comma_first: false,
      e4x: false,
      indent_empty_lines: false,
    };

    let result = '';
    if (mode === 'js') {
      result = beautify.js(input, options);
    } else if (mode === 'html') {
      result = beautify.html(input, options);
    } else if (mode === 'css') {
      result = beautify.css(input, options);
    }
    
    setOutput(result);
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
            <option value="js">JavaScript / TypeScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>
        <div className={styles.settingItem}>
          <span>Indent:</span>
          <select 
            className={styles.select} 
            value={indent} 
            onChange={(e) => setIndent(Number(e.target.value))}
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
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
            <span className={styles.label}>Minified / Messy Code</span>
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
            <button className={styles.button + ' ' + styles.primary} onClick={formatCode}>
              <Check size={16} /> Beautify Code
            </button>
          </div>
        </div>

        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Beautified Output</span>
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
              placeholder="Clean code will appear here..."
              value={output}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBeautifier;

import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import styles from '../DevTools.module.css';

const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('\\d+');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('My number is 12345 and his is 6789.');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testRegex();
  }, [pattern, flags, text]);

  const testRegex = () => {
    setError(null);
    if (!pattern) {
      setMatches([]);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches = Array.from(text.matchAll(regex));
      setMatches(allMatches);
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.settings} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-app)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', flex: 1 }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>/</span>
            <input 
              className={styles.textarea} 
              style={{ height: '30px', padding: 0 }}
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="regex pattern"
            />
            <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>/</span>
            <input 
              className={styles.textarea} 
              style={{ height: '30px', padding: 0, width: '40px' }}
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="flags"
            />
          </div>
        </div>
        {error && (
          <div style={{ color: '#ef4444', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}
      </div>

      <div className={styles.layout}>
        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Test String</span>
          </div>
          <div className={styles.editorWrapper}>
            <textarea 
              className={styles.textarea}
              placeholder="Paste text to test against here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Matches ({matches.length})</span>
          </div>
          <div className={styles.editorWrapper}>
            <div className={styles.textarea} style={{ overflowY: 'auto' }}>
              {matches.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {matches.map((m, i) => (
                    <div key={i} style={{ padding: '0.75rem', background: 'rgba(var(--primary-rgb), 0.1)', border: '1px solid var(--primary-glow)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.25rem' }}>MATCH {i + 1}</div>
                      <div style={{ color: 'var(--text-main)', wordBreak: 'break-all' }}>{m[0]}</div>
                      {m.length > 1 && (
                        <div style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(var(--primary-rgb), 0.2)', paddingTop: '0.5rem' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>GROUPS:</span>
                          {m.slice(1).map((g, gi) => (
                            <div key={gi} style={{ fontSize: '0.85rem' }}>{gi + 1}: {g}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ opacity: 0.5, textAlign: 'center', marginTop: '2rem' }}>
                  No matches found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexTester;

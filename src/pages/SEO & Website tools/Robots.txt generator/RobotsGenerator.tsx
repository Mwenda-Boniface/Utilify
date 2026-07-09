import React, { useState } from 'react';
import { Shield, Plus, Trash2, Copy, Check, AlertCircle, Bot } from 'lucide-react';
import styles from './RobotsGenerator.module.css';

interface Rule {
  id: string;
  userAgent: string;
  allow: boolean;
  path: string;
}

const RobotsGenerator: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([
    { id: '1', userAgent: '*', allow: true, path: '/' }
  ]);
  const [sitemap, setSitemap] = useState('');
  const [copied, setCopied] = useState(false);

  const addRule = () => {
    setRules([...rules, { 
      id: Math.random().toString(36).substr(2, 9), 
      userAgent: '*', 
      allow: false, 
      path: '/admin/' 
    }]);
  };

  const removeRule = (id: string) => {
    if (rules.length > 1) {
      setRules(rules.filter(r => r.id !== id));
    }
  };

  const updateRule = (id: string, field: keyof Rule, value: any) => {
    setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const generateContent = () => {
    let content = '';
    // Group by user agent
    const agents = [...new Set(rules.map(r => r.userAgent))];
    
    agents.forEach(agent => {
      content += `User-agent: ${agent}\n`;
      rules.filter(r => r.userAgent === agent).forEach(r => {
        content += `${r.allow ? 'Allow' : 'Disallow'}: ${r.path}\n`;
      });
      content += '\n';
    });

    if (sitemap) {
      content += `Sitemap: ${sitemap}\n`;
    }

    return content.trim();
  };

  const downloadFile = () => {
    const blob = new Blob([generateContent()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'robots.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.editor}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Bot size={18} />
              <h4>Crawl Rules</h4>
              <button className={styles.addBtn} onClick={addRule}><Plus size={16} /> Add Rule</button>
            </div>
            <div className={styles.ruleList}>
              {rules.map(r => (
                <div key={r.id} className={styles.ruleRow}>
                  <div className={styles.inputGroup}>
                    <label>User Agent</label>
                    <input value={r.userAgent} onChange={(e) => updateRule(r.id, 'userAgent', e.target.value)} placeholder="*" />
                  </div>
                  <div className={styles.selectGroup}>
                    <label>Access</label>
                    <select value={r.allow ? 'allow' : 'disallow'} onChange={(e) => updateRule(r.id, 'allow', e.target.value === 'allow')}>
                      <option value="allow">Allow</option>
                      <option value="disallow">Disallow</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Path</label>
                    <input value={r.path} onChange={(e) => updateRule(r.id, 'path', e.target.value)} placeholder="/" />
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeRule(r.id)}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
            <div className={styles.sitemapGroup}>
              <label>Sitemap URL (Optional)</label>
              <input value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml" />
            </div>
          </div>
        </div>

        <div className={styles.preview}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <AlertCircle size={18} />
              <h4>File Preview</h4>
              <div className={styles.actions}>
                <button className={styles.copyBtn} onClick={() => { navigator.clipboard.writeText(generateContent()); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button className={styles.primaryBtn} onClick={downloadFile}>
                   Download
                </button>
              </div>
            </div>
            <div className={styles.codeBlock}>
              <pre><code>{generateContent()}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotsGenerator;

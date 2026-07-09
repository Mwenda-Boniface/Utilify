import React, { useState } from 'react';
import { Map, Plus, Trash2, Download, Copy, Check, Link as LinkIcon } from 'lucide-react';
import styles from './SitemapGenerator.module.css';

interface SitemapURL {
  id: string;
  url: string;
  priority: string;
  changefreq: string;
}

const SitemapGenerator: React.FC = () => {
  const [urls, setUrls] = useState<SitemapURL[]>([
    { id: '1', url: 'https://example.com/', priority: '1.0', changefreq: 'daily' }
  ]);
  const [copied, setCopied] = useState(false);

  const addUrl = () => {
    setUrls([...urls, { 
      id: Math.random().toString(36).substr(2, 9), 
      url: 'https://example.com/', 
      priority: '0.8', 
      changefreq: 'weekly' 
    }]);
  };

  const removeUrl = (id: string) => {
    if (urls.length > 1) {
      setUrls(urls.filter(u => u.id !== id));
    }
  };

  const updateUrl = (id: string, field: keyof SitemapURL, value: string) => {
    setUrls(urls.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  const generateXML = () => {
    const today = new Date().toISOString().split('T')[0];
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
    urls.forEach(u => {
      xml += `  <url>
    <loc>${u.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>
`;
    });
    xml += `</urlset>`;
    return xml;
  };

  const downloadXML = () => {
    const blob = new Blob([generateXML()], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.editorSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <LinkIcon size={18} />
              <h4>URLs to Include</h4>
              <button className={styles.addBtn} onClick={addUrl}><Plus size={16} /> Add URL</button>
            </div>
            <div className={styles.urlList}>
              {urls.map(u => (
                <div key={u.id} className={styles.urlRow}>
                  <div className={styles.inputGroup}>
                    <input 
                      value={u.url} 
                      onChange={(e) => updateUrl(u.id, 'url', e.target.value)}
                      placeholder="https://example.com/page"
                    />
                  </div>
                  <div className={styles.selectGroup}>
                    <select value={u.priority} onChange={(e) => updateUrl(u.id, 'priority', e.target.value)}>
                      <option value="1.0">1.0 (High)</option>
                      <option value="0.8">0.8</option>
                      <option value="0.5">0.5 (Normal)</option>
                      <option value="0.3">0.3</option>
                    </select>
                  </div>
                  <div className={styles.selectGroup}>
                    <select value={u.changefreq} onChange={(e) => updateUrl(u.id, 'changefreq', e.target.value)}>
                      <option value="always">Always</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeUrl(u.id)}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.outputSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Download size={18} />
              <h4>XML Output</h4>
              <div className={styles.actions}>
                <button className={styles.copyBtn} onClick={() => { navigator.clipboard.writeText(generateXML()); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button className={styles.primaryBtn} onClick={downloadXML}>
                  <Download size={16} /> Download XML
                </button>
              </div>
            </div>
            <div className={styles.codeBlock}>
              <pre><code>{generateXML()}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapGenerator;

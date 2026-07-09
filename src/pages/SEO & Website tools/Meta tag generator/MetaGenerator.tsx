import React, { useState } from 'react';
import { Layout, Copy, Check, Info, Search, Share2 } from 'lucide-react';
import styles from './MetaGenerator.module.css';

const MetaGenerator: React.FC = () => {
  const [meta, setMeta] = useState({
    title: '',
    description: '',
    author: '',
    keywords: '',
    robots: 'index, follow',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterCard: 'summary_large_image'
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMeta(prev => ({ ...prev, [name]: value }));
  };

  const generateCode = () => {
    return `<!-- Primary Meta Tags -->
<title>${meta.title || 'Page Title'}</title>
<meta name="title" content="${meta.title}">
<meta name="description" content="${meta.description}">
<meta name="author" content="${meta.author}">
<meta name="keywords" content="${meta.keywords}">
<meta name="robots" content="${meta.robots}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${window.location.href}">
<meta property="og:title" content="${meta.ogTitle || meta.title}">
<meta property="og:description" content="${meta.ogDescription || meta.description}">
<meta property="og:image" content="${meta.ogImage}">

<!-- Twitter -->
<meta property="twitter:card" content="${meta.twitterCard}">
<meta property="twitter:url" content="${window.location.href}">
<meta property="twitter:title" content="${meta.ogTitle || meta.title}">
<meta property="twitter:description" content="${meta.ogDescription || meta.description}">
<meta property="twitter:image" content="${meta.ogImage}">`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Search size={18} />
              <h4>Search Engine Optimization</h4>
            </div>
            <div className={styles.inputGroup}>
              <label>Page Title</label>
              <input 
                name="title" 
                value={meta.title} 
                onChange={handleChange} 
                placeholder="Enter page title (max 60 chars)"
                maxLength={60}
              />
              <span className={styles.counter}>{meta.title.length}/60</span>
            </div>
            <div className={styles.inputGroup}>
              <label>Meta Description</label>
              <textarea 
                name="description" 
                value={meta.description} 
                onChange={handleChange} 
                placeholder="Enter page description (max 160 chars)"
                maxLength={160}
              />
              <span className={styles.counter}>{meta.description.length}/160</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Share2 size={18} />
              <h4>Social Media (Open Graph)</h4>
            </div>
            <div className={styles.inputGroup}>
              <label>OG Title</label>
              <input name="ogTitle" value={meta.ogTitle} onChange={handleChange} placeholder="Social share title" />
            </div>
            <div className={styles.inputGroup}>
              <label>Image URL</label>
              <input name="ogImage" value={meta.ogImage} onChange={handleChange} placeholder="https://example.com/image.jpg" />
            </div>
          </div>
        </div>

        <div className={styles.resultSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Info size={18} />
              <h4>Generated HTML</h4>
              <button className={styles.copyBtn} onClick={copyToClipboard}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>
            <div className={styles.codeWrapper}>
              <pre><code>{generateCode()}</code></pre>
            </div>
          </div>

          <div className={styles.previewCard}>
             <div className={styles.googlePreview}>
                <span className={styles.googleUrl}>www.example.com</span>
                <h5 className={styles.googleTitle}>{meta.title || 'Page Title Example'}</h5>
                <p className={styles.googleDesc}>{meta.description || 'This is how your page description will appear in Google search results. Make it compelling!'}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaGenerator;

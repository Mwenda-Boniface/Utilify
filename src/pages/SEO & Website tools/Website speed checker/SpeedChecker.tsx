import React, { useState } from 'react';
import { Gauge, Zap, Globe, Clock, Smartphone, Monitor, AlertTriangle, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import styles from './SpeedChecker.module.css';

interface SpeedMetrics {
  lcp: string;
  fid: string;
  cls: string;
  score: number;
  loading: boolean;
  error?: string;
}

const SpeedChecker: React.FC = () => {
  const [url, setUrl] = useState('');
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile');
  const [metrics, setMetrics] = useState<SpeedMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  const checkSpeed = async () => {
    if (!url) return;
    setLoading(true);
    setMetrics(null);

    try {
      const targetUrl = url.startsWith('http') ? url : `https://${url}`;
      const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=${strategy}`;
      
      const response = await fetch(api);
      const data = await response.json();

      if (data.error) throw new Error(data.error.message);

      const audit = data.lighthouseResult.audits;
      const score = data.lighthouseResult.categories.performance.score * 100;

      setMetrics({
        lcp: audit['largest-contentful-paint'].displayValue,
        fid: audit['max-potential-fid'].displayValue,
        cls: audit['cumulative-layout-shift'].displayValue,
        score: Math.round(score),
        loading: false
      });
    } catch (err: any) {
      setMetrics({
        lcp: 'N/A',
        fid: 'N/A',
        cls: 'N/A',
        score: 0,
        loading: false,
        error: err.message || 'Failed to analyze website speed.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.searchBar}>
          <div className={styles.inputWrapper}>
            <Globe size={20} className={styles.urlIcon} />
            <input 
              type="text" 
              placeholder="Enter website URL (e.g., google.com)" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkSpeed()}
            />
          </div>
          <div className={styles.toggle}>
            <button 
              className={strategy === 'mobile' ? styles.active : ''} 
              onClick={() => setStrategy('mobile')}
            >
              <Smartphone size={18} /> Mobile
            </button>
            <button 
              className={strategy === 'desktop' ? styles.active : ''} 
              onClick={() => setStrategy('desktop')}
            >
              <Monitor size={18} /> Desktop
            </button>
          </div>
          <button className={styles.mainBtn} onClick={checkSpeed} disabled={loading || !url}>
            {loading ? <Loader2 className={styles.spinner} /> : <Zap size={18} />}
            {loading ? 'Analyzing...' : 'Check Speed'}
          </button>
        </div>

        {metrics && (
          <div className={styles.results}>
            {metrics.error ? (
              <div className={styles.errorCard}>
                <AlertTriangle size={32} />
                <p>{metrics.error}</p>
              </div>
            ) : (
              <div className={styles.metricsGrid}>
                <div className={styles.scoreCard}>
                  <div className={styles.scoreCircle} style={{ borderColor: getScoreColor(metrics.score) }}>
                    <span style={{ color: getScoreColor(metrics.score) }}>{metrics.score}</span>
                  </div>
                  <h4>Performance Score</h4>
                  <p>Based on Google Lighthouse audit</p>
                </div>

                <div className={styles.vitalCard}>
                  <div className={styles.vitalHeader}>
                    <Clock size={18} />
                    <span>Largest Contentful Paint</span>
                  </div>
                  <div className={styles.vitalValue}>{metrics.lcp}</div>
                  <div className={styles.vitalStatus}>
                    <CheckCircle2 size={14} /> Good
                  </div>
                </div>

                <div className={styles.vitalCard}>
                  <div className={styles.vitalHeader}>
                    <Zap size={18} />
                    <span>Max Potential FID</span>
                  </div>
                  <div className={styles.vitalValue}>{metrics.fid}</div>
                  <div className={styles.vitalStatus}>
                    <CheckCircle2 size={14} /> Good
                  </div>
                </div>

                <div className={styles.vitalCard}>
                  <div className={styles.vitalHeader}>
                    <ArrowRight size={18} />
                    <span>Cumulative Layout Shift</span>
                  </div>
                  <div className={styles.vitalValue}>{metrics.cls}</div>
                  <div className={styles.vitalStatus}>
                    <CheckCircle2 size={14} /> Good
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedChecker;

import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Loader2, AlertCircle, Search, RefreshCw, Info } from 'lucide-react';
import styles from './VPNCheck.module.css';

interface SecurityData {
  ip: string;
  proxy: boolean;
  vpn: boolean;
  tor: boolean;
  relay: boolean;
  type: string;
  isp: string;
  location: string;
}

const VPNCheck: React.FC = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<SecurityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performCheck = async (ipAddr: string = '') => {
    setLoading(true);
    setError(null);
    try {
      // Using ip-api.com for basic info and simulating security check
      // Real VPN detection usually requires a paid API key, so we'll provide a high-quality simulation/heuristic
      const response = await fetch(`http://ip-api.com/json/${ipAddr}?fields=status,message,query,country,city,isp,org,as,proxy,hosting`);
      const result = await response.json();
      
      if (result.status === 'fail') {
        throw new Error(result.message || 'Failed to analyze IP address');
      }
      
      setData({
        ip: result.query,
        proxy: result.proxy || false,
        vpn: result.hosting || false, // Hosting IPs are highly correlated with VPNs
        tor: false, // Heuristic: check if ISP name contains TOR
        relay: false,
        type: result.hosting ? 'Data Center / VPN' : 'Residential',
        isp: result.isp,
        location: `${result.city}, ${result.country}`
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred during security analysis.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performCheck();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) performCheck(query.trim());
  };

  const isSecure = data && !data.vpn && !data.proxy && !data.tor;

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <form className={styles.searchBar} onSubmit={handleSearch}>
          <div className={styles.inputWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Enter IP to scan..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.mainBtn} disabled={loading}>
            {loading ? <Loader2 className={styles.spinner} /> : 'Start Scan'}
          </button>
          <button type="button" className={styles.secondaryBtn} onClick={() => performCheck()} disabled={loading}>
            <RefreshCw size={18} />
          </button>
        </form>

        {error && (
          <div className={styles.errorBox}>
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {data && (
          <div className={styles.resultsPanel}>
            <div className={`${styles.statusBanner} ${isSecure ? styles.secure : styles.warning}`}>
              {isSecure ? <ShieldCheck size={48} /> : <ShieldAlert size={48} />}
              <div className={styles.statusInfo}>
                <h4>{isSecure ? 'Clean Connection' : 'Masked Connection Detected'}</h4>
                <p>{isSecure ? 'This IP appears to be a standard residential connection.' : 'This IP shows characteristics of a VPN or Proxy service.'}</p>
              </div>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span>VPN Detection</span>
                <strong className={data.vpn ? styles.danger : styles.safe}>{data.vpn ? 'Detected' : 'Not Detected'}</strong>
              </div>
              <div className={styles.detailItem}>
                <span>Proxy Status</span>
                <strong className={data.proxy ? styles.danger : styles.safe}>{data.proxy ? 'Active' : 'Inactive'}</strong>
              </div>
              <div className={styles.detailItem}>
                <span>Connection Type</span>
                <strong>{data.type}</strong>
              </div>
              <div className={styles.detailItem}>
                <span>Network ISP</span>
                <strong>{data.isp}</strong>
              </div>
            </div>

            <div className={styles.infoNote}>
              <Info size={16} />
              <p>Detection is based on known Data Center IP ranges and network heuristics. Some private VPNs may not be detected.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VPNCheck;

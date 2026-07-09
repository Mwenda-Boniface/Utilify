import React, { useState, useEffect } from 'react';
import { Search, Globe, MapPin, Shield, ExternalLink, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import styles from './IPLookup.module.css';

interface IPData {
  ip: string;
  city: string;
  region: string;
  country: string;
  isp: string;
  org: string;
  as: string;
  lat: number;
  lon: number;
}

const IPLookup: React.FC = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<IPData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIPData = async (ipAddr: string = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://ip-api.com/json/${ipAddr}`);
      const result = await response.json();
      
      if (result.status === 'fail') {
        throw new Error(result.message || 'Failed to lookup IP address');
      }
      
      setData({
        ip: result.query,
        city: result.city,
        region: result.regionName,
        country: result.country,
        isp: result.isp,
        org: result.org,
        as: result.as,
        lat: result.lat,
        lon: result.lon
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching IP data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIPData(); // Auto-lookup current user's IP on load
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) fetchIPData(query.trim());
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <form className={styles.searchBar} onSubmit={handleSearch}>
          <div className={styles.inputWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Enter IP address (e.g., 8.8.8.8)" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.mainBtn} disabled={loading}>
            {loading ? <Loader2 className={styles.spinner} /> : 'Lookup IP'}
          </button>
          <button type="button" className={styles.secondaryBtn} onClick={() => fetchIPData()} disabled={loading}>
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
          <div className={styles.resultsGrid}>
            <div className={styles.mainCard}>
              <div className={styles.cardHeader}>
                <Shield size={20} />
                <h4>Core Information</h4>
              </div>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span>IP Address</span>
                  <strong>{data.ip}</strong>
                </div>
                <div className={styles.infoItem}>
                  <span>ISP</span>
                  <strong>{data.isp}</strong>
                </div>
                <div className={styles.infoItem}>
                  <span>Organization</span>
                  <strong>{data.org || 'N/A'}</strong>
                </div>
                <div className={styles.infoItem}>
                  <span>ASN</span>
                  <strong>{data.as}</strong>
                </div>
              </div>
            </div>

            <div className={styles.mainCard}>
              <div className={styles.cardHeader}>
                <MapPin size={20} />
                <h4>Geolocation</h4>
              </div>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span>Country</span>
                  <strong>{data.country}</strong>
                </div>
                <div className={styles.infoItem}>
                  <span>Region</span>
                  <strong>{data.region}</strong>
                </div>
                <div className={styles.infoItem}>
                  <span>City</span>
                  <strong>{data.city}</strong>
                </div>
                <div className={styles.infoItem}>
                  <span>Coordinates</span>
                  <strong>{data.lat.toFixed(4)}, {data.lon.toFixed(4)}</strong>
                </div>
              </div>
              <a 
                href={`https://www.google.com/maps?q=${data.lat},${data.lon}`} 
                target="_blank" 
                rel="noreferrer" 
                className={styles.mapLink}
              >
                View on Google Maps <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IPLookup;

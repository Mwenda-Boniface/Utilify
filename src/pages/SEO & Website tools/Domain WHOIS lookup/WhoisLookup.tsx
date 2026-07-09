import React, { useState } from 'react';
import { Search, Globe, User, ShieldCheck, Calendar, Info, Loader2, AlertCircle, ExternalLink, Clock } from 'lucide-react';
import styles from './WhoisLookup.module.css';

interface WhoisData {
  domain: string;
  registrar: string;
  created: string;
  expires: string;
  status: string[];
  owner: string;
}

const WhoisLookup: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState<WhoisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupDomain = async () => {
    if (!domain) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const cleanDomain = domain.toLowerCase().trim().replace(/^https?:\/\//, '').split('/')[0];
      const response = await fetch(`https://rdap.org/domain/${cleanDomain}`);
      
      if (!response.ok) throw new Error('Domain not found or API limit reached.');
      
      const resData = await response.json();
      
      // Parse RDAP response
      const created = resData.events?.find((e: any) => e.eventAction === 'registration')?.eventDate || 'N/A';
      const expires = resData.events?.find((e: any) => e.eventAction === 'expiration')?.eventDate || 'N/A';
      const registrar = resData.entities?.find((e: any) => e.roles.includes('registrar'))?.vcardArray?.[1]?.[1]?.[3] || 'N/A';
      
      setData({
        domain: cleanDomain,
        registrar: String(registrar),
        created: created.split('T')[0],
        expires: expires.split('T')[0],
        status: resData.status || [],
        owner: 'Redacted for Privacy'
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch WHOIS data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.searchBar}>
          <div className={styles.inputWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Enter domain name (e.g., example.com)" 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && lookupDomain()}
            />
          </div>
          <button className={styles.mainBtn} onClick={lookupDomain} disabled={loading || !domain}>
            {loading ? <Loader2 className={styles.spinner} /> : 'Lookup Domain'}
          </button>
        </div>

        {error && (
          <div className={styles.errorBox}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {data && (
          <div className={styles.results}>
            <div className={styles.mainCard}>
              <div className={styles.cardHeader}>
                <ShieldCheck size={20} />
                <h4>Domain Information</h4>
                <a href={`https://${data.domain}`} target="_blank" rel="noreferrer" className={styles.domainLink}>
                  {data.domain} <ExternalLink size={14} />
                </a>
              </div>
              
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <div className={styles.label}><User size={14} /> Registrar</div>
                  <div className={styles.value}>{data.registrar}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.label}><Calendar size={14} /> Registered On</div>
                  <div className={styles.value}>{data.created}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.label}><Clock size={14} /> Expires On</div>
                  <div className={styles.value}>{data.expires}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.label}><Info size={14} /> Domain Status</div>
                  <div className={styles.statusList}>
                    {data.status.map((s, i) => (
                      <span key={i} className={styles.badge}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.noticeCard}>
              <Info size={18} />
              <p>
                <strong>Privacy Note:</strong> For many top-level domains, owner information is redacted to comply with GDPR and other privacy regulations. 
                RDAP data is provided by the respective domain registries.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhoisLookup;

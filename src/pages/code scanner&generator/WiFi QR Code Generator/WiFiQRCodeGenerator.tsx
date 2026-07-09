import React, { useState, useMemo } from 'react';
import { Wifi, Lock, Shield, EyeOff } from 'lucide-react';
import BaseQRGenerator from '../../../components/BaseQRGenerator';
import styles from '../../../components/BaseQRGenerator.module.css';

const WiFiQRCodeGenerator: React.FC = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [isHidden, setIsHidden] = useState(false);

  // WiFi Protocol: WIFI:S:<SSID>;T:<WEP|WPA|blank>;P:<PASSWORD>;H:<true|false|blank>;;
  const qrValue = useMemo(() => {
    if (!ssid) return '';
    const enc = encryption === 'None' ? '' : encryption;
    return `WIFI:S:${ssid};T:${enc};P:${password};H:${isHidden};;`;
  }, [ssid, password, encryption, isHidden]);

  return (
    <BaseQRGenerator 
      title="WiFi Auto-Connect Generator" 
      qrValue={qrValue} 
      icon={<Wifi size={20} />}
    >
      <div className={styles.settings}>
        <div className={styles.field}>
          <label><Wifi size={16} /> Network Name (SSID)</label>
          <input 
            type="text"
            className={styles.input}
            placeholder="e.g. MyHomeNetwork"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
          />
        </div>

        <div className={styles.brandingGrid}>
          <div className={styles.field}>
            <label><Shield size={16} /> Encryption</label>
            <select 
              className={styles.input} 
              value={encryption}
              onChange={(e) => setEncryption(e.target.value)}
              style={{ height: '48px' }}
            >
              <option value="WPA">WPA / WPA2 (Standard)</option>
              <option value="WEP">WEP (Old)</option>
              <option value="None">None (Open Network)</option>
            </select>
          </div>

          <div className={styles.field}>
            <label><Lock size={16} /> Password</label>
            <input 
              type="password"
              className={styles.input}
              placeholder="Network secret..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={encryption === 'None'}
            />
          </div>
        </div>

        <div className={styles.field} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <EyeOff size={18} color="var(--text-muted)" />
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>Hidden Network</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Is your router SSID broadcasting off?</p>
            </div>
          </div>
          <input 
            type="checkbox" 
            checked={isHidden}
            onChange={(e) => setIsHidden(e.target.checked)}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
        </div>

        {encryption === 'None' && (
          <p style={{ color: '#ff9800', fontSize: '0.8rem', marginTop: '-0.5rem', fontWeight: 600 }}>
             Warning: Open networks are insecure.
          </p>
        )}
      </div>
    </BaseQRGenerator>
  );
};

export default WiFiQRCodeGenerator;

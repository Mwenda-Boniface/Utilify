import React, { useState, useRef, useMemo } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Shield, Lock, Palette, Image as ImageIcon, Info, Type } from 'lucide-react';
import { encodeSecureQRData } from '../../../utils/crypto';
import styles from './QRCodeGenerator.module.css';

const QRCodeGenerator: React.FC = () => {
  const [data, setData] = useState('');
  const [password, setPassword] = useState('');
  const [isProtected, setIsProtected] = useState(false);
  const [fgColor, setFgColor] = useState('#000000');
  const [logo, setLogo] = useState<string | null>(null);
  
  const qrRef = useRef<HTMLDivElement>(null);

  const qrValue = useMemo(() => {
    if (!data) return 'Utilify';
    return isProtected ? encodeSecureQRData(data, password) : data;
  }, [data, password, isProtected]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `mrbit-qr-${Date.now()}.png`;
      link.href = url;
      link.click();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        {/* Left Side: Settings */}
        <div className={styles.settings}>
          <div className={styles.field}>
            <label><Type size={16} /> Content to Encode</label>
            <textarea 
              className={`${styles.input} styles.textarea`}
              placeholder="Paste a URL, message, or sensitive information here..."
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div className={styles.toggleRow}>
            <div className={styles.field}>
              <label><Shield size={16} /> Password Protection</label>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Encrypt data. Scanner will prompt for a password.
              </p>
            </div>
            <label className={styles.switch}>
              <input 
                type="checkbox" 
                checked={isProtected}
                onChange={(e) => setIsProtected(e.target.checked)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {isProtected && (
            <div className={styles.field} style={{ animation: 'fadeIn 0.3s ease' }}>
              <label><Lock size={16} /> Set Encryption Password</label>
              <input 
                type="password"
                className={styles.input}
                placeholder="Enter secret key..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          <div className={styles.brandingGrid}>
            <div className={styles.field}>
              <label><Palette size={16} /> QR Color</label>
              <input 
                type="color"
                className={`${styles.input} ${styles.colorInput}`}
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label><ImageIcon size={16} /> Logo Overlay</label>
              <input 
                type="file"
                id="logo-upload"
                className={styles.fileInput}
                accept="image/*"
                onChange={handleLogoUpload}
              />
              <label htmlFor="logo-upload" className={styles.fileLabel}>
                {logo ? 'Change Logo' : 'Upload Icon'}
              </label>
            </div>
          </div>

          {logo && (
            <button 
              className={styles.backButton} 
              onClick={() => setLogo(null)}
              style={{ padding: 0, border: 'none', background: 'none' }}
            >
              Remove Logo
            </button>
          )}
        </div>

        {/* Right Side: Preview */}
        <div className={styles.previewArea}>
          <div className={styles.qrWrapper} ref={qrRef}>
            <QRCodeCanvas
              value={qrValue}
              size={280}
              level="H"
              fgColor={fgColor}
              imageSettings={logo ? {
                src: logo,
                height: 50,
                width: 50,
                excavate: true
              } : undefined}
            />
          </div>

          <div className={styles.field} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              {isProtected ? (
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
                  <Shield size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  Secure Payload Active
                </span>
              ) : 'Standard QR Mode'}
            </p>
            <button className={styles.downloadButton} onClick={downloadQR}>
              <Download size={20} />
              Download QR Code
            </button>
          </div>

          <div className={`${styles.field} glass`} style={{ padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <label style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
              <Info size={12} /> Pro Tip
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Protected codes point back to our Secure Scanning Hub. Recipients will need to scan it to be prompted for the secret key.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;

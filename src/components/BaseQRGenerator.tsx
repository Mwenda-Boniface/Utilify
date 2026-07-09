import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Palette, Image as ImageIcon } from 'lucide-react';
import styles from './BaseQRGenerator.module.css';

interface BaseQRGeneratorProps {
  qrValue: string;
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}

const BaseQRGenerator: React.FC<BaseQRGeneratorProps> = ({ 
  qrValue, 
  children, 
  title,
  icon 
}) => {
  const [fgColor, setFgColor] = useState('#000000');
  const [logo, setLogo] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);

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
      {/* Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        {icon}
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{title}</h2>
      </div>

      <div className={styles.editor}>
        {/* Left Side: Specific Inputs + Common Branding */}
        <div className={styles.settings}>
          {children}

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
                id="logo-upload-base"
                className={styles.fileInput}
                accept="image/*"
                onChange={handleLogoUpload}
              />
              <label htmlFor="logo-upload-base" className={styles.fileLabel}>
                {logo ? 'Change Logo' : 'Upload Icon'}
              </label>
            </div>
          </div>

          {logo && (
            <span className={styles.removeLogoLink} onClick={() => setLogo(null)}>
              Remove Logo
            </span>
          )}
        </div>

        {/* Right Side: Shared Preview */}
        <div className={styles.previewArea}>
          <div className={styles.qrWrapper} ref={qrRef}>
            <QRCodeCanvas
              value={qrValue || 'Utilify'}
              size={250}
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

          <div className={styles.field} style={{ width: '100%' }}>
            <button className={styles.downloadButton} onClick={downloadQR}>
              <Download size={20} />
              Download QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseQRGenerator;

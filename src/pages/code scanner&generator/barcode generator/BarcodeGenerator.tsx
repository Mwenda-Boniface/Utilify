import React, { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { Barcode as BarcodeIcon, Download, Settings, Type, Hash } from 'lucide-react';
import styles from './BarcodeGenerator.module.css';

interface BarcodeFormat {
  id: string;
  name: string;
  type: string;
}

const FORMATS: BarcodeFormat[] = [
  { id: 'CODE128', name: 'Code 128 (Standard)', type: 'CODE128' },
  { id: 'EAN13', name: 'EAN-13 (Global Retail)', type: 'EAN13' },
  { id: 'EAN8', name: 'EAN-8 (Small Package)', type: 'EAN8' },
  { id: 'UPC', name: 'UPC-A (US Retail)', type: 'UPC' },
  { id: 'CODE39', name: 'Code 39 (Industrial)', type: 'CODE39' },
  { id: 'ITF14', name: 'ITF-14 (Shipping)', type: 'ITF14' },
];

const BarcodeGenerator: React.FC = () => {
  const [data, setData] = useState('1234567890');
  const [format, setFormat] = useState(FORMATS[0]);
  const [error, setError] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    generateBarcode();
  }, [data, format]);

  const generateBarcode = () => {
    setError(null);
    if (!svgRef.current) return;

    try {
      JsBarcode(svgRef.current, data, {
        format: format.type,
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 18,
        margin: 10,
        background: '#ffffff',
        lineColor: '#000000',
      });
    } catch (e: any) {
      setError('Invalid data for this format');
    }
  };

  const downloadBarcode = () => {
    if (svgRef.current && !error) {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `barcode-${format.id}-${Date.now()}.png`;
        link.href = url;
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <BarcodeIcon size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Barcode Generator</h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.controls}>
          <div className={styles.field}>
            <label><Settings size={16} /> Barcode Format</label>
            <select 
              className={styles.select}
              value={format.id}
              onChange={(e) => setFormat(FORMATS.find(f => f.id === e.target.value) || FORMATS[0])}
            >
              {FORMATS.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label><Type size={16} /> Data to Encode</label>
            <input 
              type="text"
              className={styles.input}
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Enter numeric or alphanumeric data..."
            />
          </div>

          {error && (
            <div className={styles.errorBox}>
              <Hash size={14} />
              <span>{error}</span>
            </div>
          )}

          <div className={`${styles.field} glass`} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', marginTop: '1rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
              <strong>Tip:</strong> EAN and UPC formats require specific lengths (8 or 12/13 digits) and valid check digits. Code 128 is best for general alphanumeric text.
            </p>
          </div>
        </div>

        <div className={styles.previewArea}>
          <div className={styles.barcodeWrapper}>
            <svg ref={svgRef}></svg>
          </div>
          
          <button 
            className={styles.downloadButton} 
            onClick={downloadBarcode}
            disabled={!!error}
          >
            <Download size={20} />
            Download Barcode (PNG)
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeGenerator;

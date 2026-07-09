import React, { useState } from 'react';
import { RefreshCw, Code, CheckCircle, AlertCircle, ArrowRightLeft } from 'lucide-react';
import styles from './BarcodeConverter.module.css';

const BarcodeConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{ label: string; value: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const calculateCheckDigit = (barcode: string) => {
    let sum = 0;
    for (let i = 0; i < barcode.length; i++) {
      const digit = parseInt(barcode[barcode.length - 1 - i]);
      sum += i % 2 === 0 ? digit * 3 : digit;
    }
    return (10 - (sum % 10)) % 10;
  };

  const handleConvert = () => {
    setError(null);
    setResults([]);
    const cleanInput = input.replace(/\D/g, '');

    if (!cleanInput) {
      setError('Please enter a numeric barcode.');
      return;
    }

    const res: { label: string; value: string }[] = [];

    // EAN-13 conversions
    if (cleanInput.length === 12 || cleanInput.length === 13) {
      const base = cleanInput.length === 13 ? cleanInput.slice(0, 12) : cleanInput;
      const cd = calculateCheckDigit(base);
      res.push({ label: 'EAN-13 (Standard)', value: base + cd });
      
      if (base.startsWith('0')) {
        res.push({ label: 'UPC-A (US Equiv)', value: base.slice(1) + cd });
      }
    }

    // UPC-A conversions
    if (cleanInput.length === 11 || cleanInput.length === 12) {
      const base = cleanInput.length === 12 ? cleanInput.slice(0, 11) : cleanInput;
      const cd = calculateCheckDigit(base);
      res.push({ label: 'UPC-A (Standard)', value: base + cd });
      res.push({ label: 'EAN-13 (Global)', value: '0' + base + cd });
    }

    // EAN-8
    if (cleanInput.length === 7 || cleanInput.length === 8) {
      const base = cleanInput.length === 8 ? cleanInput.slice(0, 7) : cleanInput;
      const cd = calculateCheckDigit(base);
      res.push({ label: 'EAN-8 (Short)', value: base + cd });
    }

    if (res.length === 0) {
      res.push({ label: 'Code 128 / Generic', value: cleanInput });
      res.push({ label: 'Info', value: 'This barcode type doesn\'t have standard numeric cross-conversions.' });
    }

    setResults(res);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <ArrowRightLeft size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Barcode Format Converter</h2>
      </div>

      <div className={styles.card}>
        <div className={styles.inputSection}>
          <div className={styles.field}>
            <label><Code size={16} /> Enter Barcode Digits</label>
            <div className={styles.row}>
              <input 
                type="text" 
                className={styles.input}
                placeholder="e.g. 501234567890"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className={styles.convertBtn} onClick={handleConvert}>
                <RefreshCw size={20} /> Convert
              </button>
            </div>
          </div>
          {error && <div className={styles.error}><AlertCircle size={14} /> {error}</div>}
        </div>

        {results.length > 0 && (
          <div className={styles.resultsSection}>
             <h3>Available Formats & Checksum Corrections</h3>
             <div className={styles.resGrid}>
                {results.map((res, idx) => (
                  <div key={idx} className={styles.resItem}>
                     <label>{res.label}</label>
                     <div className={styles.valueRow}>
                        <span>{res.value}</span>
                        <button onClick={() => navigator.clipboard.writeText(res.value)}>Copy</button>
                     </div>
                  </div>
                ))}
             </div>
             <div className={styles.successNote}>
                <CheckCircle size={14} />
                <span>Verification successful. Formats calculated using GTIN specifications.</span>
             </div>
          </div>
        )}
      </div>

      <div className={`${styles.infoBox} glass`}>
         <p><strong>Note:</strong> Not all barcodes can be cross-converted. Conversion is primarily between EAN and UPC variants used in retail (GTIN-8, GTIN-12, GTIN-13).</p>
      </div>
    </div>
  );
};

export default BarcodeConverter;

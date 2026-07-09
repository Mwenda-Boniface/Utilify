import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { QRCodeCanvas } from 'qrcode.react';
import { Table, Upload, Download, Trash2, FileText, CheckCircle } from 'lucide-react';
import styles from './BulkQRGenerator.module.css';

interface BulkItem {
  id: string;
  data: string;
  label?: string;
}

const BulkQRGenerator: React.FC = () => {
  const [items, setItems] = useState<BulkItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const newItems: BulkItem[] = results.data.map((row: any, index: number) => ({
          id: Math.random().toString(36).substr(2, 9),
          data: row[0] || '',
          label: row[1] || `Item ${index + 1}`
        })).filter((item: BulkItem) => item.data.length > 0);

        setItems(newItems);
        setIsProcessing(false);
      },
      error: () => {
        setError('Failed to parse CSV file. Please ensure it is a valid format.');
        setIsProcessing(false);
      }
    });
  };

  const downloadAll = () => {
    // In a real app we might use JSZip, but here we can trigger multiple downloads 
    // or provide a "Print Report" view. 
    // For now, let's allow downloading individual ones or instructions.
    alert('For bulk downloads, use the "Print" feature (Ctrl+P) to save all codes as a PDF report, or download individual items.');
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <Table size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Bulk QR Generator (CSV)</h2>
      </div>

      {!items.length ? (
        <div className={styles.uploadArea} onClick={() => fileInputRef.current?.click()}>
          <Upload size={48} color="var(--primary)" />
          <h3>Upload Your CSV Data</h3>
          <p>Column 1: QR Content | Column 2: Label (Optional)</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept=".csv"
            onChange={handleFileUpload}
          />
          {isProcessing && <div className={styles.loader}>Parsing Data...</div>}
        </div>
      ) : (
        <div className={styles.resultsHeader}>
          <div className={styles.stats}>
            <CheckCircle size={18} color="#00C853" />
            <span>{items.length} Codes Generated</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.secondaryBtn} onClick={() => setItems([])}>
              <Trash2 size={16} /> Reset
            </button>
            <button className={styles.primaryBtn} onClick={downloadAll}>
              <Download size={16} /> Export Options
            </button>
          </div>
        </div>
      )}

      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={styles.grid}>
        {items.map(item => (
          <div key={item.id} className={`${styles.itemCard} glass`}>
            <div className={styles.qrBox}>
              <QRCodeCanvas value={item.data} size={150} level="M" />
            </div>
            <div className={styles.itemInfo}>
              <strong>{item.label}</strong>
              <p>{item.data}</p>
            </div>
            <button className={styles.deleteBtn} onClick={() => removeItem(item.id)}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className={`${styles.proTip} glass`}>
          <FileText size={16} />
          <p>You can generate thousands of codes instantly. High-volume business cards, inventory tags, and more.</p>
        </div>
      )}
    </div>
  );
};

export default BulkQRGenerator;

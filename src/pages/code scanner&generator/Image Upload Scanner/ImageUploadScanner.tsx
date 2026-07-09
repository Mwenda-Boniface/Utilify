import React, { useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Upload, FileSearch, Copy, AlertCircle, Trash2 } from 'lucide-react';
import { saveScanToHistory } from '../../../utils/history';
import { playSuccessSound, playErrorSound } from '../../../utils/audio';
import styles from './ImageUploadScanner.module.css';

interface ScanResult {
  id: string;
  text: string;
  timestamp: Date;
}

const ImageUploadScanner: React.FC = () => {
  const [results, setResults] = useState<ScanResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    await processFiles(Array.from(files));
  };

  const processFiles = async (files: File[]) => {
    setError(null);
    const scanner = new Html5Qrcode('qr-reader-hidden');
    
    for (const file of files) {
      try {
        const decodedText = await scanner.scanFile(file, true);
        const newResult: ScanResult = {
          id: Math.random().toString(36).substr(2, 9),
          text: decodedText,
          timestamp: new Date()
        };
        
        setResults(prev => [newResult, ...prev]);
        saveScanToHistory(decodedText, false);
        playSuccessSound();
      } catch (err) {
        console.error('Scan error:', err);
        setError('Some files could not be read. Ensure they contain a clear QR code.');
        playErrorSound();
      }
    }
    
    // Clear input so same file can be uploaded again
    if (fileInputRef.current) fileInputRef.current.value = '';
    scanner.clear();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const removeResult = (id: string) => {
    setResults(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <FileSearch size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Image Upload Scanner</h2>
      </div>

      {/* Main Upload Zone */}
      <div 
        className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const files = Array.from(e.dataTransfer.files);
          processFiles(files);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={48} className={styles.uploadIcon} />
        <h3>Click to Upload or Drag & Drop</h3>
        <p>Supports Batch Scanning (Select multiple files at once)</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*" 
          multiple
          onChange={handleFileUpload}
        />
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Results List */}
      {results.length > 0 && (
        <div className={styles.resultsList}>
          <div className={styles.listHeader}>
            <span>Scanned Results ({results.length})</span>
            <button className={styles.clearAll} onClick={() => setResults([])}>Clear All</button>
          </div>
          
          {results.map(result => (
            <div key={result.id} className={`${styles.resultCard} glass`}>
              <div className={styles.resultInfo}>
                <p className={styles.resultText}>{result.text}</p>
                <span className={styles.resultTime}>{result.timestamp.toLocaleTimeString()}</span>
              </div>
              <div className={styles.resultActions}>
                <button onClick={() => copyToClipboard(result.text)} title="Copy Content">
                  <Copy size={18} />
                </button>
                <button onClick={() => removeResult(result.id)} className={styles.deleteAction} title="Remove">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hidden scanner canvas */}
      <div id="qr-reader-hidden" style={{ display: 'none' }}></div>
    </div>
  );
};

export default ImageUploadScanner;

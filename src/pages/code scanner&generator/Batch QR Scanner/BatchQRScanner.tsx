import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Layers, Play, Pause, Trash2, Download, CheckCircle, Copy, Hash } from 'lucide-react';
import { saveScanToHistory } from '../../../utils/history';
import { playSuccessSound } from '../../../utils/audio';
import styles from './BatchQRScanner.module.css';

interface ScannedItem {
  id: string;
  data: string;
  timestamp: Date;
  count: number;
}

const BatchQRScanner: React.FC = () => {
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const lastScannedRef = useRef<string | null>(null);

  useEffect(() => {
    if (isScanning) {
      startScanning();
    } else {
      stopScanning();
    }
    return () => {
      stopScanning();
    };
  }, [isScanning]);

  const startScanning = async () => {
    setError(null);
    const scanner = new Html5Qrcode('batch-reader');
    scannerRef.current = scanner;

    try {
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (text) => {
          // Debounce same scan to prevent rapid duplicates in list
          if (text !== lastScannedRef.current) {
            handleNewScan(text);
            lastScannedRef.current = text;
            setTimeout(() => { lastScannedRef.current = null; }, 2000);
          }
        },
        () => {}
      );
    } catch (err) {
      setError('Camera access denied.');
      setIsScanning(false);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      if (scannerRef.current.isScanning) await scannerRef.current.stop();
      scannerRef.current = null;
    }
  };

  const handleNewScan = (text: string) => {
    playSuccessSound();
    setScannedItems(prev => {
      const existing = prev.find(item => item.data === text);
      if (existing) {
        return prev.map(item => 
          item.data === text ? { ...item, count: item.count + 1, timestamp: new Date() } : item
        );
      }
      return [{
        id: Math.random().toString(36).substr(2, 9),
        data: text,
        timestamp: new Date(),
        count: 1
      }, ...prev];
    });
    saveScanToHistory(text, false);
  };

  const exportResults = () => {
    const csv = 'Data,Scan Count,Last Seen\n' + 
      scannedItems.map(i => `"${i.data}",${i.count},"${i.timestamp.toLocaleString()}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-scan-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <Layers size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Batch QR Scanner (Inventory Mode)</h2>
      </div>

      <div className={styles.mainLayout}>
        {/* Scanner Side */}
        <div className={styles.scannerPane}>
          <div className={styles.display}>
            <div id="batch-reader" className={styles.reader}>
              {!isScanning && (
                <div className={styles.placeholder}>
                   <Play size={48} />
                   <p>Click Start to begin batch scanning</p>
                </div>
              )}
            </div>
            {error && <div className={styles.error}>{error}</div>}
          </div>

          <div className={styles.controls}>
            <button 
              className={`${styles.toggleBtn} ${isScanning ? styles.stopBtn : styles.startBtn}`}
              onClick={() => setIsScanning(!isScanning)}
            >
              {isScanning ? <Pause size={20} /> : <Play size={20} />}
              {isScanning ? 'Pause Scanner' : 'Start Scanning'}
            </button>
            
            {scannedItems.length > 0 && (
              <button className={styles.exportBtn} onClick={exportResults}>
                <Download size={20} /> Export CSV
              </button>
            )}
          </div>
        </div>

        {/* List Side */}
        <div className={styles.listPane}>
          <div className={styles.listHeader}>
            <span>Session Scans ({scannedItems.length})</span>
            <button onClick={() => setScannedItems([])} title="Clear Session">
              <Trash2 size={16} />
            </button>
          </div>

          <div className={styles.scrollList}>
            {scannedItems.length > 0 ? (
              scannedItems.map(item => (
                <div key={item.id} className={`${styles.listItem} glass`}>
                   <div className={styles.itemInfo}>
                      <span className={styles.itemData}>{item.data}</span>
                      <span className={styles.itemTime}>{item.timestamp.toLocaleTimeString()}</span>
                   </div>
                   <div className={styles.badgeRow}>
                      <div className={styles.countBadge} title="Scan Count">
                         <Hash size={12} /> {item.count}
                      </div>
                      <button className={styles.copyBtn} onClick={() => navigator.clipboard.writeText(item.data)}>
                         <Copy size={14} />
                      </button>
                   </div>
                </div>
              ))
            ) : (
              <div className={styles.empty}>
                <CheckCircle size={32} />
                <p>No items scanned in this session.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchQRScanner;

import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { Barcode as BarcodeIcon, Copy, RefreshCw, AlertCircle, History } from 'lucide-react';
import { saveScanToHistory } from '../../../utils/history';
import { playSuccessSound } from '../../../utils/audio';
import styles from './BarcodeScanner.module.css';

const BarcodeScanner: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (isScanning) {
      startScanner();
    } else {
      stopScanner();
    }
    return () => {
      stopScanner();
    };
  }, [isScanning]);

  const startScanner = async () => {
    setError(null);
    const scanner = new Html5Qrcode('barcode-reader');
    scannerRef.current = scanner;

    try {
      await scanner.start(
        { facingMode: 'environment' },
        { 
          fps: 10, 
          // Wide and thin for barcodes
          qrbox: { width: 300, height: 150 },
          aspectRatio: 1.0,
          // Barcode only hints (where supported by underlying engine)
        },
        (decodedText) => {
          handleSuccess(decodedText);
        },
        () => {} // Ignored errors
      );
    } catch (err) {
      setError('Camera access failed. Please check permissions.');
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      if (scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING) {
        await scannerRef.current.stop();
      }
      scannerRef.current = null;
    }
  };

  const handleSuccess = (text: string) => {
    playSuccessSound();
    setResult(text);
    setIsScanning(false);
    saveScanToHistory(text, false);
  };

  const resetScanner = () => {
    setResult(null);
    setError(null);
    setIsScanning(true);
  };

  const copyToClipboard = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <BarcodeIcon size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Advanced Barcode Scanner</h2>
      </div>

      <div className={styles.scannerBox}>
        {isScanning ? (
          <div id="barcode-reader" className={styles.reader}></div>
        ) : (
          <div className={styles.resultView}>
            {result ? (
              <div className={styles.resultContent}>
                <div className={styles.iconCircle}>
                  <BarcodeIcon size={32} />
                </div>
                <h3>Standard 1D Barcode Detected</h3>
                <div className={styles.dataBox}>{result}</div>
                <div className={styles.actions}>
                  <button className={styles.primaryBtn} onClick={copyToClipboard}>
                    <Copy size={18} /> Copy Data
                  </button>
                  <button className={styles.secondaryBtn} onClick={resetScanner}>
                    <RefreshCw size={18} /> Scan Next
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.errorState}>
                <AlertCircle size={48} color="#ff4444" />
                <p>{error || 'Scanner Paused'}</p>
                <button className={styles.primaryBtn} onClick={resetScanner}>
                  Restart Camera
                </button>
              </div>
            )}
          </div>
        )}

        {isScanning && (
          <div className={styles.overlay}>
             <div className={styles.targetFrame} />
             <p className={styles.hintText}>Center the barcode in the frame</p>
          </div>
        )}
      </div>

      <div className={`${styles.infoCard} glass`}>
        <History size={18} />
        <p>All scans are automatically saved to your <strong>Local History Hub</strong> for later access.</p>
      </div>
    </div>
  );
};

export default BarcodeScanner;

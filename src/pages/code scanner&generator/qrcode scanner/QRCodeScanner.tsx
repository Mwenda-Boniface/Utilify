import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { 
  Camera, Upload, Lock, Shield, Copy, ExternalLink, 
  RefreshCw, CheckCircle, AlertCircle
} from 'lucide-react';
import { decryptData } from '../../../utils/crypto';
import { saveScanToHistory } from '../../../utils/history';
import { playSuccessSound, playErrorSound } from '../../../utils/audio';
import styles from './QRCodeScanner.module.css';

interface ScanResult {
  text: string;
  isEncrypted: boolean;
  timestamp: Date;
}

const QRCodeScanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'camera' | 'file'>('camera');
  const [scannedResult, setScannedResult] = useState<ScanResult | null>(null);
  const [rawPayload, setRawPayload] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isPrompting, setIsPrompting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const init = async () => {
      if (activeTab === 'camera') {
        await startCamera();
      } else {
        await stopCamera();
      }
    };
    init();
    return () => {
      stopCamera();
    };
  }, [activeTab]);

  const startCamera = async () => {
    const scanner = new Html5Qrcode('qr-reader');
    scannerRef.current = scanner;
    
    try {
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        handleScanSuccess,
        () => {} // Ignored errors
      );
      // Camera started successfully
    } catch (err) {
      console.error('Camera access denied:', err);
      setError('Camera access denied. Please check permissions.');
    }
  };

  const stopCamera = async () => {
    if (scannerRef.current) {
      if (scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING) {
        await scannerRef.current.stop();
      }
      scannerRef.current = null;
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    console.log('Scanned:', decodedText);
    
    // Check for Secure QR protocol (URL fragment with /decrypt#)
    if (decodedText.includes('/decrypt#')) {
      const ciphertext = decodedText.split('#')[1];
      if (ciphertext) {
        setRawPayload(decodeURIComponent(ciphertext));
        setIsPrompting(true);
        stopCamera();
        return;
      }
    }

    // Standard Payload
    finalizeResult(decodedText, false);
    stopCamera();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const scanner = new Html5Qrcode('qr-reader-file');
    try {
      const result = await scanner.scanFile(file, true);
      handleScanSuccess(result);
    } catch (err) {
      console.error('File scan error:', err);
      playErrorSound();
      setError('No QR code found in this image.');
    } finally {
      scanner.clear();
    }
  };

  const handleDecrypt = () => {
    if (!rawPayload) return;

    const decrypted = decryptData(rawPayload, password);
    if (decrypted) {
      playSuccessSound();
      finalizeResult(decrypted, true);
      setIsPrompting(false);
      setRawPayload(null);
      setPassword('');
    } else {
      playErrorSound();
      setError('Incorrect password. Please try again.');
    }
  };

  const finalizeResult = (text: string, isEncrypted: boolean) => {
    setScannedResult({
      text,
      isEncrypted,
      timestamp: new Date()
    });
    saveScanToHistory(text, isEncrypted);
    if (!isEncrypted) playSuccessSound();
  };

  const copyToClipboard = () => {
    if (scannedResult) {
      navigator.clipboard.writeText(scannedResult.text);
    }
  };

  const resetScanner = () => {
    setScannedResult(null);
    setError(null);
    setIsPrompting(false);
    setRawPayload(null);
    if (activeTab === 'camera') startCamera();
  };

  return (
    <div className={styles.container}>
      {/* Search/Scanner Trigger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <Camera size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>QR & Barcode Scanner</h2>
      </div>

      {/* Tab Switcher */}
      {!scannedResult && !isPrompting && (

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button 
            className={`${styles.actionButton} ${activeTab === 'camera' ? styles.primaryAction : ''}`}
            onClick={() => setActiveTab('camera')}
          >
            <Camera size={18} /> Camera
          </button>
          <button 
            className={`${styles.actionButton} ${activeTab === 'file' ? styles.primaryAction : ''}`}
            onClick={() => setActiveTab('file')}
          >
            <Upload size={18} /> Upload Image
          </button>
        </div>
      )}

      {/* Main Scanning View */}
      {!scannedResult && !isPrompting && (
        <div className={styles.scannerBox}>
          {activeTab === 'camera' ? (
            <div id="qr-reader" className={styles.reader}></div>
          ) : (
            <div className={styles.fileScanner} onClick={() => fileInputRef.current?.click()}>
              <Upload size={48} className={styles.icon} />
              <p>Click to upload or drag & drop a QR image</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={handleFileUpload}
              />
              <div id="qr-reader-file" style={{ display: 'none' }}></div>
            </div>
          )}
          {error && (
            <div style={{ color: '#ff4444', textAlign: 'center', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}
        </div>
      )}

      {/* Password Prompt Overlay */}
      {isPrompting && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div className={styles.iconWrapper} style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '50%' }}>
                <Lock size={32} />
              </div>
              <h3>Secure Content</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>
              This QR code is password protected. Enter the secret key to reveal the content.
            </p>
            <div className={styles.inputField}>
              <input 
                type="password"
                className={styles.input}
                placeholder="••••••••"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDecrypt()}
              />
              {error && <p style={{ color: '#ff4444', fontSize: '0.8rem' }}>{error}</p>}
            </div>
            <button className={styles.decryptButton} onClick={handleDecrypt}>
              Decrypt Payload
            </button>
            <button 
              className={styles.actionButton} 
              onClick={() => { setIsPrompting(false); setRawPayload(null); setError(null); }}
              style={{ border: 'none' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Result Display */}
      {scannedResult && (
        <div className={styles.resultCard}>
          <div className={styles.modalHeader} style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {scannedResult.isEncrypted ? <Shield size={24} color="var(--primary)" /> : <CheckCircle size={24} color="#00C853" />}
              <h3 style={{ margin: 0 }}>Scan Result</h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {scannedResult.timestamp.toLocaleTimeString()}
            </span>
          </div>

          <div className={styles.resultText}>
            {scannedResult.text}
          </div>

          <div className={styles.actionBar}>
            <button className={`${styles.actionButton} ${styles.primaryAction}`} onClick={copyToClipboard}>
              <Copy size={18} /> Copy
            </button>
            {scannedResult.text.startsWith('http') && (
              <a 
                href={scannedResult.text} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.actionButton}
              >
                <ExternalLink size={18} /> Open
              </a>
            )}
            <button className={styles.actionButton} onClick={resetScanner}>
              <RefreshCw size={18} /> Scan Again
            </button>
          </div>

          {scannedResult.isEncrypted && (
            <p style={{ fontSize: '0.8rem', color: 'var(--primary)', textAlign: 'center', fontWeight: 600 }}>
              <Lock size={12} style={{ marginRight: '4px' }} />
              Decrypted via Secure Utilify Protocol
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;

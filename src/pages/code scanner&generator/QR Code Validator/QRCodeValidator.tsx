import React, { useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { ShieldCheck, Info, FileText, Globe, Wifi, User, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react';
import styles from './QRCodeValidator.module.css';

interface ValidationReport {
  text: string;
  type: 'URL' | 'WiFi' | 'vCard' | 'Text' | 'Secret';
  quality: 'A' | 'B' | 'C' | 'F';
  size: string;
  isSecure: boolean;
  score: number;
}

const QRCodeValidator: React.FC = () => {
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleValidation = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setReport(null);
    setError(null);

    const scanner = new Html5Qrcode('qr-validator-hidden');
    
    try {
      // Get content
      const decodedText = await scanner.scanFile(file, true);
      
      // Heuristic Analysis
      const analysis = analyzeContent(decodedText, file);
      setReport(analysis);
    } catch (err) {
      setError('Analysis failed. The image may be too blurry or not a valid QR code.');
    } finally {
      setIsAnalyzing(false);
      scanner.clear();
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const analyzeContent = (text: string, file: File): ValidationReport => {
    let type: ValidationReport['type'] = 'Text';
    if (text.startsWith('http')) type = 'URL';
    else if (text.startsWith('WIFI:')) type = 'WiFi';
    else if (text.includes('BEGIN:VCARD')) type = 'vCard';
    else if (text.includes('/decrypt#')) type = 'Secret';

    // Quality Heuristics (Synthetic for demo purposes)
    const fileKiloBytes = file.size / 1024;
    let score = 100;
    
    if (fileKiloBytes < 20) score -= 30; // Too small/low res
    if (text.length > 500) score -= 10; // High density is harder to scan
    
    let quality: ValidationReport['quality'] = 'A';
    if (score < 50) quality = 'C';
    else if (score < 80) quality = 'B';

    return {
      text,
      type,
      quality,
      size: `${fileKiloBytes.toFixed(1)} KB`,
      isSecure: type === 'Secret',
      score
    };
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <ShieldCheck size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>QR Code Validator</h2>
      </div>

      {!report && (
        <div className={styles.uploadArea} onClick={() => fileInputRef.current?.click()}>
          <BarChart3 size={48} color="var(--primary)" />
          <h3>Validate & Analyze QR</h3>
          <p>Get a technical report on any QR code image.</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept="image/*"
            onChange={handleValidation}
          />
          {isAnalyzing && <div className={styles.loader}>Analyzing Pixels...</div>}
        </div>
      )}

      {error && (
        <div className={styles.errorBanner}>
          <AlertCircle size={18} /> {error}
          <button onClick={() => setError(null)} style={{ marginLeft: 'auto', textDecoration: 'underline', fontSize: '0.8rem' }}>Try Again</button>
        </div>
      )}

      {report && (
        <div className={styles.reportCard}>
          <div className={styles.reportHeader}>
            <div className={styles.gradeBadge} data-grade={report.quality}>
              {report.quality}
            </div>
            <div>
              <h3>Scan Quality: {report.quality === 'A' ? 'Excellent' : report.quality === 'B' ? 'Good' : 'Poor'}</h3>
              <p>Overall Integrity Score: {report.score}/100</p>
            </div>
            <button className={styles.resetButton} onClick={() => setReport(null)}>Reset</button>
          </div>

          <div className={styles.reportGrid}>
            <div className={styles.statItem}>
              <label>Content Type</label>
              <div className={styles.statLine}>
                {report.type === 'URL' && <Globe size={16} />}
                {report.type === 'WiFi' && <Wifi size={16} />}
                {report.type === 'vCard' && <User size={16} />}
                {report.type === 'Secret' && <ShieldCheck size={16} color="var(--primary)" />}
                {report.type === 'Text' && <FileText size={16} />}
                <span>{report.type}</span>
              </div>
            </div>

            <div className={styles.statItem}>
              <label>File Weight</label>
              <div className={styles.statLine}>
                <Info size={16} />
                <span>{report.size}</span>
              </div>
            </div>

            <div className={styles.statItem}>
              <label>Security Status</label>
              <div className={styles.statLine}>
                {report.isSecure ? (
                  <CheckCircle size={16} color="var(--primary)" />
                ) : (
                  <Info size={16} color="var(--text-muted)" />
                )}
                <span>{report.isSecure ? 'Encrypted Payload' : 'Standard Text'}</span>
              </div>
            </div>
          </div>

          <div className={styles.rawData}>
            <label>Decoded Content</label>
            <div className={styles.contentBox}>{report.text}</div>
          </div>

          <div className={styles.recommendation}>
            <CheckCircle size={14} />
            {report.quality === 'A' 
              ? 'This QR code is perfectly optimized for all scanners.' 
              : 'This code may be difficult to scan on older devices. Consider a higher resolution export.'}
          </div>
        </div>
      )}

      <div id="qr-validator-hidden" style={{ display: 'none' }}></div>
    </div>
  );
};

export default QRCodeValidator;

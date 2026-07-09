import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import { FileText, Upload, Download, Loader2, Check, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import styles from './WordToPDF.module.css';

const WordToPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>('');

  // Clean up Blob URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.docx')) {
      setFile(selectedFile);
      setError(null);
      setStep(2);
    } else {
      setError('Please select a valid Microsoft Word (.docx) file');
    }
  };

  const convertToPDF = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      const doc = new jsPDF();
      
      // Local conversion for better performance and privacy
      const plainText = await mammoth.extractRawText({ arrayBuffer });
      const splitText = doc.splitTextToSize(plainText.value, 180);
      doc.text(splitText, 15, 20);
      
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setDownloadName(`${file.name.replace('.docx', '')}.pdf`);
      setStep(3);
    } catch (err) {
      console.error(err);
      setError('Failed to convert document. Make sure it is a valid .docx file.');
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    setFile(null);
    setDownloadUrl(null);
    setDownloadName('');
    setStep(1);
  };

  return (
    <div className={styles.container}>
      {/* Procedural Step Progress Bar */}
      <div className={styles.stepsBar}>
        <div className={`${styles.stepIndicator} ${step >= 1 ? styles.stepActive : ''}`}>
          <div className={styles.stepNum}>{step > 1 ? <Check size={14} /> : '1'}</div>
          <span className={styles.stepLabel}>Upload</span>
        </div>
        <div className={`${styles.stepConnector} ${step >= 2 ? styles.stepConnectorActive : ''}`} />
        <div className={`${styles.stepIndicator} ${step >= 2 ? styles.stepActive : ''}`}>
          <div className={styles.stepNum}>{step > 2 ? <Check size={14} /> : '2'}</div>
          <span className={styles.stepLabel}>Convert</span>
        </div>
        <div className={`${styles.stepConnector} ${step >= 3 ? styles.stepConnectorActive : ''}`} />
        <div className={`${styles.stepIndicator} ${step >= 3 ? styles.stepActive : ''}`}>
          <div className={styles.stepNum}>3</div>
          <span className={styles.stepLabel}>Download</span>
        </div>
      </div>

      <div className={styles.workspace}>
        {/* Step 1: Upload */}
        {step === 1 && (
          <div className={styles.stepContainer}>
            <label className={styles.dropZone}>
              <input type="file" hidden accept=".docx" onChange={handleFileChange} />
              <div className={styles.uploadPrompt}>
                <Upload size={48} className={styles.uploadIcon} />
                <p>Click or drag .docx file here to upload</p>
                <span>Supports Microsoft Word Documents</span>
              </div>
            </label>
            {error && (
              <div className={styles.errorMsg}>
                <AlertCircle size={18} />
                {error}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Convert */}
        {step === 2 && file && (
          <div className={styles.stepContainer}>
            <div className={styles.fileDetailsCard}>
              <FileText size={40} className={styles.fileDetailsIcon} />
              <div className={styles.fileDetailsInfo}>
                <p className={styles.fileName}>{file.name}</p>
                <span className={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
              </div>
            </div>

            {error && (
              <div className={styles.errorMsg}>
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className={styles.actions}>
              <button 
                className={styles.mainBtn} 
                disabled={processing}
                onClick={convertToPDF}
              >
                {processing ? <Loader2 className={styles.spinner} size={20} /> : <ArrowRight size={20} />}
                {processing ? 'Converting file...' : 'Convert to PDF'}
              </button>
              <button className={styles.secondaryBtn} onClick={handleReset} disabled={processing}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Download */}
        {step === 3 && downloadUrl && (
          <div className={styles.stepContainer}>
            <div className={styles.successCard}>
              <div className={styles.successIconWrapper}>
                <Check size={36} />
              </div>
              <h3>Conversion Successful!</h3>
              <p>Your document is ready for download.</p>
            </div>

            <div className={styles.actions}>
              <a 
                href={downloadUrl} 
                download={downloadName} 
                className={styles.downloadLink}
              >
                <Download size={20} /> Download PDF
              </a>
              <button className={styles.secondaryBtn} onClick={handleReset}>
                <RefreshCw size={16} /> Convert Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordToPDF;

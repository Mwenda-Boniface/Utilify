import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Upload, RefreshCw, Copy, Check, Trash2, Loader2 } from 'lucide-react';
import styles from './OCRTool.module.css';

const OCRTool: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      setText('');
      setProgress(0);
    }
  };

  const performOCR = async () => {
    if (!image) return;
    setLoading(true);
    setProgress(0);

    try {
      const worker = await createWorker('eng', 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });
      const { data: { text } } = await worker.recognize(image);
      setText(text);
      await worker.terminate();
    } catch (error) {
      console.error('OCR Error:', error);
      setText('Error extracting text. Please try a clearer image.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>

      <div className={styles.grid}>
        <div className={styles.uploadSection}>
          <label className={styles.dropZone}>
            <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
            {image ? (
              <img src={image} alt="Preview" className={styles.preview} />
            ) : (
              <div className={styles.uploadPrompt}>
                <Upload size={48} />
                <p>Click or drag image to upload</p>
                <span>Supports JPG, PNG, WEBP</span>
              </div>
            )}
          </label>

          {image && (
            <div className={styles.controls}>
              <button 
                className={styles.primaryButton} 
                onClick={performOCR} 
                disabled={loading}
              >
                {loading ? <Loader2 className={styles.spinner} /> : <RefreshCw size={18} />}
                {loading ? `Processing ${progress}%` : 'Extract Text'}
              </button>
              <button className={styles.ghostButton} onClick={() => setImage(null)}>
                <Trash2 size={18} />
                Clear
              </button>
            </div>
          )}
        </div>

        <div className={styles.outputSection}>
          <div className={styles.outputHeader}>
            <label className={styles.label}>Extracted Text</label>
            {text && (
              <button className={styles.copyButton} onClick={handleCopy}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <div className={styles.textOutput}>
            {text || <span className={styles.placeholder}>Text will appear here...</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OCRTool;

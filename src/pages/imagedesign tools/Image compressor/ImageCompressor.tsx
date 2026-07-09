import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Download, RefreshCw, Layers, Upload } from 'lucide-react';
import styles from './ImageCompressor.module.css';

const ImageCompressor: React.FC = () => {
  const [original, setOriginal] = useState<File | null>(null);
  const [compressed, setCompressed] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1920);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOriginal(e.target.files[0]);
      setCompressed(null);
    }
  };

  const compressImage = async () => {
    if (!original) return;
    setLoading(true);
    try {
      const options = {
        maxSizeMB: quality * 2, // Heuristic
        maxWidthOrHeight: maxWidth,
        useWebWorker: true,
      };
      const result = await imageCompression(original, options);
      setCompressed(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!compressed) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(compressed);
    link.download = `compressed_${original?.name}`;
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.uploadSection}>
          {!original ? (
            <label className={styles.dropzone}>
              <Upload size={48} />
              <p>Click to upload image (JPG, PNG, WEBP)</p>
              <input type="file" accept="image/*" onChange={handleUpload} hidden />
            </label>
          ) : (
            <div className={styles.previewGrid}>
              <div className={styles.previewCard}>
                <span>Original</span>
                <img src={URL.createObjectURL(original)} alt="Original" />
                <div className={styles.stats}>
                  {(original.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
              {compressed && (
                <div className={styles.previewCard}>
                  <span>Compressed</span>
                  <img src={URL.createObjectURL(compressed)} alt="Compressed" />
                  <div className={styles.stats}>
                    {(compressed.size / 1024 / 1024).toFixed(2)} MB
                    <span className={styles.reduction}>
                      -{Math.round((1 - compressed.size / original.size) * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.controls}>
          <div className={styles.setting}>
            <label>Quality (0.1 - 1.0): {quality}</label>
            <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} />
          </div>
          <div className={styles.setting}>
            <label>Max Width: {maxWidth}px</label>
            <input type="range" min="400" max="3840" step="100" value={maxWidth} onChange={(e) => setMaxWidth(parseInt(e.target.value))} />
          </div>
          <div className={styles.actions}>
            <button className={styles.compressBtn} onClick={compressImage} disabled={!original || loading}>
              {loading ? <RefreshCw className={styles.spinner} /> : 'Compress Now'}
            </button>
            {compressed && (
              <button className={styles.downloadBtn} onClick={download}>
                <Download size={18} /> Download
              </button>
            )}
            {original && (
              <button className={styles.resetBtn} onClick={() => { setOriginal(null); setCompressed(null); }}>Reset</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;

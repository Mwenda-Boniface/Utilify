import React, { useState, useRef } from 'react';
import { Download, Upload, FileCode, Image as ImageIcon } from 'lucide-react';
import styles from './FaviconGenerator.module.css';

const FaviconGenerator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const generateFavicon = (size: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);
      const link = document.createElement('a');
      link.download = `favicon-${size}x${size}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = image;
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.uploadArea}>
          {!image ? (
            <label className={styles.dropzone}>
              <Upload size={48} />
              <p>Upload source image (PNG/JPG)</p>
              <input type="file" accept="image/*" onChange={handleUpload} hidden />
            </label>
          ) : (
            <div className={styles.previewContainer}>
              <img src={image} alt="Source" className={styles.sourceImg} />
              <button className={styles.changeBtn} onClick={() => setImage(null)}>Change Image</button>
            </div>
          )}
        </div>

        <div className={styles.generatorSection}>
          <div className={styles.sectionHeader}>
            <ImageIcon size={18} />
            <h4>Export Sizes</h4>
          </div>
          <div className={styles.sizeGrid}>
            {[16, 32, 64, 128, 512].map((size) => (
              <div key={size} className={styles.sizeCard}>
                <div className={styles.sizeInfo}>
                  <strong>{size} x {size}</strong>
                  <span>Standard {size === 16 ? 'Browser' : size === 32 ? 'Desktop' : 'App'} Icon</span>
                </div>
                <button 
                  className={styles.downloadBtn} 
                  onClick={() => generateFavicon(size)}
                  disabled={!image}
                >
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default FaviconGenerator;

import React, { useState, useRef } from 'react';
import { Maximize, Download, Upload, Lock, Unlock } from 'lucide-react';
import styles from './ImageResizer.module.css';

const ImageResizer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 });
  const [targetSize, setTargetSize] = useState({ w: 0, h: 0 });
  const [ratio, setRatio] = useState(1);
  const [locked, setLocked] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(event.target?.result as string);
          setOriginalSize({ w: img.width, h: img.height });
          setTargetSize({ w: img.width, h: img.height });
          setRatio(img.width / img.height);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateWidth = (w: number) => {
    const newW = Math.max(1, w);
    if (locked) {
      setTargetSize({ w: newW, h: Math.round(newW / ratio) });
    } else {
      setTargetSize({ ...targetSize, w: newW });
    }
  };

  const updateHeight = (h: number) => {
    const newH = Math.max(1, h);
    if (locked) {
      setTargetSize({ w: Math.round(newH * ratio), h: newH });
    } else {
      setTargetSize({ ...targetSize, h: newH });
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = targetSize.w;
      canvas.height = targetSize.h;
      ctx?.drawImage(img, 0, 0, targetSize.w, targetSize.h);
      const link = document.createElement('a');
      link.download = `resized_image.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = image;
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.previewArea}>
          {!image ? (
            <label className={styles.dropzone}>
              <Upload size={48} />
              <p>Click to upload image</p>
              <input type="file" accept="image/*" onChange={handleUpload} hidden />
            </label>
          ) : (
            <div className={styles.previewContainer}>
              <img src={image} alt="Preview" className={styles.previewImg} />
              <div className={styles.overlay}>
                {targetSize.w} x {targetSize.h}
              </div>
            </div>
          )}
        </div>

        <div className={styles.controls}>
          <div className={styles.sizeInputs}>
            <div className={styles.inputGroup}>
              <label>Width (px)</label>
              <input 
                type="number" 
                value={targetSize.w} 
                onChange={(e) => updateWidth(parseInt(e.target.value) || 0)}
              />
            </div>
            <button className={styles.lockBtn} onClick={() => setLocked(!locked)}>
              {locked ? <Lock size={20} /> : <Unlock size={20} />}
            </button>
            <div className={styles.inputGroup}>
              <label>Height (px)</label>
              <input 
                type="number" 
                value={targetSize.h} 
                onChange={(e) => updateHeight(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.mainBtn} onClick={download} disabled={!image}>
              <Download size={18} /> Download Resized Image
            </button>
            <button className={styles.resetBtn} onClick={() => setImage(null)} disabled={!image}>Reset</button>
          </div>

          {image && (
            <div className={styles.info}>
              Original dimensions: {originalSize.w} x {originalSize.h}
            </div>
          )}
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ImageResizer;

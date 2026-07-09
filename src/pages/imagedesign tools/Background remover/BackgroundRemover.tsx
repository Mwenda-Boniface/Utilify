import React, { useState, useRef, useEffect } from 'react';
import { Scissors, Upload, Download, RefreshCw, Pipette } from 'lucide-react';
import styles from './BackgroundRemover.module.css';

const BackgroundRemover: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [tolerance, setTolerance] = useState(20);
  const [targetColor, setTargetColor] = useState('#ffffff');
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the uploaded image to the canvas immediately on upload
  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = image;
  }, [image]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height);

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const r = pixel[0];
      const g = pixel[1];
      const b = pixel[2];
      
      const hex = '#' + [r, g, b].map(v => {
        const h = v.toString(16);
        return h.length === 1 ? '0' + h : h;
      }).join('');
      
      setTargetColor(hex);
    } catch (err) {
      console.error('Error picking color from canvas:', err);
    }
  };

  const removeBackground = () => {
    if (!image || !canvasRef.current) return;
    setLoading(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) return;
      
      const { data } = imageData;
      const targetR = parseInt(targetColor.slice(1, 3), 16);
      const targetG = parseInt(targetColor.slice(3, 5), 16);
      const targetB = parseInt(targetColor.slice(5, 7), 16);
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const dist = Math.sqrt(
          Math.pow(r - targetR, 2) + 
          Math.pow(g - targetG, 2) + 
          Math.pow(b - targetB, 2)
        );
        
        if (dist < tolerance) {
          data[i + 3] = 0; // Transparent
        }
      }
      
      ctx?.putImageData(imageData, 0, 0);
      setLoading(false);
    };
    img.src = image;
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'removed_background.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.previewSection}>
          {!image ? (
            <label className={styles.dropzone}>
              <Upload size={48} />
              <p>Upload image to process</p>
              <input type="file" accept="image/*" onChange={handleUpload} hidden />
            </label>
          ) : (
            <div className={styles.previewWrapper}>
              <canvas 
                ref={canvasRef} 
                className={styles.mainCanvas} 
                onClick={handleCanvasClick}
                title="Click anywhere on the image to pick background color"
                style={{ cursor: 'crosshair' }}
              />
            </div>
          )}
        </div>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label>Select Background Color</label>
            <div className={styles.colorPickerWrapper}>
              <input 
                type="color" 
                value={targetColor} 
                onChange={(e) => setTargetColor(e.target.value)}
                className={styles.colorInput}
              />
              <span>{targetColor.toUpperCase()}</span>
            </div>
            <p className={styles.hintText}>
              <Pipette size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Or click directly on the image to pick color
            </p>
          </div>

          <div className={styles.controlGroup}>
            <label>Tolerance Threshold: {tolerance}</label>
            <input 
              type="range" min="1" max="255" value={tolerance}
              onChange={(e) => setTolerance(parseInt(e.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.actions}>
            <button className={styles.processBtn} onClick={removeBackground} disabled={!image || loading}>
              {loading ? <RefreshCw className={styles.spinner} /> : 'Remove Background'}
            </button>
            <button className={styles.downloadBtn} onClick={download} disabled={!image}>
              <Download size={18} /> Download PNG
            </button>
            <button 
              className={styles.resetBtn} 
              onClick={() => { 
                setImage(null); 
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundRemover;

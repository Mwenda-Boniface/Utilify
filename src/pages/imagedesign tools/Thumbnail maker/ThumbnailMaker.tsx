import React, { useState, useRef, useEffect } from 'react';
import { Monitor, Download, Upload } from 'lucide-react';
import styles from './ThumbnailMaker.module.css';

const ThumbnailMaker: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState('UNBELIEVABLE TOOL!');
  const [color, setColor] = useState('#ff0000');
  const [layout] = useState<'classic' | 'modern'>('classic');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const drawThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 16:9 Aspect Ratio
    canvas.width = 1280;
    canvas.height = 720;

    // Background
    if (image) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 1280, 720);
        addOverlays(ctx);
      };
      img.src = image;
    } else {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, 1280, 720);
      addOverlays(ctx);
    }
  };

  const addOverlays = (ctx: CanvasRenderingContext2D) => {
    // Semi-transparent overlay for text readability
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 500, 1280, 220);

    // Text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(text.toUpperCase(), 60, 640);

    // Accent line
    ctx.fillStyle = color;
    ctx.fillRect(60, 660, 400, 10);
  };

  useEffect(() => {
    drawThumbnail();
  }, [image, text, color, layout]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'thumbnail.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.previewArea}>
          <canvas ref={canvasRef} className={styles.canvas} />
        </div>

        <div className={styles.controls}>
          <div className={styles.inputGroup}>
            <label>Thumbnail Text</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} maxLength={30} />
          </div>

          <div className={styles.inputGroup}>
            <label>Accent Color</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>

          <div className={styles.actions}>
            <label className={styles.uploadBtn}>
              <Upload size={18} /> Upload Background
              <input type="file" accept="image/*" onChange={handleUpload} hidden />
            </label>
            <button className={styles.mainBtn} onClick={download}>
              <Download size={18} /> Download Thumbnail
            </button>
            <button className={styles.resetBtn} onClick={() => setImage(null)}>Clear Background</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailMaker;

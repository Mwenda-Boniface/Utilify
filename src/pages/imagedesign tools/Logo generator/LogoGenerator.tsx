import React, { useState, useRef, useEffect } from 'react';
import { Download, Shapes } from 'lucide-react';
import styles from './LogoGenerator.module.css';

const LogoGenerator: React.FC = () => {
  const [text, setText] = useState('Utilify');
  const [color, setColor] = useState('#2563eb');
  const [fontSize, setFontSize] = useState(48);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawLogo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw icon (simplified)
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw symbol placeholder
    ctx.beginPath();
    ctx.arc(centerX, centerY - 60, 40, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize}px Inter, system-ui`;
    ctx.fillText(text, centerX, centerY + 40);
  };

  useEffect(() => {
    drawLogo();
  }, [text, color, fontSize]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'logo.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.previewSection}>
          <canvas ref={canvasRef} width={500} height={500} className={styles.canvas} />
        </div>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label>Brand Name</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} maxLength={20} />
          </div>

          <div className={styles.controlGroup}>
            <label>Primary Color</label>
            <div className={styles.colorPicker}>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
              <span>{color.toUpperCase()}</span>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label>Font Size: {fontSize}px</label>
            <input type="range" min="20" max="100" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} />
          </div>

          <button className={styles.mainBtn} onClick={download}>
            <Download size={18} /> Download Logo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoGenerator;

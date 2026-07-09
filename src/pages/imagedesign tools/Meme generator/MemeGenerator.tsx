import React, { useState, useRef, useEffect } from 'react';
import { Smile, Download, Upload } from 'lucide-react';
import styles from './MemeGenerator.module.css';

const MemeGenerator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState('WHEN YOU IMPLEMENT');
  const [bottomText, setBottomText] = useState('ALL THE TOOLS AT ONCE');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      if (!ctx) return;
      
      const fontSize = Math.floor(canvas.width / 10);
      ctx.font = `bold ${fontSize}px Impact, sans-serif`;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize / 15;
      ctx.textAlign = 'center';
      
      // Top text
      ctx.textBaseline = 'top';
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 20);
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20);
      
      // Bottom text
      ctx.textBaseline = 'bottom';
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
    };
    img.src = image;
  };

  useEffect(() => {
    drawMeme();
  }, [image, topText, bottomText]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.editorArea}>
          {!image ? (
            <label className={styles.dropzone}>
              <Upload size={48} />
              <p>Upload base image</p>
              <input type="file" accept="image/*" onChange={handleUpload} hidden />
            </label>
          ) : (
            <canvas ref={canvasRef} className={styles.canvas} />
          )}
        </div>

        <div className={styles.controls}>
          <div className={styles.inputGroup}>
            <label>Top Text</label>
            <input 
              type="text" 
              value={topText} 
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Top caption..."
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Bottom Text</label>
            <input 
              type="text" 
              value={bottomText} 
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Bottom caption..."
            />
          </div>
          
          <button className={styles.mainBtn} onClick={download} disabled={!image}>
            <Download size={18} /> Download Meme
          </button>
          <button className={styles.resetBtn} onClick={() => setImage(null)} disabled={!image}>Change Base Image</button>
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;

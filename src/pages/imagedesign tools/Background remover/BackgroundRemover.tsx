import React, { useState, useRef, useEffect } from 'react';
import { Scissors, Upload, Download, RefreshCw, Pipette, Layers } from 'lucide-react';
import styles from './BackgroundRemover.module.css';

const BackgroundRemover: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [tolerance, setTolerance] = useState(20);
  const [targetColor, setTargetColor] = useState('#ffffff');
  const [replacementColor, setReplacementColor] = useState('#ffffff');
  const [bgType, setBgType] = useState<'solid' | 'transparent'>('solid');
  const [removeMode, setRemoveMode] = useState<'contiguous' | 'global'>('contiguous');
  const [seedPoint, setSeedPoint] = useState<{ x: number; y: number } | null>(null);
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
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setSeedPoint(null);
      };
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
      setSeedPoint({ x, y });
    } catch (err) {
      console.error('Error picking color from canvas:', err);
    }
  };

  const removeBackground = () => {
    if (!image || !canvasRef.current) return;
    setLoading(true);
    
    // Slight delay to showcase the premium blur loading state
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        setLoading(false);
        return;
      }
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (!imageData) {
          setLoading(false);
          return;
        }
        
        const { data } = imageData;
        const W = canvas.width;
        const H = canvas.height;
        const targetR = parseInt(targetColor.slice(1, 3), 16);
        const targetG = parseInt(targetColor.slice(3, 5), 16);
        const targetB = parseInt(targetColor.slice(5, 7), 16);
        
        const repR = parseInt(replacementColor.slice(1, 3), 16);
        const repG = parseInt(replacementColor.slice(3, 5), 16);
        const repB = parseInt(replacementColor.slice(5, 7), 16);
        
        const isMatch = (idx: number) => {
          if (data[idx + 3] === 0) return false;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const dist = Math.sqrt(
            Math.pow(r - targetR, 2) + 
            Math.pow(g - targetG, 2) + 
            Math.pow(b - targetB, 2)
          );
          return dist < tolerance;
        };

        if (removeMode === 'contiguous') {
          const visited = new Uint8Array(W * H);
          const queue: number[] = [];

          const isMatchXY = (x: number, y: number) => {
            const idx = (y * W + x) * 4;
            return isMatch(idx);
          };

          const pushSeed = (x: number, y: number) => {
            if (x >= 0 && x < W && y >= 0 && y < H) {
              const idx = y * W + x;
              if (!visited[idx] && isMatchXY(x, y)) {
                visited[idx] = 1;
                queue.push(idx);
              }
            }
          };

          // 1. Seed from user clicked point
          if (seedPoint) {
            pushSeed(seedPoint.x, seedPoint.y);
          }

          // 2. Seed from edges with 3px depth margin to bypass outer borders/lines
          for (let depth = 0; depth < 3; depth++) {
            for (let x = 0; x < W; x++) {
              pushSeed(x, depth);
              pushSeed(x, H - 1 - depth);
            }
            for (let y = 0; y < H; y++) {
              pushSeed(depth, y);
              pushSeed(W - 1 - depth, y);
            }
          }

          // BFS loop
          let head = 0;
          while (head < queue.length) {
            const currentIdx = queue[head++];
            const cx = currentIdx % W;
            const cy = Math.floor(currentIdx / W);

            const neighbors = [
              [cx + 1, cy],
              [cx - 1, cy],
              [cx, cy + 1],
              [cx, cy - 1]
            ];

            for (const [nx, ny] of neighbors) {
              if (nx >= 0 && nx < W && ny >= 0 && ny < H) {
                const nIdx = ny * W + nx;
                if (!visited[nIdx] && isMatchXY(nx, ny)) {
                  visited[nIdx] = 1;
                  queue.push(nIdx);
                }
              }
            }
          }

          // Apply transparency or color replacement to visited pixels
          for (let i = 0; i < queue.length; i++) {
            const idx = queue[i] * 4;
            if (bgType === 'transparent') {
              data[idx + 3] = 0;
            } else {
              data[idx] = repR;
              data[idx + 1] = repG;
              data[idx + 2] = repB;
              data[idx + 3] = 255;
            }
          }
        } else {
          // Global removal (Chroma key)
          for (let i = 0; i < data.length; i += 4) {
            if (isMatch(i)) {
              if (bgType === 'transparent') {
                data[i + 3] = 0;
              } else {
                data[i] = repR;
                data[i + 1] = repG;
                data[i + 2] = repB;
                data[i + 3] = 255;
              }
            }
          }
        }
        
        ctx?.putImageData(imageData, 0, 0);
        setLoading(false);
      };
      img.src = image;
    }, 850);
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
                className={`${styles.mainCanvas} ${loading ? styles.canvasBlur : ''}`} 
                onClick={handleCanvasClick}
                title="Click anywhere on the image to pick background color"
                style={{ cursor: 'crosshair' }}
              />
              {loading && (
                <div className={styles.loadingOverlay}>
                  <RefreshCw className={styles.spinner} size={32} />
                  <span>Processing Image...</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label>Removal Mode</label>
            <div className={styles.modeToggleGroup}>
              <button 
                type="button"
                className={`${styles.modeBtn} ${removeMode === 'contiguous' ? styles.activeMode : ''}`}
                onClick={() => setRemoveMode('contiguous')}
                title="Only removes the background connected to the borders, keeping interior colors solid"
              >
                Contiguous Area
              </button>
              <button 
                type="button"
                className={`${styles.modeBtn} ${removeMode === 'global' ? styles.activeMode : ''}`}
                onClick={() => setRemoveMode('global')}
                title="Removes target color everywhere, even if it is inside the subject"
              >
                Everywhere
              </button>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label>Select Background Color (To Remove)</label>
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
            <label>Output Background Type</label>
            <div className={styles.modeToggleGroup}>
              <button 
                type="button"
                className={`${styles.modeBtn} ${bgType === 'solid' ? styles.activeMode : ''}`}
                onClick={() => setBgType('solid')}
                title="Replaces the background with a custom solid color"
              >
                Solid Color
              </button>
              <button 
                type="button"
                className={`${styles.modeBtn} ${bgType === 'transparent' ? styles.activeMode : ''}`}
                onClick={() => setBgType('transparent')}
                title="Replaces the background with transparency"
              >
                Transparent
              </button>
            </div>
          </div>

          {bgType === 'solid' && (
            <div className={styles.controlGroup}>
              <label>New Replacement Background Color</label>
              <div className={styles.colorPickerWrapper}>
                <input 
                  type="color" 
                  value={replacementColor} 
                  onChange={(e) => setReplacementColor(e.target.value)}
                  className={styles.colorInput}
                />
                <span>{replacementColor.toUpperCase()}</span>
              </div>
            </div>
          )}

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
              Remove Background
            </button>
            <button className={styles.downloadBtn} onClick={download} disabled={!image || loading}>
              <Download size={18} /> Download PNG
            </button>
            <button 
              className={styles.resetBtn} 
              onClick={() => { 
                setImage(null); 
                setSeedPoint(null);
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

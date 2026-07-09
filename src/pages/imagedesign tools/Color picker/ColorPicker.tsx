import React, { useState } from 'react';
import { Palette, Copy, Check, Pipette } from 'lucide-react';
import styles from './ColorPicker.module.css';

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState('#2563eb');
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getHarmonics = (hex: string) => {
    // Simple harmonic simulation
    return [
      hex,
      '#ef4444',
      '#10b981',
      '#f59e0b',
      '#8b5cf6'
    ];
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.pickerSection}>
          <div className={styles.mainPicker}>
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)}
              className={styles.colorInput}
            />
            <div className={styles.colorDisplay} style={{ backgroundColor: color }}>
              <span className={styles.hexText}>{color.toUpperCase()}</span>
            </div>
          </div>

          <div className={styles.exportGrid}>
            <div className={styles.exportCard}>
              <div className={styles.cardInfo}>
                <span>HEX</span>
                <strong>{color.toUpperCase()}</strong>
              </div>
              <button onClick={() => handleCopy(color.toUpperCase(), 'hex')}>
                {copied === 'hex' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <div className={styles.exportCard}>
              <div className={styles.cardInfo}>
                <span>RGB</span>
                <strong>{hexToRgb(color)}</strong>
              </div>
              <button onClick={() => handleCopy(hexToRgb(color), 'rgb')}>
                {copied === 'rgb' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.paletteSection}>
          <div className={styles.sectionHeader}>
            <Palette size={18} />
            <h4>Color Harmonics</h4>
          </div>
          <div className={styles.paletteGrid}>
            {getHarmonics(color).map((c, i) => (
              <div key={i} className={styles.paletteItem}>
                <div className={styles.swatch} style={{ backgroundColor: c }} onClick={() => setColor(c)} />
                <span className={styles.swatchText}>{c.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;

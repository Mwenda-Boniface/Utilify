import React, { useState } from 'react';
import { Palette, Copy, Check, Sliders } from 'lucide-react';
import styles from './ColorPicker.module.css';

// --- Color Conversion Helpers ---
const hexToRgbValues = (hex: string) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16) || 0;
  const g = parseInt(cleanHex.slice(2, 4), 16) || 0;
  const b = parseInt(cleanHex.slice(4, 6), 16) || 0;
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (c: number) => {
    const hex = Math.min(255, Math.max(0, c)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const hslToRgb = (h: number, s: number, l: number) => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r = l;
  let g = l;
  let b = l;

  if (s !== 0) {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState('#2563eb');
  const [copied, setCopied] = useState<string | null>(null);

  const { r, g, b } = hexToRgbValues(color);
  const { h, s, l } = rgbToHsl(r, g, b);

  const hexToRgbString = (hex: string) => {
    const values = hexToRgbValues(hex);
    return `rgb(${values.r}, ${values.g}, ${values.b})`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getHarmonics = (hex: string) => {
    const values = hexToRgbValues(hex);
    const hsl = rgbToHsl(values.r, values.g, values.b);

    // Complementary
    const compRgb = hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l);
    const compHex = rgbToHex(compRgb.r, compRgb.g, compRgb.b);

    // Analogous 1
    const ana1Rgb = hslToRgb((hsl.h - 30 + 360) % 360, hsl.s, hsl.l);
    const ana1Hex = rgbToHex(ana1Rgb.r, ana1Rgb.g, ana1Rgb.b);

    // Analogous 2
    const ana2Rgb = hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l);
    const ana2Hex = rgbToHex(ana2Rgb.r, ana2Rgb.g, ana2Rgb.b);

    // Monochromatic variant
    const monoRgb = hslToRgb(hsl.h, hsl.s, Math.max(10, Math.min(90, hsl.l > 50 ? hsl.l - 25 : hsl.l + 25)));
    const monoHex = rgbToHex(monoRgb.r, monoRgb.g, monoRgb.b);

    return [
      hex,
      compHex,
      ana1Hex,
      ana2Hex,
      monoHex
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
                <strong>{hexToRgbString(color)}</strong>
              </div>
              <button onClick={() => handleCopy(hexToRgbString(color), 'rgb')}>
                {copied === 'rgb' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Manual Tuning Sliders */}
          <div className={styles.tunerSection}>
            <div className={styles.tunerHeader}>
              <Sliders size={18} />
              <h4>Manual Tuning</h4>
            </div>
            
            <div className={styles.tunerGroup}>
              {/* RGB Channels */}
              <div className={styles.tunerRow}>
                <div className={styles.tunerLabel}>
                  <span>Red</span>
                  <strong>{r}</strong>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="255" 
                  value={r} 
                  style={{ '--slider-color': color } as React.CSSProperties}
                  onChange={(e) => setColor(rgbToHex(Number(e.target.value), g, b))} 
                />
              </div>
              <div className={styles.tunerRow}>
                <div className={styles.tunerLabel}>
                  <span>Green</span>
                  <strong>{g}</strong>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="255" 
                  value={g} 
                  style={{ '--slider-color': color } as React.CSSProperties}
                  onChange={(e) => setColor(rgbToHex(r, Number(e.target.value), b))} 
                />
              </div>
              <div className={styles.tunerRow}>
                <div className={styles.tunerLabel}>
                  <span>Blue</span>
                  <strong>{b}</strong>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="255" 
                  value={b} 
                  style={{ '--slider-color': color } as React.CSSProperties}
                  onChange={(e) => setColor(rgbToHex(r, g, Number(e.target.value)))} 
                />
              </div>

              {/* HSL Channels */}
              <div className={styles.tunerRow}>
                <div className={styles.tunerLabel}>
                  <span>Hue</span>
                  <strong>{h}°</strong>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={h} 
                  style={{ '--slider-color': color } as React.CSSProperties}
                  onChange={(e) => {
                    const rgb = hslToRgb(Number(e.target.value), s, l);
                    setColor(rgbToHex(rgb.r, rgb.g, rgb.b));
                  }} 
                />
              </div>
              <div className={styles.tunerRow}>
                <div className={styles.tunerLabel}>
                  <span>Saturation</span>
                  <strong>{s}%</strong>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={s} 
                  style={{ '--slider-color': color } as React.CSSProperties}
                  onChange={(e) => {
                    const rgb = hslToRgb(h, Number(e.target.value), l);
                    setColor(rgbToHex(rgb.r, rgb.g, rgb.b));
                  }} 
                />
              </div>
              <div className={styles.tunerRow}>
                <div className={styles.tunerLabel}>
                  <span>Lightness</span>
                  <strong>{l}%</strong>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={l} 
                  style={{ '--slider-color': color } as React.CSSProperties}
                  onChange={(e) => {
                    const rgb = hslToRgb(h, s, Number(e.target.value));
                    setColor(rgbToHex(rgb.r, rgb.g, rgb.b));
                  }} 
                />
              </div>
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

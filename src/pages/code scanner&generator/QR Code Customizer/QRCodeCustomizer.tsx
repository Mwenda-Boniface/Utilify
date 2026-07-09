import React, { useState } from 'react';
import { Palette, Sparkles, Layout, Globe, Command } from 'lucide-react';
import BaseQRGenerator from '../../../components/BaseQRGenerator';
import styles from './QRCodeCustomizer.module.css';

interface Preset {
  id: string;
  name: string;
  color: string;
  description: string;
}

const PRESETS: Preset[] = [
  { id: 'classic', name: 'Standard Black', color: '#000000', description: 'Maximum contrast, universal scan.' },
  { id: 'matrix', name: 'Matrix Digital', color: '#00FF41', description: 'Retro digital aesthetic.' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon', color: '#FF003C', description: 'Viral neon accent.' },
  { id: 'royal', name: 'Royal Blue', color: '#3b82f6', description: 'Professional trust-building cyan.' },
  { id: 'deep-sea', name: 'Deep Sea', color: '#1e293b', description: 'Sleek dark mode integration.' },
];

const QRCodeCustomizer: React.FC = () => {
  const [content, setContent] = useState('Utilify: Designing the Future');
  const [selectedPresetId, setSelectedPresetId] = useState('classic');
  const [customColor, setCustomColor] = useState('#000000');

  const handlePresetSelect = (preset: Preset) => {
    setSelectedPresetId(preset.id);
    setCustomColor(preset.color);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <Palette size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>QR Code Customizer</h2>
      </div>

      <div className={styles.customizerLayout}>
        {/* Presets Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sectionTitle}>
            <Sparkles size={16} />
            <span>Design Presets</span>
          </div>
          <div className={styles.presetGrid}>
            {PRESETS.map(preset => (
              <button 
                key={preset.id}
                className={`${styles.presetCard} ${selectedPresetId === preset.id ? styles.activePreset : ''}`}
                onClick={() => handlePresetSelect(preset)}
              >
                <div className={styles.colorCircle} style={{ background: preset.color }} />
                <div className={styles.presetInfo}>
                  <strong>{preset.name}</strong>
                  <p>{preset.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Generator Section */}
        <div className={styles.mainEditor}>
          <BaseQRGenerator 
            title="Style & Content Editor" 
            qrValue={content} 
            icon={<Layout size={20} />}
          >
            <div className={styles.inputStack}>
              <div className={styles.field}>
                <label><Globe size={16} /> QR Content</label>
                <textarea 
                  className={styles.textarea}
                  placeholder="Enter URL or text here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className={styles.divider} />

              <div className={styles.field}>
                <label><Command size={16} /> Manual Color Override</label>
                <div className={styles.colorPickerRow}>
                  <input 
                    type="color" 
                    className={styles.colorInput}
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      setSelectedPresetId('manual');
                    }}
                  />
                  <input 
                    type="text" 
                    className={styles.hexInput}
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </BaseQRGenerator>
        </div>
      </div>
    </div>
  );
};

export default QRCodeCustomizer;

import React, { useState, useEffect } from 'react';
import { Play, Square, Trash2, Globe } from 'lucide-react';
import styles from './TTSTool.module.css';

const TTSTool: React.FC = () => {
  const [ttsText, setTtsText] = useState('');
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (v.length > 0 && !voice) setVoice(v[0]);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    if (!ttsText) return;
    
    const utterance = new SpeechSynthesisUtterance(ttsText);
    if (voice) utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={styles.container}>

      <div className={styles.workspace}>
        <div className={styles.inputArea}>
          <label className={styles.label}>Enter Text to Speak</label>
          <textarea 
            className={styles.textarea}
            value={ttsText}
            onChange={(e) => setTtsText(e.target.value)}
            placeholder="Type something here..."
          />
          <div className={styles.controls}>
            <div className={styles.setting}>
              <label><Globe size={14} /> Voice</label>
              <select 
                value={voice?.name || ''} 
                onChange={(e) => setVoice(voices.find(v => v.name === e.target.value) || null)}
              >
                {voices.map(v => (
                  <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                ))}
              </select>
            </div>
            <div className={styles.sliders}>
              <div className={styles.setting}>
                <label>Rate: {rate}x</label>
                <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} />
              </div>
              <div className={styles.setting}>
                <label>Pitch: {pitch}</label>
                <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button 
            className={`${styles.mainBtn} ${isSpeaking ? styles.speaking : ''}`} 
            onClick={speak}
          >
            {isSpeaking ? <Square size={20} /> : <Play size={20} />}
            {isSpeaking ? 'Stop Speaking' : 'Play Text'}
          </button>
          <button className={styles.ghostButton} onClick={() => setTtsText('')}>
            <Trash2 size={18} />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default TTSTool;

import React, { useState, useCallback } from 'react';
import { Copy, Check, Trash2, Volume2, Play, Square, ArrowRightLeft } from 'lucide-react';
import styles from './MorseTranslator.module.css';

const MORSE_MAP: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': '/'
};

const REVERSE_MORSE_MAP = Object.entries(MORSE_MAP).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as { [key: string]: string });

const MorseTranslator: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const translateToMorse = () => {
    const result = input.toUpperCase().split('').map(char => MORSE_MAP[char] || char).join(' ');
    setOutput(result);
  };

  const translateToText = () => {
    const result = input.split(' ').map(code => REVERSE_MORSE_MAP[code] || code).join('');
    setOutput(result);
  };

  const playMorse = useCallback(async () => {
    if (isPlaying || !output) return;
    setIsPlaying(true);

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const dotDuration = 0.1;
    const dashDuration = dotDuration * 3;
    const frequency = 600;

    const playTone = (duration: number) => {
      return new Promise<void>(resolve => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = frequency;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        osc.start();
        setTimeout(() => {
          osc.stop();
          resolve();
        }, duration * 1000);
      });
    };

    const codes = output.split('');
    for (const char of codes) {
      if (!isPlaying) break;
      if (char === '.') await playTone(dotDuration);
      else if (char === '-') await playTone(dashDuration);
      else if (char === ' ') await new Promise(r => setTimeout(r, dotDuration * 300));
      else if (char === '/') await new Promise(r => setTimeout(r, dotDuration * 700));
      
      await new Promise(r => setTimeout(r, dotDuration * 100));
    }

    setIsPlaying(false);
    audioCtx.close();
  }, [output, isPlaying]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Input Data</span>
            <button className={styles.ghostBtn} onClick={() => setInput('')}>
              <Trash2 size={16} />
            </button>
          </div>
          <div className={styles.editorWrapper}>
            <textarea
              className={styles.textarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text or Morse code here..."
            />
          </div>
          <div className={styles.actionBar}>
            <button className={styles.mainBtn} onClick={translateToMorse}>
              Text <ArrowRightLeft size={16} /> Morse
            </button>
            <button className={styles.secondaryBtn} onClick={translateToText}>
              Morse <ArrowRightLeft size={16} /> Text
            </button>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Translated Output</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {output && (
                <>
                  <button 
                    className={`${styles.playBtn} ${isPlaying ? styles.playing : ''}`} 
                    onClick={playMorse} 
                    disabled={isPlaying}
                  >
                    {isPlaying ? <Square size={14} /> : <Play size={14} />}
                    {isPlaying ? 'Playing...' : 'Play Signal'}
                  </button>
                  <button className={styles.copyBtn} onClick={handleCopy}>
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy Result'}
                  </button>
                </>
              )}
            </div>
          </div>
          <div className={styles.editorWrapper}>
            <div className={styles.codeOutput}>
              {output || <span className={styles.placeholder}>Result will appear here...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorseTranslator;

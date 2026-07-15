import React, { useState, useEffect } from 'react';
import { Play, Square, Trash2, Globe, Download } from 'lucide-react';
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

  const downloadAudio = async () => {
    if (!ttsText) return;
    try {
      // 1. Clean the language code (extract first 2 chars like 'en', 'es' to prevent Google Translate 404s)
      const lang = voice ? voice.lang.split('-')[0].toLowerCase() : 'en';
      
      // 2. Clean the text to remove dots, paths, and special symbols that trigger Google WAF 404s
      const cleanedText = ttsText
        .replace(/\.html?\b/gi, ' html') // convert .html to space-html
        .replace(/\./g, ' ') // convert all remaining dots to spaces
        .replace(/[\/\\#+$~%*<>{}[\]:]/g, '') // remove path, tag, and query symbols
        .trim();
      
      // 3. Split text into chunks of max 180 characters safely by word boundaries
      const chunks: string[] = [];
      const words = cleanedText.split(/\s+/);
      let currentChunk = '';
      
      for (const word of words) {
        if ((currentChunk + ' ' + word).trim().length > 180) {
          if (currentChunk) chunks.push(currentChunk.trim());
          currentChunk = word;
        } else {
          currentChunk = (currentChunk + ' ' + word).trim();
        }
      }
      if (currentChunk) chunks.push(currentChunk.trim());
      
      // 4. Fetch all audio chunk buffers
      const audioBuffers: ArrayBuffer[] = [];
      for (const chunk of chunks) {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&q=${encodeURIComponent(chunk)}&client=tw-ob`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch audio chunk');
        const arrayBuffer = await res.arrayBuffer();
        audioBuffers.push(arrayBuffer);
      }
      
      // 5. Decode all audio chunks to AudioBuffers using AudioContext
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const decodedBuffers: AudioBuffer[] = [];
      
      for (const buffer of audioBuffers) {
        const decoded = await audioCtx.decodeAudioData(buffer);
        decodedBuffers.push(decoded);
      }
      
      // 6. Concatenate decoded AudioBuffers
      const totalLength = decodedBuffers.reduce((acc, buf) => acc + buf.length, 0);
      const numberOfChannels = decodedBuffers[0].numberOfChannels;
      const sampleRate = decodedBuffers[0].sampleRate;
      
      const tmpBuffer = audioCtx.createBuffer(numberOfChannels, totalLength, sampleRate);
      
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const channelData = tmpBuffer.getChannelData(channel);
        let offset = 0;
        for (const buf of decodedBuffers) {
          channelData.set(buf.getChannelData(channel), offset);
          offset += buf.length;
        }
      }
      
      // 7. Encode AudioBuffer to WAV
      const wavBlob = audioBufferToWav(tmpBuffer);
      const downloadUrl = window.URL.createObjectURL(wavBlob);
      
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `speech-${lang}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
      
      audioCtx.close();
    } catch (error) {
      console.error('Failed to download merged audio:', error);
      // Fallback: Open URL directly in a new window/tab for user to save (first 180 chars)
      const lang = voice ? voice.lang.split('-')[0].toLowerCase() : 'en';
      const cleanFallbackText = ttsText
        .replace(/\.html?\b/gi, ' html')
        .replace(/\./g, ' ')
        .replace(/[\/\\#+$~%*<>{}[\]:]/g, '')
        .substring(0, 180)
        .trim();
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&q=${encodeURIComponent(cleanFallbackText)}&client=tw-ob`;
      window.open(url, '_blank');
    }
  };

  // Helper function to encode AudioBuffer to WAV
  const audioBufferToWav = (buffer: AudioBuffer): Blob => {
    const numOfChan = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // raw PCM
    const bitDepth = 16;
    
    let result;
    if (numOfChan === 2) {
      result = interleave(buffer.getChannelData(0), buffer.getChannelData(1));
    } else {
      result = buffer.getChannelData(0);
    }
    
    const bufferLen = result.length * 2;
    const arrayBuffer = new ArrayBuffer(44 + bufferLen);
    const view = new DataView(arrayBuffer);
    
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + bufferLen, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numOfChan, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numOfChan * (bitDepth / 8), true);
    view.setUint16(32, numOfChan * (bitDepth / 8), true);
    view.setUint16(34, bitDepth, true);
    writeString(view, 36, 'data');
    view.setUint32(40, bufferLen, true);
    
    floatTo16BitPCM(view, 44, result);
    
    return new Blob([view], { type: 'audio/wav' });
  };

  const interleave = (inputL: Float32Array, inputR: Float32Array): Float32Array => {
    const length = inputL.length + inputR.length;
    const result = new Float32Array(length);
    let index = 0;
    let inputIndex = 0;
    
    while (index < length) {
      result[index++] = inputL[inputIndex];
      result[index++] = inputR[inputIndex];
      inputIndex++;
    }
    return result;
  };

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const floatTo16BitPCM = (output: DataView, offset: number, input: Float32Array) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.workspaceGrid}>
          {/* Left Column: Text Input */}
          <div className={styles.leftPane}>
            <label className={styles.label}>Enter Text to Speak</label>
            <textarea 
              className={styles.textarea}
              value={ttsText}
              onChange={(e) => setTtsText(e.target.value)}
              placeholder="Type something here..."
            />
          </div>

          {/* Right Column: Settings & Actions */}
          <div className={styles.rightPane}>
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
            
            <div className={styles.actions}>
              <button 
                className={`${styles.mainBtn} ${isSpeaking ? styles.speaking : ''}`} 
                onClick={speak}
              >
                {isSpeaking ? <Square size={20} /> : <Play size={20} />}
                {isSpeaking ? 'Stop Speaking' : 'Play Text'}
              </button>
              
              <button 
                className={styles.downloadBtn}
                onClick={downloadAudio}
                disabled={!ttsText}
              >
                <Download size={20} />
                Download Audio
              </button>
              
              <button className={styles.ghostButton} onClick={() => setTtsText('')}>
                <Trash2 size={18} />
                Clear Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTSTool;

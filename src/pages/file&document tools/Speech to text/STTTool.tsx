import React, { useState, useRef } from 'react';
import { Mic, MicOff, Download, Trash2 } from 'lucide-react';
import styles from './STTTool.module.css';

const STTTool: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) setTranscript(prev => prev + ' ' + finalTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  return (
    <div className={styles.container}>

      <div className={styles.workspace}>
        <div className={styles.transcriptBox}>
          <div className={styles.outputHeader}>
            <label className={styles.label}>Live Transcript</label>
            <div className={styles.outputActions}>
              <button className={styles.copyBtn} onClick={() => navigator.clipboard.writeText(transcript)}>
                <Download size={16} /> Copy
              </button>
              <button className={styles.deleteBtn} onClick={() => setTranscript('')}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <div className={styles.transcriptContent}>
            {transcript || <span className={styles.placeholder}>Your transcription will appear here as you speak...</span>}
          </div>
        </div>
        <div className={styles.actions}>
          <button 
            className={`${styles.micBtn} ${isListening ? styles.listening : ''}`} 
            onClick={toggleListening}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
            <span>{isListening ? 'Stop Listening' : 'Start Recording'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default STTTool;

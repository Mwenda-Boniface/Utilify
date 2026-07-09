import React, { useState, useEffect } from 'react';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import { Shield, Eye, EyeOff, AlertCircle, Clock, Zap, Info, Lock } from 'lucide-react';
import styles from './StrengthChecker.module.css';

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};
zxcvbnOptions.setOptions(options);

const StrengthChecker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (password) {
      setResult(zxcvbn(password));
    } else {
      setResult(null);
    }
  }, [password]);

  const getStrengthColor = (score: number) => {
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
    return colors[score];
  };

  const getStrengthText = (score: number) => {
    const texts = ['Extremely Vulnerable', 'Weak', 'Fair', 'Strong', 'Secure'];
    return texts[score];
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.inputCard}>
          <div className={styles.inputWrapper}>
            <Lock size={20} className={styles.lockIcon} />
            <input 
              type={showPassword ? 'text' : 'password'}
              className={styles.input}
              placeholder="Enter password to analyze..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.toggleBtn} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {result && (
            <div className={styles.meterContainer}>
              <div className={styles.meterLabels}>
                <span className={styles.strengthText} style={{ color: getStrengthColor(result.score) }}>
                  {getStrengthText(result.score)}
                </span>
                <span className={styles.scoreText}>Score: {result.score}/4</span>
              </div>
              <div className={styles.meter}>
                {[0, 1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className={styles.meterSegment}
                    style={{ 
                      backgroundColor: i <= result.score ? getStrengthColor(result.score) : 'var(--border)',
                      opacity: i <= result.score ? 1 : 0.3
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {result && (
          <div className={styles.detailsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <Clock size={18} />
                <span>Estimated Crack Time</span>
              </div>
              <div className={styles.crackTimes}>
                <div className={styles.crackRow}>
                  <span>Online Attack</span>
                  <strong>{result.crackTimesDisplay.onlineNoThrottling10PerSecond}</strong>
                </div>
                <div className={styles.crackRow}>
                  <span>Offline Attack</span>
                  <strong>{result.crackTimesDisplay.offlineFastHashing1e10PerSecond}</strong>
                </div>
              </div>
            </div>

            <div className={styles.feedbackCard}>
              <div className={styles.statHeader}>
                <Zap size={18} />
                <span>Security Advice</span>
              </div>
              <div className={styles.feedbackList}>
                {result.feedback.warning && (
                  <div className={styles.warning}>
                    <AlertCircle size={16} />
                    <span>{result.feedback.warning}</span>
                  </div>
                )}
                {result.feedback.suggestions.map((s: string, i: number) => (
                  <div key={i} className={styles.suggestion}>
                    <Info size={16} />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrengthChecker;

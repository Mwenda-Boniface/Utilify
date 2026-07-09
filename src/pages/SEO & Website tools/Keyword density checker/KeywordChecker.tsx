import React, { useState } from 'react';
import { Type, BarChart2, Hash, Trash2, Search, AlertCircle } from 'lucide-react';
import styles from './KeywordChecker.module.css';

interface KeywordStat {
  word: string;
  count: number;
  density: number;
}

const KeywordChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<KeywordStat[]>([]);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const analyzeText = () => {
    if (!text.trim()) return;

    // Clean text: remove punctuation, numbers, and common stop words
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, '');
    const words = cleanText.split(/\s+/).filter(w => w.length > 2);
    
    const stopWords = new Set(['the', 'and', 'for', 'this', 'that', 'with', 'from', 'your', 'will', 'have', 'are', 'was', 'were']);
    const filteredWords = words.filter(w => !stopWords.has(w));

    const totalWords = filteredWords.length;
    const frequencyMap: Record<string, number> = {};

    filteredWords.forEach(word => {
      frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    });

    const sortedStats = Object.entries(frequencyMap)
      .map(([word, count]) => ({
        word,
        count,
        density: (count / totalWords) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    setStats(sortedStats);
    setIsAnalyzed(true);
  };

  const clear = () => {
    setText('');
    setStats([]);
    setIsAnalyzed(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.inputSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Hash size={18} />
              <h4>Content Analysis</h4>
            </div>
            <textarea 
              className={styles.textarea}
              placeholder="Paste your article or content here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className={styles.actions}>
              <button className={styles.primaryBtn} onClick={analyzeText} disabled={!text}>
                <Search size={18} /> Analyze Density
              </button>
              <button className={styles.ghostBtn} onClick={clear}>
                <Trash2 size={18} /> Clear
              </button>
            </div>
          </div>
        </div>

        <div className={styles.resultSection}>
          {isAnalyzed ? (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <BarChart2 size={18} />
                <h4>Top Keywords</h4>
              </div>
              <div className={styles.statsList}>
                <div className={styles.statsHeader}>
                  <span>Keyword</span>
                  <span>Count</span>
                  <span>Density</span>
                </div>
                {stats.map((stat, i) => (
                  <div key={i} className={styles.statRow}>
                    <span className={styles.keyword}>{stat.word}</span>
                    <span className={styles.count}>{stat.count}</span>
                    <div className={styles.densityWrapper}>
                       <span className={styles.densityText}>{stat.density.toFixed(1)}%</span>
                       <div className={styles.barContainer}>
                          <div className={styles.bar} style={{ width: `${Math.min(stat.density * 10, 100)}%` }} />
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.placeholderCard}>
              <AlertCircle size={48} />
              <p>Enter text on the left to see keyword density statistics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeywordChecker;

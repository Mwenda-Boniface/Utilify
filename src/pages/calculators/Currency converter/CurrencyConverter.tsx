import React, { useState, useEffect } from 'react';
import { DollarSign, RefreshCw, ArrowRightLeft, TrendingUp } from 'lucide-react';
import styles from '../Calculators.module.css';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.94 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.81 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 154.5 },
  { code: 'KES', name: 'Kenya Shilling', symbol: 'KSh', rate: 132.0 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rate: 1.38 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.55 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.5 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.24 },
];

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState(CURRENCIES[0]);
  const [toCurrency, setToCurrency] = useState(CURRENCIES[1]);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    convert();
  }, [amount, fromCurrency, toCurrency]);

  const convert = () => {
    if (!amount) {
      setResult(0);
      return;
    }
    // Convert to USD first (base)
    const inUSD = amount / fromCurrency.rate;
    const final = inUSD * toCurrency.rate;
    setResult(Math.round(final * 100) / 100);
  };

  const swap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <DollarSign size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Currency Converter</h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.card}>
          <div className={styles.field}>
            <label><TrendingUp size={16} /> Amount to Convert</label>
            <input 
              type="number"
              className={styles.input}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'flex-end' }}>
            <div className={styles.field}>
              <label>From</label>
              <select 
                className={styles.select}
                value={fromCurrency.code}
                onChange={(e) => setFromCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0])}
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>

            <button className={styles.btnSecondary} onClick={swap} style={{ marginBottom: '0.25rem', padding: '0.75rem' }}>
              <ArrowRightLeft size={18} />
            </button>

            <div className={styles.field}>
              <label>To</label>
              <select 
                className={styles.select}
                value={toCurrency.code}
                onChange={(e) => setToCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[1])}
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={`${styles.field} glass`} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(var(--primary-rgb), 0.05)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
              <strong>Note:</strong> Rates are estimated for offline use. Market rates may vary slightly.
            </p>
          </div>
        </div>

        <div className={styles.results}>
          {result !== null ? (
            <>
              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>Converted Amount</span>
                <span className={styles.resultValue}>{toCurrency.symbol}{result.toLocaleString()}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{toCurrency.name}</span>
              </div>

              <div className={styles.card} style={{ gap: '0.5rem', background: 'rgba(var(--primary-rgb), 0.03)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Exchange Rate</div>
                <div style={{ fontWeight: 600 }}>
                  1 {fromCurrency.code} = {(toCurrency.rate / fromCurrency.rate).toFixed(4)} {toCurrency.code}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.card} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
              <RefreshCw size={48} strokeWidth={1} style={{ marginBottom: '1rem' }} />
              <p>Ready to convert...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;

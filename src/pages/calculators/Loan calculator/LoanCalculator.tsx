import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, PieChart, Info } from 'lucide-react';
import styles from '../Calculators.module.css';

const LoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [term, setTerm] = useState<number>(5);
  const [termUnit, setTermUnit] = useState<'years' | 'months'>('years');
  
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    calculateLoan();
  }, [principal, interestRate, term, termUnit]);

  const calculateLoan = () => {
    const p = principal;
    const r = interestRate / 100 / 12;
    const n = termUnit === 'years' ? term * 12 : term;

    if (r === 0) {
      setMonthlyPayment(p / n);
      setTotalPayment(p);
      setTotalInterest(0);
      return;
    }

    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    
    setMonthlyPayment(monthly);
    setTotalPayment(total);
    setTotalInterest(total - p);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <PieChart size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Loan Calculator</h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.card}>
          <div className={styles.field}>
            <label><DollarSign size={16} /> Loan Principal</label>
            <input 
              type="number"
              className={styles.input}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
            />
          </div>

          <div className={styles.field}>
            <label><Percent size={16} /> Annual Interest Rate (%)</label>
            <input 
              type="number"
              step="0.1"
              className={styles.input}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </div>

          <div className={styles.field}>
            <label><Calendar size={16} /> Loan Term</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '0.5rem' }}>
              <input 
                type="number"
                className={styles.input}
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
              />
              <select 
                className={styles.select}
                value={termUnit}
                onChange={(e) => setTermUnit(e.target.value as 'years' | 'months')}
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Monthly Payment</span>
            <span className={styles.resultValue}>${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Total Interest</div>
              <div className={styles.statValue} style={{ color: '#ef4444' }}>
                ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Total Payment</div>
              <div className={styles.statValue}>
                ${totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div className={styles.card} style={{ gap: '1rem', background: 'rgba(var(--primary-rgb), 0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Info size={14} />
              PAYMENT BREAKDOWN
            </div>
            <div className={styles.progressBar} style={{ height: '24px', display: 'flex' }}>
              <div 
                style={{ 
                  width: `${(principal / totalPayment) * 100}%`, 
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 0.5rem',
                  fontSize: '0.7rem',
                  color: 'white',
                  fontWeight: 700
                }}
              >
                Principal
              </div>
              <div 
                style={{ 
                  width: `${(totalInterest / totalPayment) * 100}%`, 
                  background: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 0.5rem',
                  fontSize: '0.7rem',
                  color: 'white',
                  fontWeight: 700
                }}
              >
                Interest
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;

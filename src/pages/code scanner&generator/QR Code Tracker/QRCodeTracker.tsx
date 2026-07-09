import React, { useState, useMemo } from 'react';
import { 
  BarChart, Activity, Shield, QrCode, 
  ChevronRight, Calendar, Trash2, FileJson, FileSpreadsheet 
} from 'lucide-react';
import { getScanHistory, clearScanHistory, type ScanHistory } from '../../../utils/history';
import styles from './QRCodeTracker.module.css';

const QRCodeTracker: React.FC = () => {
  const [history, setHistory] = useState<ScanHistory[]>(getScanHistory());

  const stats = useMemo(() => {
    const total = history.length;
    const encrypted = history.filter(h => h.isEncrypted).length;
    const standard = total - encrypted;
    const ratio = total > 0 ? (encrypted / total) * 100 : 0;

    return { total, encrypted, standard, ratio };
  }, [history]);

  const handleClear = () => {
    if (confirm('Are you sure you want to delete all locally tracked scan data?')) {
      clearScanHistory();
      setHistory([]);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Timestamp', 'Data', 'Type', 'Secure'];
    const rows = history.map(h => [
      h.id,
      new Date(h.timestamp).toLocaleString(),
      `"${h.data.replace(/"/g, '""')}"`,
      h.type,
      h.isEncrypted
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `mrbit_scan_report_${Date.now()}.csv`;
    link.click();
  };

  const exportJSON = () => {
    const data = JSON.stringify(history, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `mrbit_scan_data_${Date.now()}.json`;
    link.click();
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <Activity size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Local Tracking Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass`}>
          <div className={styles.cardHeader}>
            <BarChart size={18} color="var(--primary)" />
            <span>Total Scans</span>
          </div>
          <div className={styles.statValue}>{stats.total}</div>
          <div className={styles.cardFooter}>Tracking your local hardware activity</div>
        </div>

        <div className={`${styles.statCard} glass`}>
          <div className={styles.cardHeader}>
            <Shield size={18} color="#00C853" />
            <span>Secure Ratio</span>
          </div>
          <div className={styles.statValue}>{stats.ratio.toFixed(0)}%</div>
          <div className={styles.cardFooter}>{stats.encrypted} Encrypted scans found</div>
        </div>

        <div className={`${styles.statCard} glass`}>
          <div className={styles.cardHeader}>
            <QrCode size={18} color="#3b82f6" />
            <span>Most Active</span>
          </div>
          <div className={styles.statValue}>QR</div>
          <div className={styles.cardFooter}>Current Primary scanning mode</div>
        </div>
      </div>

      {/* Export & Actions Section */}
      <div className={styles.actionRow}>
        <div className={styles.exportButtons}>
          <button onClick={exportCSV} className={styles.actionBtn}>
            <FileSpreadsheet size={16} /> Export CSV
          </button>
          <button onClick={exportJSON} className={styles.actionBtn}>
            <FileJson size={16} /> Export JSON
          </button>
        </div>
        <button onClick={handleClear} className={`${styles.actionBtn} ${styles.dangerBtn}`}>
          <Trash2 size={16} /> Clear Tracker
        </button>
      </div>

      {/* History Log */}
      <div className={styles.logSection}>
        <div className={styles.sectionHeader}>
          <h3>Detailed Activity Log</h3>
          <Calendar size={18} />
        </div>

        {history.length > 0 ? (
          <div className={styles.logTable}>
            {history.map(item => (
              <div key={item.id} className={styles.logRow}>
                <div className={styles.timeBadge}>
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className={styles.dataContent}>
                  <div className={styles.dataText}>{item.data}</div>
                  <div className={styles.metadata}>
                    {item.isEncrypted && (
                      <span className={styles.secureBadge}><Shield size={10} /> Secure Scan</span>
                    )}
                    <span>ID: {item.id}</span>
                  </div>
                </div>
                <ChevronRight size={16} color="var(--text-dim)" />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Activity size={48} style={{ opacity: 0.1, marginBottom: '1rem' }} />
            <p>No local tracking data available yet. Start scanning to see analytics!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeTracker;

import React, { useState, useMemo } from 'react';
import { 
  Search, Trash2, Download, Star, Share2, 
  ExternalLink, Calendar, Hash, Shield, QrCode as QrIcon,
  Filter, CheckSquare, Square
} from 'lucide-react';
import { getScanHistory, clearScanHistory, type ScanHistory } from '../../../utils/history';
import styles from './HistorySaver.module.css';

const HistorySaver: React.FC = () => {
  const [history, setHistory] = useState<ScanHistory[]>(getScanHistory());
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'secure' | 'standard'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Use local storage to persist favorites (extending our history utility locally)
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('mrbit_scan_favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavs = new Set(favorites);
    if (newFavs.has(id)) newFavs.delete(id);
    else newFavs.add(id);
    setFavorites(newFavs);
    localStorage.setItem('mrbit_scan_favorites', JSON.stringify(Array.from(newFavs)));
  };

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const matchesSearch = item.data.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'all' || 
                           (filter === 'secure' && item.isEncrypted) || 
                           (filter === 'standard' && !item.isEncrypted);
      return matchesSearch && matchesFilter;
    });
  }, [history, searchTerm, filter]);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const deleteSelected = () => {
    if (!selectedIds.size) return;
    if (confirm(`Delete ${selectedIds.size} selected items?`)) {
      const newHistory = history.filter(h => !selectedIds.has(h.id));
      localStorage.setItem('mrbit_scan_history', JSON.stringify(newHistory));
      setHistory(newHistory);
      setSelectedIds(new Set());
    }
  };

  const clearAll = () => {
    if (confirm('Permanently clear all scan history? This action cannot be undone.')) {
      clearScanHistory();
      setHistory([]);
      setSelectedIds(new Set());
      setFavorites(new Set());
      localStorage.removeItem('mrbit_scan_favorites');
    }
  };

  const exportSelection = () => {
    const toExport = history.filter(h => selectedIds.has(h.id) || !selectedIds.size);
    const data = JSON.stringify(toExport, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mrbit_history_export_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className={styles.container}>
      {/* Header with Stats & Actions */}
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className={styles.iconCircle}><QrIcon size={24} /></div>
          <div>
            <h2 style={{ margin: 0 }}>Local History Hub</h2>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              {history.length} records secured on this device
            </p>
          </div>
        </div>

        <div className={styles.globalActions}>
          <button className={styles.secondaryBtn} onClick={clearAll}><Trash2 size={16} /> Clear Hub</button>
          <button className={styles.primaryBtn} onClick={exportSelection}><Download size={16} /> Export Hub</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBar}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search content, IDs, or timestamps..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterRow}>
          <div className={styles.segment}>
            <button className={filter === 'all' ? styles.active : ''} onClick={() => setFilter('all')}>All</button>
            <button className={filter === 'secure' ? styles.active : ''} onClick={() => setFilter('secure')}>Secure</button>
            <button className={filter === 'standard' ? styles.active : ''} onClick={() => setFilter('standard')}>Standard</button>
          </div>
          <button className={styles.filterBtn}><Filter size={16} /> Advanced</button>
        </div>
      </div>

      {/* Selection Toolbar */}
      {selectedIds.size > 0 && (
        <div className={styles.selectionBar}>
          <span>{selectedIds.size} items selected</span>
          <div className={styles.selActions}>
             <button onClick={exportSelection}><Download size={14} /> Export</button>
             <button onClick={deleteSelected} className={styles.danger}><Trash2 size={14} /> Delete</button>
          </div>
        </div>
      )}

      {/* History Grid */}
      <div className={styles.grid}>
        {filteredHistory.length > 0 ? (
          filteredHistory.map(item => (
            <div 
              key={item.id} 
              className={`${styles.itemCard} glass ${selectedIds.has(item.id) ? styles.selected : ''}`}
              onClick={() => toggleSelect(item.id)}
            >
              <div className={styles.cardHeader}>
                 <div className={styles.checkIcon}>
                    {selectedIds.has(item.id) ? <CheckSquare size={18} color="var(--primary)" /> : <Square size={18} />}
                 </div>
                 <div className={styles.idBadge}>ID: {item.id}</div>
                 <button className={styles.favBtn} onClick={(e) => toggleFavorite(item.id, e)}>
                    <Star size={18} fill={favorites.has(item.id) ? '#FFD600' : 'none'} color={favorites.has(item.id) ? '#FFD600' : 'var(--text-dim)'} />
                 </button>
              </div>

              <div className={styles.content}>
                <div className={styles.dataLabel}>{item.data}</div>
                <div className={styles.itemMeta}>
                   <div className={styles.metaLine}><Calendar size={12} /> {new Date(item.timestamp).toLocaleDateString()}</div>
                   <div className={styles.metaLine}><Hash size={12} /> {item.type.toUpperCase()}</div>
                   {item.isEncrypted && <div className={styles.secureLine}><Shield size={12} /> Secure</div>}
                </div>
              </div>

              <div className={styles.cardFooter}>
                 <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(item.data); }}><Share2 size={14} /> Copy</button>
                 {item.data.startsWith('http') && (
                   <a href={item.data} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}><ExternalLink size={14} /> Open</a>
                 )}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
             <Search size={64} style={{ opacity: 0.1, marginBottom: '1.5rem' }} />
             <h3>No matching history</h3>
             <p>Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorySaver;

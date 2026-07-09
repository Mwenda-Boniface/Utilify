import React, { useState, useEffect } from 'react';
import { RefreshCw, Edit3, Save, Trash2, ExternalLink, QrCode } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import styles from './DynamicQRGenerator.module.css';

interface ManagedQR {
  id: string;
  name: string;
  destination: string;
  updatedAt: string;
}

const STORAGE_KEY = 'mrbit_dynamic_qrs';

const DynamicQRGenerator: React.FC = () => {
  const [managedQRs, setManagedQRs] = useState<ManagedQR[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newDest, setNewDest] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(managedQRs));
  }, [managedQRs]);

  const createQR = () => {
    const newItem: ManagedQR = {
      id: Math.random().toString(36).substr(2, 6),
      name: `New QR ${managedQRs.length + 1}`,
      destination: 'https://example.com',
      updatedAt: new Date().toISOString()
    };
    setManagedQRs([newItem, ...managedQRs]);
    startEditing(newItem);
  };

  const startEditing = (qr: ManagedQR) => {
    setEditingId(qr.id);
    setNewName(qr.name);
    setNewDest(qr.destination);
  };

  const saveEdit = () => {
    setManagedQRs(prev => prev.map(qr => 
      qr.id === editingId ? { ...qr, name: newName, destination: newDest, updatedAt: new Date().toISOString() } : qr
    ));
    setEditingId(null);
  };

  const deleteQR = (id: string) => {
    if (confirm('Delete this managed QR? Original prints will no longer point to valid local data.')) {
      setManagedQRs(prev => prev.filter(qr => qr.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <RefreshCw size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Editable (Dynamic) QR Hub</h2>
      </div>

      <div className={styles.layout}>
        {/* Left: List of managed codes */}
        <div className={styles.listPane}>
          <div className={styles.listHeader}>
             <h3>Your Managed Codes</h3>
             <button onClick={createQR} className={styles.createBtn}>Create New</button>
          </div>
          
          <div className={styles.scrollArea}>
            {managedQRs.length > 0 ? (
              managedQRs.map(qr => (
                <div 
                  key={qr.id} 
                  className={`${styles.qrCard} ${editingId === qr.id ? styles.activeCard : ''}`}
                  onClick={() => startEditing(qr)}
                >
                   <div className={styles.cardInfo}>
                      <strong>{qr.name}</strong>
                      <span>{qr.destination}</span>
                   </div>
                   <div className={styles.cardMeta}>
                      <code>ID: {qr.id}</code>
                      <button onClick={(e) => { e.stopPropagation(); deleteQR(qr.id); }}><Trash2 size={14} /></button>
                   </div>
                </div>
              ))
            ) : (
              <div className={styles.empty}>
                 <QrCode size={40} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                 <p>No managed codes yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Editor & Generator */}
        <div className={styles.editorPane}>
          {editingId ? (
            <div className={styles.editor}>
               <div className={styles.field}>
                  <label>Friendly Name</label>
                  <input 
                    type="text" 
                    className={styles.input}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
               </div>
               <div className={styles.field}>
                  <label>Target Destination (Dynamic Content)</label>
                  <textarea 
                    className={styles.textarea}
                    value={newDest}
                    onChange={(e) => setNewDest(e.target.value)}
                  />
               </div>
               
               <div className={styles.previewBox}>
                  <div className={styles.qrWrapper}>
                    <QRCodeCanvas value={newDest} size={220} />
                  </div>
                  <div className={styles.stats}>
                     <p>Last Updated: {new Date(managedQRs.find(q => q.id === editingId)?.updatedAt || '').toLocaleString()}</p>
                     <button className={styles.saveBtn} onClick={saveEdit}><Save size={16} /> Save Changes</button>
                  </div>
               </div>

               <div className={`${styles.info} glass`}>
                  <ExternalLink size={14} />
                  <p>In offline mode, "Dynamic" means you can re-generate the same label branding with different content without changing settings.</p>
               </div>
            </div>
          ) : (
            <div className={styles.editorEmpty}>
               <Edit3 size={48} />
               <h3>Select a QR to Edit</h3>
               <p>Create or select a managed QR from the list to update its destination.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicQRGenerator;

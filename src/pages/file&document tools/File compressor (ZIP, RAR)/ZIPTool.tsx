import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Archive, Plus, Trash2, Download, File, Loader2 } from 'lucide-react';
import styles from './ZIPTool.module.css';

interface QueuedFile {
  id: string;
  file: File;
}

const ZIPTool: React.FC = () => {
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [zipName, setZipName] = useState('archive');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const createZip = async () => {
    if (files.length === 0) return;
    setCompressing(true);
    
    try {
      const zip = new JSZip();
      files.forEach(f => {
        zip.file(f.file.name, f.file);
      });
      
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${zipName || 'archive'}.zip`);
    } catch (error) {
      console.error('ZIP Error:', error);
    } finally {
      setCompressing(false);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.workspace}>
        <div className={styles.config}>
          <label className={styles.label}>Archive Name</label>
          <div className={styles.inputWrapper}>
            <input 
              type="text" 
              className={styles.textInput}
              value={zipName}
              onChange={(e) => setZipName(e.target.value)}
              placeholder="archive"
            />
            <span className={styles.extension}>.zip</span>
          </div>
        </div>

        <div className={styles.dropZone}>
          <input 
            type="file" 
            id="zip-upload" 
            hidden 
            multiple 
            onChange={handleFileUpload} 
          />
          <label htmlFor="zip-upload" className={styles.uploadPrompt}>
            <Plus size={40} />
            <p>Add files to compress</p>
          </label>
        </div>

        <div className={styles.fileList}>
          {files.map(f => (
            <div key={f.id} className={styles.fileItem}>
              <div className={styles.fileInfo}>
                <File size={18} className={styles.fileIcon} />
                <span>{f.file.name}</span>
                <span className={styles.fileSize}>({(f.file.size / 1024).toFixed(1)} KB)</span>
              </div>
              <button className={styles.removeBtn} onClick={() => removeFile(f.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button 
            className={styles.mainBtn} 
            disabled={files.length === 0 || compressing}
            onClick={createZip}
          >
            {compressing ? <Loader2 className={styles.spinner} /> : <Download size={20} />}
            {compressing ? 'Creating ZIP...' : 'Generate & Download ZIP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZIPTool;

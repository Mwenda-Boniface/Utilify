import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { FileText, Plus, Trash2, Scissors, Combine, Loader2, ArrowUp, ArrowDown, Download, RefreshCw, Check, AlertCircle } from 'lucide-react';
import styles from './PDFTools.module.css';

interface PDFFile {
  id: string;
  name: string;
  file: File;
  pages?: number;
}

const PDFTools: React.FC = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [mode, setMode] = useState<'merge' | 'split'>('merge');
  const [progress, setProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [success, setSuccess] = useState(false);

  // Custom output filename states
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [customName, setCustomName] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState('');

  // Clean up Blob URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      file: file
    }));
    setFiles(prev => [...prev, ...newFiles]);
    setSuccess(false);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setSuccess(false);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newFiles.length) {
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      setFiles(newFiles);
      setSuccess(false);
    }
  };

  const triggerMergePrompt = () => {
    if (files.length < 2) return;
    const defaultName = files[0].name.replace('.pdf', '') + '_merged';
    setCustomName(defaultName);
    setShowNamePrompt(true);
  };

  const handleMergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    setShowNamePrompt(false);
    startMerge();
  };

  const startMerge = async () => {
    setProcessing(true);
    setSuccess(false);
    setProgress(0);
    setTotalPages(files.length);

    try {
      const mergedPdf = await PDFDocument.create();
      
      for (let i = 0; i < files.length; i++) {
        const pdfFile = files[i];
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const donorPdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(donorPdf, donorPdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
        
        // Update merging progress
        setProgress(i + 1);
        // Artifically wait for a short duration to ensure UI animation registers
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const name = customName.trim().endsWith('.pdf') ? customName.trim() : `${customName.trim()}.pdf`;

      setDownloadUrl(url);
      setDownloadName(name);
      setSuccess(true);
    } catch (error) {
      console.error('Merge Error:', error);
      alert('Error merging files. Make sure they are valid PDF documents.');
    } finally {
      setProcessing(false);
    }
  };

  const triggerSplitPrompt = () => {
    if (files.length !== 1) return;
    const defaultName = files[0].name.replace('.pdf', '') + '_split';
    setCustomName(defaultName);
    setShowNamePrompt(true);
  };

  const handleSplitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    setShowNamePrompt(false);
    startSplit();
  };

  const startSplit = async () => {
    setProcessing(true);
    setProgress(0);
    setSuccess(false);
    
    try {
      const arrayBuffer = await files[0].file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const pageCount = sourcePdf.getPageCount();
      setTotalPages(pageCount);
      
      const zip = new JSZip();
      const baseName = customName.trim();
      const folderName = `${baseName}_pages`;
      const zipFileName = baseName.endsWith('.zip') ? baseName : `${baseName}.zip`;

      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [i]);
        newPdf.addPage(copiedPage);
        const pdfBytes = await newPdf.save();
        
        zip.file(`${folderName}/${baseName}_page_${i + 1}.pdf`, pdfBytes);
        
        setProgress(i + 1);
        await new Promise(resolve => setTimeout(resolve, 100)); // Delay for smooth animation
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);

      setDownloadUrl(url);
      setDownloadName(zipFileName);
      setSuccess(true);
    } catch (error) {
      console.error('Split Error:', error);
      alert(`Error splitting PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    setFiles([]);
    setDownloadUrl(null);
    setDownloadName('');
    setSuccess(false);
    setProgress(0);
    setTotalPages(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button 
          className={mode === 'merge' ? styles.activeTab : styles.tab} 
          onClick={() => { setMode('merge'); handleReset(); }}
          disabled={processing}
        >
          <Combine size={18} />
          Merge PDFs
        </button>
        <button 
          className={mode === 'split' ? styles.activeTab : styles.tab} 
          onClick={() => { setMode('split'); handleReset(); }}
          disabled={processing}
        >
          <Scissors size={18} />
          Split PDF
        </button>
      </div>

      <div className={styles.workspace}>
        {/* Left pane: Upload area */}
        <div className={styles.leftPane}>
          <input 
            type="file" 
            id="pdf-upload" 
            hidden 
            multiple={mode === 'merge'} 
            accept=".pdf" 
            onChange={handleFileUpload} 
            disabled={processing || success}
          />
          <label 
            htmlFor="pdf-upload" 
            className={`${styles.addCard} ${(processing || success) ? styles.disabledCard : ''}`}
          >
            <Plus size={32} />
            <p>{mode === 'merge' ? 'Add PDF Files' : 'Select PDF to Split'}</p>
            <span>Supports .pdf format</span>
          </label>
        </div>

        {/* Right pane: Output list & Action trigger */}
        <div className={styles.rightPane}>
          <div className={styles.fileListHeader}>
            <h4>{mode === 'merge' ? 'Merge Queue' : 'Target Document'}</h4>
            <span className={styles.fileCountBadge}>
              {files.length} {files.length === 1 ? 'File' : 'Files'}
            </span>
          </div>

          {files.length > 0 ? (
            <div className={styles.fileList}>
              {files.map((file, index) => (
                <div key={file.id} className={styles.fileCard}>
                  <div className={styles.fileInfo}>
                    <FileText size={20} className={styles.pdfIcon} />
                    <span title={file.name}>{file.name}</span>
                  </div>
                  <div className={styles.fileActions}>
                    {mode === 'merge' && !processing && !success && (
                      <>
                        <button onClick={() => moveFile(index, 'up')} disabled={index === 0}><ArrowUp size={16} /></button>
                        <button onClick={() => moveFile(index, 'down')} disabled={index === files.length - 1}><ArrowDown size={16} /></button>
                      </>
                    )}
                    {!processing && !success && (
                      <button className={styles.deleteBtn} onClick={() => removeFile(file.id)}><Trash2 size={16} /></button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No PDF documents uploaded. Select files on the left to start.</p>
            </div>
          )}

          <div className={styles.actionArea}>
            {success && downloadUrl ? (
              <div className={styles.successActions}>
                <a 
                  href={downloadUrl} 
                  download={downloadName} 
                  className={styles.downloadLink}
                >
                  <Download size={20} />
                  <span className={styles.downloadTextFull}>Download {downloadName}</span>
                  <span className={styles.downloadTextMobile}>Download</span>
                </a>
                <button className={styles.secondaryBtn} onClick={handleReset}>
                  <RefreshCw size={16} /> Reset Workspace
                </button>
              </div>
            ) : mode === 'merge' ? (
              <div className={styles.progressSection}>
                {processing && (
                  <div className={styles.progressContainer}>
                    <div className={styles.progressText}>
                      Merging documents... ({progress}/{totalPages})
                    </div>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${(progress / totalPages) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                <button 
                  className={styles.mainBtn} 
                  disabled={files.length < 2 || processing}
                  onClick={triggerMergePrompt}
                >
                  {processing ? <Loader2 className={styles.spinner} /> : <Combine size={20} />}
                  {processing 
                    ? 'Processing...' 
                    : files.length < 2 
                    ? 'Upload 2+ Files to Merge' 
                    : `Merge ${files.length} Files`}
                </button>
              </div>
            ) : (
              <div className={styles.splitActions}>
                {processing && (
                  <div className={styles.progressContainer}>
                    <div className={styles.progressText}>
                      Splitting document pages... ({progress}/{totalPages})
                    </div>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${(progress / totalPages) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                <button 
                  className={styles.mainBtn} 
                  disabled={files.length !== 1 || processing}
                  onClick={triggerSplitPrompt}
                >
                  {processing ? <Loader2 className={styles.spinner} /> : <Scissors size={20} />}
                  {processing ? 'Processing...' : 'Split PDF into Pages'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Filename Prompt Modal */}
      {showNamePrompt && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Output Configuration</h3>
            <p>Please enter a filename for the output file:</p>
            <form onSubmit={mode === 'merge' ? handleMergeSubmit : handleSplitSubmit}>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  value={customName} 
                  onChange={(e) => setCustomName(e.target.value)} 
                  placeholder="custom_filename"
                  className={styles.modalInput}
                  autoFocus
                  required
                />
                <span className={styles.extensionSuffix}>{mode === 'merge' ? '.pdf' : '.zip'}</span>
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.confirmBtn} disabled={!customName.trim()}>
                  Confirm & Start
                </button>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowNamePrompt(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFTools;

import React, { useState } from 'react';
import JSZip from 'jszip';
import { jsPDF } from 'jspdf';
import { Presentation, Upload, Download, Loader2, Check, AlertCircle } from 'lucide-react';
import styles from './PowerPointToPDF.module.css';

const PowerPointToPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.pptx')) {
      setFile(selectedFile);
      setSuccess(false);
      setError(null);
    } else {
      setError('Please select a valid .pptx file');
    }
  };

  const convertToPDF = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const zip = new JSZip();
      const content = await zip.loadAsync(file);
      
      const doc = new jsPDF();
      let hasContent = false;

      // Extract text from slide XMLs
      const slideFiles = Object.keys(content.files).filter(name => name.startsWith('ppt/slides/slide'));
      
      for (let i = 1; i <= slideFiles.length; i++) {
        const slideXml = await content.file(`ppt/slides/slide${i}.xml`)?.async('text');
        if (slideXml) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(slideXml, "text/xml");
          const texts = Array.from(xmlDoc.getElementsByTagName('a:t')).map(t => t.textContent).join(' ');
          
          if (i > 1) doc.addPage();
          const splitText = doc.splitTextToSize(texts, 180);
          doc.text(splitText, 15, 20);
          hasContent = true;
        }
      }

      if (!hasContent) throw new Error('No text content found');
      
      doc.save(`${file.name.replace('.pptx', '')}.pdf`);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to extract presentation content. This tool currently supports text-based PPTX files.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <label className={styles.dropZone}>
          <input type="file" hidden accept=".pptx" onChange={handleFileChange} />
          <div className={styles.uploadPrompt}>
            {file ? (
              <>
                <Presentation size={48} className={styles.fileIcon} />
                <p className={styles.fileName}>{file.name}</p>
                <span className={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
              </>
            ) : (
              <>
                <Upload size={48} />
                <p>Click or drag .pptx file to upload</p>
                <span>Converts PowerPoint to text-based PDF</span>
              </>
            )}
          </div>
        </label>

        {error && (
          <div className={styles.errorMsg}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <div className={styles.actions}>
          <button 
            className={styles.mainBtn} 
            disabled={!file || processing}
            onClick={convertToPDF}
          >
            {processing ? <Loader2 className={styles.spinner} /> : success ? <Check size={20} /> : <Download size={20} />}
            {processing ? 'Processing Slides...' : success ? 'Converted!' : 'Convert to PDF'}
          </button>
          
          {success && (
            <button className={styles.secondaryBtn} onClick={() => { setFile(null); setSuccess(false); }}>
              Convert Another
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PowerPointToPDF;

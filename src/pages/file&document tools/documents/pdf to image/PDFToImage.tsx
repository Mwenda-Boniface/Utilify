import React, { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { FileImage, Upload, Download, Loader2, Check, AlertCircle } from 'lucide-react';
import styles from './PDFToImage.module.css';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFToImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setSuccess(false);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const convertToImage = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      
      // Convert all pages to images
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport, canvas: canvas }).promise;
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = imgData;
          link.download = `${file.name.replace('.pdf', '')}_page_${i}.png`;
          link.click();
        }
      }
      
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to process PDF. Make sure it is not password protected.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <label className={styles.dropZone}>
          <input type="file" hidden accept=".pdf" onChange={handleFileChange} />
          <div className={styles.uploadPrompt}>
            {file ? (
              <>
                <FileImage size={48} className={styles.fileIcon} />
                <p className={styles.fileName}>{file.name}</p>
                <span className={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
              </>
            ) : (
              <>
                <Upload size={48} />
                <p>Click or drag PDF file to upload</p>
                <span>Converts pages to PNG images</span>
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
            onClick={convertToImage}
          >
            {processing ? <Loader2 className={styles.spinner} /> : success ? <Check size={20} /> : <Download size={20} />}
            {processing ? 'Processing Pages...' : success ? 'Downloaded All!' : 'Convert to Images'}
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

export default PDFToImage;

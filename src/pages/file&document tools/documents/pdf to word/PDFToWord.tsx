import React, { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { FileType, Upload, Download, Loader2, Check, AlertCircle } from 'lucide-react';
import styles from './PDFToWord.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFToWord: React.FC = () => {
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

  const convertToWord = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      
      const paragraphs: Paragraph[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item: any) => item.str).join(' ');
        
        paragraphs.push(new Paragraph({
          children: [new TextRun(text)],
        }));
      }

      const doc = new Document({
        sections: [{
          properties: {},
          children: paragraphs,
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${file.name.replace('.pdf', '')}.docx`);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to extract text from PDF. The file might be scan-based (OCR required) or encrypted.');
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
                <FileType size={48} className={styles.fileIcon} />
                <p className={styles.fileName}>{file.name}</p>
                <span className={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
              </>
            ) : (
              <>
                <Upload size={48} />
                <p>Click or drag PDF file to upload</p>
                <span>Converts PDF text to Word document</span>
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
            onClick={convertToWord}
          >
            {processing ? <Loader2 className={styles.spinner} /> : success ? <Check size={20} /> : <Download size={20} />}
            {processing ? 'Extracting Text...' : success ? 'Converted!' : 'Convert to Word'}
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

export default PDFToWord;

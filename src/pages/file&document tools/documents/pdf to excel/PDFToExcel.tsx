import React, { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import * as XLSX from 'xlsx';
import { FileSpreadsheet, Upload, Download, Loader2, Check, AlertCircle } from 'lucide-react';
import styles from './PDFToExcel.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFToExcel: React.FC = () => {
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

  const convertToExcel = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      
      const rows: string[][] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Simple heuristic: combine items on similar Y-axis into rows
        const items: any[] = textContent.items;
        const sortedItems = items.sort((a, b) => b.transform[5] - a.transform[5] || a.transform[4] - b.transform[4]);
        
        let currentY = -1;
        let currentRow: string[] = [];

        sortedItems.forEach(item => {
          if (Math.abs(item.transform[5] - currentY) > 5) {
            if (currentRow.length > 0) rows.push(currentRow);
            currentRow = [];
            currentY = item.transform[5];
          }
          currentRow.push(item.str);
        });
        if (currentRow.length > 0) rows.push(currentRow);
      }

      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Extracted Data");
      
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace('.pdf', '')}.xlsx`;
      link.click();
      URL.revokeObjectURL(url);
      
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to extract data. This tool works best with tabular PDFs.');
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
                <FileSpreadsheet size={48} className={styles.fileIcon} />
                <p className={styles.fileName}>{file.name}</p>
                <span className={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
              </>
            ) : (
              <>
                <Upload size={48} />
                <p>Click or drag PDF file to upload</p>
                <span>Best for tabular PDF documents</span>
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
            onClick={convertToExcel}
          >
            {processing ? <Loader2 className={styles.spinner} /> : success ? <Check size={20} /> : <Download size={20} />}
            {processing ? 'Extracting Rows...' : success ? 'Converted!' : 'Convert to Excel'}
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

export default PDFToExcel;

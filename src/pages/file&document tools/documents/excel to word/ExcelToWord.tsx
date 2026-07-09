import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import { FileType, Upload, Download, Loader2, Check, AlertCircle } from 'lucide-react';
import styles from './ExcelToWord.module.css';

const ExcelToWord: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls'))) {
      setFile(selectedFile);
      setSuccess(false);
      setError(null);
    } else {
      setError('Please select a valid Excel file');
    }
  };

  const convertToWord = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const tableRows = jsonData.map(row => {
        return new TableRow({
          children: row.map(cell => new TableCell({
            children: [new Paragraph(String(cell || ''))],
          })),
        });
      });

      const table = new Table({
        rows: tableRows,
        width: { size: 100, type: WidthType.PERCENTAGE },
      });

      const doc = new Document({
        sections: [{
          children: [
            new Paragraph({ text: `Extracted from: ${file.name}`, heading: 'Heading1' }),
            new Paragraph({ text: "" }),
            table
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${file.name.split('.')[0]}.docx`);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to process Excel. Make sure it is a valid spreadsheet.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <label className={styles.dropZone}>
          <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileChange} />
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
                <p>Click or drag Excel file to upload</p>
                <span>Converts spreadsheet to Word table</span>
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
            {processing ? 'Constructing Table...' : success ? 'Converted!' : 'Convert to Word'}
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

export default ExcelToWord;

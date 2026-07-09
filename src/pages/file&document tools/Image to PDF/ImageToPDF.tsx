import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Plus, Trash2, Download, Loader2 } from 'lucide-react';
import styles from './ImageToPDF.module.css';

interface ImageFile {
  id: string;
  name: string;
  data: string;
  file: File;
}

const ImageToPDF: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prev => [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          data: reader.result as string,
          file: file
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const convertToPDF = async () => {
    if (images.length === 0) return;
    setProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();
      
      for (const img of images) {
        const imageBytes = await img.file.arrayBuffer();
        let pdfImage;
        
        if (img.file.type === 'image/jpeg' || img.file.type === 'image/jpg') {
          pdfImage = await pdfDoc.embedJpg(imageBytes);
        } else if (img.file.type === 'image/png') {
          pdfImage = await pdfDoc.embedPng(imageBytes);
        } else {
          continue; // Skip unsupported
        }

        const page = pdfDoc.addPage([pdfImage.width, pdfImage.height]);
        page.drawImage(pdfImage, {
          x: 0,
          y: 0,
          width: pdfImage.width,
          height: pdfImage.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'images_to_pdf.pdf';
      link.click();
    } catch (error) {
      console.error('PDF Error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.workspace}>
        <div className={styles.grid}>
          <input 
            type="file" 
            id="img-to-pdf-upload" 
            hidden 
            multiple 
            accept="image/png, image/jpeg" 
            onChange={handleImageUpload} 
          />
          <label htmlFor="img-to-pdf-upload" className={styles.addCard}>
            <Plus size={32} />
            <p>Add Images</p>
            <span>JPG or PNG</span>
          </label>

          {images.map(img => (
            <div key={img.id} className={styles.imageCard}>
              <img src={img.data} alt="Preview" />
              <div className={styles.overlay}>
                <span className={styles.fileName}>{img.name}</span>
                <button className={styles.removeBtn} onClick={() => removeImage(img.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {images.length > 0 && (
          <div className={styles.actions}>
            <button 
              className={styles.mainBtn} 
              disabled={processing}
              onClick={convertToPDF}
            >
              {processing ? <Loader2 className={styles.spinner} /> : <Download size={20} />}
              {processing ? 'Generating PDF...' : `Convert ${images.length} Images to PDF`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToPDF;

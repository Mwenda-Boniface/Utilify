import React from 'react';
import { FileWarning, Upload, AlertCircle } from 'lucide-react';
import styles from './UniversalDocTool.module.css';

interface Props {
  title: string;
  description: string;
}

const UniversalDocTool: React.FC<Props> = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.infoCard}>
          <AlertCircle size={32} className={styles.warnIcon} />
          <h4>Advanced Format Notice</h4>
          <p>
            Publisher (.pub) files are a proprietary Microsoft format that requires specific server-side processing for full conversion. 
            We are working on adding local support for this format in a future update!
          </p>
          <div className={styles.statusBadge}>Development in Progress</div>
        </div>

        <label className={styles.dropZone} style={{ opacity: 0.5, cursor: 'not-allowed' }}>
          <div className={styles.uploadPrompt}>
            <Upload size={48} />
            <p>Direct browser support for this format is coming soon.</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default UniversalDocTool;

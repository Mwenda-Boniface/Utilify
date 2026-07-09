import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, AlignLeft, Clock } from 'lucide-react';
import BaseQRGenerator from '../../../components/BaseQRGenerator';
import styles from '../../../components/BaseQRGenerator.module.css';

const EventQRGenerator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const formatICSDate = (dateStr: string) => {
    if (!dateStr) return '';
    // Input is usually "2023-10-10T10:00"
    // ICS needs "YYYYMMDDTHHMMSSZ"
    return dateStr.replace(/[-:]/g, '') + '00Z';
  };

  const qrValue = useMemo(() => {
    if (!title) return '';
    
    const vEvent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      location ? `LOCATION:${location}` : '',
      description ? `DESCRIPTION:${description}` : '',
      startDate ? `DTSTART:${formatICSDate(startDate)}` : '',
      endDate ? `DTEND:${formatICSDate(endDate)}` : '',
      'END:VEVENT',
      'END:VCALENDAR'
    ].filter(Boolean).join('\n');

    return vEvent;
  }, [title, location, description, startDate, endDate]);

  return (
    <BaseQRGenerator 
      title="Event (Calendar) QR Generator" 
      qrValue={qrValue} 
      icon={<Calendar size={20} />}
    >
      <div className={styles.settings}>
        <div className={styles.field}>
          <label><Calendar size={16} /> Event Title</label>
          <input 
            type="text"
            className={styles.input}
            placeholder="e.g. Grand Opening"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label><MapPin size={16} /> Location</label>
          <input 
            type="text"
            className={styles.input}
            placeholder="Address or Meeting Link"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className={styles.brandingGrid}>
          <div className={styles.field}>
            <label><Clock size={16} /> Start Time</label>
            <input 
              type="datetime-local"
              className={styles.input}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label><Clock size={16} /> End Time</label>
            <input 
              type="datetime-local"
              className={styles.input}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label><AlignLeft size={16} /> Description</label>
          <textarea 
            className={`${styles.input} styles.textarea`}
            style={{ minHeight: '80px' }}
            placeholder="Details about the event..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </BaseQRGenerator>
  );
};

export default EventQRGenerator;

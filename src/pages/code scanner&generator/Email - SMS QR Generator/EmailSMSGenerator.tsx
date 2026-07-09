import React, { useState, useMemo } from 'react';
import { Mail, MessageSquare, Send, User, Type } from 'lucide-react';
import BaseQRGenerator from '../../../components/BaseQRGenerator';
import styles from '../../../components/BaseQRGenerator.module.css';

const EmailSMSGenerator: React.FC = () => {
  const [mode, setMode] = useState<'email' | 'sms'>('email');
  
  // Email states
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  // SMS states
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const qrValue = useMemo(() => {
    if (mode === 'email') {
      if (!email) return '';
      // MATMSG protocol is widely supported by scanners
      return `MATMSG:TO:${email};SUB:${subject};BODY:${body};;`;
    } else {
      if (!phone) return '';
      // SMSTO protocol
      return `SMSTO:${phone}:${message}`;
    }
  }, [mode, email, subject, body, phone, message]);

  return (
    <BaseQRGenerator 
      title={mode === 'email' ? 'Email QR Generator' : 'SMS QR Generator'} 
      qrValue={qrValue} 
      icon={mode === 'email' ? <Mail size={20} /> : <MessageSquare size={20} />}
    >
      <div className={styles.settings}>
        {/* Mode Switcher */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button 
            className={`${styles.input} ${mode === 'email' ? styles.activeTab : ''}`}
            onClick={() => setMode('email')}
            style={{ flex: 1, padding: '0.75rem', fontWeight: 700, borderColor: mode === 'email' ? 'var(--primary)' : 'var(--border)' }}
          >
            <Mail size={16} /> Email
          </button>
          <button 
            className={`${styles.input} ${mode === 'sms' ? styles.activeTab : ''}`}
            onClick={() => setMode('sms')}
            style={{ flex: 1, padding: '0.75rem', fontWeight: 700, borderColor: mode === 'sms' ? 'var(--primary)' : 'var(--border)' }}
          >
            <MessageSquare size={16} /> SMS
          </button>
        </div>

        {mode === 'email' ? (
          <div className={styles.inputStack} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className={styles.field}>
              <label><User size={16} /> Recipient Email</label>
              <input 
                type="email"
                className={styles.input}
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label><Type size={16} /> Subject</label>
              <input 
                type="text"
                className={styles.input}
                placeholder="Inquiry about services"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label><Send size={16} /> Message Body</label>
              <textarea 
                className={`${styles.input} styles.textarea`}
                style={{ minHeight: '100px' }}
                placeholder="Type your message here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className={styles.inputStack} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className={styles.field}>
              <label><User size={16} /> Phone Number</label>
              <input 
                type="tel"
                className={styles.input}
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label><MessageSquare size={16} /> SMS Text</label>
              <textarea 
                className={`${styles.input} styles.textarea`}
                style={{ minHeight: '120px' }}
                placeholder="I am interested in your listing..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </BaseQRGenerator>
  );
};

export default EmailSMSGenerator;

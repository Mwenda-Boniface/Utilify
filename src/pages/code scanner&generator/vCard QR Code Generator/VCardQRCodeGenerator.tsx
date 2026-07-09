import React, { useState, useMemo } from 'react';
import { User, Phone, Mail, Globe, Briefcase } from 'lucide-react';
import BaseQRGenerator from '../../../components/BaseQRGenerator';
import styles from '../../../components/BaseQRGenerator.module.css';

const VCardQRCodeGenerator: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [title, setTitle] = useState('');
  const [website, setWebsite] = useState('');

  const qrValue = useMemo(() => {
    if (!firstName && !lastName) return '';
    
    // vCard 3.0 Format
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${lastName};${firstName};;;`,
      `FN:${firstName} ${lastName}`,
      org ? `ORG:${org}` : '',
      title ? `TITLE:${title}` : '',
      phone ? `TEL;TYPE=CELL:${phone}` : '',
      email ? `EMAIL:${email}` : '',
      website ? `URL:${website}` : '',
      'END:VCARD'
    ].filter(Boolean).join('\n');

    return vcard;
  }, [firstName, lastName, phone, email, org, title, website]);

  return (
    <BaseQRGenerator 
      title="vCard Contact Generator" 
      qrValue={qrValue} 
      icon={<User size={20} />}
    >
      <div className={styles.settings}>
        <div className={styles.brandingGrid}>
          <div className={styles.field}>
            <label><User size={16} /> First Name</label>
            <input 
              type="text"
              className={styles.input}
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label><User size={16} /> Last Name</label>
            <input 
              type="text"
              className={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.brandingGrid}>
          <div className={styles.field}>
            <label><Phone size={16} /> Phone</label>
            <input 
              type="tel"
              className={styles.input}
              placeholder="+1 234 567 890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label><Mail size={16} /> Email</label>
            <input 
              type="email"
              className={styles.input}
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.brandingGrid}>
          <div className={styles.field}>
            <label><Briefcase size={16} /> Organization</label>
            <input 
              type="text"
              className={styles.input}
              placeholder="Company Name"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label><Briefcase size={16} /> Job Title</label>
            <input 
              type="text"
              className={styles.input}
              placeholder="Designer / Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label><Globe size={16} /> Website</label>
          <input 
            type="url"
            className={styles.input}
            placeholder="https://example.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </div>
    </BaseQRGenerator>
  );
};

export default VCardQRCodeGenerator;

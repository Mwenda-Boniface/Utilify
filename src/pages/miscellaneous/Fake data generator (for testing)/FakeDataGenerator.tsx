import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Database, User, Mail, MapPin, Phone, Copy, Check, RefreshCw, FileText } from 'lucide-react';
import styles from './FakeDataGenerator.module.css';

const FakeDataGenerator: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [count, setCount] = useState(5);
  const [copied, setCopied] = useState(false);

  const generateData = () => {
    const newItems = Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: `${faker.location.city()}, ${faker.location.country()}`,
      job: faker.person.jobTitle(),
      company: faker.company.name()
    }));
    setData(newItems);
  };

  const copyAsJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <div className={styles.controls}>
          <div className={styles.countPicker}>
            <label>Records to Generate: {count}</label>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={count} 
              onChange={(e) => setCount(parseInt(e.target.value))}
              className={styles.slider}
            />
          </div>
          <div className={styles.actions}>
            <button className={styles.mainBtn} onClick={generateData}>
              <RefreshCw size={18} /> Generate New
            </button>
            <button className={styles.secondaryBtn} onClick={copyAsJSON} disabled={data.length === 0}>
              {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
              Copy JSON
            </button>
          </div>
        </div>

        <div className={styles.resultsArea}>
          {data.length > 0 ? (
            <div className={styles.dataGrid}>
              {data.map((item) => (
                <div key={item.id} className={styles.dataCard}>
                  <div className={styles.cardMain}>
                    <User size={16} className={styles.icon} />
                    <strong>{item.name}</strong>
                  </div>
                  <div className={styles.details}>
                    <div className={styles.detailRow}><Mail size={14} /> {item.email}</div>
                    <div className={styles.detailRow}><Phone size={14} /> {item.phone}</div>
                    <div className={styles.detailRow}><MapPin size={14} /> {item.address}</div>
                    <div className={styles.detailRow}><FileText size={14} /> {item.job} @ {item.company}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No data generated yet. Click generate to start.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FakeDataGenerator;

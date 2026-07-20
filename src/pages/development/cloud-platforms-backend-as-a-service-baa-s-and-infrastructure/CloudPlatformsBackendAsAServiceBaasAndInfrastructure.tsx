import React from 'react';
import { Code, ArrowUpRight } from 'lucide-react';
import styles from './CloudPlatformsBackendAsAServiceBaasAndInfrastructure.module.css';
import { CLOUDPLATFORMSBACKENDASASERVICEBAASANDINFRASTRUCTURE_ITEMS } from './cloudPlatformsBackendAsAServiceBaaSAndInfrastructureData.ts';

interface Props { searchValue?: string; }

const CloudPlatformsBackendAsAServiceBaasAndInfrastructureCategory: React.FC<Props> = ({ searchValue = '' }) => {
  const filteredItems = CLOUDPLATFORMSBACKENDASASERVICEBAASANDINFRASTRUCTURE_ITEMS.filter(item =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Code size={26} className={styles.icon} />
          <h2>Cloud Platforms, Backend as a Service (BaaS), and Infrastructure</h2>
        </div>
      </header>
      <div className={styles.cardsGrid}>
        {filteredItems.length === 0 ? (
          <div className={styles.emptyState}>No items found matching "{searchValue}"</div>
        ) : (
          filteredItems.map(item => (
            <div key={item.name} className={`${styles.card} glass`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4>{item.name}</h4>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </div>
              {item.desc && <p className={styles.cardDesc}>{item.desc}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CloudPlatformsBackendAsAServiceBaasAndInfrastructureCategory;

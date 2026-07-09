import { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('Tools');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  // Sync state changes to browser hash
  useEffect(() => {
    let targetHash = '#/tools';
    if (activeTab === 'History') {
      targetHash = '#/history';
    } else if (activeTab === 'About') {
      targetHash = '#/about';
    } else if (activeTab === 'Tools' && selectedToolId) {
      targetHash = `#/tools/${selectedToolId}`;
    }
    
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  }, [activeTab, selectedToolId]);

  // Listen to browser back/forward clicks (hash changes)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/tools/')) {
        const toolId = hash.replace('#/tools/', '');
        setActiveTab('Tools');
        setSelectedToolId(toolId);
      } else if (hash === '#/history') {
        setActiveTab('History');
        setSelectedToolId(null);
      } else if (hash === '#/about') {
        setActiveTab('About');
        setSelectedToolId(null);
      } else {
        setActiveTab('Tools');
        setSelectedToolId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Parse current hash on page mount/load
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedToolId(null);
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={handleTabChange} isToolOpen={!!selectedToolId}>
      <Dashboard 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        selectedToolId={selectedToolId}
        setSelectedToolId={setSelectedToolId}
      />
    </Layout>
  );
}

export default App;

import { useState, useEffect, useRef } from 'react';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('Tools');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const lastScrollY = useRef(0);

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

  // Keep track of and restore landing page scroll position when navigating back
  useEffect(() => {
    if (activeTab === 'Tools' && !selectedToolId) {
      const target = lastScrollY.current;
      console.log('[Utilify] Returning to Tools landing page. Target scroll Y:', target);
      if (target === 0) return;

      let attempts = 0;
      const interval = setInterval(() => {
        window.scrollTo({
          top: target,
          behavior: 'instant' as ScrollBehavior
        });
        attempts++;
        console.log(`[Utilify] Scroll restore attempt ${attempts}. Current scrollY:`, window.scrollY);
        if (attempts >= 12 || window.scrollY >= target - 5) {
          clearInterval(interval);
          console.log('[Utilify] Scroll restoration completed successfully.');
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [selectedToolId, activeTab]);

  // Listen to browser back/forward clicks (hash changes)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/tools/')) {
        const toolId = hash.replace('#/tools/', '');
        // Capture scroll Y before we enter the tool if we are not already in one
        if (!selectedToolId) {
          lastScrollY.current = window.scrollY;
        }
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
  }, [selectedToolId]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedToolId(null);
  };

  const handleSelectTool = (toolId: string | null) => {
    if (toolId) {
      lastScrollY.current = window.scrollY;
      console.log('[Utilify] Captured scroll Y position before tool load:', lastScrollY.current);
    }
    setSelectedToolId(toolId);
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={handleTabChange} isToolOpen={!!selectedToolId}>
      <Dashboard 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        selectedToolId={selectedToolId}
        setSelectedToolId={handleSelectTool}
      />
    </Layout>
  );
}

export default App;

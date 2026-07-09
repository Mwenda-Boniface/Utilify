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
    } else if (activeTab === 'Contact') {
      targetHash = '#/contact';
    } else if (activeTab === 'Privacy') {
      targetHash = '#/privacy';
    } else if (activeTab === 'Terms') {
      targetHash = '#/terms';
    } else if (activeTab === 'Sitemap') {
      targetHash = '#/sitemap';
    } else if (activeTab === '404') {
      targetHash = '#/404';
    } else if (activeTab === 'Tools' && selectedToolId) {
      targetHash = `#/tools/${selectedToolId}`;
    }
    
    if (window.location.hash !== targetHash && activeTab !== '404') {
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
        // Capture scroll Y before we enter the tool if we are not already in one, and only if Y > 0
        if (!selectedToolId && window.scrollY > 0) {
          lastScrollY.current = window.scrollY;
          console.log('[Utilify] Hashchange scroll capture:', lastScrollY.current);
        }
        setActiveTab('Tools');
        setSelectedToolId(toolId);
      } else if (hash === '#/history') {
        setActiveTab('History');
        setSelectedToolId(null);
      } else if (hash === '#/about') {
        setActiveTab('About');
        setSelectedToolId(null);
      } else if (hash === '#/contact') {
        setActiveTab('Contact');
        setSelectedToolId(null);
      } else if (hash === '#/privacy') {
        setActiveTab('Privacy');
        setSelectedToolId(null);
      } else if (hash === '#/terms') {
        setActiveTab('Terms');
        setSelectedToolId(null);
      } else if (hash === '#/sitemap') {
        setActiveTab('Sitemap');
        setSelectedToolId(null);
      } else if (hash === '' || hash === '#/' || hash === '#/tools') {
        setActiveTab('Tools');
        setSelectedToolId(null);
      } else {
        setActiveTab('404');
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
    if (toolId && window.scrollY > 0) {
      lastScrollY.current = window.scrollY;
      console.log('[Utilify] Synchronous click scroll Y capture:', lastScrollY.current);
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

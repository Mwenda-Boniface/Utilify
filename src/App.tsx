import { useState, useEffect, useRef } from 'react';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  // Initialize activeTab from URL hash to maintain state on page reload
  const getInitialTab = () => {
    const hash = window.location.hash;
    if (hash.startsWith('#/tools/')) return 'Tools';
    if (hash === '#/history') return 'History';
    if (hash === '#/about') return 'About';
    if (hash === '#/contact') return 'Contact';
    if (hash === '#/privacy') return 'Privacy';
    if (hash === '#/terms') return 'Terms';
    if (hash === '#/sitemap') return 'Sitemap';
    if (hash === '#/contribute') return 'Contribute';
    if (hash === '#/no-signups') return 'No Sign-ups';
    if (hash === '#/ai-tools') return 'AI Tools';
    if (hash === '#/no-login-apps') return 'No-Login Web Apps';
    if (hash === '#/ns-privacy') return 'Adblocking / Privacy';
    if (hash === '#/ns-ai') return 'Artificial Intelligence';
    if (hash === '#/ns-video') return 'Movies / TV / Anime';
    if (hash === '#/ns-audio') return 'Music / Podcasts / Radio';
    if (hash === '#/ns-gaming') return 'Gaming / Emulation';
    if (hash === '#/ns-reading') return 'Books / Comics / Manga';
    if (hash === '#/ns-downloading') return 'Downloading';
    if (hash === '#/ns-torrenting') return 'Torrenting';
    if (hash === '#/ns-educational') return 'Educational';
    if (hash === '#/ns-mobile') return 'Android / iOS';
    if (hash === '#/ns-linux-macos') return 'Linux / macOS';
    if (hash === '#/ns-non-english') return 'Non-English';
    if (hash === '#/ns-misc') return 'Miscellaneous';
    if (hash === '#/ns-libraries') return 'Libraries';
    return 'Tools';
  };

  const getInitialToolId = () => {
    const hash = window.location.hash;
    if (hash.startsWith('#/tools/')) {
      return hash.replace('#/tools/', '');
    }
    return null;
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(getInitialToolId);
  const [searchValue, setSearchValue] = useState('');
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
    } else if (activeTab === 'Contribute') {
      targetHash = '#/contribute';
    } else if (activeTab === 'No Sign-ups') {
      targetHash = '#/no-signups';
    } else if (activeTab === 'AI Tools') {
      targetHash = '#/ai-tools';
    } else if (activeTab === 'No-Login Web Apps') {
      targetHash = '#/no-login-apps';
    } else if (activeTab === 'Adblocking / Privacy') {
      targetHash = '#/ns-privacy';
    } else if (activeTab === 'Artificial Intelligence') {
      targetHash = '#/ns-ai';
    } else if (activeTab === 'Movies / TV / Anime') {
      targetHash = '#/ns-video';
    } else if (activeTab === 'Music / Podcasts / Radio') {
      targetHash = '#/ns-audio';
    } else if (activeTab === 'Gaming / Emulation') {
      targetHash = '#/ns-gaming';
    } else if (activeTab === 'Books / Comics / Manga') {
      targetHash = '#/ns-reading';
    } else if (activeTab === 'Downloading') {
      targetHash = '#/ns-downloading';
    } else if (activeTab === 'Torrenting') {
      targetHash = '#/ns-torrenting';
    } else if (activeTab === 'Educational') {
      targetHash = '#/ns-educational';
    } else if (activeTab === 'Android / iOS') {
      targetHash = '#/ns-mobile';
    } else if (activeTab === 'Linux / macOS') {
      targetHash = '#/ns-linux-macos';
    } else if (activeTab === 'Non-English') {
      targetHash = '#/ns-non-english';
    } else if (activeTab === 'Miscellaneous') {
      targetHash = '#/ns-misc';
    } else if (activeTab === 'Libraries') {
      targetHash = '#/ns-libraries';
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
      } else if (hash === '#/contribute') {
        setActiveTab('Contribute');
        setSelectedToolId(null);
      } else if (hash === '#/no-signups') {
        setActiveTab('No Sign-ups');
        setSelectedToolId(null);
      } else if (hash === '#/ai-tools') {
        setActiveTab('AI Tools');
        setSelectedToolId(null);
      } else if (hash === '#/no-login-apps') {
        setActiveTab('No-Login Web Apps');
        setSelectedToolId(null);
      } else if (hash === '#/ns-privacy') {
        setActiveTab('Adblocking / Privacy');
        setSelectedToolId(null);
      } else if (hash === '#/ns-ai') {
        setActiveTab('Artificial Intelligence');
        setSelectedToolId(null);
      } else if (hash === '#/ns-video') {
        setActiveTab('Movies / TV / Anime');
        setSelectedToolId(null);
      } else if (hash === '#/ns-audio') {
        setActiveTab('Music / Podcasts / Radio');
        setSelectedToolId(null);
      } else if (hash === '#/ns-gaming') {
        setActiveTab('Gaming / Emulation');
        setSelectedToolId(null);
      } else if (hash === '#/ns-reading') {
        setActiveTab('Books / Comics / Manga');
        setSelectedToolId(null);
      } else if (hash === '#/ns-downloading') {
        setActiveTab('Downloading');
        setSelectedToolId(null);
      } else if (hash === '#/ns-torrenting') {
        setActiveTab('Torrenting');
        setSelectedToolId(null);
      } else if (hash === '#/ns-educational') {
        setActiveTab('Educational');
        setSelectedToolId(null);
      } else if (hash === '#/ns-mobile') {
        setActiveTab('Android / iOS');
        setSelectedToolId(null);
      } else if (hash === '#/ns-linux-macos') {
        setActiveTab('Linux / macOS');
        setSelectedToolId(null);
      } else if (hash === '#/ns-non-english') {
        setActiveTab('Non-English');
        setSelectedToolId(null);
      } else if (hash === '#/ns-misc') {
        setActiveTab('Miscellaneous');
        setSelectedToolId(null);
      } else if (hash === '#/ns-libraries') {
        setActiveTab('Libraries');
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
    <Layout 
      activeTab={activeTab} 
      setActiveTab={handleTabChange} 
      isToolOpen={!!selectedToolId}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      showSearch={activeTab === 'Tools' || activeTab === 'No Sign-ups' || activeTab === 'AI Tools' || activeTab === 'No-Login Web Apps'}
    >
      <Dashboard 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        selectedToolId={selectedToolId}
        setSelectedToolId={handleSelectTool}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
    </Layout>
  );
}

export default App;

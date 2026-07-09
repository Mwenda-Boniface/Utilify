import { useState, useEffect, useRef } from 'react';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';

interface HistoryState {
  tab: string;
  toolId: string | null;
}

function App() {
  const [activeTab, setActiveTab] = useState('Tools');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  // History stack management
  const [history, setHistory] = useState<HistoryState[]>([{ tab: 'Tools', toolId: null }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isNavigatingStack = useRef(false);

  // Sync state transitions to the history stack
  useEffect(() => {
    if (isNavigatingStack.current) {
      isNavigatingStack.current = false;
      return;
    }

    const current = history[historyIndex];
    if (current && current.tab === activeTab && current.toolId === selectedToolId) {
      return;
    }

    // Truncate any forward history and push new state
    const cleanHistory = history.slice(0, historyIndex + 1);
    setHistory([...cleanHistory, { tab: activeTab, toolId: selectedToolId }]);
    setHistoryIndex(cleanHistory.length);
  }, [activeTab, selectedToolId]);

  const goBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const targetState = history[prevIndex];
      isNavigatingStack.current = true;
      setHistoryIndex(prevIndex);
      setActiveTab(targetState.tab);
      setSelectedToolId(targetState.toolId);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const targetState = history[nextIndex];
      isNavigatingStack.current = true;
      setHistoryIndex(nextIndex);
      setActiveTab(targetState.tab);
      setSelectedToolId(targetState.toolId);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedToolId(null);
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={handleTabChange}
      onBack={goBack}
      onForward={goForward}
      onRefresh={handleRefresh}
      canGoBack={canGoBack}
      canGoForward={canGoForward}
    >
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

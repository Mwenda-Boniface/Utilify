import { useState } from 'react';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('Tools');

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />
    </Layout>
  );
}


export default App;

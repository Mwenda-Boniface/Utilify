import React, { useState } from 'react';
import { Check, Send, Loader2, AlertCircle } from 'lucide-react';
import styles from '../DevTools.module.css';

const APITester: React.FC = () => {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [body, setBody] = useState('{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse('');
    setStatus(null);

    try {
      let parsedHeaders = {};
      try {
        parsedHeaders = JSON.parse(headers);
      } catch (e) {
        throw new Error('Invalid JSON in Headers');
      }

      const options: RequestInit = {
        method,
        headers: parsedHeaders,
      };

      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        try {
          options.body = body;
        } catch (e) {
          throw new Error('Invalid Body format');
        }
      }

      const startTime = Date.now();
      const res = await fetch(url, options);
      const duration = Date.now() - startTime;

      setStatus(res.status);
      const data = await res.text();
      
      try {
        const json = JSON.parse(data);
        setResponse(JSON.stringify(json, null, 2));
      } catch {
        setResponse(data);
      }
      
      setError(`Final response time: ${duration}ms`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.settings} style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem' }}>
        <select 
          className={styles.select} 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          style={{ width: '100px', fontWeight: 700, color: 'var(--primary)' }}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>PATCH</option>
        </select>
        <input 
          className={styles.select}
          style={{ flex: 1 }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/data"
        />
        <button 
          className={styles.button + ' ' + styles.primary} 
          onClick={sendRequest}
          disabled={loading}
          style={{ padding: '0.5rem 1.5rem' }}
        >
          {loading ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>

      <div className={styles.layout}>
        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Headers (JSON)</span>
          </div>
          <div className={styles.editorWrapper} style={{ height: '150px' }}>
            <textarea 
              className={styles.textarea}
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
            />
          </div>
          
          <div className={styles.labelBar} style={{ marginTop: '1rem' }}>
            <span className={styles.label}>Request Body</span>
          </div>
          <div className={styles.editorWrapper}>
            <textarea 
              className={styles.textarea}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={!['POST', 'PUT', 'PATCH'].includes(method)}
              placeholder="Request body (if applicable)"
            />
          </div>
        </div>

        <div className={styles.editorSection}>
          <div className={styles.labelBar}>
            <span className={styles.label}>Response</span>
            {status && (
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                padding: '0.2rem 0.6rem', 
                borderRadius: '4px',
                background: status < 400 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: status < 400 ? '#10b981' : '#ef4444'
              }}>
                STATUS: {status}
              </span>
            )}
          </div>
          <div className={styles.editorWrapper}>
            <textarea 
              className={styles.textarea}
              readOnly
              placeholder="Response data will appear here..."
              value={response}
            />
            {error && (
              <div className={styles.errorOverlay} style={{ background: error.includes('ms') ? 'rgba(var(--primary-rgb), 0.8)' : undefined }}>
                {error.includes('ms') ? <Check size={16} /> : <AlertCircle size={16} />}
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITester;

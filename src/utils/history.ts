export interface ScanHistory {
  id: string;
  timestamp: string;
  data: string;
  type: 'qr' | 'barcode';
  isEncrypted: boolean;
}

const STORAGE_KEY = 'mrbit_scan_history';

export const saveScanToHistory = (data: string, isEncrypted: boolean = false) => {
  const history = getScanHistory();
  const newItem: ScanHistory = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    data,
    type: 'qr',
    isEncrypted
  };
  
  const updatedHistory = [newItem, ...history].slice(0, 100); // Keep last 100
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
};

export const getScanHistory = (): ScanHistory[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

export const clearScanHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

import CryptoJS from 'crypto-js';

/**
 * Encrypts data using AES-256 with a password.
 * @param data The string to encrypt.
 * @param password The secret key.
 * @returns The encrypted ciphertext.
 */
export const encryptData = (data: string, password: string): string => {
  return CryptoJS.AES.encrypt(data, password).toString();
};

/**
 * Decrypts AES-256 ciphertext using a password.
 * @param ciphertext The encrypted string.
 * @param password The secret key.
 * @returns The decrypted plaintext or an empty string if decryption fails.
 */
export const decryptData = (ciphertext: string, password: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || '';
  } catch (error) {
    console.error('Decryption failed:', error);
    return '';
  }
};

/**
 * Encodes data into a secure QR URL format.
 */
export const encodeSecureQRData = (data: string, password?: string): string => {
  if (!password) return data;
  
  const encrypted = encryptData(data, password);
  // We use a URL fragment to keep the data client-side and avoid server logs
  return `${window.location.origin}/decrypt#${encodeURIComponent(encrypted)}`;
};

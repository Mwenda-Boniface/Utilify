import React, { useState, useEffect } from 'react';
import { DollarSign, RefreshCw, ArrowRightLeft, TrendingUp } from 'lucide-react';
import styles from '../Calculators.module.css';

const CURRENCIES = [
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', rate: 3.672 },
  { code: 'AFN', name: 'Afghan Afghani', symbol: '؋', rate: 71.2 },
  { code: 'ALL', name: 'Albanian Lek', symbol: 'L', rate: 94.0 },
  { code: 'AMD', name: 'Armenian Dram', symbol: '֏', rate: 388.0 },
  { code: 'ANG', name: 'Netherlands Antillean Guilder', symbol: 'ƒ', rate: 1.79 },
  { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz', rate: 845.0 },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', rate: 870.0 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.55 },
  { code: 'AWG', name: 'Aruban Florin', symbol: 'Afl.', rate: 1.79 },
  { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼', rate: 1.70 },
  { code: 'BAM', name: 'Bosnian Convertible Mark', symbol: 'KM', rate: 1.83 },
  { code: 'BBD', name: 'Barbadian Dollar', symbol: 'Bds$', rate: 2.00 },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', rate: 117.0 },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', rate: 1.83 },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'BD', rate: 0.377 },
  { code: 'BIF', name: 'Burundian Franc', symbol: 'FBu', rate: 2860.0 },
  { code: 'BMD', name: 'Bermudian Dollar', symbol: '$', rate: 1.00 },
  { code: 'BND', name: 'Brunei Dollar', symbol: 'B$', rate: 1.36 },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs.', rate: 6.91 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rate: 5.25 },
  { code: 'BSD', name: 'Bahamian Dollar', symbol: 'B$', rate: 1.00 },
  { code: 'BTN', name: 'Bhutanese Ngultrum', symbol: 'Nu.', rate: 83.5 },
  { code: 'BWP', name: 'Botswana Pula', symbol: 'P', rate: 13.7 },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', rate: 3.27 },
  { code: 'BZD', name: 'Belize Dollar', symbol: 'BZ$', rate: 2.00 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rate: 1.38 },
  { code: 'CDF', name: 'Congolese Franc', symbol: 'FC', rate: 2780.0 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 0.91 },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', rate: 950.0 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.24 },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', rate: 3900.0 },
  { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡', rate: 505.0 },
  { code: 'CUP', name: 'Cuban Peso', symbol: '$', rate: 24.0 },
  { code: 'CVE', name: 'Cape Verdean Escudo', symbol: 'Esc', rate: 103.5 },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', rate: 23.4 },
  { code: 'DJF', name: 'Djiboutian Franc', symbol: 'Fdj', rate: 177.7 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', rate: 6.98 },
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', rate: 59.0 },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'DA', rate: 134.0 },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'EGP', rate: 47.8 },
  { code: 'ERN', name: 'Eritrean Nakfa', symbol: 'Nfk', rate: 15.0 },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', rate: 57.0 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.94 },
  { code: 'FJD', name: 'Fijian Dollar', symbol: 'FJ$', rate: 2.24 },
  { code: 'FKP', name: 'Falkland Islands Pound', symbol: '£', rate: 0.81 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.81 },
  { code: 'GEL', name: 'Georgian Lari', symbol: '₾', rate: 2.68 },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', rate: 13.8 },
  { code: 'GIP', name: 'Gibraltar Pound', symbol: '£', rate: 0.81 },
  { code: 'GMD', name: 'Gambian Dalasi', symbol: 'D', rate: 67.9 },
  { code: 'GNF', name: 'Guinean Franc', symbol: 'FG', rate: 8600.0 },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', rate: 7.8 },
  { code: 'GYD', name: 'Guyanese Dollar', symbol: 'G$', rate: 209.0 },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', rate: 7.83 },
  { code: 'HNL', name: 'Honduran Lempira', symbol: 'L', rate: 24.7 },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', rate: 7.08 },
  { code: 'HTG', name: 'Haitian Gourde', symbol: 'G', rate: 132.5 },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', rate: 368.0 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', rate: 16200.0 },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', rate: 3.76 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.5 },
  { code: 'IQD', name: 'Iraqi Dinar', symbol: 'ID', rate: 1310.0 },
  { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', rate: 42000.0 },
  { code: 'ISK', name: 'Icelandic Króna', symbol: 'kr', rate: 140.0 },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', rate: 156.0 },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'JD', rate: 0.709 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 154.5 },
  { code: 'KES', name: 'Kenya Shilling', symbol: 'KSh', rate: 132.0 },
  { code: 'KGS', name: 'Kyrgyzstani Som', symbol: 'с', rate: 88.9 },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '៛', rate: 4065.0 },
  { code: 'KMF', name: 'Comorian Franc', symbol: 'CF', rate: 462.0 },
  { code: 'KPW', name: 'North Korean Won', symbol: '₩', rate: 900.0 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', rate: 1380.0 },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KD', rate: 0.308 },
  { code: 'KYD', name: 'Cayman Islands Dollar', symbol: 'CI$', rate: 0.83 },
  { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', rate: 445.0 },
  { code: 'LAK', name: 'Lao Kip', symbol: '₭', rate: 21300.0 },
  { code: 'LBP', name: 'Lebanese Pound', symbol: 'L£', rate: 89500.0 },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', rate: 300.0 },
  { code: 'LRD', name: 'Liberian Dollar', symbol: 'L$', rate: 194.0 },
  { code: 'LSL', name: 'Lesotho Loti', symbol: 'L', rate: 19.1 },
  { code: 'LYD', name: 'Libyan Dinar', symbol: 'LD', rate: 4.85 },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'DH', rate: 10.1 },
  { code: 'MDL', name: 'Moldovan Leu', symbol: 'L', rate: 17.8 },
  { code: 'MGA', name: 'Malagasy Ariary', symbol: 'Ar', rate: 4400.0 },
  { code: 'MKD', name: 'Macedonian Denar', symbol: 'den', rate: 57.7 },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'Ks', rate: 2100.0 },
  { code: 'MNT', name: 'Mongolian Tögrög', symbol: '₮', rate: 3450.0 },
  { code: 'MOP', name: 'Macanese Pataca', symbol: 'MOP$', rate: 8.07 },
  { code: 'MRU', name: 'Mauritanian Ouguiya', symbol: 'UM', rate: 39.6 },
  { code: 'MUR', name: 'Mauritian Rupee', symbol: '₨', rate: 46.0 },
  { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: 'Rf', rate: 15.4 },
  { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK', rate: 1730.0 },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', rate: 17.1 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', rate: 4.78 },
  { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT', rate: 63.8 },
  { code: 'NAD', name: 'Namibian Dollar', symbol: 'N$', rate: 19.1 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rate: 1400.0 },
  { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$', rate: 36.7 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', rate: 11.0 },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨', rate: 133.0 },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', rate: 1.69 },
  { code: 'OMR', name: 'Omani Rial', symbol: 'RO', rate: 0.385 },
  { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.', rate: 1.00 },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/.', rate: 3.72 },
  { code: 'PGK', name: 'Papua New Guinean Kina', symbol: 'K', rate: 3.82 },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', rate: 57.2 },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', rate: 278.0 },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł', rate: 4.05 },
  { code: 'PYG', name: 'Paraguayan Guaraní', symbol: '₲', rate: 7450.0 },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'QR', rate: 3.64 },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', rate: 4.63 },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'din', rate: 110.0 },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', rate: 93.0 },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw', rate: 1300.0 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SR', rate: 3.75 },
  { code: 'SBD', name: 'Solomon Islands Dollar', symbol: 'SI$', rate: 8.5 },
  { code: 'SCR', name: 'Seychellois Rupee', symbol: 'SR', rate: 13.5 },
  { code: 'SDG', name: 'Sudanese Pound', symbol: 'SDG', rate: 600.0 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', rate: 10.9 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 1.36 },
  { code: 'SHP', name: 'Saint Helena Pound', symbol: '£', rate: 0.81 },
  { code: 'SLL', name: 'Sierra Leonean Leone', symbol: 'Le', rate: 22500.0 },
  { code: 'SOS', name: 'Somali Shilling', symbol: 'Sh.So.', rate: 571.0 },
  { code: 'SRD', name: 'Surinamese Dollar', symbol: '$', rate: 34.2 },
  { code: 'SSP', name: 'South Sudanese Pound', symbol: 'SSP', rate: 130.0 },
  { code: 'STN', name: 'São Tomé and Príncipe Dobra', symbol: 'Db', rate: 22.8 },
  { code: 'SYP', name: 'Syrian Pound', symbol: 'LS', rate: 13000.0 },
  { code: 'SZL', name: 'Swazi Lilangeni', symbol: 'L', rate: 19.1 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', rate: 36.8 },
  { code: 'TJS', name: 'Tajikistani Somoni', symbol: 'SM', rate: 10.9 },
  { code: 'TMT', name: 'Turkmenistani Manat', symbol: 'm', rate: 3.50 },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'DT', rate: 3.12 },
  { code: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$', rate: 2.37 },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', rate: 32.5 },
  { code: 'TTD', name: 'Trinidad and Tobago Dollar', symbol: 'TT$', rate: 6.8 },
  { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$', rate: 32.4 },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', rate: 2580.0 },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', rate: 39.6 },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', rate: 3780.0 },
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.00 },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', rate: 38.5 },
  { code: 'UZS', name: 'Uzbekistani Som', symbol: 'soʻm', rate: 12600.0 },
  { code: 'VES', name: 'Venezuelan Bolívar Soberano', symbol: 'Bs.S', rate: 36.3 },
  { code: 'VND', name: 'Vietnamese Đồng', symbol: '₫', rate: 25400.0 },
  { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'VT', rate: 120.0 },
  { code: 'WST', name: 'Samoan Tālā', symbol: 'WS$', rate: 2.76 },
  { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA', rate: 615.0 },
  { code: 'XCD', name: 'East Caribbean Dollar', symbol: 'EC$', rate: 2.70 },
  { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA', rate: 615.0 },
  { code: 'XPF', name: 'CFP Franc', symbol: '₣', rate: 112.0 },
  { code: 'YER', name: 'Yemeni Rial', symbol: '﷼', rate: 250.0 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 19.1 },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', rate: 26.0 },
];

const CurrencyConverter: React.FC = () => {
  const defaultFrom = CURRENCIES.find(c => c.code === 'USD') || CURRENCIES[0];
  const defaultTo = CURRENCIES.find(c => c.code === 'EUR') || CURRENCIES[1];

  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState(defaultFrom);
  const [toCurrency, setToCurrency] = useState(defaultTo);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    convert();
  }, [amount, fromCurrency, toCurrency]);

  const convert = () => {
    if (!amount) {
      setResult(0);
      return;
    }
    // Convert to USD first (base)
    const inUSD = amount / fromCurrency.rate;
    const final = inUSD * toCurrency.rate;
    setResult(Math.round(final * 100) / 100);
  };

  const swap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <DollarSign size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Currency Converter</h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.card}>
          <div className={styles.field}>
            <label><TrendingUp size={16} /> Amount to Convert</label>
            <input 
              type="number"
              className={styles.input}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'flex-end' }}>
            <div className={styles.field}>
              <label>From</label>
              <select 
                className={styles.select}
                value={fromCurrency.code}
                onChange={(e) => setFromCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0])}
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>

            <button className={styles.btnSecondary} onClick={swap} style={{ marginBottom: '0.25rem', padding: '0.75rem' }}>
              <ArrowRightLeft size={18} />
            </button>

            <div className={styles.field}>
              <label>To</label>
              <select 
                className={styles.select}
                value={toCurrency.code}
                onChange={(e) => setToCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[1])}
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={`${styles.field} glass`} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(var(--primary-rgb), 0.05)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
              <strong>Note:</strong> Rates are estimated for offline use. Market rates may vary slightly.
            </p>
          </div>
        </div>

        <div className={styles.results}>
          {result !== null ? (
            <>
              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>Converted Amount</span>
                <span className={styles.resultValue}>{toCurrency.symbol}{result.toLocaleString()}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{toCurrency.name}</span>
              </div>

              <div className={styles.card} style={{ gap: '0.5rem', background: 'rgba(var(--primary-rgb), 0.03)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Exchange Rate</div>
                <div style={{ fontWeight: 600 }}>
                  1 {fromCurrency.code} = {(toCurrency.rate / fromCurrency.rate).toFixed(4)} {toCurrency.code}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.card} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
              <RefreshCw size={48} strokeWidth={1} style={{ marginBottom: '1rem' }} />
              <p>Ready to convert...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;

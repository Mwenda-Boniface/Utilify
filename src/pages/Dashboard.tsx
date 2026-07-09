import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ArrowRight, LayoutGrid, Key, Hash, Activity, 
  Calendar, DollarSign, RefreshCw, Percent, Clock, GraduationCap, 
  Scissors, Minimize, Maximize, Smile, Film, Palette, Box, FileText, 
  FileSearch, Type, Volume2, Archive, Code, Terminal, Play, QrCode, User, 
  Database, Dices, Layers, Table, Binary, ChevronLeft, Star, Barcode as BarcodeIcon, Mail, Mic,
  FileImage, FileSpreadsheet, Presentation, FileWarning, FileType,
  Layout, Map as MapIcon, Shield, Gauge, Globe, ShieldAlert, List, Users,
  FileCode, Lock, Heart
} from 'lucide-react';
import styles from './Dashboard.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import QRCodeGenerator from './code scanner&generator/qrcode generator/QRCodeGenerator';
import QRCodeScanner from './code scanner&generator/qrcode scanner/QRCodeScanner';
import WiFiQRCodeGenerator from './code scanner&generator/WiFi QR Code Generator/WiFiQRCodeGenerator';
import VCardQRCodeGenerator from './code scanner&generator/vCard QR Code Generator/VCardQRCodeGenerator';
import ImageUploadScanner from './code scanner&generator/Image Upload Scanner/ImageUploadScanner';
import QRCodeValidator from './code scanner&generator/QR Code Validator/QRCodeValidator';
import QRCodeCustomizer from './code scanner&generator/QR Code Customizer/QRCodeCustomizer';
import QRCodeTracker from './code scanner&generator/QR Code Tracker/QRCodeTracker';
import EmailSMSGenerator from './code scanner&generator/Email - SMS QR Generator/EmailSMSGenerator';
import EventQRGenerator from './code scanner&generator/Event QR Code Generator (calendar events)/EventQRGenerator';
import BulkQRGenerator from './code scanner&generator/Bulk QR Generator/BulkQRGenerator';
import BarcodeGenerator from './code scanner&generator/barcode generator/BarcodeGenerator';
import BarcodeScanner from './code scanner&generator/barcode scanner/BarcodeScanner';
import BarcodeConverter from './code scanner&generator/Barcode Format Converter/BarcodeConverter';
import BatchQRScanner from './code scanner&generator/Batch QR Scanner/BatchQRScanner';
import DynamicQRGenerator from './code scanner&generator/Dynamic QR Code Generator/DynamicQRGenerator';
import HistorySaver from './code scanner&generator/History Saver/HistorySaver';

// Calculators
import AgeCalculator from './calculators/Age calculator/AgeCalculator';
import BMICalculator from './calculators/BMI calculator/BMICalculator';
import CurrencyConverter from './calculators/Currency converter/CurrencyConverter';
import GPACalculator from './calculators/GPA calculator/GPACalculator';
import LoanCalculator from './calculators/Loan calculator/LoanCalculator';
import PercentageCalculator from './calculators/Percentage calculator/PercentageCalculator';
import TimeZoneConverter from './calculators/Time zone converter/TimeZoneConverter';

// Developer Tools
import JSONFormatter from './developer tools/JSON formatter & validator/JSONFormatter';
import CodeBeautifier from './developer tools/Code beautifier/CodeBeautifier';
import Minifier from './developer tools/HTML-CSS-JS minifier/Minifier';
import APITester from './developer tools/API tester (basic)/APITester';
import RegexTester from './developer tools/Regex tester/RegexTester';

// Encoders & Decoders
// Encoders & Decoders
import Base64Tools from './encoders&decoders/Base64 Encoder - Decoder/Base64Tools';
import BinaryConverter from './encoders&decoders/Binary - Text Converter/BinaryConverter';
import URLEncoder from './encoders&decoders/URL Encoder - Decoder/URLEncoder';
import HTMLEntities from './encoders&decoders/HTML Encoder - Decoder/HTMLEntities';
import MorseTranslator from './encoders&decoders/Morse Code Translator/MorseTranslator';

// File & Document Tools
import PDFTools from './file&document tools/PDF merger & splitter/PDFTools';
import OCRTool from './file&document tools/OCR (Image - Text)/OCRTool';
import ZIPTool from './file&document tools/File compressor (ZIP, RAR)/ZIPTool';
import TTSTool from './file&document tools/Text to speech/TTSTool';
import STTTool from './file&document tools/Speech to text/STTTool';
import ImageToPDF from './file&document tools/Image to PDF/ImageToPDF';

// Document Conversion Tools
import WordToPDF from './file&document tools/documents/word to pdf/WordToPDF';
import WordToTXT from './file&document tools/documents/word to txt/WordToTXT';
import ExcelToPDF from './file&document tools/documents/excel to pdf/ExcelToPDF';
import ExcelToWord from './file&document tools/documents/excel to word/ExcelToWord';
import PDFToImage from './file&document tools/documents/pdf to image/PDFToImage';
import PDFToWord from './file&document tools/documents/pdf to word/PDFToWord';
import PDFToExcel from './file&document tools/documents/pdf to excel/PDFToExcel';
import PDFToPowerPoint from './file&document tools/documents/pdf to powerpoint/PDFToPowerPoint';
import PowerPointToPDF from './file&document tools/documents/powerpoint to pdf/PowerPointToPDF';
import UniversalDocTool from './file&document tools/documents/UniversalDocTool';

// SEO & Website Tools
import KeywordChecker from './SEO & Website tools/Keyword density checker/KeywordChecker';
import MetaGenerator from './SEO & Website tools/Meta tag generator/MetaGenerator';
import SitemapGenerator from './SEO & Website tools/Sitemap generator/SitemapGenerator';
import RobotsGenerator from './SEO & Website tools/Robots.txt generator/RobotsGenerator';
import SpeedChecker from './SEO & Website tools/Website speed checker/SpeedChecker';
import WhoisLookup from './SEO & Website tools/Domain WHOIS lookup/WhoisLookup';

// Security Tools
import HashGenerator from './security/Hash generator (MD5, SHA)/HashGenerator';
import PasswordGenerator from './security/Password generator/PasswordGenerator';
import StrengthChecker from './security/Password strength checker/StrengthChecker';
import IPLookup from './security/IP lookup/IPLookup';
import VPNCheck from './security/VPN check tool/VPNCheck';

// Miscellaneous Tools
import DiceGenerator from './miscellaneous/Dice-number generator/DiceGenerator';
import FakeDataGenerator from './miscellaneous/Fake data generator (for testing)/FakeDataGenerator';
import NameGenerator from './miscellaneous/Random name generator/NameGenerator';
import PasswordList from './miscellaneous/Random password list/PasswordList';
import CaseConverter from './miscellaneous/Text case converter (UPPERCASE-lowercase)/CaseConverter';

// Image & Design Tools
import ImageCompressor from './imagedesign tools/Image compressor/ImageCompressor';
import ColorPicker from './imagedesign tools/Color picker/ColorPicker';
import FaviconGenerator from './imagedesign tools/Favicon generator/FaviconGenerator';
import ImageResizer from './imagedesign tools/Image resizer/ImageResizer';
import BackgroundRemover from './imagedesign tools/Background remover/BackgroundRemover';
import LogoGenerator from './imagedesign tools/Logo generator/LogoGenerator';
import MemeGenerator from './imagedesign tools/Meme generator/MemeGenerator';
import ThumbnailMaker from './imagedesign tools/Thumbnail maker/ThumbnailMaker';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: ToolCategory;
  featured?: boolean;
}

type ToolCategory = 
  | 'All' 
  | 'Security' 
  | 'Calculators' 
  | 'Image & Design' 
  | 'File & Document' 
  | 'Developer' 
  | 'Miscellaneous' 
  | 'Scanner & Generator' 
  | 'Encoders & Decoders'
  | 'SEO & Website tools';

// Helper components for custom icons
const BracesIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="m8 21-4-4 4-4"/><path d="M15 12h-2"/><path d="M11 12H9"/></svg>
);

const LinkIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
);

const CATEGORIES: ToolCategory[] = [
  'All', 'Security', 'Calculators', 'Image & Design', 
  'File & Document', 'Developer', 'Scanner & Generator', 
  'Encoders & Decoders', 'Miscellaneous', 'SEO & Website tools'
];

const TOOLS: Tool[] = [
  // Security
  { id: 'pass-gen', name: 'Password Generator', description: 'Create ultra-secure random passwords.', icon: <Lock size={24} />, category: 'Security', featured: true },
  { id: 'pass-strength', name: 'Strength Checker', description: 'Analyze password complexity & entropy.', icon: <Key size={24} />, category: 'Security' },
  { id: 'hash-gen', name: 'Hash Generator', description: 'MD5, SHA-1, SHA-256 cryptographic hashes.', icon: <Shield size={24} />, category: 'Security', featured: true },
  { id: 'ip-lookup', name: 'IP Lookup', description: 'Geolocate and analyze any IP address.', icon: <Globe size={24} />, category: 'Security' },
  { id: 'vpn-check', name: 'VPN detector', description: 'Detect if an IP belongs to a VPN or Proxy.', icon: <ShieldAlert size={24} />, category: 'Security' },

  // Calculators
  { id: 'age-calc', name: 'Age Calculator', description: 'Precise age calculation including minutes.', icon: <Calendar size={24} />, category: 'Calculators' },
  { id: 'bmi-calc', name: 'BMI Calculator', description: 'Calculate Body Mass Index instantly.', icon: <Activity size={24} />, category: 'Calculators' },
  { id: 'loan-calc', name: 'Loan Calculator', description: 'Calculate monthly payments & interest.', icon: <DollarSign size={24} />, category: 'Calculators', featured: true },
  { id: 'currency-conv', name: 'Currency Converter', description: 'Real-time exchange rates for global currencies.', icon: <RefreshCw size={24} />, category: 'Calculators' },
  { id: 'percent-calc', name: 'Percentage Calc', description: 'Simple & complex percentage operations.', icon: <Percent size={24} />, category: 'Calculators' },
  { id: 'timezone-conv', name: 'Time Zone Converter', description: 'Sync times across multiple global zones.', icon: <Clock size={24} />, category: 'Calculators' },
  { id: 'gpa-calc', name: 'GPA Calculator', description: 'Calculate academic performance scores.', icon: <GraduationCap size={24} />, category: 'Calculators' },

  // Image & Design
  { id: 'bg-remover', name: 'Background Remover', description: 'AI-powered background extraction.', icon: <Scissors size={24} />, category: 'Image & Design', featured: true },
  { id: 'img-compress', name: 'Image Compressor', description: 'Reduce file size without losing quality.', icon: <Minimize size={24} />, category: 'Image & Design' },
  { id: 'img-resizer', name: 'Image Resizer', description: 'Change dimensions for any platform.', icon: <Maximize size={24} />, category: 'Image & Design' },
  { id: 'meme-gen', name: 'Meme Generator', description: 'Create viral memes from templates.', icon: <Smile size={24} />, category: 'Image & Design' },
  { id: 'thumb-maker', name: 'Thumbnail Maker', description: 'Designing high-clickrate thumbnails.', icon: <Film size={24} />, category: 'Image & Design' },
  { id: 'color-picker', name: 'Color Picker', description: 'HEX, RGB, HSL converter & picker.', icon: <Palette size={24} />, category: 'Image & Design' },
  { id: 'logo-gen', name: 'Logo Generator', description: 'Quick AI logo concepts for projects.', icon: <Box size={24} />, category: 'Image & Design' },
  { id: 'favicon-gen', name: 'Favicon Generator', description: 'Generate favicons for websites.', icon: <FileCode size={24} />, category: 'Image & Design' },

  // File & Document
  { id: 'pdf-merge', name: 'PDF Merger & Splitter', description: 'Combine or extract pages from PDFs.', icon: <FileText size={24} />, category: 'File & Document', featured: true },
  { id: 'img-to-pdf', name: 'Image to PDF', description: 'Convert collections of images to PDF.', icon: <FileSearch size={24} />, category: 'File & Document' },
  { id: 'ocr-text', name: 'OCR (Image to Text)', description: 'Extract text from images using AI.', icon: <Type size={24} />, category: 'File & Document' },
  { id: 'tts-tool', name: 'Text to Speech', description: 'Convert written text to natural audio.', icon: <Volume2 size={24} />, category: 'File & Document' },
  { id: 'stt-tool', name: 'Speech to Text', description: 'Transcribe voice into editable text.', icon: <Mic size={24} />, category: 'File & Document' },
  { id: 'file-compress', name: 'ZIP Compressor', description: 'ZIP archives management.', icon: <Archive size={24} />, category: 'File & Document' },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert .docx to PDF document.', icon: <FileText size={24} />, category: 'File & Document' },
  { id: 'word-to-txt', name: 'Word to TXT', description: 'Extract plain text from Word.', icon: <FileType size={24} />, category: 'File & Document' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert spreadsheets to PDF.', icon: <FileSpreadsheet size={24} />, category: 'File & Document' },
  { id: 'excel-to-word', name: 'Excel to Word', description: 'Convert tables to Word document.', icon: <FileText size={24} />, category: 'File & Document' },
  { id: 'pdf-to-image', name: 'PDF to Image', description: 'Convert PDF pages to PNG images.', icon: <FileImage size={24} />, category: 'File & Document' },
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF content to editable Word.', icon: <FileText size={24} />, category: 'File & Document' },
  { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract PDF tables to Excel.', icon: <FileSpreadsheet size={24} />, category: 'File & Document' },
  { id: 'pdf-to-ppt', name: 'PDF to PowerPoint', description: 'Convert PDF pages to Slides.', icon: <Presentation size={24} />, category: 'File & Document' },
  { id: 'ppt-to-pdf', name: 'PowerPoint to PDF', description: 'Convert .pptx to PDF document.', icon: <Presentation size={24} />, category: 'File & Document' },
  { id: 'pub-to-pdf', name: 'Publisher to PDF', description: 'Convert .pub files to PDF.', icon: <FileWarning size={24} />, category: 'File & Document' },
  { id: 'pdf-to-pub', name: 'PDF to Publisher', description: 'Convert PDF to Publisher format.', icon: <FileWarning size={24} />, category: 'File & Document' },

  // SEO & Website Tools
  { id: 'keyword-checker', name: 'Keyword Density', description: 'Analyze keyword frequency in content.', icon: <Type size={24} />, category: 'SEO & Website tools', featured: true },
  { id: 'meta-gen', name: 'Meta Tag Generator', description: 'Generate SEO meta tags for sites.', icon: <Layout size={24} />, category: 'SEO & Website tools' },
  { id: 'sitemap-gen', name: 'Sitemap Generator', description: 'Create XML sitemaps for indexing.', icon: <MapIcon size={24} />, category: 'SEO & Website tools' },
  { id: 'robots-gen', name: 'Robots.txt Generator', description: 'Configure crawler access rules.', icon: <Shield size={24} />, category: 'SEO & Website tools' },
  { id: 'speed-checker', name: 'Website Speed', description: 'Check site performance metrics.', icon: <Gauge size={24} />, category: 'SEO & Website tools' },
  { id: 'whois-lookup', name: 'WHOIS Lookup', description: 'Domain registration info lookup.', icon: <Globe size={24} />, category: 'SEO & Website tools' },

  // Developer Tools
  { id: 'json-format', name: 'JSON Formatter', description: 'Clean & validate messy JSON code.', icon: <Code size={24} />, category: 'Developer', featured: true },
  { id: 'code-minifier', name: 'Code Minifier', description: 'Compress HTML, CSS, and JS files.', icon: <Terminal size={24} />, category: 'Developer' },
  { id: 'code-beautifier', name: 'Code Beautifier', description: 'Auto-format code for readability.', icon: <BracesIcon size={24} />, category: 'Developer' },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test & debug regular expressions.', icon: <Hash size={24} />, category: 'Developer' },
  { id: 'api-tester', name: 'API Tester', description: 'Basic REST API testing tool.', icon: <Play size={24} />, category: 'Developer' },

  // Scanner & Generator
  { id: 'qr-gen', name: 'QR Code Generator', description: 'Create dynamic & custom QR codes.', icon: <QrCode size={24} />, category: 'Scanner & Generator', featured: true },
  { id: 'qr-scan', name: 'QR Code Scanner', description: 'Scan QR codes from camera or file.', icon: <Maximize size={24} />, category: 'Scanner & Generator' },
  { id: 'batch-qr-scan', name: 'Batch QR Scanner', description: 'Scan multiple codes for inventory.', icon: <Layers size={24} />, category: 'Scanner & Generator' },
  { id: 'barcode-gen', name: 'Barcode Generator', description: 'EAN, UPC, Code-128 & more.', icon: <BarcodeIcon size={24} />, category: 'Scanner & Generator' },
  { id: 'barcode-scan', name: 'Barcode Scanner', description: 'Dedicated 1D barcode reader.', icon: <Box size={24} />, category: 'Scanner & Generator' },
  { id: 'qr-wifi', name: 'WiFi QR Code', description: 'Create QR for WiFi networks.', icon: <QrCode size={24} />, category: 'Scanner & Generator' },
  { id: 'vcard-qr', name: 'vCard QR Gen', description: 'Share contact details instantly.', icon: <User size={24} />, category: 'Scanner & Generator' },
  { id: 'email-qr', name: 'Email/SMS QR', description: 'Pre-filled messages via QR codes.', icon: <Mail size={24} />, category: 'Scanner & Generator' },
  { id: 'event-qr', name: 'Event QR Gen', description: 'Add events to phone calendars.', icon: <Calendar size={24} />, category: 'Scanner & Generator' },
  { id: 'bulk-qr', name: 'Bulk QR Gen', description: 'Generate from CSV data upload.', icon: <Table size={24} />, category: 'Scanner & Generator' },
  { id: 'barcode-conv', name: 'Barcode Converter', description: 'EAN vs UPC checksum conversion.', icon: <RefreshCw size={24} />, category: 'Scanner & Generator' },
  { id: 'dynamic-qr', name: 'Editable QR Hub', description: 'Managed links & local redirects.', icon: <RefreshCw size={24} />, category: 'Scanner & Generator' },
  { id: 'hist-save', name: 'History Saver', description: 'Manage and archive your scan logs.', icon: <Archive size={24} />, category: 'Scanner & Generator' },
  { id: 'qr-custom', name: 'QR Customizer', description: 'Branding, logos & premium themes.', icon: <Palette size={24} />, category: 'Scanner & Generator' },
  { id: 'qr-valid', name: 'QR Validator', description: 'Technical analysis & grading.', icon: <Shield size={24} />, category: 'Scanner & Generator' },
  { id: 'qr-track', name: 'QR Tracker', description: 'Local scan frequency analytics.', icon: <Activity size={24} />, category: 'Scanner & Generator' },
  { id: 'img-scan', name: 'Image Scanner', description: 'Scan QR codes from saved files.', icon: <FileSearch size={24} />, category: 'Scanner & Generator' },

  // Encoders & Decoders
  { id: 'b64-enc', name: 'Base64 Encoder', description: 'Encode/Decode Base64 strings.', icon: <Binary size={24} />, category: 'Encoders & Decoders' },
  { id: 'binary-conv', name: 'Binary Converter', description: 'Convert text to 0/1 binary sequences.', icon: <Binary size={24} />, category: 'Encoders & Decoders' },
  { id: 'url-enc', name: 'URL Encoder', description: 'Safe URL encoding and decoding.', icon: <LinkIcon size={24} />, category: 'Encoders & Decoders' },
  { id: 'morse-conv', name: 'Morse Translator', description: 'Text to Morse code conversion.', icon: <Volume2 size={24} />, category: 'Encoders & Decoders' },
  { id: 'html-enc', name: 'HTML Encoder', description: 'Safe HTML character escaping.', icon: <Code size={24} />, category: 'Encoders & Decoders' },

  // Miscellaneous
  { id: 'dice-gen', name: 'Dice Generator', description: 'Random number & dice roller.', icon: <Dices size={24} />, category: 'Miscellaneous', featured: true },
  { id: 'fake-data', name: 'Fake Data Gen', description: 'Mock data for testing & dev.', icon: <Database size={24} />, category: 'Miscellaneous' },
  { id: 'name-gen', name: 'Name Generator', description: 'Random realistic name maker.', icon: <Users size={24} />, category: 'Miscellaneous' },
  { id: 'pass-list', name: 'Password List', description: 'Bulk secure password generator.', icon: <List size={24} />, category: 'Miscellaneous' },
  { id: 'case-conv', name: 'Case Converter', description: 'UPPER, lower, camel, snake converter.', icon: <Type size={24} />, category: 'Miscellaneous' }
];

// Category colors helper mapping
const CATEGORY_COLORS: Record<string, string> = {
  'Security': 'security',
  'Calculators': 'calculators',
  'Image & Design': 'image',
  'File & Document': 'file',
  'SEO & Website tools': 'seo',
  'Developer': 'developer',
  'Scanner & Generator': 'scanner',
  'Encoders & Decoders': 'encoder',
  'Miscellaneous': 'misc'
};

interface DashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedToolId: string | null;
  setSelectedToolId: (id: string | null) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab, setActiveTab, selectedToolId, setSelectedToolId }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('All');
  const [history, setHistory] = useState<string[]>(() => 
    JSON.parse(localStorage.getItem('mrbit_history') || '[]')
  );

  // Update history logs on tool selection
  useEffect(() => {
    if (selectedToolId) {
      setHistory(prev => {
        const next = [selectedToolId, ...prev.filter(id => id !== selectedToolId)].slice(0, 24);
        localStorage.setItem('mrbit_history', JSON.stringify(next));
        return next;
      });
    }
  }, [selectedToolId]);

  const clearHistory = () => {
    localStorage.removeItem('mrbit_history');
    setHistory([]);
  };

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                          tool.description.toLowerCase().includes(search.toLowerCase());
      
      if (activeTab === 'History') {
        return matchesSearch && history.includes(tool.id);
      }
      
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, activeTab, history]);

  // Maintain original order for History view
  const orderedFilteredTools = useMemo(() => {
    if (activeTab === 'History') {
      return [...filteredTools].sort((a, b) => history.indexOf(a.id) - history.indexOf(b.id));
    }
    return filteredTools;
  }, [filteredTools, activeTab, history]);

  const featuredTools = useMemo(() => TOOLS.filter(t => t.featured), []);

  const selectedTool = useMemo(() => 
    TOOLS.find(t => t.id === selectedToolId), 
  [selectedToolId]);

  if (selectedTool) {
    const categoryClass = CATEGORY_COLORS[selectedTool.category] || 'misc';
    return (
      <div className={styles.dashboard}>
        <div className={`${styles.toolDetail} ${styles[categoryClass]}`}>
          <div className={styles.toolContainer}>
            {selectedTool.id === 'qr-gen' ? (
              <QRCodeGenerator />
            ) : selectedTool.id === 'qr-scan' ? (
              <QRCodeScanner />
            ) : selectedTool.id === 'wifi-qr' ? (
              <WiFiQRCodeGenerator />
            ) : selectedTool.id === 'vcard-qr' ? (
              <VCardQRCodeGenerator />
            ) : selectedTool.id === 'img-scan' ? (
              <ImageUploadScanner />
            ) : selectedTool.id === 'qr-valid' ? (
              <QRCodeValidator />
            ) : selectedTool.id === 'qr-custom' ? (
              <QRCodeCustomizer />
            ) : selectedTool.id === 'qr-track' ? (
              <QRCodeTracker />
            ) : selectedTool.id === 'email-qr' ? (
              <EmailSMSGenerator />
            ) : selectedTool.id === 'event-qr' ? (
              <EventQRGenerator />
            ) : selectedTool.id === 'bulk-qr' ? (
              <BulkQRGenerator />
            ) : selectedTool.id === 'barcode-gen' ? (
              <BarcodeGenerator />
            ) : selectedTool.id === 'barcode-scan' ? (
              <BarcodeScanner />
            ) : selectedTool.id === 'barcode-conv' ? (
              <BarcodeConverter />
            ) : selectedTool.id === 'batch-qr-scan' ? (
              <BatchQRScanner />
            ) : selectedTool.id === 'dynamic-qr' ? (
              <DynamicQRGenerator />
            ) : selectedTool.id === 'hist-save' ? (
              <HistorySaver />
            ) : selectedTool.id === 'age-calc' ? (
              <AgeCalculator />
            ) : selectedTool.id === 'bmi-calc' ? (
              <BMICalculator />
            ) : selectedTool.id === 'currency-conv' ? (
              <CurrencyConverter />
            ) : selectedTool.id === 'gpa-calc' ? (
              <GPACalculator />
            ) : selectedTool.id === 'loan-calc' ? (
              <LoanCalculator />
            ) : selectedTool.id === 'percent-calc' ? (
              <PercentageCalculator />
            ) : selectedTool.id === 'timezone-conv' ? (
              <TimeZoneConverter />
            ) : selectedTool.id === 'json-format' ? (
              <JSONFormatter />
            ) : selectedTool.id === 'code-beautifier' ? (
              <CodeBeautifier />
            ) : selectedTool.id === 'code-minifier' ? (
              <Minifier />
            ) : selectedTool.id === 'api-tester' ? (
              <APITester />
            ) : selectedTool.id === 'regex-tester' ? (
              <RegexTester />
            ) : selectedTool.id === 'b64-enc' ? (
              <Base64Tools />
            ) : selectedTool.id === 'binary-conv' ? (
              <BinaryConverter />
            ) : selectedTool.id === 'url-enc' ? (
              <URLEncoder />
            ) : selectedTool.id === 'html-enc' ? (
              <HTMLEntities />
            ) : selectedTool.id === 'morse-conv' ? (
              <MorseTranslator />
            ) : selectedTool.id === 'pdf-merge' ? (
              <PDFTools />
            ) : selectedTool.id === 'ocr-text' ? (
              <OCRTool />
            ) : selectedTool.id === 'file-compress' ? (
              <ZIPTool />
            ) : selectedTool.id === 'tts-tool' ? (
              <TTSTool />
            ) : selectedTool.id === 'stt-tool' ? (
              <STTTool />
            ) : selectedTool.id === 'img-to-pdf' ? (
              <ImageToPDF />
            ) : selectedTool.id === 'word-to-pdf' ? (
              <WordToPDF />
            ) : selectedTool.id === 'word-to-txt' ? (
              <WordToTXT />
            ) : selectedTool.id === 'excel-to-pdf' ? (
              <ExcelToPDF />
            ) : selectedTool.id === 'excel-to-word' ? (
              <ExcelToWord />
            ) : selectedTool.id === 'pdf-to-image' ? (
              <PDFToImage />
            ) : selectedTool.id === 'pdf-to-word' ? (
              <PDFToWord />
            ) : selectedTool.id === 'pdf-to-excel' ? (
              <PDFToExcel />
            ) : selectedTool.id === 'pdf-to-ppt' ? (
              <PDFToPowerPoint />
            ) : selectedTool.id === 'ppt-to-pdf' ? (
              <PowerPointToPDF />
            ) : selectedTool.id === 'pub-to-pdf' ? (
              <UniversalDocTool title="Publisher to PDF" description="Convert Microsoft Publisher documents to PDF." />
            ) : selectedTool.id === 'pdf-to-pub' ? (
              <UniversalDocTool title="PDF to Publisher" description="Convert PDF files to Microsoft Publisher format." />
            ) : selectedTool.id === 'keyword-checker' ? (
              <KeywordChecker />
            ) : selectedTool.id === 'meta-gen' ? (
              <MetaGenerator />
            ) : selectedTool.id === 'sitemap-gen' ? (
              <SitemapGenerator />
            ) : selectedTool.id === 'robots-gen' ? (
              <RobotsGenerator />
            ) : selectedTool.id === 'speed-checker' ? (
              <SpeedChecker />
            ) : selectedTool.id === 'whois-lookup' ? (
              <WhoisLookup />
            ) : selectedTool.id === 'hash-gen' ? (
              <HashGenerator />
            ) : selectedTool.id === 'pass-gen' ? (
              <PasswordGenerator />
            ) : selectedTool.id === 'pass-strength' ? (
              <StrengthChecker />
            ) : selectedTool.id === 'ip-lookup' ? (
              <IPLookup />
            ) : selectedTool.id === 'vpn-check' ? (
              <VPNCheck />
            ) : selectedTool.id === 'dice-gen' ? (
              <DiceGenerator />
            ) : selectedTool.id === 'fake-data' ? (
              <FakeDataGenerator />
            ) : selectedTool.id === 'name-gen' ? (
              <NameGenerator />
            ) : selectedTool.id === 'pass-list' ? (
              <PasswordList />
            ) : selectedTool.id === 'case-conv' ? (
              <CaseConverter />
            ) : selectedTool.id === 'img-compress' ? (
              <ImageCompressor />
            ) : selectedTool.id === 'color-picker' ? (
              <ColorPicker />
            ) : selectedTool.id === 'favicon-gen' ? (
              <FaviconGenerator />
            ) : selectedTool.id === 'img-resizer' ? (
              <ImageResizer />
            ) : selectedTool.id === 'bg-remover' ? (
              <BackgroundRemover />
            ) : selectedTool.id === 'logo-gen' ? (
              <LogoGenerator />
            ) : selectedTool.id === 'meme-gen' ? (
              <MemeGenerator />
            ) : selectedTool.id === 'thumb-maker' ? (
              <ThumbnailMaker />
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <Box size={48} strokeWidth={1} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p>Tool implementation coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Handle alternative subpages
  if (activeTab === 'About') {
    return (
      <div className={styles.aboutPage}>
        <div className={`${styles.aboutCard} glass`}>
          <h2>About Utilify</h2>
          <p className={styles.tagline}>A premium, developer-focused client-side utility suite.</p>
          
          <div className={styles.aboutFeatures}>
            <div className={styles.featItem}>
              <h4>🔒 Privacy-First Design</h4>
              <p>All operations execute 100% locally in your browser. No files, passwords, or data payloads are sent to external servers.</p>
            </div>
            <div className={styles.featItem}>
              <h4>⚡ Sub-millisecond Execution</h4>
              <p>Built on top of React 19, TypeScript, and Vite, utilizing WASM and optimized browser APIs for raw processing power.</p>
            </div>
            <div className={styles.featItem}>
              <h4>🎨 High Fidelity Interface</h4>
              <p>Designed with glassmorphic depth, micro-interactions, responsive sizing, and customizable category identity glows.</p>
            </div>
          </div>

          <div className={styles.aboutStats}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>{TOOLS.length}</span>
              <span className={styles.statLabel}>Available Tools</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Local Processing</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>v0.1.0</span>
              <span className={styles.statLabel}>Release Version</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle alternative subpages
  if (activeTab === 'Contact') {
    return (
      <div className={styles.aboutPage}>
        <div className={`${styles.aboutCard} glass`}>
          <h2>Contact Utilify</h2>
          <p className={styles.tagline}>Get in touch with the development and support team.</p>
          
          <div className={styles.contactContainer}>
            <div className={styles.contactInfo}>
              <h4>📬 Reach Us Directly</h4>
              <p>For support, feature requests, or enterprise licensing inquiries, feel free to contact us via email:</p>
              <div className={styles.contactEmailBox}>
                <span>Support Email:</span>
                <strong>support@utilifytools.dpdns.org</strong>
              </div>
              <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Response Time: Typically within 24 business hours.
              </p>
            </div>

            <div className={styles.contactForm}>
              <h4>💬 Send a Message</h4>
              <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! Thank you for reaching out.'); }}>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input type="text" placeholder="John Doe" required className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" placeholder="john@example.com" required className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label>Message</label>
                  <textarea placeholder="Your feedback or support request..." rows={4} required className={styles.formInput} />
                </div>
                <button type="submit" className={styles.submitBtn}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'Privacy') {
    return (
      <div className={styles.aboutPage}>
        <div className={`${styles.aboutCard} glass`}>
          <h2>Privacy Policy</h2>
          <p className={styles.tagline}>Last Updated: July 2026</p>
          
          <div className={styles.policyContent}>
            <h3>1. Local-First Execution</h3>
            <p>Utilify operates exclusively as a client-side tool suite. All calculations, document conversions (e.g. Word to PDF), image compression, and key generation are processed 100% inside your web browser. No files or private data are ever uploaded, transmitted, or saved to our servers.</p>
            
            <h3>2. Data Collection</h3>
            <p>We do not collect any personal data, usage telemetry, or search queries. Your search inputs, custom credentials, and documents never leave your local hardware node.</p>
            
            <h3>3. Local Storage</h3>
            <p>Your launch history logs are saved strictly in your local browser storage (localStorage) for convenience. You can clear this data at any time via the "Clear Launch History" button in the History tab.</p>
            
            <h3>4. SSL Security (HTTPS)</h3>
            <p>All traffic between your browser and our CDN is secured using Industry-Standard SSL encryption (HTTPS), ensuring that third parties cannot inspect or manipulate the web application assets.</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'Terms') {
    return (
      <div className={styles.aboutPage}>
        <div className={`${styles.aboutCard} glass`}>
          <h2>Terms of Service</h2>
          <p className={styles.tagline}>Last Updated: July 2026</p>
          
          <div className={styles.policyContent}>
            <h3>1. Acceptable Use</h3>
            <p>Utilify is provided as a free utility suite for personal, developer, and educational purposes. You agree to use these tools only for lawful purposes and in accordance with local regulations.</p>
            
            <h3>2. Disclaimer of Warranties</h3>
            <p>This software is provided "as is" and "as available", without warranty of any kind, express or implied. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from the use of the tools.</p>
            
            <h3>3. Client-Side Integrity</h3>
            <p>Since all processing is client-side, the speed, quality, and limits of file operations (such as large PDF merges) depend entirely on your local hardware CPU and memory capacity.</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'Sitemap') {
    return (
      <div className={styles.aboutPage}>
        <div className={`${styles.aboutCard} glass`}>
          <h2>Website Sitemap</h2>
          <p className={styles.tagline}>Browse all available categories and utility modules on Utilify.</p>
          
          <div className={styles.sitemapGroup}>
            {CATEGORIES.filter(c => c !== 'All').map(cat => {
              const catTools = TOOLS.filter(t => t.category === cat);
              return (
                <div key={cat} className={styles.sitemapCategory}>
                  <h3>{cat}</h3>
                  <div className={styles.sitemapLinksGrid}>
                    {catTools.map(tool => (
                      <a 
                        key={tool.id} 
                        href={`#/tools/${tool.id}`} 
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedToolId(tool.id);
                        }}
                      >
                        {tool.name}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === '404') {
    return (
      <div className={styles.aboutPage} style={{ textAlign: 'center' }}>
        <div className={`${styles.aboutCard} glass`} style={{ maxWidth: '500px', margin: '4rem auto' }}>
          <div className={styles.errorIconWrapper}>
            <ShieldAlert size={48} color="#ef4444" />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>404 - Page Not Found</h2>
          <p className={styles.tagline} style={{ marginBottom: '2rem' }}>
            The requested page hash does not exist or has been relocated.
          </p>
          <button 
            onClick={() => setActiveTab('Tools')} 
            className={styles.submitBtn}
            style={{ width: 'auto', display: 'inline-flex', alignSelf: 'center', padding: '0.85rem 2rem' }}
          >
            Return to Workspace Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.headerSection}>
        <div className={styles.titleBox}>
          <h1>
            {activeTab === 'History' ? 'Launch History' : 'Workspace Hub'}
          </h1>
          <p>
            {activeTab === 'History' 
              ? 'Track and quickly relaunch your recently used scripts.' 
              : 'Over 60 premium utility tools at your fingertips.'}
          </p>
        </div>

        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} size={20} />
          <input 
            type="text" 
            placeholder="Search for tools (e.g. 'PDF', 'Password'...)" 
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {activeTab === 'Tools' && (
          <nav className={styles.filterSection}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterChip} ${activeCategory === cat ? styles.filterChipActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeFilterBubble"
                    className={styles.activeFilterBubble}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={styles.filterText}>{cat}</span>
              </button>
            ))}
          </nav>
        )}
      </header>

        {/* Featured Tools - Only show on main Tools landing */}
        {activeTab === 'Tools' && search === '' && activeCategory === 'All' && (
          <section className={styles.featuredSection}>
            <div className={styles.sectionHeader}>
              <Star size={18} fill="var(--primary)" color="var(--primary)" />
              <h2>Featured Tools</h2>
              <span className={styles.badge}>Most Used</span>
            </div>
            <div className={styles.grid}>
              {featuredTools.map(tool => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  onClick={() => setSelectedToolId(tool.id)} 
                />
              ))}
            </div>
          </section>
        )}

        {/* Main utilities grid */}
        <section className={styles.toolSection}>
          <div className={styles.sectionHeader}>
            <LayoutGrid size={18} color="var(--text-muted)" />
            <h2>
              {activeTab === 'History' 
                ? 'Relaunch Logs' 
                : activeCategory === 'All' 
                ? 'All Utilities' 
                : `${activeCategory} Tools`}
            </h2>
          </div>
          
          {orderedFilteredTools.length > 0 ? (
            <motion.div layout className={styles.grid}>
              <AnimatePresence mode="popLayout">
                {orderedFilteredTools.map(tool => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    onClick={() => setSelectedToolId(tool.id)} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className={styles.noResults}>
              <Search size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
              <h3>No tools found</h3>
              <p>
                {activeTab === 'History' 
                  ? "Your launch history is empty. Launch some tools from the hub first!" 
                  : 'Try searching for something else or change the category filter.'}
              </p>
            </div>
          )}
        </section>
        
        {activeTab === 'History' && history.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button 
              onClick={clearHistory}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'rgba(244, 63, 94, 0.08)',
                color: '#f43f5e',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              Clear Launch History
            </button>
          </div>
        )}
    </div>
  );
};

const ToolCard: React.FC<{ 
  tool: Tool; 
  onClick: () => void; 
}> = ({ tool, onClick }) => {
  const categoryClass = CATEGORY_COLORS[tool.category] || 'misc';
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.24 }}
      className={`${styles.toolCard} ${styles[categoryClass]} glass`} 
      onClick={onClick}
    >
      <div className={styles.iconWrapper}>
        {tool.icon}
      </div>
      <div className={styles.toolInfo}>
        <span className={styles.categoryBadge}>{tool.category}</span>
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
      </div>
      <div className={styles.cardFooter}>
        <span>Launch Tool</span>
        <ArrowRight size={16} />
      </div>
    </motion.div>
  );
};

export default Dashboard;
